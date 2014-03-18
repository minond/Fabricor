module.exports = function (grunt) {
    'use strict';

    grunt.initConfig({
        pkg: {
            files: {
                js: {
                    dir: 'app/assets',
                    all: 'app/assets/**/*.js'
                },

                php: {
                    dir: 'app',
                    all: 'app/**/*.php'
                },

                css: {
                    all: 'public/css/**/*.css'
                },

                sass: {
                    all: 'public/scss/**/*.scss',
                    dir: 'public/scss'
                },

                tests: {
                    dir: 'tests',
                    js: 'tests/**/*.js',
                    php: 'tests/**/*.php'
                }
            }
        },

        // http://sass-lang.com/install
        sass: {
            all: {
                options: {
                    loadPath: [
                        'public/vendor/foundation/scss'
                    ]
                },

                // http://gruntjs.com/configuring-tasks#building-the-files-object-dynamically
                files: [{
                    expand: true,
                    cwd: '<%= pkg.files.sass.dir %>',
                    src: [ '**/*.scss' ],
                    dest: 'public/css',
                    ext: '.css'
                }]
            }
        },

        // linters
        jshint: {
            all: {
                src: [
                    '<%= pkg.files.js.all %>',
                    '<%= pkg.files.tests.js %>'
                ],
                options: {
                    globals: [ 'require' ]
                }
            },
            report: {
                src: [ '<%= pkg.files.js.all %>' ],
                options: {
                    globals: [ 'require' ],
                    reporter: 'checkstyle',
                    reporterOutput: 'build/code/lint/js/checkstyle.xml'
                }
            }
        },

        // https://github.com/causes/scss-lint
        exec: {
            scsslint: {
                cmd: 'scss-lint -f XML <%= pkg.files.sass.dir %> > build/code/lint/scss/linter.xml'
            },
            phpmd: {
                // removing controversial because of camelCame bs
                // cleancode rule not in 1.4.*
                cmd: 'bin/phpmd <%= pkg.files.php.dir %>,<%= pkg.files.tests.dir %> xml codesize,design,naming,unusedcode --reportfile build/code/quality/php/mess.xml --strict'
            },
            phpcpd: {
                cmd: 'bin/phpcpd <%= pkg.files.php.all %> <%= pkg.files.tests.dir %>'
            },
            phpdcd: {
                cmd: 'bin/phpdcd <%= pkg.files.php.all %> <%= pkg.files.tests.dir %>'
            }
        },

        // requires php code sniffer
        phpcs: {
            all: {
                dir: [
                    '<%= pkg.files.php.all %>',
                    '<%= pkg.files.tests.php %>'
                ]
            },
            options: {
                bin: 'bin/phpcs',
                standard: 'PSR2',
                report: 'full',
                reportFile: 'build/code/lint/php/psr2.txt'
            }
        },

        // required phpunit
        phpunit: {
            all: {
                dir: '<%= pkg.files.tests.dir %>'
            },
            options: {
                bin: 'bin/phpunit',
                configuration: 'config/phpunit.xml'
            }
        },

        // docs: https://github.com/vigetlabs/grunt-complexity
        // complexity: http://jscomplexity.org/complexity
        complexity: {
            all: {
                src: [
                    '<%= pkg.files.js.all %>',
                    '<%= pkg.files.tests.js %>'
                ],
                options: {
                    checkstyleXML: 'build/code/quality/js/checkstyle.xml',
                    breakOnErrors: false,
                    errorsOnly: false,
                    cyclomatic: [ 3, 7, 12 ],
                    halstead: [ 8, 13, 20 ],
                    maintainability: 100
                }
            }
        },

        // tests
        jasmine: {
            all: {
                src: [ '<%= pkg.files.js.all %>' ],
                options: {
                    specs: [ '<%= pkg.files.tests.js %>' ],
                    template: require('grunt-template-jasmine-istanbul'),
                    templateOptions: {
                        coverage: 'build/tests/js/converage.json',

                        // https://github.com/maenu/grunt-template-jasmine-istanbul#templateoptionsreport
                        report: [
                            {
                                type: 'text-summary'
                            },
                            {
                                type: 'html',
                                options: {
                                    dir: 'build/tests/js/report/'
                                }
                            }
                        ],

                        // requirejs template configuration:
                        template: require('grunt-template-jasmine-requirejs'),
                        templateOptions: {}
                    },
                    junit: {
                        path: 'build/tests/js/junit'
                    }
                }
            }
        },

        yuidoc: {
            all: {
                name: '', // '<%= pkg.name %>',
                description: '', // '<%= pkg.description %>',
                version: '', // '<%= pkg.version %>',
                options: {
                    paths: '<%= pkg.files.js.dir %>',
                    outdir: 'build/code/documentation/js'
                }
            }
        },

        // go to http://localhost:9000
        connect: {
            server: {
                options: {
                    keepalive: true,
                    debug: true,
                    hostname: '0.0.0.0',
                    port: 9000,
                    base: '.'
                }
            }
        },

        mkdir: {
            build: {
                options: {
                    create: [
                        'build/code/quality/php',
                        'build/code/quality/js',
                        'build/code/lint/php',
                        'build/code/lint/scss/'
                    ]
                },
            },
        },

        rm: {
            build: {
                dir: 'build'
            }
        },

        // livereload Google Chrome plugin: http://goo.gl/cRPr4f
        watch: {
            all: {
                tasks: [
                    'compile',
                    'quality',
                    'test'
                ],
                files: [
                    '<%= pkg.files.sass.all %>',
                    '<%= pkg.files.js.all %>',
                    '<%= pkg.files.tests.js %>'
                ],
                options: {
                    livereload: 35729
                }
            },

            compile: {
                tasks: [ 'compile' ],
                files: [ '<%= pkg.files.sass.all %>' ],
            },

            code: {
                tasks: [ 'quality' ],
                files: [
                    '<%= pkg.files.js.all %>',
                    '<%= pkg.files.tests.js %>',
                    '<%= pkg.files.css.all %>'
                ],
            },

            tests: {
                tasks: [ 'test' ],
                files: [
                    '<%= pkg.files.js.all %>',
                    '<%= pkg.files.tests.js %>'
                ],
            }
        }
    });

    grunt.registerTask('default', [ 'build' ]);
    grunt.registerTask('build', [ 'clean', 'compile', 'quality', 'test' ]);
    grunt.registerTask('clean', [ 'rm:build' ]);
    grunt.registerTask('compile', [ 'sass:all' ]);
    grunt.registerTask('documentation', [ 'yuidoc:all' ]);
    grunt.registerTask('server', [ 'connect:server' ]);

    grunt.registerTask('test', [
        'jasmine:all',
        'phpunit:all'
    ]);

    grunt.registerTask('quality', [
        'mkdir:build',
        'complexity:all',
        'jshint:all',
        'jshint:report',
        'exec:scsslint',
        'exec:phpcpd',
        'exec:phpcpd',
        'exec:phpmd',
        'phpcs:all',
        'yuidoc:all'
    ]);

    grunt.loadNpmTasks('grunt-complexity');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-jasmine');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-yuidoc');
    grunt.loadNpmTasks('grunt-exec');
    grunt.loadNpmTasks('grunt-mkdir');
    grunt.loadNpmTasks('grunt-phpcs');
    grunt.loadNpmTasks('grunt-phpunit');
    grunt.loadNpmTasks('grunt-rm');
};
