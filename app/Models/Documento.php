<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Facades\Storage;

class Documento extends Model
{
    protected $fillable = [
        'equipo_id',
        'mantenimiento_id',
        'tipo',
        'nombre',
        'ruta_archivo',
        'extension',
        'tamano',
        'fecha_documento',
        'fecha_vencimiento',
        'observaciones',
    ];

    protected $casts = [
        'fecha_documento' => 'date',
        'fecha_vencimiento' => 'date',
    ];

    /**
     * Equipo al que pertenece el documento
     */
    public function equipo(): BelongsTo
    {
        return $this->belongsTo(Equipo::class);
    }

    /**
     * Mantenimiento al que pertenece el documento
     */
    public function mantenimiento(): BelongsTo
    {
        return $this->belongsTo(Mantenimiento::class);
    }

    /**
     * Obtener la URL del archivo
     */
    public function getUrlAttribute(): string
    {
        return Storage::url($this->ruta_archivo);
    }

    /**
     * Verificar si el documento está vencido
     */
    public function estaVencido(): bool
    {
        if (!$this->fecha_vencimiento) {
            return false;
        }
        return $this->fecha_vencimiento->isPast();
    }

    /**
     * Verificar si está próximo a vencer (30 días)
     */
    public function proximoAVencer(int $dias = 30): bool
    {
        if (!$this->fecha_vencimiento) {
            return false;
        }
        return $this->fecha_vencimiento->isBetween(now(), now()->addDays($dias));
    }

    /**
     * Scope por tipo de documento
     */
    public function scopeTipo($query, string $tipo)
    {
        return $query->where('tipo', $tipo);
    }

    /**
     * Scope para documentos vencidos
     */
    public function scopeVencidos($query)
    {
        return $query->whereNotNull('fecha_vencimiento')
                     ->where('fecha_vencimiento', '<', now());
    }
}
