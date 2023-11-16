<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Storage;

class File extends Model
{
    use HasFactory;

    protected $fillable = [
        'filename',
        'orig_filename',
        'path',
        'type',
        'size'
    ];

    protected $appends = [
        'url'
    ];


    public function url(): Attribute
    {
        return Attribute::make(
            get: fn() => asset('storage/' . str_replace('public/', '', $this->path))
        );
    }
}
