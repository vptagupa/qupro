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
        return $this->model->when(isset($query['name']) && $query['name'], function ($builder) use ($query) {
            $builder->where('name', 'like', '%' . $query['name'] . '%');
        })->paginate($perPage);
    }

    public function create(array $data)
    {
        if (!isset($data['password'])) {
            $data['password'] = bcrypt(config('auth.default_password'));
        }

        parent::create($data);
    }

    public function updateServeAccountType(int $userId, int $accountTypeId)
    {
        $user = $this->model->find($userId);

        $serve = $user->serve_account_type_ids ?? [];

        if (in_array($accountTypeId, $serve)) {
            $serve = array_diff($serve, [$accountTypeId]);
        } else {
            $serve = array_merge($serve, [$accountTypeId]);
        }

        $user->serve_account_type_ids = $serve;
        $user->save();
    }
}