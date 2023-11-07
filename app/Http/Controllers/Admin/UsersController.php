<?php

namespace App\Http\Controllers\Admin;


use App\Http\Controllers\AdminController;
use Illuminate\Http\Request;
use App\Http\Resources\UserCollection;
use App\Http\Requests\StoreUserRequest;
use App\Repositories\UserRepository;
use App\Enums\Role;

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
        return $this->inertia('admin/users/index', [
            'roles' => Role::all()
        ]);
    }

    public function list(Request $request)
    {
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
        $this->repository->create($request->safe()->only([
            'name',
            'nickname',
            'email',
            'role',
            'password'
        ]));
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }


    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(int $id)
    {
        $this->repository->delete($id);
    }
}
