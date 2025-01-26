import FilterList, {FilterOption} from "./filter-list";

const categories: FilterOption[] = [
	{id: 1, name: "Mulheres", unavailable: false},
	{id: 2, name: "Homens", unavailable: false},
	{id: 3, name: "Trans", unavailable: false},
	{id: 4, name: "..", unavailable: false},
	{id: 5, name: "Cascais", unavailable: false},
];

const ListCategory: React.FC<{
	handleContinentChange: (option: FilterOption) => void;
	darkMode: boolean;
}> = ({handleContinentChange, darkMode}) => {
	return <FilterList options={categories} defaultText='Categoria' onChange={handleContinentChange} darkMode={darkMode} />;
};
export default ListCategory;
