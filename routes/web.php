<?php

use Illuminate\Support\Facades\Route;

use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\UsersController;

use Illuminate\Foundation\Http\Middleware\HandlePrecognitiveRequests;

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
        Route::post('/list', [UsersController::class, 'list'])->name('list');
        Route::post('/', [UsersController::class, 'store'])->middleware([HandlePrecognitiveRequests::class])->name('store');
        Route::patch('/{user}', [UsersController::class, 'update'])->middleware([HandlePrecognitiveRequests::class])->name('update');
    });
    Route::resource('users', UsersController::class)->except([
        'create',
        'store',
        'edit',
        'update'
    ]);
    Route::name('tellers.')->prefix('tellers')->group(function () {
        Route::get('/', [UsersController::class, 'index'])->name('index');
    });
    Route::name('configurations.')->prefix('configurations')->group(function () {
        Route::get('/', [UsersController::class, 'index'])->name('index');
    });
});
