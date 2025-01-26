import Image from "next/image";
import Link from "next/link";

interface MiniCardProps {
	nome: string;
	cidade: string;
	photo: string;
}

const MiniCard: React.FC<MiniCardProps> = ({nome, cidade, photo}) => {
	return (
		<Link href={`/escort/${nome}`} passHref>
			<div className='cursor-pointer w-full max-w-xs rounded-lg shadow-md bg-gray-800 overflow-hidden text-center hover:shadow-lg transition-shadow duration-200'>
				{/* Imagem */}
				<div className='h-44 object-cover'>
					<Image src={photo || "/logo.webp"} alt={nome || "Foto do perfil"} className='w-full h-full object-cover' width={300} height={300} />
				</div>
				{/* Nome e Cidade */}
				<div className='p-2'>
					<p className='text-sm font-semibold text-white truncate'>{nome}</p>
					<p className='text-xs text-gray-400'>{cidade}</p>
				</div>
			</div>
		</Link>
	);
};

export default MiniCard;
