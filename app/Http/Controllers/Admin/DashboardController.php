<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\AdminController;
use Illuminate\Http\Request;


class DashboardController extends AdminController
{
    public function index()
    {
        return $this->render('admin/dashboard/index');
    }
}
