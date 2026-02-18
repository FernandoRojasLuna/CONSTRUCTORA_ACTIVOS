<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('traslados', function (Blueprint $table) {
            $table->id();
            
            // Relaciones
            $table->foreignId('equipo_id')->constrained('equipos')->onDelete('cascade');
            $table->foreignId('sede_origen_id')->constrained('sedes')->onDelete('restrict');
            $table->foreignId('sede_destino_id')->constrained('sedes')->onDelete('restrict');
            $table->foreignId('usuario_id')->constrained('users')->onDelete('restrict'); // Quien registra
            
            // Detalles del traslado
            $table->dateTime('fecha_traslado');
            $table->string('motivo');                          // Razón del traslado
            $table->string('responsable_entrega')->nullable(); // Quien entrega
            $table->string('responsable_recibe')->nullable();  // Quien recibe
            $table->text('observaciones')->nullable();
            
            $table->timestamps();
            
            // Índice para consultas de historial
            $table->index(['equipo_id', 'fecha_traslado']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('traslados');
    }
};
