<?php

namespace App\Exports;

use App\Models\Mantenimiento;
use Maatwebsite\Excel\Concerns\FromQuery;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithMapping;
use Maatwebsite\Excel\Concerns\WithStyles;
use Maatwebsite\Excel\Concerns\ShouldAutoSize;
use PhpOffice\PhpSpreadsheet\Worksheet\Worksheet;

class MantenimientosExport implements FromQuery, WithHeadings, WithMapping, WithStyles, ShouldAutoSize
{
    protected $filters;

    public function __construct(array $filters = [])
    {
        $this->filters = $filters;
    }

    public function query()
    {
        $query = Mantenimiento::query()->with(['equipo', 'realizadoPor']);

        if (!empty($this->filters['tipo'])) {
            $query->where('tipo', $this->filters['tipo']);
        }

        if (!empty($this->filters['estado'])) {
            $query->where('estado', $this->filters['estado']);
        }

        if (!empty($this->filters['equipo_id'])) {
            $query->where('equipo_id', $this->filters['equipo_id']);
        }

        if (!empty($this->filters['fecha_desde'])) {
            $query->where('fecha_programada', '>=', $this->filters['fecha_desde']);
        }

        if (!empty($this->filters['fecha_hasta'])) {
            $query->where('fecha_programada', '<=', $this->filters['fecha_hasta']);
        }

        return $query->orderBy('fecha_programada', 'desc');
    }

    public function headings(): array
    {
        return [
            'ID',
            'Equipo',
            'Código Equipo',
            'Tipo',
            'Descripción',
            'Fecha Programada',
            'Fecha Realizada',
            'Estado',
            'Costo',
            'Proveedor',
            'Realizado Por',
            'Observaciones',
            'Creado',
        ];
    }

    public function map($mantenimiento): array
    {
        $tipos = [
            'preventivo' => 'Preventivo',
            'correctivo' => 'Correctivo',
            'calibracion' => 'Calibración',
        ];

        $estados = [
            'programado' => 'Programado',
            'en_proceso' => 'En Proceso',
            'completado' => 'Completado',
            'cancelado' => 'Cancelado',
        ];

        return [
            $mantenimiento->id,
            $mantenimiento->equipo->nombre ?? 'N/A',
            $mantenimiento->equipo->codigo ?? 'N/A',
            $tipos[$mantenimiento->tipo] ?? $mantenimiento->tipo,
            $mantenimiento->descripcion,
            $mantenimiento->fecha_programada?->format('d/m/Y'),
            $mantenimiento->fecha_realizada?->format('d/m/Y') ?? 'Pendiente',
            $estados[$mantenimiento->estado] ?? $mantenimiento->estado,
            $mantenimiento->costo ? '$' . number_format($mantenimiento->costo, 2) : 'N/A',
            $mantenimiento->proveedor ?? 'N/A',
            $mantenimiento->realizadoPor->name ?? 'N/A',
            $mantenimiento->observaciones ?? '',
            $mantenimiento->created_at->format('d/m/Y'),
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
