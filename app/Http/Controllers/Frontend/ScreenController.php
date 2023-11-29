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
                'department_id' => $request->get('department')
            ]
        );
    }


    /**
     * Display a color chanage page
     */
    public function color()
    {
        return $this->render(
            view: "screen/premium/index",
            layout: 'app-layout',
            options: [
                'screen_id' => Screen::premium()->id
            ]
        );
    }

    public function updated(Request $request, Screen $screen)
    {
        $totals = $this->totalTickets($request->get('department'));
        return [
            'config' => [
                'message' => Config::screenMessage(),
                'interval' => Config::screenInterval(),
                'account_type_ids' => $screen->account_type_ids,
            ],
            'tickets' => [
                'data' => $this->qu->getLatestServed(),
                'current' => $this->qu->currentServed(),
                ...$totals
            ]
        ];
    }

    public function updatedMedia(Screen $screen)
    {
        return $this->media->getActive();
    }

    protected function totalTickets(?int $accountTypeId = null)
    {
        if ($accountTypeId) {
            return [
                'account_type' => $this->accountType->list(
                    query: [
                        'id' => $accountTypeId,
                        'file' => true
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
