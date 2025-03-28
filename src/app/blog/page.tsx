"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

// Variantes de animação para fade-in
const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

// Variantes para animação em sequência
const staggerChildren = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export default function Blog() {
  const [articles] = useState([
    {
      slug: 'guia-completo-anunciar-xgirl',
      title: 'Guia Completo para Anunciar no XGirl.pt',
      author: 'Equipe XGirl.pt',
      date: '2025-03-27',
      image: '/models/1.png',
      content: [
        {
          type: 'paragraph',
          text: 'Se você é uma acompanhante ou profissional do setor erótico em Portugal, o XGirl.pt é a plataforma ideal para divulgar seu trabalho. Neste guia, vamos mostrar como criar um anúncio irresistível e aproveitar ao máximo os recursos do site, como o Plano Premium.',
        },
        { type: 'heading', text: 'Por que Escolher o XGirl.pt?' },
        {
          type: 'paragraph',
          text: 'O XGirl.pt oferece uma interface simples e um público segmentado. Com milhares de visitantes diários procurando acompanhantes, sua visibilidade aqui é garantida. Além disso, o Plano Premium coloca seu anúncio em destaque, atraindo mais clientes.',
        },
        { type: 'heading', text: 'Passos para Criar Seu Anúncio' },
        {
          type: 'list',
          items: [
            'Acesse <a href="/registo" class="text-pink-600 hover:underline">xgirl.pt/registo</a> e crie sua conta.',
            'Adicione fotos de alta qualidade – elas são o primeiro atrativo para os clientes.',
            'Escreva uma descrição clara e atraente, usando palavras-chave como "acompanhantes" ou "massagens eróticas".',
            'Escolha o Plano Premium para aparecer no topo das buscas.',
          ],
        },
        {
          type: 'paragraph',
          text: 'Pronto! Seu anúncio estará ativo e visível para milhares de usuários. Quer mais dicas? Continue acompanhando o blog do XGirl.pt ou envie seu próprio artigo para ganhar destaque!',
        },
      ],
    },
    {
      slug: 'acompanhantes-lisboa-melhores-dicas',
      title: 'Acompanhantes em Lisboa: As Melhores Dicas para Clientes',
      author: 'João Silva',
      date: '2025-03-20',
      image: '/models/2.png',
      content: [
        {
          type: 'paragraph',
          text: 'Lisboa é uma das cidades mais vibrantes para encontrar acompanhantes de qualidade, e o XGirl.pt é o lugar perfeito para começar. Neste artigo, compartilhamos dicas essenciais para escolher a acompanhante ideal em Lisboa e aproveitar ao máximo sua experiência.',
        },
        { type: 'heading', text: 'Como Escolher uma Acompanhante em Lisboa' },
        {
          type: 'list',
          items: [
            'Procure perfis verificados no XGirl.pt – veja mais em <a href="/escort" class="text-pink-600 hover:underline">xgirl.pt/escort</a>.',
            'Leia as descrições e veja fotos para encontrar alguém que combine com suas preferências.',
            'Prefira anunciantes com o Plano Premium para garantir visibilidade e confiabilidade.',
          ],
        },
        {
          type: 'paragraph',
          text: 'Com tantas opções de classificados eróticos, o XGirl.pt destaca-se por conectar você diretamente às melhores acompanhantes de Lisboa. Experimente hoje e encontre o que procura!',
        },
      ],
    },
    {
      slug: 'fotos-anuncios-dicas',
      title: 'Fotos que Vendem: Dicas para Acompanhantes no XGirl.pt',
      author: 'Mariana Costa',
      date: '2025-03-15',
      image: '/models/3.png',
      content: [
        {
          type: 'paragraph',
          text: 'No mundo dos classificados eróticos, as fotos são seu cartão de visita. No XGirl.pt, uma boa imagem pode fazer toda a diferença para atrair clientes. Confira nossas dicas para criar fotos que vendem!',
        },
        { type: 'heading', text: 'Dicas para Fotos Perfeitas' },
        {
          type: 'list',
          items: [
            'Use iluminação natural ou luz suave para destacar seus melhores ângulos.',
            'Escolha roupas que reflitam seu estilo – sensualidade com elegância funciona bem.',
            'Evite filtros excessivos; autenticidade é valorizada pelos clientes do XGirl.pt.',
            'Carregue várias fotos no seu perfil em <a href="/registo" class="text-pink-600 hover:underline">xgirl.pt/registo</a>.',
          ],
        },
        {
          type: 'paragraph',
          text: 'Acompanhantes que investem em boas fotos no XGirl.pt têm mais chances de se destacar. Experimente essas dicas e veja seus contatos aumentarem!',
        },
      ],
    },
    {
      slug: 'plano-premium-vantagens',
      title: 'Por que o Plano Premium do XGirl.pt Vale a Pena?',
      author: 'Equipe XGirl.pt',
      date: '2025-03-10',
      image: '/models/4.png',
      content: [
        {
          type: 'paragraph',
          text: 'Se você é uma acompanhante em Portugal, o Plano Premium do XGirl.pt pode transformar sua visibilidade nos classificados eróticos. Neste artigo, explicamos por que vale a pena investir nesse upgrade.',
        },
        { type: 'heading', text: 'Vantagens do Plano Premium' },
        {
          type: 'list',
          items: [
            'Seu anúncio aparece no topo das pesquisas em <a href="/escort" class="text-pink-600 hover:underline">xgirl.pt/escort</a>.',
            'Destaque visual com selo Premium nos perfis.',
            'Mais cliques e contatos de clientes interessados.',
          ],
        },
        {
          type: 'paragraph',
          text: 'Com o Plano Premium, o XGirl.pt ajuda você a alcançar mais clientes e crescer no mercado de acompanhantes. Saiba mais em <a href="/registo-pagamento" class="text-pink-600 hover:underline">xgirl.pt/registo-pagamento</a>.',
        },
      ],
    },
    {
      slug: 'acompanhantes-porto-guia',
      title: 'Acompanhantes no Porto: Um Guia para Iniciantes',
      author: 'Sofia Almeida',
      date: '2025-03-05',
      image: '/models/card/1.png',
      content: [
        {
          type: 'paragraph',
          text: 'O Porto é uma cidade cheia de charme e opções para quem busca acompanhantes. No XGirl.pt, você encontra os melhores classificados eróticos da região. Este guia é perfeito para iniciantes que querem explorar o que o Porto tem a oferecer.',
        },
        { type: 'heading', text: 'O Que Esperar no Porto' },
        {
          type: 'paragraph',
          text: 'De acompanhantes sofisticadas a massagistas sensuais, o XGirl.pt tem de tudo. Filtre por cidade em <a href="/escort" class="text-pink-600 hover:underline">xgirl.pt/escort</a> e encontre o perfil ideal para você.',
        },
        {
          type: 'list',
          items: [
            'Verifique se o perfil é certificado para maior segurança.',
            'Leia as descrições para entender os serviços oferecidos.',
            'Entre em contato diretamente pelo XGirl.pt.',
          ],
        },
      ],
    },
    {
      slug: 'seguranca-classificados-eroticos',
      title: 'Segurança nos Classificados Eróticos: Dicas do XGirl.pt',
      author: 'Pedro Santos',
      date: '2025-02-28',
      image: '/models/card/2.png',
      content: [
        {
          type: 'paragraph',
          text: 'Segurança é essencial ao usar classificados eróticos como o XGirl.pt. Tanto para acompanhantes quanto para clientes, essas dicas ajudam a garantir uma experiência tranquila e confiável.',
        },
        { type: 'heading', text: 'Dicas de Segurança' },
        {
          type: 'list',
          items: [
            'Escolha perfis verificados no XGirl.pt – veja em <a href="/escort" class="text-pink-600 hover:underline">xgirl.pt/escort</a>.',
            'Comunique-se apenas pela plataforma até confiar na outra parte.',
            'Evite compartilhar informações pessoais sensíveis.',
          ],
        },
        {
          type: 'paragraph',
          text: 'O XGirl.pt prioriza a segurança dos usuários com perfis certificados e suporte dedicado. Crie seu anúncio com confiança em <a href="/registo" class="text-pink-600 hover:underline">xgirl.pt/registo</a>.',
        },
      ],
    },
  ]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 to-rose-50 dark:from-[#100007] dark:via-[#1a0a10] dark:to-[#2b1a21] py-10 px-4 md:px-8 lg:px-12">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial="initial"
          animate="animate"
          variants={staggerChildren}
        >
          <motion.h1
            className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4"
            variants={fadeInUp}
          >
            Blog XGirl.pt
          </motion.h1>
          <motion.p
            className="text-xl font-body text-gray-600 dark:text-gray-300 mb-6"
            variants={fadeInUp}
          >
            Dicas, histórias e novidades para anunciantes e visitantes.
          </motion.p>
          <motion.div variants={fadeInUp}>
            <Link href="/my-account/submit-post">
              <Button className="bg-pink-600 hover:bg-pink-700 text-white rounded-full px-6 py-2">
                Quero Escrever um Artigo e Ganhar Destaque!
              </Button>
            </Link>
          </motion.div>
        </motion.div>

        {/* Lista de Artigos - 1 por linha */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      {articles.map((article) => (
            <Card key={article.slug} className="p-6 bg-white dark:bg-[#1a0a10] rounded-3xl shadow-2xl">
              <motion.div initial="initial" animate="animate" variants={staggerChildren}>
                {/* Imagem do Artigo */}
                <motion.div
                  className="relative w-full h-64 md:h-80 rounded-2xl overflow-hidden mb-6"
                  variants={fadeInUp}
                >
                  <Image
                    src={article.image}
                    alt={article.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                    <h2 className="text-2xl md:text-3xl font-semibold text-white">{article.title}</h2>
                    <p className="text-sm text-gray-300">
                      Por {article.author} | {new Date(article.date).toLocaleDateString('pt-PT')}
                    </p>
                  </div>
                </motion.div>

                {/* Conteúdo do Artigo */}
                <motion.div className="space-y-6 text-gray-700 dark:text-gray-200" variants={staggerChildren}>
                  {article.content.map((section, index) => {
                    switch (section.type) {
                      case 'heading':
                        return (
                          <motion.h3
                            key={index}
                            className="text-xl md:text-2xl font-semibold text-gray-900 dark:text-white"
                            variants={fadeInUp}
                          >
                            {section.text}
                          </motion.h3>
                        );
                      case 'paragraph':
                        return (
                          <motion.p
                            key={index}
                            className="text-base leading-relaxed"
                            variants={fadeInUp}
                            dangerouslySetInnerHTML={{ __html: section.text }}
                          />
                        );
                      case 'list':
                        return (
                          <motion.ul
                            key={index}
                            className="list-disc list-inside space-y-2"
                            variants={staggerChildren}
                          >
                            {section.items.map((item, i) => (
                              <motion.li
                                key={i}
                                className="text-base"
                                variants={fadeInUp}
                                dangerouslySetInnerHTML={{ __html: item }}
                              />
                            ))}
                          </motion.ul>
                        );
                      default:
                        return null;
                    }
                  })}
                </motion.div>

                {/* Call-to-Action */}
                <motion.div className="mt-8 text-center" variants={fadeInUp}>
                  <Link href="/registo">
                    <Button className="bg-pink-600 hover:bg-pink-700 text-white rounded-full px-6 py-2">
                      Crie Seu Anúncio Agora
                    </Button>
                  </Link>
                </motion.div>
              </motion.div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}