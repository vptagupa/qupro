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
        return $this->waiting(
            accountTypeId: $accountTypeId,
            priority: $priority,
            limit: 1,
            paginate: false
        )->first();
    }

    public function getTotals(int $accountTypeId, bool $priority): int
    {
        return $this->list(
            query: [
                'uncalled' => true,
                'priority' => $priority,
                'account_type_id' => $accountTypeId
            ],
            paginate: false,
            get: false
        )->count();
    }

    public function called(array $accountTypeIds)
    {
        return $this->list(
            query: [
                'called' => true,
                'account_type_id' => $accountTypeIds
            ],
            paginate: false,
            orderBy: ['called_at', 'desc'],
            get: false
        )
            ->groupBy('counter_name')
            ->whereDate('created_at', now()->format('Y-m-d'))
            ->get();
    }

    public function getWaiting(int $accountTypeId, $includePriority = false, $priority = false, int $limit = 2)
    {
        if ($includePriority) {
            return $this->waiting(
                accountTypeId: $accountTypeId,
                limit: $limit,
                paginate: false
            )
                ->groupBy('priority')
                ->paginate();
        }

        return $this->waiting(
            accountTypeId: $accountTypeId,
            priority: $priority,
            limit: $limit,
            paginate: true
        );
    }

    public function waiting(
        int $accountTypeId,
        bool $priority = null,
        int $limit = 2,
        bool $paginate = true
    ) {
        return $this->list(
            query: [
                'uncalled' => true,
                'accountType' => true,
                'priority' => $priority,
                'account_type_id' => $accountTypeId
            ],
            paginate: $paginate,
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
            ],
            first: true
        );
    }
}