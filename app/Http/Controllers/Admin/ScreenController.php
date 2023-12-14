<?php

namespace App\Http\Controllers\Admin;

use App\Events\ScreenRefresh;
use App\Http\Controllers\AdminController;
use App\Http\Requests\StoreScreenRequest;
use App\Http\Requests\UpdateScreenRequest;
use App\Http\Resources\ScreenResource;
use Illuminate\Http\Request;
use App\Repositories\ScreenRepository;
use App\Enums\Screen;

class ScreenController extends AdminController
{

    public function __construct(private ScreenRepository $repository)
    {

    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return $this->render('admin/screen/index', [
            'screens' => Screen::all()
        ]);
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

        \App\Services\Screen::refresh($id);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(int $id)
    {
        $this->repository->delete($id);
    }
}
