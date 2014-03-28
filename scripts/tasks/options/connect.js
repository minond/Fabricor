// go to http://localhost:9000
module.exports = {
    server: {
        options: {
            keepalive: true,
            debug: true,
            hostname: '0.0.0.0',
            port: '<%= config.server.port %>',
            base: '.'
        }
    }
};
