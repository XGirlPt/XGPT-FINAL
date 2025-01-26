import { useState, useEffect } from "react";
import { Listbox } from "@headlessui/react";
import { FiChevronDown } from "react-icons/fi";
import { Profile } from "@/types"; // Certifique-se de ajustar o caminho conforme seu projeto

interface FilterComponentProps {
  profiles: Profile[];
  onFilter: (filteredProfiles: Profile[]) => void;
}

const distritos = [
  "Aveiro",
  "Beja",
  "Braga",
  "Bragança",
  "Castelo Branco",
  "Coimbra",
  "Évora",
  "Faro",
  "Guarda",
  "Leiria",
  "Lisboa",
  "Portalegre",
  "Porto",
  "Santarém",
  "Setúbal",
  "Viana do Castelo",
  "Vila Real",
  "Viseu"
];

export default function FilterComponent({ profiles, onFilter }: FilterComponentProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDistrito, setSelectedDistrito] = useState("Distrito");

  // Atualiza os perfis filtrados de acordo com o nome e o distrito selecionado
  useEffect(() => {
    const filtered = profiles.filter(
      (profile) =>
        profile.nome.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (selectedDistrito === "Distrito" || profile.distrito === selectedDistrito)
    );
    onFilter(filtered);
  }, [searchTerm, selectedDistrito, profiles, onFilter]);

  const totalProfiles = profiles.length;

  return (
<div className="flex items-start gap-3 w-1/2">
  {/* Dropdown de seleção de distrito */}
  <div className="relative w-1/4">
    <Listbox value={selectedDistrito} onChange={setSelectedDistrito}>
      <Listbox.Button className="w-full px-3 py-2 bg-pink-800 text-white rounded-lg shadow-lg flex justify-between items-center hover:bg-pink-700 transition-colors">
        {selectedDistrito === "Distrito"
          ? `Distrito (${totalProfiles})`
          : `${selectedDistrito}`}
        <FiChevronDown className="w-4 h-4 ml-2" />
      </Listbox.Button>
      <Listbox.Options className="absolute w-full mt-2 bg-gray-800 text-white rounded-lg shadow-lg z-20 max-h-60 overflow-auto border border-gray-700">
        <Listbox.Option
          key="Distrito"
          value="Distrito"
          className={({ active }) =>
            `cursor-pointer select-none p-2 ${
              active ? "bg-pink-900" : "bg-gray-800"
            }`
          }
        >
          Distrito ({totalProfiles})
        </Listbox.Option>
        {distritos.map((distrito, index) => (
          <Listbox.Option
            key={index}
            value={distrito}
            className={({ active }) =>
              `cursor-pointer select-none p-2 flex justify-between ${
                active ? "bg-pink-600" : "bg-gray-800"
              }`
            }
          >
            <span>{distrito}</span>
            <span className="text-sm text-gray-400">
              ({profiles.filter((profile) => profile.distrito === distrito).length})
            </span>
          </Listbox.Option>
        ))}
      </Listbox.Options>
    </Listbox>
  </div>

  {/* Input de busca por nome */}
  <div className="flex-1">
    <input
      type="text"
      className="w-full px-3 py-2 text-white bg-gray-800 rounded-lg shadow-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all"
      placeholder="Buscar por nome ou tag..."
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
    />
  </div>
</div>

  );
}
