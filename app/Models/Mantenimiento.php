<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Mantenimiento extends Model
{
    protected $fillable = [
        'equipo_id',
        'usuario_id',
        'tipo',
        'descripcion',
        'trabajos_realizados',
        'proveedor',
        'costo',
        'fecha_inicio',
        'fecha_fin',
        'proxima_fecha',
        'estado',
        'observaciones',
    ];

    protected $casts = [
        'fecha_inicio' => 'date',
        'fecha_fin' => 'date',
        'proxima_fecha' => 'date',
        'costo' => 'decimal:2',
    ];

    /**
     * Equipo al que pertenece el mantenimiento
     */
    public function equipo(): BelongsTo
    {
        return $this->belongsTo(Equipo::class);
    }

    /**
     * Usuario que registró el mantenimiento
     */
    public function usuario(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Documentos asociados al mantenimiento (certificados, facturas)
     */
    public function documentos(): HasMany
    {
        return $this->hasMany(Documento::class);
    }

    /**
     * Scope por tipo de mantenimiento
     */
    public function scopeTipo($query, string $tipo)
    {
        return $query->where('tipo', $tipo);
    }

    /**
     * Scope por estado
     */
    public function scopeEstado($query, string $estado)
    {
        return $query->where('estado', $estado);
    }

    /**
     * Scope para mantenimientos pendientes
     */
    public function scopePendientes($query)
    {
        return $query->where('estado', 'pendiente');
    }

    /**
     * Verificar si está completado
     */
    public function estaCompletado(): bool
    {
        return $this->estado === 'completado';
    }
}
