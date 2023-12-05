<?php

namespace App\Repositories\Conditions;

trait Audit
{
    public function auditableTypeCondition(&$builder, $query)
    {
        return $builder->when(isset($query['auditable_type']) && $query['auditable_type'], function ($builder) use ($query) {
            $builder->where('auditable_type', 'like', '%' . $query['auditable_type'] . '%');
        });
    }
}