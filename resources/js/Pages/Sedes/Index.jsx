import { useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import { Button, Card, Table, Badge, Pagination, Input, Select } from '@/Components/UI';
import ExportDropdown from '@/Components/ExportDropdown';
import {
    PlusIcon,
    PencilSquareIcon,
    TrashIcon,
    EyeIcon,
    MagnifyingGlassIcon,
    BuildingOfficeIcon,
    MapPinIcon,
    FunnelIcon,
} from '@heroicons/react/24/outline';

export default function SedesIndex({ sedes, filters }) {
    const [search, setSearch] = useState(filters.search || '');
    const [tipo, setTipo] = useState(filters.tipo || '');
    const [activo, setActivo] = useState(filters.activo || '');

    const tipoLabels = {
        oficina: 'Oficina',
        proyecto: 'Proyecto',
        almacen: 'Almacén',
    };

    const tipoColors = {
        oficina: 'primary',
        proyecto: 'success',
        almacen: 'info',
    };

    const handleSearch = (e) => {
        e.preventDefault();
        router.get(
            route('sedes.index'),
            { search, tipo, activo },
            { preserveState: true, preserveScroll: true }
        );
    };

    const clearFilters = () => {
        setSearch('');
        setTipo('');
        setActivo('');
        router.get(route('sedes.index'));
    };

    const handleDelete = (sede) => {
        if (confirm(`¿Estás seguro de eliminar la sede "${sede.nombre}"?`)) {
            router.delete(route('sedes.destroy', sede.id));
        }
    };

    return (
        <AppLayout>
            <Head title="Sedes" />

            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Sedes</h1>
                    <p className="mt-1 text-sm text-gray-500">
                        Gestiona las ubicaciones y proyectos de la constructora
                    </p>
                </div>
                <div className="flex gap-2">
                    <ExportDropdown
                        excelUrl={route('sedes.export.excel')}
                        pdfUrl={route('sedes.export.pdf')}
                        filters={{ tipo, search }}
                    />
                    <Button href={route('sedes.create')}>
                        <PlusIcon className="h-5 w-5" />
                        Nueva Sede
                    </Button>
                </div>
            </div>

            {/* Filters */}
            <Card className="mb-6">
                <form onSubmit={handleSearch}>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-4">
                        <div className="sm:col-span-2">
                            <div className="relative">
                                <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                                <input
                                    type="text"
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    placeholder="Buscar por nombre, ciudad o encargado..."
                                    className="w-full rounded-lg border-gray-300 pl-10 text-sm focus:border-amber-500 focus:ring-amber-500"
                                />
                            </div>
                        </div>
                        <Select
                            value={tipo}
                            onChange={(e) => setTipo(e.target.value)}
                            placeholder="Todos los tipos"
                            options={[
                                { value: 'oficina', label: 'Oficina' },
                                { value: 'proyecto', label: 'Proyecto' },
                                { value: 'almacen', label: 'Almacén' },
                            ]}
                        />
                        <Select
                            value={activo}
                            onChange={(e) => setActivo(e.target.value)}
                            placeholder="Todos los estados"
                            options={[
                                { value: 'true', label: 'Activas' },
                                { value: 'false', label: 'Inactivas' },
                            ]}
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
                        <Table.Header>Sede</Table.Header>
                        <Table.Header>Ciudad</Table.Header>
                        <Table.Header>Tipo</Table.Header>
                        <Table.Header>Encargado</Table.Header>
                        <Table.Header align="center">Equipos</Table.Header>
                        <Table.Header align="center">Estado</Table.Header>
                        <Table.Header align="right">Acciones</Table.Header>
                    </Table.Row>
                </Table.Head>
                <Table.Body>
                    {sedes.data.length > 0 ? (
                        sedes.data.map((sede) => (
                            <Table.Row key={sede.id}>
                                <Table.Cell>
                                    <div className="flex items-center gap-3">
                                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-100">
                                            <BuildingOfficeIcon className="h-5 w-5 text-amber-600" />
                                        </div>
                                        <div>
                                            <p className="font-medium text-gray-900">{sede.nombre}</p>
                                            {sede.direccion && (
                                                <p className="text-sm text-gray-500 truncate max-w-xs">
                                                    {sede.direccion}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                </Table.Cell>
                                <Table.Cell>
                                    <div className="flex items-center gap-1.5">
                                        <MapPinIcon className="h-4 w-4 text-gray-400" />
                                        {sede.ciudad}
                                    </div>
                                </Table.Cell>
                                <Table.Cell>
                                    <Badge variant={tipoColors[sede.tipo]}>
                                        {tipoLabels[sede.tipo]}
                                    </Badge>
                                </Table.Cell>
                                <Table.Cell>{sede.encargado || '—'}</Table.Cell>
                                <Table.Cell align="center">
                                    <span className="inline-flex items-center justify-center rounded-full bg-gray-100 px-3 py-1 text-sm font-semibold text-gray-800">
                                        {sede.equipos_count || 0}
                                    </span>
                                </Table.Cell>
                                <Table.Cell align="center">
                                    <Badge variant={sede.activo ? 'success' : 'danger'}>
                                        {sede.activo ? 'Activa' : 'Inactiva'}
                                    </Badge>
                                </Table.Cell>
                                <Table.Cell align="right">
                                    <div className="flex items-center justify-end gap-1">
                                        <Button
                                            href={route('sedes.show', sede.id)}
                                            variant="ghost"
                                            size="xs"
                                        >
                                            <EyeIcon className="h-4 w-4" />
                                        </Button>
                                        <Button
                                            href={route('sedes.edit', sede.id)}
                                            variant="ghost"
                                            size="xs"
                                        >
                                            <PencilSquareIcon className="h-4 w-4" />
                                        </Button>
                                        <Button
                                            variant="ghost"
                                            size="xs"
                                            onClick={() => handleDelete(sede)}
                                            className="text-red-600 hover:text-red-700 hover:bg-red-50"
                                        >
                                            <TrashIcon className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </Table.Cell>
                            </Table.Row>
                        ))
                    ) : (
                        <Table.Empty colSpan={7} message="No se encontraron sedes" />
                    )}
                </Table.Body>
            </Table>

            {/* Pagination */}
            <div className="mt-4">
                <Pagination links={sedes.links} meta={sedes.meta || sedes} />
            </div>
        </AppLayout>
    );
}
