import Link from "next/link";
import Image from "next/image";
import {useTranslation} from "react-i18next";
import {Fragment} from "react";
import React from "react";

const Footer = () => {
	const {t} = useTranslation();

	const footerLinks = {
		quickLinks: [
			{labelKey: "Footer.escort_paris", href: "/escort?distrito=Lisboa"},
			{labelKey: "Footer.escort_lyon", href: "/girls?distrito=Porto"},
			{labelKey: "Footer.escort_marseille", href: "/girls?distrito=Faro"},
			{labelKey: "Footer.escort_lille", href: "/girls?distrito=Madeira"},
			{labelKey: "Footer.escort_toulouse", href: "/girls?distrito=Acores"},
		],
		categories: [
			{labelKey: "Footer.vip_escorts", href: "/escort"},
			{labelKey: "Footer.bdsm", href: "/tarifs"},
			{labelKey: "Footer.salons", href: "/apropos"},
			{labelKey: "Footer.stories", href: "/Stories"},
			{labelKey: "Footer.erotic_massage", href: "/stories"},
		],
		about: [
			{
				type: "combined",
				links: [
					{labelKey: "Footer.faq", href: "/faq"},
					{labelKey: "Footer.dmca", href: "/dmca"},
					{labelKey: "Footer.report", href: "/report"},
				],
			},
			{labelKey: "Footer.terms_conditions", href: "/Termos"},
			{labelKey: "Footer.privacy_policy", href: "/Privacidade"},
			{
				type: "combined",
				links: [
					{labelKey: "Footer.xgirl_history", href: "/faq"},
					{labelKey: "Footer.contact", href: "/contact"},
				],
			},
			{labelKey: "Footer.join_us", href: "/regista2"},
		],
	};

	return (
		<footer className='bg-white dark:bg-gray-800 w-full pt-8 border-t border-pink-500'>
			<div className='max-w-screen-xl mx-auto px-4'>
				<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 text-center md:text-left'>
					{/* LOGO */}
					<div className='mb-8'>
						<Link href='/'>
							<div className='w-36 h-12 object-contain mx-auto md:mx-0 mb-4'>
								<Image src='/photos/logo1.png' alt='logo' width={144} height={48} />
							</div>
						</Link>
						<p className='text-sm text-gray-400 mb-4'>{t("Footer.services_description")}</p>
					</div>

					{/* LIENS RAPIDES */}
					<div className='mb-8'>
						<p className='text-xl text-white py-2'>{t("Footer.quick_links_title")}</p>
						<ul className='space-y-1'>
							{footerLinks.quickLinks.map(link => (
								<li key={link.href}>
									<Link href={link.href} className='text-pink-500 cursor-pointer hover:underline hover:text-[#C2136A]'>
										{t(link.labelKey)}
									</Link>
								</li>
							))}
						</ul>
					</div>

					{/* TOP CATÉGORIE */}
					<div className='mb-8'>
						<p className='text-xl text-white py-2'>{t("Footer.top_categories_title")}</p>
						<ul className='space-y-1'>
							{footerLinks.categories.map(link => (
								<li key={link.href}>
									<Link href={link.href} className='text-pink-500 cursor-pointer hover:underline hover:text-[#C2136A]'>
										{t(link.labelKey)}
									</Link>
								</li>
							))}
						</ul>
					</div>

					{/* À PROPOS */}
					<div className='mb-8'>
						<p className='text-xl text-gray-400 dark:text-white py-2'>{t("Footer.about_title")}</p>
						<ul className='space-y-1'>
							{footerLinks.about.map((item, index) =>
								item.type === "combined" ? (
									<li key={index} className='flex space-x-2'>
										{item.links.map((link, linkIndex) => (
											<Fragment key={link.href}>
												<Link href={link.href} className='text-pink-500 cursor-pointer hover:underline hover:text-pink-600'>
													{t(link.labelKey)}
												</Link>
												{linkIndex < item.links.length - 1 && <span className='text-white'>/</span>}
											</Fragment>
										))}
									</li>
								) : (
									<li key={item.href}>
										<Link href={item.href} className='text-pink-500 cursor-pointer hover:underline hover:text-pink-600'>
											{t(item.labelKey)}
										</Link>
									</li>
								)
							)}
						</ul>
					</div>
				</div>

				{/* Droit Ressource */}
				<div className='text-xs text-gray-400 md:flex-1'>{t("Footer.disclaimer")}</div>
			</div>

			{/* FOOTER BAS */}
			<div className='bg-gray-900 w-full mt-8'>
				<div className='grid grid-cols-3 gap-4 py-4'>
					{/* Colonne de gauche */}
					<div className='flex items-center justify-start pr-4'></div>

					{/* Colonne du milieu */}
					<div className='flex items-center justify-center'>
						<p className='text-xs text-white text-center'>{t("Footer.copyright", {year: new Date().getFullYear()})}</p>
					</div>

					{/* Colonne de droite */}
					<div className='flex items-center justify-end padding-righ pr-10'>
						<Image src='/photos/icon_paiement.webp' alt='Méthodes de paiement' width={150} height={150} />
					</div>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
