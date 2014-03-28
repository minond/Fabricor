module.exports = {
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
};
