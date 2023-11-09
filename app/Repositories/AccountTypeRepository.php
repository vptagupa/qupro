<?php

namespace App\Repositories;

use App\Models\AccountType;

class AccountTypeRepository extends Repository
{
    public function __construct(AccountType $model)
    {
        $this->model = $model;
    }

    public function list($query, $perPage = 10)
    {
        return $this->model->with('format')->when(isset($query['name']) && $query['name'], function ($builder) use ($query) {
            $builder->where('name', 'like', '%' . $query['name'] . '%');
        })->paginate($perPage);
    }
}