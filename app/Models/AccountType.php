<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Casts\Attribute;

class AccountType extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'num_format_id',
        'num_start',
        'reset_at',
        'reset_by'
    ];

    protected $casts = [
        'reset_at' => 'datetime'
    ];

    public function resetBy()
    {
        return $this->belongsTo(User::class, 'reset_by');
    }

    public function format()
    {
        return $this->belongsTo(NumFormat::class, 'num_format_id');
    }

    public function isSharedSeries(): Attribute
    {
        return Attribute::make(
            get: fn() => $this->shared_series ? true : false
        );
    }

    public function sharedSeries(): Attribute
    {
        return Attribute::make(
            get: fn() => SharedSeries::whereJsonContains('account_type_ids', $this->id)->first()
        );
    }

    public function getQuNumFullText($num): string
    {
        return $this->format->fulltext($num);
    }

    public function getNumStart()
    {
        $num = $this->num_start;
        if ($this->is_shared_series) {
            $num = $this->sharedSeries->num_start;
        }

        return $num;
    }

    public function currentNoneSharedSeries()
    {
        return $this->hasOne(Series::class)->latestOfMany();
    }

    public function currentSharedSeries()
    {
        return Series::whereSharedSeriesId($this->shared_series->id)->first();
    }

    public function currentSeries()
    {
        if ($this->is_shared_series) {
            return $this->currentSharedSeries();
        }

        return $this->currentNoneSharedSeries;
    }

    public function getNextSeriesNum()
    {
        $series = $this->currentSeries();

        // Use default num
        $num = $this->getNumStart();
        // Increase series if exists
        if ($series?->num) {
            $num = $series->num + 1;
        }
        // use global config instead
        if (!$num) {
            $num = Config::numstart() ?? 1;
        }

        return $num;
    }

    public function getNextSeriesNumFullText()
    {
        return $this->getQuNumFullText($this->getNextSeriesNum());
    }
}
