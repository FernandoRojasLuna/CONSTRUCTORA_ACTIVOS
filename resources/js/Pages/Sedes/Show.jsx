import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import { Button, Card, Badge, Table } from '@/Components/UI';
import {
    ArrowLeftIcon,
    PencilSquareIcon,
    BuildingOfficeIcon,
    MapPinIcon,
    PhoneIcon,
    UserIcon,
    ComputerDesktopIcon,
} from '@heroicons/react/24/outline';

export default function SedesShow({ sede }) {
    const tipoLabels = {
        oficina: 'Oficina',
        proyecto: 'Proyecto',
        almacen: 'Almacén',
    };

    const tipoColors = {
        oficina: 'primary',
        proyecto: 'success',
        almacen: 'info',
    };

    const estadoColors = {
        operativo: 'success',
        mantenimiento: 'warning',
        baja: 'danger',
        prestamo: 'info',
    };

    const subtipoLabels = {
        laptop: 'Laptop',
        pc: 'PC Escritorio',
        impresora: 'Impresora',
        estacion_total: 'Estación Total',
        gps: 'GPS',
        nivel: 'Nivel',
    };

    return (
        <AppLayout>
            <Head title={sede.nombre} />

            {/* Header */}
            <div className="mb-6">
                <Link
                    href={route('sedes.index')}
                    className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700 mb-4"
                >
                    <ArrowLeftIcon className="h-4 w-4" />
                    Volver a sedes
                </Link>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div className="flex items-center gap-4">
                        <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-amber-100">
                            <BuildingOfficeIcon className="h-8 w-8 text-amber-600" />
                        </div>
                        <div>
                            <div className="flex items-center gap-3">
                                <h1 className="text-2xl font-bold text-gray-900">{sede.nombre}</h1>
                                <Badge variant={sede.activo ? 'success' : 'danger'}>
                                    {sede.activo ? 'Activa' : 'Inactiva'}
                                </Badge>
                            </div>
                            <div className="flex items-center gap-4 mt-1 text-sm text-gray-500">
                                <span className="flex items-center gap-1">
                                    <MapPinIcon className="h-4 w-4" />
                                    {sede.ciudad}
                                </span>
                                <Badge variant={tipoColors[sede.tipo]}>{tipoLabels[sede.tipo]}</Badge>
                            </div>
                        </div>
                    </div>
                    <Button href={route('sedes.edit', sede.id)}>
                        <PencilSquareIcon className="h-5 w-5" />
                        Editar
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                {/* Info Card */}
                <div className="lg:col-span-1">
                    <Card>
                        <Card.Header>
                            <Card.Title>Información</Card.Title>
                        </Card.Header>
                        <Card.Body>
                            <dl className="space-y-4">
                                {sede.direccion && (
                                    <div>
                                        <dt className="text-sm font-medium text-gray-500">Dirección</dt>
                                        <dd className="mt-1 text-sm text-gray-900">{sede.direccion}</dd>
                                    </div>
                                )}
                                {sede.encargado && (
                                    <div className="flex items-center gap-3">
                                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100">
                                            <UserIcon className="h-5 w-5 text-gray-500" />
                                        </div>
                                        <div>
                                            <dt className="text-xs font-medium text-gray-500">Encargado</dt>
                                            <dd className="text-sm font-medium text-gray-900">{sede.encargado}</dd>
                                        </div>
                                    </div>
                                )}
                                {sede.telefono && (
                                    <div className="flex items-center gap-3">
                                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100">
                                            <PhoneIcon className="h-5 w-5 text-gray-500" />
                                        </div>
                                        <div>
                                            <dt className="text-xs font-medium text-gray-500">Teléfono</dt>
                                            <dd className="text-sm font-medium text-gray-900">{sede.telefono}</dd>
                                        </div>
                                    </div>
                                )}
                            </dl>
                        </Card.Body>
                    </Card>

                    {/* Stats */}
                    <Card className="mt-6">
                        <Card.Header>
                            <Card.Title>Resumen</Card.Title>
                        </Card.Header>
                        <Card.Body>
                            <div className="text-center">
                                <div className="text-4xl font-bold text-amber-600">
                                    {sede.equipos?.length || 0}
                                </div>
                                <p className="text-sm text-gray-500 mt-1">Equipos en esta sede</p>
                            </div>
                        </Card.Body>
                    </Card>
                </div>

                {/* Equipos */}
                <div className="lg:col-span-2">
                    <Card padding={false}>
                        <div className="p-6 border-b border-gray-200">
                            <div className="flex items-center justify-between">
                                <div>
                                    <Card.Title>Equipos Asignados</Card.Title>
                                    <Card.Description>
                                        Activos actualmente en esta ubicación
                                    </Card.Description>
                                </div>
                                <Button
                                    href={route('equipos.create')}
                                    size="sm"
                                >
                                    Agregar Equipo
                                </Button>
                            </div>
                        </div>
                        <Table>
                            <Table.Head>
                                <Table.Row>
                                    <Table.Header>Código</Table.Header>
                                    <Table.Header>Tipo</Table.Header>
                                    <Table.Header>Marca / Modelo</Table.Header>
                                    <Table.Header>Estado</Table.Header>
                                    <Table.Header align="right">Acciones</Table.Header>
                                </Table.Row>
                            </Table.Head>
                            <Table.Body>
                                {sede.equipos?.length > 0 ? (
                                    sede.equipos.map((equipo) => (
                                        <Table.Row key={equipo.id}>
                                            <Table.Cell>
                                                <div className="flex items-center gap-3">
                                                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-100">
                                                        <ComputerDesktopIcon className="h-5 w-5 text-blue-600" />
                                                    </div>
                                                    <div>
                                                        <p className="font-medium text-gray-900">
                                                            {equipo.codigo_interno}
                                                        </p>
                                                        <p className="text-xs text-gray-500">{equipo.serie}</p>
                                                    </div>
                                                </div>
                                            </Table.Cell>
                                            <Table.Cell>
                                                <Badge variant={equipo.tipo === 'computo' ? 'info' : 'success'}>
                                                    {subtipoLabels[equipo.subtipo] || equipo.subtipo}
                                                </Badge>
                                            </Table.Cell>
                                            <Table.Cell>
                                                <p className="font-medium">{equipo.marca}</p>
                                                <p className="text-sm text-gray-500">{equipo.modelo}</p>
                                            </Table.Cell>
                                            <Table.Cell>
                                                <Badge variant={estadoColors[equipo.estado]}>
                                                    {equipo.estado}
                                                </Badge>
                                            </Table.Cell>
                                            <Table.Cell align="right">
                                                <Button
                                                    href={route('equipos.show', equipo.id)}
                                                    variant="ghost"
                                                    size="xs"
                                                >
                                                    Ver
                                                </Button>
                                            </Table.Cell>
                                        </Table.Row>
                                    ))
                                ) : (
                                    <Table.Empty colSpan={5} message="No hay equipos en esta sede" />
                                )}
                            </Table.Body>
                        </Table>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}
