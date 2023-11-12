<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use App\Models\SharedSeries;
use App\Enums\Policy;
use Illuminate\Validation\Rule;

class UpdateSharedSeriesRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return $this->user()->can(Policy::updateAny(), SharedSeries::class);
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
            // 'format' => [Rule::excludeIf(!$this->format), 'integer', Rule::unique('shared_series', 'num_format_id')->ignore($this->id)],
            'num_start' => 'required|integer',
            'account_types' => 'required|array',
            'priority' => 'nullable'
        ];
    }
}
