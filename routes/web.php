<?php

use App\Http\Controllers\DashboardController;
use App\Http\Controllers\DocumentoController;
use App\Http\Controllers\EquipoController;
use App\Http\Controllers\MantenimientoController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\SedeController;
use App\Http\Controllers\TrasladoController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

// Rutas protegidas por autenticación
Route::middleware(['auth', 'verified'])->group(function () {
    // Dashboard
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');

    // Gestión de Sedes
    Route::resource('sedes', SedeController::class);
    Route::get('sedes-export/excel', [SedeController::class, 'exportExcel'])->name('sedes.export.excel');
    Route::get('sedes-export/pdf', [SedeController::class, 'exportPdf'])->name('sedes.export.pdf');

    // Gestión de Equipos
    Route::resource('equipos', EquipoController::class);
    Route::get('equipos-export/excel', [EquipoController::class, 'exportExcel'])->name('equipos.export.excel');
    Route::get('equipos-export/pdf', [EquipoController::class, 'exportPdf'])->name('equipos.export.pdf');
    Route::get('equipos/{equipo}/ficha', [EquipoController::class, 'exportFicha'])->name('equipos.ficha');

    // Gestión de Traslados
    Route::resource('traslados', TrasladoController::class);
    Route::get('traslados-export/excel', [TrasladoController::class, 'exportExcel'])->name('traslados.export.excel');
    Route::get('traslados-export/pdf', [TrasladoController::class, 'exportPdf'])->name('traslados.export.pdf');

    // Gestión de Mantenimientos
    Route::resource('mantenimientos', MantenimientoController::class);
    Route::get('mantenimientos-export/excel', [MantenimientoController::class, 'exportExcel'])->name('mantenimientos.export.excel');
    Route::get('mantenimientos-export/pdf', [MantenimientoController::class, 'exportPdf'])->name('mantenimientos.export.pdf');

    // Gestión de Documentos
    Route::post('documentos', [DocumentoController::class, 'store'])->name('documentos.store');
    Route::get('documentos/{documento}', [DocumentoController::class, 'show'])->name('documentos.show');
    Route::get('documentos/{documento}/download', [DocumentoController::class, 'download'])->name('documentos.download');
    Route::delete('documentos/{documento}', [DocumentoController::class, 'destroy'])->name('documentos.destroy');
    Route::get('documentos-proximos-vencer', [DocumentoController::class, 'proximosVencer'])->name('documentos.proximos-vencer');
    Route::get('documentos-vencidos', [DocumentoController::class, 'vencidos'])->name('documentos.vencidos');
});

// Perfil de usuario
Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
