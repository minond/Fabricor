<?php

namespace MyApplication\Controller;

use Efficio\Http\Request;
use Efficio\Http\Response;

class Hello
{
    public function greet(Request $req, Response $res)
    {
        return [ 'greeting' => 'hi' ];
    }
}
