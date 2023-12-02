<?php

namespace App\Repositories\Conditions;

trait Screen
{
    protected function appendAccountTypesCondition(&$builder, $query)
    {
        // return $builder->when(isset($query['append_account_types']) && $query['append_account_types'], function ($builder) use ($query) {
        //     $builder->append(['accountTypes']);
        // });
    }
}