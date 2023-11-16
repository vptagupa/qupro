<?php

namespace App\Policies;

use App\Models\User;
use App\Enums\Access;
use App\Enums\Action;

class FilePolicy
{
    /**
     * Determine whether the user can view any models.
     */
    public function viewAny(User $user): bool
    {
        return $user->hasAccess(Access::CONFIGURATIONS, Action::VIEW_ANY);
    }

    /**
     * Determine whether the user can view the model.
     */
    public function view(User $user): bool
    {
        return $user->hasAccess(Access::CONFIGURATIONS, Action::VIEW);
    }

    /**
     * Determine whether the user can create models.
     */
    public function create(User $user): bool
    {
        return $user->hasAccess(Access::CONFIGURATIONS, Action::CREATE);
    }

    /**
     * Determine whether the user can update the model.
     */
    public function updateAny(User $user): bool
    {
        return $user->hasAccess(Access::CONFIGURATIONS, Action::UPDATE);
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function deleteAny(User $user): bool
    {
        return $user->hasAccess(Access::CONFIGURATIONS, Action::DELETE);
    }

    /**
     * Determine whether the user can restore the model.
     */
    public function restoreAny(User $user): bool
    {
        return $user->hasAccess(Access::CONFIGURATIONS, Action::RESTORE);
    }

    /**
     * Determine whether the user can permanently delete the model.
     */
    public function forceDeleteAny(User $user): bool
    {
        return $user->hasAccess(Access::CONFIGURATIONS, Action::FORCE_DELETE);
    }
}
