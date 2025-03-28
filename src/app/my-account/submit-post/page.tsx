"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { supabase } from '@/backend/database/supabase'; // Para salvar no banco (futuro)

// Variantes de animação
const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

export default function SubmitPost() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Placeholder: lógica de envio (será substituída pelo Supabase)
    console.log('Artigo enviado:', { title, content });

    // Futuro: Salvar no Supabase
    /*
    const { data: { user } } = await supabase.auth.getUser();
    const { error } = await supabase.from('blog_posts').insert({
      slug: title.toLowerCase().replace(/ /g, '-'),
      title,
      author: user.email, // ou outro campo do perfil
      date: new Date().toISOString().split('T')[0],
      image: '/models/default.png', // Placeholder, adicionar upload depois
      content: [{ type: 'paragraph', text: content }],
    });
    if (error) console.error('Erro ao enviar:', error);
    else alert('Artigo enviado para moderação!');
    */

    setIsSubmitting(false);
    setTitle('');
    setContent('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 to-rose-50 dark:from-[#100007] dark:via-[#1a0a10] dark:to-[#2b1a21] py-10 px-4 md:px-8 lg:px-12">
      <div className="max-w-5xl mx-auto">
        <motion.div
          className="text-center mb-12"
          initial="initial"
          animate="animate"
          variants={{ animate: { transition: { staggerChildren: 0.1 } } }}
        >
          <motion.h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4" variants={fadeInUp}>
            Escreva Seu Artigo
          </motion.h1>
          <motion.p className="text-xl font-body text-gray-600 dark:text-gray-300 mb-6" variants={fadeInUp}>
            Compartilhe suas dicas ou histórias e ganhe destaque no XGirl.pt!
          </motion.p>
        </motion.div>

        <motion.form
          onSubmit={handleSubmit}
          className="bg-white dark:bg-[#1a0a10] p-6 rounded-3xl shadow-2xl space-y-6"
          initial="initial"
          animate="animate"
          variants={{ animate: { transition: { staggerChildren: 0.1 } } }}
        >
          <motion.div variants={fadeInUp}>
            <label className="block text-gray-700 dark:text-gray-200 mb-2">Título</label>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Digite o título do seu artigo"
              className="w-full rounded-full"
              required
            />
          </motion.div>
          <motion.div variants={fadeInUp}>
            <label className="block text-gray-700 dark:text-gray-200 mb-2">Conteúdo</label>
            <Textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Escreva seu artigo aqui..."
              className="w-full h-64 rounded-xl"
              required
            />
          </motion.div>
          <motion.div className="text-center" variants={fadeInUp}>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="bg-pink-600 hover:bg-pink-700 text-white rounded-full px-6 py-2"
            >
              {isSubmitting ? 'Enviando...' : 'Enviar Artigo'}
            </Button>
          </motion.div>
        </motion.form>
      </div>
    </div>
  );
}