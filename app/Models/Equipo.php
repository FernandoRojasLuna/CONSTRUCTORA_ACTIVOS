<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Equipo extends Model
{
    protected $fillable = [
        'sede_id',
        'tipo',
        'subtipo',
        'codigo_interno',
        'serie',
        'marca',
        'modelo',
        'estado',
        'fecha_adquisicion',
        'valor_compra',
        'responsable_actual',
        'especificaciones',
        'observaciones',
    ];

    protected $casts = [
        'especificaciones' => 'array',
        'fecha_adquisicion' => 'date',
        'valor_compra' => 'decimal:2',
    ];

    /**
     * Sede donde está actualmente el equipo
     */
    public function sede(): BelongsTo
    {
        return $this->belongsTo(Sede::class);
    }

    /**
     * Historial de traslados del equipo
     */
    public function traslados(): HasMany
    {
        return $this->hasMany(Traslado::class)->orderBy('fecha_traslado', 'desc');
    }

    /**
     * Mantenimientos del equipo
     */
    public function mantenimientos(): HasMany
    {
        return $this->hasMany(Mantenimiento::class)->orderBy('fecha_inicio', 'desc');
    }

    /**
     * Documentos asociados al equipo
     */
    public function documentos(): HasMany
    {
        return $this->hasMany(Documento::class);
    }

    /**
     * Scope para equipos de cómputo
     */
    public function scopeComputo($query)
    {
        return $query->where('tipo', 'computo');
    }

    /**
     * Scope para equipos de topografía
     */
    public function scopeTopografia($query)
    {
        return $query->where('tipo', 'topografia');
    }

    /**
     * Scope por estado
     */
    public function scopeEstado($query, string $estado)
    {
        return $query->where('estado', $estado);
    }

    /**
     * Scope por subtipo
     */
    public function scopeSubtipo($query, string $subtipo)
    {
        return $query->where('subtipo', $subtipo);
    }

    /**
     * Verificar si el equipo está operativo
     */
    public function estaOperativo(): bool
    {
        return $this->estado === 'operativo';
    }

    /**
     * Trasladar equipo a otra sede
     */
    public function trasladarA(Sede $nuevaSede, int $usuarioId, string $motivo, array $datos = []): Traslado
    {
        $sedeOrigenId = $this->sede_id;
        
        // Crear registro de traslado
        $traslado = $this->traslados()->create([
            'sede_origen_id' => $sedeOrigenId,
            'sede_destino_id' => $nuevaSede->id,
            'usuario_id' => $usuarioId,
            'fecha_traslado' => now(),
            'motivo' => $motivo,
            'responsable_entrega' => $datos['responsable_entrega'] ?? null,
            'responsable_recibe' => $datos['responsable_recibe'] ?? null,
            'observaciones' => $datos['observaciones'] ?? null,
        ]);

        // Actualizar sede actual del equipo y el responsable si se especificó
        $updateData = ['sede_id' => $nuevaSede->id];
        
        // Si hay un responsable que recibe, actualizar el responsable_actual del equipo
        if (!empty($datos['responsable_recibe'])) {
            $updateData['responsable_actual'] = $datos['responsable_recibe'];
        }
        
        $this->update($updateData);

        return $traslado;
    }
}
