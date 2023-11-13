<?php

namespace App\Enums;

enum Type: string
{
    case STUDENT = 'student';
    case OTHER = 'other';

    public function isStudent(): bool
    {
        return $this === self::STUDENT;
    }
}