/* eslint-disable @next/next/no-img-element */
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import Image from "next/image";


interface Profile {
  lingua: string[];
}

interface LinguasProps {
  selectedProfile?: Profile;
}

const Linguas: React.FC<LinguasProps> = ({ selectedProfile }) => {
  const linguasRedux = useSelector(
    (state: any) => state.profile && state.profile.lingua
  );
  // console.log("Linguas Redux", linguasRedux);

  const linguaCheckboxes = useSelector(
    (state: any) => state.profile.linguaCheckboxes
  );
  // console.log("Lingua Checkboxes", linguaCheckboxes);
  const { t, i18n } = useTranslation();




  const obterBandeira = (lingua: string): string => {
    switch (lingua) {
      case t("language.russian"):
        return "/Flags/ru.svg";
      case t("language.german"):
        return "/Flags/ale.svg";
      case t("language.portuguese"):
        return "/Flags/pt.svg";
      case t("language.french"):
        return "/Flags/fr.svg";
      case t("language.english"):
        return "/Flags/ing.svg";
      case t("language.italian"):
        return "/Flags/it.svg";
      case t("language.spanish"):
        return "/Flags/es.svg";
      case t("language.arabic"):
        return "/Flags/ar.png";
      default:
        return ""; // Bandeira padrão, se necessário
    }
  };

  const linguaRedux = useSelector(
    (state: any) => state.profile?.profile?.lingua
  );


  return (
    <div className="bg-white dark:bg-gray-800 pl-12 pt-10 pb-10 mb-8 md:mb-0 w-full  rounded-xl">
      <h1 className="text-pink-500 text-2xl">  {t("profile.languages")}
      </h1>
      <div className="grid grid-cols-2 gap-x-4 gap-y-4 mt-4">
        {linguaRedux &&
          linguaRedux.map((lingua: string, index: number) => (
            <div key={index} className="flex items-center">
              <Image
                src={obterBandeira(lingua)}
                alt={`${lingua} flag`}
                width={150}
                height={150}
                className="w-6 h-6 mr-2 rounded-full object-cover"
              />
              <span className="text-gray-700 dark:text-gray-500">{lingua}</span>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Linguas;
