<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

use App\Enums\Screen;

class Screen extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'screen',
        'account_type_ids',
    ];

    protected $casts = [
        'account_type_ids' => 'array',
        'screen' => Screen::class
    ];
}
