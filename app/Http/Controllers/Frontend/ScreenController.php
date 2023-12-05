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
            ...$this->getConfig($screen),
            'tickets' => [
                'data' => $this->qu->getLatestServed(
                    includedAccountTypes: $screen->account_type_ids
                ),
                'current' => (function () use ($screen) {
                    $qu = $this->qu->currentServed($screen->account_type_ids);
                    if ($qu)
                        return $qu->append('counter')->toArray();
                    return null;
                })(),
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
        return $this->totalTickets($screen, $request->get('accountType'));
    }

    protected function totalTickets(Screen $screen, ?int $accountTypeId = null)
    {
        $totalServed = fn($accountTypeIds) => $this->qu->getTotalServed($accountTypeId, $accountTypeIds);
        $totalPending = fn($accountTypeIds) => $this->qu->getTotalPending($accountTypeId, $accountTypeIds);

        return [
            'served' => $totalServed($accountTypeId ? [] : $screen->account_type_ids),
            'pending' => $totalPending($accountTypeId ? [] : $screen->account_type_ids),
        ];
    }

    protected function getConfig($screen)
    {
        return [
            'config' =>
                array_merge(
                    Config::screen(),
                    ['screen_account_type_ids' => $screen->account_type_ids]
                ),
        ];
    }
}
