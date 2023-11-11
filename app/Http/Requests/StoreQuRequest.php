<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
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
            // 'name' => 'required_if:type,other|string',
            // 'student_no' => 'required_if,type,student|required_if,is_representative,true|string',
            // 'student_name' => 'required_if,type,student|required_if,is_representative,true|string',
            // 'account_type' => 'required|integer',
            // 'is_representative' => 'nullable',
        ];
    }
}
