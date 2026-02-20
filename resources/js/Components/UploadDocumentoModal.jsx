import { useState } from 'react';
import { useForm } from '@inertiajs/react';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { XMarkIcon, DocumentArrowUpIcon, DocumentTextIcon } from '@heroicons/react/24/outline';
import { Button, Input, Select, Textarea } from './UI';

const tiposDocumento = [
    { value: 'certificado_calibracion', label: 'Certificado de Calibración' },
    { value: 'factura', label: 'Factura' },
    { value: 'garantia', label: 'Garantía' },
    { value: 'manual', label: 'Manual de Usuario' },
    { value: 'ficha_tecnica', label: 'Ficha Técnica' },
    { value: 'acta_entrega', label: 'Acta de Entrega' },
    { value: 'otro', label: 'Otro' },
];

export default function UploadDocumentoModal({ 
    isOpen, 
    onClose, 
    equipoId = null, 
    mantenimientoId = null 
}) {
    const [dragActive, setDragActive] = useState(false);
    
    const { data, setData, post, processing, errors, reset } = useForm({
        equipo_id: equipoId,
        mantenimiento_id: mantenimientoId,
        tipo: 'certificado_calibracion',
        archivo: null,
        nombre: '',
        observaciones: '',
        fecha_documento: '',
        fecha_vencimiento: '',
    });

    const handleDrag = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === 'dragenter' || e.type === 'dragover') {
            setDragActive(true);
        } else if (e.type === 'dragleave') {
            setDragActive(false);
        }
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            const file = e.dataTransfer.files[0];
            setData('archivo', file);
            if (!data.nombre) {
                setData('nombre', file.name.replace(/\.[^/.]+$/, ''));
            }
        }
    };

    const handleFileChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setData('archivo', file);
            if (!data.nombre) {
                setData('nombre', file.name.replace(/\.[^/.]+$/, ''));
            }
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('documentos.store'), {
            forceFormData: true,
            onSuccess: () => {
                reset();
                onClose();
            },
        });
    };

    const formatFileSize = (bytes) => {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    };

    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-50" onClose={onClose}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black/30" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <Dialog.Panel className="w-full max-w-lg transform overflow-hidden rounded-lg bg-white shadow-xl transition-all">
                                <div className="flex items-center justify-between bg-amber-600 px-6 py-4">
                                    <Dialog.Title className="text-lg font-semibold text-white flex items-center gap-2">
                                        <DocumentArrowUpIcon className="h-6 w-6" />
                                        Subir Documento
                                    </Dialog.Title>
                                    <button
                                        onClick={onClose}
                                        className="text-white/80 hover:text-white"
                                    >
                                        <XMarkIcon className="h-6 w-6" />
                                    </button>
                                </div>

                                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                                    {/* Zona de arrastrar y soltar */}
                                    <div
                                        onDragEnter={handleDrag}
                                        onDragLeave={handleDrag}
                                        onDragOver={handleDrag}
                                        onDrop={handleDrop}
                                        className={`
                                            relative border-2 border-dashed rounded-lg p-6 text-center transition-colors
                                            ${dragActive 
                                                ? 'border-amber-500 bg-amber-50' 
                                                : 'border-gray-300 hover:border-amber-400'
                                            }
                                            ${data.archivo ? 'bg-green-50 border-green-400' : ''}
                                        `}
                                    >
                                        <input
                                            type="file"
                                            onChange={handleFileChange}
                                            accept=".pdf,.jpg,.jpeg,.png,.doc,.docx,.xls,.xlsx"
                                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                        />
                                        
                                        {data.archivo ? (
                                            <div className="flex items-center justify-center gap-3">
                                                <DocumentTextIcon className="h-10 w-10 text-green-600" />
                                                <div className="text-left">
                                                    <p className="font-medium text-gray-900">{data.archivo.name}</p>
                                                    <p className="text-sm text-gray-500">{formatFileSize(data.archivo.size)}</p>
                                                </div>
                                            </div>
                                        ) : (
                                            <>
                                                <DocumentArrowUpIcon className="h-12 w-12 mx-auto text-gray-400" />
                                                <p className="mt-2 text-sm text-gray-600">
                                                    <span className="font-semibold text-amber-600">Haz clic para subir</span>
                                                    {' '}o arrastra y suelta
                                                </p>
                                                <p className="mt-1 text-xs text-gray-500">
                                                    PDF, JPG, PNG, DOC, XLS (máx. 10MB)
                                                </p>
                                            </>
                                        )}
                                    </div>
                                    {errors.archivo && (
                                        <p className="text-sm text-red-600">{errors.archivo}</p>
                                    )}

                                    {/* Tipo de documento */}
                                    <Select
                                        label="Tipo de Documento"
                                        value={data.tipo}
                                        onChange={(e) => setData('tipo', e.target.value)}
                                        error={errors.tipo}
                                        options={tiposDocumento}
                                        required
                                    />

                                    {/* Nombre del documento */}
                                    <Input
                                        label="Nombre del Documento"
                                        value={data.nombre}
                                        onChange={(e) => setData('nombre', e.target.value)}
                                        error={errors.nombre}
                                        required
                                        placeholder="Ej: Certificado Calibración 2024"
                                    />

                                    {/* Fechas */}
                                    <div className="grid grid-cols-2 gap-4">
                                        <Input
                                            type="date"
                                            label="Fecha del Documento"
                                            value={data.fecha_documento}
                                            onChange={(e) => setData('fecha_documento', e.target.value)}
                                            error={errors.fecha_documento}
                                        />
                                        <Input
                                            type="date"
                                            label="Fecha de Vencimiento"
                                            value={data.fecha_vencimiento}
                                            onChange={(e) => setData('fecha_vencimiento', e.target.value)}
                                            error={errors.fecha_vencimiento}
                                        />
                                    </div>

                                    {/* Observaciones */}
                                    <Textarea
                                        label="Observaciones"
                                        value={data.observaciones}
                                        onChange={(e) => setData('observaciones', e.target.value)}
                                        error={errors.observaciones}
                                        rows={2}
                                        placeholder="Notas adicionales sobre el documento..."
                                    />

                                    {/* Botones */}
                                    <div className="flex justify-end gap-3 pt-4 border-t">
                                        <Button
                                            type="button"
                                            variant="secondary"
                                            onClick={onClose}
                                        >
                                            Cancelar
                                        </Button>
                                        <Button
                                            type="submit"
                                            disabled={processing || !data.archivo}
                                        >
                                            {processing ? 'Subiendo...' : 'Subir Documento'}
                                        </Button>
                                    </div>
                                </form>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
}
