<?php

namespace App\Repositories;

use App\Models\Category;

class CategoryRepository extends Repository
{
    use Conditions\Category;

    public function __construct(Category $model)
    {
        $this->model = $model;
    }
}