import React from "react";
import { useSelector } from "react-redux";
import {
  FaEuroSign,
  FaCcMastercard,
  FaBitcoin,
  FaCcVisa,
} from "react-icons/fa";
import { RiPaypalLine } from "react-icons/ri";
import { FaDollarSign } from "react-icons/fa6";
import { useTranslation } from "react-i18next";

interface TarifasProps {
  selectedProfile: {
    nome: string;
    pagamento: string[];
    tarifa: number;

  };
}

const Tarifas: React.FC<TarifasProps> = ({ selectedProfile }) => {
  const tarifaRedux = useSelector(
    (state: any) => state.profile && state.profile?.profile?.tarifa
  );
// console.log("tarifa: ", tarifaRedux)

const { t, i18n } = useTranslation();

  const pagamentos = selectedProfile?.pagamento;

  return (
    <div className="bg-white dark:bg-gray-800 px-10 pt-10 pb-10 w-full shadow-lg rounded-xl">
<h1 className="text-pink-500 text-2xl">
  {t("profile.rates")}
</h1>
      <p className=" text-base mt-4 mb-8 text-gray-700 dark:text-gray-500">
      {t("profile.tariffs_starting_from", { tarifa: selectedProfile?.tarifa })}
      </p>
      <p className="text-pink-500 text-2xl"> {t("profile.accepts")} 
      </p>
      {pagamentos && Array.isArray(pagamentos) ? (
        <div className="grid grid-cols-2 mt-4">
          {pagamentos.map((pagamento, index) => (
            <div key={index} className="flex items-center text-white my-2">
              {pagamento === "Paypall" && (
                <RiPaypalLine className="mr-2 text-blue-400" />
              )}
              {pagamento === "Bitcoin" && (
                <FaBitcoin className="mr-2 text-orange-400" />
              )}
              {pagamento === "Euro" && (
                <FaEuroSign className="mr-2 text-yellow-500" />
              )}
              {pagamento === "Mastercard" && (
                <FaCcMastercard className="mr-2 text-blue-400" />
              )}
              {pagamento === "Dollars" && (
                <FaDollarSign className="mr-2 text-blue-400" />
              )}
              {pagamento === "Visa" && (
                <FaCcVisa className="mr-2 text-blue-400" />
              )}
              <p className="text-gray-700 dark:text-gray-500">{pagamento}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-700 dark:text-gray-500">{t("profile.no_payment_methods_selected")}</p>
      )}
    </div>
  );
};

export default Tarifas;
