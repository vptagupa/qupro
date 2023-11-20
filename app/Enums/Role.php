<?php

namespace App\Enums;

enum Role: string
{
    case ADMIN = "administrator";
    case TELLER = "teller";
    case REGISTRATION = "registration";

    public static function all(): array
    {
        return array_map(function ($role) {
            return $role->toArray();
        }, Role::cases());
    }

    public function toArray(): array
    {
        return [
            'id' => str($this->value)->slug(),
            'name' => str($this->value)->ucfirst()
        ];
    }

}