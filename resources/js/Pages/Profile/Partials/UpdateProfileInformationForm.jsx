import { Transition } from '@headlessui/react';
import { Link, useForm, usePage } from '@inertiajs/react';
import { CheckCircleIcon, EnvelopeIcon, UserIcon } from '@heroicons/react/24/outline';

export default function UpdateProfileInformation({
    mustVerifyEmail,
    status,
}) {
    const user = usePage().props.auth.user;

    const { data, setData, patch, errors, processing, recentlySuccessful } =
        useForm({
            name: user.name,
            email: user.email,
        });

    const submit = (e) => {
        e.preventDefault();
        patch(route('profile.update'));
    };

    return (
        <form onSubmit={submit} className="space-y-5">
            <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1.5">
                    Nombre Completo
                </label>
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <UserIcon className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                        id="name"
                        type="text"
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                        required
                        autoComplete="name"
                        className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors"
                        placeholder="Tu nombre completo"
                    />
                </div>
                {errors.name && (
                    <p className="mt-1.5 text-sm text-red-600">{errors.name}</p>
                )}
            </div>

            <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1.5">
                    Correo Electrónico
                </label>
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <EnvelopeIcon className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                        id="email"
                        type="email"
                        value={data.email}
                        onChange={(e) => setData('email', e.target.value)}
                        required
                        autoComplete="username"
                        className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors"
                        placeholder="correo@ejemplo.com"
                    />
                </div>
                {errors.email && (
                    <p className="mt-1.5 text-sm text-red-600">{errors.email}</p>
                )}
            </div>

            {mustVerifyEmail && user.email_verified_at === null && (
                <div className="rounded-lg bg-amber-50 border border-amber-200 p-4">
                    <p className="text-sm text-amber-800">
                        Tu correo electrónico no está verificado.{' '}
                        <Link
                            href={route('verification.send')}
                            method="post"
                            as="button"
                            className="font-medium text-amber-700 underline hover:text-amber-900"
                        >
                            Haz clic aquí para reenviar el correo de verificación.
                        </Link>
                    </p>

                    {status === 'verification-link-sent' && (
                        <p className="mt-2 text-sm font-medium text-green-600">
                            Se ha enviado un nuevo enlace de verificación a tu correo electrónico.
                        </p>
                    )}
                </div>
            )}

            <div className="flex items-center gap-4 pt-2">
                <button
                    type="submit"
                    disabled={processing}
                    className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-amber-600 text-white text-sm font-semibold rounded-lg hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                    {processing ? (
                        <>
                            <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                            </svg>
                            Guardando...
                        </>
                    ) : (
                        'Guardar Cambios'
                    )}
                </button>

                <Transition
                    show={recentlySuccessful}
                    enter="transition ease-in-out duration-300"
                    enterFrom="opacity-0"
                    leave="transition ease-in-out duration-300"
                    leaveTo="opacity-0"
                >
                    <span className="inline-flex items-center gap-1.5 text-sm text-green-600">
                        <CheckCircleIcon className="h-5 w-5" />
                        Guardado correctamente
                    </span>
                </Transition>
            </div>
        </form>
    );
}
