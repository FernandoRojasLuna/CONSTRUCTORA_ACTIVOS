import { Menu, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { 
    ArrowDownTrayIcon, 
    DocumentArrowDownIcon,
    TableCellsIcon 
} from '@heroicons/react/24/outline';

export default function ExportDropdown({ 
    excelUrl, 
    pdfUrl, 
    filters = {},
    className = '' 
}) {
    // Construir URL con filtros
    const buildUrl = (baseUrl) => {
        const params = new URLSearchParams();
        Object.entries(filters).forEach(([key, value]) => {
            if (value !== null && value !== undefined && value !== '') {
                params.append(key, value);
            }
        });
        const queryString = params.toString();
        return queryString ? `${baseUrl}?${queryString}` : baseUrl;
    };

    return (
        <Menu as="div" className={`relative inline-block text-left ${className}`}>
            <Menu.Button className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg border border-gray-300 font-medium text-sm transition-colors">
                <ArrowDownTrayIcon className="h-5 w-5" />
                Exportar
            </Menu.Button>

            <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
            >
                <Menu.Items className="absolute right-0 mt-2 w-48 origin-top-right rounded-lg bg-white shadow-lg ring-1 ring-black/5 focus:outline-none z-50">
                    <div className="p-1">
                        <Menu.Item>
                            {({ active }) => (
                                <a
                                    href={buildUrl(excelUrl)}
                                    className={`${
                                        active ? 'bg-amber-50 text-amber-700' : 'text-gray-700'
                                    } group flex items-center gap-3 rounded-md px-3 py-2 text-sm w-full`}
                                >
                                    <TableCellsIcon className="h-5 w-5 text-green-600" />
                                    <div>
                                        <p className="font-medium">Excel</p>
                                        <p className="text-xs text-gray-500">Archivo .xlsx</p>
                                    </div>
                                </a>
                            )}
                        </Menu.Item>
                        <Menu.Item>
                            {({ active }) => (
                                <a
                                    href={buildUrl(pdfUrl)}
                                    className={`${
                                        active ? 'bg-amber-50 text-amber-700' : 'text-gray-700'
                                    } group flex items-center gap-3 rounded-md px-3 py-2 text-sm w-full`}
                                >
                                    <DocumentArrowDownIcon className="h-5 w-5 text-red-600" />
                                    <div>
                                        <p className="font-medium">PDF</p>
                                        <p className="text-xs text-gray-500">Documento .pdf</p>
                                    </div>
                                </a>
                            )}
                        </Menu.Item>
                    </div>
                </Menu.Items>
            </Transition>
        </Menu>
    );
}
