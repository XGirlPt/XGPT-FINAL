import React, { useState, Fragment } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";

interface Option {
  id: number;
  name: string;
  unavailable: boolean;
}

const TipoEstabelecimento: Option[] = [
  { id: 1, name: "Agencia de Escort", unavailable: false },
  { id: 2, name: "Salao Erotico", unavailable: false },
  { id: 3, name: "Centro de Massagens", unavailable: false },
];

interface ListCategoriaBarProps {
  handleOptionSelect?: (option: Option | null) => void;
}

const ListCategoriaBar: React.FC<ListCategoriaBarProps> = ({
  handleOptionSelect,
}) => {
  const [selectedOption, setSelectedOption] = useState<Option | null>(null);

  return (
    <div className="w-full mb-2 md:mb-4">
      <Listbox
        value={selectedOption}
        onChange={(selectedOption) => {
          setSelectedOption(selectedOption);
          if (typeof handleOptionSelect === "function") {
            handleOptionSelect(selectedOption);
          }
        }}
      >
        {({ open }) => (
          <>
            <div className="relative mt-1">
              <p className="text-pink-800">Categoria*</p>
              <Listbox.Button className="relative w-full mt-1 bg-zinc-500 z-100 text-xs text-white rounded-md md:text-sm cursor-default py-2 pl-3 pr-10 text-left shadow-md sm:text-sm">
                <span className="block truncate">
                  {selectedOption ? selectedOption.name : "------"}
                </span>
                <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                  <ChevronUpDownIcon
                    className="h-5 w-5 text-pink-800"
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
                <Listbox.Options
                  static
                  className={`
                    absolute mt-1 max-h-36 w-full overflow-auto bg-zinc-600 text-white text-xs md:text-sm shadow-lg ring-1 rounded-md ring-black ring-opacity-5 focus:outline-none sm:text-sm z-10
                    ${open ? "block" : "hidden"}
                  `}
                >
                  {TipoEstabelecimento.map((method, methodIdx) => (
                    <Listbox.Option
                      key={methodIdx}
                      className={({ active }) =>
                        `relative cursor-default select-none py-1 md:pl-10 pl-3 pr-4 text-xs md:text-sm opacity-90 z-10 ${
                          active ? "bg-zinc-500 text-white" : "text-gray-900"
                        }`
                      }
                      value={method}
                    >
                      {({ selected }) => (
                        <>
                          <span
                            className={`block truncate ${
                              selected ? "font-medium" : "font-normal"
                            }`}
                          >
                            {method.name}
                          </span>
                          {selected && (
                            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-pink-800 border-zinc-400">
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
          </>
        )}
      </Listbox>
    </div>
  );
};

export default ListCategoriaBar;
