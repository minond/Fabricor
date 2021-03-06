<?php

namespace Application\Controller;

use Fabrico\Controller\BaseController;
use Application\Model\Greeting;

class Hello extends BaseController
{
    public function greet()
    {
        $greeting = new Greeting;

        $greeting->label = isset($this->req->param->greeting) ?
            $this->req->param->greeting : 'Hello';
        $greeting->noun = isset($this->req->param->noun) ?
            $this->req->param->noun : 'World';

        $this->resource($greeting);
    }
}
