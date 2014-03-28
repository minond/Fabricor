// docs: https://github.com/vigetlabs/grunt-complexity
// complexity: http://jscomplexity.org/complexity
module.exports = {
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
};
