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
        Schema::create('sedes', function (Blueprint $table) {
            $table->id();
            $table->string('nombre');                    // Nombre de la sede
            $table->string('ciudad');                    // Ciudad donde se ubica
            $table->string('direccion')->nullable();     // Dirección física
            $table->string('encargado')->nullable();     // Persona responsable
            $table->string('telefono')->nullable();      // Teléfono de contacto
            $table->enum('tipo', ['oficina', 'proyecto', 'almacen'])->default('proyecto'); // Tipo de sede
            $table->boolean('activo')->default(true);    // Si está activa
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('sedes');
    }
};
