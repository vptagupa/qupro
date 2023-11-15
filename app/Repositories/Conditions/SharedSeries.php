<?php

namespace App\Repositories\Conditions;

trait SharedSeries
{
    protected function formatCondition(&$builder, $query)
    {
        return $builder->when(isset($query['format']) && $query['format'], function ($builder) use ($query) {
            $builder->with(['format']);
        });
    }

    protected function numFormatIdCondition(&$builder, $query)
    {
        return $builder->when(isset($query['num_format_id']) && $query['num_format_id'], function ($builder) use ($query) {
            $builder->whereNumFormatId($query['num_format_id']);
        });
    }
}