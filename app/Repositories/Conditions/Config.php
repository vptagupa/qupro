<?php

namespace App\Repositories\Conditions;

trait Config
{
    protected function hiddenCondition(&$builder, $query)
    {
        return $builder->when(isset($query['hidden']) && $query['hidden'], function ($builder) use ($query) {
            $builder->whereNotIn('name', \App\Models\Config::$hide);
        });
    }
}