import Link from "next/link";
import { IoIosArrowRoundForward } from "react-icons/io";
import { IoPersonAdd } from "react-icons/io5";
import { IoIosSettings } from "react-icons/io";

function HeaderLoged() {
  return (
    <div className="w-full bg-[#1E2427] mt-0">
      <div className="flex mx-auto md:mx-20 justify-center bg-[#1E2427] h-16 mb-4 items-center">
        <div className="ml-0">
          <Link
            href="/minha-conta"
            passHref
            className="flex px-8 mt-2 py-1 shadow-sm border border-slate-500 text-md items-center text-slate-500 bg-[#2b3945] hover:bg-pink-800 hover:text-[#2b3945] transition duration-300 ease-in-out transform"
          >
            <IoPersonAdd className="mr-2" />O Meu Perfil
          </Link>
        </div>
        <>
          <Link
            href="/escort"
            className="text-white mr-0 ml-0 cursor-pointer hover:text-pink-800"
            passHref
          ></Link>
        </>
        <div>
          <Link
            href="/definicoes"
            passHref
            className="flex px-8 mt-2 py-1 shadow-sm border border-slate-500 text-md items-center text-slate-500 bg-[#2b3945] hover:bg-pink-800 hover:text-[#2b3945] transition duration-300 ease-in-out transform"
          >
            <IoIosSettings size={22} className="mr-2" />
            Definições
          </Link>
        </div>
      </div>
    </div>
  );
}

export default HeaderLoged;
