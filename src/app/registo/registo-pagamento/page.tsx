'use client';

import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ProfileDataService } from '@/backend/services/profileDataService';
import { toast } from 'react-toastify';
import { shallowEqual } from 'react-redux';
import { useEffect } from 'react';

const RegistoPagamento: React.FC = () => {
  const router = useRouter();

  // Selecionar dados do Redux com shallowEqual
  const profile = useSelector((state: any) => state.profile?.profile || {}, shallowEqual);
  const {
    userUID,
    nome,
    photos,
    vphotos,
    telefone,
    altura,
    cabelo,
    corpo,
    mamas,
    olhos,
    origem,
    seios,
    tatuagem,
    tarifa,
    pelos,
    idade,
    signo,
    address,
    pagamento,
    lingua,
    servico,
    description,
    cidade,
    distrito,
    latitude,
    longitude,
    premium,
  } = profile;

  // Verificar se o perfil está preenchido na montagem
  useEffect(() => {
    if (!userUID) {
      toast.error('Perfil incompleto. Por favor, complete as etapas anteriores.', {
        position: 'top-right',
        autoClose: 3000,
      });
      router.push('/registo/registo-entrada');
    }
  }, [userUID, router]);

  const handleSubmit = async (event: React.MouseEvent) => {
    event.preventDefault(); // Evitar comportamento padrão, se necessário

    if (!userUID) {
      toast.error('Erro: UID do usuário não encontrado.', { position: 'top-right', autoClose: 3000 });
      return;
    }

    try {
      const userData = {
        userUID,
        nome,
        idade,
        tarifa,
        altura,
        cabelo,
        corpo,
        olhos,
        origem,
        seios,
        tatuagem,
        mamas,
        pelos,
        signo,
        distrito,
        cidade,
        address,
        longitude,
        latitude,
        telefone,
        pagamento,
        servico,
        lingua,
        description,
        certificado: false,
        status: null,
        premium: premium || false,
      };

      // Criar ou atualizar perfil
      await ProfileDataService.createProfile(userData);

      // Upload de fotos de perfil
      if (photos?.length > 0) {
        await ProfileDataService.uploadProfilePhotos(userUID, photos);
      }

      // Upload de fotos de verificação
      if (vphotos?.length > 0) {
        await ProfileDataService.uploadVerificationPhotos(userUID, vphotos);
      }

      toast.success('Perfil criado/atualizado com sucesso!', { position: 'top-right', autoClose: 1000 });
      router.push('/my-account');
    } catch (error: any) {
      console.error('Erro ao criar perfil:', error.message);
      toast.error('Erro ao finalizar o perfil. Tente novamente.', {
        position: 'top-right',
        autoClose: 3000,
      });
    }
  };

  // Renderizar apenas se userUID existir
  if (!userUID) {
    return <div>Redirecionando...</div>; // Mensagem temporária enquanto redireciona
  }

  return (
    <div className="text-gray-600 pb-20 min-h-[60vh] bg-[#1b1b1b]">
      <div className="h-full bg-[#1b1b1b] px-44">
        <div className="w-full pt-2 mb-2">
          <p className="text-pink-800 text-xl mt-8 pb-0 px-6">
            Cria o teu Perfil de Anunciante
          </p>
        </div>

        {/* Header */}
        <div className="bg-[#1E2427] w-full h-12 mb-2 mt-10 border border-zinc-600 flex rounded-sm">
          <div className="flex justify-around w-full mx-6 items-center">
            <div className="flex border-zinc-500 pt-3">
              <p className="rounded-full border border-zinc-500 mr-2 px-2 mb-2 text-zinc-500">1</p>
              <p className="mb-2 text-zinc-500">Perfil</p>
            </div>
            <div className="flex border-zinc-500 pt-3">
              <p className="rounded-full border border-zinc-500 mr-2 px-2 mb-2 text-zinc-500">2</p>
              <p className="mb-2 text-zinc-500">Mensalidade</p>
            </div>
            <div className="flex border-zinc-500 pt-3">
              <p className="rounded-full border border-zinc-500 mr-2 px-2 mb-2 text-zinc-500">3</p>
              <p className="mb-2 text-zinc-500">Fotos</p>
            </div>
            <div className="flex border-b-2 border-pink-800 pt-3">
              <p className="rounded-full border border-pink-800 mr-2 px-2 mb-2 text-pink-800">4</p>
              <p className="mb-2 text-pink-800">Mensalidade</p>
            </div>
          </div>
        </div>
        {/* Header end */}

        <div className="bg-[#1E2427] w-full h-full mb-10 mt-0 border border-zinc-600 rounded-sm">
          <div className="px-10 mt-4">
            <a
              href="https://controlcenter.verotel.com/register-reseller?website=znjiu4xie868d5ndojpu1slddnb64o4kuznt4h1x"
              target="_blank"
              rel="noopener noreferrer"
            >
              Sign me up!
            </a>
          </div>
        </div>

        <div className="bg-[#1E2427] w-full h-full mb-10 mt-0 border border-zinc-600 rounded-sm">
          <div className="flex justify-between w-full mb-1 mt-10 my-10 py-6 px-10">
            <div className="w-26 mb-">
              <Link href="/registo/registo-fotos">
                <p className="text-md text-white bg-zinc-400 px-10 py-2 rounded-md cursor-pointer">
                  Voltar
                </p>
              </Link>
            </div>
            <p
              className="text-md text-white bg-pink-800 px-10 py-2 rounded-md cursor-pointer transition duration-300 hover:bg-pink-600 ease-in-out transform hover:scale-105"
              onClick={handleSubmit}
            >
              Finalizar Perfil
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegistoPagamento;