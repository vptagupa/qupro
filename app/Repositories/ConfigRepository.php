<?php

namespace App\Repositories;

use App\Events\FlushConfig;
use App\Events\ScreenRefresh;
use App\Models\Config;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\App;

class ConfigRepository extends Repository
{
    use Conditions\Config;

    protected $file;

    public function __construct(Config $model)
    {
        $this->model = $model;
        $this->file = App::make(FileRepository::class);
    }

    public function update($data, $id)
    {
        if ($data['value'] instanceof UploadedFile) {
            $file = $this->storeFile($data['value']);
            $data['value'] = $file->url;
        }

        parent::update($data, $id);

        if (in_array($data['name'], $this->model->watch)) {
            FlushConfig::dispatch($this->find($id));
        }
        if (in_array($data['name'], $this->model->reload)) {
            \App\Services\Screen::refresh();
        }
    }

    protected function storeFile($file)
    {
        if (!$file) {
            return null;
        }

        return $this->file->create([
            'file' => $file
        ]);
    }
}