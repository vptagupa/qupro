<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'description',
        'file_id'
    ];

    public function accountTypes()
    {
        return $this->belongsToMany(AccountType::class, 'account_type_categories');
    }

    public function themes()
    {
        return $this->morphMany(Theme::class, 'model');
    }

    public function file()
    {
        return $this->belongsTo(File::class);
    }
}
