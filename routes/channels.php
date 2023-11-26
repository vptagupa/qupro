<?php


use Illuminate\Support\Facades\Broadcast;
use App\Enums\Access;
use App\Enums\Action;

/*
|--------------------------------------------------------------------------
| Broadcast Channels
|--------------------------------------------------------------------------
|
| Here you may register all of the event broadcasting channels that your
| application supports. The given channel authorization callbacks are
| used to check if an authenticated user can listen to the channel.
|
*/

Broadcast::channel('{id}.account-type', function ($user, $id) {
    return $user->hasAccess(Access::SCREEN, Action::VIEW);
});

Broadcast::channel('{id}.screen', function ($user, $id) {
    return $user->hasAccess(Access::SCREEN, Action::VIEW);
});

Broadcast::channel('media', function ($user) {
    return $user->hasAccess(Access::SCREEN, Action::VIEW);
});

