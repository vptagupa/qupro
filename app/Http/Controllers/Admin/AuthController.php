<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\AdminController;
use Illuminate\Http\Request;

class AuthController extends AdminController
{
    public function login(Request $request)
    {
        return $this->inertia(
            view: "admin/auth/login",
            layout: "app-login",
        );
    }
}
