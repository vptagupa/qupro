<?php

namespace App\Http\Controllers\Admin;

use App\Events\TellerFlush;
use App\Http\Controllers\AdminController;
use App\Repositories\AccountTypeRepository;
use App\Repositories\UserRepository;
use Illuminate\Http\Request;
use App\Http\Resources\QuResource;
use App\Repositories\QuRepository;
use App\Http\Requests\NextQuRequest;
use App\Http\Controllers\Shared\BasedQuController;
use Illuminate\Support\Facades\App;

class TellersControllers extends AdminController
{
    public function __construct(private UserRepository $repository, private AccountTypeRepository $accountType)
    {

    }

    public function index(Request $request)
    {
        return $this->render('admin/teller/index', [
            'categories' => $this->repository->find($request->user()->id)->categories
        ]);
    }

    public function next(NextQuRequest $request)
    {
        $qu = (new BasedQuController(
            App::make(QuRepository::class),
            App::make(AccountTypeRepository::class),
        ))->next($request);

        return $this->render('admin/teller/index', [
            'next' => new QuResource($qu)
        ]);
    }

    public function updateCounterName(Request $request)
    {
        $request->validate([
            'name' => 'required|string',
        ], $request->only('name'));

        $this->repository->update([
            'counter_name' => $request->get('name')
        ], $request->user()->id);

        TellerFlush::dispatch($request->user());
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

        TellerFlush::dispatch($request->user());
    }

    public function updateServeCategory(Request $request, int $accountType, int $category)
    {
        $this->repository->updateServe(
            $request->user()->id,
            $this->accountType->find($accountType),
            $category
        );

        TellerFlush::dispatch($request->user());
    }
}
