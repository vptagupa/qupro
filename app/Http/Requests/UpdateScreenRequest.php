<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use App\Models\Screen as Model;
use App\Enums\Policy;
use App\Enums\Screen;
use Illuminate\Validation\Rule;

class UpdateScreenRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return $this->user()->can(Policy::updateAny(), Model::class);
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'id' => 'required',
            'name' => 'required|string',
            'account_type_ids' => 'required|array',
            'screen' => Rule::enum(Screen::class)
        ];
    }

    public function prepareForValidation(): void
    {
        $this->merge([
            'account_type_ids' => array_map(fn($type) => $type['id'], $this->account_types)
        ]);
    }
}
