<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class SedeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('sedes')->insert([
            [
                'nombre' => 'Oficina Central',
                'ciudad' => 'Lima',
                'direccion' => 'Av. Javier Prado Este 1234, San Isidro',
                'encargado' => 'Carlos Méndez',
                'telefono' => '01-234-5678',
                'tipo' => 'oficina',
                'activo' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'nombre' => 'Proyecto Canta',
                'ciudad' => 'Canta',
                'direccion' => 'Carretera Canta Km 45',
                'encargado' => 'Luis García',
                'telefono' => '999-888-777',
                'tipo' => 'proyecto',
                'activo' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'nombre' => 'Proyecto San Juan',
                'ciudad' => 'Lima',
                'direccion' => 'Av. Los Héroes 567, San Juan de Miraflores',
                'encargado' => 'Ana Torres',
                'telefono' => '999-777-666',
                'tipo' => 'proyecto',
                'activo' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'nombre' => 'Almacén Central',
                'ciudad' => 'Lima',
                'direccion' => 'Jr. Industrial 890, Ate',
                'encargado' => 'Pedro Ramos',
                'telefono' => '01-456-7890',
                'tipo' => 'almacen',
                'activo' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'nombre' => 'Proyecto Huaral (Cerrado)',
                'ciudad' => 'Huaral',
                'direccion' => 'Carretera Panamericana Norte Km 80',
                'encargado' => 'Miguel Sánchez',
                'telefono' => '999-555-444',
                'tipo' => 'proyecto',
                'activo' => false,
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
