import { useState } from 'react';
import { Link, usePage } from '@inertiajs/react';
import {
    HomeIcon,
    BuildingOfficeIcon,
    ComputerDesktopIcon,
    MapPinIcon,
    WrenchScrewdriverIcon,
    TruckIcon,
    ChartBarIcon,
    Cog6ToothIcon,
    UserCircleIcon,
    UsersIcon,
    ArrowRightOnRectangleIcon,
    Bars3Icon,
    XMarkIcon,
    ChevronDownIcon,
} from '@heroicons/react/24/outline';

const navigation = [
    { name: 'Dashboard', href: 'dashboard', icon: HomeIcon },
    { name: 'Sedes', href: 'sedes.index', icon: BuildingOfficeIcon },
    {
        name: 'Equipos',
        icon: ComputerDesktopIcon,
        children: [
            { name: 'Todos los Equipos', href: 'equipos.index' },
            { name: 'Cómputo', href: 'equipos.index', params: { tipo: 'computo' } },
            { name: 'Topografía', href: 'equipos.index', params: { tipo: 'topografia' } },
        ],
    },
    { name: 'Traslados', href: 'traslados.index', icon: TruckIcon },
    { name: 'Mantenimientos', href: 'mantenimientos.index', icon: WrenchScrewdriverIcon },
];

const userNavigation = [
    { name: 'Mi Perfil', href: 'profile.edit', icon: UserCircleIcon },
];

function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
}

export default function AppLayout({ children, title }) {
    const { auth, flash } = usePage().props;
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [expandedMenus, setExpandedMenus] = useState({});

    const toggleMenu = (menuName) => {
        setExpandedMenus((prev) => ({
            ...prev,
            [menuName]: !prev[menuName],
        }));
    };

    const isCurrentRoute = (href, params = {}) => {
        try {
            if (params && Object.keys(params).length > 0) {
                return route().current(href, params);
            }
            return route().current(href) || route().current(href + '.*');
        } catch {
            return false;
        }
    };

    const NavItem = ({ item, mobile = false }) => {
        if (item.children) {
            const isExpanded = expandedMenus[item.name];
            const isChildActive = item.children.some((child) =>
                isCurrentRoute(child.href, child.params)
            );

            return (
                <div>
                    <button
                        onClick={() => toggleMenu(item.name)}
                        className={classNames(
                            isChildActive
                                ? 'bg-amber-700 text-white'
                                : 'text-amber-100 hover:bg-amber-700 hover:text-white',
                            'group flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200'
                        )}
                    >
                        <div className="flex items-center gap-3">
                            <item.icon
                                className={classNames(
                                    isChildActive ? 'text-white' : 'text-amber-300 group-hover:text-white',
                                    'h-5 w-5 shrink-0 transition-colors'
                                )}
                            />
                            {item.name}
                        </div>
                        <ChevronDownIcon
                            className={classNames(
                                'h-4 w-4 transition-transform duration-200',
                                isExpanded ? 'rotate-180' : ''
                            )}
                        />
                    </button>
                    {isExpanded && (
                        <div className="mt-1 space-y-1 pl-10">
                            {item.children.map((child) => (
                                <Link
                                    key={child.name}
                                    href={route(child.href, child.params)}
                                    className={classNames(
                                        isCurrentRoute(child.href, child.params)
                                            ? 'bg-amber-900 text-white'
                                            : 'text-amber-200 hover:bg-amber-700 hover:text-white',
                                        'block rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200'
                                    )}
                                >
                                    {child.name}
                                </Link>
                            ))}
                        </div>
                    )}
                </div>
            );
        }

        return (
            <Link
                href={route(item.href)}
                className={classNames(
                    isCurrentRoute(item.href)
                        ? 'bg-amber-700 text-white'
                        : 'text-amber-100 hover:bg-amber-700 hover:text-white',
                    'group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200'
                )}
            >
                <item.icon
                    className={classNames(
                        isCurrentRoute(item.href) ? 'text-white' : 'text-amber-300 group-hover:text-white',
                        'h-5 w-5 shrink-0 transition-colors'
                    )}
                />
                {item.name}
            </Link>
        );
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Mobile sidebar overlay */}
            {sidebarOpen && (
                <div className="fixed inset-0 z-40 lg:hidden">
                    <div
                        className="fixed inset-0 bg-gray-900/80 backdrop-blur-sm"
                        onClick={() => setSidebarOpen(false)}
                    />
                    <div className="fixed inset-y-0 left-0 flex w-72 flex-col">
                        <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-amber-800 px-4 pb-4">
                            <div className="flex h-16 shrink-0 items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white">
                                        <BuildingOfficeIcon className="h-6 w-6 text-amber-800" />
                                    </div>
                                    <span className="text-lg font-bold text-white">CONSTRUCTORA</span>
                                </div>
                                <button
                                    onClick={() => setSidebarOpen(false)}
                                    className="text-amber-200 hover:text-white"
                                >
                                    <XMarkIcon className="h-6 w-6" />
                                </button>
                            </div>
                            <nav className="flex flex-1 flex-col">
                                <ul className="flex flex-1 flex-col gap-y-1">
                                    {navigation.map((item) => (
                                        <li key={item.name}>
                                            <NavItem item={item} mobile />
                                        </li>
                                    ))}
                                </ul>
                            </nav>
                        </div>
                    </div>
                </div>
            )}

            {/* Desktop sidebar */}
            <div className="hidden lg:fixed lg:inset-y-0 lg:z-40 lg:flex lg:w-64 lg:flex-col">
                <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-gradient-to-b from-amber-800 to-amber-900 px-4 pb-4 shadow-xl">
                    {/* Logo */}
                    <div className="flex h-16 shrink-0 items-center gap-3 border-b border-amber-700/50 px-2">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white shadow-md">
                            <BuildingOfficeIcon className="h-6 w-6 text-amber-800" />
                        </div>
                        <div>
                            <span className="text-lg font-bold text-white">CONSTRUCTORA</span>
                            <p className="text-xs text-amber-300">Sistema de Activos</p>
                        </div>
                    </div>

                    {/* Navigation */}
                    <nav className="flex flex-1 flex-col">
                        <ul className="flex flex-1 flex-col gap-y-1">
                            {navigation.map((item) => (
                                <li key={item.name}>
                                    <NavItem item={item} />
                                </li>
                            ))}
                        </ul>

                        {/* User section at bottom */}
                        <div className="mt-auto border-t border-amber-700/50 pt-4">
                            <div className="flex items-center gap-3 rounded-lg bg-amber-900/50 px-3 py-3">
                                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-amber-600 text-sm font-semibold text-white">
                                    {auth.user.name.charAt(0).toUpperCase()}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="truncate text-sm font-medium text-white">
                                        {auth.user.name}
                                    </p>
                                    <p className="truncate text-xs text-amber-300">
                                        {auth.user.email}
                                    </p>
                                </div>
                            </div>
                            <div className="mt-2 space-y-1">
                                <Link
                                    href={route('profile.edit')}
                                    className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-amber-200 hover:bg-amber-700 hover:text-white transition-all"
                                >
                                    <Cog6ToothIcon className="h-5 w-5" />
                                    Configuración
                                </Link>
                                <Link
                                    href={route('users.index')}
                                    className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-amber-200 hover:bg-amber-700 hover:text-white transition-all"
                                >
                                    <UsersIcon className="h-5 w-5" />
                                    Usuarios
                                </Link>
                                <Link
                                    href={route('logout')}
                                    method="post"
                                    as="button"
                                    className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-amber-200 hover:bg-red-600 hover:text-white transition-all"
                                >
                                    <ArrowRightOnRectangleIcon className="h-5 w-5" />
                                    Cerrar Sesión
                                </Link>
                            </div>
                        </div>
                    </nav>
                </div>
            </div>

            {/* Main content */}
            <div className="lg:pl-64">
                {/* Top bar */}
                <div className="sticky top-0 z-30 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
                    <button
                        type="button"
                        className="-m-2.5 p-2.5 text-gray-700 lg:hidden"
                        onClick={() => setSidebarOpen(true)}
                    >
                        <Bars3Icon className="h-6 w-6" />
                    </button>

                    {/* Separator */}
                    <div className="h-6 w-px bg-gray-200 lg:hidden" />

                    <div className="flex flex-1 items-center justify-between gap-x-4 self-stretch lg:gap-x-6">
                        {/* Page title */}
                        <div className="flex items-center">
                            {title && (
                                <h1 className="text-lg font-semibold text-gray-900">{title}</h1>
                            )}
                        </div>

                        {/* Right side */}
                        <div className="flex items-center gap-x-4 lg:gap-x-6">
                            {/* Date */}
                            <div className="hidden sm:block text-sm text-gray-500">
                                {new Date().toLocaleDateString('es-PE', {
                                    weekday: 'long',
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric',
                                })}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Flash messages */}
                {flash?.success && (
                    <div className="mx-4 mt-4 rounded-lg bg-green-50 border border-green-200 p-4 sm:mx-6 lg:mx-8">
                        <div className="flex">
                            <div className="flex-shrink-0">
                                <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <div className="ml-3">
                                <p className="text-sm font-medium text-green-800">{flash.success}</p>
                            </div>
                        </div>
                    </div>
                )}

                {flash?.error && (
                    <div className="mx-4 mt-4 rounded-lg bg-red-50 border border-red-200 p-4 sm:mx-6 lg:mx-8">
                        <div className="flex">
                            <div className="flex-shrink-0">
                                <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <div className="ml-3">
                                <p className="text-sm font-medium text-red-800">{flash.error}</p>
                            </div>
                        </div>
                    </div>
                )}

                {/* Page content */}
                <main className="py-6">
                    <div className="px-4 sm:px-6 lg:px-8">{children}</div>
                </main>
            </div>
        </div>
    );
}
