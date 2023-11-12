<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Qu extends Model
{
    use HasFactory;

    protected $fillable = [
        'type',
        'name',
        'student_no',
        'student_name',
        'teller_id',
        'accoount_type_id',
        'num_fulltext',
        'priority',
        'skipped_at',
        'is_representative'
    ];

    protected $casts = [
        'skipped_at' => 'datetime',
        'is_representative' => 'boolean'
    ];

    public function teller()
    {
        return $this->belongsTo(User::class);
    }

    public function accountType()
    {
        return $this->belongsTo(AccountType::class);
    }
}
