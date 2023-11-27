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

        $user->serve_account_type_ids = $serve;
        $user->save();
    }


    public function getLatestServed(array $counters)
    {
        return $this->model->addSelect([
            'served' => \App\Models\Qu::select('num_fulltext')
                ->whereColumn('counter_name', 'users.counter_name')
                ->orderBy('called_at', 'desc')
                ->limit(1)
        ])->whereIn('counter_name', $counters)
            ->orderBy('counter_name', 'asc')
            ->get();
    }
}