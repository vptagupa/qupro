<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Contracts\Auth\CanResetPassword;
use OwenIt\Auditing\Contracts\Auditable;
use App\Enums\Role;

class User extends Authenticatable implements CanResetPassword, Auditable
{
    use HasApiTokens, HasFactory, Notifiable;

    use Relations\Permission;
    use \OwenIt\Auditing\Auditable;

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
    ];

    protected $appends = [
        'access'
    ];

    /**
     * Attributes to include in the Audit.
     *
     * @var array
     */
    protected $auditInclude = [
        'name',
        'nickname',
        'email',
        'role',
        'password',
        'login_at',
        'counter_name',
        'serve_account_type_ids'
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

    public function qus()
    {
        return $this->hasMany(Qu::class, 'counter_name', 'counter_name');
    }

    public function served()
    {
        return $this->qus()->whereNotNull('called_at')->orderBy('called_at', 'desc');
    }

    public function accountTypes()
    {
        return $this->belongsToMany(AccountType::class, 'user_departments', 'user_id')->groupBy(['user_id', 'account_type_id']);
    }

    public function categories(?int $accountTypeId = null)
    {
        $query = $this->belongsToMany(Category::class, 'user_departments', 'user_id')->withPivot('account_type_id');

        if (!$accountTypeId) {
            return $query;
        }

        return $query->wherePivot('account_type_id', $accountTypeId);
    }
}
