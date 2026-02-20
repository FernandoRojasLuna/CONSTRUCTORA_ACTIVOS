import { useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import { Button, Card, Table, Badge, Pagination, Select } from '@/Components/UI';
import ExportDropdown from '@/Components/ExportDropdown';
import {
    PlusIcon,
    PencilSquareIcon,
    TrashIcon,
    EyeIcon,
    MagnifyingGlassIcon,
    ComputerDesktopIcon,
    MapPinIcon,
    FunnelIcon,
    TruckIcon,
} from '@heroicons/react/24/outline';

export default function EquiposIndex({ equipos, sedes, filters }) {
    const [search, setSearch] = useState(filters.search || '');
    const [tipo, setTipo] = useState(filters.tipo || '');
    const [subtipo, setSubtipo] = useState(filters.subtipo || '');
    const [estado, setEstado] = useState(filters.estado || '');
    const [sedeId, setSedeId] = useState(filters.sede_id || '');

    const tipoLabels = {
        computo: 'Cómputo',
        topografia: 'Topografía',
    };

    const subtipoLabels = {
        laptop: 'Laptop',
        pc: 'PC Escritorio',
        impresora: 'Impresora',
        estacion_total: 'Estación Total',
        gps: 'GPS',
        nivel: 'Nivel',
    };

    const estadoLabels = {
        operativo: 'Operativo',
        mantenimiento: 'En Mantenimiento',
        baja: 'Dado de Baja',
        prestamo: 'En Préstamo',
    };

    const estadoColors = {
        operativo: 'success',
        mantenimiento: 'warning',
        baja: 'danger',
        prestamo: 'info',
    };

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

    const getSubtiposOptions = () => {
        if (tipo === 'computo') return subtiposComputo;
        if (tipo === 'topografia') return subtiposTopografia;
        return [...subtiposComputo, ...subtiposTopografia];
    };

    const handleSearch = (e) => {
        e.preventDefault();
        router.get(
            route('equipos.index'),
            { search, tipo, subtipo, estado, sede_id: sedeId },
            { preserveState: true, preserveScroll: true }
        );
    };

    const clearFilters = () => {
        setSearch('');
        setTipo('');
        setSubtipo('');
        setEstado('');
        setSedeId('');
        router.get(route('equipos.index'));
    };

    const handleDelete = (equipo) => {
        if (confirm(`¿Estás seguro de eliminar el equipo "${equipo.codigo_interno}"?`)) {
            router.delete(route('equipos.destroy', equipo.id));
        }
    };

    // Título dinámico según filtro
    const getTitle = () => {
        if (tipo === 'computo') return 'Equipos de Cómputo';
        if (tipo === 'topografia') return 'Equipos de Topografía';
        return 'Todos los Equipos';
    };

    return (
        <AppLayout>
            <Head title={getTitle()} />

            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">{getTitle()}</h1>
                    <p className="mt-1 text-sm text-gray-500">
                        {tipo === 'computo' && 'Laptops, PCs e Impresoras'}
                        {tipo === 'topografia' && 'Estaciones Totales, GPS y Niveles'}
                        {!tipo && 'Gestiona todos los activos de la empresa'}
                    </p>
                </div>
                <div className="flex gap-2">
                    <ExportDropdown
                        excelUrl={route('equipos.export.excel')}
                        pdfUrl={route('equipos.export.pdf')}
                        filters={{ tipo, subtipo, estado, sede_id: sedeId, search }}
                    />
                    <Button href={route('equipos.create', { tipo: tipo || 'computo' })}>
                        <PlusIcon className="h-5 w-5" />
                        Nuevo Equipo
                    </Button>
                </div>
            </div>

            {/* Quick Filters Tabs */}
            <div className="mb-6 border-b border-gray-200">
                <nav className="-mb-px flex space-x-8">
                    <Link
                        href={route('equipos.index')}
                        className={`whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium ${
                            !tipo
                                ? 'border-amber-500 text-amber-600'
                                : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                        }`}
                    >
                        Todos
                        <span className="ml-2 rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-900">
                            {equipos.total || equipos.data?.length || 0}
                        </span>
                    </Link>
                    <Link
                        href={route('equipos.index', { tipo: 'computo' })}
                        className={`whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium ${
                            tipo === 'computo'
                                ? 'border-amber-500 text-amber-600'
                                : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                        }`}
                    >
                        <ComputerDesktopIcon className="inline h-4 w-4 mr-1.5" />
                        Cómputo
                    </Link>
                    <Link
                        href={route('equipos.index', { tipo: 'topografia' })}
                        className={`whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium ${
                            tipo === 'topografia'
                                ? 'border-amber-500 text-amber-600'
                                : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                        }`}
                    >
                        <MapPinIcon className="inline h-4 w-4 mr-1.5" />
                        Topografía
                    </Link>
                </nav>
            </div>

            {/* Filters */}
            <Card className="mb-6">
                <form onSubmit={handleSearch}>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-5">
                        <div className="sm:col-span-2">
                            <div className="relative">
                                <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                                <input
                                    type="text"
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    placeholder="Buscar por código, serie, marca..."
                                    className="w-full rounded-lg border-gray-300 pl-10 text-sm focus:border-amber-500 focus:ring-amber-500"
                                />
                            </div>
                        </div>
                        <Select
                            value={subtipo}
                            onChange={(e) => setSubtipo(e.target.value)}
                            placeholder="Todos los subtipos"
                            options={getSubtiposOptions()}
                        />
                        <Select
                            value={estado}
                            onChange={(e) => setEstado(e.target.value)}
                            placeholder="Todos los estados"
                            options={[
                                { value: 'operativo', label: 'Operativo' },
                                { value: 'mantenimiento', label: 'En Mantenimiento' },
                                { value: 'baja', label: 'Dado de Baja' },
                                { value: 'prestamo', label: 'En Préstamo' },
                            ]}
                        />
                        <Select
                            value={sedeId}
                            onChange={(e) => setSedeId(e.target.value)}
                            placeholder="Todas las sedes"
                            options={sedes.map((s) => ({ value: s.id.toString(), label: s.nombre }))}
                        />
                    </div>
                    <div className="mt-4 flex items-center gap-3">
                        <Button type="submit" size="sm">
                            <FunnelIcon className="h-4 w-4" />
                            Filtrar
                        </Button>
                        <Button type="button" variant="ghost" size="sm" onClick={clearFilters}>
                            Limpiar filtros
                        </Button>
                    </div>
                </form>
            </Card>

            {/* Table */}
            <Table>
                <Table.Head>
                    <Table.Row>
                        <Table.Header>Equipo</Table.Header>
                        <Table.Header>Tipo</Table.Header>
                        <Table.Header>Sede Actual</Table.Header>
                        <Table.Header>Responsable</Table.Header>
                        <Table.Header align="center">Estado</Table.Header>
                        <Table.Header align="right">Acciones</Table.Header>
                    </Table.Row>
                </Table.Head>
                <Table.Body>
                    {equipos.data?.length > 0 ? (
                        equipos.data.map((equipo) => (
                            <Table.Row key={equipo.id}>
                                <Table.Cell>
                                    <div className="flex items-center gap-3">
                                        <div
                                            className={`flex h-10 w-10 items-center justify-center rounded-lg ${
                                                equipo.tipo === 'computo' ? 'bg-blue-100' : 'bg-green-100'
                                            }`}
                                        >
                                            {equipo.tipo === 'computo' ? (
                                                <ComputerDesktopIcon
                                                    className={`h-5 w-5 ${
                                                        equipo.tipo === 'computo' ? 'text-blue-600' : 'text-green-600'
                                                    }`}
                                                />
                                            ) : (
                                                <MapPinIcon className="h-5 w-5 text-green-600" />
                                            )}
                                        </div>
                                        <div>
                                            <p className="font-semibold text-gray-900">{equipo.codigo_interno}</p>
                                            <p className="text-xs text-gray-500">
                                                {equipo.marca} {equipo.modelo}
                                            </p>
                                            <p className="text-xs text-gray-400">S/N: {equipo.serie}</p>
                                        </div>
                                    </div>
                                </Table.Cell>
                                <Table.Cell>
                                    <Badge variant={equipo.tipo === 'computo' ? 'info' : 'success'}>
                                        {subtipoLabels[equipo.subtipo] || equipo.subtipo}
                                    </Badge>
                                </Table.Cell>
                                <Table.Cell>
                                    <div className="flex items-center gap-1.5">
                                        <MapPinIcon className="h-4 w-4 text-gray-400" />
                                        <span>{equipo.sede?.nombre || '—'}</span>
                                    </div>
                                </Table.Cell>
                                <Table.Cell>{equipo.responsable_actual || '—'}</Table.Cell>
                                <Table.Cell align="center">
                                    <Badge variant={estadoColors[equipo.estado]}>
                                        {estadoLabels[equipo.estado]}
                                    </Badge>
                                </Table.Cell>
                                <Table.Cell align="right">
                                    <div className="flex items-center justify-end gap-1">
                                        <Button
                                            href={route('equipos.show', equipo.id)}
                                            variant="ghost"
                                            size="xs"
                                            title="Ver detalles"
                                        >
                                            <EyeIcon className="h-4 w-4" />
                                        </Button>
                                        <Button
                                            href={route('traslados.create', { equipo_id: equipo.id })}
                                            variant="ghost"
                                            size="xs"
                                            title="Trasladar"
                                            className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                                        >
                                            <TruckIcon className="h-4 w-4" />
                                        </Button>
                                        <Button
                                            href={route('equipos.edit', equipo.id)}
                                            variant="ghost"
                                            size="xs"
                                            title="Editar"
                                        >
                                            <PencilSquareIcon className="h-4 w-4" />
                                        </Button>
                                        <Button
                                            variant="ghost"
                                            size="xs"
                                            onClick={() => handleDelete(equipo)}
                                            className="text-red-600 hover:text-red-700 hover:bg-red-50"
                                            title="Eliminar"
                                        >
                                            <TrashIcon className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </Table.Cell>
                            </Table.Row>
                        ))
                    ) : (
                        <Table.Empty colSpan={6} message="No se encontraron equipos" />
                    )}
                </Table.Body>
            </Table>

            {/* Pagination */}
            <div className="mt-4">
                <Pagination links={equipos.links} meta={equipos.meta || equipos} />
            </div>
        </AppLayout>
    );
}
