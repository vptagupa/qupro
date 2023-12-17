<?php

namespace App\Repositories\Conditions;

use App\Models\Qu as Model;

trait Qu
{
    protected function priorityCondition(&$builder, $query)
    {
        return $builder->when(isset($query['priority']) && !is_null($query['priority']), function ($builder) use ($query) {
            $builder->wherePriority($query['priority']);
        });
    }

    protected function studentNoCondition(&$builder, $query)
    {
        return $builder->when(isset($query['student_no']) && $query['student_no'], function ($builder) use ($query) {
            $builder->where('student_no', 'like', '%' . $query['student_no'] . '%');
        });
    }

    protected function studentNameCondition(&$builder, $query)
    {
        return $builder->when(isset($query['student_name']) && $query['student_name'], function ($builder) use ($query) {
            $builder->where('student_name', 'like', '%' . $query['student_name'] . '%');
        });
    }

    protected function calledCondition(&$builder, $query)
    {
        return $builder->when(isset($query['called']) && $query['called'], function ($builder) use ($query) {
            $builder->called();
        });
    }

    protected function unCalledCondition(&$builder, $query)
    {
        return $builder->when(isset($query['uncalled']) && $query['uncalled'], function ($builder) use ($query) {
            $builder->uncalled();
        });
    }

    protected function completedCondition(&$builder, $query)
    {
        return $builder->when(isset($query['completed']) && $query['completed'], function ($builder) use ($query) {
            $builder->whereNotNull('completed_at');
        });
    }

    protected function accountTypeCondition(&$builder, $query)
    {
        return $builder->when(isset($query['accountType']) && $query['accountType'], function ($builder) use ($query) {
            $builder->with('accountType');
        });
    }

    protected function accountTypeWithWaitingCondition(&$builder, $query)
    {
        return $builder->when(isset($query['accountType.waiting']) && $query['accountType.waiting'], function ($builder) use ($query) {
            $builder->with(['accountType.waiting']);
        });
    }


    protected function accountTypeWithWaitingPriorityCondition(&$builder, $query)
    {
        return $builder->when(isset($query['accountType.waitingPriority']) && $query['accountType.waitingPriority'], function ($builder) use ($query) {
            $limit = isset($query['accountType.waitingPriority']['limit']) ? $query['accountType.waitingPriority']['limit'] : null;
            $builder->when(!is_null($limit), function ($builder) use ($limit) {
                $builder->with(['accountType.waitingPriorities' => fn($builder) => $builder->limit($limit)]);
            })
                ->when(is_null($limit), fn($builder) => $builder->with(['accountType.waitingPriority']));
        });
    }

    protected function accountTypeWithWaitingPriorityCountCondition(&$builder, $query)
    {
        return $builder->when(
            isset($query['accountType.waitingPriorityCount']) && $query['accountType.waitingPriorityCount'],
            fn($builder) => $builder->withCount([
                'accountType as waiting_priorities_count' =>
                    fn($builder) => $builder->whereHas('waitingPriorities')
            ])
        );
    }

    protected function accountTypeWithWaitingRegularCondition(&$builder, $query)
    {
        return $builder->when(isset($query['accountType.waitingRegular']) && $query['accountType.waitingRegular'], function ($builder) use ($query) {
            $limit = isset($query['accountType.waitingRegular']['limit']) ? $query['accountType.waitingRegular']['limit'] : null;
            $builder->when(!is_null($limit), function ($builder) use ($limit) {
                $builder->with(['accountType.waitingRegulars' => fn($builder) => $builder->limit($limit)]);
            })
                ->when(is_null($limit), fn($builder) => $builder->with(['accountType.waitingRegular']));
        });
    }

    protected function accountTypeWithWaitingRegularCountCondition(&$builder, $query)
    {
        return $builder->when(
            isset($query['accountType.waitingRegularCount']) && $query['accountType.waitingRegularCount'],
            fn($builder) => $builder->from('qus as table')->select('*')->addSelect(
                \DB::raw('(select count(*) from (select * from qus where  qus.account_type_id=table.account_type_id) as t) as total')
            )
        );
    }

    protected function accountTypeIdCondition(&$builder, $query)
    {
        return $builder->when(isset($query['account_type_id']) && $query['account_type_id'], function ($builder) use ($query) {
            $ids = is_array($query['account_type_id']) ? $query['account_type_id'] : [$query['account_type_id']];

            $builder->whereIn('account_type_id', $ids);
        });
    }

    protected function createdAtCondition(&$builder, $query)
    {
        return $builder->when(isset($query['created_at']) && $query['created_at'], function ($builder) use ($query) {
            $builder->whereDate('created_at', $query['created_at']);
        });
    }

    protected function nowAtCondition(&$builder, $query)
    {
        return $builder->when(isset($query['now']) && $query['now'], function ($builder) use ($query) {
            $builder->now();
        });
    }

    public function nameCondition(&$builder, $query)
    {
        return $builder->when(isset($query['name']) && $query['name'], function ($builder) use ($query) {
            $builder->where('name', 'like', '%' . $query['name'] . '%');
            $builder->Orwhere('num_fulltext', 'like', '%' . $query['name'] . '%');
        });
    }

    protected function categoryIdCondition(&$builder, $query)
    {
        return $builder->when(isset($query['category_id']) && $query['category_id'], function ($builder) use ($query) {
            $ids = is_array($query['category_id']) ? $query['category_id'] : [$query['category_id']];

            $builder->whereIn('category_id', $ids);
        });
    }
}