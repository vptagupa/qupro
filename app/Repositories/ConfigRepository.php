<?php

namespace App\Repositories;

use App\Events\FlushConfig;
use App\Models\Config;

class ConfigRepository extends Repository
{
    use Conditions\Config;

    public function __construct(Config $model)
    {
        $this->model = $model;
    }

    public function getTheme()
    {
        $data = collect();
        $value = $this->list(
            query: [
                'name' => 'Default Screen Theme'
            ],
            first: true
        )->value;

        $value = json_decode($value);

        $data->push([
            'name' => 'themeCounter',
            'value' => $value?->themeCounter
        ]);
        $data->push([
            'name' => 'themeMedia',
            'value' => $value?->themeMedia
        ]);

        return $data;
    }

    public function resetTheme()
    {
        $this->updateBy([
            'value' => [
                'themeCounter' => null,
                'themeMedia' => null
            ],
        ], 'Default Screen Theme', 'name');
    }

    public function update($data, $id)
    {
        parent::update($data, $id);

        if (in_array($data['name'], $this->model->watch)) {
            FlushConfig::dispatch($this->find($id));
        }
    }

}