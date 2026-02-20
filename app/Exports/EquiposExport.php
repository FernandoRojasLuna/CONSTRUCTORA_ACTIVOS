<?php

namespace App\Exports;

use App\Models\Equipo;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithStyles;
use Maatwebsite\Excel\Concerns\ShouldAutoSize;
use Maatwebsite\Excel\Concerns\WithTitle;
use PhpOffice\PhpSpreadsheet\Worksheet\Worksheet;

class EquiposExport implements FromCollection, WithStyles, ShouldAutoSize, WithTitle
{
    protected $filters;
    protected $computoStartRow = 1;
    protected $topografiaStartRow;
    protected $computoCount = 0;
    protected $topografiaCount = 0;

    public function __construct(array $filters = [])
    {
        $this->filters = $filters;
    }

    public function title(): string
    {
        return 'Inventario de Equipos';
    }

    public function collection()
    {
        // Obtener equipos de cómputo
        $equiposComputo = $this->getEquipos('computo');
        $this->computoCount = $equiposComputo->count();

        // Obtener equipos de topografía
        $equiposTopografia = $this->getEquipos('topografia');
        $this->topografiaCount = $equiposTopografia->count();

        // Calcular dónde empieza la tabla de topografía
        // Título Cómputo (1) + Encabezado (1) + Datos + 2 filas vacías + Título Topografía (1) + Encabezado (1)
        $this->topografiaStartRow = 1 + 1 + $this->computoCount + 3;

        $rows = collect();

        // === SECCIÓN CÓMPUTO ===
        $rows->push(['EQUIPOS DE CÓMPUTO', '', '', '', '', '', '', '', '', '', '', '', '']);
        $rows->push($this->getHeadings());
        foreach ($equiposComputo as $equipo) {
            $rows->push($this->mapEquipo($equipo));
        }

        // Filas vacías de separación
        $rows->push(['']);
        $rows->push(['']);

        // === SECCIÓN TOPOGRAFÍA ===
        $rows->push(['EQUIPOS DE TOPOGRAFÍA', '', '', '', '', '', '', '', '', '', '', '', '']);
        $rows->push($this->getHeadings());
        foreach ($equiposTopografia as $equipo) {
            $rows->push($this->mapEquipo($equipo));
        }

        return $rows;
    }

    protected function getEquipos(string $tipo)
    {
        $query = Equipo::with(['sede', 'traslados' => function ($q) {
            $q->orderBy('fecha_traslado', 'desc')->limit(1);
        }]);

        $query->where('tipo', $tipo);

        if (!empty($this->filters['estado'])) {
            $query->where('estado', $this->filters['estado']);
        }

        if (!empty($this->filters['sede_id'])) {
            $query->where('sede_id', $this->filters['sede_id']);
        }

        return $query->orderBy('codigo_interno')->get();
    }

    protected function getHeadings(): array
    {
        return [
            'Código Interno',
            'Serie',
            'Subtipo',
            'Marca',
            'Modelo',
            'Estado',
            'Sede Actual',
            'Responsable',
            'Fecha Adquisición',
            'Último Traslado',
            'Valor Compra (S/)',
            'Observaciones',
        ];
    }

    protected function mapEquipo($equipo): array
    {
        // Obtener fecha del último traslado
        $ultimoTraslado = $equipo->traslados->first();
        $fechaUltimoTraslado = $ultimoTraslado ? $ultimoTraslado->fecha_traslado->format('d/m/Y') : '';

        return [
            $equipo->codigo_interno,
            $equipo->serie,
            ucfirst(str_replace('_', ' ', $equipo->subtipo)),
            $equipo->marca,
            $equipo->modelo,
            ucfirst($equipo->estado),
            $equipo->sede->nombre ?? 'N/A',
            $equipo->responsable_actual ?? 'N/A',
            $equipo->fecha_adquisicion?->format('d/m/Y') ?? 'N/A',
            $fechaUltimoTraslado,
            $equipo->valor_compra ? number_format($equipo->valor_compra, 2) : 'N/A',
            $equipo->observaciones ?? '',
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
        $topografiaTitleRow = 2 + $this->computoCount + 3; // encabezado + datos + 2 vacías + 1

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
