<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Casts\Attribute;

class AccountTypeColor extends Model
{
    use HasFactory;

    protected $primaryKey = 'account_type_id';

    protected $table = 'account_type_color';

    public $incrementing = false;

    protected $fillable = [
        'account_Type_id',
        'counter_bg_color',
        'counter_font_color',
        'counter_grid_color',
        'active_counter_grid_color',
    ];

    protected $casts = [
        'counter_grid_color' => 'array',
        'active_counter_grid_color' => 'array',
    ];
}
