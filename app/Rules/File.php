<?php

namespace App\Rules;

use Closure;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Rules\File as FileValidator;
use Illuminate\Http\UploadedFile;

class File implements ValidationRule
{
    /**
     * All of the data under validation.
     *
     * @var array<string, mixed>
     */
    protected $data = [];

    /**
     * Set the data under validation.
     *
     * @param  array<string, mixed>  $data
     */
    public function setData(array $data): static
    {
        $this->data = $data;

        return $this;
    }

    /**
     * Run the validation rule.
     *
     * @param  \Closure(string): \Illuminate\Translation\PotentiallyTranslatedString  $fail
     */
    public function validate(string $attribute, mixed $value, Closure $fail): void
    {
        //
    }

    public static function ensure($file)
    {
        $videoTypes = ['mp4'];
        $imageTypes = ['jpg', 'jpeg', 'png'];

        if (!$file instanceof UploadedFile) {
            return [];
        }

        return [
            FileValidator::types([
                ...$videoTypes,
                ...$imageTypes,
            ])
                ->max((function () use ($videoTypes, $imageTypes, $file) {
                    $videoTypes = array_map(fn($type) => 'video/' . $type, $videoTypes);
                    $imageTypes = array_map(fn($type) => 'image/' . $type, $imageTypes);


                    if (in_array($file?->getMimeType() ?? '', $videoTypes)) {
                        return config('media.video_max') * 1024;
                    }

                    return config('media.image_max') * 1024;
                })()),
            (function () use ($imageTypes, $file) {
                $imageTypes = array_map(fn($type) => 'image/' . $type, $imageTypes);
                if (in_array($file?->getMimeType() ?? '', $imageTypes)) {
                    return Rule::dimensions()->Width(1920)->height(1080);
                }
            })()
        ];
    }


    public static function message()
    {
        return 'Please use 1920 x 1080 image dimensions';
    }
}
