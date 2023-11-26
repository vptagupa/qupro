<?php

namespace App\Repositories;

use App\Models\AccountType;
use App\Models\Qu;
use Carbon\Carbon;

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
            limit: 2,
            paginate: false
        )->first();
    }

    public function getTotals(int $accountTypeId, bool $priority): int
    {
        return $this->list(
            query: [
                'uncalled' => true,
                'priority' => $priority,
                'account_type_id' => $accountTypeId,
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
                'account_type_id' => $accountTypeIds,
            ],
            columns: [
                'id',
                'counter_name',
                'num_fulltext',
                'type'
            ],
            paginate: false,
            orderBy: ['called_at', 'desc'],
            get: false,
        )
            ->get();

    }

    public function getWaiting(int $accountTypeId, $includePriority = false, $priority = false, int $limit = 2)
    {
        if ($includePriority) {
            $data = collect([
                $this->waiting(
                    accountTypeId: $accountTypeId,
                    priority: 0
                )->first(),
                $this->waiting(
                    accountTypeId: $accountTypeId,
                    priority: 1
                )->first()
            ]);

            return $data->filter(null);
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
                'account_type_id' => $accountTypeId,
            ],
            paginate: $paginate,
            orderBy: ['id', 'asc'],
            perPage: $limit,
            limit: $limit
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

    public function getForReminders(
        AccountType $accountType,
        int $start,
        int $block,
        bool $priority = false,
    ) {
        $accountTypeIds = [$accountType->id];
        if ($accountType->capatureHasAnySharedSeries()) {
            if ($priority && $accountType->captureHasPrioritySharedSeries()) {
                $accountTypeIds = $accountType->getPrioritySharedSeries()->account_type_ids;
            } else {
                $accountTypeIds = $accountType->getNonPrioritySharedSeries()->account_type_ids;
            }
        }

        $models = $this->model->where('num', '>=', $start)
            ->whereIn('account_type_id', $accountTypeIds)
            ->wherePriority($priority)
            ->orderBy('num', 'asc')
            ->limit($block)
            ->get();

        return $models->filter(fn($qu) => !$qu->notified_at)->values();
    }
}