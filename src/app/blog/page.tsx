"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { supabase } from "@/backend/database/supabase";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"; // Supondo que você use um componente de dialog do shadcn/ui

// Variantes de animação
const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

const staggerChildren = {
  animate: { transition: { staggerChildren: 0.1 } },
};

// Posts estáticos
const staticArticles = [
  {
    slug: "guia-completo-anunciar-xgirl",
    title: "Guia Completo para Anunciar no XGirl.pt",
    author: "Equipe XGirl.pt",
    date: "2025-03-27",
    image: "/models/1.png",
    content: [
      { type: "paragraph", text: "Se você é uma acompanhante ou profissional do setor erótico em Portugal, o XGirl.pt é a plataforma ideal para divulgar seu trabalho..." },
      { type: "heading", text: "Por que Escolher o XGirl.pt?" },
      { type: "paragraph", text: "O XGirl.pt oferece uma interface simples e um público segmentado..." },
      { type: "heading", text: "Passos para Criar Seu Anúncio" },
      { type: "list", items: ["Acesse...", "Adicione fotos...", "Escreva uma descrição...", "Escolha o Plano Premium..."] },
      { type: "paragraph", text: "Pronto! Seu anúncio estará ativo..." },
    ],
  },
  {
    slug: "acompanhantes-lisboa-melhores-dicas",
    title: "Acompanhantes em Lisboa: As Melhores Dicas para Clientes",
    author: "João Silva",
    date: "2025-03-20",
    image: "/models/2.png",
    content: [
      { type: "paragraph", text: "Lisboa é uma das cidades mais vibrantes..." },
      { type: "heading", text: "Como Escolher uma Acompanhante em Lisboa" },
      { type: "list", items: ["Procure perfis verificados...", "Leia as descrições...", "Prefira anunciantes..."] },
      { type: "paragraph", text: "Com tantas opções de classificados..." },
    ],
  },
  {
    slug: "fotos-anuncios-dicas",
    title: "Fotos que Vendem: Dicas para Acompanhantes no XGirl.pt",
    author: "Mariana Costa",
    date: "2025-03-15",
    image: "/models/3.png",
    content: [
      { type: "paragraph", text: "No mundo dos classificados eróticos..." },
      { type: "heading", text: "Dicas para Fotos Perfeitas" },
      { type: "list", items: ["Use iluminação natural...", "Escolha roupas...", "Evite filtros...", "Carregue várias fotos..."] },
      { type: "paragraph", text: "Acompanhantes que investem em boas fotos..." },
    ],
  },
  {
    slug: "plano-premium-vantagens",
    title: "Por que o Plano Premium do XGirl.pt Vale a Pena?",
    author: "Equipe XGirl.pt",
    date: "2025-03-10",
    image: "/models/4.png",
    content: [
      { type: "paragraph", text: "Se você é uma acompanhante em Portugal..." },
      { type: "heading", text: "Vantagens do Plano Premium" },
      { type: "list", items: ["Seu anúncio aparece no topo...", "Destaque visual...", "Mais cliques..."] },
      { type: "paragraph", text: "Com o Plano Premium, o XGirl.pt ajuda você..." },
    ],
  },
  {
    slug: "acompanhantes-porto-guia",
    title: "Acompanhantes no Porto: Um Guia para Iniciantes",
    author: "Sofia Almeida",
    date: "2025-03-05",
    image: "/models/card/1.png",
    content: [
      { type: "paragraph", text: "O Porto é uma cidade cheia de charme..." },
      { type: "heading", text: "O Que Esperar no Porto" },
      { type: "paragraph", text: "De acompanhantes sofisticadas a massagistas..." },
      { type: "list", items: ["Verifique se o perfil...", "Leia as descrições...", "Entre em contato..."] },
    ],
  },
  {
    slug: "seguranca-classificados-eroticos",
    title: "Segurança nos Classificados Eróticos: Dicas do XGirl.pt",
    author: "Pedro Santos",
    date: "2025-02-28",
    image: "/models/card/2.png",
    content: [
      { type: "paragraph", text: "Segurança é essencial ao usar classificados..." },
      { type: "heading", text: "Dicas de Segurança" },
      { type: "list", items: ["Escolha perfis verificados...", "Comunique-se apenas...", "Evite compartilhar..."] },
      { type: "paragraph", text: "O XGirl.pt prioriza a segurança..." },
    ],
  },
];

export default function Blog() {
  const [articles, setArticles] = useState(staticArticles);
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const { data, error } = await supabase
          .from("blog_posts")
          .select("*")
          .eq("status", "approved");

        if (error) {
          console.error("Erro ao buscar posts do Supabase:", error);
        } else if (data && data.length > 0) {
          const combinedArticles = [
            ...data,
            ...staticArticles.filter(
              (staticArticle) => !data.some((dbArticle) => dbArticle.slug === staticArticle.slug)
            ),
          ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
          setArticles(combinedArticles);
        }
      } catch (err) {
        console.error("Erro inesperado:", err);
      } finally {
        setLoading(false);
      }
    };

    const checkAuthStatus = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setIsLoggedIn(!!session); // Define como true se houver sessão
    };

    fetchArticles();
    checkAuthStatus();
  }, []);

  const handleWriteArticleClick = () => {
    if (isLoggedIn) {
      window.location.href = "/my-account/submit-post"; // Redireciona se logado
    } else {
      setShowLoginPrompt(true); // Mostra popup se não logado
    }
  };

  if (loading) {
    return <div className="text-center py-10">Carregando...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 to-rose-50 dark:from-[#100007] dark:via-[#1a0a10] dark:to-[#2b1a21] py-10 px-4 md:px-8 lg:px-12">
      <div className="max-w-5xl mx-auto">
        <motion.div className="text-center mb-12" initial="initial" animate="animate" variants={staggerChildren}>
          <motion.h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4" variants={fadeInUp}>
            Blog XGirl.pt
          </motion.h1>
          <motion.p className="text-xl font-body text-gray-600 dark:text-gray-300 mb-6" variants={fadeInUp}>
            Dicas, histórias e novidades para anunciantes e visitantes.
          </motion.p>
          <motion.div variants={fadeInUp}>
            <Button
              onClick={handleWriteArticleClick}
              className="bg-pink-600 hover:bg-pink-700 text-white rounded-full px-6 py-2"
            >
              Quero Escrever um Artigo!
            </Button>
          </motion.div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {articles.map((article) => (
            <Card key={article.slug} className="p-6 bg-white dark:bg-[#1a0a10] rounded-3xl shadow-2xl">
              <motion.div initial="initial" animate="animate" variants={staggerChildren}>
                <motion.div className="relative w-full h-48 rounded-2xl overflow-hidden mb-4" variants={fadeInUp}>
                  <Image
                    src={article.image || "/logo.png"}
                    alt={article.title}
                    fill
                    className="object-cover"
                    onError={(e) => {
                      e.currentTarget.src = "/logo.png";
                    }}
                  />
                </motion.div>
                <motion.h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2" variants={fadeInUp}>
                  <Link href={`/blog/${article.slug}`} className="hover:underline">
                    {article.title}
                  </Link>
                </motion.h2>
                <motion.p className="text-sm text-gray-600 dark:text-gray-300 mb-4" variants={fadeInUp}>
                  Por {article.author} | {new Date(article.date).toLocaleDateString("pt-PT")}
                </motion.p>
                <motion.div variants={fadeInUp}>
                  <Link href={`/blog/${article.slug}`}>
                    <Button variant="outline" className="rounded-full">
                      Ler Mais
                    </Button>
                  </Link>
                </motion.div>
              </motion.div>
            </Card>
          ))}
        </div>

        {/* Popup de login */}
        <Dialog open={showLoginPrompt} onOpenChange={setShowLoginPrompt}>
          <DialogContent className="bg-white dark:bg-[#1a0a10] rounded-3xl">
            <DialogHeader>
              <DialogTitle className="text-gray-900 dark:text-white">Acesso Restrito</DialogTitle>
              <DialogDescription className="text-gray-600 dark:text-gray-300">
                Para escrever um artigo, você precisa estar logado. Faça login ou registre-se agora!
              </DialogDescription>
            </DialogHeader>
            <div className="flex justify-center space-x-4 mt-4">
              <Link href="/login">
                <Button className="bg-pink-600 hover:bg-pink-700 text-white rounded-full px-6 py-2">
                  Login
                </Button>
              </Link>
              <Link href="/registo">
                <Button variant="outline" className="rounded-full">
                  Registrar
                </Button>
              </Link>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}