import { Metadata } from 'next';
import GirlsPage from './_ui/GirlsPage';

export const metadata: Metadata = {
  title: 'XGirl - Acompanhantes',
  description:
    'Bem-vindo a XGirl, o melhor site de classificados eróticos, Acompanhantes e Escort em Portugal.',
};

export interface PagePageProps {}

export default function PagePage(props: PagePageProps) {
  const {} = props;

  return (
    <div>
      <meta
        name="description"
        content="Descubra as melhores acompanhantes e massagistas eróticas em Portugal. Explore os nossos anúncios em destaque e as novidades."
      />
      <meta
        name="keywords"
        content="Acompanhantes, Acompanhantes Luxo, Escort, Escort Portugal, Escort Lisboa, Escort Porto, Escort Faro, Escort Lisboa, Acompanhantes, Anuncios Eróticos , massagistas Eróticas, anúncios, Portugal, serviços"
      />
      <meta name="author" content="Xgirl" />
      <meta
        property="og:title"
        content="Acompanhantes de luxo e Escort Eróticas em Portugal"
      />
      <meta
        property="og:description"
        content="Encontre as melhores acompanhantes e massagistas eróticas em Portugal. Consulte os nossos anúncios e as novidades."
      />
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://xgirl.pt" />
      <meta property="og:image" content="/public/photos/logo.webp" />
      <GirlsPage />
    </div>
  );
}
