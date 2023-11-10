<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use App\Models\SharedSeries;
use App\Enums\Policy;

class StoreSharedSeriesRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return $this->user()->can(Policy::create(), SharedSeries::class);
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'format' => 'required|integer|unique:App\Models\SharedSeries,num_format_id',
            'num_start' => 'required|integer',
            'account_types' => 'required|array'
        ];
    }
}
