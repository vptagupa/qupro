<?php

namespace App\Http\Controllers\Admin;


use App\Http\Controllers\AdminController;
use Illuminate\Http\Request;
use App\Http\Resources\UserCollection;
use App\Http\Requests\StoreUserRequest;
use App\Http\Requests\UpdateUserRequest;
use App\Repositories\UserRepository;
use App\Enums\Role;
use App\Enums\Policy;

class UsersController extends AdminController
{

    public function __construct(private UserRepository $repository)
    {
        // 
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $this->authorize(Policy::view(), $this->getModelNamespace());

        return $this->render('admin/users/index', [
            'roles' => Role::all()
        ]);
    }

    public function list(Request $request)
    {
        $this->authorize(Policy::view(), $this->getModelNamespace());

        return new UserCollection(
            $this->repository->list(
                ['name' => $request->get('name')],
                $request->get('per_page'),
            )
        );
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreUserRequest $request)
    {
        $this->authorize(Policy::create(), $this->getModelNamespace());

        $this->repository->create($request->safe()->only([
            'name',
            'nickname',
            'email',
            'role',
            'password'
        ]));
    }


    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateUserRequest $request, int $id)
    {
        $this->authorize(Policy::update(), $this->getModelNamespace());

        $this->repository->update($request->safe()->only([
            'name',
            'nickname',
            'email',
            'role',
        ]), $id);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(int $id)
    {
        $this->repository->delete($id);
    }

    public function getModelNamespace()
    {
        return $this->repository->model()::class;
    }
}
