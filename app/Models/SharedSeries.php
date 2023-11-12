<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Casts\Attribute;

class SharedSeries extends Model
{
    use HasFactory;

    protected $fillable = [
        'account_type_ids',
        'num_format_id',
        'num_start',
        'priority'
    ];

    protected $casts = [
        'account_type_ids' => 'json',
        'priority' => 'boolean'
    ];

    protected $appends = [
        'account_types'
    ];

    public function format()
    {
        return $this->belongsTo(NumFormat::class, 'num_format_id');
    }

    public function accountTypes(): Attribute
    {
        return Attribute::make(
            get: fn() => AccountType::whereIn('id', $this->account_type_ids)->get()
        );
    }
}
