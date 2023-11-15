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


    public function getNext(int $accountTypeId, bool $priority = false): ?Qu
    {
        return $this->getWaiting($accountTypeId, $priority, 1)->first();
    }

    public function getWaiting(int $accountTypeId, $priority = null, int $limit = 5)
    {
        return $this->list(
            query: [
                'uncalled' => true,
                'accountType' => true,
                'priority' => $priority,
                'account_type_id' => $accountTypeId
            ],
            paginate: false,
            orderBy: ['id', 'asc'],
            perPage: $limit
        )
            ->groupBy('priority')
            ->paginate();
    }

    public function find($id)
    {
        return $this->list(
            query: [
                'id' => $id,
                'accountType' => true,
                // 'accountType.waitingPriority(1)' => true,
                // 'accountType.waitingRegular(1)' => true,
            ],
            first: true
        );
    }
}