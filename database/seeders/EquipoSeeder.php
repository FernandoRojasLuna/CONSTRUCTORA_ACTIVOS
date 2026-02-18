<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class EquipoSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Equipos de Cómputo
        DB::table('equipos')->insert([
            // Laptops
            [
                'sede_id' => 1, // Oficina Central
                'tipo' => 'computo',
                'subtipo' => 'laptop',
                'codigo_interno' => 'LAP-001',
                'serie' => 'HP-5CD1234567',
                'marca' => 'HP',
                'modelo' => 'ProBook 450 G8',
                'estado' => 'operativo',
                'fecha_adquisicion' => '2024-03-15',
                'valor_compra' => 3500.00,
                'responsable_actual' => 'Juan Pérez',
                'especificaciones' => json_encode([
                    'ram' => '16GB',
                    'procesador' => 'Intel Core i7-1165G7',
                    'disco' => 'SSD 512GB',
                    'sistema_operativo' => 'Windows 11 Pro',
                ]),
                'observaciones' => null,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'sede_id' => 2, // Proyecto Canta
                'tipo' => 'computo',
                'subtipo' => 'laptop',
                'codigo_interno' => 'LAP-002',
                'serie' => 'DELL-SVC9876543',
                'marca' => 'Dell',
                'modelo' => 'Latitude 5520',
                'estado' => 'operativo',
                'fecha_adquisicion' => '2024-05-20',
                'valor_compra' => 4200.00,
                'responsable_actual' => 'Luis García',
                'especificaciones' => json_encode([
                    'ram' => '32GB',
                    'procesador' => 'Intel Core i7-1185G7',
                    'disco' => 'SSD 1TB',
                    'sistema_operativo' => 'Windows 11 Pro',
                ]),
                'observaciones' => 'Equipo para ingeniería',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            // PC de escritorio
            [
                'sede_id' => 1,
                'tipo' => 'computo',
                'subtipo' => 'pc',
                'codigo_interno' => 'PC-001',
                'serie' => 'LNV-PF2XYZ789',
                'marca' => 'Lenovo',
                'modelo' => 'ThinkCentre M720',
                'estado' => 'operativo',
                'fecha_adquisicion' => '2023-08-10',
                'valor_compra' => 2800.00,
                'responsable_actual' => 'Recepción',
                'especificaciones' => json_encode([
                    'ram' => '8GB',
                    'procesador' => 'Intel Core i5-10400',
                    'disco' => 'SSD 256GB',
                    'sistema_operativo' => 'Windows 10 Pro',
                ]),
                'observaciones' => null,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            // Impresoras
            [
                'sede_id' => 1,
                'tipo' => 'computo',
                'subtipo' => 'impresora',
                'codigo_interno' => 'IMP-001',
                'serie' => 'HP-MXLJ456789',
                'marca' => 'HP',
                'modelo' => 'LaserJet Pro M404dn',
                'estado' => 'operativo',
                'fecha_adquisicion' => '2024-01-15',
                'valor_compra' => 1200.00,
                'responsable_actual' => 'Administración',
                'especificaciones' => json_encode([
                    'tipo_insumo' => 'Tóner',
                    'modelo_insumo' => 'CF259A',
                    'conectividad' => 'USB, Ethernet',
                ]),
                'observaciones' => null,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'sede_id' => 2,
                'tipo' => 'computo',
                'subtipo' => 'impresora',
                'codigo_interno' => 'IMP-002',
                'serie' => 'EPSON-X5K987654',
                'marca' => 'Epson',
                'modelo' => 'EcoTank L3250',
                'estado' => 'operativo',
                'fecha_adquisicion' => '2024-06-01',
                'valor_compra' => 800.00,
                'responsable_actual' => 'Oficina Técnica',
                'especificaciones' => json_encode([
                    'tipo_insumo' => 'Tinta',
                    'modelo_insumo' => 'T544',
                    'conectividad' => 'USB, WiFi',
                ]),
                'observaciones' => null,
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);

        // Equipos de Topografía
        DB::table('equipos')->insert([
            // Estaciones Totales
            [
                'sede_id' => 2, // Proyecto Canta
                'tipo' => 'topografia',
                'subtipo' => 'estacion_total',
                'codigo_interno' => 'ET-001',
                'serie' => 'LEICA-TS06-123456',
                'marca' => 'Leica',
                'modelo' => 'TS06 Plus 5"',
                'estado' => 'operativo',
                'fecha_adquisicion' => '2022-11-20',
                'valor_compra' => 25000.00,
                'responsable_actual' => 'Roberto Silva',
                'especificaciones' => json_encode([
                    'precision_angular' => '5 segundos',
                    'alcance' => '3500m con prisma',
                    'accesorios' => ['Trípode', 'Prisma', 'Bastón', 'Baterías x2', 'Cargador'],
                ]),
                'observaciones' => 'Equipo principal de topografía',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'sede_id' => 3, // Proyecto San Juan
                'tipo' => 'topografia',
                'subtipo' => 'estacion_total',
                'codigo_interno' => 'ET-002',
                'serie' => 'TOPCON-GM55-789012',
                'marca' => 'Topcon',
                'modelo' => 'GM-55',
                'estado' => 'operativo',
                'fecha_adquisicion' => '2023-06-15',
                'valor_compra' => 18000.00,
                'responsable_actual' => 'Carlos Mendoza',
                'especificaciones' => json_encode([
                    'precision_angular' => '5 segundos',
                    'alcance' => '3000m con prisma',
                    'accesorios' => ['Trípode', 'Prisma x2', 'Bastón', 'Baterías x3'],
                ]),
                'observaciones' => null,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            // GPS
            [
                'sede_id' => 2,
                'tipo' => 'topografia',
                'subtipo' => 'gps',
                'codigo_interno' => 'GPS-001',
                'serie' => 'TRIMBLE-R8S-456789',
                'marca' => 'Trimble',
                'modelo' => 'R8s GNSS',
                'estado' => 'operativo',
                'fecha_adquisicion' => '2023-02-28',
                'valor_compra' => 35000.00,
                'responsable_actual' => 'Roberto Silva',
                'especificaciones' => json_encode([
                    'tipo' => 'RTK',
                    'precision' => '8mm + 1ppm horizontal',
                    'accesorios' => ['Base', 'Rover', 'Controladora TSC5', 'Radio'],
                ]),
                'observaciones' => 'Sistema GPS RTK completo',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            // Nivel
            [
                'sede_id' => 4, // Almacén
                'tipo' => 'topografia',
                'subtipo' => 'nivel',
                'codigo_interno' => 'NIV-001',
                'serie' => 'SOKKIA-B40A-321654',
                'marca' => 'Sokkia',
                'modelo' => 'B40A',
                'estado' => 'mantenimiento',
                'fecha_adquisicion' => '2021-09-10',
                'valor_compra' => 2500.00,
                'responsable_actual' => 'Almacén',
                'especificaciones' => json_encode([
                    'aumento' => '24x',
                    'precision' => '2mm/km',
                    'accesorios' => ['Trípode', 'Mira 5m'],
                ]),
                'observaciones' => 'En proceso de calibración',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
