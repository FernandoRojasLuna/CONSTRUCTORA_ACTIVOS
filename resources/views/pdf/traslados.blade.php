<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <title>Historial de Traslados</title>
    <style>
        /* Configuramos la página sin márgenes físicos para controlar todo por CSS */
        @page {
            margin: 0;
        }
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        body {
            font-family: 'DejaVu Sans', sans-serif;
            font-size: 10px;
            color: #333;
            /* AQUÍ ESTÁ EL TRUCO: Padding para simular los márgenes de la página */
            padding: 20mm 15mm;
        }
        .header {
            text-align: center;
            margin-bottom: 20px;
            border-bottom: 2px solid #D97706;
            padding-bottom: 10px;
        }
        .header h1 {
            color: #D97706;
            font-size: 18px;
            margin-bottom: 5px;
        }
        .header .subtitle {
            color: #666;
            font-size: 11px;
        }
        .meta {
            margin-bottom: 15px;
            font-size: 9px;
            color: #666;
        }
        .filters {
            background: #FEF3C7;
            padding: 8px;
            margin-bottom: 15px;
            border-radius: 4px;
            font-size: 9px;
        }
        .filters strong {
            color: #92400E;
        }
        table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 20px;
            /* Evita que las filas se corten feo entre páginas */
            page-break-inside: auto;
        }
        th {
            background-color: #D97706;
            color: white;
            padding: 8px 5px;
            text-align: left;
            font-size: 9px;
            font-weight: bold;
        }
        td {
            padding: 6px 5px;
            border-bottom: 1px solid #ddd;
            font-size: 8px; /* Reducido ligeramente para que quepan más columnas */
        }
        tr:nth-child(even) {
            background-color: #f9f9f9;
        }
        /* Evita que una fila se divida en dos páginas */
        tr {
            page-break-inside: avoid;
            page-break-after: auto;
        }
        .arrow {
            color: #D97706;
            font-weight: bold;
            text-align: center;
        }
        .footer {
            text-align: center;
            font-size: 8px;
            color: #999;
            margin-top: 20px;
            border-top: 1px solid #ddd;
            padding-top: 10px;
        }
    </style>
</head>
<body>
    <div class="header">
        <h1>🏗️ Sistema de Control de Activos - Constructora</h1>
        <p class="subtitle">Historial de Traslados</p>
    </div>

    <div class="meta">
        <strong>Fecha de generación:</strong> {{ $fecha }} | 
        <strong>Total de traslados:</strong> {{ $traslados->count() }}
    </div>

    @if(!empty(array_filter($filters)))
    <div class="filters">
        <strong>Filtros aplicados:</strong>
        @if(!empty($filters['fecha_desde']))
            Desde: {{ $filters['fecha_desde'] }} |
        @endif
        @if(!empty($filters['fecha_hasta']))
            Hasta: {{ $filters['fecha_hasta'] }}
        @endif
    </div>
    @endif

    <table>
        <thead>
            <tr>
                <th style="width: 10%">Fecha</th>
                <th style="width: 12%">Equipo</th>
                <th style="width: 15%">Marca/Modelo</th>
                <th style="width: 12%">Origen</th>
                <th style="width: 3%"></th>
                <th style="width: 12%">Destino</th>
                <th style="width: 15%">Motivo</th>
                <th style="width: 10%">Resp. Recibe</th>
                <th style="width: 11%">Solicitado Por</th>
            </tr>
        </thead>
        <tbody>
            @forelse($traslados as $traslado)
            <tr>
                <td>{{ $traslado->fecha_traslado?->format('d/m/Y') }}</td>
                <td><strong>{{ $traslado->equipo->codigo_interno ?? 'N/A' }}</strong></td>
                <td>{{ $traslado->equipo->marca ?? '' }} {{ $traslado->equipo->modelo ?? '' }}</td>
                <td>{{ $traslado->sedeOrigen->nombre ?? 'N/A' }}</td>
                <td class="arrow">→</td>
                <td>{{ $traslado->sedeDestino->nombre ?? 'N/A' }}</td>
                <td>{{ \Illuminate\Support\Str::limit($traslado->motivo, 25) }}</td>
                <td>{{ $traslado->responsable_recibe ?? 'N/A' }}</td>
                <td>{{ $traslado->usuario->name ?? 'N/A' }}</td>
            </tr>
            @empty
            <tr>
                <td colspan="9" style="text-align: center; padding: 20px;">
                    No se encontraron traslados con los filtros aplicados.
                </td>
            </tr>
            @endforelse
        </tbody>
    </table>

    <div class="footer">
        Sistema de Control de Activos - Constructora | Documento generado automáticamente
    </div>
</body>
</html>