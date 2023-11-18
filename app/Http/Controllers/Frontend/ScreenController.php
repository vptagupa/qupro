<?php

namespace App\Http\Controllers\Frontend;

use App\Http\Controllers\Controller;
use App\Repositories\MediaRepository;
use App\Repositories\ScreenRepository;
use App\Models\Config;
use App\Models\Screen;
use App\Models\AccountType;
use App\Repositories\QuRepository;
use App\Http\Resources\ScreenResource;

class ScreenController extends Controller
{

    public function __construct(
        private MediaRepository $media,
        private QuRepository $qu,
    ) {

    }

    /**
     * Display a listing of the resource.
     */
    public function index(Screen $screen)
    {
        return $this->render(
            view: 'layouts/standard/index',
            layout: 'app-layout',
            options: [
                'screen_id' => $screen->id
            ]
        );
    }

    public function updated(Screen $screen)
    {
        return [
            'media' => $this->media->getActive(),
            'config' => [
                'message' => Config::screenMessage(),
                'interval' => Config::screenInterval(),
                'account_type_ids' => $screen->account_type_ids,
            ],
            'tickets' => $this->qu->called($screen->account_type_ids)
        ];
    }
}
