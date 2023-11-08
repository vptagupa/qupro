<?php

namespace App\Models\Relations;

use App\Enums\Access;

trait Permission
{
    public function getAccess()
    {
        return Access::permissions()[$this->role->name];
    }
}