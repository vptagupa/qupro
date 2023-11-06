<?php

namespace App\Http\Controllers;

use Inertia\Inertia;

class AdminController extends Controller
{
    public function inertia($view, $options = [])
    {
        $inertia = Inertia::render($view, $options);

        return $inertia;
    }
}
