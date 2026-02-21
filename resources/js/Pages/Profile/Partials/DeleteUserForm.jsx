import { useForm } from '@inertiajs/react';
import { useRef, useState } from 'react';
import { ExclamationTriangleIcon, LockClosedIcon, XMarkIcon } from '@heroicons/react/24/outline';

export default function DeleteUserForm() {
    const [confirmingUserDeletion, setConfirmingUserDeletion] = useState(false);
    const passwordInput = useRef();

    const {
        data,
        setData,
        delete: destroy,
        processing,
        reset,
        errors,
        clearErrors,
    } = useForm({
        password: '',
    });

    const confirmUserDeletion = () => {
        setConfirmingUserDeletion(true);
    };

    const deleteUser = (e) => {
        e.preventDefault();

        destroy(route('profile.destroy'), {
            preserveScroll: true,
            onSuccess: () => closeModal(),
            onError: () => passwordInput.current.focus(),
            onFinish: () => reset(),
        });
    };

    const closeModal = () => {
        setConfirmingUserDeletion(false);
        clearErrors();
        reset();
    };

    return (
        <div className="space-y-4">
            <p className="text-sm text-gray-600">
                Una vez que tu cuenta sea eliminada, todos sus recursos y datos serán eliminados permanentemente. 
                Antes de eliminar tu cuenta, por favor descarga cualquier dato o información que desees conservar.
            </p>

            <button
                onClick={confirmUserDeletion}
                className="inline-flex items-center gap-2 px-4 py-2.5 bg-red-600 text-white text-sm font-semibold rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors"
            >
                <ExclamationTriangleIcon className="h-5 w-5" />
                Eliminar Cuenta
            </button>

            {/* Modal */}
            {confirmingUserDeletion && (
                <div className="fixed inset-0 z-50 overflow-y-auto">
                    <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                        {/* Backdrop */}
                        <div 
                            className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
                            onClick={closeModal}
                        />

                        {/* Modal panel */}
                        <div className="relative transform overflow-hidden rounded-xl bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                            <form onSubmit={deleteUser}>
                                <div className="bg-white px-6 pt-6 pb-4">
                                    <div className="flex items-start gap-4">
                                        <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100">
                                            <ExclamationTriangleIcon className="h-6 w-6 text-red-600" />
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="text-lg font-semibold text-gray-900">
                                                ¿Eliminar tu cuenta?
                                            </h3>
                                            <p className="mt-2 text-sm text-gray-600">
                                                Esta acción no se puede deshacer. Todos tus datos serán eliminados 
                                                permanentemente. Por favor ingresa tu contraseña para confirmar.
                                            </p>
                                        </div>
                                        <button
                                            type="button"
                                            onClick={closeModal}
                                            className="text-gray-400 hover:text-gray-500"
                                        >
                                            <XMarkIcon className="h-6 w-6" />
                                        </button>
                                    </div>

                                    <div className="mt-6">
                                        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1.5">
                                            Contraseña
                                        </label>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                <LockClosedIcon className="h-5 w-5 text-gray-400" />
                                            </div>
                                            <input
                                                id="password"
                                                type="password"
                                                name="password"
                                                ref={passwordInput}
                                                value={data.password}
                                                onChange={(e) => setData('password', e.target.value)}
                                                className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors"
                                                placeholder="Ingresa tu contraseña"
                                            />
                                        </div>
                                        {errors.password && (
                                            <p className="mt-1.5 text-sm text-red-600">{errors.password}</p>
                                        )}
                                    </div>
                                </div>

                                <div className="bg-gray-50 px-6 py-4 flex flex-row-reverse gap-3">
                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-red-600 text-white text-sm font-semibold rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                    >
                                        {processing ? (
                                            <>
                                                <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                                </svg>
                                                Eliminando...
                                            </>
                                        ) : (
                                            'Eliminar Cuenta'
                                        )}
                                    </button>
                                    <button
                                        type="button"
                                        onClick={closeModal}
                                        className="inline-flex items-center justify-center px-4 py-2.5 bg-white text-gray-700 text-sm font-semibold rounded-lg border border-gray-300 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors"
                                    >
                                        Cancelar
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
