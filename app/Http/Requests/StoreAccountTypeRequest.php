<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\File;
use App\Models\AccountType;
use App\Enums\Policy;
use Illuminate\Validation\Rule;

class StoreAccountTypeRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return $this->user()->can(Policy::create(), AccountType::class);
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        $videoTypes = ['mp4'];
        $imageTypes = ['jpg', 'png'];

        return [
            'name' => 'required|unique:App\Models\AccountType',
            'num_format_id' => 'required|integer',
            'priority_format_id' => 'nullable|integer',
            'num_start' => 'nullable|integer',
            'file' => [
                'nullable',
                File::types([
                    ...$videoTypes,
                    ...$imageTypes,
                ])
                    ->max((function () use ($videoTypes, $imageTypes) {
                        $videoTypes = array_map(fn($type) => 'video/' . $type, $videoTypes);
                        $imageTypes = array_map(fn($type) => 'image/' . $type, $imageTypes);

                        $file = $this->file;

                        if (in_array($file?->getMimeType() ?? '', $videoTypes)) {
                            return config('media.video_max') * 1024;
                        }

                        return config('media.image_max') * 1024;
                    })())
            ]
        ];
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
}
