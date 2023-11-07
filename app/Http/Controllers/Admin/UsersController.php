<?php

namespace App\Http\Controllers\Admin;


use App\Http\Controllers\AdminController;
use Illuminate\Http\Request;
use App\Models\User;
use App\Http\Resources\UserCollection;

class UsersController extends AdminController
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return $this->inertia('admin/users/index');
    }

    public function list(Request $request)
    {
        return new UserCollection(User::where('name', 'like', '%' . $request->get('name') . '%')->paginate($request->get('per_page')));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
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
    public function destroy(string $id)
    {
        //
    }
}
