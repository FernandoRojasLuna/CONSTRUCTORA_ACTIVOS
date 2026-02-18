import AppLayout from '@/Layouts/AppLayout';
import { Head, Link } from '@inertiajs/react';
import { StatsCard, Card, Badge, Table } from '@/Components/UI';
import {
    ComputerDesktopIcon,
    BuildingOfficeIcon,
    WrenchScrewdriverIcon,
    CheckCircleIcon,
    ExclamationTriangleIcon,
    XCircleIcon,
    MapPinIcon,
    ArrowRightIcon,
    TruckIcon,
} from '@heroicons/react/24/outline';

export default function Dashboard({
    stats = {},
    equiposPorSede = [],
    ultimosTraslados = [],
    mantenimientosProximos = [],
}) {
    const estadoColors = {
        operativo: 'success',
        mantenimiento: 'warning',
        baja: 'danger',
        prestamo: 'info',
    };

    const estadoLabels = {
        operativo: 'Operativo',
        mantenimiento: 'En Mantenimiento',
        baja: 'Dado de Baja',
        prestamo: 'En Préstamo',
    };

    return (
        <AppLayout>
            <Head title="Dashboard" />

            {/* Header */}
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
                <p className="mt-1 text-sm text-gray-500">
                    Resumen general del sistema de control de activos
                </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-8">
                <StatsCard
                    title="Total Equipos"
                    value={stats.total_equipos || 0}
                    icon={ComputerDesktopIcon}
                    color="amber"
                />
                <StatsCard
                    title="Equipos Operativos"
                    value={stats.equipos_operativos || 0}
                    icon={CheckCircleIcon}
                    color="green"
                />
                <StatsCard
                    title="En Mantenimiento"
                    value={stats.equipos_mantenimiento || 0}
                    icon={WrenchScrewdriverIcon}
                    color="purple"
                />
                <StatsCard
                    title="Sedes Activas"
                    value={stats.total_sedes || 0}
                    icon={BuildingOfficeIcon}
                    color="blue"
                />
            </div>

            {/* Secondary Stats */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 mb-8">
                <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-blue-100 text-sm font-medium">Equipos de Cómputo</p>
                            <p className="text-3xl font-bold mt-1">{stats.equipos_computo || 0}</p>
                        </div>
                        <div className="p-3 bg-white/20 rounded-xl">
                            <ComputerDesktopIcon className="h-8 w-8" />
                        </div>
                    </div>
                    <Link
                        href={route('equipos.index', { tipo: 'computo' })}
                        className="mt-4 inline-flex items-center text-sm text-blue-100 hover:text-white"
                    >
                        Ver equipos <ArrowRightIcon className="ml-1 h-4 w-4" />
                    </Link>
                </Card>

                <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-green-100 text-sm font-medium">Equipos de Topografía</p>
                            <p className="text-3xl font-bold mt-1">{stats.equipos_topografia || 0}</p>
                        </div>
                        <div className="p-3 bg-white/20 rounded-xl">
                            <MapPinIcon className="h-8 w-8" />
                        </div>
                    </div>
                    <Link
                        href={route('equipos.index', { tipo: 'topografia' })}
                        className="mt-4 inline-flex items-center text-sm text-green-100 hover:text-white"
                    >
                        Ver equipos <ArrowRightIcon className="ml-1 h-4 w-4" />
                    </Link>
                </Card>

                <Card className="bg-gradient-to-br from-orange-500 to-orange-600 text-white">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-orange-100 text-sm font-medium">Mant. Pendientes</p>
                            <p className="text-3xl font-bold mt-1">{stats.mantenimientos_pendientes || 0}</p>
                        </div>
                        <div className="p-3 bg-white/20 rounded-xl">
                            <WrenchScrewdriverIcon className="h-8 w-8" />
                        </div>
                    </div>
                    <Link
                        href={route('mantenimientos.index', { estado: 'pendiente' })}
                        className="mt-4 inline-flex items-center text-sm text-orange-100 hover:text-white"
                    >
                        Ver pendientes <ArrowRightIcon className="ml-1 h-4 w-4" />
                    </Link>
                </Card>
            </div>

            {/* Content Grid */}
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                {/* Equipos por Sede */}
                <Card>
                    <Card.Header
                        actions={
                            <Link
                                href={route('sedes.index')}
                                className="text-sm text-amber-600 hover:text-amber-700 font-medium"
                            >
                                Ver todas
                            </Link>
                        }
                    >
                        <Card.Title>Equipos por Sede</Card.Title>
                        <Card.Description>Distribución actual de activos</Card.Description>
                    </Card.Header>
                    <Card.Body>
                        <div className="space-y-4">
                            {equiposPorSede.length > 0 ? (
                                equiposPorSede.map((sede, index) => (
                                    <div key={index} className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-100">
                                                <BuildingOfficeIcon className="h-5 w-5 text-amber-600" />
                                            </div>
                                            <span className="font-medium text-gray-900">{sede.nombre}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <span className="text-2xl font-bold text-gray-900">{sede.cantidad}</span>
                                            <span className="text-sm text-gray-500">equipos</span>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p className="text-center text-gray-500 py-4">No hay sedes registradas</p>
                            )}
                        </div>
                    </Card.Body>
                </Card>

                {/* Últimos Traslados */}
                <Card>
                    <Card.Header
                        actions={
                            <Link
                                href={route('traslados.index')}
                                className="text-sm text-amber-600 hover:text-amber-700 font-medium"
                            >
                                Ver todos
                            </Link>
                        }
                    >
                        <Card.Title>Últimos Traslados</Card.Title>
                        <Card.Description>Movimientos recientes de equipos</Card.Description>
                    </Card.Header>
                    <Card.Body>
                        <div className="space-y-4">
                            {ultimosTraslados.length > 0 ? (
                                ultimosTraslados.map((traslado) => (
                                    <div
                                        key={traslado.id}
                                        className="flex items-start gap-3 p-3 rounded-lg bg-gray-50"
                                    >
                                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100 shrink-0">
                                            <TruckIcon className="h-5 w-5 text-blue-600" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="font-medium text-gray-900 truncate">
                                                {traslado.equipo?.codigo_interno}
                                            </p>
                                            <p className="text-sm text-gray-500">
                                                {traslado.sede_origen?.nombre} → {traslado.sede_destino?.nombre}
                                            </p>
                                            <p className="text-xs text-gray-400 mt-1">
                                                {new Date(traslado.fecha_traslado).toLocaleDateString('es-PE')}
                                            </p>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p className="text-center text-gray-500 py-4">No hay traslados registrados</p>
                            )}
                        </div>
                    </Card.Body>
                </Card>
            </div>

            {/* Mantenimientos Próximos */}
            {mantenimientosProximos.length > 0 && (
                <Card className="mt-6">
                    <Card.Header
                        actions={
                            <Link
                                href={route('mantenimientos.index')}
                                className="text-sm text-amber-600 hover:text-amber-700 font-medium"
                            >
                                Ver todos
                            </Link>
                        }
                    >
                        <Card.Title>Mantenimientos Pendientes</Card.Title>
                        <Card.Description>Servicios técnicos programados</Card.Description>
                    </Card.Header>
                    <Card.Body className="-mx-6 -mb-6">
                        <Table>
                            <Table.Head>
                                <Table.Row>
                                    <Table.Header>Equipo</Table.Header>
                                    <Table.Header>Tipo</Table.Header>
                                    <Table.Header>Descripción</Table.Header>
                                    <Table.Header>Fecha</Table.Header>
                                    <Table.Header>Estado</Table.Header>
                                </Table.Row>
                            </Table.Head>
                            <Table.Body>
                                {mantenimientosProximos.map((mant) => (
                                    <Table.Row key={mant.id}>
                                        <Table.Cell>
                                            <span className="font-medium">{mant.equipo?.codigo_interno}</span>
                                        </Table.Cell>
                                        <Table.Cell>
                                            <Badge variant="primary">{mant.tipo}</Badge>
                                        </Table.Cell>
                                        <Table.Cell>{mant.descripcion}</Table.Cell>
                                        <Table.Cell>
                                            {new Date(mant.fecha_inicio).toLocaleDateString('es-PE')}
                                        </Table.Cell>
                                        <Table.Cell>
                                            <Badge
                                                variant={
                                                    mant.estado === 'pendiente'
                                                        ? 'warning'
                                                        : mant.estado === 'en_proceso'
                                                        ? 'info'
                                                        : 'success'
                                                }
                                            >
                                                {mant.estado}
                                            </Badge>
                                        </Table.Cell>
                                    </Table.Row>
                                ))}
                            </Table.Body>
                        </Table>
                    </Card.Body>
                </Card>
            )}
        </AppLayout>
    );
}
