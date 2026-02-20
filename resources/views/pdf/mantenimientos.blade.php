<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <title>Listado de Mantenimientos</title>
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
        .estado {
            padding: 2px 6px;
            border-radius: 3px;
            font-size: 8px;
            font-weight: bold;
        }
        .estado-pendiente { background: #FEF3C7; color: #92400E; }
        .estado-en_proceso { background: #DBEAFE; color: #1E40AF; }
        .estado-completado { background: #D1FAE5; color: #065F46; }
        .estado-cancelado { background: #FEE2E2; color: #991B1B; }
        .tipo {
            padding: 2px 6px;
            border-radius: 3px;
            font-size: 8px;
            font-weight: bold;
        }
        .tipo-preventivo { background: #DBEAFE; color: #1E40AF; }
        .tipo-correctivo { background: #FEE2E2; color: #991B1B; }
        .tipo-calibracion { background: #E9D5FF; color: #6B21A8; }
        .tipo-actualizacion { background: #D1FAE5; color: #065F46; }
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
        <p class="subtitle">Historial de Mantenimientos</p>
    </div>

    <div class="meta">
        <strong>Fecha de generación:</strong> {{ $fecha }} |
        <strong>Total de registros:</strong> {{ $mantenimientos->count() }}
    </div>

    @if(!empty(array_filter($filters)))
    <div class="filters">
        <strong>Filtros aplicados:</strong>
        @if(!empty($filters['tipo']))
            Tipo: {{ ucfirst($filters['tipo']) }} |
        @endif
        @if(!empty($filters['estado']))
            Estado: {{ ucfirst(str_replace('_', ' ', $filters['estado'])) }} |
        @endif
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
                <th>Equipo</th>
                <th>Sede</th>
                <th>Tipo</th>
                <th>Descripción</th>
                <th>Fecha Inicio</th>
                <th>Fecha Fin</th>
                <th>Proveedor</th>
                <th>Costo</th>
                <th>Estado</th>
                <th>Próxima</th>
            </tr>
        </thead>
        <tbody>
            @forelse($mantenimientos as $mant)
            <tr>
                <td><strong>{{ $mant->equipo->codigo_interno ?? 'N/A' }}</strong></td>
                <td>{{ $mant->equipo->sede->nombre ?? 'N/A' }}</td>
                <td>
                    <span class="tipo tipo-{{ $mant->tipo }}">
                        {{ ucfirst($mant->tipo) }}
                    </span>
                </td>
                <td>{{ Str::limit($mant->descripcion, 30) }}</td>
                <td>{{ $mant->fecha_inicio?->format('d/m/Y') }}</td>
                <td>{{ $mant->fecha_fin?->format('d/m/Y') ?? '-' }}</td>
                <td>{{ $mant->proveedor ?? 'N/A' }}</td>
                <td>{{ $mant->costo ? '$' . number_format($mant->costo, 2) : '-' }}</td>
                <td>
                    <span class="estado estado-{{ $mant->estado }}">
                        {{ ucfirst(str_replace('_', ' ', $mant->estado)) }}
                    </span>
                </td>
                <td>{{ $mant->proxima_fecha?->format('d/m/Y') ?? '-' }}</td>
            </tr>
            @empty
            <tr>
                <td colspan="10" style="text-align: center; padding: 20px;">
                    No se encontraron mantenimientos con los filtros aplicados.
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
