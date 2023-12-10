<?php

namespace App\Repositories;

use App\Models\AccountTypeTheme;
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
        }

        $data['categories'] = $data['categories'] ?: [];
        $model->categories()->sync($data['categories']);
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
        }

        $data['categories'] = $data['categories'] ?: [];
        $model->categories()->sync($data['categories']);

        unset($data['file']);
        unset($data['categories']);

        parent::update($data, $id);

    }

    public function updateTheme(int $id, $name, $value)
    {
        $model = $this->find($id);
        $theme = $model->theme()->where('name', $name)->first();

        if (!$theme) {
            $model->theme()->save(new AccountTypeTheme([
                'name' => $name,
                'value' => $value
            ]));
        } else {
            $theme->value = $value;
            $theme->save();
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