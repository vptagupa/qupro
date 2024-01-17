<?php

namespace App\Repositories;

use App\Models\Category;
use Illuminate\Http\UploadedFile;
use App\Events\MediaRefresh;
use Illuminate\Support\Facades\App;

class CategoryRepository extends Repository
{
    use Conditions\Category;
    use Traits\ThemeUpdate;
    use Traits\FileUpload;

    public function __construct(Category $model)
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
        } else {
            if (empty($data['file']) && $model->file) {
                $prevFile = $model->file;

                $model->file()->dissociate();
                $model->save();

                $prevFile->delete();

                MediaRefresh::dispatch();
            }
        }

        unset($data['file']);

        parent::update($data, $id);

    }
}