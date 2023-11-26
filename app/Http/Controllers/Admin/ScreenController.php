<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\AdminController;
use App\Http\Requests\StoreScreenRequest;
use App\Http\Requests\UpdateScreenRequest;
use App\Http\Resources\ScreenResource;
use Illuminate\Http\Request;
use App\Repositories\ScreenRepository;

class ScreenController extends AdminController
{

    public function __construct(private ScreenRepository $repository)
    {

    }

    public function list(Request $request)
    {
        return ScreenResource::collection(
            $this->repository->list(
                ['name' => $request->get('name')],
                $request->get('per_page'),
            )
        );
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreScreenRequest $request)
    {
        $this->repository->create($request->safe()->only([
            'name',
            'account_type_ids',
            'screen',
        ]));
    }


    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateScreenRequest $request, int $id)
    {
        $this->repository->update($request->safe()->only([
            'name',
            'account_type_ids',
            'screen',
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
