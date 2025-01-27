"use client";
/* eslint-disable @next/next/no-img-element */
import React, {Component, createRef} from "react";
import Slider from "react-slick";
import {VscVerifiedFilled} from "react-icons/vsc";
import {FaMapMarkerAlt} from "react-icons/fa";
import Link from "next/link";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image from "next/image";
import ChevronRight from "lucide-react"
import ChevronLeft from "lucide-react"

interface Profile {
	nome: string;
	photos: string[];
	cidade: string;
	certificado: boolean;
}

interface CarouselGProps {
	profiles: Profile[];
}

interface CarouselGState {
	slidesToShow: number;
}

class CarouselG extends Component<CarouselGProps, CarouselGState> {
	private sliderRef = createRef<Slider>();

	constructor(props: CarouselGProps) {
		super(props);
		this.state = {
			slidesToShow: 9, // Valeur initiale pour les grands écrans
		};
	}

	componentDidMount() {
		this.adjustSlidesToShow();
		window.addEventListener("resize", this.adjustSlidesToShow);
	}

	componentWillUnmount() {
		window.removeEventListener("resize", this.adjustSlidesToShow);
	}

	adjustSlidesToShow = () => {
		const mqLarge = window.matchMedia("(min-width: 1440px) and (min-resolution: 2dppx)");
		const mqMedium = window.matchMedia("(min-width: 1024px) and (min-resolution: 2dppx)");
		if (mqLarge.matches) {
			this.setState({slidesToShow: 7});
		} else if (mqMedium.matches) {
			this.setState({slidesToShow: 7}); // Ajustement pour MacBooks de 13'' et similaires
		} else {
			this.setState({slidesToShow: 9});
		}
	};

	handleClick = (direction: "next" | "prev") => {
		if (this.sliderRef.current) {
			direction === "next" ? this.sliderRef.current.slickNext() : this.sliderRef.current.slickPrev();
		}
	};

	

	render() {
		const {profiles} = this.props;
		const {slidesToShow} = this.state;
	
	

		const settings = {
			dots: true,
			infinite: true,
			speed: 1000,
			slidesToShow: slidesToShow,
			slidesToScroll: 3,
			vertical: false,
			responsive: [
				{
					breakpoint: 768, // Paramètres pour les dispositifs avec un écran jusqu'à 768 pixels
					settings: {
						slidesToShow: 3,
						slidesToScroll: 3,
					},
				},
			],
		};


		return (

			<div className="relative mb-12">
			<div className="relative overflow-hidden">
			  <div className="flex space-x-4 py-4">
				{profiles.map((profile, index) => (
				  <div
					key={index}
					className="flex-none w-44 bg-white dark:bg-gray-900 rounded-xl shadow-lg overflow-hidden transform transition-transform hover:scale-105 hover:shadow-2xl"
				  >
					<Link href={`/escort/${profile.nome}`}>
					  <div className="relative">
						<Image
						  src={profile.photos[0] || "/logo.webp"}
						  alt={profile.nome}
						  className="w-full h-60 object-cover rounded-t-xl bg-pink-200"
						  priority
						  width={180}
						  height={120}
						/>
						<div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex flex-col justify-end p-4">
						  <p className="flex items-center justify-center font-bold text-lg md:text-xl text-white">
							{profile.nome}
							{profile.certificado && (
							  <VscVerifiedFilled className="text-green-400 ml-2" />
							)}
						  </p>
						  <p className="flex items-center justify-center text-sm md:text-base text-gray-300">
							<FaMapMarkerAlt className="text-rose-500 mr-2" />
							{profile.cidade}
						  </p>
						</div>
					  </div>
					</Link>
				  </div>
				))}
			  </div>
		  
			  {/* Left navigation button */}
			  {/* <button className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white/80 dark:bg-gray-800/80 p-2 rounded-full shadow-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition">
				<ChevronLeft className="h-5 w-5 text-gray-600 dark:text-white" />
			  </button>
		  
			  {/* Right navigation button */}
			 
			</div>
		  </div>
		);
	}
}

export default CarouselG;
