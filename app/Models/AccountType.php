<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AccountType extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'format_id',
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
        return $this->belongsTo(NumFormat::class);
    }
}
