<?php

namespace App\Http\Controllers\Frontend;

use App\Http\Controllers\Controller;
use App\Repositories\MediaRepository;
use App\Models\Config;
use App\Models\AccountType;
use App\Repositories\QuRepository;

class ScreenController extends Controller
{

    public function __construct(private MediaRepository $media, private QuRepository $qu)
    {

    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return $this->render(
            view: 'layouts/standard/index',
            layout: 'app-layout',
            options: [
                'media' => $this->media->getActive(),
                'config' => [
                    'message' => Config::screenMessage(),
                    'interval' => Config::screenInterval(),
                    'account_type_ids' => AccountType::pluck('id')->toArray(),
                ],
                'qus' => $this->qu->called(AccountType::pluck('id')->toArray())
            ]
        );
    }
}
