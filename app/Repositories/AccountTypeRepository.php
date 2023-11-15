<?php

namespace App\Repositories;

use App\Models\AccountType;

class AccountTypeRepository extends Repository
{
    use Conditions\AccountType;

    public function __construct(AccountType $model)
    {
        $this->model = $model;
    }
}