<?php

namespace App\Http\Controllers;

use Inertia\Inertia;

class AdminController extends Controller
{
    public function render($view, $options = [], $layout = "app-admin")
    {
        $inertia = $this->inertia()::render($view, $options);

        $inertia->rootView($layout);

        return $inertia;
    }

    public function inertia()
    {
        return new Inertia;
    }
}
