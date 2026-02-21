import AppLayout from '@/Layouts/AppLayout';
import { Head } from '@inertiajs/react';
import { UserCircleIcon, KeyIcon, ExclamationTriangleIcon } from '@heroicons/react/24/outline';
import DeleteUserForm from './Partials/DeleteUserForm';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';

export default function Edit({ mustVerifyEmail, status }) {
    return (
        <AppLayout>
            <Head title="Configuración de Cuenta" />

            <div className="space-y-6">
                {/* Header */}
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Configuración de Cuenta</h1>
                    <p className="mt-1 text-sm text-gray-600">
                        Administra tu información personal y preferencias de seguridad
                    </p>
                </div>

                {/* Información del Perfil */}
                <div className="rounded-xl bg-white shadow-sm ring-1 ring-gray-900/5 overflow-hidden">
                    <div className="flex items-center gap-3 border-b border-gray-100 bg-gray-50/50 px-6 py-4">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-100">
                            <UserCircleIcon className="h-5 w-5 text-amber-600" />
                        </div>
                        <div>
                            <h2 className="text-base font-semibold text-gray-900">
                                Información del Perfil
                            </h2>
                            <p className="text-sm text-gray-500">
                                Actualiza tu nombre y correo electrónico
                            </p>
                        </div>
                    </div>
                    <div className="p-6">
                        <UpdateProfileInformationForm
                            mustVerifyEmail={mustVerifyEmail}
                            status={status}
                        />
                    </div>
                </div>

                {/* Cambiar Contraseña */}
                <div className="rounded-xl bg-white shadow-sm ring-1 ring-gray-900/5 overflow-hidden">
                    <div className="flex items-center gap-3 border-b border-gray-100 bg-gray-50/50 px-6 py-4">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100">
                            <KeyIcon className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                            <h2 className="text-base font-semibold text-gray-900">
                                Cambiar Contraseña
                            </h2>
                            <p className="text-sm text-gray-500">
                                Asegúrate de usar una contraseña segura
                            </p>
                        </div>
                    </div>
                    <div className="p-6">
                        <UpdatePasswordForm />
                    </div>
                </div>

                {/* Eliminar Cuenta */}
                <div className="rounded-xl bg-white shadow-sm ring-1 ring-red-200 overflow-hidden">
                    <div className="flex items-center gap-3 border-b border-red-100 bg-red-50/50 px-6 py-4">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-100">
                            <ExclamationTriangleIcon className="h-5 w-5 text-red-600" />
                        </div>
                        <div>
                            <h2 className="text-base font-semibold text-red-900">
                                Zona de Peligro
                            </h2>
                            <p className="text-sm text-red-600">
                                Acciones irreversibles para tu cuenta
                            </p>
                        </div>
                    </div>
                    <div className="p-6">
                        <DeleteUserForm />
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
