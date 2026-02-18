import { Head, Link, useForm, router } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import {
    Button,
    Card,
    Input,
    Select,
    Badge,
    Table,
    Pagination,
} from '@/Components/UI';
import {
    TruckIcon,
    MagnifyingGlassIcon,
    ArrowsRightLeftIcon,
    CalendarIcon,
    BuildingOfficeIcon,
    UserIcon,
    EyeIcon,
    FunnelIcon,
    PlusIcon,
} from '@heroicons/react/24/outline';

export default function TrasladosIndex({ traslados, equipos, sedes, filters = {} }) {
    const searchForm = useForm({
        equipo_id: filters.equipo_id || '',
        sede_origen_id: filters.sede_origen_id || '',
        sede_destino_id: filters.sede_destino_id || '',
        fecha_desde: filters.fecha_desde || '',
        fecha_hasta: filters.fecha_hasta || '',
    });

    const handleSearch = (e) => {
        e.preventDefault();
        router.get(route('traslados.index'), searchForm.data, {
            preserveState: true,
            preserveScroll: true,
        });
    };

    const clearFilters = () => {
        router.get(route('traslados.index'));
    };

    const hasFilters = Object.values(filters).some((v) => v);

    return (
        <AppLayout>
            <Head title="Traslados" />

            {/* Header */}
            <div className="mb-6 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Traslados</h1>
                    <p className="text-gray-600">
                        Historial de movimientos de equipos entre sedes
                    </p>
                </div>
                <Button href={route('traslados.create')}>
                    <PlusIcon className="h-5 w-5" />
                    Nuevo Traslado
                </Button>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-4 mb-6">
                <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
                    <div className="flex items-center gap-3">
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500">
                            <TruckIcon className="h-6 w-6 text-white" />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-blue-600">Total Traslados</p>
                            <p className="text-2xl font-bold text-blue-900">
                                {traslados.total || traslados.data?.length || 0}
                            </p>
                        </div>
                    </div>
                </Card>
                <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
                    <div className="flex items-center gap-3">
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-500">
                            <CalendarIcon className="h-6 w-6 text-white" />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-green-600">Este Mes</p>
                            <p className="text-2xl font-bold text-green-900">
                                {traslados.data?.filter(
                                    (t) =>
                                        new Date(t.fecha_traslado).getMonth() === new Date().getMonth()
                                ).length || 0}
                            </p>
                        </div>
                    </div>
                </Card>
                <Card className="bg-gradient-to-br from-amber-50 to-amber-100 border-amber-200">
                    <div className="flex items-center gap-3">
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-500">
                            <BuildingOfficeIcon className="h-6 w-6 text-white" />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-amber-600">Sedes Activas</p>
                            <p className="text-2xl font-bold text-amber-900">{sedes.length}</p>
                        </div>
                    </div>
                </Card>
                <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
                    <div className="flex items-center gap-3">
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-500">
                            <ArrowsRightLeftIcon className="h-6 w-6 text-white" />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-purple-600">Equipos Trasladados</p>
                            <p className="text-2xl font-bold text-purple-900">{equipos.length}</p>
                        </div>
                    </div>
                </Card>
            </div>

            {/* Filters */}
            <Card className="mb-6">
                <form onSubmit={handleSearch}>
                    <div className="flex items-center gap-2 mb-4">
                        <FunnelIcon className="h-5 w-5 text-gray-400" />
                        <span className="font-medium text-gray-700">Filtros de Búsqueda</span>
                    </div>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
                        <Select
                            label="Equipo"
                            value={searchForm.data.equipo_id}
                            onChange={(e) => searchForm.setData('equipo_id', e.target.value)}
                            placeholder="Todos los equipos"
                            options={equipos.map((e) => ({
                                value: e.id.toString(),
                                label: `${e.codigo_interno} - ${e.marca}`,
                            }))}
                        />
                        <Select
                            label="Sede Origen"
                            value={searchForm.data.sede_origen_id}
                            onChange={(e) => searchForm.setData('sede_origen_id', e.target.value)}
                            placeholder="Todas las sedes"
                            options={sedes.map((s) => ({
                                value: s.id.toString(),
                                label: s.nombre,
                            }))}
                        />
                        <Select
                            label="Sede Destino"
                            value={searchForm.data.sede_destino_id}
                            onChange={(e) => searchForm.setData('sede_destino_id', e.target.value)}
                            placeholder="Todas las sedes"
                            options={sedes.map((s) => ({
                                value: s.id.toString(),
                                label: s.nombre,
                            }))}
                        />
                        <Input
                            label="Desde"
                            type="date"
                            value={searchForm.data.fecha_desde}
                            onChange={(e) => searchForm.setData('fecha_desde', e.target.value)}
                        />
                        <Input
                            label="Hasta"
                            type="date"
                            value={searchForm.data.fecha_hasta}
                            onChange={(e) => searchForm.setData('fecha_hasta', e.target.value)}
                        />
                    </div>
                    <div className="mt-4 flex items-center gap-2">
                        <Button type="submit" size="sm">
                            <MagnifyingGlassIcon className="h-4 w-4" />
                            Buscar
                        </Button>
                        {hasFilters && (
                            <Button type="button" variant="ghost" size="sm" onClick={clearFilters}>
                                Limpiar
                            </Button>
                        )}
                    </div>
                </form>
            </Card>

            {/* Table */}
            <Card padding={false}>
                <Table>
                    <Table.Head>
                        <Table.Row>
                            <Table.Header>Fecha</Table.Header>
                            <Table.Header>Equipo</Table.Header>
                            <Table.Header>Origen</Table.Header>
                            <Table.Header>Destino</Table.Header>
                            <Table.Header>Motivo</Table.Header>
                            <Table.Header>Registrado por</Table.Header>
                            <Table.Header>Acciones</Table.Header>
                        </Table.Row>
                    </Table.Head>
                    <Table.Body>
                        {traslados.data?.length > 0 ? (
                            traslados.data.map((traslado) => (
                                <Table.Row key={traslado.id}>
                                    <Table.Cell>
                                        <div className="flex items-center gap-2">
                                            <CalendarIcon className="h-4 w-4 text-gray-400" />
                                            <span className="font-medium">
                                                {new Date(traslado.fecha_traslado).toLocaleDateString(
                                                    'es-PE',
                                                    {
                                                        day: '2-digit',
                                                        month: 'short',
                                                        year: 'numeric',
                                                    }
                                                )}
                                            </span>
                                        </div>
                                    </Table.Cell>
                                    <Table.Cell>
                                        <div>
                                            <p className="font-medium text-gray-900">
                                                {traslado.equipo?.codigo_interno}
                                            </p>
                                            <p className="text-sm text-gray-500">
                                                {traslado.equipo?.marca} {traslado.equipo?.modelo}
                                            </p>
                                        </div>
                                    </Table.Cell>
                                    <Table.Cell>
                                        <Badge variant="secondary">
                                            {traslado.sede_origen?.nombre}
                                        </Badge>
                                    </Table.Cell>
                                    <Table.Cell>
                                        <Badge variant="primary">
                                            {traslado.sede_destino?.nombre}
                                        </Badge>
                                    </Table.Cell>
                                    <Table.Cell>
                                        <span className="text-gray-600 truncate max-w-xs block">
                                            {traslado.motivo}
                                        </span>
                                    </Table.Cell>
                                    <Table.Cell>
                                        <div className="flex items-center gap-2">
                                            <UserIcon className="h-4 w-4 text-gray-400" />
                                            <span className="text-sm">{traslado.usuario?.name}</span>
                                        </div>
                                    </Table.Cell>
                                    <Table.Cell>
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            href={route('traslados.show', traslado.id)}
                                        >
                                            <EyeIcon className="h-4 w-4" />
                                        </Button>
                                    </Table.Cell>
                                </Table.Row>
                            ))
                        ) : (
                            <Table.Row>
                                <Table.Cell colSpan={7}>
                                    <div className="py-12 text-center">
                                        <TruckIcon className="h-12 w-12 mx-auto text-gray-300 mb-4" />
                                        <p className="text-gray-500">No hay traslados registrados</p>
                                        <Button
                                            href={route('traslados.create')}
                                            size="sm"
                                            className="mt-4"
                                        >
                                            Registrar primer traslado
                                        </Button>
                                    </div>
                                </Table.Cell>
                            </Table.Row>
                        )}
                    </Table.Body>
                </Table>

                {/* Pagination */}
                {traslados.links && traslados.data?.length > 0 && (
                    <div className="border-t border-gray-200 px-4 py-3">
                        <Pagination links={traslados.links} />
                    </div>
                )}
            </Card>
        </AppLayout>
    );
}
