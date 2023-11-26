<?php

namespace App\Http\Controllers\Admin;

use App\Enums\Screen;
use App\Http\Controllers\AdminController;
use Illuminate\Http\Request;

class ConfigurationsController extends AdminController
{

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return $this->render('admin/config/index', [
            'screens' => Screen::all()
        ]);
    }
}
