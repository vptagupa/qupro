<?php

namespace App\Repositories\Conditions;

trait AccountType
{
    protected function priorityFormatCondition(&$builder, $query)
    {
        return $builder->when(isset($query['priorityFormat']) && $query['priorityFormat'], function ($builder) use ($query) {
            $builder->with(['priorityFormat']);
        });
    }
}