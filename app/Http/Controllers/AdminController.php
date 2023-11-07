<?php

namespace App\Http\Controllers;

use Inertia\Inertia;

class AdminController extends Controller
{
    public function inertia($view, $options = [], $layout = "app-admin")
    {
        $inertia = Inertia::render($view, $options);

        $inertia->rootView($layout);

        return $inertia;
    }
}
