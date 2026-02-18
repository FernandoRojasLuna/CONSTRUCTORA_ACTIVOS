import { forwardRef } from 'react';

const Textarea = forwardRef(({ label, error, className = '', rows = 3, ...props }, ref) => {
    return (
        <div className="w-full">
            {label && (
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    {label}
                    {props.required && <span className="text-red-500 ml-1">*</span>}
                </label>
            )}
            <textarea
                ref={ref}
                rows={rows}
                className={`
                    block w-full rounded-lg border-gray-300 shadow-sm
                    focus:border-amber-500 focus:ring-amber-500
                    disabled:bg-gray-50 disabled:text-gray-500 disabled:cursor-not-allowed
                    placeholder:text-gray-400
                    text-sm resize-none
                    ${error ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : ''}
                    ${className}
                `}
                {...props}
            />
            {error && <p className="mt-1.5 text-sm text-red-600">{error}</p>}
        </div>
    );
});

Textarea.displayName = 'Textarea';

export default Textarea;
