import React, {useState} from "react";
import CommonFilter from "../filtros/common-filter";

interface Option {
	id: number;
	name: string;
	unavailable: boolean;
}

const TipoConta: Option[] = [
	{id: 1, name: "Anunciante", unavailable: false},
	{id: 2, name: "Membro", unavailable: false},
	{id: 3, name: "Estabelecimento", unavailable: false},
];

interface ListRegisterProps {
	handleOptionSelect: (option: Option) => void;
}

const ListRegister: React.FC<ListRegisterProps> = ({handleOptionSelect}) => {
	const [selectedOption, setSelectedOption] = useState<Option | null>(null);

	const handleChange = (newValue: string) => {
		const option = TipoConta.find(opt => opt.name === newValue);
		if (option) {
			setSelectedOption(option);
			handleOptionSelect(option);
		}
	};

	return <CommonFilter label='Tipo de Conta' options={TipoConta} value={selectedOption?.name || null} onChange={handleChange} placeholder='------' />;
};

export default ListRegister;
