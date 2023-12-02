<?php

namespace App\Repositories;

use App\Models\Screen;

class ScreenRepository extends Repository
{
    use Conditions\Screen;

    public function __construct(Screen $model)
    {
        $this->model = $model;
    }
}