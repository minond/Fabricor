module.exports = function (grunt) {
    'use strict';

    require('load-grunt-tasks')(grunt);

    grunt.initConfig({
        config: grunt.file.readYAML('config/build.yml'),

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
                    cwd: '<%= config.files.sass.dir %>',
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
                    '<%= config.files.js.all %>',
                    '<%= config.files.tests.js %>'
                ],
                options: {
                    // http://jslinterrors.com/
                    jshintrc: 'config/jshintrc.json'
                }
            },
            report: {
                src: [
                    '<%= config.files.js.all %>',
                    '<%= config.files.tests.js %>'
                ],
                options: {
                    jshintrc: 'config/jshintrc.json',
                    reporter: 'checkstyle',
                    reporterOutput: 'build/code/lint/js/checkstyle.xml'
                }
            }
        },

        // https://github.com/causes/scss-lint
        exec: {
            scsslint: {
                cmd: 'scss-lint -f XML <%= config.files.sass.dir %> > build/code/lint/scss/linter.xml'
            },
            phpmd: {
                // removing controversial because of camelCame bs
                // cleancode rule not in 1.4.*
                cmd: 'bin/phpmd <%= config.files.php.dir %>,<%= config.files.tests.dir %> xml codesize,design,naming,unusedcode --reportfile build/code/quality/php/mess.xml --strict'
            },
            phpcpd: {
                cmd: 'bin/phpcpd <%= config.files.php.all %> <%= config.files.tests.dir %>'
            },
            phpdcd: {
                cmd: 'bin/phpdcd <%= config.files.php.all %> <%= config.files.tests.dir %>'
            },
            apigen: {
                cmd: 'apigen -s=<%= config.files.php.dir %> -d=build/code/documentation/php --todo=yes --colors=no --progressbar=no'
            },
            phantomjs: {
                cmd: 'node_modules/.bin/phantomjs --webdriver=8643'
            },
            behat: {
                cmd: 'bin/behat --format junit,html,pretty --out build/tests/integration/junit,build/tests/integration/html/index.html'
            }
        },

        // requires php code sniffer
        phpcs: {
            all: {
                dir: [
                    '<%= config.files.php.all %>',
                    '<%= config.files.tests.php %>'
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
                dir: '<%= config.files.tests.dir %>'
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
                    '<%= config.files.js.all %>',
                    '<%= config.files.tests.js %>'
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
                src: [ '<%= config.files.js.all %>' ],
                options: {
                    specs: [ '<%= config.files.tests.js %>' ],
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
                name: '', // '<%= config.name %>',
                description: '', // '<%= config.description %>',
                version: '', // '<%= config.version %>',
                options: {
                    paths: '<%= config.files.js.dir %>',
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
                        'build/code/lint/scss/',
                        'build/tests/integration/junit',
                        'build/tests/integration/html',
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
                    '<%= config.files.sass.all %>',
                    '<%= config.files.js.all %>',
                    '<%= config.files.tests.js %>'
                ],
                options: {
                    livereload: 35729
                }
            },

            compile: {
                tasks: [ 'compile' ],
                files: [ '<%= config.files.sass.all %>' ],
            },

            code: {
                tasks: [ 'quality' ],
                files: [
                    '<%= config.files.js.all %>',
                    '<%= config.files.tests.js %>',
                    '<%= config.files.css.all %>'
                ],
            },

            tests: {
                tasks: [ 'test' ],
                files: [
                    '<%= config.files.js.all %>',
                    '<%= config.files.tests.js %>'
                ],
            }
        }
    });

    grunt.registerTask('default', [ 'build' ]);
    grunt.registerTask('prepare', [ 'mkdir:build' ]);
    grunt.registerTask('clean', [ 'rm:build' ]);
    grunt.registerTask('compile', [ 'sass:all' ]);
    grunt.registerTask('server', [ 'connect:server' ]);

    grunt.registerTask('build', [ 'prepare', 'clean', 'prepare', 'compile' ]);
    grunt.registerTask('ci', [ 'quality', 'test', 'documentation' ]);
    grunt.registerTask('documentation', [ 'yuidoc:all', 'exec:apigen' ]);

    grunt.registerTask('test', [ 'test:unit', 'test:integration' ]);
    grunt.registerTask('test:integration', [ 'prepare', 'exec:behat' ]);
    grunt.registerTask('test:unit', [ 'test:unit:js', 'test:unit:php' ]);
    grunt.registerTask('test:unit:js', [ 'jasmine:all' ]);
    grunt.registerTask('test:unit:php', [ 'phpunit:all' ]);

    grunt.registerTask('quality', [
        'prepare',
        'complexity:all',
        'jshint:all',
        'jshint:report',
        'exec:scsslint',
        'exec:phpcpd',
        'exec:phpcpd',
        'exec:phpmd',
        'phpcs:all'
    ]);
};
