<?php

namespace App\Enums;

enum Role: string
{
    case ADMIN = "administrator";
    case TELLER = "teller";

    public static function all(): array
    {
        return array_map(function ($role) {
            return $role->toArray();
        }, Role::cases());
    }

    public function toArray(): array
    {
        return [
            'id' => str()->slug($this->value),
            'name' => str()->ucfirst($this->value)
        ];
    }

}