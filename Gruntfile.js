module.exports = function (grunt) {
    "use strict";

    var files = {
        js: {
            dir: 'app/client',
            all: 'app/client/*'
        },

        css: {
            all: 'public/css/*.css'
        },

        tests: {
            all: 'tests/*'
        }
    };

    grunt.initConfig({
        jshint: {
            all: {
                src: [ files.js.all ],
                options: {
                    globals: [ 'require' ]
                }
            },
            report: {
                src: [ files.js.all ],
                options: {
                    globals: [ 'require' ],
                    reporterOutput: 'build/code/lint/jshint.txt'
                }
            }
        },

        // docs: https://github.com/stubbornella/csslint/wiki/Rules
        csslint: {
            all: {
                // TODO: complete rules/options
                options: {
                    'import': 2,
                    'important': 2,
                    'empty-rules': 2,

                    formatters: [
                        {
                            id: 'junit-xml',
                            dest: 'build/code/lint/csslint_junit.xml'
                        },
                        {
                            id: 'csslint-xml',
                            dest: 'build/code/lint/csslint.xml'
                        }
                    ]
                },
                src: [ files.css.all ]
            }
        },

        // docs: https://github.com/vigetlabs/grunt-complexity
        // complexity: http://jscomplexity.org/complexity
        complexity: {
            all: {
                src: [ files.js.all ],
                options: {
                    jsLintXML: 'build/code/complexity/report.xml',
                    checkstyleXML: 'build/code/complexity/checkstyle.xml',
                    breakOnErrors: false,
                    errorsOnly: false,
                    cyclomatic: [ 3, 7, 12 ],
                    halstead: [ 8, 13, 20 ],
                    maintainability: 100
                }
            }
        },

        jasmine: {
            all: {
                src: [ files.js.all ],
                options: {
                    specs: [ files.tests.all ],
                    template: require('grunt-template-jasmine-istanbul'),
                    templateOptions: {
                        coverage: 'build/tests/js/converage.json',
                        report: 'build/tests/js/report/',

                        // thresholds: {
                        //     lines: 75,
                        //     statements: 75,
                        //     branches: 75,
                        //     functions: 90
                        // },

                        template: require('grunt-template-jasmine-requirejs'),

                        // requirejs template configuration:
                        templateOptions: {
                        }
                    },
                    junit: {
                        path: 'build/tests/js/junit'
                    }
                }
            }
        },

        yuidoc: {
            all: {
                // name: '<%= pkg.name %>',
                // description: '<%= pkg.description %>',
                // version: '<%= pkg.version %>',
                options: {
                    paths: 'src',
                    outdir: 'build/code/documentation'
                }
            }
        },

        // go to http://localhost:9000
        connect: {
            server: {
                options: {
                    keepalive: true,
                    debug: true,
                    hostname: 'localhost',
                    port: 9000,
                    base: '.'
                }
            }
        },

        mkdir: {
            build: {
                options: {
                    create: [
                        'build/code/complexity'
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
            code: {
                files: [
                    files.js.all,
                    files.tests.all,
                    files.css.all
                ],
                tasks: ['code'],
                options: {
                    livereload: 35729
                }
            },
            tests: {
                files: [
                    files.js.all,
                    files.tests.all
                ],
                tasks: ['test'],
                options: {
                    livereload: 35729
                }
            }
        }
    });

    grunt.registerTask('default', [ 'build' ]);
    grunt.registerTask('build', [ 'clean', 'quality', 'test' ]);
    grunt.registerTask('clean', [ 'rm:build' ]);
    grunt.registerTask('test', [ 'jasmine:all' ]);
    grunt.registerTask('documentation', [ 'yuidoc:all' ]);
    grunt.registerTask('quality', [
        'mkdir:build',
        'complexity:all',
        'jshint:all',
        'jshint:report',
        'csslint:all',
        'yuidoc:all'
    ]);

    grunt.loadNpmTasks('grunt-complexity');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-csslint');
    grunt.loadNpmTasks('grunt-contrib-jasmine');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-yuidoc');
    grunt.loadNpmTasks('grunt-mkdir');
    grunt.loadNpmTasks('grunt-rm');
};
