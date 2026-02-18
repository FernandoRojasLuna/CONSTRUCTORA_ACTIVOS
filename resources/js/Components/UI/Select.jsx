import { forwardRef } from 'react';

const Select = forwardRef(({ label, error, options = [], placeholder, className = '', ...props }, ref) => {
    return (
        <div className="w-full">
            {label && (
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    {label}
                    {props.required && <span className="text-red-500 ml-1">*</span>}
                </label>
            )}
            <select
                ref={ref}
                className={`
                    block w-full rounded-lg border-gray-300 shadow-sm
                    focus:border-amber-500 focus:ring-amber-500
                    disabled:bg-gray-50 disabled:text-gray-500 disabled:cursor-not-allowed
                    text-sm
                    ${error ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : ''}
                    ${className}
                `}
                {...props}
            >
                {placeholder && (
                    <option value="">{placeholder}</option>
                )}
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
            {error && <p className="mt-1.5 text-sm text-red-600">{error}</p>}
        </div>
    );
});

Select.displayName = 'Select';

export default Select;
