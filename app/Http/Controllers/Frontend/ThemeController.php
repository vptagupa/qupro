<?php

namespace App\Http\Controllers\Frontend;

use App\Http\Controllers\Controller;
use App\Repositories\AccountTypeRepository;
use App\Repositories\ScreenRepository;
use Illuminate\Http\Request;
use App\Enums\Settings;

class ThemeController extends Controller
{

    public function __construct(private AccountTypeRepository $accountType, private ScreenRepository $screen)
    {

    }

    public function update(Request $request)
    {
        $repository = $this->repository($request->get('type'));

        if ($request->get('themeCounter')) {
            $repository->updateTheme(
                $this->typeValue($request->get('type'), $request->get('type_value')),
                'themeCounter',
                $request->get('themeCounter')
            );
        }
        if ($request->get('themeMedia')) {
            $repository->updateTheme(
                $this->typeValue($request->get('type'), $request->get('type_value')),
                'themeMedia',
                $request->get('themeMedia')
            );
        }
    }

    public function reset(Request $request)
    {
        $repository = $this->repository($request->get('type'));

        $repository->updateTheme(
            $this->typeValue($request->get('type'), $request->get('type_value')),
            'themeCounter',
            null
        );

        $repository->updateTheme(
            $this->typeValue($request->get('type'), $request->get('type_value')),
            'themeMedia',
            null
        );
    }

    public function get(Request $request)
    {
        $repository = $this->repository($request->get('type'));

        return $repository->find($this->typeValue($request->get('type'), $request->get('type_value')))?->themes ?? [];
    }

    private function repository($type)
    {
        return match ($type) {
            null, 0 => $this->screen,
            default => (function () use ($type) {
                    $theme = array_values(
                    array_filter(
                        Settings::themes(),
                        fn($theme) => $theme['id'] == $type
                    )
                    )[0];

                    return $theme ? app()->make($theme['repository']) : null;
                })()
        };
    }

    private function typeValue($type, $value)
    {
        return match ($type) {
            null, 0 => $value['screen_id'],
            default => (function () use ($type, $value) {
                    $theme = array_values(
                    array_filter(
                        Settings::themes(),
                        fn($theme) => $theme['id'] == $type
                    )
                    )[0];

                    if (Settings::THEME_TRANSACTION->value == $theme['name'] && isset ($value['account_type_id'])) {
                        return $value['account_type_id'];
                    } elseif (Settings::THEME_DEPARTMENT->value == $theme['name'] && isset ($value['category_id'])) {
                        return $value['category_id'];
                    }

                    return null;
                })()
        };
    }
}
