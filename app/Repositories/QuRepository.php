<?php

namespace App\Repositories;

use App\Models\Qu;

class QuRepository extends Repository
{
    public function __construct(Qu $model)
    {
        $this->model = $model;
    }

    public function list($query = [], $perPage = 10)
    {
        return $this->model->when(isset($query['name']) && $query['name'], function ($builder) use ($query) {
            $builder->where('name', 'like', '%' . $query['name'] . '%');
        })
            ->when(isset($query['student_no']) && $query['student_no'], function ($builder) use ($query) {
                $builder->where('student_no', 'like', '%' . $query['student_no'] . '%');
            })
            ->when(isset($query['student_name']) && $query['student_name'], function ($builder) use ($query) {
                $builder->where('student_name', 'like', '%' . $query['student_name'] . '%');
            })->paginate($perPage);
    }
}