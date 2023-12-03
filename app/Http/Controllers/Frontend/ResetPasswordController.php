<?php

namespace App\Http\Controllers\Frontend;

use App\Http\Controllers\Controller;
use App\Http\Requests\ResetPasswordRequest;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Password;
use Illuminate\Support\Str;
use Illuminate\Auth\Events\PasswordReset;
use App\Models\User;

class ResetPasswordController extends Controller
{

    /**
     * Display a page resource.
     */
    public function index(string $token)
    {
        return $this->render(
            view: 'password/reset/index',
            layout: "app-auth",
            options: [
                'token' => $token
            ]
        );
    }

    /**
     * Validate form and send email reset password notification
     */
    public function update(ResetPasswordRequest $request)
    {
        $status = Password::reset(
            $request->safe()->only('email', 'password', 'password_confirmation', 'token'),
            function (User $user, string $password) {
                $user->forceFill([
                    'password' => Hash::make($password)
                ])->setRememberToken(Str::random(60));

                $user->save();

                event(new PasswordReset($user));
            }
        );

        return $status === Password::PASSWORD_RESET
            ? $this->render('password/reset/index', [
                'status' => __($status)
            ])
            : back()->withErrors(['email' => [__($status)]]);
    }
}
