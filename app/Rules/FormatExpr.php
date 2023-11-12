<?php

namespace App\Rules;

use Closure;
use Illuminate\Contracts\Validation\ValidationRule;

use App\Models\NumFormat;

class FormatExpr implements ValidationRule
{
    /**
     * Run the validation rule.
     *
     * @param  \Closure(string): \Illuminate\Translation\PotentiallyTranslatedString  $fail
     */
    public function validate(string $attribute, mixed $value, Closure $fail): void
    {
        $patterns = [
            '/\{series\}/',
            '/\{\(\d\)series\}/',
            '/\{series\(\d\)\}/'
        ];

        $hasMatch = false;
        foreach ($patterns as $pattern) {
            $match = preg_match($pattern, $value);
            if ($match) {
                $hasMatch = true;
            }
        }

        if (!$hasMatch) {
            $fail('An expression {series} is required.');
        }
        if (preg_match_all('/(\{\w+\})/', $value, $matches)) {
            $expressions = ['{series}', '{affix}', '{delimiter}'];
            foreach ($matches[1] as $match) {
                if (!in_array($match, $expressions)) {
                    $fail("Expression {$match} is not valid.");
                }
            }
        }
    }
}
