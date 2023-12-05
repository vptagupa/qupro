<?php

use App\Http\Controllers\Admin\AuditController;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\Admin\{
    SharedSeriesController,
    DashboardController,
    UsersController,
    FormatsController,
    AccountTypesController,
    ConfigurationsController,
    GlobalConfigController,
    TellersControllers,
    QuController,
    MediaController,
    AdvancePrintController,
    ScreenController,
};
use App\Http\Controllers\FrontEnd\{
    ScreenController as FrontendScreenController,
    QuController as FrontendQuController,
    AccountTypeThemeController,
    PriorityController,
    AuthController,
    ForgotPasswordController,
    ResetPasswordController
};

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
            Route::patch('/reset-password/{user}', [UsersController::class, 'resetPassword'])->middleware('can:updateAny, App\Models\User')->name('reset-password');
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
            Route::post('/{type}', [AccountTypesController::class, 'update'])->middleware([HandlePrecognitiveRequests::class, 'can:updateAny, App\Models\AccountType'])->name('update');
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
            Route::name('screen.')->prefix('screen')->group(function () {
                Route::post('/list', [ScreenController::class, 'list'])->name('list')->middleware('can:viewAny, App\Models\Screen');
                Route::post('/', [ScreenController::class, 'store'])->middleware([HandlePrecognitiveRequests::class, 'can:create, App\Models\Screen'])->name('store');
                Route::patch('/{screen}', [ScreenController::class, 'update'])->middleware([HandlePrecognitiveRequests::class, 'can:updateAny, App\Models\Screen'])->name('update');
                Route::delete('/{screen}', [ScreenController::class, 'destroy'])->name('destroy')->middleware('can:deleteAny, App\Models\Screen');
            });
        });
        Route::name('qu.')->prefix('qu')->group(function () {
            Route::get('/', [QuController::class, 'index'])->name('index')->middleware('can:viewAny, App\Models\Qu');
            Route::get('/studentinfo/{studentno}', [QuController::class, 'getStudentInfo'])->name('student.info')->middleware('can:viewAny, App\Models\Qu');
            Route::post('/list', [QuController::class, 'list'])->name('list')->middleware('can:viewAny, App\Models\Qu');
            Route::post('/', [QuController::class, 'store'])->middleware([HandlePrecognitiveRequests::class, 'can:create, App\Models\Qu'])->name('store');
            Route::post('/waiting/{type}', [QuController::class, 'getWaitingList'])->name('waiting')->middleware('can:viewAny, App\Models\Qu');
            Route::get('/skip/{id}', [QuController::class, 'skip'])->name('skip');
            Route::post('/served-list', [QuController::class, 'getServedList'])->name('served_list');
            Route::patch('/recalled/{id}', [QuController::class, 'recalled'])->name('recalled');
            Route::patch('/completed/{id}', [QuController::class, 'completed'])->name('completed');
        });
        Route::name('advance-print.')->prefix('advance-print')->group(function () {
            Route::get('/', [AdvancePrintController::class, 'index'])->name('index');
            Route::post('/', [AdvancePrintController::class, 'store'])->middleware('can:create, App\Models\Qu')->name('store');
        });
        Route::name('audit.')->prefix('audit')->group(function () {
            Route::get('/', [AuditController::class, 'index'])->name('index')->middleware('can:view, App\Models\Audit');
            Route::post('/list', [AuditController::class, 'list'])->name('list')->middleware('can:viewAny, App\Models\Audit');
        });
        Route::get('/logout', [AuthController::class, 'logout'])->name('logout');
        Route::redirect('/admin', '/admin/tellers');
    });

    Route::name('qu.')->prefix('qu')->group(function () {
        Route::get('/', [FrontendQuController::class, 'index'])->name('index');
        Route::post('/', [FrontendQuController::class, 'store'])->middleware([HandlePrecognitiveRequests::class, 'can:create, App\Models\Qu'])->name('store');
    });
    Route::name('priority.')->prefix('priority')->group(function () {
        Route::get('/', [PriorityController::class, 'index'])->name('index');
        Route::post('/', [PriorityController::class, 'store'])->middleware([HandlePrecognitiveRequests::class, 'can:create, App\Models\Qu'])->name('store');
    });
});

Route::name('screen.')->prefix('screen')->group(function () {
    Route::get('/updated/{screen}', [FrontendScreenController::class, 'updated'])->name('updated');
    Route::get('/updated-media/{screen}', [FrontendScreenController::class, 'updatedMedia'])->name('updated.media');
    Route::get('/updated-totals/{screen}', [FrontendScreenController::class, 'updatedTotals'])->name('updated.totals');
    Route::name('theme.')->prefix('theme')->group(function () {
        Route::name('account_type.')->group(function () {
            Route::get('/{accountType}', [AccountTypeThemeController::class, 'get'])->name('getTheme');
            Route::post('/{accountType}', [AccountTypeThemeController::class, 'update'])->name('update-theme')->middleware('auth');
            Route::patch('/{accountType}', [AccountTypeThemeController::class, 'reset'])->name('reset-theme')->middleware('auth');
        });
    });
    Route::get('/{screen}', [FrontendScreenController::class, 'index'])->name('index');
});

Route::prefix('change-password')->name('auth.')->group(function () {
    Route::get('/', [AuthController::class, 'changePassword'])->name('change-password');
    Route::post('/', [AuthController::class, 'updatePassword'])->name('change-password.update');
})->middleware('auth');

Route::prefix('login')->name('login.')->group(function () {
    Route::get('/', [AuthController::class, 'login'])->name('index');
    Route::post('/', [AuthController::class, 'auth'])->name('auth');
})->middleware('guest');

Route::prefix('forgot-password')->name('forgot-password.')->group(function () {
    Route::post('/', [ForgotPasswordController::class, 'send'])->name('send');
})->middleware('guest');

Route::prefix('reset-password')->name('password.')->group(function () {
    Route::get('/{token}', [ResetPasswordController::class, 'index'])->name('reset');
    Route::post('/', [ResetPasswordController::class, 'update'])->name('update');
})->middleware('guest');
