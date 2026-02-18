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
        Schema::create('equipos', function (Blueprint $table) {
            $table->id();
            
            // Relación con sede actual
            $table->foreignId('sede_id')->constrained('sedes')->onDelete('restrict');
            
            // Clasificación del equipo
            $table->enum('tipo', ['computo', 'topografia']);  // Tipo principal
            $table->string('subtipo');                         // laptop, pc, impresora, estacion_total, gps, nivel, etc.
            
            // Identificación
            $table->string('codigo_interno')->unique();        // Código interno de la empresa
            $table->string('serie')->unique();                 // Número de serie del fabricante
            $table->string('marca');
            $table->string('modelo');
            
            // Estado del equipo
            $table->enum('estado', ['operativo', 'mantenimiento', 'baja', 'prestamo'])->default('operativo');
            
            // Información adicional
            $table->date('fecha_adquisicion')->nullable();
            $table->decimal('valor_compra', 10, 2)->nullable();
            $table->string('responsable_actual')->nullable();  // Persona que tiene el equipo
            
            // Especificaciones técnicas (JSON para flexibilidad)
            // Cómputo: ram, procesador, disco, sistema_operativo, tipo_insumo
            // Topografía: accesorios, precision, alcance
            $table->json('especificaciones')->nullable();
            
            $table->text('observaciones')->nullable();
            $table->timestamps();
            
            // Índices para búsquedas frecuentes
            $table->index(['tipo', 'subtipo']);
            $table->index('estado');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('equipos');
    }
};
