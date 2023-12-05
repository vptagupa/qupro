<?php

namespace App\Repositories;

use App\Models\Audit;

class AuditRepository extends Repository
{
    use Conditions\Audit;

    public function __construct(Audit $model)
    {
        $this->model = $model;
    }
}