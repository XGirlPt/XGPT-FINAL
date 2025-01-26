"use client";
import { useEffect, useState } from "react";
import HeaderLoged from "../../../components/register/header-loged"
import supabase from "@/database/supabase";
import { useSelector } from "react-redux";
import { MdOutlineEmail } from "react-icons/md";
import { FaLock } from "react-icons/fa";
import { LiaFileInvoiceDollarSolid } from "react-icons/lia";
import { ImBin } from "react-icons/im";
import Link from "next/link";
import { RootState } from "@/store";
import { useRouter } from "next/navigation";

function Definicoes() {
  const [activeTab, setActiveTab] = useState("email");
  const reduxState = useSelector((state: RootState) => state);
  const userEmailRedux = useSelector(
    (state: any) => state.profile?.user?.user?.email
  );
  const userProfile = useSelector((state: any) => state.profile);
  const userUID = userProfile.profile?.userUID;
  const router = useRouter();

  useEffect(() => {
    const getSession = async () => {
      const { data, error } = await supabase.auth.getSession();
      if (error || !data.session) {
        console.log(
          "Sessão não iniciada ou erro ao verificar a sessão:",
          error
        );
      } else {
        console.log("Sessão iniciada:", data.session);
      }
    };

    getSession();
  }, []);

  const handleDeleteAccount = async () => {
    try {
      if (!userUID) throw new Error("User ID is missing");

      const { error } = await supabase.auth.admin.deleteUser(userUID);
      if (error) throw error;

      router.push("/");
    } catch (error: any) {
      console.error("Erro ao excluir conta:", error.message);
    }
  };

  return (
    <div className="text-gray-600 bg-[#1b1b1b] flex flex-col min-h-screen">
      <HeaderLoged />
      <div className="mx-10">
        <div className="flex-1">
          <p className="text-3xl text-white">Definições de Perfil</p>
        </div>

        <div className="flex my-4 align-center items-center justify-center">
          <div
            onClick={() => setActiveTab("email")}
            className={`flex ${
              activeTab === "email" ? "bg-pink-800" : "bg-gray-400"
            } hover:bg-pink-900 text-white px-6 py-2 cursor-pointer align-center items-center rounded-l-md`}
          >
            <MdOutlineEmail
              size={20}
              className="mr-2 items-center align-middle"
            />
            Email
          </div>

          <div
            onClick={() => setActiveTab("password")}
            className={`flex ${
              activeTab === "password" ? "bg-pink-800" : "bg-gray-400"
            } hover:bg-pink-900 text-white px-6 py-2 cursor-pointer align-center items-center`}
          >
            <FaLock size={18} className="mr-2 items-center align-middle" />
            Palavra Passe
          </div>

          <div
            onClick={() => setActiveTab("billing")}
            className={`flex ${
              activeTab === "billing" ? "bg-pink-800" : "bg-gray-400"
            } hover:bg-pink-900 text-white px-6 py-2 cursor-pointer align-center items-center`}
          >
            <LiaFileInvoiceDollarSolid
              size={20}
              className="mr-2 items-center align-middle"
            />
            Faturação
          </div>

          <div
            onClick={() => setActiveTab("delete")}
            className={`flex ${
              activeTab === "delete" ? "bg-pink-800" : "bg-gray-400"
            } hover:bg-pink-900 text-white px-6 py-2 cursor-pointer align-center items-center rounded-r-md`}
          >
            <ImBin size={20} className="mr-2 items-center align-middle" />
            Apagar Conta
          </div>
        </div>

        {/* Content for each section */}
        {activeTab === "email" && (
          <div className="bg-[#1E2427] py-6 w-1/2 px-10 border mt-6 border-gray-600 rounded-md mb-20 mx-auto">
            <p className="text-pink-800 text-2xl">Endereços de Email</p>
            <p className="text-white">
              Os seguintes e-mails estão associados à sua conta:
            </p>
            <div className="flex gap-1 align-middle items-center mt-2">
              <p className="text-white text-lg">{userEmailRedux}</p>
              <p className="bg-yellow-600 text-slate-900 text-sm px-2 rounded-md">
                Não verificado
              </p>
              <p className="bg-pink-800 text-slate-900 text-sm px-2 rounded-md">
                Principal
              </p>
            </div>

            <div className="flex gap-2 mt-4">
              <div className="bg-pink-800 hover:bg-pink-900 py-2 px-4 text-white rounded-md cursor-pointer">
                Utilizar como principal
              </div>
              <div className="bg-gray-400 hover:bg-gray-500 py-2 px-4 text-white rounded-md cursor-pointer">
                Reenviar email de confirmação
              </div>
              <div className="bg-red-700 hover:bg-red-800 py-2 px-4 text-white rounded-md cursor-pointer">
                Eliminar Conta
              </div>
            </div>
          </div>
        )}

        {activeTab === "password" && (
          <div className="bg-[#1E2427] py-6 w-1/2 px-10 border mt-6 border-gray-600 rounded-md mb-10 mx-auto">
            <p className="text-pink-800 text-2xl">Alterar Palavra Passe</p>
            <div className="mt-6">
              <p className="mb-2 text-pink-800">Palavra Passe atual</p>
              <input
                type="password"
                className="w-full py-2 px-2 bg-slate-600 mb-6 text-white"
                placeholder="Palavra Passe Atual"
              />

              <p className="mb-2 text-pink-800">Nova Palavra Passe</p>
              <input
                type="password"
                className="w-full py-2 px-2 bg-slate-600 mb-6 text-white"
                placeholder="Nova Palavra Passe"
              />

              <p className="mb-2 text-pink-800">
                Nova Palavra Passe (Confirmação)
              </p>
              <input
                type="password"
                className="w-full py-2 px-2 bg-slate-600 mb-6 text-white"
                placeholder="Confirmação de Palavra Passe"
              />
            </div>
            <div className="mt-2">
              <button className="bg-pink-800 hover:bg-pink-900 py-2 px-2 text-white w-42 rounded-md">
                Alterar Palavra Passe
              </button>
            </div>
          </div>
        )}

        {activeTab === "billing" && (
          <div className="bg-[#1E2427] py-6 w-1/2 px-10 border mt-6 border-gray-600 rounded-md mb-10 mx-auto">
            <p className="text-pink-800 text-2xl">Detalhes de Faturação</p>
            <p className="text-white">
              Área para configurar detalhes de faturação.
            </p>
          </div>
        )}

        {activeTab === "delete" && (
          <div className="bg-[#1E2427] py-6 w-1/2 px-10 border mt-6 border-gray-600 rounded-md mb-10 mx-auto">
            <p className="text-pink-800 text-2xl mb-4">Eliminar Conta</p>
            <p className="text-white">
              Tens a certeza que queres apagar a tua conta?
            </p>
            <p className="mb-2 text-pink-800">
              *Todas as suas informações serão apagadas definitivamente
            </p>
            <div
              className="bg-red-700 hover:bg-red-800 py-2 px-4 text-white rounded-md cursor-pointer"
              onClick={handleDeleteAccount}
            >
              <ImBin size={20} className="mr-2" /> Apagar Conta
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Definicoes;
