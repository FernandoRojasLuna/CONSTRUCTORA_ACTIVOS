<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <title>Historial de Traslados</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        body {
            font-family: 'DejaVu Sans', sans-serif;
            font-size: 10px;
            color: #333;
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
            font-size: 9px;
        }
        tr:nth-child(even) {
            background-color: #f9f9f9;
        }
        .arrow {
            color: #D97706;
            font-weight: bold;
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
                <th>Fecha</th>
                <th>Equipo</th>
                <th>Marca/Modelo</th>
                <th>Origen</th>
                <th></th>
                <th>Destino</th>
                <th>Motivo</th>
                <th>Resp. Entrega</th>
                <th>Resp. Recibe</th>
                <th>Solicitado Por</th>
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
                <td>{{ Str::limit($traslado->motivo, 25) }}</td>
                <td>{{ $traslado->responsable_entrega ?? 'N/A' }}</td>
                <td>{{ $traslado->responsable_recibe ?? 'N/A' }}</td>
                <td>{{ $traslado->usuario->name ?? 'N/A' }}</td>
            </tr>
            @empty
            <tr>
                <td colspan="10" style="text-align: center; padding: 20px;">
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
