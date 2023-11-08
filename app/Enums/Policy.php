<?php

namespace App\Enums;

enum Policy: string
{
    case VIEW_ANY = "viewAny";
    case VIEW = "view";
    case CREATE = "create";
    case DELETE = "delete";
    case UPDATE = "update";
    case RESTORE = "restore";
    case FORCE_DELETE = "forceDelete";

    public static function viewAny(): string
    {
        return self::VIEW_ANY->value;
    }
    public static function view(): string
    {
        return self::VIEW->value;
    }

    public static function create(): string
    {
        return self::CREATE->value;
    }

    public static function delete(): string
    {
        return self::DELETE->value;
    }

    public static function update(): string
    {
        return self::UPDATE->value;
    }

    public static function restore(): string
    {
        return self::RESTORE->value;
    }

    public static function forceDelete(): string
    {
        return self::FORCE_DELETE->value;
    }
}