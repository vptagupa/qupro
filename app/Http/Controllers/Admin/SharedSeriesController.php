<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\AdminController;
use Illuminate\Http\Request;
use App\Http\Resources\SharedSeriesCollection;
use App\Http\Requests\StoreSharedSeriesRequest;
use App\Http\Requests\UpdateSharedSeriesRequest;
use App\Repositories\SharedSeriesRepository;

class SharedSeriesController extends AdminController
{
    /**
     * Display a listing of the resource.
     */
    public function __construct(private SharedSeriesRepository $repository)
    {
        // 
    }

    public function list(Request $request)
    {
        return new SharedSeriesCollection(
            $this->repository->list(
                ['num_format_id' => $request->get('format')],
                $request->get('per_page'),
            )
        );
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreSharedSeriesRequest $request)
    {
        $safe = $request->safe()->merge([
            'num_format_id' => $request->get('format'),
            'account_type_ids' => array_map(fn($type) => $type['id'], $request->get('account_types') ?? []),
        ]);

        $this->repository->create($safe->only([
            'num_format_id',
            'account_type_ids',
            'num_start'
        ]));
    }


    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateSharedSeriesRequest $request, int $id)
    {
        $safe = $request->safe()->merge([
            'num_format_id' => $request->get('format'),
            'account_type_ids' => array_map(fn($type) => $type['id'], $request->get('account_types') ?? []),
        ]);

        $this->repository->update($safe->only([
            'num_format_id',
            'account_type_ids',
            'num_start'
        ]), $id);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(int $id)
    {
        $this->repository->delete($id);
    }
}
