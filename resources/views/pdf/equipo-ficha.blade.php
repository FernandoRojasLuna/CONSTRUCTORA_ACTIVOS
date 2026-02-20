<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <title>Ficha Técnica - {{ $equipo->codigo_interno }}</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        body {
            font-family: 'DejaVu Sans', sans-serif;
            font-size: 11px;
            color: #333;
            padding: 20px;
        }
        .header {
            text-align: center;
            margin-bottom: 25px;
            border-bottom: 3px solid #D97706;
            padding-bottom: 15px;
        }
        .header h1 {
            color: #D97706;
            font-size: 22px;
            margin-bottom: 5px;
        }
        .header .subtitle {
            color: #666;
            font-size: 14px;
        }
        .codigo-box {
            background: #D97706;
            color: white;
            padding: 12px 20px;
            text-align: center;
            margin-bottom: 20px;
            border-radius: 8px;
        }
        .codigo-box .codigo {
            font-size: 24px;
            font-weight: bold;
        }
        .codigo-box .serie {
            font-size: 11px;
            margin-top: 4px;
        }
        .section {
            margin-bottom: 20px;
        }
        .section-title {
            background: #FEF3C7;
            color: #92400E;
            padding: 8px 12px;
            font-size: 12px;
            font-weight: bold;
            margin-bottom: 10px;
            border-left: 4px solid #D97706;
        }
        .grid {
            display: table;
            width: 100%;
        }
        .grid-row {
            display: table-row;
        }
        .grid-cell {
            display: table-cell;
            padding: 6px 10px;
            border-bottom: 1px solid #eee;
        }
        .grid-cell.label {
            width: 35%;
            font-weight: bold;
            color: #666;
            background: #f9f9f9;
        }
        .grid-cell.value {
            color: #333;
        }
        .estado-badge {
            display: inline-block;
            padding: 4px 12px;
            border-radius: 4px;
            font-size: 10px;
            font-weight: bold;
        }
        .estado-operativo { background: #D1FAE5; color: #065F46; }
        .estado-mantenimiento { background: #FEF3C7; color: #92400E; }
        .estado-baja { background: #FEE2E2; color: #991B1B; }
        .estado-prestamo { background: #DBEAFE; color: #1E40AF; }
        .tipo-badge {
            display: inline-block;
            padding: 3px 10px;
            border-radius: 4px;
            font-size: 10px;
            font-weight: bold;
        }
        .tipo-computo { background: #DBEAFE; color: #1E40AF; }
        .tipo-topografia { background: #D1FAE5; color: #065F46; }
        table.historial {
            width: 100%;
            border-collapse: collapse;
            font-size: 10px;
        }
        table.historial th {
            background: #D97706;
            color: white;
            padding: 8px;
            text-align: left;
        }
        table.historial td {
            padding: 6px 8px;
            border-bottom: 1px solid #ddd;
        }
        table.historial tr:nth-child(even) {
            background: #f9f9f9;
        }
        .footer {
            text-align: center;
            font-size: 9px;
            color: #999;
            margin-top: 30px;
            border-top: 1px solid #ddd;
            padding-top: 15px;
        }
        .qr-placeholder {
            border: 2px dashed #ddd;
            width: 80px;
            height: 80px;
            margin: 0 auto;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 9px;
            color: #999;
        }
        .two-columns {
            display: table;
            width: 100%;
        }
        .column {
            display: table-cell;
            width: 50%;
            vertical-align: top;
            padding-right: 15px;
        }
        .column:last-child {
            padding-right: 0;
            padding-left: 15px;
        }
    </style>
</head>
<body>
    <div class="header">
        <h1>🏗️ FICHA TÉCNICA DE EQUIPO</h1>
        <p class="subtitle">Sistema de Control de Activos - Constructora</p>
    </div>

    <div class="codigo-box">
        <div class="codigo">{{ $equipo->codigo_interno }}</div>
        <div class="serie">S/N: {{ $equipo->serie }}</div>
    </div>

    <div class="two-columns">
        <div class="column">
            <!-- Información General -->
            <div class="section">
                <div class="section-title">📋 Información General</div>
                <div class="grid">
                    <div class="grid-row">
                        <div class="grid-cell label">Tipo</div>
                        <div class="grid-cell value">
                            <span class="tipo-badge tipo-{{ $equipo->tipo }}">
                                {{ $equipo->tipo == 'computo' ? 'CÓMPUTO' : 'TOPOGRAFÍA' }}
                            </span>
                        </div>
                    </div>
                    <div class="grid-row">
                        <div class="grid-cell label">Subtipo</div>
                        <div class="grid-cell value">{{ ucfirst($equipo->subtipo) }}</div>
                    </div>
                    <div class="grid-row">
                        <div class="grid-cell label">Marca</div>
                        <div class="grid-cell value">{{ $equipo->marca }}</div>
                    </div>
                    <div class="grid-row">
                        <div class="grid-cell label">Modelo</div>
                        <div class="grid-cell value">{{ $equipo->modelo }}</div>
                    </div>
                    <div class="grid-row">
                        <div class="grid-cell label">Estado</div>
                        <div class="grid-cell value">
                            <span class="estado-badge estado-{{ $equipo->estado }}">
                                {{ strtoupper($equipo->estado) }}
                            </span>
                        </div>
                    </div>
                    <div class="grid-row">
                        <div class="grid-cell label">F. Adquisición</div>
                        <div class="grid-cell value">{{ $equipo->fecha_adquisicion?->format('d/m/Y') ?? 'N/A' }}</div>
                    </div>
                    <div class="grid-row">
                        <div class="grid-cell label">Valor Compra</div>
                        <div class="grid-cell value">{{ $equipo->valor_compra ? '$' . number_format($equipo->valor_compra, 2) : 'N/A' }}</div>
                    </div>
                </div>
            </div>
        </div>

        <div class="column">
            <!-- Ubicación y Responsable -->
            <div class="section">
                <div class="section-title">📍 Ubicación Actual</div>
                <div class="grid">
                    <div class="grid-row">
                        <div class="grid-cell label">Sede</div>
                        <div class="grid-cell value">{{ $equipo->sede->nombre ?? 'N/A' }}</div>
                    </div>
                    <div class="grid-row">
                        <div class="grid-cell label">Ciudad</div>
                        <div class="grid-cell value">{{ $equipo->sede->ciudad ?? 'N/A' }}</div>
                    </div>
                    <div class="grid-row">
                        <div class="grid-cell label">Responsable</div>
                        <div class="grid-cell value">{{ $equipo->responsable_actual ?? 'Sin asignar' }}</div>
                    </div>
                </div>
            </div>

            <!-- QR Code placeholder -->
            <div style="text-align: center; margin-top: 15px;">
                <div class="qr-placeholder">
                    QR Code
                </div>
                <p style="font-size: 8px; color: #999; margin-top: 5px;">{{ $equipo->codigo_interno }}</p>
            </div>
        </div>
    </div>

    <!-- Especificaciones Técnicas -->
    @if($equipo->especificaciones && count((array)$equipo->especificaciones) > 0)
    <div class="section">
        <div class="section-title">⚙️ Especificaciones Técnicas</div>
        <div class="grid">
            @foreach($equipo->especificaciones as $key => $value)
                @if($value)
                <div class="grid-row">
                    <div class="grid-cell label">{{ ucfirst(str_replace('_', ' ', $key)) }}</div>
                    <div class="grid-cell value">
                        @if(is_array($value))
                            {{ implode(', ', $value) }}
                        @else
                            {{ $value }}
                        @endif
                    </div>
                </div>
                @endif
            @endforeach
        </div>
    </div>
    @endif

    <!-- Historial de Traslados -->
    @if($equipo->traslados && $equipo->traslados->count() > 0)
    <div class="section">
        <div class="section-title">🚚 Últimos Traslados</div>
        <table class="historial">
            <thead>
                <tr>
                    <th>Fecha</th>
                    <th>Desde</th>
                    <th>Hacia</th>
                    <th>Motivo</th>
                </tr>
            </thead>
            <tbody>
                @foreach($equipo->traslados->take(5) as $traslado)
                <tr>
                    <td>{{ $traslado->fecha_traslado?->format('d/m/Y') }}</td>
                    <td>{{ $traslado->sedeOrigen->nombre ?? 'N/A' }}</td>
                    <td>{{ $traslado->sedeDestino->nombre ?? 'N/A' }}</td>
                    <td>{{ Str::limit($traslado->motivo, 30) }}</td>
                </tr>
                @endforeach
            </tbody>
        </table>
    </div>
    @endif

    <!-- Historial de Mantenimientos -->
    @if($equipo->mantenimientos && $equipo->mantenimientos->count() > 0)
    <div class="section">
        <div class="section-title">🔧 Últimos Mantenimientos</div>
        <table class="historial">
            <thead>
                <tr>
                    <th>Fecha</th>
                    <th>Tipo</th>
                    <th>Descripción</th>
                    <th>Estado</th>
                    <th>Costo</th>
                </tr>
            </thead>
            <tbody>
                @foreach($equipo->mantenimientos->take(5) as $mant)
                <tr>
                    <td>{{ $mant->fecha_inicio?->format('d/m/Y') }}</td>
                    <td>{{ ucfirst($mant->tipo) }}</td>
                    <td>{{ Str::limit($mant->descripcion, 25) }}</td>
                    <td>{{ ucfirst(str_replace('_', ' ', $mant->estado)) }}</td>
                    <td>{{ $mant->costo ? '$' . number_format($mant->costo, 2) : '-' }}</td>
                </tr>
                @endforeach
            </tbody>
        </table>
    </div>
    @endif

    <!-- Observaciones -->
    @if($equipo->observaciones)
    <div class="section">
        <div class="section-title">📝 Observaciones</div>
        <p style="padding: 10px; background: #f9f9f9; border-radius: 4px;">{{ $equipo->observaciones }}</p>
    </div>
    @endif

    <div class="footer">
        <p><strong>Fecha de impresión:</strong> {{ $fecha }}</p>
        <p>Sistema de Control de Activos - Constructora | Documento generado automáticamente</p>
        <p style="margin-top: 5px;">Este documento es una ficha técnica del equipo y forma parte del inventario de activos.</p>
    </div>
</body>
</html>
