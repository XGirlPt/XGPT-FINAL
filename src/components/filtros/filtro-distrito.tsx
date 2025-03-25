'use client';

import React from 'react';

interface FiltroDistritoProps {
  onChange?: (value: string) => void;
  value?: string;
  disabled?: boolean;
  bgColor?: string;
}

const FiltroDistrito: React.FC<FiltroDistritoProps> = ({ onChange, value, disabled, bgColor }) => {
  const distritos = [
    'Lisboa',
    'Porto',
    'Aveiro',
    'Beja',
    'Bragança',
    'Braga',
    'Castelo Branco',
    'Coimbra',
    'Évora',
    'Faro',
    'Guarda',
    'Leiria',
    'Santarém',
    'Setúbal',
    'Viana do Castelo',
    'Vila Real',
    'Viseu',
    'Madeira',
    'Açores',
  ];

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.target.value;
    if (onChange) {
      onChange(selectedValue);
    }
  };

  return (
    <select
      value={value || ''}
      onChange={handleChange}
      disabled={disabled}
      className={`w-full p-3 rounded-full ${bgColor || 'bg-white'} text-gray-800 dark:text-gray-200 border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-pink-600`}
    >
      <option value="">Todos os distritos</option>
      {distritos.map((distrito) => (
        <option key={distrito} value={distrito}>
          {distrito}
        </option>
      ))}
    </select>
  );
};

export default FiltroDistrito;