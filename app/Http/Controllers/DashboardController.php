<?php

namespace App\Http\Controllers;

use App\Models\Equipo;
use App\Models\Sede;
use App\Models\Mantenimiento;
use App\Models\Traslado;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        // Estadísticas generales
        $stats = [
            'total_equipos' => Equipo::count(),
            'equipos_operativos' => Equipo::estado('operativo')->count(),
            'equipos_mantenimiento' => Equipo::estado('mantenimiento')->count(),
            'equipos_baja' => Equipo::estado('baja')->count(),
            'total_sedes' => Sede::activas()->count(),
            'equipos_computo' => Equipo::computo()->count(),
            'equipos_topografia' => Equipo::topografia()->count(),
            'mantenimientos_pendientes' => Mantenimiento::pendientes()->count(),
        ];

        // Equipos por sede
        $equiposPorSede = Sede::activas()
            ->withCount('equipos')
            ->get()
            ->map(fn($sede) => [
                'nombre' => $sede->nombre,
                'cantidad' => $sede->equipos_count,
            ]);

        // Últimos traslados
        $ultimosTraslados = Traslado::with(['equipo', 'sedeOrigen', 'sedeDestino', 'usuario'])
            ->latest('fecha_traslado')
            ->take(5)
            ->get();

        // Mantenimientos próximos
        $mantenimientosProximos = Mantenimiento::with('equipo')
            ->where('estado', '!=', 'completado')
            ->orderBy('fecha_inicio')
            ->take(5)
            ->get();

        return Inertia::render('Dashboard', [
            'stats' => $stats,
            'equiposPorSede' => $equiposPorSede,
            'ultimosTraslados' => $ultimosTraslados,
            'mantenimientosProximos' => $mantenimientosProximos,
        ]);
    }
}
