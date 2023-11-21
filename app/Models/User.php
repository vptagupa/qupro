<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

use App\Enums\Role;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    use Relations\Permission;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'nickname',
        'email',
        'role',
        'password',
        'login_at',
        'counter_name',
        'serve_account_type_ids'
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
        'login_at' => 'datetime',
        'password' => 'hashed',
        'role' => Role::class,
        'serve_account_type_ids' => 'array'
    ];

    protected $appends = [
        'access'
    ];

    public function isAdministrator()
    {
        return $this->role == Role::ADMIN;
    }

    public function isTeller()
    {
        return $this->role == Role::TELLER;
    }

    public function isRegistrator()
    {
        return $this->role == Role::REGISTRATION;
    }

    public function access(): Attribute
    {
        return Attribute::make(
            get: fn($value) => $this->getAccess()
        );
    }
}
