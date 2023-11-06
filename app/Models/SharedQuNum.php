<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SharedQuNum extends Model
{
    use HasFactory;

    protected $fillable = [
        'format_ids',
        'num_start'
    ];

    protected $casts = [
        'format_ids' => 'json'
    ];
}
