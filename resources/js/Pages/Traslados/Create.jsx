import { Head, Link, useForm } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import { Button, Card, Input, Select, Textarea } from '@/Components/UI';
import {
    ArrowLeftIcon,
    TruckIcon,
    MagnifyingGlassIcon,
    ComputerDesktopIcon,
    MapPinIcon,
    ArrowRightIcon,
} from '@heroicons/react/24/outline';
import { useState, useEffect } from 'react';

export default function TrasladosCreate({ equipos, sedes, selectedEquipo = null }) {
    const [equipoSeleccionado, setEquipoSeleccionado] = useState(selectedEquipo);
    const [searchEquipo, setSearchEquipo] = useState('');

    const form = useForm({
        equipo_id: selectedEquipo?.id?.toString() || '',
        sede_destino_id: '',
        motivo: '',
        responsable_entrega: '',
        responsable_recibe: '',
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
        form.post(route('traslados.store'));
    };

    const filteredEquipos = equipos.filter(
        (e) =>
            e.codigo_interno.toLowerCase().includes(searchEquipo.toLowerCase()) ||
            e.marca.toLowerCase().includes(searchEquipo.toLowerCase()) ||
            e.modelo.toLowerCase().includes(searchEquipo.toLowerCase()) ||
            e.serie.toLowerCase().includes(searchEquipo.toLowerCase())
    );

    const sedesDestino = sedes.filter(
        (s) => equipoSeleccionado && s.id !== equipoSeleccionado.sede_id
    );

    return (
        <AppLayout>
            <Head title="Nuevo Traslado" />

            {/* Header */}
            <div className="mb-6">
                <Link
                    href={route('traslados.index')}
                    className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700 mb-4"
                >
                    <ArrowLeftIcon className="h-4 w-4" />
                    Volver a traslados
                </Link>
                <div className="flex items-center gap-4">
                    <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-blue-100">
                        <TruckIcon className="h-7 w-7 text-blue-600" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Nuevo Traslado</h1>
                        <p className="text-gray-600">
                            Registrar movimiento de equipo entre sedes
                        </p>
                    </div>
                </div>
            </div>

            <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                    {/* Selector de Equipo */}
                    <div className="lg:col-span-2">
                        <Card>
                            <Card.Header>
                                <Card.Title>Seleccionar Equipo</Card.Title>
                                <Card.Description>
                                    Busca y selecciona el equipo que deseas trasladar
                                </Card.Description>
                            </Card.Header>
                            <Card.Body>
                                {/* Search Input */}
                                <div className="relative mb-4">
                                    <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                                    <input
                                        type="text"
                                        value={searchEquipo}
                                        onChange={(e) => setSearchEquipo(e.target.value)}
                                        placeholder="Buscar por código, marca, modelo o serie..."
                                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                                    />
                                </div>

                                {/* Equipment Grid */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-96 overflow-y-auto">
                                    {filteredEquipos.map((eq) => (
                                        <button
                                            key={eq.id}
                                            type="button"
                                            onClick={() => form.setData('equipo_id', eq.id.toString())}
                                            className={`text-left p-4 rounded-xl border-2 transition-all ${
                                                form.data.equipo_id === eq.id.toString()
                                                    ? 'border-amber-500 bg-amber-50 ring-2 ring-amber-200'
                                                    : 'border-gray-200 hover:border-amber-300 hover:bg-gray-50'
                                            }`}
                                        >
                                            <div className="flex items-start gap-3">
                                                <div
                                                    className={`flex h-10 w-10 items-center justify-center rounded-lg shrink-0 ${
                                                        eq.tipo === 'computo'
                                                            ? 'bg-blue-100'
                                                            : 'bg-green-100'
                                                    }`}
                                                >
                                                    {eq.tipo === 'computo' ? (
                                                        <ComputerDesktopIcon className="h-5 w-5 text-blue-600" />
                                                    ) : (
                                                        <MapPinIcon className="h-5 w-5 text-green-600" />
                                                    )}
                                                </div>
                                                <div className="min-w-0 flex-1">
                                                    <p className="font-semibold text-gray-900">
                                                        {eq.codigo_interno}
                                                    </p>
                                                    <p className="text-sm text-gray-600 truncate">
                                                        {eq.marca} {eq.modelo}
                                                    </p>
                                                    <p className="text-xs text-gray-400 mt-1">
                                                        Ubicación: {eq.sede?.nombre}
                                                    </p>
                                                </div>
                                            </div>
                                        </button>
                                    ))}
                                </div>

                                {filteredEquipos.length === 0 && (
                                    <div className="text-center py-8 text-gray-500">
                                        <ComputerDesktopIcon className="h-12 w-12 mx-auto text-gray-300 mb-2" />
                                        <p>No se encontraron equipos</p>
                                    </div>
                                )}

                                {form.errors.equipo_id && (
                                    <p className="mt-2 text-sm text-red-600">{form.errors.equipo_id}</p>
                                )}
                            </Card.Body>
                        </Card>
                    </div>

                    {/* Panel de Traslado */}
                    <div className="lg:col-span-1">
                        {equipoSeleccionado ? (
                            <div className="space-y-6">
                                {/* Resumen del Equipo */}
                                <Card className="bg-gradient-to-br from-gray-50 to-white">
                                    <Card.Header>
                                        <Card.Title>Equipo Seleccionado</Card.Title>
                                    </Card.Header>
                                    <Card.Body>
                                        <div className="flex items-center gap-3 mb-4">
                                            <div
                                                className={`flex h-12 w-12 items-center justify-center rounded-xl ${
                                                    equipoSeleccionado.tipo === 'computo'
                                                        ? 'bg-blue-100'
                                                        : 'bg-green-100'
                                                }`}
                                            >
                                                {equipoSeleccionado.tipo === 'computo' ? (
                                                    <ComputerDesktopIcon className="h-6 w-6 text-blue-600" />
                                                ) : (
                                                    <MapPinIcon className="h-6 w-6 text-green-600" />
                                                )}
                                            </div>
                                            <div>
                                                <p className="font-bold text-gray-900">
                                                    {equipoSeleccionado.codigo_interno}
                                                </p>
                                                <p className="text-sm text-gray-600">
                                                    {equipoSeleccionado.marca} {equipoSeleccionado.modelo}
                                                </p>
                                            </div>
                                        </div>

                                        {/* Visual del Traslado */}
                                        <div className="flex items-center gap-2 p-4 bg-white rounded-lg border-2 border-dashed border-gray-200">
                                            <div className="flex-1 text-center">
                                                <p className="text-xs text-gray-500 mb-1">Origen</p>
                                                <p className="font-semibold text-gray-700">
                                                    {equipoSeleccionado.sede?.nombre}
                                                </p>
                                            </div>
                                            <ArrowRightIcon className="h-6 w-6 text-amber-500 shrink-0" />
                                            <div className="flex-1 text-center">
                                                <p className="text-xs text-gray-500 mb-1">Destino</p>
                                                <p className="font-semibold text-amber-600">
                                                    {form.data.sede_destino_id
                                                        ? sedes.find(
                                                              (s) =>
                                                                  s.id.toString() === form.data.sede_destino_id
                                                          )?.nombre
                                                        : '—'}
                                                </p>
                                            </div>
                                        </div>
                                    </Card.Body>
                                </Card>

                                {/* Formulario de Traslado */}
                                <Card>
                                    <Card.Header>
                                        <Card.Title>Datos del Traslado</Card.Title>
                                    </Card.Header>
                                    <Card.Body>
                                        <div className="space-y-4">
                                            <Select
                                                label="Sede de Destino"
                                                value={form.data.sede_destino_id}
                                                onChange={(e) =>
                                                    form.setData('sede_destino_id', e.target.value)
                                                }
                                                error={form.errors.sede_destino_id}
                                                placeholder="Seleccionar destino..."
                                                options={sedesDestino.map((s) => ({
                                                    value: s.id.toString(),
                                                    label: `${s.nombre} - ${s.ciudad}`,
                                                }))}
                                                required
                                            />

                                            <Input
                                                label="Motivo del Traslado"
                                                value={form.data.motivo}
                                                onChange={(e) => form.setData('motivo', e.target.value)}
                                                error={form.errors.motivo}
                                                placeholder="Ej: Asignación a proyecto..."
                                                required
                                            />

                                            <Input
                                                label="Responsable que Entrega"
                                                value={form.data.responsable_entrega}
                                                onChange={(e) =>
                                                    form.setData('responsable_entrega', e.target.value)
                                                }
                                                placeholder="Nombre completo..."
                                            />

                                            <Input
                                                label="Responsable que Recibe"
                                                value={form.data.responsable_recibe}
                                                onChange={(e) =>
                                                    form.setData('responsable_recibe', e.target.value)
                                                }
                                                placeholder="Nombre completo..."
                                            />

                                            <Textarea
                                                label="Observaciones"
                                                value={form.data.observaciones}
                                                onChange={(e) =>
                                                    form.setData('observaciones', e.target.value)
                                                }
                                                placeholder="Notas adicionales..."
                                                rows={2}
                                            />
                                        </div>
                                    </Card.Body>
                                </Card>

                                {/* Actions */}
                                <div className="flex items-center gap-3">
                                    <Button
                                        type="button"
                                        variant="secondary"
                                        href={route('traslados.index')}
                                        className="flex-1"
                                    >
                                        Cancelar
                                    </Button>
                                    <Button
                                        type="submit"
                                        disabled={form.processing || !form.data.sede_destino_id}
                                        className="flex-1"
                                    >
                                        <TruckIcon className="h-5 w-5" />
                                        {form.processing ? 'Procesando...' : 'Confirmar'}
                                    </Button>
                                </div>
                            </div>
                        ) : (
                            <Card className="h-full flex items-center justify-center">
                                <div className="text-center py-12">
                                    <TruckIcon className="h-16 w-16 mx-auto text-gray-300 mb-4" />
                                    <p className="text-gray-500 font-medium">
                                        Selecciona un equipo
                                    </p>
                                    <p className="text-sm text-gray-400 mt-1">
                                        Para registrar el traslado
                                    </p>
                                </div>
                            </Card>
                        )}
                    </div>
                </div>
            </form>
        </AppLayout>
    );
}
