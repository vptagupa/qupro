<?php

namespace App\Http\Controllers\Frontend;


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
        return $this->render(
            view: 'qu/public'
        );
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreQuRequest $request)
    {
        $qu = parent::store($request);
        return $this->render('qu/public', [
            'qu' => $qu
        ]);
    }
}
