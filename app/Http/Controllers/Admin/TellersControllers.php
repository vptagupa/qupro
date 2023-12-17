<?php

namespace App\Http\Controllers\Admin;

use Illuminate\Http\Request;
use App\Http\Resources\QuResource;
use App\Http\Requests\NextQuRequest;

use App\Http\Controllers\Shared\BasedTellerController;

class TellersControllers extends BasedTellerController
{
    public function index(Request $request)
    {
        return $this->render('admin/teller/index', [
            'categories' => $this->repository->find($request->user()->id)->categories
        ]);
    }

    public function next(NextQuRequest $request)
    {
        return $this->render('admin/teller/index', [
            'next' => new QuResource(parent::next($request))
        ]);
    }
}
