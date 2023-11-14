<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Enums\Type;

class Qu extends Model
{
    use HasFactory;

    protected $fillable = [
        'type',
        'name',
        'student_no',
        'student_name',
        'teller_id',
        'account_type_id',
        'num_fulltext',
        'teller_name',
        'priority',
        'skipped_at',
        'completed_at',
        'called_at',
        'is_representative',
    ];

    protected $appends = [
        'is_student'
    ];

    protected $casts = [
        'skipped_at' => 'datetime',
        'completed_at' => 'datetime',
        'is_representative' => 'boolean',
        'called_at' => 'datetime',
        'type' => Type::class
    ];

    public function teller()
    {
        return $this->belongsTo(User::class);
    }

    public function accountType()
    {
        return $this->belongsTo(AccountType::class);
    }

    public function isStudent(): Attribute
    {
        return Attribute::make(
            get: fn() => $this->type->isStudent()
        );
    }
}
