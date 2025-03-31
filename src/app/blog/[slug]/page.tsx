"use client";

import { useState, useEffect } from "react";
import { use } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { supabase } from "@/backend/database/supabase";
import Link from "next/link";

// Posts estáticos
const staticArticles = [
  {
    slug: "guia-completo-anunciar-xgirl",
    title: "Guia Completo para Anunciar no XGirl.pt",
    author: "Equipa XGirl.pt",
    date: "2025-03-27",
    image: "/logo.png",
    content: [
      
        { type: "paragraph", "text": "Se você é uma acompanhante ou profissional do setor erótico em Portugal, o XGirl.pt é a plataforma ideal para divulgar seu trabalho. Aqui, você encontra uma interface simples e um público segmentado, pronto para descobrir o que você tem a oferecer. Neste guia, a equipe XGirl.pt explica tudo o que você precisa saber para começar a anunciar e se destacar como escort Portugal." },
        { type: "heading", "text": "Por que Escolher o XGirl.pt?" },
        { type: "paragraph", "text": "O XGirl.pt foi criado para atender às necessidades das acompanhantes em Lisboa, no Porto e em todo o país. Diferente de outros sites, oferecemos ferramentas modernas como stories, tags e destaque no topo da lista. Nosso plano Premium coloca seu perfil à frente, garantindo mais visibilidade e contatos. Além disso, priorizamos segurança com verificação de perfis, para que você anuncie com tranquilidade." },
        { type: "heading", "text": "Passos para Criar Seu Anúncio" },
        { type: "list", "items": ["Acesse o XGirl.pt e crie sua conta.", "Adicione fotos de qualidade – até 10 no plano Premium.", "Escreva uma descrição atraente com detalhes sobre você.", "Escolha o plano que melhor se adapta às suas metas."] },
        { type: "paragraph", "text": "Pronto! Seu anúncio estará ativo em minutos, alcançando clientes em busca de uma acompanhante no Porto ou em qualquer cidade. Com o XGirl, você tem o controle para brilhar e crescer no mercado!" }
      
    ],
  },
  {
    slug: "acompanhantes-lisboa-melhores-dicas",
    title: "Acompanhantes em Lisboa: As Melhores Dicas para Clientes",
    author: "Equipa XGirl.pt",
    date: "2025-03-20",
    image: "/models/2.png",
    content: [
      { "type": "paragraph", "text": "Lisboa é uma das cidades mais vibrantes de Portugal, e encontrar uma acompanhante em Lisboa pode ser uma experiência incrível com as dicas certas. Aqui na XGirl.pt, queremos ajudar os clientes a aproveitar ao máximo nossa plataforma de classificados eróticos. Este guia traz conselhos práticos para escolher a escort perfeita na capital." },
      { "type": "heading", "text": "Como Escolher uma Acompanhante em Lisboa" },
      { "type": "list", "items": ["Procure perfis verificados para garantir segurança e autenticidade.", "Leia as descrições com atenção – elas revelam o estilo e os serviços oferecidos.", "Prefira anunciantes com fotos recentes e detalhadas para saber o que esperar."] },
      { "type": "paragraph", "text": "Com tantas opções de classificados no XGirl, Lisboa se torna um playground para quem busca momentos especiais. Nossa plataforma destaca as melhores escorts, especialmente no plano Premium, onde você encontra perfis no topo da lista. Seja para um jantar elegante ou um encontro descontraído, o XGirl.pt conecta você a profissionais confiáveis. Além disso, incentivamos respeito mútuo – entre em contato com clareza e educação. Experimente navegar hoje e descubra por que somos a escolha número um para encontrar uma acompanhante em Lisboa!" }
    ]
  },
  {
    slug: "fotos-anuncios-dicas",
    title: "Fotos que Vendem: Dicas para Acompanhantes no XGirl.pt",
    author: "Equipa XGirl.pt",
    date: "2025-03-15",
    image: "/models/3.png",
    content: [
      { "type": "paragraph", "text": "No mundo dos classificados eróticos, suas fotos são sua vitrine, e no XGirl.pt, elas podem ser o segredo para o sucesso. Seja você uma acompanhante em Lisboa ou no Porto, boas imagens atraem mais clientes e destacam seu perfil. Nossa equipe reuniu dicas práticas para garantir que suas fotos vendam!" },
      { "type": "heading", "text": "Dicas para Fotos Perfeitas" },
      { "type": "list", "items": ["Use iluminação natural – uma janela pode realçar sua beleza sem esforço.", "Escolha roupas que mostrem seu estilo, como algo sensual ou elegante.", "Evite filtros exagerados; clientes valorizam autenticidade em uma escort.", "Carregue várias fotos – até 10 no plano Premium do XGirl – para exibir diferentes ângulos."] },
      { "type": "paragraph", "text": "Acompanhantes que investem em boas fotos no XGirl.pt veem resultados reais: mais cliques, mais mensagens e mais encontros. Pense nas fotos como um investimento no seu negócio de escort Portugal. Com ferramentas como stories e destaque, nossa plataforma ajuda você a brilhar ainda mais. Pegue sua câmera ou celular, experimente poses naturais e crie um perfil que chame atenção. No XGirl, seu sucesso começa com uma boa primeira impressão!" }
    ]
  },
  {
    slug: "plano-premium-vantagens",
    title: "Por que o Plano Premium do XGirl.pt Vale a Pena?",
    author: "Equipa XGirl.pt",
    date: "2025-03-10",
    image: "/models/4.png",
    content: [
      { "type": "paragraph", "text": "Se você é uma acompanhante em Portugal, o plano Premium do XGirl.pt pode transformar sua experiência nos classificados eróticos. Aqui na equipe XGirl, projetamos esse plano para maximizar sua visibilidade e lucros, seja você uma acompanhante no Porto ou em qualquer outra cidade. Mas por que ele vale a pena? Vamos explicar!" },
      { "type": "heading", "text": "Vantagens do Plano Premium" },
      { "type": "list", "items": ["Seu anúncio aparece no topo da lista, alcançando mais clientes.", "Destaque visual com selo Premium e até 10 fotos no perfil.", "Mais cliques e contatos com 5 stories diários para mostrar seu dia a dia."] },
      { "type": "paragraph", "text": "Com o plano Premium, o XGirl.pt ajuda você a se destacar como uma verdadeira escort Portugal. Imagine seu perfil brilhando entre os primeiros resultados – isso significa mais oportunidades de negócios. Além disso, oferecemos ferramentas exclusivas, como tags frequentes e prioridade alta, para que sua presença online seja imbatível. Para acompanhantes em Lisboa ou no Porto, o investimento no Premium é um passo para construir uma marca forte e atrair clientes sérios. Experimente e veja como o XGirl eleva seu jogo!" }
    ]
  },
  {
    slug: "acompanhantes-porto-guia",
    title: "Acompanhantes no Porto: Um Guia para Iniciantes",
    author: "Equipa XGirl.pt",
    date: "2025-03-05",
    image: "/models/card/1.png",
    content: [
      { "type": "paragraph", "text": "O Porto é uma cidade cheia de charme, história e oportunidades, tornando-se um lugar perfeito para encontrar uma acompanhante no Porto. Na XGirl.pt, criamos este guia para iniciantes – sejam clientes ou novas anunciantes – entenderem como aproveitar ao máximo nossa plataforma de classificados eróticos. Vamos mergulhar nesse universo!" },
      { "type": "heading", "text": "O Que Esperar no Porto" },
      { "type": "paragraph", "text": "De acompanhantes sofisticadas a massagistas talentosas, o Porto oferece diversidade para todos os gostos. No XGirl, você encontra perfis detalhados de escorts com fotos, descrições e serviços únicos. Para clientes, a dica é buscar perfis verificados para garantir segurança; para anunciantes, investir no plano Premium coloca você no radar de quem procura qualidade." },
      { "type": "list", "items": ["Verifique se o perfil tem selo de verificação.", "Leia as descrições para entender os serviços oferecidos.", "Entre em contato com respeito e clareza."] },
      { "type": "paragraph", "text": "Seja você uma acompanhante no Porto ou um cliente explorando, o XGirl.pt é o ponto de partida ideal. Nossa missão é conectar pessoas de forma segura e eficiente, destacando o melhor que a cidade tem a oferecer em escort Portugal!" }
    ]
  },
  {
    slug: "seguranca-classificados-eroticos",
    title: "Segurança nos Classificados Eróticos: Dicas do XGirl.pt",
    author: "Equipa XGirl.pt",
    date: "2025-02-28",
    image: "/models/card/2.png",
    content: [
      { "type": "paragraph", "text": "Segurança é essencial ao usar classificados eróticos, e no XGirl.pt, priorizamos isso acima de tudo. Seja você uma acompanhante em Lisboa ou um cliente buscando uma escort, nossas dicas ajudam a garantir uma experiência tranquila e confiável. Aqui vai o que nossa equipe recomenda para aproveitar ao máximo a plataforma!" },
      { "type": "heading", "text": "Dicas de Segurança" },
      { "type": "list", "items": ["Escolha perfis verificados – no XGirl, todos passam por checagem.", "Comunique-se apenas pela plataforma até confiar no contato.", "Evite compartilhar informações pessoais sensíveis antes de se sentir seguro."] },
      { "type": "paragraph", "text": "O XGirl.pt foi desenhado para proteger tanto anunciantes quanto clientes. Para uma acompanhante no Porto, isso significa anunciar com paz de espírito, sabendo que sua privacidade é respeitada. Para quem busca uma escort Portugal, nossa verificação elimina preocupações, conectando você a profissionais sérias. Além disso, oferecemos suporte dedicado para qualquer dúvida ou problema. Segurança não é negociável, e no XGirl, trabalhamos para que cada interação seja positiva. Siga essas dicas, explore nosso site e veja como é fácil encontrar ou oferecer serviços com confiança!" }
    ]
  },
];

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

export default function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const [article, setArticle] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const resolvedParams = use(params);
  const slug = resolvedParams.slug;

  useEffect(() => {
    const fetchArticle = async () => {
      if (!slug) {
        setError("Nenhum slug fornecido na URL");
        setLoading(false);
        return;
      }

      try {
        const { data, error } = await supabase
          .from("blog_posts")
          .select("*")
          .eq("slug", slug);

        if (error) {
          console.error("Erro do Supabase:", error);
          throw error;
        }

        if (data && data.length > 0) {
          setArticle(data[0]);
        } else {
          const staticArticle = staticArticles.find((a) => a.slug === slug);
          if (staticArticle) {
            setArticle(staticArticle);
          } else {
            setError("Artigo não encontrado");
          }
        }
      } catch (err: any) {
        console.error("Erro ao buscar artigo:", err);
        const staticArticle = staticArticles.find((a) => a.slug === slug);
        if (staticArticle) {
          setArticle(staticArticle);
        } else {
          setError(err.message || "Erro ao carregar o artigo");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
  }, [slug]);

  if (loading) {
    return <div className="text-center py-10">Carregando...</div>;
  }

  if (error) {
    return <div className="text-center py-10 text-red-500">{error}</div>;
  }

  if (!article) {
    return <div className="text-center py-10">Artigo não encontrado</div>;
  }

  const imageSrc = article.image && article.image !== "" && article.image !== "/models/default.png" 
    ? article.image 
    : "/logo.png";

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 to-rose-50 dark:from-[#100007] dark:via-[#1a0a10] dark:to-[#2b1a21] py-10 px-4 md:px-8 lg:px-12">
      <div className="max-w-5xl mx-auto">
        <motion.div initial="initial" animate="animate" variants={{ animate: { transition: { staggerChildren: 0.1 } } }}>
          <motion.div className="relative w-full h-64 md:h-80 rounded-2xl overflow-hidden mb-6" variants={fadeInUp}>
            <Image
              src={imageSrc}
              alt={article.title || "Imagem do artigo"}
              fill
              className="object-cover"
              onError={(e) => {
                e.currentTarget.src = "/logo.png";
              }}
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
              <h1 className="text-2xl md:text-3xl font-semibold text-white">
                {article.title || "Título não disponível"}
              </h1>
              <p className="text-sm text-gray-300">
                Por{" "}
                <Link href={`/escort/${article.author_id || article.author || '#'}`} className="underline">
                  {article.author_id || article.author || "Autor desconhecido"}
                </Link>{" "}
                | {article.date ? new Date(article.date).toLocaleDateString("pt-PT") : "Data indisponível"}
              </p>
            </div>
          </motion.div>

          <motion.div className="space-y-6 text-gray-700 dark:text-gray-200" variants={{ animate: { transition: { staggerChildren: 0.1 } } }}>
            {Array.isArray(article.content) ? (
              article.content.map((item: { type: string; text: string; items?: string[] }, index: number) => {
                if (item.type === "heading") {
                  return (
                    <motion.h2 key={index} className="text-xl font-semibold" variants={fadeInUp}>
                      {item.text}
                    </motion.h2>
                  );
                } else if (item.type === "list" && item.items) {
                  return (
                    <motion.ul key={index} className="list-disc list-inside space-y-2" variants={fadeInUp}>
                      {item.items.map((listItem, i) => (
                        <li key={i} dangerouslySetInnerHTML={{ __html: listItem }} />
                      ))}
                    </motion.ul>
                  );
                }
                return (
                  <motion.p key={index} variants={fadeInUp} dangerouslySetInnerHTML={{ __html: item.text }} />
                );
              })
            ) : (
              <motion.p variants={fadeInUp}>{article.content || "Conteúdo não disponível"}</motion.p>
            )}
          </motion.div>

          <motion.div className="mt-8 text-center space-x-4" variants={fadeInUp}>
            <Link href="/blog">
              <Button variant="outline" className="rounded-full">
                Voltar ao Blog
              </Button>
            </Link>
            <Link href="/registo">
              <Button className="bg-pink-600 hover:bg-pink-700 text-white rounded-full px-6 py-2">
                Crie Seu Anúncio Agora
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}