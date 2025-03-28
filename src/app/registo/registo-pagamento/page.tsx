// registo-pagamento/page.tsx
'use client';

import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ProfileDataService } from '@/backend/services/profileDataService';
import { toast } from 'react-toastify';

const RegistoPagamento: React.FC = () => {
  const router = useRouter();
  const userUID = useSelector((state: any) => state.profile?.profile.userUID);
  const nomeRedux = useSelector((state: any) => state.profile?.profile.nome);
  const photoURLredux = useSelector((state: any) => state.profile?.profile.photos || []);
  const VphotoURLredux = useSelector((state: any) => state.profile?.profile.vphotos || []);
  const telefoneRedux = useSelector((state: any) => state.profile?.profile.telefone);
  const alturaRedux = useSelector((state: any) => state.profile?.profile.altura);
  const cabeloRedux = useSelector((state: any) => state.profile?.profile.cabelo);
  const corpoRedux = useSelector((state: any) => state.profile?.profile.corpo);
  const mamasRedux = useSelector((state: any) => state.profile?.profile.mamas);
  const olhosRedux = useSelector((state: any) => state.profile?.profile.olhos);
  const origemRedux = useSelector((state: any) => state.profile?.profile.origem);
  const seiosRedux = useSelector((state: any) => state.profile?.profile.seios);
  const tatuagemRedux = useSelector((state: any) => state.profile?.profile.tatuagem);
  const tarifaredux = useSelector((state: any) => state.profile?.profile.tarifa);
  const pelosRedux = useSelector((state: any) => state.profile?.profile.pelos);
  const idadeRedux = useSelector((state: any) => state.profile?.profile.idade);
  const signoRedux = useSelector((state: any) => state.profile?.profile.signo);
  const addressRedux = useSelector((state: any) => state.profile?.profile.address);
  const pagamentoRedux = useSelector((state: any) => state.profile?.profile.pagamento);
  const linguaRedux = useSelector((state: any) => state.profile?.profile.lingua);
  const servicoRedux = useSelector((state: any) => state.profile?.profile.servico);
  const descriptionRedux = useSelector((state: any) => state.profile?.profile.description);
  const cidadeRedux = useSelector((state: any) => state.profile?.profile.cidade);
  const distritoRedux = useSelector((state: any) => state.profile?.profile.distrito);
  const latitudeRedux = useSelector((state: any) => state.profile?.profile.latitude);
  const longitudeRedux = useSelector((state: any) => state.profile?.profile.longitude);
  const premiumRedux =  useSelector((state: any) => state.profile?.profile.premium);

  const handleSubmit = async (event: React.MouseEvent) => {
    try {
      const userData = {
        userUID,
        nome: nomeRedux,
        idade: idadeRedux,
        tarifa: tarifaredux,
        altura: alturaRedux,
        cabelo: cabeloRedux,
        corpo: corpoRedux,
        olhos: olhosRedux,
        origem: origemRedux,
        seios: seiosRedux,
        tatuagem: tatuagemRedux,
        mamas: mamasRedux,
        pelos: pelosRedux,
        signo: signoRedux,
        distrito: distritoRedux,
        cidade: cidadeRedux,
        address: addressRedux,
        longitude: longitudeRedux,
        latitude: latitudeRedux,
        telefone: telefoneRedux,
        pagamento: pagamentoRedux,
        servico: servicoRedux,
        lingua: linguaRedux,
        description: descriptionRedux,
        certificado: false,
        status: null,
        premium: premiumRedux
      };

      // Criar ou atualizar perfil
      await ProfileDataService.createProfile(userData);

      // Upload profile photos
      if (photoURLredux.length > 0) {
        await ProfileDataService.uploadProfilePhotos(userUID, photoURLredux);
      }

      // Upload verification photos
      if (VphotoURLredux.length > 0) {
        await ProfileDataService.uploadVerificationPhotos(userUID, VphotoURLredux);
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
            <a href="https://controlcenter.verotel.com/register-reseller?website=znjiu4xie868d5ndojpu1slddnb64o4kuznt4h1x">
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