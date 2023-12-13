<?php

namespace App\Http\Controllers\Frontend;

use App\Http\Requests\NextQuRequest;
use App\Http\Resources\QuResource;
use App\Http\Controllers\Shared\BasedTellerController;
use Illuminate\Http\Request;

class TellerController extends BasedTellerController
{

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        return $this->render(
            view: 'teller/public',
            layout: 'app-qu',
            options: [
                'page_id' => str()->random(20),
                'categories' => $this->repository->find($request->user()->id)->categories
            ]
        );
    }

    public function next(NextQuRequest $request)
    {
        return $this->render('teller/public', [
            'next' => new QuResource(parent::next($request))
        ]);
    }
}
