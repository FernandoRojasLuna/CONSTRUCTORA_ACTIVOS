<?php

namespace App\Http\Controllers;

use App\Models\Documento;
use App\Models\Equipo;
use App\Models\Mantenimiento;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class DocumentoController extends Controller
{
    /**
     * Store a newly created document in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'equipo_id' => 'nullable|exists:equipos,id',
            'mantenimiento_id' => 'nullable|exists:mantenimientos,id',
            'tipo' => 'required|in:certificado_calibracion,factura,garantia,manual,ficha_tecnica,acta_entrega,otro',
            'archivo' => 'required|file|mimes:pdf,jpg,jpeg,png,doc,docx,xls,xlsx|max:10240',
            'nombre' => 'required|string|max:255',
            'observaciones' => 'nullable|string|max:500',
            'fecha_documento' => 'nullable|date',
            'fecha_vencimiento' => 'nullable|date|after_or_equal:fecha_documento',
        ]);

        // Validar que al menos uno esté presente
        if (empty($validated['equipo_id']) && empty($validated['mantenimiento_id'])) {
            return back()->withErrors(['error' => 'Debe especificar un equipo o mantenimiento.']);
        }

        // Subir archivo
        $archivo = $request->file('archivo');
        $extension = $archivo->getClientOriginalExtension();
        $nombreArchivo = Str::slug($validated['nombre']) . '_' . time() . '.' . $extension;
        
        $folder = !empty($validated['equipo_id']) 
            ? 'documentos/equipos/' . $validated['equipo_id']
            : 'documentos/mantenimientos/' . $validated['mantenimiento_id'];
        
        $path = $archivo->storeAs($folder, $nombreArchivo, 'public');

        // Crear documento
        $documento = Documento::create([
            'equipo_id' => $validated['equipo_id'] ?? null,
            'mantenimiento_id' => $validated['mantenimiento_id'] ?? null,
            'tipo' => $validated['tipo'],
            'nombre' => $validated['nombre'],
            'ruta_archivo' => $path,
            'extension' => $extension,
            'tamano' => $archivo->getSize(),
            'observaciones' => $validated['observaciones'] ?? null,
            'fecha_documento' => $validated['fecha_documento'] ?? null,
            'fecha_vencimiento' => $validated['fecha_vencimiento'] ?? null,
        ]);

        if (!empty($validated['equipo_id'])) {
            return redirect()->route('equipos.show', $validated['equipo_id'])
                ->with('success', 'Documento subido exitosamente.');
        }

        return redirect()->route('mantenimientos.show', $validated['mantenimiento_id'])
            ->with('success', 'Documento subido exitosamente.');
    }

    /**
     * Download the specified document.
     */
    public function download(Documento $documento)
    {
        if (!Storage::disk('public')->exists($documento->ruta_archivo)) {
            return back()->with('error', 'El archivo no existe.');
        }

        $path = Storage::disk('public')->path($documento->ruta_archivo);
        $filename = $documento->nombre . '.' . $documento->extension;

        return response()->download($path, $filename);
    }

    /**
     * Display the specified document (preview).
     */
    public function show(Documento $documento)
    {
        if (!Storage::disk('public')->exists($documento->ruta_archivo)) {
            abort(404, 'Archivo no encontrado');
        }

        return response()->file(Storage::disk('public')->path($documento->ruta_archivo));
    }

    /**
     * Remove the specified document from storage.
     */
    public function destroy(Documento $documento)
    {
        $equipoId = $documento->equipo_id;
        $mantenimientoId = $documento->mantenimiento_id;

        // Eliminar archivo físico
        if (Storage::disk('public')->exists($documento->ruta_archivo)) {
            Storage::disk('public')->delete($documento->ruta_archivo);
        }

        $documento->delete();

        if ($equipoId) {
            return redirect()->route('equipos.show', $equipoId)
                ->with('success', 'Documento eliminado.');
        }

        return redirect()->route('mantenimientos.show', $mantenimientoId)
            ->with('success', 'Documento eliminado.');
    }

    /**
     * Get documents expiring soon.
     */
    public function proximosVencer(Request $request)
    {
        $dias = $request->get('dias', 30);

        $documentos = Documento::with(['equipo', 'mantenimiento'])
            ->whereNotNull('fecha_vencimiento')
            ->where('fecha_vencimiento', '<=', now()->addDays($dias))
            ->where('fecha_vencimiento', '>=', now())
            ->orderBy('fecha_vencimiento')
            ->get();

        return response()->json([
            'documentos' => $documentos,
            'total' => $documentos->count(),
        ]);
    }

    /**
     * Get expired documents.
     */
    public function vencidos()
    {
        $documentos = Documento::with(['equipo', 'mantenimiento'])
            ->vencidos()
            ->orderBy('fecha_vencimiento', 'desc')
            ->get();

        return response()->json([
            'documentos' => $documentos,
            'total' => $documentos->count(),
        ]);
    }
}
