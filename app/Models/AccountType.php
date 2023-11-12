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

    public function getQuFullText($num): string
    {
        if ($this->is_shared_series) {
            return $this->sharedSeries->format->fulltext($num);
        }

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
}
