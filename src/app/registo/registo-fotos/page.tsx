"use client";

import React, {useState, ChangeEvent} from "react";
import {useSelector, useDispatch} from "react-redux";
import Link from "next/link";
import {IoTrashBin} from "react-icons/io5";
import supabase from "@/database/supabase";
import {updatePhotos, updateVPhotos} from "@/actions/ProfileActions";
import {BlurImage} from "@/components/ui/blur-image";
import {Button} from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle} from "@/components/ui/dialog";
import {Switch, FormControlLabel, } from "@mui/material";
import {useTranslation} from "react-i18next";



const RegistoFotos: React.FC = () => {
	const dispatch = useDispatch();
	const userUID = useSelector((state: any) => state.profile?.profile.userUID);
	const photosFromRedux = useSelector((state: any) => state.profile.profile.photos || []);
	const vphotosFromRedux = useSelector((state: any) => state.profile.profile.vphotos || []);

	const [selectedPhotos, setSelectedPhotos] = useState<string[]>(photosFromRedux);
	const [VselectedPhotos, VsetSelectedPhotos] = useState<string[]>(vphotosFromRedux);


	const {t, i18n} = useTranslation();

	const handleDeletePhoto = (index: number) => {
		const updatedPhotos = [...selectedPhotos];
		updatedPhotos.splice(index, 1);
		setSelectedPhotos(updatedPhotos);
		dispatch(updatePhotos(updatedPhotos));
	};

	const handleFileUpload = async (event: ChangeEvent<HTMLInputElement>) => {
		if (event.target.files && event.target.files.length > 0) {
			const files = Array.from(event.target.files).slice(0, 10);
			const uploadedPhotoURLs: string[] = [];

			const uploadPromises = files.map(async file => {
				const filePath = `${userUID}/${file.name.toLowerCase().replace(/ /g, "_").replace(/\./g, "_")}.webp`;
				try {
					const {data, error} = await supabase.storage.from("profileFoto").upload(filePath, file);

					if (error) throw new Error(error.message);
					const publicURLFoto = `https://ulcggrutwonkxbiuigdu.supabase.co/storage/v1/object/public/profileFoto/${filePath}`;
					uploadedPhotoURLs.push(publicURLFoto);
					console.log("Foto de perfil carregada:", publicURLFoto);
				} catch (error: any) {
					console.error("Erro durante o upload:", error.message);
				}
			});

			await Promise.all(uploadPromises);
			const newSelectedPhotos = [...selectedPhotos, ...uploadedPhotoURLs];
			setSelectedPhotos(newSelectedPhotos);
			dispatch(updatePhotos(newSelectedPhotos));
		}
	};

	const handleDeleteVerificationPhoto = (index: number) => {
		const updatedVPhotos = [...VselectedPhotos];
		updatedVPhotos.splice(index, 1); // Remove a foto de verificação pelo índice
		VsetSelectedPhotos(updatedVPhotos); // Atualiza o estado local
		dispatch(updateVPhotos(updatedVPhotos)); // Atualiza o estado globalmente usando Redux
		console.log("Foto de verificação removida.");
	};

	const handleVerificationPhotoUpload = async (event: ChangeEvent<HTMLInputElement>) => {
		if (event.target.files && event.target.files.length > 0) {
			const file = event.target.files[0]; // Apenas uma foto de verificação permitida
			const fileName =
				file.name
					.toLowerCase()
					.replace(/ /g, "_")
					.replace(/[^a-z0-9_]/g, "") + ".webp";
			const filePath = `${userUID}/${fileName}`;

			try {
				const {data, error} = await supabase.storage.from("verificationFoto").upload(filePath, file);

				if (error) {
					console.error("Erro durante o upload:", error.message);
				} else {
					const publicURLFotoV = `https://ulcggrutwonkxbiuigdu.supabase.co/storage/v1/object/public/verificationFoto/${filePath}`;
					VsetSelectedPhotos([publicURLFotoV]);
					dispatch(updateVPhotos([publicURLFotoV]));
					console.log("Foto de verificação carregada:", publicURLFotoV);
				}
			} catch (error: any) {
				console.error("Erro durante o upload:", error.message);
			}
		}
	};




	return (
		<Dialog open onClose={() => {}} fullWidth>
		  <DialogContent className="max-w-4xl w-full h-2/3 md:h-4/5 sm:max-h-[80vh] p-0 overflow-hidden">
			<DialogHeader className="bg-pink-900 p-6 px-4 md:px-10">
			  <h1 className="text-3xl font-bold tracking-wide text-white">Escolhe as tuas Fotos</h1>
			  <DialogTitle className="text-sm text-gray-200">
				Complete as informações para começar no <strong>Xgirl.pt</strong>
			  </DialogTitle>
			</DialogHeader>
	  
			{/* Seção de Fotos de Perfil e Foto de Verificação em Grid */}
			<div className="px-4 space-y-6 overflow-hidden">
			  {/* Grid com Fotos de Perfil e Foto de Verificação lado a lado */}
			  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
				{/* Fotos de Perfil */}
				<div>
				  <div className="px-8 pt-6">
					<h2 className="text-pink-500 text-xl font-semibold">Fotos de Perfil</h2>
					<p className="text-gray-300 mt-2">
					  Podes adicionar até <span className="font-semibold">10 Fotos</span>.
					</p>
				  </div>
	  
				  {/* Grid de fotos e placeholders (tamanho reduzido) */}
				  <div className="grid grid-cols-4 gap-2 mx-2 my-4">
					{selectedPhotos.length < 10 &&
					  Array.from({ length: 10 - selectedPhotos.length }).map((_, index) => (
						<div key={`placeholder-${index}`} className="relative">
						  <div className="w-24 h-24 flex items-center justify-center bg-gray-700 border border-gray-600 rounded-md text-gray-500">
							<span className="text-xs">Adicionar Foto</span>
						  </div>
						</div>
					  ))}
					{selectedPhotos.map((photo, index) => (
					  <div key={index} className="relative">
						{photo && (
						  <>
							<BlurImage
							  src={photo}
							  alt={`Foto ${index}`}
							  className="w-full h-24 object-cover rounded-md border border-gray-600"
							/>
							<IoTrashBin
							  size={20}
							  className="absolute top-1 right-1 cursor-pointer text-white bg-gray-700 hover:bg-red-600 p-1 rounded-full transition-colors"
							  onClick={() => handleDeletePhoto(index)}
							/>
						  </>
						)}
					  </div>
					))}
				  </div>
	  
				  {/* Botão de adicionar fotos de perfil (tamanho reduzido) */}
				  <div className="px-8 flex items-center justify-start mt-4">
					<label
					  htmlFor="upload-photo"
					  className="text-xs text-white bg-green-600 px-4 py-1 rounded-lg cursor-pointer hover:bg-green-500 transition"
					>
					  Adicionar Foto
					</label>
					<input
					  type="file"
					  id="upload-photo"
					  style={{ display: "none" }}
					  onChange={handleFileUpload}
					  multiple
					/>
				  </div>
				</div>
	  
				{/* Foto de Verificação */}
				<div>
				  <div className="px-8 pt-6">
					<h2 className="text-pink-500 text-xl font-semibold">Foto de Verificação</h2>
					<p className="text-gray-300 mt-2">
					  Adiciona uma foto de verificação para obteres um <span className="font-semibold">Perfil Certificado</span>.
					</p>
				  </div>
	  
				  {/* Placeholder para foto de verificação */}
				  <div className="flex justify-center mt-6">
					{VselectedPhotos.length > 0 ? (
					  VselectedPhotos.map((vphoto, index) => (
						<div key={index} className="relative w-36 h-36">
						  <BlurImage
							src={vphoto}
							alt={`Foto de Verificação ${index}`}
							className="w-full h-full object-cover rounded-md border border-gray-600"
						  />
						  <IoTrashBin
							size={20}
							className="absolute top-1 right-1 cursor-pointer text-white bg-gray-700 hover:bg-red-600 p-1 rounded-full transition-colors"
							onClick={() => handleDeleteVerificationPhoto(index)}
						  />
						</div>
					  ))
					) : (
					  <div className="w-36 h-36 flex items-center justify-center bg-gray-700 border border-gray-600 rounded-md text-gray-500">
						<span className="text-xs">Adicionar Foto</span>
					  </div>
					)}
				  </div>
	  
				  {/* Botão de adicionar foto de verificação (tamanho reduzido) */}
				  <div className="px-8 flex items-center justify-center mt-4">
					<label
					  htmlFor="upload-verification-photo"
					  className="text-xs text-white bg-green-600 px-4 py-1 rounded-lg cursor-pointer hover:bg-green-500 transition"
					>
					  Adicionar Foto
					</label>
					<input
					  type="file"
					  id="upload-verification-photo"
					  style={{ display: "none" }}
					  onChange={handleVerificationPhotoUpload}
					/>
				  </div>
				</div>
			  </div>
			</div>
	  
			{/* Footer */}
			<DialogFooter className="bg-gray-800 pb-4 flex justify-around">
			  <Link href="/registo/registo-contacto">
				<Button variant="voltar" color="secondary" className="px-6 py-3 bg-gray-500 hover:bg-gray-700 text-white rounded-lg text-sm font-medium transition">
				  {t('button.back')}
				</Button>
			  </Link>
			  <Link href="/registo/registo-pagamento">
				<Button variant="guarder" color="primary" className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm font-medium transition">
				  {t('button.createAccount')}
				</Button>
			  </Link>
			</DialogFooter>
		  </DialogContent>
		</Dialog>
	  );
	  
};

export default RegistoFotos;
