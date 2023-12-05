<?php

namespace App\Policies;

use App\Models\User;
use App\Enums\Access;
use App\Enums\Action;

class AuditPolicy
{
    /**
     * Determine whether the user can view any models.
     */
    public function viewAny(User $user): bool
    {
        return $user->hasAccess(Access::AUDIT, Action::VIEW_ANY);
    }

    /**
     * Determine whether the user can view the model.
     */
    public function view(User $user): bool
    {
        return $user->hasAccess(Access::AUDIT, Action::VIEW);
    }
}
