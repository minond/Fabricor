<?php

namespace Application\Tests\Feature\Bootstrap;

use Behat\Behat\Context\BehatContext;
use Behat\Behat\Context\ClosuredContextInterface;
use Behat\Behat\Context\TranslatedContextInterface;
use Behat\Behat\Exception\PendingException;
use Behat\Gherkin\Node\PyStringNode;
use Behat\Gherkin\Node\TableNode;
use Behat\MinkExtension\Context\MinkContext;

/**
 * run `bin/behat -dl` to see available api
 */
class FeatureContext extends MinkContext
{
    // /**
    //  * initializes context.
    //  * every scenario gets its own context object.
    //  *
    //  * @param array $parameters context parameters (in config/behat.yml)
    //  */
    // public function __construct(array $parameters)
    // {
    // }

    // /**
    //  * @Given /^I have done something with "([^"]*)"$/
    //  */
    // public function iHaveDoneSomethingWith($argument)
    // {
    //     doSomethingWith($argument);
    // }
}
