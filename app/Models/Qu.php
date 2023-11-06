<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Qu extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'student_no',
        'student_name',
        'teller_id',
        'accoount_type_id',
        'num_fulltext',
        'priority',
        'skipped_at'
    ];

    protected $casts = [
        'skipped_at' => 'datetime'
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
