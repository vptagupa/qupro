<?php

namespace App\Repositories\Conditions;

trait NumFormat
{
    protected function activeCondition(&$builder, $query)
    {
        return $builder->when(isset($query['active']) && $query['active'], function ($builder) use ($query) {
            $builder->active();
        });
    }
}