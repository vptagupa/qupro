<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use App\Models\NumFormat;
use App\Rules\FormatExpr;
use App\Enums\Policy;

class StoreNumFormatRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return $this->user()->can(Policy::create(), NumFormat::class);
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'title' => 'required',
            'affix' => 'nullable',
            'delimiter' => 'nullable',
            'active' => 'nullable|boolean',
            'format' => ['required', new FormatExpr()],
        ];
    }
}
