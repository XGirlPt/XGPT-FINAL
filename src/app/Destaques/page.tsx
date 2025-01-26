"use client";
import React, {useState, useEffect} from "react";
import Header from "@/components/layout/header";
import FilterBar from "@/components/layout/filter-bar";
import {fetchProfiles} from "@/services/profileService";
import Footer from "@/components/layout/footer";
import {VscVerifiedFilled} from "react-icons/vsc";
import {FaMapMarkerAlt} from "react-icons/fa";
import Link from "next/link";
import {BlurImage} from "@/components/ui/blur-image";

interface Profile {
	nome: string;
	distrito?: string;
	photos: string[];
}

function Destaques() {
	const [profiles, setProfiles] = useState<Profile[]>([]);
	const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
	const [randomIndices, setRandomIndices] = useState<number[]>([]);

	useEffect(() => {
		async function fetchData() {
			try {
				const combinedProfiles: Profile[] = await fetchProfiles();
				setProfiles(combinedProfiles);

				// Gerar índices aleatórios únicos para cada perfil
				const indices = Array.from({length: combinedProfiles.length}, (_, i) => i);
				const shuffledIndices = indices.sort(() => Math.random() - 0.5);
				setRandomIndices(shuffledIndices);
			} catch (error: any) {
				console.error("Error fetching profiles:", error.message);
			}
		}
		fetchData();
	}, []);

	const handleMouseEnter = (index: number) => {
		setHoveredIndex(index);
	};

	const handleMouseLeave = () => {
		setHoveredIndex(null);
	};

	const mapIndexToGridPosition = (index: number) => {
		// Definir um padrão de formato para os casos
		const pattern = [
			{colSpan: 1, rowSpan: 2},
			{colSpan: 2, rowSpan: 3},
			{colSpan: 2, rowSpan: 1},
			{colSpan: 3, rowSpan: 2},
			{colSpan: 1, rowSpan: 2},
			{colSpan: 2, rowSpan: 2},
			{colSpan: 1, rowSpan: 2},
			// Adicione mais padrões conforme necessário
		];

		// Retornar o padrão correspondente ao índice
		return pattern[index % pattern.length];
	};

	const getRandomImageHeight = () => {
		// Retorne uma altura aleatória dentro do intervalo desejado
		return Math.floor(Math.random() * (300 - 150 + 1)) + 150; // Intervalo entre 150 e 300 pixels
	};

	return (
		<div className='text-gray-600 bg-[#1b1b1b]'>
			<div className='pt-24'>
				<FilterBar />
				<div className='flex justify-center'>
					<p className='text-pink-800 text-4xl justify-center'>Destaque da semana: Loiras</p>
				</div>
			</div>

			<div className='grid grid-cols-6 grid-rows-6 gap-6 mt-10 mx-10 overflow-y-auto'>
				{randomIndices.map((randomIndex, index) => {
					const {colSpan, rowSpan} = mapIndexToGridPosition(index);
					const imageHeight = getRandomImageHeight(); // Calcular a altura da imagem dentro do loop
					const profile = profiles[randomIndex];

					return (
						<div
							key={index}
							style={{
								gridColumn: `span ${colSpan}`,
								gridRow: `span ${rowSpan}`,
							}}
						>
							{profile && profile.photos && profile.photos.length > 0 && (
								<div className='relative group w-full h-full ' onMouseEnter={() => handleMouseEnter(index)} onMouseLeave={handleMouseLeave}>
									<Link href={`/girls/${profile.nome}`} className='blur-2xl'>
										{profile.photos.slice(0, 3).map((photo, photoIndex) => (
											// eslint-disable-next-line @next/next/no-img-element
											<BlurImage
												key={photoIndex}
												src={photo || "/logo.webp"}
												alt={`Profile ${profile.nome}`}
												className='w-full h-full object-cover rounded-2xl hover:opacity-60 overflow-hidden transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-zinc-600 hover:shadow-xl cursor-pointer'
												style={{height: `${imageHeight}px`}} 
												height={150}
												width={150}
												// Definir a altura da imagem
											/>
										))}
									</Link>
									{hoveredIndex === index && profile.distrito && (
										<p className='absolute top-4 left-4 z-10 text-white text-sm flex items-center overflow-hidden transition duration-100 ease-in-out transform'>
											{profile.distrito}
											<FaMapMarkerAlt size={24} className='text-pink-800 ml-2 align-middle items-center' />
										</p>
									)}
									<p className='absolute bottom-4 right-4 z-10 text-white text-lg flex items-center'>
										{profile.nome}
										<VscVerifiedFilled size={24} className='text-green-400 ml-2 align-middle items-center' />
									</p>
								</div>
							)}
						</div>
					);
				})}
			</div>
		</div>
	);
}

export default Destaques;
