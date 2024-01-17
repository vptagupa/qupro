<?php

namespace App\Repositories\Conditions;

trait Category
{
    protected function accountTypeIdCondition(&$builder, $query)
    {
        return $builder->when(isset($query['account_type_id']) && $query['account_type_id'], function ($builder) use ($query) {
            $builder->whereRelation('accountTypes', 'account_type_id', $query['account_type_id']);
        });
    }

    protected function fileCondition(&$builder, $query)
    {
        return $builder->when(isset($query['file']) && $query['file'], function ($builder) use ($query) {
            $builder->with(['file']);
        });
    }
}