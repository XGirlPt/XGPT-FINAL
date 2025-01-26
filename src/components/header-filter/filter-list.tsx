import { useState, Fragment } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";

export interface FilterOption {
  id: number;
  name: string;
  unavailable: boolean;
}

export interface FilterListProps {
  options: FilterOption[];
  defaultText: string;
  onChange: (option: FilterOption) => void;
  variant?: "default" | "pink" | "yellow";
  darkMode?: boolean;
  label?: string;
}

const FilterList: React.FC<FilterListProps> = ({
  options,
  defaultText,
  onChange,
  variant = "default",
  darkMode = true,
  label,
}) => {
  const [selectedOption, setSelectedOption] = useState<FilterOption>({
    id: 0,
    name: defaultText,
    unavailable: false,
  });

  const handleChange = (option: FilterOption) => {
    setSelectedOption(option);
    onChange(option);
  };

  return (
    <div className="w-full">
      <Listbox value={selectedOption} onChange={handleChange}>
        {({ open }) => (
          <div>
            <div className="relative">
              {label && (
                <p className="text-[#E84393] text-sm font-medium mb-1.5">
                  {label}
                </p>
              )}
              <Listbox.Button className="relative w-full bg-[#1E2530] text-white text-sm cursor-pointer py-2.5 pl-3 pr-10 text-left rounded-md focus:outline-none border border-[#2D3748] hover:border-[#4A5568] transition-colors duration-200">
                <span className="block truncate">{selectedOption.name}</span>
                <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                  <ChevronUpDownIcon
                    className="h-5 w-5 text-[#E84393]"
                    aria-hidden="true"
                  />
                </span>
              </Listbox.Button>

              <Transition
                show={open}
                as={Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Listbox.Options className="absolute z-20 w-full mt-1 overflow-auto text-sm bg-[#1E2530] rounded-md shadow-lg max-h-60 ring-1 ring-[#2D3748] focus:outline-none">
                  {options.map((option) => (
                    <Listbox.Option
                      key={option.id}
                      className={({ active }) =>
                        `relative py-2.5 pl-3 pr-9 cursor-pointer select-none ${
                          active
                            ? "bg-pink-500 text-white"
                            : "text-gray-200 hover:bg-[#2D3748]"
                        }`
                      }
                      value={option}
                      disabled={option.unavailable}
                    >
                      {({ selected, active }) => (
                        <>
                          <span
                            className={`block truncate ${
                              selected ? "font-medium" : "font-normal"
                            }`}
                          >
                            {option.name}
                          </span>
                          {selected && (
                            <span
                              className={`absolute inset-y-0 right-0 flex items-center pr-3 ${
                                active ? "text-white" : "text-[#E84393]"
                              }`}
                            >
                              <CheckIcon
                                className="h-5 w-5"
                                aria-hidden="true"
                              />
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

export default FilterList;
