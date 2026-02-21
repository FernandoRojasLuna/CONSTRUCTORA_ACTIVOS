import { Head, Link, useForm } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import {
    ArrowLeftIcon,
    CheckIcon,
} from '@heroicons/react/24/outline';

export default function Edit({ user }) {
    const { data, setData, put, processing, errors } = useForm({
        name: user.name,
        email: user.email,
        password: '',
        password_confirmation: '',
    });

    const submit = (e) => {
        e.preventDefault();
        put(route('users.update', user.id));
    };

    return (
        <AppLayout>
            <Head title={`Editar Usuario - ${user.name}`} />

            <div className="max-w-2xl mx-auto space-y-6">
                {/* Header */}
                <div className="flex items-center gap-4">
                    <Link
                        href={route('users.index')}
                        className="rounded-lg bg-gray-100 p-2 text-gray-600 hover:bg-gray-200 transition-colors"
                    >
                        <ArrowLeftIcon className="h-5 w-5" />
                    </Link>
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Editar Usuario</h1>
                        <p className="mt-1 text-sm text-gray-600">
                            Modifica la información de {user.name}
                        </p>
                    </div>
                </div>

                {/* Formulario */}
                <div className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-gray-900/5">
                    <form onSubmit={submit} className="space-y-6">
                        {/* Nombre */}
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                Nombre completo
                            </label>
                            <input
                                type="text"
                                id="name"
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500"
                                required
                            />
                            {errors.name && (
                                <p className="mt-1 text-sm text-red-600">{errors.name}</p>
                            )}
                        </div>

                        {/* Email */}
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                Correo electrónico
                            </label>
                            <input
                                type="email"
                                id="email"
                                value={data.email}
                                onChange={(e) => setData('email', e.target.value)}
                                className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500"
                                required
                            />
                            {errors.email && (
                                <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                            )}
                        </div>

                        {/* Separador */}
                        <div className="border-t border-gray-200 pt-6">
                            <h3 className="text-sm font-medium text-gray-900">Cambiar contraseña</h3>
                            <p className="mt-1 text-sm text-gray-500">
                                Deja estos campos vacíos si no deseas cambiar la contraseña
                            </p>
                        </div>

                        {/* Nueva Contraseña */}
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                Nueva contraseña
                            </label>
                            <input
                                type="password"
                                id="password"
                                value={data.password}
                                onChange={(e) => setData('password', e.target.value)}
                                className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500"
                                placeholder="Mínimo 8 caracteres (opcional)"
                            />
                            {errors.password && (
                                <p className="mt-1 text-sm text-red-600">{errors.password}</p>
                            )}
                        </div>

                        {/* Confirmar Nueva Contraseña */}
                        <div>
                            <label htmlFor="password_confirmation" className="block text-sm font-medium text-gray-700">
                                Confirmar nueva contraseña
                            </label>
                            <input
                                type="password"
                                id="password_confirmation"
                                value={data.password_confirmation}
                                onChange={(e) => setData('password_confirmation', e.target.value)}
                                className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500"
                                placeholder="Repite la nueva contraseña"
                            />
                        </div>

                        {/* Botones */}
                        <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-200">
                            <Link
                                href={route('users.index')}
                                className="rounded-lg bg-gray-100 px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-200 transition-colors"
                            >
                                Cancelar
                            </Link>
                            <button
                                type="submit"
                                disabled={processing}
                                className="inline-flex items-center gap-2 rounded-lg bg-amber-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-amber-500 disabled:opacity-50 transition-colors"
                            >
                                <CheckIcon className="h-5 w-5" />
                                {processing ? 'Guardando...' : 'Guardar Cambios'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </AppLayout>
    );
}
