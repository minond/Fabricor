<?php

namespace MyApplication\Controller;

use Fabrico\Controller\BaseController;
use MyApplication\Model\Greeting;

class Hello extends BaseController
{
    public function greet()
    {
        $greeting = new Greeting;
        $greeting->label = isset($this->req->param->name) ?
            $this->req->param->name : 'World';
        $this->resource($greeting);
    }
}
