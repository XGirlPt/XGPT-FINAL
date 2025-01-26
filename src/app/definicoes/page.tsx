"use client";

import React, {useState} from "react";
import {FaUser} from "react-icons/fa";
import Image from "next/image";
import {useSelector} from "react-redux";
import {useRouter} from "next/navigation";
import {FaEnvelope, FaLock, FaCreditCard, FaUserCircle} from "react-icons/fa";
import Email from "./_ui/Email";
import Password from "./_ui/Password";
import Billing from "./_ui/Billing";
import AccountSettings from "./_ui/AccountSettings";

const Definicoes: React.FC = () => {
	const router = useRouter();
	const nomeRedux = useSelector((state: any) => state.profile?.profile.nome);

	const [newPassword, setNewPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [error, setError] = useState(null);
	const [success, setSuccess] = useState(null);
	const [activeSection, setActiveSection] = useState("email");
	const [status, setStatus] = useState(null);

	const handleVerPerfil = () => {
		router.push(`/escort/${nomeRedux}`);
	};

	return (
		<div className='bg-gray-900 text-gray-100 h-full flex'>
			<aside className='bg-gradient-to-b from-gray-900 to-gray-700 w-64 shadow-xl fixed  h-full'>
				<div className='flex justify-center mb-12'>
					<Image src='/photos/logo1.png' alt='logo' width={160} height={0} className='w-40 h-auto object-contain mt-1' />
				</div>

				<nav className='space-y-2 mx-4'>
					<button
						onClick={() => setActiveSection("email")}
						className={`flex items-center justify-start w-full p-3 rounded-lg transition-all hover:bg-pink-700 text-white shadow-lg ${
							activeSection === "email" ? "bg-pink-800" : "bg-gray-800"
						}`}
					>
						<FaEnvelope className='text-2xl' />
						<span className='ml-4 text-lg'>Email</span>
					</button>

					<button
						onClick={() => setActiveSection("password")}
						className={`flex items-center justify-start w-full p-3 rounded-lg transition-all hover:bg-pink-700 text-white shadow-lg ${
							activeSection === "password" ? "bg-pink-800" : "bg-gray-800"
						}`}
					>
						<FaLock className='text-2xl' />
						<span className='ml-4 text-lg'> Palavra-passe</span>
					</button>

					<button
						onClick={() => setActiveSection("payment")}
						className={`flex items-center justify-start w-full p-3 rounded-lg transition-all hover:bg-pink-700 text-white shadow-lg ${
							activeSection === "payment" ? "bg-pink-800" : "bg-gray-800"
						}`}
					>
						<FaCreditCard className='text-2xl' />
						<span className='ml-4 text-lg'>Subscrição</span>
					</button>

					<button
						onClick={() => setActiveSection("Conta")}
						className={`flex items-center justify-start w-full p-3 rounded-lg transition-all hover:bg-pink-700 text-white shadow-lg ${
							activeSection === "Conta" ? "bg-pink-800" : "bg-gray-800"
						}`}
					>
						<FaUser className='text-2xl' />
						<span className='ml-4 text-lg'>Conta</span>
					</button>

					<button
						onClick={handleVerPerfil}
						className='flex items-center justify-start w-full p-3 rounded-lg transition-all hover:bg-pink-700 text-white shadow-lg bg-gray-800'
					>
						<FaUserCircle className='text-2xl' />
						<span className='ml-4 text-lg'>Ver Perfil</span>
					</button>
				</nav>
			</aside>

			<main className='flex-1 pb-20 mt-10 ml-72'>
				{" "}
				{/* Adicione ml-72 para compensar a largura do menu */}
				<div className='w-full max-w-4xl mx-auto bg-gray-800 rounded-lg shadow-lg p-6'>
					<h1 className='text-3xl font-bold mb-6'>Definições</h1>

					{activeSection === "email" && <Email />}
					{activeSection === "password" && <Password />}
					{activeSection === "payment" && <Billing />}
					{activeSection === "Conta" && <AccountSettings />}
					{activeSection === "security" && (
						<div className='bg-gray-700 p-6 rounded-lg mb-4'>
							<h2 className='text-2xl font-semibold mb-4'>Segurança e Privacidade</h2>
							<p className='text-gray-300 mb-4'>Revise suas configurações de segurança aqui.</p>
							{/* Adicione componentes ou lógica para gerenciar segurança e privacidade */}
						</div>
					)}
				</div>
			</main>
		</div>
	);
};

export default Definicoes;
