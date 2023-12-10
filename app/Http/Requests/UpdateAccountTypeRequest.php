<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use App\Models\Config;
use App\Rules\File;
use App\Models\AccountType;
use App\Enums\Policy;
use Illuminate\Validation\Rule;

class UpdateAccountTypeRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return $this->user()->can(Policy::updateAny(), AccountType::class);
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
            'name' => ['required', Rule::unique('account_types')->ignore($this->id)],
            'num_format_id' => 'required|integer',
            'priority_format_id' => 'nullable|integer',
            'num_start' => 'nullable|integer',
            'categories' => Config::isEnabledCategories() ? 'required' : 'nullable',
            'file' => array_merge(File::ensure($this->file), [
                'nullable',
            ])
        ];
    }

    protected function prepareForValidation(): void
    {
        if (Config::isEnabledCategories())
            $this->merge([
                'categories' => array_map(fn($cat) => $cat['id'], $this->categories)
            ]);
    }

    /**
     * Get custom attributes for validator errors.
     *
     * @return array<string, string>
     */
    public function attributes(): array
    {
        return [
            'num_format_id' => 'format',
            'priority_format_id' => 'priority format',
        ];
    }

    /**
     * Get the error messages for the defined validation rules.
     *
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'file.dimensions' => File::message()
        ];
    }
}
