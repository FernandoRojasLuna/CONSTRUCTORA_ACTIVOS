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
        Schema::create('mantenimientos', function (Blueprint $table) {
            $table->id();
            
            // Relación con equipo
            $table->foreignId('equipo_id')->constrained('equipos')->onDelete('cascade');
            $table->foreignId('usuario_id')->constrained('users')->onDelete('restrict'); // Quien registra
            
            // Tipo de mantenimiento
            $table->enum('tipo', [
                'preventivo',      // Mantenimiento programado
                'correctivo',      // Reparación
                'calibracion',     // Para equipos de topografía
                'actualizacion'    // Upgrade de componentes
            ]);
            
            // Detalles
            $table->string('descripcion');
            $table->text('trabajos_realizados')->nullable();
            $table->string('proveedor')->nullable();           // Empresa o técnico que realizó
            $table->decimal('costo', 10, 2)->nullable();
            
            // Fechas
            $table->date('fecha_inicio');
            $table->date('fecha_fin')->nullable();
            $table->date('proxima_fecha')->nullable();         // Próximo mantenimiento programado
            
            // Estado
            $table->enum('estado', ['pendiente', 'en_proceso', 'completado', 'cancelado'])->default('pendiente');
            
            $table->text('observaciones')->nullable();
            $table->timestamps();
            
            $table->index(['equipo_id', 'fecha_inicio']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('mantenimientos');
    }
};
