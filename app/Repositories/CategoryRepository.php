<?php

namespace App\Repositories;

use App\Models\Category;

class CategoryRepository extends Repository
{
    use Conditions\Category;
    use Traits\ThemeUpdate;

    public function __construct(Category $model)
    {
        $this->model = $model;
    }
}