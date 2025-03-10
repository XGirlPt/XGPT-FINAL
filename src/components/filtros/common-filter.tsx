import React from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid';

// Ajustando o tipo para suportar id como string (corrigindo o types.ts)
export interface FilterOption {
  id: string; // Valor fixo em português
  name: string; // Valor traduzido
  unavailable?: boolean;
  value?: number | string;
}

export interface CommonFilterProps {
  label: string;
  options: FilterOption[];
  value: string | null;
  onChange: (value: string) => void;
  placeholder?: string;
  bgColor?: string;
  buttonPadding?: string;
  rounded?: string;
  iconColor?: string;
}

const CommonFilter: React.FC<CommonFilterProps> = ({
  label,
  options,
  value,
  onChange,
  placeholder,
  bgColor = 'bg-[#FFF5F8] dark:bg-[#27191f]',
}) => {
  return (
    <div className="w-full">
      <Listbox
        value={options.find((opt) => opt.name === value) || null} // Compara com o name traduzido
        onChange={(selectedOption: FilterOption | null) => onChange(selectedOption ? selectedOption.id : '')} // Passa o id
      >
        {({ open }) => (
          <div>
            <div className="relative">
              <p className="text-md font-medium text-gray-400">{label}</p>
              <Listbox.Button
                className={`relative w-full ${bgColor} text-gray-600 dark:text-gray-200 text-sm cursor-pointer py-2.5 pl-3 pr-10 text-left rounded-full focus:outline-none border border-pink-200 hover:border-pink-300 dark:border-[#2D3748] dark:hover:border-[#4A5568] transition-colors duration-200`}
              >
                <span className="block truncate">
                  {value || placeholder || label} {/* Exibe o valor traduzido */}
                </span>
                <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                  <ChevronUpDownIcon className="h-5 w-5 text-[#E84393]" aria-hidden="true" />
                </span>
              </Listbox.Button>
              <Transition
                show={open}
                as={Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Listbox.Options className="absolute z-20 w-full mt-1 overflow-auto text-sm bg-[#FFF5F8] dark:bg-[#27191f] text-gray-600 dark:text-gray-200 rounded-md shadow-lg max-h-60 ring-1 ring-gray-400 dark:ring-1 dark:ring-[#2D3748] focus:outline-none">
                  {options.map((option) => (
                    <Listbox.Option
                      key={option.id}
                      className={({ active }) =>
                        `relative py-2.5 pl-3 pr-9 cursor-pointer select-none ${
                          active ? 'bg-pink-500 text-white' : 'text-gray-200 hover:bg-[#2D3748]'
                        }`
                      }
                      value={option}
                      disabled={option.unavailable}
                    >
                      {({ selected, active }) => (
                        <>
                          <span
                            className={`block truncate ${
                              selected ? 'font-medium' : 'font-normal'
                            }`}
                          >
                            {option.name} {/* Exibe o valor traduzido */}
                          </span>
                          {selected && (
                            <span
                              className={`absolute inset-y-0 right-0 flex items-center pr-3 ${
                                active ? 'text-white' : 'text-[#E84393]'
                              }`}
                            >
                              <CheckIcon className="h-5 w-5" aria-hidden="true" />
                            </span>
                          )}
                        </>
                      )}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </Transition>
            </div>
          </div>
        )}
      </Listbox>
    </div>
  );
};

export default CommonFilter;