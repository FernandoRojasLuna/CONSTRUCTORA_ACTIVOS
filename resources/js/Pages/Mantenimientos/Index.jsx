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
import ExportDropdown from '@/Components/ExportDropdown';
import {
    WrenchScrewdriverIcon,
    MagnifyingGlassIcon,
    CalendarIcon,
    CurrencyDollarIcon,
    PlusIcon,
    EyeIcon,
    PencilSquareIcon,
    FunnelIcon,
    ClockIcon,
    CheckCircleIcon,
    ExclamationTriangleIcon,
} from '@heroicons/react/24/outline';

export default function MantenimientosIndex({ mantenimientos, equipos, filters = {} }) {
    const searchForm = useForm({
        equipo_id: filters.equipo_id || '',
        tipo: filters.tipo || '',
        estado: filters.estado || '',
        fecha_desde: filters.fecha_desde || '',
        fecha_hasta: filters.fecha_hasta || '',
    });

    const handleSearch = (e) => {
        e.preventDefault();
        router.get(route('mantenimientos.index'), searchForm.data, {
            preserveState: true,
            preserveScroll: true,
        });
    };

    const clearFilters = () => {
        router.get(route('mantenimientos.index'));
    };

    const hasFilters = Object.values(filters).some((v) => v);

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
        preventivo: 'Preventivo',
        correctivo: 'Correctivo',
        calibracion: 'Calibración',
    };

    // Stats
    const stats = {
        total: mantenimientos.total || mantenimientos.data?.length || 0,
        pendientes: mantenimientos.data?.filter((m) => m.estado === 'pendiente').length || 0,
        enProceso: mantenimientos.data?.filter((m) => m.estado === 'en_proceso').length || 0,
        completados: mantenimientos.data?.filter((m) => m.estado === 'completado').length || 0,
    };

    return (
        <AppLayout>
            <Head title="Mantenimientos" />

            {/* Header */}
            <div className="mb-6 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Mantenimientos</h1>
                    <p className="text-gray-600">
                        Gestión de servicios técnicos y calibraciones
                    </p>
                </div>
                <div className="flex gap-2">
                    <ExportDropdown
                        excelUrl={route('mantenimientos.export.excel')}
                        pdfUrl={route('mantenimientos.export.pdf')}
                        filters={filters}
                    />
                    <Button href={route('mantenimientos.create')}>
                        <PlusIcon className="h-5 w-5" />
                        Nuevo Mantenimiento
                    </Button>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-4 mb-6">
                <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
                    <div className="flex items-center gap-3">
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-500">
                            <WrenchScrewdriverIcon className="h-6 w-6 text-white" />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-purple-600">Total</p>
                            <p className="text-2xl font-bold text-purple-900">{stats.total}</p>
                        </div>
                    </div>
                </Card>
                <Card className="bg-gradient-to-br from-yellow-50 to-yellow-100 border-yellow-200">
                    <div className="flex items-center gap-3">
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-yellow-500">
                            <ExclamationTriangleIcon className="h-6 w-6 text-white" />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-yellow-600">Pendientes</p>
                            <p className="text-2xl font-bold text-yellow-900">{stats.pendientes}</p>
                        </div>
                    </div>
                </Card>
                <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
                    <div className="flex items-center gap-3">
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500">
                            <ClockIcon className="h-6 w-6 text-white" />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-blue-600">En Proceso</p>
                            <p className="text-2xl font-bold text-blue-900">{stats.enProceso}</p>
                        </div>
                    </div>
                </Card>
                <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
                    <div className="flex items-center gap-3">
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-500">
                            <CheckCircleIcon className="h-6 w-6 text-white" />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-green-600">Completados</p>
                            <p className="text-2xl font-bold text-green-900">{stats.completados}</p>
                        </div>
                    </div>
                </Card>
            </div>

            {/* Filters */}
            <Card className="mb-6">
                <form onSubmit={handleSearch}>
                    <div className="flex items-center gap-2 mb-4">
                        <FunnelIcon className="h-5 w-5 text-gray-400" />
                        <span className="font-medium text-gray-700">Filtros</span>
                    </div>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
                        <Select
                            label="Equipo"
                            value={searchForm.data.equipo_id}
                            onChange={(e) => searchForm.setData('equipo_id', e.target.value)}
                            placeholder="Todos"
                            options={equipos.map((e) => ({
                                value: e.id.toString(),
                                label: `${e.codigo_interno} - ${e.marca}`,
                            }))}
                        />
                        <Select
                            label="Tipo"
                            value={searchForm.data.tipo}
                            onChange={(e) => searchForm.setData('tipo', e.target.value)}
                            placeholder="Todos"
                            options={[
                                { value: 'preventivo', label: 'Preventivo' },
                                { value: 'correctivo', label: 'Correctivo' },
                                { value: 'calibracion', label: 'Calibración' },
                            ]}
                        />
                        <Select
                            label="Estado"
                            value={searchForm.data.estado}
                            onChange={(e) => searchForm.setData('estado', e.target.value)}
                            placeholder="Todos"
                            options={[
                                { value: 'pendiente', label: 'Pendiente' },
                                { value: 'en_proceso', label: 'En Proceso' },
                                { value: 'completado', label: 'Completado' },
                                { value: 'cancelado', label: 'Cancelado' },
                            ]}
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
                            <Table.Header>Equipo</Table.Header>
                            <Table.Header>Tipo</Table.Header>
                            <Table.Header>Descripción</Table.Header>
                            <Table.Header>Fecha Inicio</Table.Header>
                            <Table.Header>Costo</Table.Header>
                            <Table.Header>Estado</Table.Header>
                            <Table.Header>Acciones</Table.Header>
                        </Table.Row>
                    </Table.Head>
                    <Table.Body>
                        {mantenimientos.data?.length > 0 ? (
                            mantenimientos.data.map((mant) => (
                                <Table.Row key={mant.id}>
                                    <Table.Cell>
                                        <div>
                                            <p className="font-medium text-gray-900">
                                                {mant.equipo?.codigo_interno}
                                            </p>
                                            <p className="text-sm text-gray-500">
                                                {mant.equipo?.marca} {mant.equipo?.modelo}
                                            </p>
                                        </div>
                                    </Table.Cell>
                                    <Table.Cell>
                                        <Badge
                                            variant={
                                                mant.tipo === 'preventivo'
                                                    ? 'info'
                                                    : mant.tipo === 'correctivo'
                                                    ? 'warning'
                                                    : 'primary'
                                            }
                                        >
                                            {tipoLabels[mant.tipo]}
                                        </Badge>
                                    </Table.Cell>
                                    <Table.Cell>
                                        <span className="text-gray-600 truncate max-w-xs block">
                                            {mant.descripcion}
                                        </span>
                                    </Table.Cell>
                                    <Table.Cell>
                                        <div className="flex items-center gap-2">
                                            <CalendarIcon className="h-4 w-4 text-gray-400" />
                                            <span>
                                                {new Date(mant.fecha_inicio).toLocaleDateString('es-PE')}
                                            </span>
                                        </div>
                                    </Table.Cell>
                                    <Table.Cell>
                                        {mant.costo ? (
                                            <div className="flex items-center gap-1">
                                                <CurrencyDollarIcon className="h-4 w-4 text-gray-400" />
                                                <span className="font-medium">
                                                    S/ {parseFloat(mant.costo).toLocaleString('es-PE')}
                                                </span>
                                            </div>
                                        ) : (
                                            <span className="text-gray-400">—</span>
                                        )}
                                    </Table.Cell>
                                    <Table.Cell>
                                        <Badge variant={estadoColors[mant.estado]}>
                                            {estadoLabels[mant.estado]}
                                        </Badge>
                                    </Table.Cell>
                                    <Table.Cell>
                                        <div className="flex items-center gap-1">
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                href={route('mantenimientos.show', mant.id)}
                                            >
                                                <EyeIcon className="h-4 w-4" />
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                href={route('mantenimientos.edit', mant.id)}
                                            >
                                                <PencilSquareIcon className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </Table.Cell>
                                </Table.Row>
                            ))
                        ) : (
                            <Table.Row>
                                <Table.Cell colSpan={7}>
                                    <div className="py-12 text-center">
                                        <WrenchScrewdriverIcon className="h-12 w-12 mx-auto text-gray-300 mb-4" />
                                        <p className="text-gray-500">
                                            No hay mantenimientos registrados
                                        </p>
                                        <Button
                                            href={route('mantenimientos.create')}
                                            size="sm"
                                            className="mt-4"
                                        >
                                            Registrar primer mantenimiento
                                        </Button>
                                    </div>
                                </Table.Cell>
                            </Table.Row>
                        )}
                    </Table.Body>
                </Table>

                {/* Pagination */}
                {mantenimientos.links && mantenimientos.data?.length > 0 && (
                    <div className="border-t border-gray-200 px-4 py-3">
                        <Pagination links={mantenimientos.links} />
                    </div>
                )}
            </Card>
        </AppLayout>
    );
}
