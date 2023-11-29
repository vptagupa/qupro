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

    public function currentServed()
    {
        return $this->list(
            query: [
                'called' => true,
                'accountType' => true
            ],
            paginate: false,
            orderBy: ['called_at', 'desc'],
            get: false,
            first: true
        );
    }

    public function getLatestServed()
    {
        $counters = ($this->model->newQuery())
            ->select(['counter_name', 'account_type_id'])
            ->addSelect([
                'department' => AccountType::select('name')
                    ->whereColumn('account_type_id', 'account_types.id')
                    ->limit(1)
            ])
            ->groupBy('counter_name', 'account_type_id')
            ->whereNotNull('called_at')
            ->orderBy('department', 'asc')
            ->get();

        $data = collect([]);
        foreach ($counters as $counter) {
            $data->push([
                'num_fulltext' => Qu::select('num_fulltext')
                    ->where('counter_name', $counter->counter_name)
                    ->where('account_type_id', $counter->account_type_id)
                    ->orderBy('called_at', 'desc')
                    ->first()->num_fulltext,
                'counter_name' => $counter->counter_name,
                'department' => $counter->department,
                'counter' => $counter->department . ' ' . $counter->counter_name
            ]);
        }

        return $data;
    }

    public function getTotalServedByAccountType(?int $id = null)
    {
        return $this->list(
            query: [
                'called' => true,
                'account_type_id' => $id
            ],
            paginate: false,
            get: false,
        )->count();
    }

    public function getTotalByAccountType(?int $id = null)
    {
        return $this->list(
            query: [
                'account_type_id' => $id
            ],
            paginate: false,
            get: false,
        )->count();
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