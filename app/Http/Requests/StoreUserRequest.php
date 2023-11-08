<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
use App\Enums\Role;
use App\Enums\Policy;

class StoreUserRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return $this->user()->can(Policy::create(), $this->user()::class);
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => 'required',
            'nickname' => 'nullable',
            'role' => [
                'required',
                Rule::enum(Role::class)
            ],
            'email' => 'required|email|unique:\App\Models\User,email',
            'password' => 'exclude_if:default_checked_password,true|required|min:6',
            'default_checked_password' => 'nullable'
        ];
    }
}
