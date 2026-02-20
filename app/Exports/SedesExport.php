<?php

namespace App\Exports;

use App\Models\Sede;
use Maatwebsite\Excel\Concerns\FromQuery;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithMapping;
use Maatwebsite\Excel\Concerns\WithStyles;
use Maatwebsite\Excel\Concerns\ShouldAutoSize;
use PhpOffice\PhpSpreadsheet\Worksheet\Worksheet;

class SedesExport implements FromQuery, WithHeadings, WithMapping, WithStyles, ShouldAutoSize
{
    protected $filters;

    public function __construct(array $filters = [])
    {
        $this->filters = $filters;
    }

    public function query()
    {
        $query = Sede::query()->withCount('equipos');

        if (!empty($this->filters['tipo'])) {
            $query->where('tipo', $this->filters['tipo']);
        }

        if (!empty($this->filters['search'])) {
            $query->where(function ($q) {
                $q->where('nombre', 'like', '%' . $this->filters['search'] . '%')
                  ->orWhere('direccion', 'like', '%' . $this->filters['search'] . '%');
            });
        }

        return $query->orderBy('nombre');
    }

    public function headings(): array
    {
        return [
            'ID',
            'Nombre',
            'Tipo',
            'Dirección',
            'Ciudad',
            'Teléfono',
            'Encargado',
            'Email',
            'Total Equipos',
            'Creado',
        ];
    }

    public function map($sede): array
    {
        $tipos = [
            'oficina' => 'Oficina',
            'almacen' => 'Almacén',
            'proyecto' => 'Proyecto',
        ];

        return [
            $sede->id,
            $sede->nombre,
            $tipos[$sede->tipo] ?? ucfirst($sede->tipo),
            $sede->direccion ?? 'N/A',
            $sede->ciudad,
            $sede->telefono ?? 'N/A',
            $sede->encargado ?? 'N/A',
            $sede->email ?? 'N/A',
            $sede->equipos_count,
            $sede->created_at->format('d/m/Y'),
        ];
    }

    public function styles(Worksheet $sheet): array
    {
        return [
            1 => [
                'font' => ['bold' => true, 'color' => ['rgb' => 'FFFFFF']],
                'fill' => [
                    'fillType' => \PhpOffice\PhpSpreadsheet\Style\Fill::FILL_SOLID,
                    'startColor' => ['rgb' => 'D97706'],
                ],
            ],
        ];
    }
}
