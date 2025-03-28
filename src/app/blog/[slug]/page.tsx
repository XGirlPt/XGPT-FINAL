// app/blog/[slug]/page.tsx
"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { supabase } from '@/backend/database/supabase'
import Link from 'next/link';

const fadeInUp = { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.5 } };

export default function BlogPost({ params }) {
  const [article, setArticle] = useState(null);

  useEffect(() => {
    const fetchArticle = async () => {
      const { data } = await supabase.from('blog_posts').select('*').eq('slug', params.slug).single();
      setArticle(data);
    };
    fetchArticle();
  }, [params.slug]);

  if (!article) return <div>Carregando...</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 to-rose-50 dark:from-[#100007] dark:via-[#1a0a10] dark:to-[#2b1a21] py-10 px-4 md:px-8 lg:px-12">
      <div className="max-w-5xl mx-auto">
        <motion.div initial="initial" animate="animate" variants={{ animate: { transition: { staggerChildren: 0.1 } } }}>
          <motion.div className="relative w-full h-64 md:h-80 rounded-2xl overflow-hidden mb-6" variants={fadeInUp}>
            <Image src={article.image} alt={article.title} fill className="object-cover" />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
              <h1 className="text-2xl md:text-3xl font-semibold text-white">{article.title}</h1>
              <p className="text-sm text-gray-300">Por {article.author} | {new Date(article.date).toLocaleDateString('pt-PT')}</p>
            </div>
          </motion.div>
          <motion.div className="space-y-6 text-gray-700 dark:text-gray-200" variants={{ animate: { transition: { staggerChildren: 0.1 } } }}>
            {/* Renderizar conteúdo como na página principal */}
          </motion.div>
          <motion.div className="mt-8 text-center" variants={fadeInUp}>
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