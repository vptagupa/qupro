<?php

namespace App\Models\Relations;

use App\Enums\Access;
use App\Enums\Action;

trait Permission
{
    public function getAccess(): array
    {
        return Access::permissions()[$this->role->name];
    }

    public function hasAccess(Access $access, Action $action): bool
    {
        $actions = $this->getAccess()[$access->name] ?? [];

        // Check if the access has ALL actions
        if (in_array(Action::ALL->name, $actions)) {
            return true;
        }

        return in_array($action->name, $actions);
    }
}