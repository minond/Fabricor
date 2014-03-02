module.exports = function (grunt) {
    'use strict';

    grunt.initConfig({
        pkg: {
            files: {
                js: {
                    dir: 'app/client',
                    all: 'app/client/**/*.js'
                },

                php: {
                    dir: 'app/server',
                    all: 'app/server/**/*.php'
                },

                css: {
                    all: 'public/css/**/*.css'
                },

                less: {
                    dir: 'assets/less'
                },

                tests: {
                    dir: 'tests',
                    js: 'tests/client/**/*.js',
                    php: 'tests/server/**/*.php'
                }
            }
        },

        // compilers
        less: {
            all: {
                options: {
                    paths: [ '<%= pkg.files.less.dir %>' ]
                },
                files: {
                    'public/css/base.css': 'assets/less/base.less'
                }
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

        // docs: https://github.com/stubbornella/csslint/wiki/Rules
        csslint: {
            all: {
                src: [ '<%= pkg.files.css.all %>' ],

                // TODO: complete rules/options
                options: {
                    'import': 2,
                    'important': 2,
                    'empty-rules': 2,

                    formatters: [{
                        id: 'checkstyle-xml',
                        dest: 'build/code/lint/css/checkstyle.xml'
                    }]
                }
            }
        },

        // requires php code sniffer
        // 'require': { 'squizlabs/php_codesniffer': '1.*' }
        phpcs: {
            all: {
                dir: [ '<%= pkg.files.php.all %>' ]
            },
            options: {
                bin: 'phpcs',
                standard: 'PSR2',
                report: 'summary',
                reportFile: 'build/code/lint/php/psr2.txt'
            }
        },

        // required php mess detector
        // 'require': { 'phpmd/phpmd' : '1.4.*' }
        phpmd: {
            all: {
                dir: [
                    '<%= pkg.files.php.dir %>',
                    '<%= pkg.files.tests.dir %>'
                ].join(',')
            },
            options: {
                bin: 'phpmd',
                rulesets: 'cleancode, codesize, controversial, design, naming, unusedcode',
                reportFormat: 'xml',
                reportFile: 'build/code/lint/php/mess.xml'
            }
        },

        // required phpunit
        // 'require': { 'phpunit/phpunit': '4.7.*@dev' }
        phpunit: {
            all: {
                dir: '<%= pkg.files.tests.dir %>'
            },
            options: {
                bin: 'phpunit',
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
                    checkstyleXML: 'build/code/complexity/js/checkstyle.xml',
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
                        'build/code/complexity/js',
                        'build/code/lint/php'
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
                    '<%= pkg.files.css.all %>',
                    '<%= pkg.files.js.all %>',
                    '<%= pkg.files.tests.js %>'
                ],
                options: {
                    livereload: 35729
                }
            },

            compile: {
                tasks: [ 'compile' ],
                files: [ '<%= pkg.files.css.all %>' ],
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
    grunt.registerTask('compile', [ 'less:all' ]);
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
        'csslint:all',
        'phpcs:all',
        'phpmd:all',
        'yuidoc:all'
    ]);

    grunt.loadNpmTasks('grunt-complexity');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-csslint');
    grunt.loadNpmTasks('grunt-contrib-jasmine');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-yuidoc');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-phpcs');
    grunt.loadNpmTasks('grunt-phpmd');
    grunt.loadNpmTasks('grunt-phpunit');
    grunt.loadNpmTasks('grunt-mkdir');
    grunt.loadNpmTasks('grunt-rm');
};
