<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AccountTypeTheme extends Model
{
    use HasFactory;

    protected $fillable = [
        'account_Type_id',
        'name',
        'value',
    ];

    protected $casts = [
        'value' => 'array'
    ];
}
