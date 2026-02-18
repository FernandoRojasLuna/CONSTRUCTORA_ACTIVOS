import { Head, Link, router } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import { Button, Card, Badge, Table } from '@/Components/UI';
import {
    ArrowLeftIcon,
    WrenchScrewdriverIcon,
    ComputerDesktopIcon,
    MapPinIcon,
    CalendarIcon,
    CurrencyDollarIcon,
    UserIcon,
    DocumentTextIcon,
    PencilSquareIcon,
    TrashIcon,
    CheckCircleIcon,
    ClockIcon,
    PrinterIcon,
} from '@heroicons/react/24/outline';
import { useState } from 'react';

export default function MantenimientosShow({ mantenimiento }) {
    const [confirmDelete, setConfirmDelete] = useState(false);

    const estadoColors = {
        pendiente: 'warning',
        en_proceso: 'info',
        completado: 'success',
        cancelado: 'danger',
    };

    const estadoLabels = {
        pendiente: 'Pendiente',
        en_proceso: 'En Proceso',
        completado: 'Completado',
        cancelado: 'Cancelado',
    };

    const tipoLabels = {
        preventivo: 'Mantenimiento Preventivo',
        correctivo: 'Mantenimiento Correctivo',
        calibracion: 'Calibración',
    };

    const tipoColors = {
        preventivo: 'info',
        correctivo: 'warning',
        calibracion: 'primary',
    };

    const handleDelete = () => {
        router.delete(route('mantenimientos.destroy', mantenimiento.id));
    };

    const handleMarkComplete = () => {
        router.put(route('mantenimientos.update', mantenimiento.id), {
            ...mantenimiento,
            estado: 'completado',
            fecha_fin: new Date().toISOString().split('T')[0],
        });
    };

    return (
        <AppLayout>
            <Head title={`Mantenimiento #${mantenimiento.id}`} />

            {/* Header */}
            <div className="mb-6">
                <Link
                    href={route('mantenimientos.index')}
                    className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700 mb-4"
                >
                    <ArrowLeftIcon className="h-4 w-4" />
                    Volver a mantenimientos
                </Link>
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                    <div className="flex items-center gap-4">
                        <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-purple-100">
                            <WrenchScrewdriverIcon className="h-7 w-7 text-purple-600" />
                        </div>
                        <div>
                            <div className="flex items-center gap-3 flex-wrap">
                                <h1 className="text-2xl font-bold text-gray-900">
                                    Mantenimiento #{mantenimiento.id.toString().padStart(4, '0')}
                                </h1>
                                <Badge variant={estadoColors[mantenimiento.estado]} size="lg">
                                    {estadoLabels[mantenimiento.estado]}
                                </Badge>
                            </div>
                            <div className="flex items-center gap-2 mt-1">
                                <Badge variant={tipoColors[mantenimiento.tipo]}>
                                    {tipoLabels[mantenimiento.tipo]}
                                </Badge>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {mantenimiento.estado !== 'completado' && (
                            <Button variant="secondary" onClick={handleMarkComplete}>
                                <CheckCircleIcon className="h-5 w-5" />
                                Marcar Completado
                            </Button>
                        )}
                        <Button variant="secondary" onClick={() => window.print()}>
                            <PrinterIcon className="h-5 w-5" />
                            Imprimir
                        </Button>
                        <Button href={route('mantenimientos.edit', mantenimiento.id)}>
                            <PencilSquareIcon className="h-5 w-5" />
                            Editar
                        </Button>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                {/* Main Content */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Equipo */}
                    <Card>
                        <Card.Header>
                            <Card.Title>Equipo en Mantenimiento</Card.Title>
                        </Card.Header>
                        <Card.Body>
                            <div className="flex items-start gap-4">
                                <div
                                    className={`flex h-16 w-16 items-center justify-center rounded-xl shrink-0 ${
                                        mantenimiento.equipo?.tipo === 'computo'
                                            ? 'bg-blue-100'
                                            : 'bg-green-100'
                                    }`}
                                >
                                    {mantenimiento.equipo?.tipo === 'computo' ? (
                                        <ComputerDesktopIcon className="h-8 w-8 text-blue-600" />
                                    ) : (
                                        <MapPinIcon className="h-8 w-8 text-green-600" />
                                    )}
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-xl font-bold text-gray-900">
                                        {mantenimiento.equipo?.codigo_interno}
                                    </h3>
                                    <p className="text-lg text-gray-600">
                                        {mantenimiento.equipo?.marca} {mantenimiento.equipo?.modelo}
                                    </p>
                                    <p className="text-sm text-gray-400 mt-1">
                                        Serie: {mantenimiento.equipo?.serie}
                                    </p>
                                    <p className="text-sm text-gray-500 mt-1">
                                        Ubicación: {mantenimiento.equipo?.sede?.nombre}
                                    </p>
                                </div>
                                <Button
                                    variant="secondary"
                                    size="sm"
                                    href={route('equipos.show', mantenimiento.equipo_id)}
                                >
                                    Ver Equipo
                                </Button>
                            </div>
                        </Card.Body>
                    </Card>

                    {/* Descripción */}
                    <Card>
                        <Card.Header>
                            <Card.Title>Descripción del Trabajo</Card.Title>
                        </Card.Header>
                        <Card.Body>
                            <div className="flex items-start gap-3">
                                <DocumentTextIcon className="h-5 w-5 text-gray-400 shrink-0 mt-0.5" />
                                <p className="text-gray-700 whitespace-pre-wrap">
                                    {mantenimiento.descripcion}
                                </p>
                            </div>
                        </Card.Body>
                    </Card>

                    {/* Observaciones */}
                    {mantenimiento.observaciones && (
                        <Card>
                            <Card.Header>
                                <Card.Title>Observaciones</Card.Title>
                            </Card.Header>
                            <Card.Body>
                                <p className="text-gray-600 whitespace-pre-wrap">
                                    {mantenimiento.observaciones}
                                </p>
                            </Card.Body>
                        </Card>
                    )}

                    {/* Timeline / Progress */}
                    <Card>
                        <Card.Header>
                            <Card.Title>Progreso</Card.Title>
                        </Card.Header>
                        <Card.Body>
                            <div className="flex items-center gap-4">
                                {/* Step 1: Pendiente */}
                                <div className="flex flex-col items-center">
                                    <div
                                        className={`flex h-10 w-10 items-center justify-center rounded-full ${
                                            mantenimiento.estado !== 'cancelado'
                                                ? 'bg-green-500'
                                                : 'bg-gray-200'
                                        }`}
                                    >
                                        <CheckCircleIcon className="h-5 w-5 text-white" />
                                    </div>
                                    <p className="text-xs text-gray-500 mt-2">Registrado</p>
                                </div>

                                {/* Line */}
                                <div
                                    className={`flex-1 h-1 ${
                                        ['en_proceso', 'completado'].includes(mantenimiento.estado)
                                            ? 'bg-green-500'
                                            : 'bg-gray-200'
                                    }`}
                                />

                                {/* Step 2: En Proceso */}
                                <div className="flex flex-col items-center">
                                    <div
                                        className={`flex h-10 w-10 items-center justify-center rounded-full ${
                                            ['en_proceso', 'completado'].includes(mantenimiento.estado)
                                                ? 'bg-green-500'
                                                : 'bg-gray-200'
                                        }`}
                                    >
                                        <ClockIcon className="h-5 w-5 text-white" />
                                    </div>
                                    <p className="text-xs text-gray-500 mt-2">En Proceso</p>
                                </div>

                                {/* Line */}
                                <div
                                    className={`flex-1 h-1 ${
                                        mantenimiento.estado === 'completado'
                                            ? 'bg-green-500'
                                            : 'bg-gray-200'
                                    }`}
                                />

                                {/* Step 3: Completado */}
                                <div className="flex flex-col items-center">
                                    <div
                                        className={`flex h-10 w-10 items-center justify-center rounded-full ${
                                            mantenimiento.estado === 'completado'
                                                ? 'bg-green-500'
                                                : 'bg-gray-200'
                                        }`}
                                    >
                                        <CheckCircleIcon className="h-5 w-5 text-white" />
                                    </div>
                                    <p className="text-xs text-gray-500 mt-2">Completado</p>
                                </div>
                            </div>
                        </Card.Body>
                    </Card>
                </div>

                {/* Sidebar */}
                <div className="lg:col-span-1 space-y-6">
                    {/* Info */}
                    <Card>
                        <Card.Header>
                            <Card.Title>Información</Card.Title>
                        </Card.Header>
                        <Card.Body>
                            <dl className="space-y-4">
                                <div className="flex items-center gap-3">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100">
                                        <CalendarIcon className="h-5 w-5 text-gray-500" />
                                    </div>
                                    <div>
                                        <dt className="text-xs font-medium text-gray-500">
                                            Fecha de Inicio
                                        </dt>
                                        <dd className="text-sm font-medium text-gray-900">
                                            {new Date(mantenimiento.fecha_inicio).toLocaleDateString(
                                                'es-PE',
                                                {
                                                    day: '2-digit',
                                                    month: 'long',
                                                    year: 'numeric',
                                                }
                                            )}
                                        </dd>
                                    </div>
                                </div>

                                {mantenimiento.fecha_fin && (
                                    <div className="flex items-center gap-3">
                                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100">
                                            <CheckCircleIcon className="h-5 w-5 text-green-500" />
                                        </div>
                                        <div>
                                            <dt className="text-xs font-medium text-gray-500">
                                                Fecha de Fin
                                            </dt>
                                            <dd className="text-sm font-medium text-gray-900">
                                                {new Date(mantenimiento.fecha_fin).toLocaleDateString(
                                                    'es-PE',
                                                    {
                                                        day: '2-digit',
                                                        month: 'long',
                                                        year: 'numeric',
                                                    }
                                                )}
                                            </dd>
                                        </div>
                                    </div>
                                )}

                                {mantenimiento.costo && (
                                    <div className="flex items-center gap-3">
                                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-100">
                                            <CurrencyDollarIcon className="h-5 w-5 text-amber-500" />
                                        </div>
                                        <div>
                                            <dt className="text-xs font-medium text-gray-500">Costo</dt>
                                            <dd className="text-sm font-bold text-gray-900">
                                                S/ {parseFloat(mantenimiento.costo).toLocaleString('es-PE')}
                                            </dd>
                                        </div>
                                    </div>
                                )}

                                {mantenimiento.usuario && (
                                    <div className="flex items-center gap-3">
                                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100">
                                            <UserIcon className="h-5 w-5 text-gray-500" />
                                        </div>
                                        <div>
                                            <dt className="text-xs font-medium text-gray-500">
                                                Registrado por
                                            </dt>
                                            <dd className="text-sm font-medium text-gray-900">
                                                {mantenimiento.usuario.name}
                                            </dd>
                                        </div>
                                    </div>
                                )}
                            </dl>
                        </Card.Body>
                    </Card>

                    {/* Proveedor */}
                    {mantenimiento.proveedor && (
                        <Card>
                            <Card.Header>
                                <Card.Title>Proveedor / Técnico</Card.Title>
                            </Card.Header>
                            <Card.Body>
                                <p className="font-medium text-gray-900">{mantenimiento.proveedor}</p>
                            </Card.Body>
                        </Card>
                    )}

                    {/* Danger Zone */}
                    <Card className="border-red-200">
                        <Card.Header>
                            <Card.Title className="text-red-600">Zona de Peligro</Card.Title>
                        </Card.Header>
                        <Card.Body>
                            {!confirmDelete ? (
                                <Button
                                    variant="danger"
                                    onClick={() => setConfirmDelete(true)}
                                    className="w-full justify-center"
                                >
                                    <TrashIcon className="h-5 w-5" />
                                    Eliminar Mantenimiento
                                </Button>
                            ) : (
                                <div className="space-y-3">
                                    <p className="text-sm text-red-600">
                                        ¿Está seguro? Esta acción no se puede deshacer.
                                    </p>
                                    <div className="flex gap-2">
                                        <Button
                                            variant="secondary"
                                            size="sm"
                                            onClick={() => setConfirmDelete(false)}
                                            className="flex-1"
                                        >
                                            Cancelar
                                        </Button>
                                        <Button
                                            variant="danger"
                                            size="sm"
                                            onClick={handleDelete}
                                            className="flex-1"
                                        >
                                            Confirmar
                                        </Button>
                                    </div>
                                </div>
                            )}
                        </Card.Body>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}
