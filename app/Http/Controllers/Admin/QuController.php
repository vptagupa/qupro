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

    public function getWaitingList(int $type, Request $request)
    {
        $categories = $request->user()->categories($type)->pluck('categories.id')->toArray();
        return
            new WaitResource([
                'waiting' => new QuCollection(
                    $this->repository->getWaiting(
                        accountTypeId: $type,
                        categoryId: $categories,
                        includePriority: $request->get('priority') == true ? null : $request->get('include_priority'),
                        priority: $request->get('priority'),
                        limit: 2
                    )
                ),
                'priority' => $this->repository->getTotals($type, $categories, true),
                'regular' => $this->repository->getTotals($type, $categories, false),
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
                orderBy: ['called_at', 'desc'],
                perPage: $request->get('per_page'),
                paginate: true
            )
        );
    }

    public function recalled(int $id, Request $request)
    {
        Qu::recalled($request->user(), $id);
    }

    public function completed(int $id, Request $request)
    {
        Qu::completed($request->user(), $id);
    }
}
