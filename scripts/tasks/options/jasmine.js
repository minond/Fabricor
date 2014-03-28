module.exports = {
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
};
