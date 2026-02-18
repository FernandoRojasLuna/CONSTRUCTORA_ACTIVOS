<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Sede extends Model
{
    protected $fillable = [
        'nombre',
        'ciudad',
        'direccion',
        'encargado',
        'telefono',
        'tipo',
        'activo',
    ];

    protected $casts = [
        'activo' => 'boolean',
    ];

    /**
     * Equipos que están actualmente en esta sede
     */
    public function equipos(): HasMany
    {
        return $this->hasMany(Equipo::class);
    }

    /**
     * Traslados donde esta sede fue el origen
     */
    public function trasladosOrigen(): HasMany
    {
        return $this->hasMany(Traslado::class, 'sede_origen_id');
    }

    /**
     * Traslados donde esta sede fue el destino
     */
    public function trasladosDestino(): HasMany
    {
        return $this->hasMany(Traslado::class, 'sede_destino_id');
    }

    /**
     * Scope para sedes activas
     */
    public function scopeActivas($query)
    {
        return $query->where('activo', true);
    }

    /**
     * Scope por tipo de sede
     */
    public function scopeTipo($query, string $tipo)
    {
        return $query->where('tipo', $tipo);
    }
}
