import { Head, Link, useForm } from '@inertiajs/react';
import { BuildingOffice2Icon, EnvelopeIcon, LockClosedIcon } from '@heroicons/react/24/outline';

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <>
            <Head title="Iniciar Sesión" />
            
            <div className="min-h-screen flex">
                {/* Panel izquierdo - Decorativo */}
                <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-amber-600 via-amber-700 to-amber-900 relative overflow-hidden">
                    {/* Decoraciones de fondo */}
                    <div className="absolute inset-0">
                        <div className="absolute top-20 -left-20 h-72 w-72 rounded-full bg-white/10 blur-3xl"></div>
                        <div className="absolute bottom-20 right-10 h-96 w-96 rounded-full bg-amber-500/20 blur-3xl"></div>
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-64 w-64 rounded-full bg-amber-400/10 blur-2xl"></div>
                    </div>
                    
                    {/* Contenido del panel */}
                    <div className="relative z-10 flex flex-col justify-center px-12 xl:px-20">
                        <div className="flex items-center gap-4 mb-8">
                            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white shadow-xl">
                                <BuildingOffice2Icon className="h-9 w-9 text-amber-700" />
                            </div>
                            <div>
                                <h1 className="text-3xl font-bold text-white">CONSTRUCTORA</h1>
                                <p className="text-amber-200">Sistema de Control de Activos</p>
                            </div>
                        </div>
                        
                        <div className="space-y-6 mt-8">
                            <h2 className="text-4xl font-bold text-white leading-tight">
                                Gestiona tus activos<br />de manera eficiente
                            </h2>
                            <p className="text-amber-100 text-lg max-w-md">
                                Control completo de equipos de cómputo y topografía, 
                                traslados, mantenimientos y documentación.
                            </p>
                        </div>

                        {/* Features */}
                        <div className="mt-12 grid grid-cols-2 gap-4">
                            <div className="flex items-center gap-3 text-amber-100">
                                <div className="h-2 w-2 rounded-full bg-amber-300"></div>
                                <span className="text-sm">Equipos de Cómputo</span>
                            </div>
                            <div className="flex items-center gap-3 text-amber-100">
                                <div className="h-2 w-2 rounded-full bg-amber-300"></div>
                                <span className="text-sm">Topografía</span>
                            </div>
                            <div className="flex items-center gap-3 text-amber-100">
                                <div className="h-2 w-2 rounded-full bg-amber-300"></div>
                                <span className="text-sm">Traslados</span>
                            </div>
                            <div className="flex items-center gap-3 text-amber-100">
                                <div className="h-2 w-2 rounded-full bg-amber-300"></div>
                                <span className="text-sm">Reportes PDF/Excel</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Panel derecho - Formulario */}
                <div className="flex w-full lg:w-1/2 flex-col justify-center bg-gray-50">
                    <div className="mx-auto w-full max-w-md px-6 py-12">
                        {/* Logo móvil */}
                        <div className="lg:hidden flex items-center justify-center gap-3 mb-10">
                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-600 shadow-lg">
                                <BuildingOffice2Icon className="h-7 w-7 text-white" />
                            </div>
                            <div>
                                <h1 className="text-xl font-bold text-gray-900">CONSTRUCTORA</h1>
                                <p className="text-xs text-gray-500">Control de Activos</p>
                            </div>
                        </div>

                        <div className="text-center lg:text-left mb-8">
                            <h2 className="text-2xl font-bold text-gray-900">
                                Bienvenido de nuevo
                            </h2>
                            <p className="mt-2 text-sm text-gray-600">
                                Ingresa tus credenciales para acceder al sistema
                            </p>
                        </div>

                        {status && (
                            <div className="mb-6 rounded-lg bg-green-50 p-4 text-sm font-medium text-green-700 ring-1 ring-green-200">
                                {status}
                            </div>
                        )}

                        <form onSubmit={submit} className="space-y-5">
                            {/* Email */}
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1.5">
                                    Correo electrónico
                                </label>
                                <div className="relative">
                                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                        <EnvelopeIcon className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <input
                                        id="email"
                                        type="email"
                                        name="email"
                                        value={data.email}
                                        className="block w-full rounded-lg border-gray-300 pl-10 py-3 text-sm shadow-sm focus:border-amber-500 focus:ring-amber-500"
                                        placeholder="tu@correo.com"
                                        autoComplete="username"
                                        autoFocus
                                        onChange={(e) => setData('email', e.target.value)}
                                    />
                                </div>
                                {errors.email && (
                                    <p className="mt-1.5 text-sm text-red-600">{errors.email}</p>
                                )}
                            </div>

                            {/* Password */}
                            <div>
                                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1.5">
                                    Contraseña
                                </label>
                                <div className="relative">
                                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                        <LockClosedIcon className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <input
                                        id="password"
                                        type="password"
                                        name="password"
                                        value={data.password}
                                        className="block w-full rounded-lg border-gray-300 pl-10 py-3 text-sm shadow-sm focus:border-amber-500 focus:ring-amber-500"
                                        placeholder="••••••••"
                                        autoComplete="current-password"
                                        onChange={(e) => setData('password', e.target.value)}
                                    />
                                </div>
                                {errors.password && (
                                    <p className="mt-1.5 text-sm text-red-600">{errors.password}</p>
                                )}
                            </div>

                            {/* Remember & Forgot */}
                            <div className="flex items-center justify-between">
                                <label className="flex items-center">
                                    <input
                                        type="checkbox"
                                        name="remember"
                                        checked={data.remember}
                                        onChange={(e) => setData('remember', e.target.checked)}
                                        className="h-4 w-4 rounded border-gray-300 text-amber-600 focus:ring-amber-500"
                                    />
                                    <span className="ml-2 text-sm text-gray-600">
                                        Recordarme
                                    </span>
                                </label>

                                {canResetPassword && (
                                    <Link
                                        href={route('password.request')}
                                        className="text-sm font-medium text-amber-600 hover:text-amber-500"
                                    >
                                        ¿Olvidaste tu contraseña?
                                    </Link>
                                )}
                            </div>

                            {/* Submit */}
                            <button
                                type="submit"
                                disabled={processing}
                                className="w-full rounded-lg bg-amber-600 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-amber-600/30 transition hover:bg-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {processing ? (
                                    <span className="flex items-center justify-center gap-2">
                                        <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                        </svg>
                                        Iniciando sesión...
                                    </span>
                                ) : (
                                    'Iniciar Sesión'
                                )}
                            </button>
                        </form>

                        {/* Footer */}
                        <p className="mt-8 text-center text-xs text-gray-500">
                            © {new Date().getFullYear()} Constructora - Sistema de Control de Activos
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}
