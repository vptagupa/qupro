<?php

namespace App\Repositories;

use App\Models\Media;
use App\Models\File;

class MediaRepository extends Repository
{
    use Conditions\Media;
    public function __construct(Media $model)
    {
        $this->model = $model;
    }

    public function create($file)
    {
        $path = $file->store('public/files');
        $model = new File;
        $model->filename = $file->getClientOriginalName();
        $model->orig_filename = $file->getClientOriginalName();
        $model->path = $path;
        $model->type = $file->getClientMimeType();
        $model->save();

        $media = new Media;
        $media->file()->associate($model);
        $media->save();
    }

    public function getActive()
    {
        return $this->list(
            query: [
                'active' => true,
                'file' => true
            ],
            paginate: false
        )->orderBy('seq', 'asc')
            ->paginate();
    }
}