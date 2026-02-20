<?php

namespace App\Http\Controllers;

use App\Models\Equipo;
use App\Models\Sede;
use App\Exports\EquiposExport;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Maatwebsite\Excel\Facades\Excel;
use Barryvdh\DomPDF\Facade\Pdf;

class EquipoController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = Equipo::with('sede');

        // Filtro por tipo (computo o topografia)
        if ($request->filled('tipo')) {
            $query->where('tipo', $request->tipo);
        }

        // Filtro por subtipo
        if ($request->filled('subtipo')) {
            $query->where('subtipo', $request->subtipo);
        }

        // Filtro por estado
        if ($request->filled('estado')) {
            $query->where('estado', $request->estado);
        }

        // Filtro por sede
        if ($request->filled('sede_id')) {
            $query->where('sede_id', $request->sede_id);
        }

        // Búsqueda general
        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('codigo_interno', 'like', "%{$search}%")
                  ->orWhere('serie', 'like', "%{$search}%")
                  ->orWhere('marca', 'like', "%{$search}%")
                  ->orWhere('modelo', 'like', "%{$search}%")
                  ->orWhere('responsable_actual', 'like', "%{$search}%");
            });
        }

        $equipos = $query->orderBy('tipo')
                         ->orderBy('subtipo')
                         ->orderBy('codigo_interno')
                         ->paginate(15)
                         ->withQueryString();

        $sedes = Sede::activas()->orderBy('nombre')->get();

        return Inertia::render('Equipos/Index', [
            'equipos' => $equipos,
            'sedes' => $sedes,
            'filters' => $request->only(['tipo', 'subtipo', 'estado', 'sede_id', 'search']),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Request $request)
    {
        $sedes = Sede::activas()->orderBy('nombre')->get();
        $tipo = $request->get('tipo', 'computo'); // Por defecto cómputo

        return Inertia::render('Equipos/Create', [
            'sedes' => $sedes,
            'tipo' => $tipo,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'sede_id' => 'required|exists:sedes,id',
            'tipo' => 'required|in:computo,topografia',
            'subtipo' => 'required|string|max:50',
            'codigo_interno' => 'required|string|max:50|unique:equipos,codigo_interno',
            'serie' => 'required|string|max:100|unique:equipos,serie',
            'marca' => 'required|string|max:100',
            'modelo' => 'required|string|max:100',
            'estado' => 'required|in:operativo,mantenimiento,baja,prestamo',
            'fecha_adquisicion' => 'nullable|date',
            'valor_compra' => 'nullable|numeric|min:0',
            'responsable_actual' => 'nullable|string|max:255',
            'especificaciones' => 'nullable|array',
            'observaciones' => 'nullable|string',
        ]);

        Equipo::create($validated);

        return redirect()->route('equipos.index', ['tipo' => $validated['tipo']])
            ->with('success', 'Equipo registrado exitosamente.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Equipo $equipo)
    {
        $equipo->load([
            'sede',
            'traslados.sedeOrigen',
            'traslados.sedeDestino',
            'traslados.usuario',
            'mantenimientos',
            'documentos',
        ]);

        $sedes = Sede::activas()->where('id', '!=', $equipo->sede_id)->get();

        return Inertia::render('Equipos/Show', [
            'equipo' => $equipo,
            'sedes' => $sedes,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Equipo $equipo)
    {
        $sedes = Sede::activas()->orderBy('nombre')->get();

        return Inertia::render('Equipos/Edit', [
            'equipo' => $equipo,
            'sedes' => $sedes,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Equipo $equipo)
    {
        $validated = $request->validate([
            'sede_id' => 'required|exists:sedes,id',
            'tipo' => 'required|in:computo,topografia',
            'subtipo' => 'required|string|max:50',
            'codigo_interno' => 'required|string|max:50|unique:equipos,codigo_interno,' . $equipo->id,
            'serie' => 'required|string|max:100|unique:equipos,serie,' . $equipo->id,
            'marca' => 'required|string|max:100',
            'modelo' => 'required|string|max:100',
            'estado' => 'required|in:operativo,mantenimiento,baja,prestamo',
            'fecha_adquisicion' => 'nullable|date',
            'valor_compra' => 'nullable|numeric|min:0',
            'responsable_actual' => 'nullable|string|max:255',
            'especificaciones' => 'nullable|array',
            'observaciones' => 'nullable|string',
        ]);

        $equipo->update($validated);

        return redirect()->route('equipos.show', $equipo)
            ->with('success', 'Equipo actualizado exitosamente.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Equipo $equipo)
    {
        $tipo = $equipo->tipo;
        $equipo->delete();

        return redirect()->route('equipos.index', ['tipo' => $tipo])
            ->with('success', 'Equipo eliminado exitosamente.');
    }

    /**
     * Export equipos to Excel.
     */
    public function exportExcel(Request $request)
    {
        $filters = $request->only(['tipo', 'subtipo', 'estado', 'sede_id', 'search']);
        $filename = 'equipos_' . date('Y-m-d_His') . '.xlsx';

        return Excel::download(new EquiposExport($filters), $filename);
    }

    /**
     * Export equipos to PDF.
     */
    public function exportPdf(Request $request)
    {
        $query = Equipo::with('sede');

        if ($request->filled('tipo')) {
            $query->where('tipo', $request->tipo);
        }
        if ($request->filled('subtipo')) {
            $query->where('subtipo', $request->subtipo);
        }
        if ($request->filled('estado')) {
            $query->where('estado', $request->estado);
        }
        if ($request->filled('sede_id')) {
            $query->where('sede_id', $request->sede_id);
        }
        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('codigo_interno', 'like', "%{$search}%")
                  ->orWhere('serie', 'like', "%{$search}%")
                  ->orWhere('marca', 'like', "%{$search}%");
            });
        }

        $equipos = $query->orderBy('tipo')->orderBy('codigo_interno')->get();

        $pdf = Pdf::loadView('pdf.equipos', [
            'equipos' => $equipos,
            'filters' => $request->only(['tipo', 'subtipo', 'estado', 'sede_id', 'search']),
            'fecha' => now()->format('d/m/Y H:i'),
        ]);

        $pdf->setPaper('A4', 'landscape');

        return $pdf->download('equipos_' . date('Y-m-d_His') . '.pdf');
    }

    /**
     * Export single equipo ficha técnica to PDF.
     */
    public function exportFicha(Equipo $equipo)
    {
        $equipo->load(['sede', 'traslados.sedeOrigen', 'traslados.sedeDestino', 'mantenimientos']);

        $pdf = Pdf::loadView('pdf.equipo-ficha', [
            'equipo' => $equipo,
            'fecha' => now()->format('d/m/Y H:i'),
        ]);

        return $pdf->download('ficha_' . $equipo->codigo_interno . '_' . date('Y-m-d') . '.pdf');
    }
}
