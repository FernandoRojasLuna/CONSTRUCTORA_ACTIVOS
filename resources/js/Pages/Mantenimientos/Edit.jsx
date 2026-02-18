import { Head, Link, useForm } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import { Button, Card, Input, Select, Textarea, Badge } from '@/Components/UI';
import {
    ArrowLeftIcon,
    WrenchScrewdriverIcon,
    ComputerDesktopIcon,
    MapPinIcon,
} from '@heroicons/react/24/outline';

export default function MantenimientosEdit({ mantenimiento, equipos }) {
    const form = useForm({
        equipo_id: mantenimiento.equipo_id?.toString() || '',
        tipo: mantenimiento.tipo,
        descripcion: mantenimiento.descripcion || '',
        proveedor: mantenimiento.proveedor || '',
        fecha_inicio: mantenimiento.fecha_inicio || '',
        fecha_fin: mantenimiento.fecha_fin || '',
        costo: mantenimiento.costo || '',
        estado: mantenimiento.estado,
        observaciones: mantenimiento.observaciones || '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        form.put(route('mantenimientos.update', mantenimiento.id));
    };

    const estadoColors = {
        pendiente: 'warning',
        en_proceso: 'info',
        completado: 'success',
        cancelado: 'danger',
    };

    return (
        <AppLayout>
            <Head title={`Editar Mantenimiento #${mantenimiento.id}`} />

            {/* Header */}
            <div className="mb-6">
                <Link
                    href={route('mantenimientos.show', mantenimiento.id)}
                    className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700 mb-4"
                >
                    <ArrowLeftIcon className="h-4 w-4" />
                    Volver al detalle
                </Link>
                <div className="flex items-center gap-4">
                    <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-purple-100">
                        <WrenchScrewdriverIcon className="h-7 w-7 text-purple-600" />
                    </div>
                    <div>
                        <div className="flex items-center gap-3">
                            <h1 className="text-2xl font-bold text-gray-900">
                                Editar Mantenimiento #{mantenimiento.id}
                            </h1>
                            <Badge variant={estadoColors[mantenimiento.estado]}>
                                {mantenimiento.estado}
                            </Badge>
                        </div>
                        <p className="text-gray-600">
                            {mantenimiento.equipo?.codigo_interno} -{' '}
                            {mantenimiento.equipo?.marca} {mantenimiento.equipo?.modelo}
                        </p>
                    </div>
                </div>
            </div>

            <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                    {/* Info del Equipo */}
                    <div className="lg:col-span-1">
                        <Card className="sticky top-6">
                            <Card.Header>
                                <Card.Title>Equipo</Card.Title>
                            </Card.Header>
                            <Card.Body>
                                <div className="flex items-center gap-4">
                                    <div
                                        className={`flex h-14 w-14 items-center justify-center rounded-xl shrink-0 ${
                                            mantenimiento.equipo?.tipo === 'computo'
                                                ? 'bg-blue-100'
                                                : 'bg-green-100'
                                        }`}
                                    >
                                        {mantenimiento.equipo?.tipo === 'computo' ? (
                                            <ComputerDesktopIcon className="h-7 w-7 text-blue-600" />
                                        ) : (
                                            <MapPinIcon className="h-7 w-7 text-green-600" />
                                        )}
                                    </div>
                                    <div>
                                        <p className="font-bold text-gray-900">
                                            {mantenimiento.equipo?.codigo_interno}
                                        </p>
                                        <p className="text-sm text-gray-600">
                                            {mantenimiento.equipo?.marca} {mantenimiento.equipo?.modelo}
                                        </p>
                                        <p className="text-xs text-gray-400 mt-1">
                                            S/N: {mantenimiento.equipo?.serie}
                                        </p>
                                    </div>
                                </div>

                                <div className="mt-4 pt-4 border-t border-gray-100">
                                    <Button
                                        variant="secondary"
                                        size="sm"
                                        href={route('equipos.show', mantenimiento.equipo_id)}
                                        className="w-full justify-center"
                                    >
                                        Ver Equipo
                                    </Button>
                                </div>
                            </Card.Body>
                        </Card>
                    </div>

                    {/* Formulario */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Tipo y Estado */}
                        <Card>
                            <Card.Header>
                                <Card.Title>Tipo y Estado</Card.Title>
                            </Card.Header>
                            <Card.Body>
                                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                                    <Select
                                        label="Tipo de Servicio"
                                        value={form.data.tipo}
                                        onChange={(e) => form.setData('tipo', e.target.value)}
                                        error={form.errors.tipo}
                                        options={[
                                            { value: 'preventivo', label: 'Mantenimiento Preventivo' },
                                            { value: 'correctivo', label: 'Mantenimiento Correctivo' },
                                            { value: 'calibracion', label: 'Calibración' },
                                        ]}
                                        required
                                    />
                                    <Select
                                        label="Estado"
                                        value={form.data.estado}
                                        onChange={(e) => form.setData('estado', e.target.value)}
                                        error={form.errors.estado}
                                        options={[
                                            { value: 'pendiente', label: 'Pendiente' },
                                            { value: 'en_proceso', label: 'En Proceso' },
                                            { value: 'completado', label: 'Completado' },
                                            { value: 'cancelado', label: 'Cancelado' },
                                        ]}
                                        required
                                    />
                                </div>
                            </Card.Body>
                        </Card>

                        {/* Descripción */}
                        <Card>
                            <Card.Header>
                                <Card.Title>Detalles del Servicio</Card.Title>
                            </Card.Header>
                            <Card.Body>
                                <div className="space-y-4">
                                    <Textarea
                                        label="Descripción del Trabajo"
                                        value={form.data.descripcion}
                                        onChange={(e) => form.setData('descripcion', e.target.value)}
                                        error={form.errors.descripcion}
                                        placeholder="Describa el trabajo realizado..."
                                        rows={3}
                                        required
                                    />
                                    <Input
                                        label="Proveedor / Técnico"
                                        value={form.data.proveedor}
                                        onChange={(e) => form.setData('proveedor', e.target.value)}
                                        error={form.errors.proveedor}
                                        placeholder="Nombre del proveedor o técnico..."
                                    />
                                </div>
                            </Card.Body>
                        </Card>

                        {/* Fechas y Costo */}
                        <Card>
                            <Card.Header>
                                <Card.Title>Programación y Costos</Card.Title>
                            </Card.Header>
                            <Card.Body>
                                <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
                                    <Input
                                        label="Fecha de Inicio"
                                        type="date"
                                        value={form.data.fecha_inicio}
                                        onChange={(e) => form.setData('fecha_inicio', e.target.value)}
                                        error={form.errors.fecha_inicio}
                                        required
                                    />
                                    <Input
                                        label="Fecha de Fin"
                                        type="date"
                                        value={form.data.fecha_fin}
                                        onChange={(e) => form.setData('fecha_fin', e.target.value)}
                                        error={form.errors.fecha_fin}
                                    />
                                    <Input
                                        label="Costo (S/)"
                                        type="number"
                                        step="0.01"
                                        value={form.data.costo}
                                        onChange={(e) => form.setData('costo', e.target.value)}
                                        error={form.errors.costo}
                                        placeholder="0.00"
                                    />
                                </div>
                            </Card.Body>
                        </Card>

                        {/* Observaciones */}
                        <Card>
                            <Card.Header>
                                <Card.Title>Observaciones</Card.Title>
                            </Card.Header>
                            <Card.Body>
                                <Textarea
                                    value={form.data.observaciones}
                                    onChange={(e) => form.setData('observaciones', e.target.value)}
                                    placeholder="Notas adicionales, recomendaciones, hallazgos..."
                                    rows={3}
                                />
                            </Card.Body>
                        </Card>

                        {/* Actions */}
                        <div className="flex items-center justify-end gap-3">
                            <Button
                                type="button"
                                variant="secondary"
                                href={route('mantenimientos.show', mantenimiento.id)}
                            >
                                Cancelar
                            </Button>
                            <Button type="submit" disabled={form.processing}>
                                {form.processing ? 'Guardando...' : 'Actualizar Mantenimiento'}
                            </Button>
                        </div>
                    </div>
                </div>
            </form>
        </AppLayout>
    );
}
