<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use App\Models\Category;
use App\Enums\Policy;
use Illuminate\Validation\Rule;
use App\Rules\File;

class UpdateCategoryRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return $this->user()->can(Policy::updateAny(), Category::class);
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
            'name' => ['required', 'string', Rule::unique('categories')->ignore($this->id)],
            'description' => 'nullable',
            'file' => array_merge(File::ensure($this->file), [
                'nullable',
            ])
        ];
    }
}
