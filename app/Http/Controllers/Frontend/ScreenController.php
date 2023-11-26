<?php

namespace App\Http\Controllers\Frontend;

use App\Http\Controllers\Controller;
use App\Repositories\MediaRepository;
use App\Models\Config;
use App\Models\Screen;
use App\Repositories\QuRepository;
use App\Models\Qu;

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
            view: "layouts/{$screen->screen->value}/index",
            layout: 'app-layout',
            options: [
                'screen_id' => $screen->id
            ]
        );
    }

    public function updated(Screen $screen)
    {
        return [
            'config' => [
                'message' => Config::screenMessage(),
                'interval' => Config::screenInterval(),
                'account_type_ids' => $screen->account_type_ids,
            ],
            'tickets' => $this->qu->called($screen->account_type_ids)
        ];
    }

    public function updatedMedia(Screen $screen)
    {
        return $this->media->getActive();
    }
}
