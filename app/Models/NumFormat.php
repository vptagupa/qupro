<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class NumFormat extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'affix',
        'delimiter',
        'format',
        'active'
    ];

    protected $casts = [
        'active' => 'boolean'
    ];

    public function scopeActive($query)
    {
        return $query->where('active', true);
    }
}
