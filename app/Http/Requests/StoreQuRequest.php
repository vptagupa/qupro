<?php

namespace App\Http\Requests;

use App\Models\Config;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
use App\Enums\Type;
use App\Models\Qu;
use App\Enums\Policy;

class StoreQuRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return $this->user()->can(Policy::create(), Qu::class);
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'type' => [
                'required',
                Rule::enum(Type::class)
            ],
            'priority' => 'nullable',
            'name' => 'required_if:type,other|nullable',
            'student_no' => 'required_if:type,student|required_if:is_representative,true',
            'student_name' => 'required_if:type,student|nullable',
            'account_type_id' => 'required|integer',
            'category_id' => Config::isEnabledCategories() ? 'required|integer' : 'nullable',
            'is_representative' => 'nullable',
        ];
    }

    protected function prepareForValidation(): void
    {
        $this->merge([
            'priority' => $this->is_priority ? true : false,
            'account_type_id' => $this->account_type['id'],
            'student_no' => $this->student_info['student_no'],
            'student_name' => $this->student_info['name'],
            ...Config::isEnabledCategories() ? ['category_id' => $this->category['id']] : []
        ]);
    }
}
