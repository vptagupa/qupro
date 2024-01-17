<?php

namespace App\Enums;

enum Settings: string
{
    case THEME_TRANSACTION = 'Transaction';
    case THEME_DEPARTMENT = 'Department';

    public static function themes()
    {
        return [
            [
                'id' => 1,
                'name' => 'Transaction',
                'repository' => \App\Repositories\AccountTypeRepository::class
            ],
            [
                'id' => 2,
                'name' => 'Department',
                'repository' => \App\Repositories\CategoryRepository::class
            ]
        ];
    }
}