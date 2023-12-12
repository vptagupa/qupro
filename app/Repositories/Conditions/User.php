<?php

namespace App\Repositories\Conditions;

trait User
{
    protected function accountTypesCondition(&$builder, $query)
    {
        return $builder->when(isset($query['accountTypes']) && $query['accountTypes'], function ($builder) use ($query) {
            $builder->with(['accountTypes']);
        });
    }

    protected function accountTypesCategoriesCondition(&$builder, $query)
    {
        return $builder->when(isset($query['accountTypesCategories']) && $query['accountTypesCategories'], function ($builder) use ($query) {
            $builder->with(['accountTypes.categories']);
        });
    }
}