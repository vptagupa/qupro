<?php

namespace App\Http\Controllers\Shared;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Events\Ding;
use App\Events\TellerFlush;

use App\Http\Requests\NextQuRequest;
use App\Repositories\QuRepository;
use App\Repositories\AccountTypeRepository;
use Illuminate\Support\Facades\App;
use App\Http\Controllers\Shared\BasedQuController;
use App\Repositories\UserRepository;

class BasedTellerController extends Controller
{
    public function __construct(protected UserRepository $repository, protected AccountTypeRepository $accountType)
    {

    }

    public function next(NextQuRequest $request)
    {
        return (new BasedQuController(
            App::make(QuRepository::class),
            App::make(AccountTypeRepository::class),
        ))->next($request);
    }

    public function updateCounterName(Request $request)
    {
        $request->validate([
            'name' => 'required|string',
        ], $request->only('name'));

        $this->repository->update([
            'counter_name' => $request->get('name')
        ], $request->user()->id);

        TellerFlush::dispatch($request->user(), $request->get('page_id'));
    }

    public function updateServeAccountType(Request $request)
    {
        $validated = $request->validate([
            'accountTypeId' => 'required|integer',
        ], $request->only('accountTypeId'));

        $this->repository->updateServe(
            $request->user()->id,
            $this->accountType->find($validated['accountTypeId'])
        );

        TellerFlush::dispatch($request->user(), $request->get('page_id'));
    }

    public function updateServeCategory(Request $request, int $accountType, int $category)
    {
        $this->repository->updateServe(
            $request->user()->id,
            $this->accountType->find($accountType),
            $category
        );

        TellerFlush::dispatch($request->user(), $request->get('page_id'));
    }

    public function ding(int $qu)
    {
        Ding::dispatch(
            (App::make(QuRepository::class))->find($qu)
        );
    }
}
