<?php

namespace MyApplication\Controller;

use Efficio\Http\Request;
use Efficio\Http\Response;
use MyApplication\Model\Greeting;

class Hello
{
    public function greet(Request $req, Response $res)
    {
        $greeting = new Greeting;
        $greeting->label = 'hi';
        return [ 'greeting' => $greeting ];
    }
}
