<?php

namespace App\Repositories;

use App\Models\Screen;
use App\Models\Theme;

class ScreenRepository extends Repository
{
    use Conditions\Screen;
    use Traits\ThemeUpdate;

    public function __construct(Screen $model)
    {
        $this->model = $model;
    }
}