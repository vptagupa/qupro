<?php

namespace App\Enums;

enum PriorityType: string
{
    case REGULAR = 'regular';
    case PRIORITY = 'priority';

    public function isPriority(): bool
    {
        return $this === self::PRIORITY;
    }
}