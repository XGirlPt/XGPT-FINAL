// app/not-found.tsx
import React from "react";
import Link from "next/link";

const NotFound: React.FC = () => {
	return (
		<div className='flex items-center justify-center min-h-screen bg-[#1b1b1b] text-gray-600'>
			<div className='text-center bg-[#1E2427] border border-zinc-600 p-10 rounded-md shadow-lg'>
				<h1 className='text-6xl font-bold text-pink-800 mb-8'>404</h1>
				<p className='text-2xl mb-4'>Página não encontrada</p>
				<p className='mb-8'>Desculpe, a página que você está procurando não existe.</p>
				<Link href='/'>
					<p className='text-pink-800 hover:text-pink-900 hover:underline'>Voltar para a página inicial</p>
				</Link>
			</div>
		</div>
	);
};

export default NotFound;
