<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        // Modificar el ENUM para incluir todos los tipos de documentos
        DB::statement("ALTER TABLE documentos MODIFY COLUMN tipo ENUM(
            'certificado_calibracion',
            'factura',
            'garantia',
            'manual',
            'ficha_tecnica',
            'acta_entrega',
            'informe_tecnico',
            'otro'
        ) NOT NULL");
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        DB::statement("ALTER TABLE documentos MODIFY COLUMN tipo ENUM(
            'factura',
            'certificado_calibracion',
            'garantia',
            'manual',
            'informe_tecnico',
            'otro'
        ) NOT NULL");
    }
};
