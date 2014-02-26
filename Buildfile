#!/bin/bash

require fs
require git

conf:name Fabricor
conf:git:host github.com

task @build "build this project"
task watch "run build on modifications"
task clean "clean up files generated by build"
task prepare "setup files and directories needed to run app"
task dependencies "install code dependencies"
task tests "run unit tests"
task quality "code quality tools"
task documentation "genearate code documentation"

build() {
    clean
    prepare
    dependencies
    tests
    quality
    documentation
}

watch() {
    run:watch . build
}

clean() {
    run:fs:rmdir build
}

prepare() {
    run:fs:mkdir build
    run:fs:mkdir bin
    run "bin dir permissions" chmod +x bin/*
    run:fs:mkdir .cache
    run "cache dir permissions" chmod 777 .cache
}

dependencies() {
    run "composer install" composer install --dev
    run "bower install" bower install
}

tests() {
    run "phpunit tests" phpunit
}

quality() {
    run:fs:mkdir build/code/php
    run "lines of code" phploc --log-xml=build/code/php/loc.xml \
        --count-tests app tests
    run "psr-2 coding standards" phpcs --standard=PSR2 --report=summary \
        --report-full=build/code/php/psr2.txt app tests scripts
}

documentation() {
    run:fs:rmdir build/docs/php
    run:fs:mkdir build/docs/php
    run "php documentation" apigen -s=app -d=build/docs/php --todo=yes \
        --colors=no --progressbar=no
}

