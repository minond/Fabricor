module.exports = {
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
};
