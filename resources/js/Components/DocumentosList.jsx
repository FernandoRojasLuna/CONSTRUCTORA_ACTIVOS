import { router } from '@inertiajs/react';
import { 
    DocumentTextIcon, 
    ArrowDownTrayIcon, 
    TrashIcon,
    EyeIcon,
    ExclamationTriangleIcon,
    CalendarDaysIcon
} from '@heroicons/react/24/outline';
import { Badge } from './UI';

const tiposDocumento = {
    certificado_calibracion: { label: 'Certificado Calibración', color: 'purple' },
    factura: { label: 'Factura', color: 'blue' },
    garantia: { label: 'Garantía', color: 'green' },
    manual: { label: 'Manual', color: 'gray' },
    ficha_tecnica: { label: 'Ficha Técnica', color: 'amber' },
    acta_entrega: { label: 'Acta de Entrega', color: 'cyan' },
    otro: { label: 'Otro', color: 'gray' },
};

const iconosExtension = {
    pdf: '📄',
    doc: '📝',
    docx: '📝',
    xls: '📊',
    xlsx: '📊',
    jpg: '🖼️',
    jpeg: '🖼️',
    png: '🖼️',
};

export default function DocumentosList({ documentos = [], onUploadClick }) {
    const formatFileSize = (bytes) => {
        if (!bytes) return 'N/A';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
    };

    const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        return new Date(dateString).toLocaleDateString('es-PE', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });
    };

    const isExpired = (fecha) => {
        if (!fecha) return false;
        return new Date(fecha) < new Date();
    };

    const isExpiringSoon = (fecha) => {
        if (!fecha) return false;
        const vencimiento = new Date(fecha);
        const hoy = new Date();
        const diffDays = Math.ceil((vencimiento - hoy) / (1000 * 60 * 60 * 24));
        return diffDays > 0 && diffDays <= 30;
    };

    const handleDelete = (documento) => {
        if (confirm(`¿Estás seguro de eliminar el documento "${documento.nombre}"?`)) {
            router.delete(route('documentos.destroy', documento.id));
        }
    };

    if (documentos.length === 0) {
        return (
            <div className="text-center py-8 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
                <DocumentTextIcon className="h-12 w-12 text-gray-400 mx-auto" />
                <p className="mt-2 text-gray-600">No hay documentos adjuntos</p>
                {onUploadClick && (
                    <button
                        onClick={onUploadClick}
                        className="mt-3 text-amber-600 hover:text-amber-700 font-medium text-sm"
                    >
                        + Subir primer documento
                    </button>
                )}
            </div>
        );
    }

    return (
        <div className="space-y-3">
            {documentos.map((documento) => {
                const tipo = tiposDocumento[documento.tipo] || tiposDocumento.otro;
                const expired = isExpired(documento.fecha_vencimiento);
                const expiringSoon = isExpiringSoon(documento.fecha_vencimiento);

                return (
                    <div
                        key={documento.id}
                        className={`
                            flex items-center justify-between p-4 rounded-lg border transition-colors
                            ${expired 
                                ? 'bg-red-50 border-red-200' 
                                : expiringSoon 
                                    ? 'bg-amber-50 border-amber-200'
                                    : 'bg-white border-gray-200 hover:border-gray-300'
                            }
                        `}
                    >
                        <div className="flex items-center gap-4">
                            <div className="text-2xl">
                                {iconosExtension[documento.extension?.toLowerCase()] || '📎'}
                            </div>
                            
                            <div>
                                <div className="flex items-center gap-2">
                                    <h4 className="font-medium text-gray-900">{documento.nombre}</h4>
                                    <Badge color={tipo.color} size="sm">{tipo.label}</Badge>
                                    
                                    {expired && (
                                        <Badge color="red" size="sm" className="flex items-center gap-1">
                                            <ExclamationTriangleIcon className="h-3 w-3" />
                                            Vencido
                                        </Badge>
                                    )}
                                    {expiringSoon && (
                                        <Badge color="amber" size="sm" className="flex items-center gap-1">
                                            <CalendarDaysIcon className="h-3 w-3" />
                                            Por vencer
                                        </Badge>
                                    )}
                                </div>
                                
                                <div className="flex items-center gap-4 mt-1 text-xs text-gray-500">
                                    <span>{documento.extension?.toUpperCase()}</span>
                                    <span>{formatFileSize(documento.tamano)}</span>
                                    {documento.fecha_documento && (
                                        <span>Fecha: {formatDate(documento.fecha_documento)}</span>
                                    )}
                                    {documento.fecha_vencimiento && (
                                        <span className={expired ? 'text-red-600 font-medium' : ''}>
                                            Vence: {formatDate(documento.fecha_vencimiento)}
                                        </span>
                                    )}
                                </div>
                                
                                {documento.observaciones && (
                                    <p className="mt-1 text-sm text-gray-600">{documento.observaciones}</p>
                                )}
                            </div>
                        </div>

                        <div className="flex items-center gap-2">
                            <a
                                href={route('documentos.show', documento.id)}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                title="Ver documento"
                            >
                                <EyeIcon className="h-5 w-5" />
                            </a>
                            <a
                                href={route('documentos.download', documento.id)}
                                className="p-2 text-gray-500 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                                title="Descargar"
                            >
                                <ArrowDownTrayIcon className="h-5 w-5" />
                            </a>
                            <button
                                onClick={() => handleDelete(documento)}
                                className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                title="Eliminar"
                            >
                                <TrashIcon className="h-5 w-5" />
                            </button>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
