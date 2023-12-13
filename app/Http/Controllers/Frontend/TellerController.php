<?php

namespace App\Http\Controllers\Frontend;


use App\Events\Ding;
use App\Http\Controllers\Controller;
use App\Http\Controllers\Shared\BasedQuController;
use App\Http\Requests\NextQuRequest;
use App\Http\Resources\QuResource;
use App\Repositories\AccountTypeRepository;
use App\Repositories\QuRepository;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\App;

class TellerController extends Controller
{

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return $this->render(
            view: 'teller/public',
            layout: 'app-qu'
        );
    }

    public function next(NextQuRequest $request)
    {
        $qu = (new BasedQuController(
            App::make(QuRepository::class),
            App::make(AccountTypeRepository::class),
        ))->next($request);

        return $this->render('teller/public', [
            'next' => new QuResource($qu)
        ]);
    }

    public function ding(int $qu)
    {
        \Log::info($qu);
        Ding::dispatch(
            (App::make(QuRepository::class))->find($qu)
        );
    }
}
