"use client";
import {useState, useEffect} from "react";
import {useSelector, useDispatch} from "react-redux";
import Link from "next/link";

import CheckDeslocacoes from "@/components/register/check-deslocacoes";
import CheckPagamento from "@/components/register/check-pagamento";
import CheckLinguas from "@/components/register/check-linguas";
import CheckServico from "@/components/register/check-servico";
import FiltroPrice from "@/components/filtros/filtro-tarifa";
import {updateDescription, updatePagamento, updateLingua, updateServico} from "@/actions/ProfileActions";

import {Field, Label, Textarea} from "@headlessui/react";
import clsx from "clsx";
import {Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle,} from "@/components/ui/dialog";
import {Button} from "@/components/ui/button";
import {useTranslation} from "react-i18next";


const RegistoContacto: React.FC = () => {
	const dispatch = useDispatch();

	const userEmailRedux = useSelector((state: any) => state.profile?.profile?.email);
	const servicoRedux = useSelector((state: any) => state.profile?.profile?.servico);
	const pagamentoRedux = useSelector((state: any) => state.profile?.profile?.pagamento);
	const linguaRedux = useSelector((state: any) => state.profile?.profile?.lingua);
	const descriptionRedux = useSelector((state: any) => state.profile?.profile?.description);

	const [selectedPagamento, setSelectedPagamento] = useState<string[]>(pagamentoRedux || []);
	const [selectedServico, setSelectedServico] = useState<string[]>(servicoRedux || []);
	const [selectedLingua, setSelectedLingua] = useState<string[]>(linguaRedux || []);
	const [description, setDescription] = useState<string>(descriptionRedux || "");
	const {t, i18n} = useTranslation();

	useEffect(() => {
		setSelectedPagamento(pagamentoRedux || []);
	}, [pagamentoRedux]);

	useEffect(() => {
		setSelectedLingua(linguaRedux || []);
	}, [linguaRedux]);

	useEffect(() => {
		setSelectedServico(servicoRedux || []);
	}, [servicoRedux]);

	useEffect(() => {
		setDescription(descriptionRedux || "");
	}, [descriptionRedux]);

	const handleDescriptionChange = (content: string) => {
		setDescription(content);
		dispatch(updateDescription(content));
	};

	const handlePaymentChange = (updatedPayments: string[]) => {
		dispatch(updatePagamento(updatedPayments));
		setSelectedPagamento(updatedPayments);
	};

	const handleServicoChange = (updatedServico: string[]) => {
		dispatch(updateServico(updatedServico));
		setSelectedServico(updatedServico);
	};

	const handleLinguaChange = (updatedLingua: string[]) => {
		dispatch(updateLingua(updatedLingua));
		setSelectedLingua(updatedLingua);
	};

	const reduxState = useSelector((state: any) => state);
	console.log("Estado Redux completo:", reduxState);

	return (
		<Dialog open onClose={() => {}} fullWidth>
			
	
			<DialogContent className='max-w-4xl w-full  h-2/3 md:h-4/5 sm:max-h-[80vh] p-0  overflow-hidden'>
				<DialogHeader className='bg-pink-800 py-6 px-4 md:px-10'>
					<DialogTitle className='text-xl md:text-3xl font-bold tracking-wide text-center'>          {t('contactData.title')}
					</DialogTitle>
					<p className='text-center text-gray-200 text- md:text-sm mt-2'>{t('contactData.subtitle')}</p>
				</DialogHeader>
				
				
				
				<div className='p-8 space-y-8 overflow-y-auto '>
					<div className='grid grid-cols-1 lg:grid-cols-1 gap-8'>
						<div className='w-44 mb-6'>
							<FiltroPrice />
						</div>

						<div className='w-full mt-2'>
							<p className='text-lg text-pink-800 font-semibold mb-2'>{t('paymentMethods.title')}</p>
							<CheckPagamento />
						</div>

						<div className='w-full mt-4'>
							<p className='text-lg text-pink-800 font-semibold mb-2'>{t('languages.title')}</p>
							<CheckLinguas />
						</div>

						<div className='w-full mt-4'>
							<p className='text-lg text-pink-800 font-semibold mb-2'>{t('services.title')}</p>
							<CheckServico selectedServico={selectedServico} setSelectedServico={setSelectedServico} />
						</div>

						<div className='w-full mt-6 relative'>
							<Field>
								<Label className='text-lg text-pink-800 font-semibold mb-2'>{t('description.title')}</Label>

								<div className='relative'>
									<Textarea
										name='description'
										value={description}
										onChange={e => handleDescriptionChange(e.target.value)}
										className={clsx(
											"w-full h-32 p-4 pr-10 border rounded-lg",
											"data-[hover]:shadow-lg data-[focus]:bg-gray-300",
											"focus:outline-none focus:ring-2 focus:ring-pink-800 text-gray-700"
										)}
										placeholder={t('description.placeholder')}
										/>

									{/* Ícone de Emoji dentro da área de texto */}
								
									
								</div>
							</Field>
						</div>
					</div>
				</div>
				
				
				<DialogFooter className='bg-gray-800 border-t border-gray-700 p-4'>
  <Link href='/registo/registo-entrada'>
    <Button variant='voltar' color='secondary' className='px-6 py-3'>
	{t('button2.back')}

    </Button>
  </Link>

  <Link href='/registo/registo-fotos'>
    <Button variant='guarder' color='primary' className='px-6 py-3'>
	{t('button2.continue')}
    </Button>
  </Link>
</DialogFooter>
			</DialogContent>
		</Dialog>
	);
	
};

export default RegistoContacto;
