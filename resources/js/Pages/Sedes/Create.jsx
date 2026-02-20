import { Head, useForm, Link } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import { Button, Card, Input, Select, Textarea } from '@/Components/UI';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';

export default function SedesCreate() {
    const { data, setData, post, processing, errors } = useForm({
        nombre: '',
        ciudad: '',
        direccion: '',
        encargado: '',
        telefono: '',
        email: '',
        tipo: 'proyecto',
        activo: true,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('sedes.store'));
    };

    return (
        <AppLayout>
            <Head title="Nueva Sede" />

            {/* Header */}
            <div className="mb-6">
                <Link
                    href={route('sedes.index')}
                    className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700 mb-4"
                >
                    <ArrowLeftIcon className="h-4 w-4" />
                    Volver a sedes
                </Link>
                <h1 className="text-2xl font-bold text-gray-900">Nueva Sede</h1>
                <p className="mt-1 text-sm text-gray-500">
                    Registra una nueva ubicación o proyecto
                </p>
            </div>

            <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                    {/* Main Form */}
                    <div className="lg:col-span-2">
                        <Card>
                            <Card.Header>
                                <Card.Title>Información de la Sede</Card.Title>
                                <Card.Description>
                                    Datos básicos de identificación
                                </Card.Description>
                            </Card.Header>
                            <Card.Body>
                                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                                    <div className="sm:col-span-2">
                                        <Input
                                            label="Nombre de la Sede"
                                            value={data.nombre}
                                            onChange={(e) => setData('nombre', e.target.value)}
                                            error={errors.nombre}
                                            placeholder="Ej: Proyecto Canta, Oficina Central..."
                                            required
                                        />
                                    </div>
                                    <Input
                                        label="Ciudad"
                                        value={data.ciudad}
                                        onChange={(e) => setData('ciudad', e.target.value)}
                                        error={errors.ciudad}
                                        placeholder="Ej: Lima, Canta..."
                                        required
                                    />
                                    <Select
                                        label="Tipo de Sede"
                                        value={data.tipo}
                                        onChange={(e) => setData('tipo', e.target.value)}
                                        error={errors.tipo}
                                        options={[
                                            { value: 'oficina', label: 'Oficina' },
                                            { value: 'proyecto', label: 'Proyecto' },
                                            { value: 'almacen', label: 'Almacén' },
                                        ]}
                                        required
                                    />
                                    <div className="sm:col-span-2">
                                        <Input
                                            label="Dirección"
                                            value={data.direccion}
                                            onChange={(e) => setData('direccion', e.target.value)}
                                            error={errors.direccion}
                                            placeholder="Dirección completa..."
                                        />
                                    </div>
                                </div>
                            </Card.Body>
                        </Card>

                        <Card className="mt-6">
                            <Card.Header>
                                <Card.Title>Contacto</Card.Title>
                                <Card.Description>
                                    Información de la persona responsable
                                </Card.Description>
                            </Card.Header>
                            <Card.Body>
                                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                                    <div className="sm:col-span-2">
                                        <Input
                                            label="Encargado"
                                            value={data.encargado}
                                            onChange={(e) => setData('encargado', e.target.value)}
                                            error={errors.encargado}
                                            placeholder="Nombre del responsable..."
                                        />
                                    </div>
                                    <Input
                                        label="Teléfono"
                                        value={data.telefono}
                                        onChange={(e) => setData('telefono', e.target.value)}
                                        error={errors.telefono}
                                        placeholder="Ej: 999-888-777"
                                    />
                                    <Input
                                        type="email"
                                        label="Correo Electrónico"
                                        value={data.email}
                                        onChange={(e) => setData('email', e.target.value)}
                                        error={errors.email}
                                        placeholder="correo@ejemplo.com"
                                    />
                                </div>
                            </Card.Body>
                        </Card>
                    </div>

                    {/* Sidebar */}
                    <div className="lg:col-span-1">
                        <Card>
                            <Card.Header>
                                <Card.Title>Estado</Card.Title>
                            </Card.Header>
                            <Card.Body>
                                <div className="flex items-center gap-3">
                                    <label className="relative inline-flex cursor-pointer items-center">
                                        <input
                                            type="checkbox"
                                            checked={data.activo}
                                            onChange={(e) => setData('activo', e.target.checked)}
                                            className="peer sr-only"
                                        />
                                        <div className="h-6 w-11 rounded-full bg-gray-200 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-amber-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-amber-300"></div>
                                    </label>
                                    <span className="text-sm font-medium text-gray-700">
                                        {data.activo ? 'Sede Activa' : 'Sede Inactiva'}
                                    </span>
                                </div>
                                <p className="mt-2 text-sm text-gray-500">
                                    Las sedes inactivas no aparecerán en las opciones de traslado.
                                </p>
                            </Card.Body>
                            <Card.Footer>
                                <Button
                                    type="button"
                                    variant="secondary"
                                    href={route('sedes.index')}
                                >
                                    Cancelar
                                </Button>
                                <Button type="submit" disabled={processing}>
                                    {processing ? 'Guardando...' : 'Guardar Sede'}
                                </Button>
                            </Card.Footer>
                        </Card>
                    </div>
                </div>
            </form>
        </AppLayout>
    );
}
