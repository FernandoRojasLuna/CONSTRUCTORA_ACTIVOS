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
        Schema::create('documentos', function (Blueprint $table) {
            $table->id();
            
            // Relación polimórfica (puede pertenecer a equipo o mantenimiento)
            $table->foreignId('equipo_id')->nullable()->constrained('equipos')->onDelete('cascade');
            $table->foreignId('mantenimiento_id')->nullable()->constrained('mantenimientos')->onDelete('cascade');
            
            // Información del documento
            $table->enum('tipo', [
                'factura',
                'certificado_calibracion',
                'garantia',
                'manual',
                'informe_tecnico',
                'otro'
            ]);
            $table->string('nombre');                          // Nombre descriptivo
            $table->string('ruta_archivo');                    // Path del archivo en storage
            $table->string('extension', 10);                   // pdf, jpg, png, etc.
            $table->integer('tamano')->nullable();             // Tamaño en bytes
            
            $table->date('fecha_documento')->nullable();       // Fecha del documento
            $table->date('fecha_vencimiento')->nullable();     // Para certificados
            
            $table->text('observaciones')->nullable();
            $table->timestamps();
            
            $table->index('equipo_id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('documentos');
    }
};
