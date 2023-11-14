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

    public function list($query = [], $perPage = 10, $paginate = false, $first = false)
    {
        $builder = $this->conditions($this->model, $query);
        if ($paginate && !$first) {
            return $builder->paginate($perPage);
        } elseif ($first) {
            return $builder->first();
        }

        return $builder->get();
    }

    public function getNext(int $accountTypeId, bool $priority = false): ?Qu
    {
        return $this->getWaiting($accountTypeId, $priority)->first();
    }

    public function getWaiting(int $accountTypeId, $priority = null, int $limit = 5)
    {
        return $this->model->with(['accountType', 'accountType.waiting'])
            ->when(!is_null($priority), function ($builder) use ($priority) {
                $builder->wherePriority($priority);
            })
            ->whereNull('called_at')
            ->where('account_type_id', $accountTypeId)
            ->orderBy('id', 'asc')
            ->paginate($limit);
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