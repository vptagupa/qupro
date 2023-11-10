<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\AdminController;
use Illuminate\Http\Request;
use App\Http\Resources\NumFormatCollection;
use App\Http\Requests\StoreNumFormatRequest;
use App\Http\Requests\UpdateNumFormatRequest;
use App\Repositories\NumFormatRepository;

class FormatsController extends AdminController
{
    /**
     * Display a listing of the resource.
     */
    public function __construct(private NumFormatRepository $repository)
    {
        // 
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return $this->render('admin/formats/index');
    }

    public function list(Request $request)
    {
        return new NumFormatCollection(
            $this->repository->list(
                ['title' => $request->get('query')],
                $request->get('per_page'),
            )
        );
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreNumFormatRequest $request)
    {
        $this->repository->create($request->safe()->only([
            'title',
            'affix',
            'delimiter',
            'format',
            'active'
        ]));
    }


    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateNumFormatRequest $request, int $id)
    {
        $this->repository->update($request->safe()->only([
            'title',
            'affix',
            'delimiter',
            'format',
            'active'
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
