<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <title>Listado de Equipos</title>
    <style>
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
        .estado-operativo { background: #D1FAE5; color: #065F46; }
        .estado-mantenimiento { background: #FEF3C7; color: #92400E; }
        .estado-baja { background: #FEE2E2; color: #991B1B; }
        .estado-prestamo { background: #DBEAFE; color: #1E40AF; }
        .footer {
            text-align: center;
            font-size: 8px;
            color: #999;
            margin-top: 20px;
            border-top: 1px solid #ddd;
            padding-top: 10px;
        }
        .page-break {
            page-break-after: always;
        }
    </style>
</head>
<body>
    <div class="header">
        <h1>🏗️ Sistema de Control de Activos - Constructora</h1>
        <p class="subtitle">Listado de Equipos</p>
    </div>

    <div class="meta">
        <strong>Fecha de generación:</strong> {{ $fecha }} |
        <strong>Total de registros:</strong> {{ $equipos->count() }}
    </div>

    @if(!empty(array_filter($filters)))
    <div class="filters">
        <strong>Filtros aplicados:</strong>
        @if(!empty($filters['tipo']))
            Tipo: {{ $filters['tipo'] == 'computo' ? 'Cómputo' : 'Topografía' }} |
        @endif
        @if(!empty($filters['subtipo']))
            Subtipo: {{ ucfirst($filters['subtipo']) }} |
        @endif
        @if(!empty($filters['estado']))
            Estado: {{ ucfirst($filters['estado']) }} |
        @endif
        @if(!empty($filters['search']))
            Búsqueda: "{{ $filters['search'] }}"
        @endif
    </div>
    @endif

    <table>
        <thead>
            <tr>
                <th>Código</th>
                <th>Tipo</th>
                <th>Subtipo</th>
                <th>Marca</th>
                <th>Modelo</th>
                <th>Serie</th>
                <th>Estado</th>
                <th>Sede</th>
                <th>Responsable</th>
                <th>Valor</th>
            </tr>
        </thead>
        <tbody>
            @forelse($equipos as $equipo)
            <tr>
                <td><strong>{{ $equipo->codigo_interno }}</strong></td>
                <td>{{ $equipo->tipo == 'computo' ? 'Cómputo' : 'Topografía' }}</td>
                <td>{{ ucfirst($equipo->subtipo) }}</td>
                <td>{{ $equipo->marca }}</td>
                <td>{{ $equipo->modelo }}</td>
                <td>{{ $equipo->serie }}</td>
                <td>
                    <span class="estado estado-{{ $equipo->estado }}">
                        {{ ucfirst($equipo->estado) }}
                    </span>
                </td>
                <td>{{ $equipo->sede->nombre ?? 'N/A' }}</td>
                <td>{{ $equipo->responsable_actual ?? 'Sin asignar' }}</td>
                <td>{{ $equipo->valor_compra ? '$' . number_format($equipo->valor_compra, 2) : 'N/A' }}</td>
            </tr>
            @empty
            <tr>
                <td colspan="10" style="text-align: center; padding: 20px;">
                    No se encontraron equipos con los filtros aplicados.
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
