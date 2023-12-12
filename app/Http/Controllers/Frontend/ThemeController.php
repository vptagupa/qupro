<?php

namespace App\Http\Controllers\Frontend;

use App\Http\Controllers\Controller;
use App\Repositories\AccountTypeRepository;
use App\Repositories\ScreenRepository;
use Illuminate\Http\Request;

class ThemeController extends Controller
{

    public function __construct(private AccountTypeRepository $accountType, private ScreenRepository $screen)
    {

    }

    public function update(Request $request)
    {
        $repository = $this->accountType;
        if ($request->get('type') == 'screen') {
            $repository = $this->screen;
        }

        if ($request->get('themeCounter')) {
            $repository->updateTheme(
                $request->get('type_id'),
                'themeCounter',
                $request->get('themeCounter')
            );
        }
        if ($request->get('themeMedia')) {
            $repository->updateTheme(
                $request->get('type_id'),
                'themeMedia',
                $request->get('themeMedia')
            );
        }
    }

    public function reset(Request $request)
    {
        $repository = $this->accountType;
        if ($request->get('type') == 'screen') {
            $repository = $this->screen;
        }

        $repository->updateTheme(
            $request->get('type_id'),
            'themeCounter',
            null
        );

        $repository->updateTheme(
            $request->get('type_id'),
            'themeMedia',
            null
        );
    }

    public function get(Request $request)
    {
        $repository = $this->accountType;
        if ($request->get('type') == 'screen') {
            $repository = $this->screen;
        }

        return $repository->find($request->get('type_id'))->themes;
    }
}
