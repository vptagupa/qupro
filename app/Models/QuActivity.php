<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class QuActivity extends Model
{
    use HasFactory;

    protected $fillable = [
        'account_type_id',
        'num',
        'num_fulltext',
    ];

    public function accountType()
    {
        return $this->belongsTo(AccountType::class);
    }
}
