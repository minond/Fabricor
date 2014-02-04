<?php

namespace MyApplication\Controller;

use Efficio\Http\Request;
use Efficio\Http\Response;
use Fabrico\Controller\BaseController;
use MyApplication\Model\Greeting;

class Hello extends BaseController
{
    public function greet()
    {
        $greeting = new Greeting;
        $greeting->label = 'hi';
        $this->resource($greeting);
    }
}
