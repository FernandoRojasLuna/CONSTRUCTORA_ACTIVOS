import { Head, Link, useForm } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import { Button, Card, Input, Select, Textarea } from '@/Components/UI';
import { ArrowLeftIcon, ComputerDesktopIcon, MapPinIcon } from '@heroicons/react/24/outline';

export default function EquiposEdit({ equipo, sedes }) {
    // Preparar especificaciones iniciales
    const especificaciones = equipo.especificaciones || {};

    // Formatear fecha a yyyy-MM-dd si viene en formato ISO
    const formatDate = (dateStr) => {
        if (!dateStr) return '';
        // Si ya está en formato yyyy-MM-dd, retornarlo tal cual
        if (/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) return dateStr;
        // Si viene en formato ISO, extraer solo la fecha
        return dateStr.split('T')[0];
    };

    const form = useForm({
        tipo: equipo.tipo,
        subtipo: equipo.subtipo,
        codigo_interno: equipo.codigo_interno,
        serie: equipo.serie,
        marca: equipo.marca,
        modelo: equipo.modelo,
        sede_id: equipo.sede_id?.toString() || '',
        estado: equipo.estado,
        fecha_adquisicion: formatDate(equipo.fecha_adquisicion),
        valor_compra: equipo.valor_compra || '',
        responsable_actual: equipo.responsable_actual || '',
        observaciones: equipo.observaciones || '',
        // Especificaciones Cómputo
        ram: especificaciones.ram || '',
        procesador: especificaciones.procesador || '',
        disco: especificaciones.disco || '',
        sistema_operativo: especificaciones.sistema_operativo || '',
        tipo_insumo: especificaciones.tipo_insumo || '',
        modelo_insumo: especificaciones.modelo_insumo || '',
        conectividad: especificaciones.conectividad || '',
        // Especificaciones Topografía
        precision_angular: especificaciones.precision_angular || '',
        alcance: especificaciones.alcance || '',
        precision: especificaciones.precision || '',
        aumento: especificaciones.aumento || '',
        tipo_gps: especificaciones.tipo || '',
        accesorios: Array.isArray(especificaciones.accesorios) 
            ? especificaciones.accesorios.join(', ') 
            : (especificaciones.accesorios || ''),
    });

    const subtiposComputo = [
        { value: 'laptop', label: 'Laptop' },
        { value: 'pc', label: 'PC Escritorio' },
        { value: 'impresora', label: 'Impresora' },
    ];

    const subtiposTopografia = [
        { value: 'estacion_total', label: 'Estación Total' },
        { value: 'gps', label: 'GPS' },
        { value: 'nivel', label: 'Nivel' },
    ];

    const estados = [
        { value: 'operativo', label: 'Operativo' },
        { value: 'mantenimiento', label: 'En Mantenimiento' },
        { value: 'baja', label: 'Dado de Baja' },
        { value: 'prestamo', label: 'En Préstamo' },
    ];

    const handleSubmit = (e) => {
        e.preventDefault();

        // Construir especificaciones según tipo
        const specs = {};
        if (form.data.tipo === 'computo') {
            if (form.data.subtipo === 'laptop' || form.data.subtipo === 'pc') {
                if (form.data.ram) specs.ram = form.data.ram;
                if (form.data.procesador) specs.procesador = form.data.procesador;
                if (form.data.disco) specs.disco = form.data.disco;
                if (form.data.sistema_operativo) specs.sistema_operativo = form.data.sistema_operativo;
            }
            if (form.data.subtipo === 'impresora') {
                if (form.data.tipo_insumo) specs.tipo_insumo = form.data.tipo_insumo;
                if (form.data.modelo_insumo) specs.modelo_insumo = form.data.modelo_insumo;
                if (form.data.conectividad) specs.conectividad = form.data.conectividad;
            }
        } else {
            if (form.data.subtipo === 'estacion_total') {
                if (form.data.precision_angular) specs.precision_angular = form.data.precision_angular;
                if (form.data.alcance) specs.alcance = form.data.alcance;
            }
            if (form.data.subtipo === 'gps') {
                if (form.data.precision) specs.precision = form.data.precision;
                if (form.data.tipo_gps) specs.tipo = form.data.tipo_gps;
            }
            if (form.data.subtipo === 'nivel') {
                if (form.data.precision) specs.precision = form.data.precision;
                if (form.data.aumento) specs.aumento = form.data.aumento;
            }
            if (form.data.accesorios) {
                specs.accesorios = form.data.accesorios.split(',').map((s) => s.trim());
            }
        }

        form.transform((data) => ({
            ...data,
            especificaciones: Object.keys(specs).length > 0 ? specs : null,
        }));
        
        form.put(route('equipos.update', equipo.id));
    };

    const renderEspecificacionesComputo = () => {
        if (form.data.subtipo === 'laptop' || form.data.subtipo === 'pc') {
            return (
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    <Input
                        label="RAM"
                        value={form.data.ram}
                        onChange={(e) => form.setData('ram', e.target.value)}
                        placeholder="Ej: 16GB DDR4"
                    />
                    <Input
                        label="Procesador"
                        value={form.data.procesador}
                        onChange={(e) => form.setData('procesador', e.target.value)}
                        placeholder="Ej: Intel Core i7-12700H"
                    />
                    <Input
                        label="Disco"
                        value={form.data.disco}
                        onChange={(e) => form.setData('disco', e.target.value)}
                        placeholder="Ej: SSD 512GB NVMe"
                    />
                    <Input
                        label="Sistema Operativo"
                        value={form.data.sistema_operativo}
                        onChange={(e) => form.setData('sistema_operativo', e.target.value)}
                        placeholder="Ej: Windows 11 Pro"
                    />
                </div>
            );
        }

        if (form.data.subtipo === 'impresora') {
            return (
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
                    <Input
                        label="Tipo de Insumo"
                        value={form.data.tipo_insumo}
                        onChange={(e) => form.setData('tipo_insumo', e.target.value)}
                        placeholder="Ej: Tóner, Cartucho"
                    />
                    <Input
                        label="Modelo de Insumo"
                        value={form.data.modelo_insumo}
                        onChange={(e) => form.setData('modelo_insumo', e.target.value)}
                        placeholder="Ej: HP 85A"
                    />
                    <Input
                        label="Conectividad"
                        value={form.data.conectividad}
                        onChange={(e) => form.setData('conectividad', e.target.value)}
                        placeholder="Ej: WiFi, USB, Ethernet"
                    />
                </div>
            );
        }

        return null;
    };

    const renderEspecificacionesTopografia = () => {
        if (form.data.subtipo === 'estacion_total') {
            return (
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    <Input
                        label="Precisión Angular"
                        value={form.data.precision_angular}
                        onChange={(e) => form.setData('precision_angular', e.target.value)}
                        placeholder="Ej: 5 segundos"
                    />
                    <Input
                        label="Alcance"
                        value={form.data.alcance}
                        onChange={(e) => form.setData('alcance', e.target.value)}
                        placeholder="Ej: 5000m sin prisma"
                    />
                    <div className="sm:col-span-2">
                        <Input
                            label="Accesorios"
                            value={form.data.accesorios}
                            onChange={(e) => form.setData('accesorios', e.target.value)}
                            placeholder="Ej: Trípode, prismas, bastón (separados por coma)"
                        />
                    </div>
                </div>
            );
        }

        if (form.data.subtipo === 'gps') {
            return (
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    <Input
                        label="Precisión"
                        value={form.data.precision}
                        onChange={(e) => form.setData('precision', e.target.value)}
                        placeholder="Ej: ±2mm + 0.5ppm"
                    />
                    <Select
                        label="Tipo de GPS"
                        value={form.data.tipo_gps}
                        onChange={(e) => form.setData('tipo_gps', e.target.value)}
                        options={[
                            { value: 'RTK', label: 'RTK' },
                            { value: 'diferencial', label: 'Diferencial' },
                            { value: 'navegador', label: 'Navegador' },
                        ]}
                        placeholder="Seleccionar..."
                    />
                    <div className="sm:col-span-2">
                        <Input
                            label="Accesorios"
                            value={form.data.accesorios}
                            onChange={(e) => form.setData('accesorios', e.target.value)}
                            placeholder="Ej: Antena, radio, controlador (separados por coma)"
                        />
                    </div>
                </div>
            );
        }

        if (form.data.subtipo === 'nivel') {
            return (
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    <Input
                        label="Precisión"
                        value={form.data.precision}
                        onChange={(e) => form.setData('precision', e.target.value)}
                        placeholder="Ej: 0.3mm por km doble"
                    />
                    <Input
                        label="Aumento"
                        value={form.data.aumento}
                        onChange={(e) => form.setData('aumento', e.target.value)}
                        placeholder="Ej: 32x"
                    />
                    <div className="sm:col-span-2">
                        <Input
                            label="Accesorios"
                            value={form.data.accesorios}
                            onChange={(e) => form.setData('accesorios', e.target.value)}
                            placeholder="Ej: Mira, trípode (separados por coma)"
                        />
                    </div>
                </div>
            );
        }

        return null;
    };

    return (
        <AppLayout>
            <Head title={`Editar ${equipo.codigo_interno}`} />

            {/* Header */}
            <div className="mb-6">
                <Link
                    href={route('equipos.show', equipo.id)}
                    className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700 mb-4"
                >
                    <ArrowLeftIcon className="h-4 w-4" />
                    Volver al equipo
                </Link>
                <div className="flex items-center gap-4">
                    <div
                        className={`flex h-14 w-14 items-center justify-center rounded-xl ${
                            equipo.tipo === 'computo' ? 'bg-blue-100' : 'bg-green-100'
                        }`}
                    >
                        {equipo.tipo === 'computo' ? (
                            <ComputerDesktopIcon className="h-7 w-7 text-blue-600" />
                        ) : (
                            <MapPinIcon className="h-7 w-7 text-green-600" />
                        )}
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Editar Equipo</h1>
                        <p className="text-gray-600">
                            {equipo.codigo_interno} - {equipo.marca} {equipo.modelo}
                        </p>
                    </div>
                </div>
            </div>

            <form onSubmit={handleSubmit}>
                <div className="space-y-6">
                    {/* Tipo de Equipo */}
                    <Card>
                        <Card.Header>
                            <Card.Title>Tipo de Equipo</Card.Title>
                            <Card.Description>Categoría y subtipo del activo</Card.Description>
                        </Card.Header>
                        <Card.Body>
                            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                                {/* Tipo (readonly visual) */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Tipo de Equipo
                                    </label>
                                    <div className="flex gap-4">
                                        <button
                                            type="button"
                                            className={`flex-1 flex items-center justify-center gap-3 p-4 rounded-xl border-2 transition-all ${
                                                form.data.tipo === 'computo'
                                                    ? 'border-blue-500 bg-blue-50'
                                                    : 'border-gray-200 opacity-50'
                                            }`}
                                            onClick={() => {
                                                form.setData({
                                                    ...form.data,
                                                    tipo: 'computo',
                                                    subtipo: 'laptop',
                                                });
                                            }}
                                        >
                                            <ComputerDesktopIcon className="h-8 w-8 text-blue-600" />
                                            <div className="text-left">
                                                <p className="font-semibold text-gray-900">Cómputo</p>
                                                <p className="text-xs text-gray-500">Laptops, PCs, Impresoras</p>
                                            </div>
                                        </button>
                                        <button
                                            type="button"
                                            className={`flex-1 flex items-center justify-center gap-3 p-4 rounded-xl border-2 transition-all ${
                                                form.data.tipo === 'topografia'
                                                    ? 'border-green-500 bg-green-50'
                                                    : 'border-gray-200 opacity-50'
                                            }`}
                                            onClick={() => {
                                                form.setData({
                                                    ...form.data,
                                                    tipo: 'topografia',
                                                    subtipo: 'estacion_total',
                                                });
                                            }}
                                        >
                                            <MapPinIcon className="h-8 w-8 text-green-600" />
                                            <div className="text-left">
                                                <p className="font-semibold text-gray-900">Topografía</p>
                                                <p className="text-xs text-gray-500">Estaciones, GPS, Niveles</p>
                                            </div>
                                        </button>
                                    </div>
                                </div>

                                <Select
                                    label="Subtipo"
                                    value={form.data.subtipo}
                                    onChange={(e) => form.setData('subtipo', e.target.value)}
                                    error={form.errors.subtipo}
                                    options={
                                        form.data.tipo === 'computo' ? subtiposComputo : subtiposTopografia
                                    }
                                    required
                                />
                            </div>
                        </Card.Body>
                    </Card>

                    {/* Información General */}
                    <Card>
                        <Card.Header>
                            <Card.Title>Información General</Card.Title>
                            <Card.Description>Datos de identificación del equipo</Card.Description>
                        </Card.Header>
                        <Card.Body>
                            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                                <Input
                                    label="Código Interno"
                                    value={form.data.codigo_interno}
                                    onChange={(e) => form.setData('codigo_interno', e.target.value)}
                                    error={form.errors.codigo_interno}
                                    placeholder="Ej: COMP-LPT-001"
                                    required
                                />
                                <Input
                                    label="Número de Serie"
                                    value={form.data.serie}
                                    onChange={(e) => form.setData('serie', e.target.value)}
                                    error={form.errors.serie}
                                    placeholder="Ej: ABC123XYZ"
                                    required
                                />
                                <Input
                                    label="Marca"
                                    value={form.data.marca}
                                    onChange={(e) => form.setData('marca', e.target.value)}
                                    error={form.errors.marca}
                                    placeholder="Ej: Dell, Trimble"
                                    required
                                />
                                <Input
                                    label="Modelo"
                                    value={form.data.modelo}
                                    onChange={(e) => form.setData('modelo', e.target.value)}
                                    error={form.errors.modelo}
                                    placeholder="Ej: Latitude 5540"
                                    required
                                />
                                <Select
                                    label="Sede"
                                    value={form.data.sede_id}
                                    onChange={(e) => form.setData('sede_id', e.target.value)}
                                    error={form.errors.sede_id}
                                    options={sedes.map((s) => ({ value: s.id.toString(), label: s.nombre }))}
                                    placeholder="Seleccionar sede..."
                                    required
                                />
                                <Select
                                    label="Estado"
                                    value={form.data.estado}
                                    onChange={(e) => form.setData('estado', e.target.value)}
                                    error={form.errors.estado}
                                    options={estados}
                                    required
                                />
                            </div>
                        </Card.Body>
                    </Card>

                    {/* Especificaciones Técnicas */}
                    <Card>
                        <Card.Header>
                            <Card.Title>Especificaciones Técnicas</Card.Title>
                            <Card.Description>
                                Características específicas del {form.data.subtipo?.replace('_', ' ')}
                            </Card.Description>
                        </Card.Header>
                        <Card.Body>
                            {form.data.tipo === 'computo'
                                ? renderEspecificacionesComputo()
                                : renderEspecificacionesTopografia()}
                            {!form.data.subtipo && (
                                <p className="text-sm text-gray-500 italic">
                                    Selecciona un subtipo para ver las especificaciones
                                </p>
                            )}
                        </Card.Body>
                    </Card>

                    {/* Información Adicional */}
                    <Card>
                        <Card.Header>
                            <Card.Title>Información Adicional</Card.Title>
                            <Card.Description>Datos complementarios y asignación</Card.Description>
                        </Card.Header>
                        <Card.Body>
                            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                                <Input
                                    label="Fecha de Adquisición"
                                    type="date"
                                    value={form.data.fecha_adquisicion}
                                    onChange={(e) => form.setData('fecha_adquisicion', e.target.value)}
                                    error={form.errors.fecha_adquisicion}
                                />
                                <Input
                                    label="Valor de Compra (S/)"
                                    type="number"
                                    step="0.01"
                                    value={form.data.valor_compra}
                                    onChange={(e) => form.setData('valor_compra', e.target.value)}
                                    error={form.errors.valor_compra}
                                    placeholder="0.00"
                                />
                                <Input
                                    label="Responsable Actual"
                                    value={form.data.responsable_actual}
                                    onChange={(e) => form.setData('responsable_actual', e.target.value)}
                                    error={form.errors.responsable_actual}
                                    placeholder="Nombre del responsable"
                                />
                            </div>
                            <div className="mt-6">
                                <Textarea
                                    label="Observaciones"
                                    value={form.data.observaciones}
                                    onChange={(e) => form.setData('observaciones', e.target.value)}
                                    error={form.errors.observaciones}
                                    placeholder="Notas adicionales sobre el equipo..."
                                    rows={3}
                                />
                            </div>
                        </Card.Body>
                    </Card>

                    {/* Actions */}
                    <div className="flex items-center justify-end gap-3">
                        <Button
                            type="button"
                            variant="secondary"
                            href={route('equipos.show', equipo.id)}
                        >
                            Cancelar
                        </Button>
                        <Button type="submit" disabled={form.processing}>
                            {form.processing ? 'Guardando...' : 'Actualizar Equipo'}
                        </Button>
                    </div>
                </div>
            </form>
        </AppLayout>
    );
}
