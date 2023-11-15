<?php

namespace App\Repositories;

use App\Models\NumFormat;

class NumFormatRepository extends Repository
{
    use Conditions\NumFormat;

    public function __construct(NumFormat $model)
    {
        $this->model = $model;
    }

    public function listActive($limit = 10)
    {
        return $this->list(
            query: ['active' => true],
            perPage: $limit,
            orderBy: ['format', 'desc'],
            paginate: false
        );
    }
}