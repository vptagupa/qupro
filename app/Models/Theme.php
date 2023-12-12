<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use OwenIt\Auditing\Contracts\Auditable;
use Illuminate\Database\Eloquent\Relations\MorphTo;

class Theme extends Model implements Auditable
{
    use HasFactory;
    use \OwenIt\Auditing\Auditable;

    protected $fillable = [
        'model_type',
        'model_id',
        'name',
        'value',
    ];

    protected $casts = [
        'value' => 'array'
    ];

    /**
     * Attributes to include in the Audit.
     *
     * @var array
     */
    protected $auditInclude = [
        'model_type',
        'model_id',
        'name',
        'value',
    ];

    public function model()
    {
        return $this->morphTo();
    }
}
