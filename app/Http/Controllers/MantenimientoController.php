<?php

namespace App\Http\Controllers;

use App\Models\Equipo;
use App\Models\Mantenimiento;
use App\Exports\MantenimientosExport;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Maatwebsite\Excel\Facades\Excel;
use Barryvdh\DomPDF\Facade\Pdf;

class MantenimientoController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = Mantenimiento::with(['equipo.sede', 'usuario']);

        // Filtro por equipo
        if ($request->filled('equipo_id')) {
            $query->where('equipo_id', $request->equipo_id);
        }

        // Filtro por tipo
        if ($request->filled('tipo')) {
            $query->where('tipo', $request->tipo);
        }

        // Filtro por estado
        if ($request->filled('estado')) {
            $query->where('estado', $request->estado);
        }

        // Filtro por rango de fechas
        if ($request->filled('fecha_desde')) {
            $query->whereDate('fecha_inicio', '>=', $request->fecha_desde);
        }

        if ($request->filled('fecha_hasta')) {
            $query->whereDate('fecha_inicio', '<=', $request->fecha_hasta);
        }

        // Búsqueda
        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('descripcion', 'like', "%{$search}%")
                  ->orWhere('proveedor', 'like', "%{$search}%")
                  ->orWhereHas('equipo', function ($eq) use ($search) {
                      $eq->where('codigo_interno', 'like', "%{$search}%");
                  });
            });
        }

        $mantenimientos = $query->orderBy('fecha_inicio', 'desc')
                                ->paginate(15)
                                ->withQueryString();

        $equipos = Equipo::orderBy('codigo_interno')->get(['id', 'codigo_interno', 'marca']);

        return Inertia::render('Mantenimientos/Index', [
            'mantenimientos' => $mantenimientos,
            'equipos' => $equipos,
            'filters' => $request->only(['equipo_id', 'tipo', 'estado', 'fecha_desde', 'fecha_hasta', 'search']),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Request $request)
    {
        $equipos = Equipo::with('sede')
            ->orderBy('codigo_interno')
            ->get();

        // Si viene un equipo preseleccionado
        $equipoSeleccionado = null;
        if ($request->filled('equipo_id')) {
            $equipoSeleccionado = Equipo::with('sede')->find($request->equipo_id);
        }

        return Inertia::render('Mantenimientos/Create', [
            'equipos' => $equipos,
            'equipoSeleccionado' => $equipoSeleccionado,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'equipo_id' => 'required|exists:equipos,id',
            'tipo' => 'required|in:preventivo,correctivo,calibracion,actualizacion',
            'descripcion' => 'required|string|max:255',
            'trabajos_realizados' => 'nullable|string',
            'proveedor' => 'nullable|string|max:255',
            'costo' => 'nullable|numeric|min:0',
            'fecha_inicio' => 'required|date',
            'fecha_fin' => 'nullable|date|after_or_equal:fecha_inicio',
            'proxima_fecha' => 'nullable|date|after:fecha_inicio',
            'estado' => 'required|in:pendiente,en_proceso,completado,cancelado',
            'observaciones' => 'nullable|string',
        ]);

        $validated['usuario_id'] = auth()->id();

        $mantenimiento = Mantenimiento::create($validated);

        // Si el mantenimiento está en proceso, actualizar estado del equipo
        if ($validated['estado'] === 'en_proceso' || $validated['estado'] === 'pendiente') {
            $equipo = Equipo::find($validated['equipo_id']);
            if ($equipo->estado === 'operativo') {
                $equipo->update(['estado' => 'mantenimiento']);
            }
        }

        return redirect()->route('mantenimientos.show', $mantenimiento)
            ->with('success', 'Mantenimiento registrado exitosamente.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Mantenimiento $mantenimiento)
    {
        $mantenimiento->load(['equipo.sede', 'usuario', 'documentos']);

        return Inertia::render('Mantenimientos/Show', [
            'mantenimiento' => $mantenimiento,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Mantenimiento $mantenimiento)
    {
        $equipos = Equipo::with('sede')
            ->orderBy('codigo_interno')
            ->get();

        return Inertia::render('Mantenimientos/Edit', [
            'mantenimiento' => $mantenimiento,
            'equipos' => $equipos,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Mantenimiento $mantenimiento)
    {
        $validated = $request->validate([
            'tipo' => 'required|in:preventivo,correctivo,calibracion,actualizacion',
            'descripcion' => 'required|string|max:255',
            'trabajos_realizados' => 'nullable|string',
            'proveedor' => 'nullable|string|max:255',
            'costo' => 'nullable|numeric|min:0',
            'fecha_inicio' => 'required|date',
            'fecha_fin' => 'nullable|date|after_or_equal:fecha_inicio',
            'proxima_fecha' => 'nullable|date|after:fecha_inicio',
            'estado' => 'required|in:pendiente,en_proceso,completado,cancelado',
            'observaciones' => 'nullable|string',
        ]);

        $mantenimiento->update($validated);

        // Si se completa el mantenimiento, devolver equipo a operativo
        if ($validated['estado'] === 'completado') {
            $mantenimiento->equipo->update(['estado' => 'operativo']);
        }

        return redirect()->route('mantenimientos.show', $mantenimiento)
            ->with('success', 'Mantenimiento actualizado exitosamente.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Mantenimiento $mantenimiento)
    {
        $equipoId = $mantenimiento->equipo_id;
        $mantenimiento->delete();

        return redirect()->route('equipos.show', $equipoId)
            ->with('success', 'Mantenimiento eliminado.');
    }

    /**
     * Export mantenimientos to Excel.
     */
    public function exportExcel(Request $request)
    {
        $filters = $request->only(['equipo_id', 'tipo', 'estado', 'fecha_desde', 'fecha_hasta']);
        $filename = 'mantenimientos_' . date('Y-m-d_His') . '.xlsx';

        return Excel::download(new MantenimientosExport($filters), $filename);
    }

    /**
     * Export mantenimientos to PDF.
     */
    public function exportPdf(Request $request)
    {
        $query = Mantenimiento::with(['equipo.sede', 'usuario']);

        if ($request->filled('equipo_id')) {
            $query->where('equipo_id', $request->equipo_id);
        }
        if ($request->filled('tipo')) {
            $query->where('tipo', $request->tipo);
        }
        if ($request->filled('estado')) {
            $query->where('estado', $request->estado);
        }
        if ($request->filled('fecha_desde')) {
            $query->whereDate('fecha_inicio', '>=', $request->fecha_desde);
        }
        if ($request->filled('fecha_hasta')) {
            $query->whereDate('fecha_inicio', '<=', $request->fecha_hasta);
        }

        $mantenimientos = $query->orderBy('fecha_inicio', 'desc')->get();

        $pdf = Pdf::loadView('pdf.mantenimientos', [
            'mantenimientos' => $mantenimientos,
            'filters' => $request->only(['equipo_id', 'tipo', 'estado', 'fecha_desde', 'fecha_hasta']),
            'fecha' => now()->format('d/m/Y H:i'),
        ]);

        $pdf->setPaper('A4', 'landscape');

        return $pdf->download('mantenimientos_' . date('Y-m-d_His') . '.pdf');
    }
}
