<?php

use Illuminate\Support\Facades\Route;

use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\UsersController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/
Route::name('admin.')->prefix('admin')->group(function () {
    Route::name('dashboard.')->prefix('dashboard')->group(function () {
        Route::get('/', [DashboardController::class, 'index'])->name('index');
    });
    Route::name('users.')->prefix('users')->group(function () {
        Route::get('/', [UsersController::class, 'index'])->name('index');
    });
    Route::name('tellers.')->prefix('tellers')->group(function () {
        Route::get('/', [UsersController::class, 'index'])->name('index');
    });
    Route::name('configurations.')->prefix('configurations')->group(function () {
        Route::get('/', [UsersController::class, 'index'])->name('index');
    });
});
