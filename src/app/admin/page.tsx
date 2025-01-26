"use client";
import {useState, useEffect} from "react";
import {useRouter} from "next/navigation";

import Image from "next/image";
import {ToastContainer, toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {useSelector} from "react-redux";
import CommonInput from "@/components/ui/common-input";
import SideBarAdmin from "./_ui/side-bar-admin";
import {profileDataService} from "@/services/profileDataService";

const AdminPage: React.FC = () => {
	const [pendingProfiles, setPendingProfiles] = useState<Profile[]>([]);
	const [approvedProfiles, setApprovedProfiles] = useState<Profile[]>([]);
	const [inactiveProfiles, setInactiveProfiles] = useState<Profile[]>([]);
	const [certificatedProfiles, setCertificatedProfiles] = useState<Profile[]>([]);
	const [NoncertificatedProfiles, setNoncertificatedProfiles] = useState<Profile[]>([]);
	const [activeSection, setActiveSection] = useState<string>("pending");
	const [expandedProfile, setExpandedProfile] = useState<number | null>(null);
	const [searchTerm, setSearchTerm] = useState<string>("");

	const router = useRouter();
	const userEmail = useSelector((state: any) => state.profile?.profile.email);

	useEffect(() => {
		const authorizedEmails = process.env.NEXT_PUBLIC_AUTHORIZED_EMAILS?.split(",") || [];
		if (!userEmail || !authorizedEmails.includes(userEmail)) {
			router.push("/login");
		}
	}, [userEmail, router]);

	useEffect(() => {
		fetchProfiles();
	}, []);

	const fetchProfiles = async () => {
		try {
			const [pending, approved, inactive, certificated, nonCertificated] = await Promise.all([
				profileDataService.getPendingProfiles(),
				profileDataService.getApprovedProfiles(),
				profileDataService.getInactiveProfiles(),
				profileDataService.getCertificatedProfiles(),
				profileDataService.getNonCertificatedProfiles(),
			]);

			setPendingProfiles(pending);
			setApprovedProfiles(approved);
			setInactiveProfiles(inactive);
			setCertificatedProfiles(certificated);
			setNoncertificatedProfiles(nonCertificated);
		} catch (error) {
			console.error("Error fetching profiles:", error);
			toast.error("Erro ao carregar os perfis. Tente novamente.");
		}
	};

	const handleApprove = async (id: number) => {
		try {
			await profileDataService.approveProfile(id);
			const approvedProfile = pendingProfiles.find(profile => profile.id === id) || inactiveProfiles.find(profile => profile.id === id);

			await fetchProfiles();
			if (approvedProfile) {
				toast.success(`O perfil de ${approvedProfile.nome} foi aprovado.`);
			}
		} catch (error) {
			console.error("Error approving profile:", error);
			toast.error("Erro ao aprovar o perfil. Tente novamente.");
		}
	};

	const handleReject = async (id: number) => {
		try {
			await profileDataService.rejectProfile(id);
			const rejectedProfile = approvedProfiles.find(profile => profile.id === id) || pendingProfiles.find(profile => profile.id === id);

			await fetchProfiles();
			if (rejectedProfile) {
				toast.success(`O perfil de ${rejectedProfile.nome} foi rejeitado com sucesso.`);
			}
		} catch (error) {
			console.error("Error rejecting profile:", error);
			toast.error("Erro ao rejeitar o perfil. Tente novamente.");
		}
	};

	const handleRejectCertificado = async (id: number) => {
		try {
			await profileDataService.rejectCertificate(id);
			const rejectedProfile = certificatedProfiles.find(profile => profile.id === id);

			await fetchProfiles();
			if (rejectedProfile) {
				toast.success(`O perfil de ${rejectedProfile.nome} foi rejeitado com sucesso.`);
			}
		} catch (error) {
			console.error("Error rejecting certificate:", error);
			toast.error("Erro ao rejeitar o certificado. Tente novamente.");
		}
	};

	const handleAceptCertificado = async (id: number) => {
		try {
			await profileDataService.acceptCertificate(id);
			const acceptedProfile = approvedProfiles.find(profile => profile.id === id);

			await fetchProfiles();
			if (acceptedProfile) {
				toast.success(`O perfil de ${acceptedProfile.nome} foi certificado com sucesso.`);
			}
		} catch (error) {
			console.error("Error accepting certificate:", error);
			toast.error("Erro ao certificar o perfil. Tente novamente.");
		}
	};

	const toggleExpandProfile = (id: number) => {
		setExpandedProfile(expandedProfile === id ? null : id);
	};

	const filteredProfiles = (profiles: Profile[]) => {
		return profiles.filter(profile =>
			// Check if nome exists before calling toLowerCase
			(profile.nome || "").toLowerCase().includes(searchTerm.toLowerCase())
		);
	};

	const renderProfileList = (profiles: Profile[], title: string, approveHandler?: (id: number) => void, rejectHandler?: (id: number) => void) => (
		<div className='ml-10'>
			<h2 className='text-2xl text-white mb-4'>{title}</h2>
			{/* <input
        type="text"
        placeholder="Procurar perfis..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mb-4 px-4 py-2 rounded-lg bg-gray-200 text-gray-900 w-full"
      /> */}
			<CommonInput
				label='Procurar perfis'
				value={searchTerm}
				onChange={(e: any) => setSearchTerm(e.target.value)}
				placeholder='Procurar perfis...'
				className='mb-4'
			/>
			{filteredProfiles(profiles).length === 0 ? (
				<p className='text-white'>Nenhum perfil nesta seção</p>
			) : (
				<ul className='space-y-4'>
					{filteredProfiles(profiles).map(profile => (
						<li key={profile.id} className='flex flex-col p-6 bg-gray-800 rounded-lg shadow-lg space-y-4'>
							<div className='flex items-center space-x-6'>
								{profile.photoURL ? (
									<Image
										src={profile.photoURL || "/logo.webp"}
										alt={`Profile Photo`}
										className='w-20 h-20 object-cover rounded-full border-2 border-gray-700'
										width={80}
										height={80}
										loading='lazy'
									/>
								) : (
									<p className='text-white'>Sem fotos</p>
								)}

								{profile.vphotoURL ? (
									<Image
										src={profile.vphotoURL || "/logo.webp"}
										alt={`Profile Photo`}
										className='w-20 h-20 object-cover rounded-full border-2 border-gray-700'
										width={80}
										height={80}
										loading='lazy'
									/>
								) : (
									<p className='text-white'>Sem fotos</p>
								)}
								<div className='flex-1 text-white'>
									<p className='font-semibold text-xl'>Nome: {profile.nome}</p>
									<p>Email: {profile.email}</p>
									<p>UserUID: {profile.userUID}</p>
								</div>

								<div className='flex items-center space-x-4'>
									{/* Seta para expandir/colapsar */}
									<button
										onClick={() => toggleExpandProfile(profile.id)}
										className='p-2 rounded-full bg-gray-600 text-white hover:bg-gray-500 transition-all duration-300 flex items-center justify-center w-10 h-10'
										aria-label='Expandir/Colapsar perfil'
									>
										{expandedProfile === profile.id ? "▲" : "▼"}
									</button>
									{/* Botões Aprovar/Rejeitar */}
									{approveHandler && (
										<button
											onClick={() => approveHandler(profile.id)}
											className='px-4 py-2 rounded-lg bg-green-500 text-white hover:bg-green-600 transition-all duration-300'
										>
											Aprovar
										</button>
									)}
									{rejectHandler && (
										<button
											onClick={() => rejectHandler(profile.id)}
											className='px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition-all duration-300'
										>
											Rejeitar
										</button>
									)}
								</div>
							</div>

							{/* Informações adicionais (expand/collapse) */}
							{expandedProfile === profile.id && (
								<div className='bg-gray-700 p-4 rounded-lg space-y-2 text-white'>
									<p>Idade: {profile.idade}</p>
									<p>Cidade: {profile.cidade}</p>
									<p>Distrito: {profile.distrito}</p>
									<p>Lingua: {profile.lingua}</p>
									<p>Origem: {profile.origem}</p>
									<p>Mamas: {profile.mamas}</p>
									<p>Altura: {profile.altura}</p>
									<p>Tatuagens: {profile.tatuagens}</p>
									<p>Pelos: {profile.pelos}</p>
									<p>Olhos: {profile.olhos}</p>
									<p>Silicone: {profile.seios}</p>
									<p>Signo: {profile.signo}</p>
									<p>Preço: {profile.tarifa}</p>
								</div>
							)}
						</li>
					))}
				</ul>
			)}
		</div>
	);

	const renderProfiles = () => {
		switch (activeSection) {
			case "pending":
				return renderProfileList(pendingProfiles, `Perfis Pendentes (${pendingProfiles.length})`, handleApprove, handleReject);
			case "approved":
				return renderProfileList(approvedProfiles, `Perfis Aprovados (${approvedProfiles.length})`, undefined, handleReject); // Rejeitar aqui também
			case "rejected":
				return renderProfileList(inactiveProfiles, `Perfis Nao Aprovados (${inactiveProfiles.length})`, handleApprove, undefined);
			case "certified":
				return renderProfileList(certificatedProfiles, `Perfis Certificados (${certificatedProfiles.length})`, undefined, handleRejectCertificado); // Rejeitar aqui também

			case "noncertified":
				return renderProfileList(NoncertificatedProfiles, `Perfis Nao Certificados (${NoncertificatedProfiles.length})`, handleAceptCertificado, undefined);
			default:
				return <p className='text-white'>Selecione uma seção</p>;
		}
	};

	return (
		<div className='min-h-screen flex bg-gray-900'>
			<ToastContainer />

			{/* Sidebar fixada */}
			<div className='bg-gray-300 w-64 sticky top-0'>
				<SideBarAdmin activeSection={activeSection} setActiveSection={setActiveSection} />
			</div>

			<div className='flex-1'>
				<main className='relative'>
					{/* Painel de Administração fixo no topo */}
					<div className='bg-gray-900 top-0 left-0 right-0 p-6 z-10 border-b border-gray-800 sticky'>
						<h1 className='text-4xl font-bold text-white'>Painel de Administração</h1>
					</div>

					{/* Conteúdo de Perfis com Scroll */}
					<div className='mt-4 px-10'>{renderProfiles()}</div>
				</main>
			</div>
		</div>
	);
};

export default AdminPage;
