<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Casts\Attribute;

use App\Enums\Screen as Enum;

class Screen extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'screen',
        'account_type_ids',
    ];

    protected $casts = [
        'account_type_ids' => 'array',
        'screen' => Enum::class
    ];

    public function accountTypes(): Attribute
    {
        return Attribute::make(
            get: fn() => AccountType::whereIn('id', $this->account_type_ids)->get()
        );
    }

    public static function premium()
    {
        return (new self)->whereScreen(Enum::PREMIUM)->first();
    }
}
