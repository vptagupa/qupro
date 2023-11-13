<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use App\Models\Qu;
use App\Enums\Policy;
use App\Enums\PriorityType;

class NextQuRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return $this->user()->can(Policy::updateAny(), Qu::class);
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'priority' => 'required|boolean',
            'qu.id' => 'integer',
            'account_type.id' => 'integer|required'
        ];
    }

    protected function prepareForValidation(): void
    {
        $this->merge([
            'priority' => $this->priority == PriorityType::PRIORITY->value
        ]);
    }
}
