import {useState} from "react";
import ListDistritos from "../header-filter/list-distritos";
import ListCidade from "../header-filter/list-cidade";
import ListCategory from "../header-filter/list-category";
import Filtro from "./filtro";
interface Distrito {
	id: number;
	name: string;
	unavailable: boolean;
}
interface FilterBarProps {
	setSelectedDistrito?: (distrito: Distrito) => void;
}

const FilterBar: React.FC<FilterBarProps> = ({setSelectedDistrito}) => {
	const [filtroAberto, setFiltroAberto] = useState<boolean>(false);

	const toggleFiltro = () => {
		setFiltroAberto(!filtroAberto);
	};

	return (
		<div className='w-full bg-gray-800 mb-8'>
			<div className='flex mx-auto md:mx-20 my-1 justify-between  h-16 items-center'>
				{setSelectedDistrito && <ListDistritos setSelectedDistrito={setSelectedDistrito} />}
				<div className='max-w-[200px] w-full'>
					<ListCidade darkMode handleContinentChange={() => console.log("Mudou a cidade")} />
				</div>

				<div className='max-w-[200px] w-full'>
					<ListCategory darkMode handleContinentChange={() => console.log("Mudou a categoria")} />
				</div>
			</div>
			{filtroAberto && <Filtro />}
		</div>
	);
};

export default FilterBar;
