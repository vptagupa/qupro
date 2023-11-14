<?php

namespace App\Repositories\Conditions;

trait Qu
{
    protected function conditions(&$builder, $query)
    {
        $keys = array_keys($query);

        foreach ($keys as $key) {
            $key = str_replace('.', 'With_', $key);
            $condition = str($key)->camel() . 'Condition';
            $builder = $this->$condition($builder, $query);
        }

        return $builder;
    }


    protected function idCondition(&$builder, $query)
    {
        return $builder->when(isset($query['id']) && $query['id'], function ($builder) use ($query) {
            $builder->whereId($query['id']);
        });
    }

    protected function priorityCondition(&$builder, $query)
    {
        return $builder->when(isset($query['priorityCondition']) && $query['priorityCondition'], function ($builder) use ($query) {
            $builder->wherePriority(true);
        });
    }

    protected function nameCondition(&$builder, $query)
    {
        return $builder->when(isset($query['name']) && $query['name'], function ($builder) use ($query) {
            $builder->where('name', 'like', '%' . $query['name'] . '%');
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
            $builder->whereNotNull('called_at');
        });
    }

    protected function unCalledCondition(&$builder, $query)
    {
        return $builder->when(isset($query['uncalled']) && $query['uncalled'], function ($builder) use ($query) {
            $builder->whereNull('called_at');
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
            $builder->with(['accountType', 'accountType.waiting']);
        });
    }

    protected function accountTypeIdCondition(&$builder, $query)
    {
        return $builder->when(isset($query['account_type_id']) && $query['account_type_id'], function ($builder) use ($query) {
            $builder->whereAccountTypeId($query['account_type_id']);
        });
    }
}