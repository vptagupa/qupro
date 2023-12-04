<?php

namespace App\Http\Middleware;

use App\Http\Resources\AccountTypeCollection;
use App\Models\Config;
use App\Repositories\AccountTypeRepository;

use Illuminate\Http\Request;
use Inertia\Middleware;
use Illuminate\Support\Facades\App;

use App\Enums\Access;
use App\Http\Resources\UserResource;
use App\Http\Resources\NumFormatCollection;
use App\Repositories\NumFormatRepository;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that's loaded on the first page visit.
     *
     * @see https://inertiajs.com/server-side-setup#root-template
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determines the current asset version.
     *
     * @see https://inertiajs.com/asset-versioning
     * @param  \Illuminate\Http\Request  $request
     * @return string|null
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Defines the props that are shared by default.
     *
     * @see https://inertiajs.com/shared-data
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function share(Request $request): array
    {
        return array_merge(parent::share($request), [
            ...$this->user($request),
            ...$this->others(),
            ...$this->config()
        ]);
    }

    private function user($request)
    {
        $data = [];
        if (\Auth::check()) {
            $data = [
                'permissions' => fn() => Access::all(),
                'user' => fn() => new UserResource($request->user()),
            ];
        }

        return $data;
    }

    private function others()
    {
        return [
            'formats' => fn() => new NumFormatCollection(App::call(fn(NumFormatRepository $repo) => $repo->list())),
            'accountTypes' => fn() => new AccountTypeCollection(App::call(fn(AccountTypeRepository $repo) => $repo->list(perPage: 100, orderBy: ['name', 'asc']))),
        ];
    }

    private function config()
    {
        return [
            'config' => fn() => [
                'enabled_prioritY_on_qu_registration' => Config::isEnabledPriorityOnQuRegistration()
            ]
        ];
    }
}
