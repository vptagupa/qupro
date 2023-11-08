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
                Access::DASHBOARD_ADMIN->name => [Action::ALL->name],
                Access::DASHBOARD_TELLER->name => [Action::ALL->name],
                Access::CONFIGURATIONS->name => [Action::ALL->name],
                Access::USERS->name => [Action::ALL->name],
            ],
            Role::TELLER->name => [
                Access::DASHBOARD_TELLER->name => [Action::ALL->name],
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