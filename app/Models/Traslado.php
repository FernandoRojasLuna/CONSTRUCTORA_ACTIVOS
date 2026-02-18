<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Traslado extends Model
{
    protected $fillable = [
        'equipo_id',
        'sede_origen_id',
        'sede_destino_id',
        'usuario_id',
        'fecha_traslado',
        'motivo',
        'responsable_entrega',
        'responsable_recibe',
        'observaciones',
    ];

    protected $casts = [
        'fecha_traslado' => 'datetime',
    ];

    /**
     * Equipo que fue trasladado
     */
    public function equipo(): BelongsTo
    {
        return $this->belongsTo(Equipo::class);
    }

    /**
     * Sede de origen
     */
    public function sedeOrigen(): BelongsTo
    {
        return $this->belongsTo(Sede::class, 'sede_origen_id');
    }

    /**
     * Sede de destino
     */
    public function sedeDestino(): BelongsTo
    {
        return $this->belongsTo(Sede::class, 'sede_destino_id');
    }

    /**
     * Usuario que registró el traslado
     */
    public function usuario(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
