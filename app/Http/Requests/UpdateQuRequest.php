<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
use App\Enums\Type;
use App\Models\Qu;
use App\Enums\Policy;

class UpdateQuRequest extends FormRequest
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
            'name' => 'required_if:type,other|nullable',
            'student_info.student_no' => 'required_if:type,student|required_if:is_representative,true',
            'student_info.name' => 'required_if:type,student|nullable',
            'account_type.id' => 'required|integer',
            'is_representative' => 'nullable',
        ];
    }
}
