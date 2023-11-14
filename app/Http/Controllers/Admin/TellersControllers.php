<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\AdminController;
use App\Repositories\UserRepository;
use Illuminate\Http\Request;


class TellersControllers extends AdminController
{
    public function __construct(private UserRepository $repository)
    {

    }

    public function index()
    {
        return $this->render('admin/teller/index');
    }

    public function updateTellerName(Request $request)
    {
        $request->validate([
            'name' => 'required|string',
        ], $request->only('name'));

        $this->repository->update([
            'teller_name' => $request->get('name')
        ], $request->user()->id);
    }

    public function updateServeAccountType(Request $request)
    {
        $validated = $request->validate([
            'accountTypeId' => 'required|integer',
        ], $request->only('accountTypeId'));

        $this->repository->updateServeAccountType($request->user()->id, $validated['accountTypeId']);
    }
}
