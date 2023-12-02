<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Storage;

class AccountType extends Model
{
    use HasFactory;
    use Relations\AccountTypeSeries;

    protected $fillable = [
        'name',
        'num_format_id',
        'priority_format_id',
        'num_start',
        'file_id',
        'reset_at',
        'reset_by',
    ];

    protected $casts = [
        'reset_at' => 'datetime'
    ];

    protected $priority = false;

    public static function booted()
    {
        static::deleted(function ($model) {
            if ($model->file) {
                $model->file->delete();
            }
        });
    }

    public function resetBy()
    {
        return $this->belongsTo(User::class, 'reset_by');
    }

    public function file()
    {
        return $this->belongsTo(File::class);
    }

    public function format()
    {
        return $this->belongsTo(NumFormat::class, 'num_format_id');
    }

    public function priorityFormat()
    {
        return $this->belongsTo(NumFormat::class);
    }

    public function qus()
    {
        return $this->hasMany(Qu::class);
    }

    public function waiting()
    {
        return $this->qus()->whereNull('called_at')->orderBy('created_at', 'asc');
    }

    public function waitingPriorities()
    {
        return $this->waiting()->wherePriority(true);
    }

    public function waitingRegulars()
    {
        return $this->waiting()->wherePriority(false);
    }

    public function sharedSeries(): Attribute
    {
        return Attribute::make(
            get: fn() => SharedSeries::whereJsonContains('account_type_ids', $this->id)->get()
        );
    }

    public function series()
    {
        return $this->hasMany(Series::class);
    }

    public function isSharedSeries(): Attribute
    {
        return Attribute::make(
            get: fn() => $this->shared_series->count() > 0 ? true : false
        );
    }

    public function captureHasPrioritySharedSeries(): bool
    {
        return $this->getPrioritySharedSeries() ? true : false;
    }

    public function captureHasNonPrioritySharedSeries(): bool
    {
        return $this->getNonPrioritySharedSeries() ? true : false;
    }

    public function capatureHasAnySharedSeries($priority = false): bool
    {
        if ($priority && $this->captureHasPrioritySharedSeries()) {
            return true;
        } elseif ($this->captureHasNonPrioritySharedSeries()) {
            return true;
        }

        return false;
    }

    public function getPrioritySharedSeries()
    {
        return $this->shared_series->reject(fn($shared) => $shared->priority != 1)->first();
    }

    public function getNonPrioritySharedSeries()
    {
        return $this->shared_series->reject(fn($shared) => $shared->priority == 1)->first();
    }

    public function theme()
    {
        return $this->hasMany(AccountTypeTheme::class);
    }
}
