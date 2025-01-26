import React from "react";
import { FaUsers, FaCheckCircle, FaTimesCircle, FaUserSlash } from "react-icons/fa";

interface SideBarAdminProps {
  setActiveSection: (section: string) => void;
  activeSection: string; // Adicione a prop para saber a seção ativa
}

const SideBarAdmin: React.FC<SideBarAdminProps> = ({ setActiveSection, activeSection }) => {
  return (
    <aside className="bg-gray-800 w-64 p-6  shadow-lg fixed h-full">
      <h2 className="text-2xl font-bold text-white mb-6 text-center">Administração</h2>
      <nav className="flex flex-col space-y-4">
        
        <button
          onClick={() => setActiveSection("pending")}
          className={`flex items-center space-x-2 w-full text-left p-3 rounded transition-colors duration-300 ${
            activeSection === "pending" ? "bg-gray-700" : "hover:bg-gray-700"
          } text-white`}
        >
          <FaUsers />
          <span>Perfis Pendentes</span>
        </button>


        <button
          onClick={() => setActiveSection("approved")}
          className={`flex items-center space-x-2 w-full text-left p-3 rounded transition-colors duration-300 ${
            activeSection === "approved" ? "bg-gray-700" : "hover:bg-gray-700"
          } text-white`}
        >
          <FaCheckCircle />
          <span>Perfis Aprovados</span>
        </button>
        <button
          onClick={() => setActiveSection("rejected")}
          className={`flex items-center space-x-2 w-full text-left p-3 rounded transition-colors duration-300 ${
            activeSection === "rejected" ? "bg-gray-700" : "hover:bg-gray-700"
          } text-white`}
        >
          <FaUserSlash />
          <span>Perfis Rejeitados</span>
        </button>
        <p className="my-4 border_t border-gray-400 w-full  text-gray-400">

        </p>
        <button
          onClick={() => setActiveSection("certified")}
          className={`flex items-center space-x-2 w-full text-left p-3 rounded transition-colors duration-300 ${
            activeSection === "certified" ? "bg-gray-700" : "hover:bg-gray-700"
          } text-white`}
        >
          <FaTimesCircle />
          <span>Perfis Certificados</span>
        </button>

        <button
          onClick={() => setActiveSection("noncertified")}
          className={`flex items-center space-x-2 w-full text-left p-3 rounded transition-colors duration-300 ${
            activeSection === "noncertified" ? "bg-gray-700" : "hover:bg-gray-700"
          } text-white`}
        >
          <FaTimesCircle />
          <span>Perfis Nao Certificados</span>
        </button>
      </nav>
    </aside>
  );
};

export default SideBarAdmin;
