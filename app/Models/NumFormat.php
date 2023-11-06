<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class NumFormat extends Model
{
    use HasFactory;

    protected $fillable = [
        'format',
        'active'
    ];

    protected $casts = [
        'active' => 'boolean'
    ];
}
