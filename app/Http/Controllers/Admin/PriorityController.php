<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\AdminController;
use Illuminate\Http\Request;


class PriorityController extends AdminController
{
    public function index()
    {
        return $this->render('admin/priority/index');
    }
}
