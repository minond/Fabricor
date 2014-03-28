module.exports = {
    all: {
        dir: '<%= config.files.tests.dir %>'
    },
    options: {
        bin: 'bin/phpunit',
        configuration: 'config/phpunit.xml'
    }
};
