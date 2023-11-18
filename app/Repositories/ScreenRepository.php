<?php

namespace App\Repositories;

use App\Models\Screen;

class ScreenRepository extends Repository
{
    public function __construct(Screen $model)
    {
        $this->model = $model;
    }
}