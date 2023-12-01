<?php

namespace App\Http\Controllers\Frontend;

use App\Http\Controllers\Controller;
use App\Repositories\AccountTypeRepository;
use Illuminate\Http\Request;

class AccountTypeThemeController extends Controller
{

    public function __construct(private AccountTypeRepository $accountType)
    {

    }

    public function update(int $accountType, Request $request)
    {
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

    public function get(int $accountType, Request $request)
    {
        return $this->accountType->find($accountType)->theme;
    }
}
