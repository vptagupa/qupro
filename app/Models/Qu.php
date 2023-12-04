<?php

namespace App\Models;

use App\Events\QuCreated;
use App\Events\ScreenQuCreated;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Enums\Type;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Builder;

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
        'num',
        'counter_name',
        'priority',
        'skipped_at',
        'completed_at',
        'called_at',
        'notified_at',
        'is_representative',
        'is_advance',
        'active'
    ];

    protected $appends = [
        'is_student'
    ];

    protected $casts = [
        'skipped_at' => 'datetime',
        'completed_at' => 'datetime',
        'is_representative' => 'boolean',
        'called_at' => 'datetime',
        'notified_at' => 'datetime',
        'is_advance' => 'boolean',
        'type' => Type::class
    ];

    protected static function booted(): void
    {
        static::created(function (Qu $model) {
            QuCreated::dispatch($model);
            ScreenQuCreated::dispatch($model, $model->getPendingTotal());
        });

        static::addGlobalScope('now', function (Builder $builder) {
            $from = explode('as ', $builder->getQuery()->from);
            $from = isset($from[1]) ? $from[1] : $from[0];
            $builder->whereDate($from . '.created_at', Carbon::now()->format('Y-m-d'));
        });
    }

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
            get: fn() => $this->type ? $this->type->isStudent() : null
        );
    }

    public function ticket(): Attribute
    {
        $accountType = $this->accountType;
        return Attribute::make(
            get: fn() => [
                'num_fulltext' => $this->num_fulltext,
                'counter_name' => $this->counter_name,
                'department' => $accountType->name,
                'account_type_id' => $this->account_type_id,
                'counter' => $this->counter
            ]
        );
    }

    public function counter(): Attribute
    {
        return Attribute::make(
            get: fn() => $this->accountType->name . ' ' . $this->counter_name
        );
    }

    public function scopeNow($query)
    {
        return $query->whereDate('created_at', Carbon::now()->format('Y-m-d'));
    }

    public function scopeCalled($query, $accountTypeId = null)
    {
        return $query->whereNotNull('called_at')
            ->when($accountTypeId, fn($builder) => $builder->whereAccountTypeId($accountTypeId));
    }

    public function scopeUnCalled($query, $accountTypeId = null)
    {
        return $query->whereNull('called_at')
            ->when($accountTypeId, fn($builder) => $builder->whereAccountTypeId($accountTypeId));
    }

    public function getServedTotal()
    {
        return [
            'account_type_served_total' => $this->called($this->account_type_id)->count(),
            'all_served_total' => $this->called()->count(),
        ];
    }

    public function getPendingTotal()
    {
        return [
            'account_type_pending_total' => $this->uncalled($this->account_type_id)->count(),
            'all_pending_total' => $this->uncalled()->count(),
        ];
    }
}
