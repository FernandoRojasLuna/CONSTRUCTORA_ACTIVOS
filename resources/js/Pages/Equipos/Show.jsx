import { useState } from 'react';
import { Head, Link, router, useForm } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import { Button, Card, Badge, Table, Modal, Select, Input, Textarea } from '@/Components/UI';
import DocumentosList from '@/Components/DocumentosList';
import UploadDocumentoModal from '@/Components/UploadDocumentoModal';
import {
    ArrowLeftIcon,
    PencilSquareIcon,
    TruckIcon,
    WrenchScrewdriverIcon,
    DocumentIcon,
    ComputerDesktopIcon,
    MapPinIcon,
    CalendarIcon,
    CurrencyDollarIcon,
    UserIcon,
    ClockIcon,
    ArrowsRightLeftIcon,
    PlusIcon,
    PrinterIcon,
    PhotoIcon,
} from '@heroicons/react/24/outline';

export default function EquiposShow({ equipo, sedes }) {
    const [showTrasladoModal, setShowTrasladoModal] = useState(false);
    const [showDocumentoModal, setShowDocumentoModal] = useState(false);
    const [imagenSeleccionada, setImagenSeleccionada] = useState(null);

    const trasladoForm = useForm({
        equipo_id: equipo.id,
        sede_destino_id: '',
        motivo: '',
        responsable_entrega: '',
        responsable_recibe: '',
        observaciones: '',
    });

    const subtipoLabels = {
        laptop: 'Laptop',
        pc: 'PC Escritorio',
        impresora: 'Impresora',
        estacion_total: 'Estación Total',
        gps: 'GPS',
        nivel: 'Nivel',
    };

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

    const handleTraslado = (e) => {
        e.preventDefault();
        trasladoForm.post(route('traslados.store'), {
            onSuccess: () => {
                setShowTrasladoModal(false);
                trasladoForm.reset();
            },
        });
    };

    const renderEspecificaciones = () => {
        if (!equipo.especificaciones) return null;

        const specs = equipo.especificaciones;
        const items = [];

        // Cómputo
        if (specs.ram) items.push({ label: 'RAM', value: specs.ram });
        if (specs.procesador) items.push({ label: 'Procesador', value: specs.procesador });
        if (specs.disco) items.push({ label: 'Disco', value: specs.disco });
        if (specs.sistema_operativo) items.push({ label: 'Sistema Operativo', value: specs.sistema_operativo });
        if (specs.tipo_insumo) items.push({ label: 'Tipo de Insumo', value: specs.tipo_insumo });
        if (specs.modelo_insumo) items.push({ label: 'Modelo de Insumo', value: specs.modelo_insumo });
        if (specs.conectividad) items.push({ label: 'Conectividad', value: specs.conectividad });

        // Topografía
        if (specs.precision_angular) items.push({ label: 'Precisión Angular', value: specs.precision_angular });
        if (specs.alcance) items.push({ label: 'Alcance', value: specs.alcance });
        if (specs.precision) items.push({ label: 'Precisión', value: specs.precision });
        if (specs.aumento) items.push({ label: 'Aumento', value: specs.aumento });
        if (specs.tipo) items.push({ label: 'Tipo', value: specs.tipo });
        if (specs.accesorios) {
            const accesoriosText = Array.isArray(specs.accesorios)
                ? specs.accesorios.join(', ')
                : specs.accesorios;
            items.push({ label: 'Accesorios', value: accesoriosText });
        }

        if (items.length === 0) return null;

        return (
            <Card>
                <Card.Header>
                    <Card.Title>Especificaciones Técnicas</Card.Title>
                </Card.Header>
                <Card.Body>
                    <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        {items.map((item, index) => (
                            <div key={index} className="border-b border-gray-100 pb-3">
                                <dt className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                                    {item.label}
                                </dt>
                                <dd className="mt-1 text-sm font-medium text-gray-900">{item.value}</dd>
                            </div>
                        ))}
                    </dl>
                </Card.Body>
            </Card>
        );
    };

    return (
        <AppLayout>
            <Head title={`Equipo ${equipo.codigo_interno}`} />

            {/* Header */}
            <div className="mb-6">
                <Link
                    href={route('equipos.index', { tipo: equipo.tipo })}
                    className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700 mb-4"
                >
                    <ArrowLeftIcon className="h-4 w-4" />
                    Volver a equipos
                </Link>
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                    <div className="flex items-start gap-4">
                        <div
                            className={`flex h-16 w-16 items-center justify-center rounded-xl ${
                                equipo.tipo === 'computo' ? 'bg-blue-100' : 'bg-green-100'
                            }`}
                        >
                            {equipo.tipo === 'computo' ? (
                                <ComputerDesktopIcon className="h-8 w-8 text-blue-600" />
                            ) : (
                                <MapPinIcon className="h-8 w-8 text-green-600" />
                            )}
                        </div>
                        <div>
                            <div className="flex items-center gap-3 flex-wrap">
                                <h1 className="text-2xl font-bold text-gray-900">{equipo.codigo_interno}</h1>
                                <Badge variant={estadoColors[equipo.estado]} size="lg">
                                    {estadoLabels[equipo.estado]}
                                </Badge>
                            </div>
                            <p className="text-lg text-gray-600 mt-1">
                                {equipo.marca} {equipo.modelo}
                            </p>
                            <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                                <span>S/N: {equipo.serie}</span>
                                <Badge variant={equipo.tipo === 'computo' ? 'info' : 'success'}>
                                    {subtipoLabels[equipo.subtipo] || equipo.subtipo}
                                </Badge>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        <a
                            href={route('equipos.ficha', equipo.id)}
                            className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg border border-gray-300 font-medium text-sm transition-colors"
                        >
                            <PrinterIcon className="h-5 w-5" />
                            Ficha PDF
                        </a>
                        <Button variant="secondary" onClick={() => setShowTrasladoModal(true)}>
                            <TruckIcon className="h-5 w-5" />
                            Trasladar
                        </Button>
                        <Button
                            variant="secondary"
                            href={route('mantenimientos.create', { equipo_id: equipo.id })}
                        >
                            <WrenchScrewdriverIcon className="h-5 w-5" />
                            Mantenimiento
                        </Button>
                        <Button href={route('equipos.edit', equipo.id)}>
                            <PencilSquareIcon className="h-5 w-5" />
                            Editar
                        </Button>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                {/* Main Content */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Ubicación Actual */}
                    <Card className="bg-gradient-to-br from-amber-50 to-orange-50 border-amber-200">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-100">
                                    <MapPinIcon className="h-6 w-6 text-amber-600" />
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-amber-800">Ubicación Actual</p>
                                    <p className="text-xl font-bold text-amber-900">{equipo.sede?.nombre}</p>
                                    <p className="text-sm text-amber-700">{equipo.sede?.ciudad}</p>
                                </div>
                            </div>
                            <Button
                                variant="primary"
                                size="sm"
                                onClick={() => setShowTrasladoModal(true)}
                            >
                                <ArrowsRightLeftIcon className="h-4 w-4" />
                                Cambiar
                            </Button>
                        </div>
                    </Card>

                    {/* Galería de Imágenes */}
                    {equipo.imagenes && equipo.imagenes.length > 0 && (
                        <Card>
                            <Card.Header>
                                <Card.Title>Imágenes del Equipo</Card.Title>
                            </Card.Header>
                            <Card.Body>
                                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                                    {equipo.imagenes.map((imagen, index) => (
                                        <div
                                            key={index}
                                            className="relative group cursor-pointer"
                                            onClick={() => setImagenSeleccionada(`/storage/${imagen}`)}
                                        >
                                            <img
                                                src={`/storage/${imagen}`}
                                                alt={`${equipo.codigo_interno} - Imagen ${index + 1}`}
                                                className="w-full h-32 object-cover rounded-lg border border-gray-200 hover:border-amber-400 transition-colors"
                                            />
                                            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 rounded-lg transition-all flex items-center justify-center">
                                                <PhotoIcon className="h-8 w-8 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </Card.Body>
                        </Card>
                    )}

                    {/* Especificaciones */}
                    {renderEspecificaciones()}

                    {/* Historial de Traslados */}
                    <Card padding={false}>
                        <div className="p-6 border-b border-gray-200">
                            <Card.Title>Historial de Traslados</Card.Title>
                            <Card.Description>Movimientos del equipo entre sedes</Card.Description>
                        </div>
                        {equipo.traslados?.length > 0 ? (
                            <div className="divide-y divide-gray-100">
                                {equipo.traslados.map((traslado) => (
                                    <div key={traslado.id} className="p-4 hover:bg-gray-50">
                                        <div className="flex items-start gap-4">
                                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 shrink-0">
                                                <TruckIcon className="h-5 w-5 text-blue-600" />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center gap-2">
                                                    <span className="font-medium text-gray-900">
                                                        {traslado.sede_origen?.nombre}
                                                    </span>
                                                    <ArrowsRightLeftIcon className="h-4 w-4 text-gray-400" />
                                                    <span className="font-medium text-amber-600">
                                                        {traslado.sede_destino?.nombre}
                                                    </span>
                                                </div>
                                                <p className="text-sm text-gray-500 mt-1">
                                                    {traslado.motivo}
                                                </p>
                                                <div className="flex items-center gap-4 mt-2 text-xs text-gray-400">
                                                    <span className="flex items-center gap-1">
                                                        <CalendarIcon className="h-3.5 w-3.5" />
                                                        {new Date(traslado.fecha_traslado).toLocaleDateString('es-PE')}
                                                    </span>
                                                    <span className="flex items-center gap-1">
                                                        <UserIcon className="h-3.5 w-3.5" />
                                                        {traslado.usuario?.name}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="p-8 text-center text-gray-500">
                                <TruckIcon className="h-12 w-12 mx-auto text-gray-300 mb-3" />
                                <p>Este equipo no ha sido trasladado</p>
                            </div>
                        )}
                    </Card>

                    {/* Historial de Mantenimientos */}
                    <Card padding={false}>
                        <div className="p-6 border-b border-gray-200 flex items-center justify-between">
                            <div>
                                <Card.Title>Mantenimientos</Card.Title>
                                <Card.Description>Historial de servicios técnicos</Card.Description>
                            </div>
                            <Button
                                href={route('mantenimientos.create', { equipo_id: equipo.id })}
                                size="sm"
                            >
                                Nuevo
                            </Button>
                        </div>
                        {equipo.mantenimientos?.length > 0 ? (
                            <Table>
                                <Table.Head>
                                    <Table.Row>
                                        <Table.Header>Tipo</Table.Header>
                                        <Table.Header>Descripción</Table.Header>
                                        <Table.Header>Fecha</Table.Header>
                                        <Table.Header>Estado</Table.Header>
                                    </Table.Row>
                                </Table.Head>
                                <Table.Body>
                                    {equipo.mantenimientos.map((mant) => (
                                        <Table.Row key={mant.id}>
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
                                                        mant.estado === 'completado'
                                                            ? 'success'
                                                            : mant.estado === 'en_proceso'
                                                            ? 'info'
                                                            : 'warning'
                                                    }
                                                >
                                                    {mant.estado}
                                                </Badge>
                                            </Table.Cell>
                                        </Table.Row>
                                    ))}
                                </Table.Body>
                            </Table>
                        ) : (
                            <div className="p-8 text-center text-gray-500">
                                <WrenchScrewdriverIcon className="h-12 w-12 mx-auto text-gray-300 mb-3" />
                                <p>No hay mantenimientos registrados</p>
                            </div>
                        )}
                    </Card>
                </div>

                {/* Sidebar */}
                <div className="lg:col-span-1 space-y-6">
                    {/* Info Card */}
                    <Card>
                        <Card.Header>
                            <Card.Title>Información General</Card.Title>
                        </Card.Header>
                        <Card.Body>
                            <dl className="space-y-4">
                                {equipo.responsable_actual && (
                                    <div className="flex items-center gap-3">
                                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100">
                                            <UserIcon className="h-5 w-5 text-gray-500" />
                                        </div>
                                        <div>
                                            <dt className="text-xs font-medium text-gray-500">Responsable</dt>
                                            <dd className="text-sm font-medium text-gray-900">
                                                {equipo.responsable_actual}
                                            </dd>
                                        </div>
                                    </div>
                                )}
                                {equipo.fecha_adquisicion && (
                                    <div className="flex items-center gap-3">
                                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100">
                                            <CalendarIcon className="h-5 w-5 text-gray-500" />
                                        </div>
                                        <div>
                                            <dt className="text-xs font-medium text-gray-500">
                                                Fecha de Adquisición
                                            </dt>
                                            <dd className="text-sm font-medium text-gray-900">
                                                {new Date(equipo.fecha_adquisicion).toLocaleDateString('es-PE')}
                                            </dd>
                                        </div>
                                    </div>
                                )}
                                {equipo.valor_compra && (
                                    <div className="flex items-center gap-3">
                                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100">
                                            <CurrencyDollarIcon className="h-5 w-5 text-gray-500" />
                                        </div>
                                        <div>
                                            <dt className="text-xs font-medium text-gray-500">Valor de Compra</dt>
                                            <dd className="text-sm font-medium text-gray-900">
                                                S/ {parseFloat(equipo.valor_compra).toLocaleString('es-PE')}
                                            </dd>
                                        </div>
                                    </div>
                                )}
                            </dl>
                        </Card.Body>
                    </Card>

                    {/* Observaciones */}
                    {equipo.observaciones && (
                        <Card>
                            <Card.Header>
                                <Card.Title>Observaciones</Card.Title>
                            </Card.Header>
                            <Card.Body>
                                <p className="text-sm text-gray-600">{equipo.observaciones}</p>
                            </Card.Body>
                        </Card>
                    )}

                    {/* Documentos */}
                    <Card>
                        <Card.Header
                            actions={
                                <Button
                                    size="sm"
                                    onClick={() => setShowDocumentoModal(true)}
                                >
                                    <PlusIcon className="h-4 w-4" />
                                    Subir
                                </Button>
                            }
                        >
                            <Card.Title>Documentos</Card.Title>
                        </Card.Header>
                        <Card.Body>
                            <DocumentosList
                                documentos={equipo.documentos || []}
                                onUploadClick={() => setShowDocumentoModal(true)}
                            />
                        </Card.Body>
                    </Card>
                </div>
            </div>

            {/* Modal de Upload Documento */}
            <UploadDocumentoModal
                isOpen={showDocumentoModal}
                onClose={() => setShowDocumentoModal(false)}
                equipoId={equipo.id}
            />

            {/* Modal de Traslado */}
            <Modal
                show={showTrasladoModal}
                onClose={() => setShowTrasladoModal(false)}
                title="Trasladar Equipo"
                maxWidth="lg"
            >
                <form onSubmit={handleTraslado}>
                    <div className="space-y-4">
                        <div className="rounded-lg bg-gray-50 p-4">
                            <p className="text-sm text-gray-500">Equipo a trasladar</p>
                            <p className="font-semibold text-gray-900">
                                {equipo.codigo_interno} - {equipo.marca} {equipo.modelo}
                            </p>
                            <p className="text-sm text-gray-500 mt-1">
                                Ubicación actual: <span className="font-medium">{equipo.sede?.nombre}</span>
                            </p>
                        </div>

                        <Select
                            label="Sede de Destino"
                            value={trasladoForm.data.sede_destino_id}
                            onChange={(e) => trasladoForm.setData('sede_destino_id', e.target.value)}
                            error={trasladoForm.errors.sede_destino_id}
                            placeholder="Seleccionar sede..."
                            options={sedes.map((s) => ({ value: s.id.toString(), label: s.nombre }))}
                            required
                        />

                        <Input
                            label="Motivo del Traslado"
                            value={trasladoForm.data.motivo}
                            onChange={(e) => trasladoForm.setData('motivo', e.target.value)}
                            error={trasladoForm.errors.motivo}
                            placeholder="Ej: Asignación a nuevo proyecto..."
                            required
                        />

                        <div className="grid grid-cols-2 gap-4">
                            <Input
                                label="Responsable que Entrega"
                                value={trasladoForm.data.responsable_entrega}
                                onChange={(e) => trasladoForm.setData('responsable_entrega', e.target.value)}
                                placeholder="Nombre..."
                            />
                            <Input
                                label="Responsable que Recibe"
                                value={trasladoForm.data.responsable_recibe}
                                onChange={(e) => trasladoForm.setData('responsable_recibe', e.target.value)}
                                placeholder="Nombre..."
                            />
                        </div>

                        <Textarea
                            label="Observaciones"
                            value={trasladoForm.data.observaciones}
                            onChange={(e) => trasladoForm.setData('observaciones', e.target.value)}
                            placeholder="Notas adicionales..."
                            rows={2}
                        />
                    </div>

                    <Modal.Footer>
                        <Button
                            type="button"
                            variant="secondary"
                            onClick={() => setShowTrasladoModal(false)}
                        >
                            Cancelar
                        </Button>
                        <Button type="submit" disabled={trasladoForm.processing}>
                            {trasladoForm.processing ? 'Procesando...' : 'Confirmar Traslado'}
                        </Button>
                    </Modal.Footer>
                </form>
            </Modal>

            {/* Modal de Imagen Ampliada */}
            {imagenSeleccionada && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80 p-4"
                    onClick={() => setImagenSeleccionada(null)}
                >
                    <div className="relative max-w-4xl max-h-[90vh]">
                        <button
                            onClick={() => setImagenSeleccionada(null)}
                            className="absolute -top-10 right-0 text-white hover:text-gray-300 text-sm flex items-center gap-1"
                        >
                            Cerrar ✕
                        </button>
                        <img
                            src={imagenSeleccionada}
                            alt={`${equipo.codigo_interno}`}
                            className="max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl"
                            onClick={(e) => e.stopPropagation()}
                        />
                    </div>
                </div>
            )}
        </AppLayout>
    );
}
