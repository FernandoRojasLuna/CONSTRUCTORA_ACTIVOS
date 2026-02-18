import { Fragment, useState } from 'react';
import { Combobox, Transition } from '@headlessui/react';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/24/outline';

export default function SearchSelect({
    label,
    options = [],
    value,
    onChange,
    placeholder = 'Buscar...',
    displayValue = (item) => item?.label || '',
    error,
    required,
}) {
    const [query, setQuery] = useState('');

    const filteredOptions =
        query === ''
            ? options
            : options.filter((option) =>
                  option.label.toLowerCase().includes(query.toLowerCase())
              );

    return (
        <div className="w-full">
            {label && (
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    {label}
                    {required && <span className="text-red-500 ml-1">*</span>}
                </label>
            )}
            <Combobox value={value} onChange={onChange}>
                <div className="relative">
                    <div className="relative w-full">
                        <Combobox.Input
                            className={`
                                w-full rounded-lg border-gray-300 shadow-sm
                                focus:border-amber-500 focus:ring-amber-500
                                text-sm pr-10
                                ${error ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : ''}
                            `}
                            displayValue={displayValue}
                            onChange={(event) => setQuery(event.target.value)}
                            placeholder={placeholder}
                        />
                        <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
                            <ChevronUpDownIcon className="h-5 w-5 text-gray-400" />
                        </Combobox.Button>
                    </div>
                    <Transition
                        as={Fragment}
                        leave="transition ease-in duration-100"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                        afterLeave={() => setQuery('')}
                    >
                        <Combobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-lg bg-white py-1 text-sm shadow-lg ring-1 ring-black/5 focus:outline-none">
                            {filteredOptions.length === 0 && query !== '' ? (
                                <div className="relative cursor-default select-none px-4 py-2 text-gray-500">
                                    No se encontraron resultados.
                                </div>
                            ) : (
                                filteredOptions.map((option) => (
                                    <Combobox.Option
                                        key={option.value}
                                        className={({ active }) =>
                                            `relative cursor-pointer select-none py-2.5 pl-10 pr-4 ${
                                                active ? 'bg-amber-600 text-white' : 'text-gray-900'
                                            }`
                                        }
                                        value={option}
                                    >
                                        {({ selected, active }) => (
                                            <>
                                                <span className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}>
                                                    {option.label}
                                                </span>
                                                {selected && (
                                                    <span
                                                        className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                                                            active ? 'text-white' : 'text-amber-600'
                                                        }`}
                                                    >
                                                        <CheckIcon className="h-5 w-5" />
                                                    </span>
                                                )}
                                            </>
                                        )}
                                    </Combobox.Option>
                                ))
                            )}
                        </Combobox.Options>
                    </Transition>
                </div>
            </Combobox>
            {error && <p className="mt-1.5 text-sm text-red-600">{error}</p>}
        </div>
    );
}
