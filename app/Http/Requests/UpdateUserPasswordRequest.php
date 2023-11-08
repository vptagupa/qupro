<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\Password;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use Closure;

class UpdateUserPasswordRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'password' => [
                'required',
                Password::min(6)->uncompromised()->letters()->numbers(),
                function (string $attribute, mixed $value, Closure $fail) {
                    if (Hash::check($value, Auth::user()->password)) {
                        $fail("Use different {$attribute}.");
                        return;
                    }
                    if (Hash::check($value, bcrypt(config('auth.default_password')))) {
                        $fail("Use different {$attribute}.");
                    }
                }
            ],
        ];
    }

    /**
     * Handle a passed validation attempt.
     */
    protected function passedValidation(): void
    {
        $this->replace(['password' => bcrypt($this->password)]);
    }
}
