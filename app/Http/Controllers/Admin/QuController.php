<?php

namespace App\Http\Controllers\Admin;

use App\Http\Resources\QuResource;
use Illuminate\Http\Request;
use App\Http\Controllers\Shared\BasedQuController;
use App\Http\Requests\StoreQuRequest;
use App\Http\Requests\UpdateQuRequest;
use App\Http\Requests\NextQuRequest;
use App\Http\Resources\QuCollection;
use App\Http\Resources\WaitResource;
use Carbon\Carbon;
use App\Services\Qu;


class QuController extends BasedQuController
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return $this->render('admin/qu/index');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreQuRequest $request)
    {
        $qu = parent::store($request);

        return $this->render('admin/qu/index', [
            'qu' => $qu
        ]);
    }


    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateQuRequest $request, int $id)
    {
        $qu = parent::update($request, $id);
        return $this->render('admin/qu/index', [
            'qu' => $qu
        ]);
    }


    public function getWaitingList(int $type, Request $request)
    {
        return
            new WaitResource([
                'waiting' => new QuCollection(
                    $this->repository->getWaiting(
                        accountTypeId: $type,
                        includePriority: $request->get('priority') == true ? null : $request->get('include_priority'),
                        priority: $request->get('priority'),
                        limit: 2
                    )
                ),
                'priority' => $this->repository->getTotals($type, true),
                'regular' => $this->repository->getTotals($type, false),
            ]);
    }

    public function getServedList(Request $request)
    {
        return new QuCollection(
            $this->repository->list(
                query: [
                    'name' => $request->get('query'),
                    'called' => true,
                    'accountType' => true
                ],
                perPage: $request->get('per_page'),
                paginate: true
            )
        );
    }

    public function next(NextQuRequest $request)
    {
        if ($request->safe()->qu) {
            $this->repository->update([
                'teller_id' => $request->user()->id,
                'completed_at' => Carbon::now(),
                'counter_name' => $request->user()->counter_name,
                'active' => false
            ], $request->safe()->qu);
        }

        $accountTypeId = $request->safe()->account_type['id'];

        $qu = Qu::next($accountTypeId, $request->user()->counter_name, $request->safe()->priority);

        return $this->render('admin/teller/index', [
            'next' => new QuResource($qu)

        ]);
    }

    public function recalled(int $id, Request $request)
    {
        Qu::recalled($request->user(), $id);
    }
}
