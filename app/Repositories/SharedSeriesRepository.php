<?php

namespace App\Repositories;

use App\Models\SharedSeries;

class SharedSeriesRepository extends Repository
{
    public function __construct(SharedSeries $model)
    {
        $this->model = $model;
    }

    public function list($query, $perPage = 10)
    {
        return $this->model->with('format')->when(isset($query['num_format_id']) && $query['num_format_id'], function ($builder) use ($query) {
            $builder->whereNumFormatId($query['num_format_id']);
        })->paginate($perPage);
    }
}