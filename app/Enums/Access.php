<?php

namespace App\Enums;

enum Access
{
    case DASHBOARD_ADMIN;
    case DASHBOARD_TELLER;
    case USERS;
    case CONFIGURATIONS;

    public static function all(): array
    {
        return array_map(fn($access) => $access->toArray(), Access::cases());
    }

    public static function permissions()
    {
        return [
            Role::ADMIN->name => [
                Access::DASHBOARD_ADMIN->name,
                Access::DASHBOARD_TELLER->name,
                Access::CONFIGURATIONS->name,
                Access::USERS->name
            ],
            Role::TELLER->name => [
                Access::DASHBOARD_TELLER->name,
            ]
        ];
    }

    public function toArray(): array
    {
        return [
            $this->name => $this->name
        ];
    }
}