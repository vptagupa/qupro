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

    protected $attrib = [
        'priority_series_separate' => [
            'data_type' => 'boolean',
            'label' => 'If enabled, priority series does not continue from the regular series'
        ],
    ];

    protected $appends = ['attrib'];

    public static function numstart()
    {
        return Config::where('name', 'Num Start')->first()?->value;
    }

    public static function reminderThreshold(): int
    {
        return Config::where('name', 'Reminder Threshold')->first()?->value;
    }

    public static function reminderBlock(): int
    {
        return Config::where('name', 'Reminder Block')->first()?->value;
    }

    public static function isPrioritySeriesSeparate(): bool
    {
        return Config::where('name', 'Priority Series Separate')->first()?->value ? true : false;
    }

    public function attrib(): Attribute
    {
        return Attribute::make(
            get: fn() => $this->attrib[str()->snake($this->name)] ?? null
        );
    }
}
