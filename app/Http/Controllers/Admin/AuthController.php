<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\AdminController;
use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\URL;


class AuthController extends AdminController
{
    public function login(Request $request)
    {
        return $this->render(
            view: "admin/auth/login",
            layout: "app-login",
        );
    }

    public function auth(Request $request)
    {
        $credentials = $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        if (Auth::attempt($credentials, $request->get('remember'))) {
            $request->session()->regenerate();

            return $this->inertia()::location(route('admin.dashboard.index'));
        }

        return $this->render(
            view: "admin/auth/login",
            layout: "app-login",
            options: [
                'errors' => [
                    'message' => 'The provided credentials do not match our records.'
                ]
            ]
        );
    }

    public function logout(Request $request)
    {
        Auth::logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return $this->inertia()::location(route('login'));
    }
}
