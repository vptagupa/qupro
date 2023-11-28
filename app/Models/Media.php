<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Media extends Model
{
    use HasFactory;

    protected $fillable = [
        "file_id",
        'seq',
        'active'
    ];

    protected $appends = [
        'is_image',
        'is_video'
    ];

    public static function booted()
    {
        static::deleted(function ($model) {
            if ($model->file) {
                $model->file->delete();
            }
        });
    }

    public function file()
    {
        return $this->belongsTo(File::class);
    }

    public function scopeActive($query)
    {
        return $query->where('active', true);
    }

    public function isImage(): Attribute
    {
        return Attribute::make(
            get: fn() => str($this->file->type)->startsWith('image/')
        );
    }

    public function isVideo(): Attribute
    {
        return Attribute::make(
            get: fn() => str($this->file->type)->startsWith('video/')
        );
    }
}
