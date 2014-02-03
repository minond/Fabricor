<?php

namespace Fabrico\Runtime\Setup;

use Fabrico\Application;
use Efficio\Configurare\Configuration;
use Efficio\Cache\RuntimeCache;

// from scripts to root of project
if (getcwd() === __dir__) {
    chdir('..');
}

// autoloader
require 'vendor/autoload.php';

return call_user_func(function() {
    $app = new Application;

    $conf = new Configuration;
    $conf->setFormat(Configuration::YAML);
    $conf->setDirectory('config');
    $conf->setEnvironments(getenv('APP_ENV'));

    $app->setConfiguration($conf);
    $app->initialize('config');
    $app->initialize('config_macros');
    $conf->setCache(new RuntimeCache);

    return Application::bind($app);
});

