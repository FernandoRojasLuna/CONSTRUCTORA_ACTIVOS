import { useState } from 'react';
import { Head, useForm, Link } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import { Button, Card, Input, Select, Textarea } from '@/Components/UI';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';

export default function EquiposCreate({ sedes, tipo: initialTipo }) {
    const [tipo, setTipo] = useState(initialTipo || 'computo');

    const { data, setData, post, processing, errors } = useForm({
        sede_id: '',
        tipo: initialTipo || 'computo',
        subtipo: '',
        codigo_interno: '',
        serie: '',
        marca: '',
        modelo: '',
        estado: 'operativo',
        fecha_adquisicion: '',
        valor_compra: '',
        responsable_actual: '',
        especificaciones: {},
        observaciones: '',
    });

    // Especificaciones dinámicas según el tipo
    const [specs, setSpecs] = useState({
        // Cómputo
        ram: '',
        procesador: '',
        disco: '',
        sistema_operativo: '',
        tipo_insumo: '',
        modelo_insumo: '',
        conectividad: '',
        // Topografía
        precision_angular: '',
        alcance: '',
        accesorios: '',
        precision: '',
        aumento: '',
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

    const handleTipoChange = (newTipo) => {
        setTipo(newTipo);
        setData('tipo', newTipo);
        setData('subtipo', '');
    };

    const handleSpecChange = (key, value) => {
        const newSpecs = { ...specs, [key]: value };
        setSpecs(newSpecs);

        // Filtrar solo las especificaciones relevantes según subtipo
        const filteredSpecs = {};
        Object.entries(newSpecs).forEach(([k, v]) => {
            if (v && v.trim() !== '') {
                filteredSpecs[k] = v;
            }
        });
        setData('especificaciones', filteredSpecs);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('equipos.store'));
    };

    const renderSpecsFields = () => {
        if (tipo === 'computo') {
            if (data.subtipo === 'laptop' || data.subtipo === 'pc') {
                return (
                    <>
                        <Input
                            label="RAM"
                            value={specs.ram}
                            onChange={(e) => handleSpecChange('ram', e.target.value)}
                            placeholder="Ej: 16GB"
                        />
                        <Input
                            label="Procesador"
                            value={specs.procesador}
                            onChange={(e) => handleSpecChange('procesador', e.target.value)}
                            placeholder="Ej: Intel Core i7-1165G7"
                        />
                        <Input
                            label="Disco"
                            value={specs.disco}
                            onChange={(e) => handleSpecChange('disco', e.target.value)}
                            placeholder="Ej: SSD 512GB"
                        />
                        <Input
                            label="Sistema Operativo"
                            value={specs.sistema_operativo}
                            onChange={(e) => handleSpecChange('sistema_operativo', e.target.value)}
                            placeholder="Ej: Windows 11 Pro"
                        />
                    </>
                );
            }
            if (data.subtipo === 'impresora') {
                return (
                    <>
                        <Select
                            label="Tipo de Insumo"
                            value={specs.tipo_insumo}
                            onChange={(e) => handleSpecChange('tipo_insumo', e.target.value)}
                            placeholder="Seleccionar..."
                            options={[
                                { value: 'Tóner', label: 'Tóner' },
                                { value: 'Tinta', label: 'Tinta' },
                                { value: 'Cinta', label: 'Cinta' },
                            ]}
                        />
                        <Input
                            label="Modelo de Insumo"
                            value={specs.modelo_insumo}
                            onChange={(e) => handleSpecChange('modelo_insumo', e.target.value)}
                            placeholder="Ej: CF259A, T544..."
                        />
                        <Input
                            label="Conectividad"
                            value={specs.conectividad}
                            onChange={(e) => handleSpecChange('conectividad', e.target.value)}
                            placeholder="Ej: USB, WiFi, Ethernet"
                        />
                    </>
                );
            }
        }

        if (tipo === 'topografia') {
            if (data.subtipo === 'estacion_total') {
                return (
                    <>
                        <Input
                            label="Precisión Angular"
                            value={specs.precision_angular}
                            onChange={(e) => handleSpecChange('precision_angular', e.target.value)}
                            placeholder="Ej: 5 segundos"
                        />
                        <Input
                            label="Alcance"
                            value={specs.alcance}
                            onChange={(e) => handleSpecChange('alcance', e.target.value)}
                            placeholder="Ej: 3500m con prisma"
                        />
                        <div className="sm:col-span-2">
                            <Textarea
                                label="Accesorios"
                                value={specs.accesorios}
                                onChange={(e) => handleSpecChange('accesorios', e.target.value)}
                                placeholder="Trípode, Prisma, Bastón, Baterías..."
                                rows={2}
                            />
                        </div>
                    </>
                );
            }
            if (data.subtipo === 'gps') {
                return (
                    <>
                        <Select
                            label="Tipo GPS"
                            value={specs.tipo}
                            onChange={(e) => handleSpecChange('tipo', e.target.value)}
                            placeholder="Seleccionar..."
                            options={[
                                { value: 'RTK', label: 'RTK' },
                                { value: 'Diferencial', label: 'Diferencial' },
                                { value: 'Navegador', label: 'Navegador' },
                            ]}
                        />
                        <Input
                            label="Precisión"
                            value={specs.precision}
                            onChange={(e) => handleSpecChange('precision', e.target.value)}
                            placeholder="Ej: 8mm + 1ppm horizontal"
                        />
                        <div className="sm:col-span-2">
                            <Textarea
                                label="Accesorios"
                                value={specs.accesorios}
                                onChange={(e) => handleSpecChange('accesorios', e.target.value)}
                                placeholder="Base, Rover, Controladora..."
                                rows={2}
                            />
                        </div>
                    </>
                );
            }
            if (data.subtipo === 'nivel') {
                return (
                    <>
                        <Input
                            label="Aumento"
                            value={specs.aumento}
                            onChange={(e) => handleSpecChange('aumento', e.target.value)}
                            placeholder="Ej: 24x"
                        />
                        <Input
                            label="Precisión"
                            value={specs.precision}
                            onChange={(e) => handleSpecChange('precision', e.target.value)}
                            placeholder="Ej: 2mm/km"
                        />
                        <div className="sm:col-span-2">
                            <Textarea
                                label="Accesorios"
                                value={specs.accesorios}
                                onChange={(e) => handleSpecChange('accesorios', e.target.value)}
                                placeholder="Trípode, Mira..."
                                rows={2}
                            />
                        </div>
                    </>
                );
            }
        }

        return null;
    };

    return (
        <AppLayout>
            <Head title="Nuevo Equipo" />

            {/* Header */}
            <div className="mb-6">
                <Link
                    href={route('equipos.index')}
                    className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700 mb-4"
                >
                    <ArrowLeftIcon className="h-4 w-4" />
                    Volver a equipos
                </Link>
                <h1 className="text-2xl font-bold text-gray-900">Nuevo Equipo</h1>
                <p className="mt-1 text-sm text-gray-500">
                    Registra un nuevo activo en el sistema
                </p>
            </div>

            <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                    {/* Main Form */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Tipo de Equipo */}
                        <Card>
                            <Card.Header>
                                <Card.Title>Tipo de Equipo</Card.Title>
                                <Card.Description>
                                    Selecciona la categoría del activo
                                </Card.Description>
                            </Card.Header>
                            <Card.Body>
                                <div className="grid grid-cols-2 gap-4">
                                    <button
                                        type="button"
                                        onClick={() => handleTipoChange('computo')}
                                        className={`relative rounded-xl border-2 p-4 text-center transition-all ${
                                            tipo === 'computo'
                                                ? 'border-amber-500 bg-amber-50'
                                                : 'border-gray-200 hover:border-gray-300'
                                        }`}
                                    >
                                        <div className="text-3xl mb-2">💻</div>
                                        <p className="font-semibold text-gray-900">Cómputo</p>
                                        <p className="text-xs text-gray-500 mt-1">
                                            Laptops, PCs, Impresoras
                                        </p>
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => handleTipoChange('topografia')}
                                        className={`relative rounded-xl border-2 p-4 text-center transition-all ${
                                            tipo === 'topografia'
                                                ? 'border-amber-500 bg-amber-50'
                                                : 'border-gray-200 hover:border-gray-300'
                                        }`}
                                    >
                                        <div className="text-3xl mb-2">📍</div>
                                        <p className="font-semibold text-gray-900">Topografía</p>
                                        <p className="text-xs text-gray-500 mt-1">
                                            Est. Totales, GPS, Niveles
                                        </p>
                                    </button>
                                </div>
                            </Card.Body>
                        </Card>

                        {/* Información Básica */}
                        <Card>
                            <Card.Header>
                                <Card.Title>Información Básica</Card.Title>
                                <Card.Description>
                                    Datos de identificación del equipo
                                </Card.Description>
                            </Card.Header>
                            <Card.Body>
                                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                                    <Select
                                        label="Subtipo"
                                        value={data.subtipo}
                                        onChange={(e) => setData('subtipo', e.target.value)}
                                        error={errors.subtipo}
                                        placeholder="Seleccionar tipo específico..."
                                        options={tipo === 'computo' ? subtiposComputo : subtiposTopografia}
                                        required
                                    />
                                    <Select
                                        label="Sede"
                                        value={data.sede_id}
                                        onChange={(e) => setData('sede_id', e.target.value)}
                                        error={errors.sede_id}
                                        placeholder="Seleccionar sede..."
                                        options={sedes.map((s) => ({ value: s.id.toString(), label: s.nombre }))}
                                        required
                                    />
                                    <Input
                                        label="Código Interno"
                                        value={data.codigo_interno}
                                        onChange={(e) => setData('codigo_interno', e.target.value)}
                                        error={errors.codigo_interno}
                                        placeholder="Ej: LAP-001, ET-002..."
                                        required
                                    />
                                    <Input
                                        label="Número de Serie"
                                        value={data.serie}
                                        onChange={(e) => setData('serie', e.target.value)}
                                        error={errors.serie}
                                        placeholder="Serie del fabricante"
                                        required
                                    />
                                    <Input
                                        label="Marca"
                                        value={data.marca}
                                        onChange={(e) => setData('marca', e.target.value)}
                                        error={errors.marca}
                                        placeholder="Ej: HP, Dell, Leica..."
                                        required
                                    />
                                    <Input
                                        label="Modelo"
                                        value={data.modelo}
                                        onChange={(e) => setData('modelo', e.target.value)}
                                        error={errors.modelo}
                                        placeholder="Modelo del equipo"
                                        required
                                    />
                                </div>
                            </Card.Body>
                        </Card>

                        {/* Especificaciones Técnicas */}
                        {data.subtipo && (
                            <Card>
                                <Card.Header>
                                    <Card.Title>Especificaciones Técnicas</Card.Title>
                                    <Card.Description>
                                        Características específicas del equipo
                                    </Card.Description>
                                </Card.Header>
                                <Card.Body>
                                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                                        {renderSpecsFields()}
                                    </div>
                                </Card.Body>
                            </Card>
                        )}

                        {/* Información Adicional */}
                        <Card>
                            <Card.Header>
                                <Card.Title>Información Adicional</Card.Title>
                            </Card.Header>
                            <Card.Body>
                                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                                    <Input
                                        label="Fecha de Adquisición"
                                        type="date"
                                        value={data.fecha_adquisicion}
                                        onChange={(e) => setData('fecha_adquisicion', e.target.value)}
                                        error={errors.fecha_adquisicion}
                                    />
                                    <Input
                                        label="Valor de Compra (S/)"
                                        type="number"
                                        step="0.01"
                                        value={data.valor_compra}
                                        onChange={(e) => setData('valor_compra', e.target.value)}
                                        error={errors.valor_compra}
                                        placeholder="0.00"
                                    />
                                    <div className="sm:col-span-2">
                                        <Input
                                            label="Responsable Actual"
                                            value={data.responsable_actual}
                                            onChange={(e) => setData('responsable_actual', e.target.value)}
                                            error={errors.responsable_actual}
                                            placeholder="Nombre de la persona o área"
                                        />
                                    </div>
                                    <div className="sm:col-span-2">
                                        <Textarea
                                            label="Observaciones"
                                            value={data.observaciones}
                                            onChange={(e) => setData('observaciones', e.target.value)}
                                            error={errors.observaciones}
                                            placeholder="Notas adicionales sobre el equipo..."
                                            rows={3}
                                        />
                                    </div>
                                </div>
                            </Card.Body>
                        </Card>
                    </div>

                    {/* Sidebar */}
                    <div className="lg:col-span-1">
                        <Card className="sticky top-24">
                            <Card.Header>
                                <Card.Title>Estado del Equipo</Card.Title>
                            </Card.Header>
                            <Card.Body>
                                <Select
                                    label="Estado"
                                    value={data.estado}
                                    onChange={(e) => setData('estado', e.target.value)}
                                    error={errors.estado}
                                    options={[
                                        { value: 'operativo', label: '✅ Operativo' },
                                        { value: 'mantenimiento', label: '🔧 En Mantenimiento' },
                                        { value: 'prestamo', label: '📤 En Préstamo' },
                                        { value: 'baja', label: '❌ Dado de Baja' },
                                    ]}
                                    required
                                />
                            </Card.Body>
                            <Card.Footer>
                                <Button
                                    type="button"
                                    variant="secondary"
                                    href={route('equipos.index')}
                                >
                                    Cancelar
                                </Button>
                                <Button type="submit" disabled={processing}>
                                    {processing ? 'Guardando...' : 'Guardar'}
                                </Button>
                            </Card.Footer>
                        </Card>
                    </div>
                </div>
            </form>
        </AppLayout>
    );
}
