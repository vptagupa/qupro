<?php

namespace App\Repositories;

use App\Models\Config;

class ConfigRepository extends Repository
{
    public function __construct(Config $model)
    {
        $this->model = $model;
    }
}