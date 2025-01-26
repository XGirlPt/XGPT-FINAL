// import React, { useState, useCallback } from 'react';
// import Select from 'react-select';
// import axios from 'axios';
// import { debounce } from 'lodash';

// interface CityOption {
//   label: string;
//   value: string;
// }

// interface CitySelectorProps {
//   onCityChange: (city: string) => void; // Aceita uma função que recebe uma string
// }

// const CitySelector: React.FC<CitySelectorProps> = ({ onCityChange }) => {
//   const [options, setOptions] = useState<CityOption[]>([]);
//   const [loading, setLoading] = useState<boolean>(false);

//   const fetchCities = async (inputValue: string) => {
//     setLoading(true);
//     try {
//       const response = await axios.get('https://wft-geo-db.p.rapidapi.com/v1/geo/cities', {
//         params: {
//           namePrefix: inputValue,
//           countryIds: 'PT'
//         },
//         headers: {
//           'X-RapidAPI-Key': process.env.NEXT_PUBLIC_RAPIDAPI_KEY,
//           'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com'
//         }
//       });

//       const cities = response.data.data.map((city: any) => ({
//         label: `${city.city}, ${city.countryCode}`,
//         value: city.city
//       }));
//       setOptions(cities);
//     } catch (error) {
//       console.error("Error fetching cities:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Debounced version of the fetchCities function
//   const debouncedFetchCities = useCallback(
//     debounce((inputValue: string) => fetchCities(inputValue), 200),
//     [] // Empty dependency array ensures the debounce function is stable and doesn't change
//   );

//   return (
//     <Select
//       placeholder="Digite o nome da cidade..."
//       onInputChange={(inputValue) => {
//         if (inputValue.length >= 2) debouncedFetchCities(inputValue);
//       }}
//       onChange={(selectedOption) => {
//         if (selectedOption) {
//           console.log("Cidade selecionada:", selectedOption.value);
//           onCityChange(selectedOption.value);
//         }
//       }}
//       options={options}
//       isLoading={loading}
//       noOptionsMessage={() => "Nenhuma cidade encontrada"}
//     />
//   );
// };

// export default CitySelector;
