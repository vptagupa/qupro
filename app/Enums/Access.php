<?php

namespace App\Enums;

use App\Models\Config;

enum Access
{
    case DASHBOARD_ADMIN;
    case DASHBOARD_TELLER;
    case USERS;
    case CONFIGURATIONS;
    case SHARED_SERIES;
    case ACCOUNT_TYPES;
    case CATEGORIES;
    case QU;
    case ADVANCE_PRINT;
    case SCREEN;
    case REGISTRATION;
    case AUDIT;
    case FORMATS;
    case SCREENS;

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
                Access::ACCOUNT_TYPES->name => [Action::ALL->name],
                Access::SHARED_SERIES->name => [Action::ALL->name],
                    // Access::ADVANCE_PRINT->name => [Action::ALL->name],
                Access::SCREEN->name => [Action::ALL->name],
                Access::REGISTRATION->name => [Action::ALL->name],
                Access::AUDIT->name => [Action::ALL->name],
                ...Config::isEnabledCategories() ?
                [Access::CATEGORIES->name => [Action::ALL->name]] : [],
                Access::FORMATS->name => [Action::ALL->name],
                Access::SCREENS->name => [Action::ALL->name],
            ],
            Role::TELLER->name => [
                Access::DASHBOARD_TELLER->name => [Action::ALL->name],
                Access::REGISTRATION->name => [Action::ALL->name],
                Access::SCREEN->name => [Action::ALL->name],
                ...Config::isEnabledCategories() ?
                [Access::CATEGORIES->name => [Action::VIEW_ANY->name]] : [],
            ],
            Role::REGISTRATION->name => [
                Access::REGISTRATION->name => [Action::ALL->name],
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