import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import { Button, Card, Badge } from '@/Components/UI';
import {
    ArrowLeftIcon,
    TruckIcon,
    ComputerDesktopIcon,
    MapPinIcon,
    ArrowRightIcon,
    CalendarIcon,
    UserIcon,
    BuildingOfficeIcon,
    DocumentTextIcon,
    PrinterIcon,
    ClipboardDocumentIcon,
} from '@heroicons/react/24/outline';

export default function TrasladosShow({ traslado }) {
    return (
        <AppLayout>
            <Head title={`Traslado #${traslado.id}`} />

            {/* Header */}
            <div className="mb-6">
                <Link
                    href={route('traslados.index')}
                    className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700 mb-4"
                >
                    <ArrowLeftIcon className="h-4 w-4" />
                    Volver a traslados
                </Link>
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                    <div className="flex items-center gap-4">
                        <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-blue-100">
                            <TruckIcon className="h-7 w-7 text-blue-600" />
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">
                                Traslado #{traslado.id.toString().padStart(4, '0')}
                            </h1>
                            <p className="text-gray-600">
                                {new Date(traslado.fecha_traslado).toLocaleDateString('es-PE', {
                                    weekday: 'long',
                                    day: 'numeric',
                                    month: 'long',
                                    year: 'numeric',
                                })}
                            </p>
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <Button variant="secondary" onClick={() => window.print()}>
                            <PrinterIcon className="h-5 w-5" />
                            Imprimir
                        </Button>
                        <Button
                            variant="secondary"
                            href={route('equipos.show', traslado.equipo_id)}
                        >
                            Ver Equipo
                        </Button>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                {/* Main Content */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Visual de Traslado */}
                    <Card className="bg-gradient-to-r from-gray-50 via-white to-amber-50 border-2 border-amber-200">
                        <div className="flex items-center justify-center gap-6 py-4">
                            {/* Origen */}
                            <div className="text-center">
                                <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-gray-100 mx-auto mb-3">
                                    <BuildingOfficeIcon className="h-10 w-10 text-gray-600" />
                                </div>
                                <p className="text-xs text-gray-500 mb-1">Sede de Origen</p>
                                <p className="font-bold text-gray-900">
                                    {traslado.sede_origen?.nombre}
                                </p>
                                <p className="text-sm text-gray-500">
                                    {traslado.sede_origen?.ciudad}
                                </p>
                            </div>

                            {/* Arrow */}
                            <div className="flex flex-col items-center">
                                <div className="flex items-center gap-2">
                                    <div className="h-0.5 w-12 bg-gradient-to-r from-gray-300 to-amber-500" />
                                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-amber-100 border-4 border-amber-200">
                                        <ArrowRightIcon className="h-6 w-6 text-amber-600" />
                                    </div>
                                    <div className="h-0.5 w-12 bg-gradient-to-r from-amber-500 to-amber-300" />
                                </div>
                                <p className="text-xs text-amber-600 font-medium mt-2">TRASLADO</p>
                            </div>

                            {/* Destino */}
                            <div className="text-center">
                                <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-amber-100 mx-auto mb-3">
                                    <BuildingOfficeIcon className="h-10 w-10 text-amber-600" />
                                </div>
                                <p className="text-xs text-gray-500 mb-1">Sede de Destino</p>
                                <p className="font-bold text-amber-600">
                                    {traslado.sede_destino?.nombre}
                                </p>
                                <p className="text-sm text-gray-500">
                                    {traslado.sede_destino?.ciudad}
                                </p>
                            </div>
                        </div>
                    </Card>

                    {/* Equipo Trasladado */}
                    <Card>
                        <Card.Header>
                            <Card.Title>Equipo Trasladado</Card.Title>
                        </Card.Header>
                        <Card.Body>
                            <div className="flex items-start gap-4">
                                <div
                                    className={`flex h-16 w-16 items-center justify-center rounded-xl shrink-0 ${
                                        traslado.equipo?.tipo === 'computo'
                                            ? 'bg-blue-100'
                                            : 'bg-green-100'
                                    }`}
                                >
                                    {traslado.equipo?.tipo === 'computo' ? (
                                        <ComputerDesktopIcon className="h-8 w-8 text-blue-600" />
                                    ) : (
                                        <MapPinIcon className="h-8 w-8 text-green-600" />
                                    )}
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-center gap-3 flex-wrap">
                                        <h3 className="text-xl font-bold text-gray-900">
                                            {traslado.equipo?.codigo_interno}
                                        </h3>
                                        <Badge
                                            variant={
                                                traslado.equipo?.tipo === 'computo' ? 'info' : 'success'
                                            }
                                        >
                                            {traslado.equipo?.tipo === 'computo'
                                                ? 'Cómputo'
                                                : 'Topografía'}
                                        </Badge>
                                    </div>
                                    <p className="text-lg text-gray-600 mt-1">
                                        {traslado.equipo?.marca} {traslado.equipo?.modelo}
                                    </p>
                                    <p className="text-sm text-gray-400 mt-1">
                                        Serie: {traslado.equipo?.serie}
                                    </p>
                                </div>
                                <Button
                                    variant="secondary"
                                    size="sm"
                                    href={route('equipos.show', traslado.equipo_id)}
                                >
                                    Ver detalles
                                </Button>
                            </div>
                        </Card.Body>
                    </Card>

                    {/* Motivo */}
                    <Card>
                        <Card.Header>
                            <Card.Title>Motivo del Traslado</Card.Title>
                        </Card.Header>
                        <Card.Body>
                            <div className="flex items-start gap-3">
                                <DocumentTextIcon className="h-5 w-5 text-gray-400 shrink-0 mt-0.5" />
                                <p className="text-gray-700">{traslado.motivo}</p>
                            </div>
                            {traslado.observaciones && (
                                <div className="mt-4 pt-4 border-t border-gray-100">
                                    <p className="text-sm font-medium text-gray-500 mb-2">
                                        Observaciones
                                    </p>
                                    <p className="text-gray-600 text-sm">{traslado.observaciones}</p>
                                </div>
                            )}
                        </Card.Body>
                    </Card>
                </div>

                {/* Sidebar */}
                <div className="lg:col-span-1 space-y-6">
                    {/* Info del Registro */}
                    <Card>
                        <Card.Header>
                            <Card.Title>Información del Registro</Card.Title>
                        </Card.Header>
                        <Card.Body>
                            <dl className="space-y-4">
                                <div className="flex items-center gap-3">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100">
                                        <CalendarIcon className="h-5 w-5 text-gray-500" />
                                    </div>
                                    <div>
                                        <dt className="text-xs font-medium text-gray-500">
                                            Fecha del Traslado
                                        </dt>
                                        <dd className="text-sm font-medium text-gray-900">
                                            {new Date(traslado.fecha_traslado).toLocaleDateString(
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
                                <div className="flex items-center gap-3">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100">
                                        <UserIcon className="h-5 w-5 text-gray-500" />
                                    </div>
                                    <div>
                                        <dt className="text-xs font-medium text-gray-500">
                                            Registrado por
                                        </dt>
                                        <dd className="text-sm font-medium text-gray-900">
                                            {traslado.usuario?.name}
                                        </dd>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100">
                                        <ClipboardDocumentIcon className="h-5 w-5 text-gray-500" />
                                    </div>
                                    <div>
                                        <dt className="text-xs font-medium text-gray-500">
                                            N° de Registro
                                        </dt>
                                        <dd className="text-sm font-medium text-gray-900">
                                            TRS-{traslado.id.toString().padStart(4, '0')}
                                        </dd>
                                    </div>
                                </div>
                            </dl>
                        </Card.Body>
                    </Card>

                    {/* Responsables */}
                    <Card>
                        <Card.Header>
                            <Card.Title>Responsables</Card.Title>
                        </Card.Header>
                        <Card.Body>
                            <div className="space-y-4">
                                <div className="p-3 bg-gray-50 rounded-lg">
                                    <p className="text-xs text-gray-500 mb-1">Responsable que Entrega</p>
                                    <p className="font-medium text-gray-900">
                                        {traslado.responsable_entrega || 'No especificado'}
                                    </p>
                                </div>
                                <div className="p-3 bg-amber-50 rounded-lg">
                                    <p className="text-xs text-amber-600 mb-1">Responsable que Recibe</p>
                                    <p className="font-medium text-amber-900">
                                        {traslado.responsable_recibe || 'No especificado'}
                                    </p>
                                </div>
                            </div>
                        </Card.Body>
                    </Card>

                    {/* Acciones Rápidas */}
                    <Card>
                        <Card.Header>
                            <Card.Title>Acciones</Card.Title>
                        </Card.Header>
                        <Card.Body>
                            <div className="space-y-2">
                                <Button
                                    variant="secondary"
                                    href={route('equipos.show', traslado.equipo_id)}
                                    className="w-full justify-center"
                                >
                                    Ver Equipo
                                </Button>
                                <Button
                                    variant="secondary"
                                    href={route('traslados.create', { equipo_id: traslado.equipo_id })}
                                    className="w-full justify-center"
                                >
                                    <TruckIcon className="h-5 w-5" />
                                    Nuevo Traslado
                                </Button>
                            </div>
                        </Card.Body>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}
