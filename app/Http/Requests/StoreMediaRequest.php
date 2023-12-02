<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use App\Models\File as Model;
use App\Enums\Policy;
use Illuminate\Validation\Rules\File;
use Illuminate\Validation\Rule;

class StoreMediaRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return $this->user()->can(Policy::create(), Model::class);
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        $videoTypes = ['mp4'];
        $imageTypes = ['jpg', 'jpeg', 'png'];

        return [
            'file' => [
                'required',
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
                    })()),
                (function () use ($imageTypes) {
                    $imageTypes = array_map(fn($type) => 'image/' . $type, $imageTypes);
                    if (in_array($this->file?->getMimeType() ?? '', $imageTypes)) {
                        return Rule::dimensions()->width(1920)->height(1080);
                    }
                })()
            ]
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
            'file.dimensions' => 'Please use 1920 x 1080 image dimensions',
        ];
    }
}
