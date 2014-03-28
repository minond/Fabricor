module.exports = {
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
};
