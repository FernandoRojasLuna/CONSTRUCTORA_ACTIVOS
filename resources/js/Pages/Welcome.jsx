import { Head, Link } from '@inertiajs/react';
import { 
    BuildingOffice2Icon, 
    ComputerDesktopIcon, 
    MapPinIcon, 
    WrenchScrewdriverIcon,
    TruckIcon,
    DocumentChartBarIcon,
    ShieldCheckIcon,
    ArrowRightIcon
} from '@heroicons/react/24/outline';

export default function Welcome({ auth }) {
    const features = [
        {
            icon: ComputerDesktopIcon,
            title: 'Equipos de Cómputo',
            description: 'Gestiona laptops, desktops, impresoras, monitores y más.',
            color: 'bg-blue-500',
        },
        {
            icon: MapPinIcon,
            title: 'Equipos de Topografía',
            description: 'Control de estaciones totales, GPS, niveles y drones.',
            color: 'bg-green-500',
        },
        {
            icon: TruckIcon,
            title: 'Traslados',
            description: 'Registra y rastrea movimientos entre sedes y proyectos.',
            color: 'bg-purple-500',
        },
        {
            icon: WrenchScrewdriverIcon,
            title: 'Mantenimientos',
            description: 'Programa y da seguimiento a mantenimientos preventivos.',
            color: 'bg-orange-500',
        },
    ];

    return (
        <>
            <Head title="Sistema de Control de Activos" />
            
            <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
                {/* Header */}
                <header className="relative z-10">
                    <nav className="mx-auto max-w-7xl px-6 py-6 lg:px-8">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-500 shadow-lg shadow-amber-500/30">
                                    <BuildingOffice2Icon className="h-7 w-7 text-white" />
                                </div>
                                <div>
                                    <h1 className="text-xl font-bold text-white">Constructora</h1>
                                    <p className="text-xs text-slate-400">Control de Activos</p>
                                </div>
                            </div>
                            
                            <div className="flex items-center gap-4">
                                {auth.user ? (
                                    <Link
                                        href={route('dashboard')}
                                        className="inline-flex items-center gap-2 rounded-lg bg-amber-500 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-amber-500/30 transition hover:bg-amber-400"
                                    >
                                        Ir al Dashboard
                                        <ArrowRightIcon className="h-4 w-4" />
                                    </Link>
                                ) : (
                                    <Link
                                        href={route('login')}
                                        className="inline-flex items-center gap-2 rounded-lg bg-amber-500 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-amber-500/30 transition hover:bg-amber-400"
                                    >
                                        Iniciar Sesión
                                        <ArrowRightIcon className="h-4 w-4" />
                                    </Link>
                                )}
                            </div>
                        </div>
                    </nav>
                </header>

                {/* Hero Section */}
                <main className="relative">
                    {/* Background decoration */}
                    <div className="absolute inset-0 overflow-hidden">
                        <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-amber-500/10 blur-3xl"></div>
                        <div className="absolute top-60 -left-40 h-80 w-80 rounded-full bg-blue-500/10 blur-3xl"></div>
                    </div>

                    <div className="relative mx-auto max-w-7xl px-6 pt-16 pb-24 lg:px-8 lg:pt-24">
                        {/* Hero content */}
                        <div className="text-center">
                            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-amber-500/10 px-4 py-2 text-amber-400 ring-1 ring-amber-500/20">
                                <ShieldCheckIcon className="h-5 w-5" />
                                <span className="text-sm font-medium">Sistema Interno de Gestión</span>
                            </div>
                            
                            <h2 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
                                Control de Activos
                                <span className="block text-amber-500">Constructora</span>
                            </h2>
                            
                            <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-400">
                                Gestiona eficientemente todos los equipos de cómputo y topografía de la empresa. 
                                Controla traslados, mantenimientos y genera reportes detallados.
                            </p>

                            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
                                {auth.user ? (
                                    <Link
                                        href={route('dashboard')}
                                        className="inline-flex items-center gap-2 rounded-xl bg-amber-500 px-8 py-4 text-base font-semibold text-white shadow-xl shadow-amber-500/30 transition hover:bg-amber-400 hover:shadow-amber-500/40"
                                    >
                                        Acceder al Sistema
                                        <ArrowRightIcon className="h-5 w-5" />
                                    </Link>
                                ) : (
                                    <Link
                                        href={route('login')}
                                        className="inline-flex items-center gap-2 rounded-xl bg-amber-500 px-8 py-4 text-base font-semibold text-white shadow-xl shadow-amber-500/30 transition hover:bg-amber-400 hover:shadow-amber-500/40"
                                    >
                                        Iniciar Sesión
                                        <ArrowRightIcon className="h-5 w-5" />
                                    </Link>
                                )}
                            </div>
                        </div>

                        {/* Features Grid */}
                        <div className="mt-24">
                            <h3 className="text-center text-lg font-semibold text-slate-400 mb-12">
                                Funcionalidades Principales
                            </h3>
                            
                            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                                {features.map((feature, index) => (
                                    <div
                                        key={index}
                                        className="group relative rounded-2xl bg-slate-800/50 p-6 ring-1 ring-slate-700/50 transition hover:bg-slate-800 hover:ring-slate-600"
                                    >
                                        <div className={`inline-flex h-12 w-12 items-center justify-center rounded-xl ${feature.color} shadow-lg`}>
                                            <feature.icon className="h-6 w-6 text-white" />
                                        </div>
                                        <h4 className="mt-4 text-lg font-semibold text-white">
                                            {feature.title}
                                        </h4>
                                        <p className="mt-2 text-sm text-slate-400">
                                            {feature.description}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Stats Section */}
                        <div className="mt-24 rounded-3xl bg-slate-800/30 p-8 ring-1 ring-slate-700/50 lg:p-12">
                            <div className="grid gap-8 sm:grid-cols-3">
                                <div className="text-center">
                                    <div className="flex items-center justify-center">
                                        <DocumentChartBarIcon className="h-8 w-8 text-amber-500" />
                                    </div>
                                    <p className="mt-4 text-3xl font-bold text-white">Reportes</p>
                                    <p className="mt-1 text-sm text-slate-400">Excel y PDF</p>
                                </div>
                                <div className="text-center">
                                    <div className="flex items-center justify-center">
                                        <BuildingOffice2Icon className="h-8 w-8 text-amber-500" />
                                    </div>
                                    <p className="mt-4 text-3xl font-bold text-white">Multi-Sede</p>
                                    <p className="mt-1 text-sm text-slate-400">Oficinas y Proyectos</p>
                                </div>
                                <div className="text-center">
                                    <div className="flex items-center justify-center">
                                        <ShieldCheckIcon className="h-8 w-8 text-amber-500" />
                                    </div>
                                    <p className="mt-4 text-3xl font-bold text-white">Trazabilidad</p>
                                    <p className="mt-1 text-sm text-slate-400">Historial Completo</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>

                {/* Footer */}
                <footer className="relative border-t border-slate-800">
                    <div className="mx-auto max-w-7xl px-6 py-8 lg:px-8">
                        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
                            <div className="flex items-center gap-2 text-slate-400">
                                <BuildingOffice2Icon className="h-5 w-5" />
                                <span className="text-sm">Sistema de Control de Activos - Constructora</span>
                            </div>
                            <p className="text-sm text-slate-500">
                                © {new Date().getFullYear()} Todos los derechos reservados
                            </p>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
}
