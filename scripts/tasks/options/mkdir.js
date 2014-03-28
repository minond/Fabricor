module.exports = {
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
};
