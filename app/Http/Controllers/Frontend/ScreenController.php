<?php

namespace App\Http\Controllers\Frontend;

use App\Http\Controllers\Controller;
use App\Repositories\AccountTypeRepository;
use App\Repositories\MediaRepository;
use App\Models\Config;
use App\Models\Screen;
use App\Repositories\QuRepository;
use Illuminate\Http\Request;

class ScreenController extends Controller
{

    public function __construct(
        private MediaRepository $media,
        private QuRepository $qu,
        private AccountTypeRepository $accountType,
    ) {

    }

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request, Screen $screen)
    {
        return $this->render(
            view: "screen/{$screen->screen->value}/index",
            layout: 'app-layout',
            options: [
                'screen_id' => $screen->id,
                'account_type_id' => $request->get('department')
            ]
        );
    }

    public function updated(Request $request, Screen $screen)
    {
        return [
            'config' => [
                'message' => Config::screenMessage(),
                'interval' => Config::screenInterval(),
                'account_type_ids' => $screen->account_type_ids,
            ],
            'tickets' => [
                'data' => $this->qu->getLatestServed($request->get('page')),
                'current' => $this->qu->currentServed()->append('counter')->toArray(),
                ...(fn() => $this->totalTickets($request->get('accountType')))()
            ]
        ];
    }

    public function updatedMedia(Request $request, Screen $screen)
    {
        $media = $this->media->getActive();
        if ($request->get('account_type')) {
            $accountType = $this->accountType->find($request->get('account_type'));
            if ($file = $accountType->file) {
                $media->push([
                    'file' => $file
                ]);
            }

        }

        return $media;
    }

    public function updatedTotals(Request $request, Screen $screen)
    {
        return [
            'config' => [
                'message' => Config::screenMessage(),
                'interval' => Config::screenInterval(),
                'account_type_ids' => $screen->account_type_ids,
            ],
            ...(fn() => $this->totalTickets($request->get('accountType')))()
        ];
    }

    protected function totalTickets(?int $accountTypeId = null)
    {
        if ($accountTypeId) {
            return [
                'account_type' => $this->accountType->list(
                    query: [
                        'id' => $accountTypeId,
                        'file' => true,
                    ],
                    first: true
                ),
                'served' => $this->qu->getTotalServedByAccountType($accountTypeId),
                'total' => $this->qu->getTotalByAccountType($accountTypeId),
            ];
        }

        return [
            'served' => $this->qu->getTotalServedByAccountType(),
            'total' => $this->qu->getTotalByAccountType(),
        ];
    }
}
