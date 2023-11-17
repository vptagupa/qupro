<?php

namespace App\Models;

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

    public function file()
    {
        return $this->belongsTo(File::class);
    }
}
