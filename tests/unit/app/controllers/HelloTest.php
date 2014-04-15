<?php

namespace Application\Tests\Unit\Controller;

use PHPUnit_Framework_TestCase;
use Application\Controller\Hello;
use Efficio\Http\Request;

class HelloTest extends PHPUnit_Framework_TestCase
{
    /**
     * @var Hello
     */
    public $hello_controller;

    public function setUp()
    {
        $this->hello_controller = new Hello;
    }

    public function testGreetActionUsesDefaultGreeting()
    {
        $this->hello_controller->greet();
        $resource = $this->hello_controller->resource;
        $greeting = $resource['greeting'];
        $this->assertEquals('Hello', $greeting->label);
    }

    public function testGreetActionUsesDefaultName()
    {
        $this->hello_controller->greet();
        $resource = $this->hello_controller->resource;
        $greeting = $resource['greeting'];
        $this->assertEquals('World', $greeting->noun);
    }
}
