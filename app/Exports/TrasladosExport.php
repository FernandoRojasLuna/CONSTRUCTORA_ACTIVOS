<?php

namespace App\Exports;

use App\Models\Traslado;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithStyles;
use Maatwebsite\Excel\Concerns\ShouldAutoSize;
use Maatwebsite\Excel\Concerns\WithTitle;
use PhpOffice\PhpSpreadsheet\Worksheet\Worksheet;

class TrasladosExport implements FromCollection, WithStyles, ShouldAutoSize, WithTitle
{
    protected $filters;
    protected $computoCount = 0;
    protected $topografiaCount = 0;

    public function __construct(array $filters = [])
    {
        $this->filters = $filters;
    }

    public function title(): string
    {
        return 'Historial de Traslados';
    }

    public function collection()
    {
        // Obtener traslados de equipos de cómputo
        $trasladosComputo = $this->getTraslados('computo');
        $this->computoCount = $trasladosComputo->count();

        // Obtener traslados de equipos de topografía
        $trasladosTopografia = $this->getTraslados('topografia');
        $this->topografiaCount = $trasladosTopografia->count();

        $rows = collect();

        // === SECCIÓN CÓMPUTO ===
        $rows->push(['TRASLADOS - EQUIPOS DE CÓMPUTO', '', '', '', '', '', '', '', '', '']);
        $rows->push($this->getHeadingsComputo());
        foreach ($trasladosComputo as $traslado) {
            $rows->push($this->mapTrasladoComputo($traslado));
        }

        // Filas vacías de separación
        $rows->push(['']);
        $rows->push(['']);

        // === SECCIÓN TOPOGRAFÍA ===
        $rows->push(['TRASLADOS - EQUIPOS DE TOPOGRAFÍA', '', '', '', '', '', '', '', '', '']);
        $rows->push($this->getHeadingsTopografia());
        foreach ($trasladosTopografia as $traslado) {
            $rows->push($this->mapTrasladoTopografia($traslado));
        }

        return $rows;
    }

    protected function getTraslados(string $tipo)
    {
        $query = Traslado::with(['equipo', 'sedeOrigen', 'sedeDestino', 'usuario'])
            ->whereHas('equipo', function ($q) use ($tipo) {
                $q->where('tipo', $tipo);
            });

        if (!empty($this->filters['equipo_id'])) {
            $query->where('equipo_id', $this->filters['equipo_id']);
        }

        if (!empty($this->filters['sede_origen_id'])) {
            $query->where('sede_origen_id', $this->filters['sede_origen_id']);
        }

        if (!empty($this->filters['sede_destino_id'])) {
            $query->where('sede_destino_id', $this->filters['sede_destino_id']);
        }

        if (!empty($this->filters['fecha_desde'])) {
            $query->where('fecha_traslado', '>=', $this->filters['fecha_desde']);
        }

        if (!empty($this->filters['fecha_hasta'])) {
            $query->where('fecha_traslado', '<=', $this->filters['fecha_hasta']);
        }

        return $query->orderBy('id', 'asc')->get();
    }

    protected function getHeadingsComputo(): array
    {
        return [
            'Código Equipo',
            'Equipo',
            'Subtipo',
            'Sede Origen',
            'Sede Destino',
            'Fecha Traslado',
            'Motivo',
            'Responsable Entrega',
            'Responsable Recibe',
            'Observaciones',
        ];
    }

    protected function getHeadingsTopografia(): array
    {
        return [
            'Código Equipo',
            'Equipo',
            'Subtipo',
            'Sede Origen',
            'Sede Destino',
            'Fecha Traslado',
            'Motivo',
            'Responsable Entrega',
            'Responsable Recibe',
            'Observaciones',
        ];
    }

    protected function mapTrasladoComputo($traslado): array
    {
        $subtipos = [
            'laptop' => 'Laptop',
            'desktop' => 'Desktop',
            'impresora' => 'Impresora',
            'monitor' => 'Monitor',
            'proyector' => 'Proyector',
            'servidor' => 'Servidor',
            'otro' => 'Otro',
        ];

        return [
            $traslado->equipo->codigo_interno ?? 'N/A',
            $traslado->equipo ? "{$traslado->equipo->marca} {$traslado->equipo->modelo}" : 'N/A',
            $subtipos[$traslado->equipo->subtipo ?? ''] ?? ucfirst($traslado->equipo->subtipo ?? 'N/A'),
            $traslado->sedeOrigen->nombre ?? 'N/A',
            $traslado->sedeDestino->nombre ?? 'N/A',
            $traslado->fecha_traslado?->format('d/m/Y H:i'),
            $traslado->motivo ?? '',
            $traslado->responsable_entrega ?? '-',
            $traslado->responsable_recibe ?? '-',
            $traslado->observaciones ?? '',
        ];
    }

    protected function mapTrasladoTopografia($traslado): array
    {
        $subtipos = [
            'estacion_total' => 'Estación Total',
            'nivel' => 'Nivel',
            'gps' => 'GPS',
            'teodolito' => 'Teodolito',
            'drone' => 'Drone',
            'prisma' => 'Prisma',
            'tripode' => 'Trípode',
            'otro' => 'Otro',
        ];

        return [
            $traslado->equipo->codigo_interno ?? 'N/A',
            $traslado->equipo ? "{$traslado->equipo->marca} {$traslado->equipo->modelo}" : 'N/A',
            $subtipos[$traslado->equipo->subtipo ?? ''] ?? ucfirst($traslado->equipo->subtipo ?? 'N/A'),
            $traslado->sedeOrigen->nombre ?? 'N/A',
            $traslado->sedeDestino->nombre ?? 'N/A',
            $traslado->fecha_traslado?->format('d/m/Y H:i'),
            $traslado->motivo ?? '',
            $traslado->responsable_entrega ?? '-',
            $traslado->responsable_recibe ?? '-',
            $traslado->observaciones ?? '',
        ];
    }

    public function styles(Worksheet $sheet): array
    {
        $styles = [];

        // Estilo para título de Cómputo (fila 1)
        $styles[1] = [
            'font' => ['bold' => true, 'size' => 14, 'color' => ['rgb' => 'FFFFFF']],
            'fill' => [
                'fillType' => \PhpOffice\PhpSpreadsheet\Style\Fill::FILL_SOLID,
                'startColor' => ['rgb' => '2563EB'], // Azul para cómputo
            ],
        ];

        // Estilo para encabezado de Cómputo (fila 2)
        $styles[2] = [
            'font' => ['bold' => true, 'color' => ['rgb' => 'FFFFFF']],
            'fill' => [
                'fillType' => \PhpOffice\PhpSpreadsheet\Style\Fill::FILL_SOLID,
                'startColor' => ['rgb' => '3B82F6'], // Azul claro
            ],
        ];

        // Calcular fila del título de Topografía
        // Título (1) + Encabezado (1) + Datos computo + 2 vacías + 1
        $topografiaTitleRow = 2 + $this->computoCount + 3;

        // Estilo para título de Topografía
        $styles[$topografiaTitleRow] = [
            'font' => ['bold' => true, 'size' => 14, 'color' => ['rgb' => 'FFFFFF']],
            'fill' => [
                'fillType' => \PhpOffice\PhpSpreadsheet\Style\Fill::FILL_SOLID,
                'startColor' => ['rgb' => '059669'], // Verde para topografía
            ],
        ];

        // Estilo para encabezado de Topografía
        $styles[$topografiaTitleRow + 1] = [
            'font' => ['bold' => true, 'color' => ['rgb' => 'FFFFFF']],
            'fill' => [
                'fillType' => \PhpOffice\PhpSpreadsheet\Style\Fill::FILL_SOLID,
                'startColor' => ['rgb' => '10B981'], // Verde claro
            ],
        ];

        return $styles;
    }
}
