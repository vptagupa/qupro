<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Casts\Attribute;

class Config extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'value',
        'label',
        'type'
    ];

    public static function numstart()
    {
        return Config::where('name', 'Num start')->first()?->value;
    }

    public static function reminderThreshold(): int
    {
        return Config::where('name', 'Reminder threshold')->first()?->value;
    }

    public static function reminderBlock(): int
    {
        return Config::where('name', 'Reminder block')->first()?->value;
    }

    public static function enableSkipButton(): int
    {
        return Config::where('name', 'Enable skip button in seconds')->first()?->value;
    }

    public static function isPrioritySeriesSeparate(): bool
    {
        return Config::where('name', 'Priority Series Separate')->first()?->value ? true : false;
    }

    public static function screenMessage()
    {
        return Config::where('name', 'Screen Text')->first()?->value;
    }

    public static function screenInterval()
    {
        return Config::where('name', 'Screen Interval')->first()?->value;
    }
}
