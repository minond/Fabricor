<?php

namespace MyApplication\Controller;

use Fabrico\Controller\BaseController;
use MyApplication\Model\Greeting;

class Hello extends BaseController
{
    public function greet()
    {
        $greeting = new Greeting;

        $greeting->label = isset($this->req->param->greeting) ?
            $this->req->param->greeting : 'Hello';
        $greeting->to = isset($this->req->param->to) ?
            $this->req->param->to : 'World';

        $this->resource($greeting);
    }
}
