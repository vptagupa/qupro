<?php

namespace App\Http\Controllers\Admin;

use App\Http\Requests\StoreQuRequest;
use App\Http\Controllers\Shared\BasedQuController;

class PriorityController extends BasedQuController
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return $this->render(
            view: 'admin/priority/index',
            layout: 'app-qu'
        );
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreQuRequest $request)
    {
        $qu = parent::store($request);
        return $this->render('admin/priority/index', [
            'qu' => $qu
        ]);
    }
}
