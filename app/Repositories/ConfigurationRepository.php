<?php

namespace App\Repositories;

use App\Models\Config;

class ConfigurationRepository extends Repository
{
    public function __construct(Config $model)
    {
        $this->model = $model;
    }

    public function list($query, $perPage = 10)
    {
        return $this->model->when(isset($query['name']) && $query['name'], function ($builder) use ($query) {
            $builder->where('name', 'like', '%' . $query['name'] . '%');
        })->paginate($perPage);
    }
}