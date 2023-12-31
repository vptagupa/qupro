<?php

namespace App\Repositories;

use App\Events\MediaRefresh;
use App\Models\Theme;
use App\Models\Config;
use Illuminate\Support\Facades\App;
use App\Models\AccountType;
use Illuminate\Http\UploadedFile;

class AccountTypeRepository extends Repository
{
    use Conditions\AccountType;

    private $file;

    public function __construct(AccountType $model)
    {
        $this->model = $model;
        $this->file = App::make(FileRepository::class);
    }

    public function create(array $data)
    {
        $model = parent::create($data);
        if ($data['file'] instanceof UploadedFile) {
            $file = $this->storeFile($data['file']);
            unset($data['file']);
            $model->file()->associate($file);
            $model->save();

            MediaRefresh::dispatch();
        }

        if (Config::isEnabledCategories()) {
            $data['categories'] = $data['categories'] ?: [];
            $model->categories()->sync($data['categories']);
        }

    }

    public function update(array $data, $id)
    {
        $model = $this->find($id);
        if ($data['file'] instanceof UploadedFile) {
            $file = $this->storeFile($data['file']);
            $prevFile = $model->file;

            $model->file()->associate($file);
            $model->save();

            if ($prevFile) {
                $prevFile->delete();
            }

            MediaRefresh::dispatch();
        }

        if (Config::isEnabledCategories()) {
            $data['categories'] = $data['categories'] ?: [];
            $model->categories()->sync($data['categories']);
            unset($data['categories']);
        }

        unset($data['file']);

        parent::update($data, $id);

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