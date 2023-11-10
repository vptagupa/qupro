<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\AdminController;
use Illuminate\Http\Request;
use App\Http\Resources\ConfigCollection;
use App\Http\Requests\StoreConfigRequest;
use App\Http\Requests\UpdateConfigRequest;
use App\Repositories\ConfigurationRepository;

class ConfigurationsController extends AdminController
{
    /**
     * Display a listing of the resource.
     */
    public function __construct(private ConfigurationRepository $repository)
    {
        // 
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return $this->render('admin/config/index');
    }

    public function list(Request $request)
    {
        return new ConfigCollection(
            $this->repository->list(
                ['name' => $request->get('name')],
                $request->get('per_page'),
            )
        );
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreConfigRequest $request)
    {
        $this->repository->create($request->only([
            'name',
            'value',
        ]));
    }


    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateConfigRequest $request, int $id)
    {
        $this->repository->update($request->only([
            'name',
            'value',
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
