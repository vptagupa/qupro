<?php

namespace App\Services;

use App\Events\ScreenRefresh;
use App\Models\Screen as ModelScreen;

class Screen
{
    public static function refresh(?int $id = null)
    {
        foreach (ModelScreen::when($id, fn($builder) => $builder->where('id', $id))->get() as $screen) {
            ScreenRefresh::dispatch($screen);
            \Log::info($screen);
        }
    }
}