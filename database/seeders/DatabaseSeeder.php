<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Usuario administrador de prueba
        User::factory()->create([
            'name' => 'Administrador',
            'email' => 'admin@constructora.com',
        ]);

        // Usuario operador de prueba
        User::factory()->create([
            'name' => 'Fernando Operador',
            'email' => 'fernando@constructora.com',
        ]);

        // Ejecutar seeders en orden (sedes primero, luego equipos)
        $this->call([
            SedeSeeder::class,
            EquipoSeeder::class,
        ]);
    }
}
