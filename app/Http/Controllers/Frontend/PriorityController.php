<?php

namespace App\Http\Controllers\Frontend;


use App\Http\Controllers\Shared\BasedQuController;
use App\Http\Requests\StoreQuRequest;


class PriorityController extends BasedQuController
{

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return $this->render(
            view: 'priority/index',
            layout: 'app-qu'
        );
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreQuRequest $request)
    {
        $qu = parent::store($request);
        return $this->render('priority/index', [
            'qu' => $qu
        ]);
    }
}
