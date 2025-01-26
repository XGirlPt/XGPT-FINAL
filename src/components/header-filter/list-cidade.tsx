import FilterList, {FilterOption} from "./filter-list";

interface Continent {
	id: number;
	name: string;
	unavailable: boolean;
}

const continentList: Continent[] = [
	{id: 1, name: "Lisboa", unavailable: false},
	{id: 2, name: "Sintra", unavailable: false},
	{id: 3, name: "Amadora", unavailable: false},
	{id: 4, name: "Mafra", unavailable: false},
	{id: 5, name: "Cascais", unavailable: false},
];

const ListCidade: React.FC<{
	handleContinentChange: (option: FilterOption) => void;
	darkMode: boolean;
}> = ({handleContinentChange, darkMode}) => {
	return (
		<FilterList
			options={continentList} // Your existing city options
			defaultText='Cidade'
			onChange={handleContinentChange}
			darkMode={darkMode}
		/>
	);
};

export default ListCidade;
