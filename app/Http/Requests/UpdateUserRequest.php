<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use App\Enums\Role;
use Illuminate\Validation\Rule;

class UpdateUserRequest extends FormRequest
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
        echo $this->id . 'a';
        return [
            'name' => 'required',
            'nickname' => 'nullable',
            'role' => [
                'required',
                Rule::enum(Role::class)
            ],
            'email' => [
                'required',
                Rule::unique('users')->ignore($this->id)
            ],
            'default_checked_password' => 'nullable'
        ];
    }
}
