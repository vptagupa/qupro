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
        'value'
    ];

    public static function numstart()
    {
        return Config::where('name', 'Num Start')->first()?->value;
    }

    public static function reminderThreshold()
    {
        return Config::where('name', 'Reminder Threshold')->first()?->value;
    }

    public static function reminderBlock()
    {
        return Config::where('name', 'Reminder Block')->first()?->value;
    }
}
