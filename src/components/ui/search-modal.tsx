import React, {useState, useEffect} from "react";
import MainCard from "./main-card";
import {fetchProfiles} from "@/services/profileService";
import {Dialog, DialogContent, DialogTitle} from "./dialog";
import Link from "next/link";
import {VscVerifiedFilled} from "react-icons/vsc";
import {FaMapMarkerAlt} from "react-icons/fa";
import Image from "next/image";

interface SearchModalProps {
	isOpen: boolean;
	onClose: () => void;
	searchQuery: string;
	setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
}

const districts = [
	"Aveiro",
	"Beja",
	"Braga",
	"Coimbra",
	"Évora",
	"Faro",
	"Madeira",
	"Açores",
	"Leiria",
	"Lisboa",
	"Portalegre",
	"Porto",
	"Santarém",
	"Setúbal",
	"Viseu",
];

const SearchModal: React.FC<SearchModalProps> = ({isOpen, onClose, searchQuery, setSearchQuery}) => {
	const [profiles, setProfiles] = useState<any[]>([]);
	const [filteredProfiles, setFilteredProfiles] = useState<any[]>([]);
	const [currentPage, setCurrentPage] = useState(1);
	const [showMoreDistricts, setShowMoreDistricts] = useState(false);

	useEffect(() => {
		if (!isOpen) return;
		async function fetchData() {
			try {
				const fetchedProfiles = await fetchProfiles();
				setProfiles(Array.isArray(fetchedProfiles) ? fetchedProfiles : []);
			} catch (error) {
				console.error("Erro ao buscar perfis:", error);
			}
		}
		fetchData();
	}, [isOpen]);

	useEffect(() => {
		const filtered = profiles.filter(acompanhante => {
			const nome = acompanhante?.nome?.toLowerCase() || "";
			const distrito = acompanhante?.distrito?.toLowerCase() || "";
			return nome.includes(searchQuery.toLowerCase()) || distrito.includes(searchQuery.toLowerCase());
		});
		setFilteredProfiles(filtered);
	}, [searchQuery, profiles]);

	const startIndex = (currentPage - 1) * 5;
	const paginatedProfiles = filteredProfiles.slice(startIndex, startIndex + 5);

	const filterByDistrict = (district: string) => setSearchQuery(district);

	if (!isOpen) return null;

	return (
		<Dialog open={isOpen} onOpenChange={onClose}>
		  <DialogContent
			className="w-full  max-w-[70%] max-h-[90vh] bg-gray-100 dark:bg-gray-800 rounded-lg shadow-lg p-4 md:p-6 md:pb-10"
			onClick={(e) => e.stopPropagation()}
		  >
			{/* Header */}
			<div className="flex justify-between items-center mb-4">
			  <DialogTitle className="text-lg md:text-2xl font-semibold text-gray-800 dark:text-white">
				Buscar
			  </DialogTitle>
			  {/* <button
				onClick={onClose}
				className="text-gray-500 hover:text-gray-800 dark:text-gray-300 dark:hover:text-white"
			  >
				✕
			  </button> */}
			</div>
			<div className="border-t border-gray-300 dark:border-gray-600 mb-4"></div>
	  
			{/* Search Input */}
			<div className="flex flex-col gap-4 mb-4">
			  <input
				type="text"
				value={searchQuery}
				onChange={(e) => setSearchQuery(e.target.value)}
				className="w-full px-4 py-3 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
				placeholder="Digite o nome ou cidade"
			  />
			</div>
	  
			{/* Distritos Section */}
			<div className="mb-6">
			  <h2 className="text-lg font-medium text-gray-700 dark:text-gray-200 mb-4">
				Distritos
			  </h2>
			  <div className="flex flex-wrap gap-3 text-sm">
				{districts
				  .slice(0, showMoreDistricts ? districts.length : 16)
				  .map((district) => (
					<button
					  key={district}
					  onClick={() => filterByDistrict(district)}
					  className="bg-gray-300 dark:bg-gray-700 text-gray-700 dark:text-gray-200 py-2 px-4 rounded-lg hover:bg-pink-500 hover:text-white transition-colors"
					>
					  {district}
					</button>
				  ))}
			  </div>
			</div>
	  
			{/* Profiles Section */}
			<div className="overflow-x-auto max-w-full">
			  {paginatedProfiles.length > 0 ? (
				<div className="flex gap-6">
				  {profiles.map((profile, index) => (
					<div
					  key={index}
					  className="bg-white dark:bg-gray-900 rounded-lg shadow-lg overflow-hidden flex-shrink-0 w-[250px] md:w-[200px]"
					>
					  <Link href={`/escort/${profile.nome}`}>
						<div className="relative">
						  <Image
							src={profile.photos[0] || "/logo.webp"}
							alt={profile.nome}
							className="w-full h-48 object-cover"
							priority
							width={300}
							height={180}
						  />
						  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex flex-col justify-end p-4">
							<p className="text-lg font-bold text-white flex items-center">
							  {profile.nome}
							  {profile.certificado && (
								<VscVerifiedFilled className="text-green-400 ml-2" />
							  )}
							</p>
							<p className="text-sm text-gray-300 flex items-center">
							  <FaMapMarkerAlt className="text-rose-500 mr-2" />
							  {profile.cidade}
							</p>
						  </div>
						</div>
					  </Link>
					</div>
				  ))}
				</div>
			  ) : (
				<p className="text-gray-500 text-center">
				  Nenhum resultado encontrado
				</p>
			  )}
			</div>
		  </DialogContent>
		</Dialog>
	  );
	  
};

export default SearchModal;
