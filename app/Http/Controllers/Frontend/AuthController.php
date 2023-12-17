<?php

namespace App\Http\Controllers\Frontend;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Http\Requests\UpdateUserPasswordRequest;
use App\Repositories\UserRepository;

class AuthController extends Controller
{
    public function __construct(private UserRepository $repository)
    {
        // 
    }

    public function login(Request $request)
    {
        return $this->render(
            view: "auth/index",
        );
    }

    public function changePassword(Request $request)
    {
        return $this->render(
            view: "auth/reset",
        );
    }

    public function updatePassword(UpdateUserPasswordRequest $request)
    {
        $user = Auth::user();
        $this->repository->update($request->validationData(), $user->id);

        return redirect()->intended('/admin/dashboard');
    }

    public function auth(Request $request)
    {
        $credentials = $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        if (Auth::attempt($credentials, $request->get('remember'))) {

            $request->session()->regenerate();

            return $this->redirectTo();
        }

        return $this->render(
            view: "auth/index",
            options: [
                'errors' => [
                    'message' => 'The provided credentials do not match our records.'
                ]
            ]
        );
    }

    public function redirectTo()
    {
        $intended = '/admin/tellers';
        $user = Auth::user();
        if ($user->isTeller()) {
            $intended = '/admin/tellers';
        } elseif ($user->isRegistrator()) {
            $intended = '/admin/qu';
        }

        return redirect()->intended($intended);
    }

    public function logout(Request $request)
    {
        Auth::logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect(route('login.index'));
    }
}
