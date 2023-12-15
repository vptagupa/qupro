<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use OwenIt\Auditing\Contracts\Auditable;

class Config extends Model implements Auditable
{
    use HasFactory;
    use \OwenIt\Auditing\Auditable;

    protected $fillable = [
        'name',
        'value',
        'label',
        'type',
        'acceptable'
    ];

    protected $casts = [
        'acceptable' => 'array'
    ];

    public static $hide = [
        'Default Screen Theme',
        'Enable category statistics',
        'Enable priority on Qu registration'
    ];

    public $watch = [
        'Screen Text',
        'Screen Interval',
        'Screen Tickets Limit',
        'Counter History Limit',
        'On Called Ring',
        'On Demand Ring'
    ];

    public $reload = [
        'Counter History Limit'
    ];

    public $screen = [
        'Screen Text',
        'Screen Interval',
        'Screen Tickets Limit',
        'On Called Ring',
        'On Demand Ring'
    ];

    /**
     * Attributes to include in the Audit.
     *
     * @var array
     */
    protected $auditInclude = [
        'name',
        'value',
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

    public static function isEnabledPriorityOnQuRegistration(): bool
    {
        return Config::where('name', 'Enable priority on Qu registration')->first()?->value ? true : false;
    }

    public static function screenTheme()
    {
        return Config::where('name', 'Default Screen Theme')->first()?->value;
    }

    public static function screenTicketsLimit()
    {
        $value = Config::where('name', 'Screen Tickets Limit')->first()?->value;

        return !$value || (int) $value <= 0 ? 1 : $value;
    }

    public static function counterHistoryLimit()
    {
        $value = Config::where('name', 'Counter History Limit')->first()?->value;
        return !$value || (int) $value <= 0 ? 1 : $value;
    }

    public static function isEnabledCategories(): bool
    {
        return Config::where('name', 'Enable categories')->first()?->value ? true : false;
    }

    public static function isEnabledCategoryStatistics(): bool
    {
        return Config::where('name', 'Enable category statistics')->first()?->value ? true : false;
    }

    public static function categoryLimit(): int
    {
        return (int) Config::where('name', 'Category Limit')->first()?->value;
    }

    public static function onCalledRing(): bool
    {
        return Config::where('name', 'On Called Ring')->first()?->value;
    }

    public static function onDemandRing(): bool
    {
        return Config::where('name', 'On Demand Ring')->first()?->value;
    }

    public static function screen()
    {
        $self = new self();
        return $self->select(['name', 'value'])->whereIn('name', $self->screen)->get()->map(function ($model) {
            $model->name = str($model->name)->snake();
            return [
                (string) $model->name => $model->value
            ];
        })->collapse()->all();
    }
}
