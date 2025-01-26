// "use client";
// import React from "react";
// import Link from "next/link";

// import { Users, Wallet, BarChart } from 'lucide-react';

// // interface CardProps {
// // 	title: string;
// // 	description: string;
// // 	linkText: string;
// // 	linkHref: string;
// // 	stat: string;
// // }

// // const InfoCardItem: React.FC<CardProps> = ({title, description, linkText, linkHref, stat}) => {
// // 	return (
// // 		<div className='flex flex-col h-72 justify-center items-center w-full sm:w-80 md:w-82'>
// // 			<div className='rounded-lg shadow-lg bg-gray-800 p-4 border border-gray-600 flex flex-col justify-center items-center transition-transform transform hover:scale-105 hover:shadow-xl'>
// // 				<p className='font-bold text-2xl mb-4 text-white'>{stat}</p>
// // 				<p className='font-medium text-gray-300 mb-6 text-sm text-center'>{description}</p>
// // 				<Link href={linkHref}>
// // 					<p className='text-md text-white bg-pink-800 px-8 py-2 rounded-md cursor-pointer transition duration-300 hover:bg-pink-700 ease-in-out'>{linkText}</p>
// // 				</Link>
// // 			</div>
// // 		</div>
// // 	);
// // };




// const InfoCard = () => {
//   const stats = [
//     {
//       icon: <Users className="h-8 w-8 text-pink-500" />,
//       value: "100K+",
//       label: "Active Users"
//     },
//     {
//       icon: <Wallet className="h-8 w-8 text-pink-500" />,
//       value: "50K+",
//       label: "NFTs Created"
//     },
//     {
//       icon: <BarChart className="h-8 w-8 text-pink-500" />,
//       value: "$10M+",
//       label: "Trading Volume"
//     }
//   ];

//   return (
//     <div className="mb-12">
//       <h2 className="text-3xl font-bold mb-6 dark:text-white">Platform Statistics</h2>
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//         {stats.map((stat, index) => (
//           <div key={index} className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 text-center">
//             <div className="flex justify-center mb-4">{stat.icon}</div>
//             <div className="text-3xl font-bold mb-2 dark:text-white">{stat.value}</div>
//             <div className="text-gray-600 dark:text-gray-400">{stat.label}</div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// 	// return (
// 	// 	<div className='bg-black w-full rounded-xl h-full mb-2 flex justify-center'>
// 	// 		<div className='flex flex-wrap justify-center gap-4 mt-6'>
// 	// 			{/* Reusable InfoCardItem Components */}
// 	// 			<InfoCardItem
// 	// 				title='Utilizadores'
// 	// 				description='Descobre escorts de TOP, massagistas e outros serviços na tua zona'
// 	// 				linkText='Ver Anúncios'
// 	// 				linkHref='/girls'
// 	// 				stat='2103 Utilizadores'
// 	// 			/>
// 	// 			<InfoCardItem
// 	// 				title='Visitas Diárias'
// 	// 				description='Descobre os últimos comentários postados sobre escorts na tua região'
// 	// 				linkText='Ver Anúncios'
// 	// 				linkHref='/escort'
// 	// 				stat='+ 5000 Visitas Diárias'
// 	// 			/>
// 	// 			<InfoCardItem
// 	// 				title='Publica o teu anúncio'
// 	// 				description='Publica o teu anúncio gratuitamente em O Teu Desejo. Site erótico n1 em Portugal'
// 	// 				linkText='Inscreve-te'
// 	// 				linkHref='/regista'
// 	// 				stat='Publica o teu anúncio'
// 	// 			/>
// 	// 		</div>
// 	// 	</div>


// 	);
// };

// export default InfoCard;



"use client";
import React from "react";
import Link from "next/link";
import { Users, Wallet, BarChart } from "lucide-react";

const InfoCard = () => {
  const stats = [
    {
      icon: <Users className="h-8 w-8 text-pink-500" />,
      value: "100K+",
      label: "Active Users",
    },
    {
      icon: <Wallet className="h-8 w-8 text-pink-500" />,
      value: "50K+",
      label: "NFTs Created",
    },
    {
      icon: <BarChart className="h-8 w-8 text-pink-500" />,
      value: "$10M+",
      label: "Trading Volume",
    },
  ];

  return (
    <div className="mb-12">
      <h2 className="text-3xl font-bold mb-6 dark:text-white">Platform Statistics</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 text-center transition-transform transform hover:scale-105"
          >
            <div className="flex justify-center mb-4">{stat.icon}</div>
            <div className="text-3xl font-bold mb-2 dark:text-white">{stat.value}</div>
            <div className="text-gray-600 dark:text-gray-400">{stat.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InfoCard;
