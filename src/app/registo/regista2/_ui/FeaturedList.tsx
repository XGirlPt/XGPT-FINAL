import {useTranslation} from "react-i18next";
import {FaClock, FaMoneyBillWave, FaStar, FaGift} from "react-icons/fa";
import {TfiCup} from "react-icons/tfi";

const FeaturesList: React.FC = () => {
	interface FeatureItem {
		icon: React.ComponentType<any>;
		text: string;
		color: string;
	}
	const {t, i18n} = useTranslation();

	const features: FeatureItem[] = [
		{
			icon: TfiCup,
			text: t("RegisterPage.description_1"),
			color: "text-pink-800",
		},
		{
			icon: FaClock,
			text: t("RegisterPage.description_2"),
			color: "text-pink-500",
		},
		{
			icon: FaMoneyBillWave,
			text: t("RegisterPage.description_3"),
			color: "text-pink-500",
		},
		{
			icon: FaStar,
			text: t("RegisterPage.description_4"),
			color: "text-pink-500",
		},
	];

	return (
		<div className='md:w-1/2 mx-auto my-auto md:flex md:flex-col justify-end items-center'>
			<div>
				<p className='text-pink-500 text-3xl pb-10 px-6 font-extrabold '>{t("RegisterPage.title")}</p>
				<div className='flex'>
					<div className='px-10 pb-2 pt-1 justify-center gap-10 align-middle items-center'>
						{features.map((feature, index) => (
							<div key={index} className='flex items-center py-2'>
								<feature.icon className={`${feature.color} mr-4`} size={48} />
								<p className='text-gray-500 py-2'>{feature.text}</p>
							</div>
						))}
						<div className='flex items-center py-2'>
							<FaGift className='text-yellow-500 mr-4' size={48} />
							<p className='text-yellow-500 underline cursor-pointer py-2'>{t("RegisterPage.advantages_link")}</p>
						</div>
					</div>
				</div>
				<div className='flex justify-between px-8 my-4'></div>
			</div>
		</div>
	);
};

export default FeaturesList;
