<?php

namespace App\Repositories;

use Illuminate\Support\Facades\App;
use App\Models\Media;


class MediaRepository extends Repository
{
    use Conditions\Media;

    private $file;

    public function __construct(Media $model)
    {
        $this->model = $model;
        $this->file = App::make(FileRepository::class);
    }

    public function create($file)
    {
        $file = $this->storeFile($file);

        $media = new Media;
        $media->file()->associate($file);
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