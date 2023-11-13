<?php

namespace App\Repositories;

use App\Models\Series;

class SeriesRepository extends Repository
{
    public function __construct(Series $model)
    {
        $this->model = $model;
    }
}