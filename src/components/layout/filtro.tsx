import {useState, useEffect} from "react";
import {LuFilter} from "react-icons/lu";
import FiltroAge from "../filtros/filtro-age";
import FiltroTarifa from "../filtros/filtro-tarifa";
import FiltroLingua from "../filtros/filtro-lingua";
import FiltroPeito from "../filtros/filtro-peito";
import FiltroMamas from "../filtros/filtro-mamas";
import FiltroPelos from "../filtros/filtro-pelos";
import FiltroAltura from "../filtros/filtro-altura";
import FiltroOlhos from "../filtros/filtro-olhos";
import FiltroCorpo from "../filtros/filtro-corpo";
import FiltroTatuagem from "../filtros/filtro-tatuagem";
import FiltroOrigem from "../filtros/filtro-origem";
import {fetchProfiles} from "@/services/profileService";
import {Button} from "@/components/ui/button";
import {Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter} from "@/components/ui/dialog";

interface FiltrosState {
	age?: number[];
	tarifa?: number[];
	lingua?: string[];
	peito?: string;
	mamas?: string;
	pelos?: boolean;
	altura?: number[];
	olhos?: string;
	corpo?: string;
	tatuagem?: boolean;
	origem?: string;
}
interface FiltroProps {
	open: boolean;
	onOpenChange: (value: boolean) => void;
}

const Filtro: React.FC<FiltroProps> = ({open, onOpenChange}) => {
	// const [open, setOpen] = useState(false);
	const [filtros, setFiltros] = useState<FiltrosState>({});
	const [filteredProfiles, setFilteredProfiles] = useState<any[]>([]);
	const [totalProfiles, setTotalProfiles] = useState<number>(0);

	useEffect(() => {
		const loadProfiles = async () => {
			const profiles = await fetchProfiles();
			setTotalProfiles(profiles.length);
			setFilteredProfiles(profiles);
		};

		loadProfiles();
	}, []);

	useEffect(() => {
		const applyFilters = (profiles: any[], filters: FiltrosState) => {
			return profiles.filter(profile => {
				if (filters.age && !filters.age.includes(profile.age)) return false;
				if (filters.tarifa && !filters.tarifa.includes(profile.tarifa)) return false;
				if (filters.lingua && !filters.lingua.some(lang => profile.languages.includes(lang))) return false;
				if (filters.peito && filters.peito !== profile.peito) return false;
				if (filters.mamas && filters.mamas !== profile.mamas) return false;
				if (filters.pelos !== undefined && filters.pelos !== profile.pelos) return false;
				if (filters.altura && !filters.altura.includes(profile.altura)) return false;
				if (filters.olhos && filters.olhos !== profile.olhos) return false;
				if (filters.corpo && filters.corpo !== profile.corpo) return false;
				if (filters.tatuagem !== undefined && filters.tatuagem !== profile.tatuagem) return false;
				if (filters.origem && filters.origem !== profile.origem) return false;

				return true;
			});
		};

		const loadFilteredProfiles = async () => {
			const profiles = await fetchProfiles();
			const filtered = applyFilters(profiles, filtros);
			setFilteredProfiles(filtered);
		};

		loadFilteredProfiles();
	}, [filtros]);

	const handleApplyFilters = () => {
		onOpenChange(false);
	};

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent className='max-w-3xl w-full'>
				<DialogHeader>
					<DialogTitle>Filtros</DialogTitle>
				</DialogHeader>

				<div className='border-t border-gray-700 my-6'></div>

				<form className='space-y-6 overflow-y-auto'>
					<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 '>
						<FiltroAge setFiltros={setFiltros} />
						<FiltroTarifa />
						<FiltroLingua />
						<FiltroPelos />
						<FiltroMamas />
						<FiltroPeito />
						<FiltroOlhos />
						<FiltroAltura />
						<FiltroCorpo />
						<FiltroTatuagem />
						<FiltroOrigem />
					</div>

					<DialogFooter>
						<Button type='button' onClick={handleApplyFilters} className='w-full sm:w-auto bg-pink-600 text-white hover:bg-pink-700'>
							<LuFilter className='mr-2' size={22} />
							Aplicar Filtros ({filteredProfiles.length || totalProfiles})
						</Button>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	);
};

export default Filtro;
