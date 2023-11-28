<?php

namespace App\Repositories;

use App\Models\File;

class FileRepository extends Repository
{
    public function __construct(File $model)
    {
        $this->model = $model;
    }

    public function create($data)
    {
        $file = $data['file'];

        $path = $file->store('public/files');

        return parent::create([
            'filename' => $file->hashName(),
            'orig_filename' => $file->getClientOriginalName(),
            'path' => $path,
            'type' => $file->getClientMimeType(),
        ]);
    }
}