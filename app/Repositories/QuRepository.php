<?php

namespace App\Repositories;

use App\Models\Qu;

class QuRepository extends Repository
{
    use Conditions\Qu;

    public function __construct(Qu $model)
    {
        $this->model = $model;
    }

    public function list($query = [], $perPage = 10, $paginate = false, $first = false, $get = true, array $orderBy = [])
    {
        $builder = $this->conditions($this->model, $query);

        if ($orderBy) {
            $builder->orderBy($orderBy[0], $orderBy[1]);
        }

        if ($paginate && !$first) {
            return $builder->paginate($perPage);
        } elseif ($first) {
            return $builder->first();
        }

        if ($get) {
            return $builder->get();
        }

        return $builder;
    }

    public function getNext(int $accountTypeId, bool $priority = false): ?Qu
    {
        return $this->getWaiting($accountTypeId, $priority)->first();
    }

    public function getWaiting(int $accountTypeId, $priority = null, int $limit = 5)
    {
        return $this->list(
            query: [
                'uncalled' => true,
                'accountType' => true,
                'accountType.waiting' => true,
                'priority' => $priority,
                'account_type_id' => $accountTypeId
            ],
            paginate: true,
            orderBy: ['id', 'asc'],
            perPage: $limit
        );
    }

    public function find($id)
    {
        return $this->list(
            query: [
                'id' => $id,
                'accountType' => true,
                'accountType.waiting' => true
            ],
            first: true
        );
    }
}