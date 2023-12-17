<?php

namespace App\Repositories;

use App\Models\Screen;
use App\Models\Theme;

class ScreenRepository extends Repository
{
    use Conditions\Screen;

    public function __construct(Screen $model)
    {
        $this->model = $model;
    }

    public function updateTheme(int $id, $name, $value)
    {
        $model = $this->find($id);
        $filter = $model->themes->filter(fn($theme) => $theme->name == $name);

        if ($filter->count() > 0) {
            $theme = $filter->first();
            $theme->value = $value;
            $theme->save();
        } else {
            $model->themes()->save(
                new Theme([
                    'name' => $name,
                    'value' => $value
                ])
            );
        }
    }
}