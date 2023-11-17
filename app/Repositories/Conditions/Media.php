<?php

namespace App\Repositories\Conditions;

trait Media
{
    protected function fileCondition(&$builder, $query)
    {
        return $builder->when(isset($query['file']) && $query['file'], function ($builder) use ($query) {
            $builder->with('file');
        });
    }

    protected function activeCondition(&$builder, $query)
    {
        return $builder->when(isset($query['active']) && $query['active'], function ($builder) use ($query) {
            $builder->active();
        });
    }
}