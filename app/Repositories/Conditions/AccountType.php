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

    protected function formatCondition(&$builder, $query)
    {
        return $builder->when(isset($query['format']) && $query['format'], function ($builder) use ($query) {
            $builder->with(['format']);
        });
    }

    protected function fileCondition(&$builder, $query)
    {
        return $builder->when(isset($query['file']) && $query['file'], function ($builder) use ($query) {
            $builder->with(['file']);
        });
    }

    protected function colorCondition(&$builder, $query)
    {
        return $builder->when(isset($query['color']) && $query['color'], function ($builder) use ($query) {
            $builder->with(['color']);
        });
    }
}