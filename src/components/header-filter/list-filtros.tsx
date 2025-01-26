
// import { useState } from "react";
// import { Listbox } from "@headlessui/react";
// import { MdKeyboardArrowDown } from "react-icons/md";
// import PropTypes from 'prop-types';

// const continent = [
//   { id: 1, name: 'Lisboa', unavailable: false },
//   { id: 2, name: 'Porto', unavailable: false },
//   { id: 3, name: 'Braga', unavailable: false },
//   { id: 4, name: 'Faro', unavailable: false },
//   { id: 5, name: 'sintra', unavailable: false },
// ]

// function ListFiltros( {handleContinentChange, darkMode }) {
//   const [selectedContinent, setSelectedContinent] = useState({ name: 'Filtros' });

//   const handleLocalContinentChange = (selectedContinent) => {
//     setSelectedContinent(selectedContinent);
//     handleContinentChange(selectedContinent); // Chama a função do componente pai
//   };
  
//     return (
//         <div>
//       <Listbox value={selectedContinent} onChange={handleLocalContinentChange}>
//         <Listbox.Button className="flex justify-center px-10 mt-2 py-1 w-56 shadow-sm border border-yellow-500 hover:bg-yellow-500 hover:text-black text-md rounded-full items-center text-yellow-500  bg-[#2b3945]"
// >
//     {selectedContinent.name}
//     <MdKeyboardArrowDown size={18}/>
//   </Listbox.Button>          
//   <Listbox.Options className={`absolute z-10 mt-2 py-4 px-4 w-44 bg-zinc-800 text-white text-xs border rounded-sm shadow-md cursor-pointer ${darkMode ? 'text-white dark:bg-[#2b3945]' : 'text-gray-600 bg-white'}`}>
//             {continent.map((continent) => (
//               <Listbox.Option
//               className="py-1"
//                 key={continent.id}
//                 value={continent}
//                 disabled={continent.unavailable}
//               >
            
//                 {continent.name}
                
//               </Listbox.Option>
//             ))}
//           </Listbox.Options>
//        </Listbox>
//         </div>
//     );
//   }

  
//   export default ListFiltros;