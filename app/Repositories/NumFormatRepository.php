<?php

namespace App\Repositories;

use App\Models\NumFormat;

class NumFormatRepository extends Repository
{
    public function __construct(NumFormat $model)
    {
        $this->model = $model;
    }

    public function list($query, $perPage = 10)
    {
        return $this->model->when(isset($query['title']) && $query['title'], function ($builder) use ($query) {
            $builder->where('title', 'like', '%' . $query['title'] . '%');
        })->paginate($perPage);
    }

    public function listActive($limit = 10)
    {
        return $this->model->active()->limit($limit)->orderBy('format', 'desc')->get();
    }
}