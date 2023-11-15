<?php

namespace App\Repositories;

use App\Models\SharedSeries;

class SharedSeriesRepository extends Repository
{
    use Conditions\SharedSeries;
    public function __construct(SharedSeries $model)
    {
        $this->model = $model;
    }
}