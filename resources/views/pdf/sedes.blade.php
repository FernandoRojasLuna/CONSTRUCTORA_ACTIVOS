<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <title>Listado de Sedes</title>
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
            font-size: 11px;
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
            font-size: 12px;
        }
        .meta {
            margin-bottom: 15px;
            font-size: 10px;
            color: #666;
        }
        .filters {
            background: #FEF3C7;
            padding: 8px;
            margin-bottom: 15px;
            border-radius: 4px;
            font-size: 10px;
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
            padding: 10px 8px;
            text-align: left;
            font-size: 10px;
            font-weight: bold;
        }
        td {
            padding: 8px;
            border-bottom: 1px solid #ddd;
            font-size: 10px;
        }
        tr:nth-child(even) {
            background-color: #f9f9f9;
        }
        .tipo {
            padding: 2px 8px;
            border-radius: 3px;
            font-size: 9px;
            font-weight: bold;
        }
        .tipo-oficina { background: #DBEAFE; color: #1E40AF; }
        .tipo-proyecto { background: #D1FAE5; color: #065F46; }
        .tipo-almacen { background: #FEF3C7; color: #92400E; }
        .badge-count {
            background: #D97706;
            color: white;
            padding: 2px 8px;
            border-radius: 10px;
            font-size: 10px;
            font-weight: bold;
        }
        .footer {
            text-align: center;
            font-size: 9px;
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
        <p class="subtitle">Listado de Sedes</p>
    </div>

    <div class="meta">
        <strong>Fecha de generación:</strong> {{ $fecha }} |
        <strong>Total de sedes:</strong> {{ $sedes->count() }}
    </div>

    @if(!empty(array_filter($filters)))
    <div class="filters">
        <strong>Filtros aplicados:</strong>
        @if(!empty($filters['tipo']))
            Tipo: {{ ucfirst($filters['tipo']) }} |
        @endif
        @if(!empty($filters['search']))
            Búsqueda: "{{ $filters['search'] }}"
        @endif
    </div>
    @endif

    <table>
        <thead>
            <tr>
                <th>Nombre</th>
                <th>Tipo</th>
                <th>Ciudad</th>
                <th>Dirección</th>
                <th>Encargado</th>
                <th>Teléfono</th>
                <th>Email</th>
                <th>Equipos</th>
                <th>Estado</th>
            </tr>
        </thead>
        <tbody>
            @forelse($sedes as $sede)
            <tr>
                <td><strong>{{ $sede->nombre }}</strong></td>
                <td>
                    <span class="tipo tipo-{{ $sede->tipo }}">
                        {{ ucfirst($sede->tipo) }}
                    </span>
                </td>
                <td>{{ $sede->ciudad }}</td>
                <td>{{ $sede->direccion ?? 'N/A' }}</td>
                <td>{{ $sede->encargado ?? 'Sin asignar' }}</td>
                <td>{{ $sede->telefono ?? 'N/A' }}</td>
                <td>{{ $sede->email ?? 'N/A' }}</td>
                <td style="text-align: center;">
                    <span class="badge-count">{{ $sede->equipos_count }}</span>
                </td>
                <td>{{ $sede->activo ? 'Activa' : 'Inactiva' }}</td>
            </tr>
            @empty
            <tr>
                <td colspan="9" style="text-align: center; padding: 20px;">
                    No se encontraron sedes con los filtros aplicados.
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
