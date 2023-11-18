<?php

use Illuminate\Support\Facades\Route;

use App\Http\Controllers\Admin\{
    AuthController,
    SharedSeriesController,
    DashboardController,
    UsersController,
    FormatsController,
    AccountTypesController,
    ConfigurationsController,
    GlobalConfigController,
    TellersControllers,
    QuController,
    MediaController
};
use App\Http\Controllers\FrontEnd\{ScreenController, QuController as FrontendQuController};

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
            Route::post('/', [UsersController::class, 'store'])->middleware([HandlePrecognitiveRequests::class, 'can:create, App\Models\User'])->name('store');
            Route::patch('/{user}', [UsersController::class, 'update'])->middleware([HandlePrecognitiveRequests::class, 'can:updateAny, App\Models\User'])->name('update');
        });
        Route::name('tellers.')->prefix('tellers')->group(function () {
            Route::get('/', [TellersControllers::class, 'index'])->name('index');
            Route::post('/', [QuController::class, 'next'])->name('next');
            Route::patch('/', [TellersControllers::class, 'updateServeAccountType'])->name('update_serve_account_type');
            Route::patch('/updateCounterName', [TellersControllers::class, 'updateCounterName'])->name('update_counter_name');
        });
        Route::name('formats.')->prefix('formats')->group(function () {
            Route::get('/', [FormatsController::class, 'index'])->name('index')->middleware('can:viewAny, App\Models\NumFormat');
            Route::post('/list', [FormatsController::class, 'list'])->name('list')->middleware('can:viewAny, App\Models\NumFormat');
            Route::post('/', [FormatsController::class, 'store'])->middleware([HandlePrecognitiveRequests::class, 'can:create, App\Models\NumFormat'])->name('store');
            Route::patch('/{format}', [FormatsController::class, 'update'])->middleware([HandlePrecognitiveRequests::class, 'can:updateAny, App\Models\NumFormat'])->name('update');
            Route::delete('/{format}', [FormatsController::class, 'destroy'])->name('destroy')->middleware('can:deleteAny, App\Models\NumFormat');
        });
        Route::name('account-types.')->prefix('account-types')->group(function () {
            Route::get('/', [AccountTypesController::class, 'index'])->name('index')->middleware('can:viewAny, App\Models\AccountType');
            Route::post('/list', [AccountTypesController::class, 'list'])->name('list')->middleware('can:viewAny, App\Models\AccountType');
            Route::post('/', [AccountTypesController::class, 'store'])->middleware([HandlePrecognitiveRequests::class, 'can:create, App\Models\AccountType'])->name('store');
            Route::patch('/{type}', [AccountTypesController::class, 'update'])->middleware([HandlePrecognitiveRequests::class, 'can:updateAny, App\Models\AccountType'])->name('update');
            Route::delete('/{type}', [AccountTypesController::class, 'destroy'])->name('destroy')->middleware('can:deleteAny, App\Models\AccountType');
        });
        Route::name('configurations.')->prefix('configurations')->group(function () {
            Route::get('/', [ConfigurationsController::class, 'index'])->name('index')->middleware('can:viewAny, App\Models\Config');
            Route::name('shared-series.')->prefix('shared-series')->group(function () {
                Route::post('/list', [SharedSeriesController::class, 'list'])->name('list')->middleware('can:viewAny, App\Models\SharedSeries');
                Route::post('/', [SharedSeriesController::class, 'store'])->middleware([HandlePrecognitiveRequests::class, 'can:create, App\Models\SharedSeries'])->name('store');
                Route::patch('/{shared}', [SharedSeriesController::class, 'update'])->middleware([HandlePrecognitiveRequests::class, 'can:updateAny, App\Models\SharedSeries'])->name('update');
                Route::delete('/{shared}', [SharedSeriesController::class, 'destroy'])->name('destroy')->middleware('can:deleteAny, App\Models\SharedSeries');
            });
            Route::name('global.')->prefix('global')->group(function () {
                Route::post('/list', [GlobalConfigController::class, 'list'])->name('list')->middleware('can:viewAny, App\Models\Config');
                Route::post('/', [GlobalConfigController::class, 'store'])->middleware([HandlePrecognitiveRequests::class, 'can:create, App\Models\Config'])->name('store');
                Route::patch('/{config}', [GlobalConfigController::class, 'update'])->middleware([HandlePrecognitiveRequests::class, 'can:updateAny, App\Models\Config'])->name('update');
                Route::delete('/{config}', [GlobalConfigController::class, 'destroy'])->name('destroy')->middleware('can:deleteAny, App\Models\Config');
            });
            Route::name('media.')->prefix('media')->group(function () {
                Route::post('/list', [MediaController::class, 'list'])->name('list')->middleware('can:viewAny, App\Models\File');
                Route::post('/', [MediaController::class, 'store'])->middleware('can:create, App\Models\File')->name('store');
                Route::post('/{id}', [MediaController::class, 'seq'])->middleware('can:create, App\Models\File')->name('seq');
                Route::patch('/{id}', [MediaController::class, 'update'])->middleware('can:updateAny, App\Models\File')->name('update');
                Route::patch('/active/{id}', [MediaController::class, 'active'])->middleware('can:updateAny, App\Models\File')->name('active');
                Route::delete('/{id}', [MediaController::class, 'destroy'])->name('destroy')->middleware('can:deleteAny, App\Models\File');
            });
        });
        Route::name('qu.')->prefix('qu')->group(function () {
            Route::get('/', [QuController::class, 'index'])->name('index')->middleware('can:viewAny, App\Models\Qu');
            Route::get('/studentinfo/{studentno}', [QuController::class, 'getStudentInfo'])->name('student.info')->middleware('can:viewAny, App\Models\Qu');
            Route::post('/list', [QuController::class, 'list'])->name('list')->middleware('can:viewAny, App\Models\Qu');
            Route::post('/', [QuController::class, 'store'])->middleware([HandlePrecognitiveRequests::class, 'can:create, App\Models\Qu'])->name('store');
            Route::post('/waiting/{type}', [QuController::class, 'getWaitingList'])->name('waiting')->middleware('can:viewAny, App\Models\AccountType');
            Route::get('/skip/{id}', [QuController::class, 'skip'])->name('skip');
            Route::post('/served-list', [QuController::class, 'getServedList'])->name('served_list');
        });
        Route::get('/logout', [AuthController::class, 'logout'])->name('logout');
    });

    Route::name('qu.')->prefix('qu')->group(function () {
        Route::get('/', [FrontendQuController::class, 'index'])->name('index');
        Route::post('/', [FrontendQuController::class, 'store'])->middleware([HandlePrecognitiveRequests::class, 'can:create, App\Models\Qu'])->name('store');
    });
});

Route::name('screen.')->prefix('screen')->group(function () {
    Route::get('/', [ScreenController::class, 'index'])->name('index');
});

Route::redirect('/admin', '/admin/dashboard');
Route::get('/login', [AuthController::class, 'login'])->name('login');
Route::post('/login', [AuthController::class, 'auth'])->name('login.auth');
Route::get('/change-password', [AuthController::class, 'changePassword'])->name('auth.change-password');
Route::post('/change-password', [AuthController::class, 'updatePassword'])->name('auth.change-password.update');

