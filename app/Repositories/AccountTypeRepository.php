<?php

namespace App\Repositories;

use Illuminate\Support\Facades\App;
use App\Models\AccountType;

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
        $file = $this->storeFile($data['file']);

        unset($data['file']);

        $model = parent::create($data);
        $model->file()->associate($file);
        $model->save();
    }

    public function update(array $data, $id)
    {
        $file = $this->storeFile($data['file']);

        unset($data['file']);

        parent::update($data, $id);

        $model = $this->find($id);
        $prevFile = $model->file;

        $model->file()->associate($file);
        $model->save();

        if ($prevFile) {
            $prevFile->delete();
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