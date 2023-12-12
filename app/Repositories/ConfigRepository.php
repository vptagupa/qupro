<?php

namespace App\Repositories;

use App\Events\FlushConfig;
use App\Events\ScreenRefresh;
use App\Models\Config;

class ConfigRepository extends Repository
{
    use Conditions\Config;

    public function __construct(Config $model)
    {
        $this->model = $model;
    }

    public function update($data, $id)
    {
        parent::update($data, $id);

        if (in_array($data['name'], $this->model->watch)) {
            FlushConfig::dispatch($this->find($id));
        }
        if (in_array($data['name'], $this->model->reload)) {
            \App\Services\Screen::refresh();
        }
    }
}