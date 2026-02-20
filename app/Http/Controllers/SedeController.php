<?php

namespace App\Http\Controllers;

use App\Models\Sede;
use App\Exports\SedesExport;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Maatwebsite\Excel\Facades\Excel;
use Barryvdh\DomPDF\Facade\Pdf;

class SedeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = Sede::withCount('equipos');

        // Filtros
        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('nombre', 'like', "%{$search}%")
                  ->orWhere('ciudad', 'like', "%{$search}%")
                  ->orWhere('encargado', 'like', "%{$search}%");
            });
        }

        if ($request->filled('tipo')) {
            $query->where('tipo', $request->tipo);
        }

        if ($request->filled('activo')) {
            $query->where('activo', $request->activo === 'true');
        }

        $sedes = $query->orderBy('nombre')->paginate(10)->withQueryString();

        return Inertia::render('Sedes/Index', [
            'sedes' => $sedes,
            'filters' => $request->only(['search', 'tipo', 'activo']),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Sedes/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'nombre' => 'required|string|max:255',
            'ciudad' => 'required|string|max:255',
            'direccion' => 'nullable|string|max:255',
            'encargado' => 'nullable|string|max:255',
            'telefono' => 'nullable|string|max:50',
            'email' => 'nullable|email|max:255',
            'tipo' => 'required|in:oficina,proyecto,almacen',
            'activo' => 'boolean',
        ]);

        Sede::create($validated);

        return redirect()->route('sedes.index')
            ->with('success', 'Sede creada exitosamente.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Sede $sede)
    {
        $sede->load(['equipos' => function ($query) {
            $query->orderBy('tipo')->orderBy('subtipo');
        }]);

        return Inertia::render('Sedes/Show', [
            'sede' => $sede,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Sede $sede)
    {
        return Inertia::render('Sedes/Edit', [
            'sede' => $sede,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Sede $sede)
    {
        $validated = $request->validate([
            'nombre' => 'required|string|max:255',
            'ciudad' => 'required|string|max:255',
            'direccion' => 'nullable|string|max:255',
            'encargado' => 'nullable|string|max:255',
            'telefono' => 'nullable|string|max:50',
            'email' => 'nullable|email|max:255',
            'tipo' => 'required|in:oficina,proyecto,almacen',
            'activo' => 'boolean',
        ]);

        $sede->update($validated);

        return redirect()->route('sedes.index')
            ->with('success', 'Sede actualizada exitosamente.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Sede $sede)
    {
        // Verificar si tiene equipos asociados
        if ($sede->equipos()->count() > 0) {
            return back()->with('error', 'No se puede eliminar la sede porque tiene equipos asociados.');
        }

        $sede->delete();

        return redirect()->route('sedes.index')
            ->with('success', 'Sede eliminada exitosamente.');
    }

    /**
     * Export sedes to Excel.
     */
    public function exportExcel(Request $request)
    {
        $filters = $request->only(['search', 'tipo']);
        $filename = 'sedes_' . date('Y-m-d_His') . '.xlsx';

        return Excel::download(new SedesExport($filters), $filename);
    }

    /**
     * Export sedes to PDF.
     */
    public function exportPdf(Request $request)
    {
        $query = Sede::withCount('equipos');

        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('nombre', 'like', "%{$search}%")
                  ->orWhere('ciudad', 'like', "%{$search}%");
            });
        }
        if ($request->filled('tipo')) {
            $query->where('tipo', $request->tipo);
        }

        $sedes = $query->orderBy('nombre')->get();

        $pdf = Pdf::loadView('pdf.sedes', [
            'sedes' => $sedes,
            'filters' => $request->only(['search', 'tipo']),
            'fecha' => now()->format('d/m/Y H:i'),
        ]);

        return $pdf->download('sedes_' . date('Y-m-d_His') . '.pdf');
    }
}
