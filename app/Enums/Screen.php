<?php

namespace App\Enums;

enum Screen: string
{
    case BASIC = 'basic';
    case STANDARD = 'standard';
    case PREMIUM = 'premium';

    public static function all(): array
    {
        return array_map(function ($case) {
            return $case->toArray();
        }, self::cases());
    }

    public function toArray(): array
    {
        return [
            'id' => str($this->value)->slug(),
            'name' => str($this->value)->ucfirst()
        ];
    }
}