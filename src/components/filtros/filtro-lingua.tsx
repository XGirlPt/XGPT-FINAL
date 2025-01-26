import React from "react";
import CommonFilter from "./common-filter";

const linguaOptions = [
  { id: 1, name: "Portugues", unavailable: false },
  { id: 2, name: "Ingles", unavailable: false },
  { id: 3, name: "Frances", unavailable: false },
  { id: 4, name: "Espanhol", unavailable: true },
  { id: 5, name: "Italiano", unavailable: false },
  { id: 6, name: "Russo", unavailable: false },
];

interface FiltroLinguaProps {
  onChange?: (value: string) => void;
}

const FiltroLingua: React.FC<FiltroLinguaProps> = ({ onChange }) => {
  return (
    <CommonFilter
      label="Idioma"
      options={linguaOptions}
      value={null}
      onChange={(value) => onChange?.(value)}
      placeholder="------"
    />
  );
};

export default FiltroLingua;
