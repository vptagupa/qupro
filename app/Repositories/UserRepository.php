<?php

namespace App\Repositories;

use App\Models\User;

class UserRepository extends Repository
{
    public function __construct(User $model)
    {
        $this->model = $model;
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

        $user->serve_account_type_ids = array_values($serve);
        $user->save();
    }
}