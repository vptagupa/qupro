<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\AdminController;
use App\Http\Requests\StoreCategoryRequest;
use App\Http\Requests\UpdateCategoryRequest;
use App\Http\Resources\CategoryResource;
use Illuminate\Http\Request;
use App\Repositories\CategoryRepository;

class CategoriesController extends AdminController
{
    /**
     * Display a listing of the resource.
     */
    public function __construct(private CategoryRepository $repository)
    {
        // 
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return $this->render('admin/categories/index');
    }

    public function list(Request $request)
    {
        return CategoryResource::collection(
            $this->repository->list(
                query: [
                    'name' => $request->get('query'),
                ],
                perPage: $request->get('per_page'),
                orderBy: ['name', 'asc']
            )
        );
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreCategoryRequest $request)
    {
        $this->repository->create($request->safe()->only([
            'name',
            'description',
        ]));
    }


    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateCategoryRequest $request, int $id)
    {
        $this->repository->update($request->safe()->only([
            'name',
            'description',
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
