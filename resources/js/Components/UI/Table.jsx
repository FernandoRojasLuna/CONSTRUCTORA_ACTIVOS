export default function Table({ children, className = '' }) {
    return (
        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
            <div className="overflow-x-auto">
                <table className={`min-w-full divide-y divide-gray-200 ${className}`}>
                    {children}
                </table>
            </div>
        </div>
    );
}

Table.Head = function TableHead({ children, className = '' }) {
    return <thead className={`bg-gray-50 ${className}`}>{children}</thead>;
};

Table.Body = function TableBody({ children, className = '' }) {
    return <tbody className={`divide-y divide-gray-200 bg-white ${className}`}>{children}</tbody>;
};

Table.Row = function TableRow({ children, className = '', hover = true, ...props }) {
    return (
        <tr
            className={`${hover ? 'hover:bg-gray-50 transition-colors' : ''} ${className}`}
            {...props}
        >
            {children}
        </tr>
    );
};

Table.Header = function TableHeader({ children, className = '', align = 'left', ...props }) {
    const alignClasses = {
        left: 'text-left',
        center: 'text-center',
        right: 'text-right',
    };

    return (
        <th
            className={`px-6 py-3 text-xs font-semibold uppercase tracking-wider text-gray-500 ${alignClasses[align]} ${className}`}
            {...props}
        >
            {children}
        </th>
    );
};

Table.Cell = function TableCell({ children, className = '', align = 'left', ...props }) {
    const alignClasses = {
        left: 'text-left',
        center: 'text-center',
        right: 'text-right',
    };

    return (
        <td
            className={`whitespace-nowrap px-6 py-4 text-sm text-gray-900 ${alignClasses[align]} ${className}`}
            {...props}
        >
            {children}
        </td>
    );
};

Table.Empty = function TableEmpty({ colSpan = 1, message = 'No se encontraron resultados' }) {
    return (
        <tr>
            <td colSpan={colSpan} className="px-6 py-12 text-center">
                <div className="flex flex-col items-center">
                    <svg
                        className="h-12 w-12 text-gray-300"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1}
                            d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                        />
                    </svg>
                    <p className="mt-4 text-sm text-gray-500">{message}</p>
                </div>
            </td>
        </tr>
    );
};
