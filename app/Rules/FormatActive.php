<?php

namespace App\Rules;

use Closure;
use Illuminate\Contracts\Validation\DataAwareRule;
use Illuminate\Contracts\Validation\ValidationRule;

use App\Models\NumFormat;

class FormatActive implements ValidationRule, DataAwareRule
{
    /**
     * All of the data under validation.
     *
     * @var array<string, mixed>
     */
    protected $data = [];

    // ...

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
        $activeId = NumFormat::where('active', 1)->pluck('id')->first();

        if (!isset($this->data['id'])) {
            if (!$value && !$activeId) {
                $fail('Activate this format since there is no other active format.');
            }
            if ($value && $activeId) {
                $fail('There is an active other format.');
            }
        } else {
            if (!$value && ($activeId == $this->data['id'] || !$activeId)) {
                $fail('Activate this format since there is no other active format.');
            }

            if ($value && $activeId && ($activeId != $this->data['id'])) {
                $fail('There is an active other format.');
            }
        }
    }
}
