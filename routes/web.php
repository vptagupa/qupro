<?php

use App\Http\Controllers\Admin\AuthController;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\UsersController;

use Illuminate\Foundation\Http\Middleware\HandlePrecognitiveRequests;

use App\Http\Middleware\RedirectIfTemporaryPassword;

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
Route::middleware([
    'auth',
    RedirectIfTemporaryPassword::class
])->group(function () {
    Route::name('admin.')->prefix('admin')->group(function () {
        Route::name('dashboard.')->prefix('dashboard')->group(function () {
            Route::get('/', [DashboardController::class, 'index'])->name('index');
        });
        Route::name('users.')->prefix('users')->group(function () {
            Route::get('/', [UsersController::class, 'index'])->name('index')->middleware('can:viewAny, App\Models\User');
            Route::post('/list', [UsersController::class, 'list'])->name('list')->middleware('can:viewAny, App\Models\User');
            Route::delete('/{user}', [UsersController::class, 'destroy'])->name('destroy')->middleware('can:deleteAny, App\Models\User');
            Route::post('/', [UsersController::class, 'store'])->middleware([HandlePrecognitiveRequests::class])->name('store');
            Route::patch('/{user}', [UsersController::class, 'update'])->middleware([HandlePrecognitiveRequests::class])->name('update');
        });
        Route::name('tellers.')->prefix('tellers')->group(function () {
            Route::get('/', [UsersController::class, 'index'])->name('index');
        });
        Route::name('configurations.')->prefix('configurations')->group(function () {
            Route::get('/', [UsersController::class, 'index'])->name('index');
        });
        Route::get('/logout', [AuthController::class, 'logout'])->name('logout');
    });
});

Route::get('/login', [AuthController::class, 'login'])->name('login');
Route::post('/login', [AuthController::class, 'auth'])->name('login.auth');
Route::get('/change-password', [AuthController::class, 'changePassword'])->name('auth.change-password');
Route::post('/change-password', [AuthController::class, 'updatePassword'])->name('auth.change-password.update');

