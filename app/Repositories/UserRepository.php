<?php

namespace App\Repositories;

use App\Models\User;

class UserRepository extends Repository
{
    public function __construct(User $model)
    {
        $this->model = $model;
    }

    public function list($query, $perPage = 10)
    {
        return $this->model->where('name', 'like', '%' . $query['name'] . '%')->paginate($perPage);
    }

    public function create(array $data)
    {
        if (!isset($data['password'])) {
            $data['password'] = bcrypt(config('auth.default_password'));
        }

        parent::create($data);
    }
}