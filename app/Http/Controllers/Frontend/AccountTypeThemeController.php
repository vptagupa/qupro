<?php

namespace App\Http\Controllers\Frontend;

use App\Http\Controllers\Controller;
use App\Repositories\AccountTypeRepository;
use App\Repositories\ConfigRepository;
use Illuminate\Http\Request;

class AccountTypeThemeController extends Controller
{

    public function __construct(private AccountTypeRepository $accountType, private ConfigRepository $config)
    {

    }

    public function update(int $accountType, Request $request)
    {
        if ($accountType == 0) {
            $this->config->updateBy([
                'value' => [
                    'themeCounter' => $request->get('themeCounter'),
                    'themeMedia' => $request->get('themeMedia')
                ],
            ], 'Default Screen Theme', 'name');

            return;
        }

        if ($request->get('themeCounter')) {
            $this->accountType->updateTheme(
                $accountType,
                'themeCounter',
                $request->get('themeCounter')
            );
        }
        if ($request->get('themeMedia')) {
            $this->accountType->updateTheme(
                $accountType,
                'themeMedia',
                $request->get('themeMedia')
            );
        }
    }

    public function reset(int $accountType, Request $request)
    {
        if ($accountType == 0) {
            $this->config->resetTheme();
            return;
        }

        $this->accountType->updateTheme(
            $accountType,
            'themeCounter',
            null
        );

        $this->accountType->updateTheme(
            $accountType,
            'themeMedia',
            null
        );
    }

    public function get(int $accountType, Request $request)
    {
        if ($accountType == 0) {
            return $this->config->getTheme();
        }

        return $this->accountType->find($accountType)->theme;
    }
}
