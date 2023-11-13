<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\AdminController;
use Illuminate\Http\Request;


class TellersControllers extends AdminController
{
    public function index()
    {
        return $this->render('admin/teller/index');
    }

    public function next(int $type)
    {

    }
}
