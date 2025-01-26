import { Metadata } from "next";
import GirlsPage from "./_ui/GirlsPage";

export const metadata: Metadata = {
  title: "XGirl - Acompanhantes",
  description:
    "Bem-vindo a XGirl, o melhor site de classificados eróticos, Acompanhantes e Escort em Portugal.",
};

export interface PagePageProps {}

export default function PagePage(props: PagePageProps) {
  const {} = props;

  return (
    <div>
      <GirlsPage />
    </div>
  );
}
