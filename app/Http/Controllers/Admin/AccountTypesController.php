<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\AdminController;
use Illuminate\Http\Request;
use App\Http\Resources\NumFormatCollection;
use App\Http\Resources\AccountTypeCollection;
use App\Http\Requests\StoreAccountTypeRequest;
use App\Http\Requests\UpdateAccountTypeRequest;
use App\Repositories\AccountTypeRepository;
use App\Repositories\NumFormatRepository;

class AccountTypesController extends AdminController
{
    /**
     * Display a listing of the resource.
     */
    public function __construct(private AccountTypeRepository $repository, private NumFormatRepository $numFormatRepository)
    {
        // 
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return $this->render('admin/account-types/index', [
            'formats' => new NumFormatCollection($this->numFormatRepository->listActive()),
        ]);
    }

    public function list(Request $request)
    {
        return new AccountTypeCollection(
            $this->repository->list(
                query: [
                    'name' => $request->get('query'),
                    ...$request->get('extra')['appends'] ?? [],
                ],

                perPage: $request->get('per_page'),
                orderBy: $request->get('order_by') ?? []
            )
        );
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreAccountTypeRequest $request)
    {
        $this->repository->create($request->safe()->only([
            'name',
            'num_format_id',
            'num_start',
            'priority_format_id',
            'file',
            'categories'
        ]));
    }


    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateAccountTypeRequest $request, int $id)
    {
        $this->repository->update($request->safe()->only([
            'name',
            'num_format_id',
            'num_start',
            'priority_format_id',
            'file',
            'categories'
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
