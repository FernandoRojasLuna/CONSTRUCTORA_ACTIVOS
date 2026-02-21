<?php

namespace App\Http\Controllers;

use App\Models\Equipo;
use App\Models\Sede;
use App\Models\Traslado;
use App\Exports\TrasladosExport;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Maatwebsite\Excel\Facades\Excel;
use Barryvdh\DomPDF\Facade\Pdf;

class TrasladoController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = Traslado::with(['equipo', 'sedeOrigen', 'sedeDestino', 'usuario']);

        // Filtro por equipo
        if ($request->filled('equipo_id')) {
            $query->where('equipo_id', $request->equipo_id);
        }

        // Filtro por sede origen
        if ($request->filled('sede_origen_id')) {
            $query->where('sede_origen_id', $request->sede_origen_id);
        }

        // Filtro por sede destino
        if ($request->filled('sede_destino_id')) {
            $query->where('sede_destino_id', $request->sede_destino_id);
        }

        // Filtro por rango de fechas
        if ($request->filled('fecha_desde')) {
            $query->whereDate('fecha_traslado', '>=', $request->fecha_desde);
        }

        if ($request->filled('fecha_hasta')) {
            $query->whereDate('fecha_traslado', '<=', $request->fecha_hasta);
        }

        // Búsqueda
        if ($request->filled('search')) {
            $search = $request->search;
            $query->whereHas('equipo', function ($q) use ($search) {
                $q->where('codigo_interno', 'like', "%{$search}%")
                  ->orWhere('serie', 'like', "%{$search}%");
            });
        }

        $traslados = $query->orderBy('fecha_traslado', 'desc')
                           ->paginate(15)
                           ->withQueryString();

        $sedes = Sede::activas()->orderBy('nombre')->get();
        $equipos = Equipo::orderBy('codigo_interno')->get(['id', 'codigo_interno', 'marca']);

        return Inertia::render('Traslados/Index', [
            'traslados' => $traslados,
            'sedes' => $sedes,
            'equipos' => $equipos,
            'filters' => $request->only(['equipo_id', 'sede_origen_id', 'sede_destino_id', 'fecha_desde', 'fecha_hasta', 'search']),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Request $request)
    {
        $equipos = Equipo::with('sede')
            ->where('estado', '!=', 'baja')
            ->orderBy('codigo_interno')
            ->get();

        $sedes = Sede::activas()->orderBy('nombre')->get();

        // Si viene un equipo preseleccionado
        $equipoSeleccionado = null;
        if ($request->filled('equipo_id')) {
            $equipoSeleccionado = Equipo::with('sede')->find($request->equipo_id);
        }

        return Inertia::render('Traslados/Create', [
            'equipos' => $equipos,
            'sedes' => $sedes,
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
            'sede_destino_id' => 'required|exists:sedes,id',
            'motivo' => 'required|string|max:255',
            'responsable_entrega' => 'nullable|string|max:255',
            'responsable_recibe' => 'nullable|string|max:255',
            'observaciones' => 'nullable|string',
        ]);

        $equipo = Equipo::findOrFail($validated['equipo_id']);
        $sedeDestino = Sede::findOrFail($validated['sede_destino_id']);

        // Verificar que no sea la misma sede
        if ($equipo->sede_id === $sedeDestino->id) {
            return back()->withErrors(['sede_destino_id' => 'El equipo ya está en esa sede.']);
        }

        // Usar el método del modelo para crear el traslado
        $equipo->trasladarA($sedeDestino, auth()->id(), $validated['motivo'], [
            'responsable_entrega' => $validated['responsable_entrega'],
            'responsable_recibe' => $validated['responsable_recibe'],
            'observaciones' => $validated['observaciones'],
        ]);

        return redirect()->route('equipos.show', $equipo)
            ->with('success', 'Traslado registrado exitosamente.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Traslado $traslado)
    {
        $traslado->load(['equipo', 'sedeOrigen', 'sedeDestino', 'usuario']);

        return Inertia::render('Traslados/Show', [
            'traslado' => $traslado,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Traslado $traslado)
    {
        // Los traslados generalmente no se editan, solo se visualizan
        return redirect()->route('traslados.show', $traslado);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Traslado $traslado)
    {
        // Solo permitir actualizar observaciones
        $validated = $request->validate([
            'observaciones' => 'nullable|string',
        ]);

        $traslado->update($validated);

        return redirect()->route('traslados.show', $traslado)
            ->with('success', 'Traslado actualizado.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Traslado $traslado)
    {
        // No permitir eliminar traslados (historial)
        return back()->with('error', 'Los traslados no pueden ser eliminados para mantener el historial.');
    }

    /**
     * Export traslados to Excel.
     */
    public function exportExcel(Request $request)
    {
        $filters = $request->only(['equipo_id', 'sede_origen_id', 'sede_destino_id', 'fecha_desde', 'fecha_hasta', 'estado']);
        $filename = 'traslados_' . date('Y-m-d_His') . '.xlsx';

        return Excel::download(new TrasladosExport($filters), $filename);
    }

    /**
     * Export traslados to PDF.
     */
    public function exportPdf(Request $request)
    {
        $query = Traslado::with(['equipo', 'sedeOrigen', 'sedeDestino', 'usuario']);

        if ($request->filled('equipo_id')) {
            $query->where('equipo_id', $request->equipo_id);
        }
        if ($request->filled('sede_origen_id')) {
            $query->where('sede_origen_id', $request->sede_origen_id);
        }
        if ($request->filled('sede_destino_id')) {
            $query->where('sede_destino_id', $request->sede_destino_id);
        }
        if ($request->filled('fecha_desde')) {
            $query->whereDate('fecha_traslado', '>=', $request->fecha_desde);
        }
        if ($request->filled('fecha_hasta')) {
            $query->whereDate('fecha_traslado', '<=', $request->fecha_hasta);
        }

        $traslados = $query->orderBy('fecha_traslado', 'desc')->get();

        $pdf = Pdf::loadView('pdf.traslados', [
            'traslados' => $traslados,
            'filters' => $request->only(['equipo_id', 'sede_origen_id', 'sede_destino_id', 'fecha_desde', 'fecha_hasta']),
            'fecha' => now()->format('d/m/Y H:i'),
        ]);

        $pdf->setPaper('A4', 'landscape')
            ->setOption('margin-top', 20)
            ->setOption('margin-bottom', 20)
            ->setOption('margin-left', 15)
            ->setOption('margin-right', 15);

        return $pdf->download('traslados_' . date('Y-m-d_His') . '.pdf');
    }
}
