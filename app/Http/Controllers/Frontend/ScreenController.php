<?php

namespace App\Http\Controllers\Frontend;

use App\Http\Controllers\Controller;
use App\Repositories\AccountTypeRepository;
use App\Repositories\CategoryRepository;
use App\Repositories\MediaRepository;
use App\Models\Config;
use App\Models\Screen;
use App\Repositories\QuRepository;
use Illuminate\Http\Request;
use App\Enums\Settings;

class ScreenController extends Controller
{
    public function __construct(
        private MediaRepository $media,
        private QuRepository $qu,
        private AccountTypeRepository $accountType,
        private CategoryRepository $category
    ) {

    }

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request, Screen $screen, int $type = null, int $typeValue = null)
    {
        $theme = function () use ($type) {
            return array_values(array_filter(Settings::themes(), fn($theme) => $theme['id'] == $type))[0] ?? null;
        };

        return $this->render(
            view: "screen/{$screen->screen->value}/index",
            options: [
                'screen_id' => $screen->id,
                'account_type' => $theme() && $theme()['name'] == 'Transaction' ? $this->accountType->find($typeValue) : null,
                'account_types' => $screen->accountTypesModels()->orderBy('name', 'asc')->get(),
                'category' => $theme() && $theme()['name'] == 'Department' ? $this->category->find($typeValue) : null,
                'categories' => $this->category->list(perPage: 100),
                'theme' => $theme() ? (function () use ($theme) {
                    $theme = $theme();
                    unset($theme['model']);
                    return $theme;
                })() : null,
                'themes' => $this->themes()
            ]
        );
    }

    public function updated(Request $request, Screen $screen)
    {
        return [
            ...$this->getConfig($screen),
            'tickets' => [
                'data' => $this->qu->getLatestServed(
                    includedAccountTypes: $screen->account_type_ids,
                    limit: Config::counterHistoryLimit()
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

        if ($request->get('category')) {
            $category = $this->category->find($request->get('category'));
            if ($file = $category->file) {
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

    protected function themes()
    {
        $themes = array_map(function ($theme) {
            unset($theme['model']);
            return $theme;
        }, Settings::themes());

        $themes = array_filter(
            $themes,
            fn($theme) => Config::isEnabledCategories() ? true : $theme['name'] != Settings::THEME_DEPARTMENT->value
        );

        return $themes;
    }
}
