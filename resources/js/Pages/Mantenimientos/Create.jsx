import { Head, Link, useForm } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import { Button, Card, Input, Select, Textarea } from '@/Components/UI';
import {
    ArrowLeftIcon,
    WrenchScrewdriverIcon,
    ComputerDesktopIcon,
    MapPinIcon,
    MagnifyingGlassIcon,
} from '@heroicons/react/24/outline';
import { useState, useEffect } from 'react';

export default function MantenimientosCreate({ equipos, selectedEquipo = null }) {
    const [equipoSeleccionado, setEquipoSeleccionado] = useState(selectedEquipo);
    const [searchEquipo, setSearchEquipo] = useState('');

    const form = useForm({
        equipo_id: selectedEquipo?.id?.toString() || '',
        tipo: 'preventivo',
        descripcion: '',
        proveedor: '',
        fecha_inicio: new Date().toISOString().split('T')[0],
        fecha_fin: '',
        costo: '',
        estado: 'pendiente',
        observaciones: '',
    });

    useEffect(() => {
        if (form.data.equipo_id) {
            const eq = equipos.find((e) => e.id.toString() === form.data.equipo_id);
            setEquipoSeleccionado(eq || null);
        } else {
            setEquipoSeleccionado(null);
        }
    }, [form.data.equipo_id, equipos]);

    const handleSubmit = (e) => {
        e.preventDefault();
        form.post(route('mantenimientos.store'));
    };

    const filteredEquipos = equipos.filter(
        (e) =>
            e.codigo_interno.toLowerCase().includes(searchEquipo.toLowerCase()) ||
            e.marca.toLowerCase().includes(searchEquipo.toLowerCase()) ||
            e.modelo.toLowerCase().includes(searchEquipo.toLowerCase())
    );

    return (
        <AppLayout>
            <Head title="Nuevo Mantenimiento" />

            {/* Header */}
            <div className="mb-6">
                <Link
                    href={route('mantenimientos.index')}
                    className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700 mb-4"
                >
                    <ArrowLeftIcon className="h-4 w-4" />
                    Volver a mantenimientos
                </Link>
                <div className="flex items-center gap-4">
                    <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-purple-100">
                        <WrenchScrewdriverIcon className="h-7 w-7 text-purple-600" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Nuevo Mantenimiento</h1>
                        <p className="text-gray-600">
                            Registrar servicio técnico o calibración
                        </p>
                    </div>
                </div>
            </div>

            <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                    {/* Selector de Equipo */}
                    <div className="lg:col-span-1">
                        <Card className="sticky top-6">
                            <Card.Header>
                                <Card.Title>Seleccionar Equipo</Card.Title>
                            </Card.Header>
                            <Card.Body>
                                {/* Search */}
                                <div className="relative mb-4">
                                    <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                                    <input
                                        type="text"
                                        value={searchEquipo}
                                        onChange={(e) => setSearchEquipo(e.target.value)}
                                        placeholder="Buscar equipo..."
                                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 text-sm"
                                    />
                                </div>

                                {/* Equipment List */}
                                <div className="space-y-2 max-h-96 overflow-y-auto">
                                    {filteredEquipos.map((eq) => (
                                        <button
                                            key={eq.id}
                                            type="button"
                                            onClick={() => form.setData('equipo_id', eq.id.toString())}
                                            className={`w-full text-left p-3 rounded-lg border-2 transition-all ${
                                                form.data.equipo_id === eq.id.toString()
                                                    ? 'border-purple-500 bg-purple-50'
                                                    : 'border-gray-200 hover:border-purple-300'
                                            }`}
                                        >
                                            <div className="flex items-center gap-3">
                                                <div
                                                    className={`flex h-8 w-8 items-center justify-center rounded-lg shrink-0 ${
                                                        eq.tipo === 'computo'
                                                            ? 'bg-blue-100'
                                                            : 'bg-green-100'
                                                    }`}
                                                >
                                                    {eq.tipo === 'computo' ? (
                                                        <ComputerDesktopIcon className="h-4 w-4 text-blue-600" />
                                                    ) : (
                                                        <MapPinIcon className="h-4 w-4 text-green-600" />
                                                    )}
                                                </div>
                                                <div className="min-w-0 flex-1">
                                                    <p className="font-medium text-gray-900 text-sm">
                                                        {eq.codigo_interno}
                                                    </p>
                                                    <p className="text-xs text-gray-500 truncate">
                                                        {eq.marca} {eq.modelo}
                                                    </p>
                                                </div>
                                            </div>
                                        </button>
                                    ))}
                                </div>

                                {filteredEquipos.length === 0 && (
                                    <p className="text-center text-gray-500 py-4 text-sm">
                                        No se encontraron equipos
                                    </p>
                                )}

                                {form.errors.equipo_id && (
                                    <p className="mt-2 text-sm text-red-600">{form.errors.equipo_id}</p>
                                )}
                            </Card.Body>
                        </Card>
                    </div>

                    {/* Formulario */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Tipo y Estado */}
                        <Card>
                            <Card.Header>
                                <Card.Title>Tipo de Mantenimiento</Card.Title>
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
                                        placeholder="Describa el trabajo a realizar o realizado..."
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
                            <Button type="button" variant="secondary" href={route('mantenimientos.index')}>
                                Cancelar
                            </Button>
                            <Button
                                type="submit"
                                disabled={form.processing || !form.data.equipo_id}
                            >
                                <WrenchScrewdriverIcon className="h-5 w-5" />
                                {form.processing ? 'Guardando...' : 'Registrar Mantenimiento'}
                            </Button>
                        </div>
                    </div>
                </div>
            </form>
        </AppLayout>
    );
}
