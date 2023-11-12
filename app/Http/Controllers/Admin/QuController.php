<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Shared\BasedQuController;
use App\Http\Requests\StoreQuRequest;
use App\Http\Requests\UpdateQuRequest;


class QuController extends BasedQuController
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return $this->render('admin/qu/index');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreQuRequest $request)
    {
        $qu = parent::store($request);
        return $this->render('admin/qu/index', [
            'qu' => $qu
        ]);
    }


    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateQuRequest $request, int $id)
    {
        $qu = parent::update($request, $id);
        return $this->render('admin/qu/index', [
            'qu' => $qu
        ]);
    }
}
