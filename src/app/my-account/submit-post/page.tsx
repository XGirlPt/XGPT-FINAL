"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/backend/database/supabase";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { useDispatch as useReduxDispatch } from "react-redux";
import { updateFeaturedUntilThunk } from "@/backend/actions/ProfileActions"; // Apenas este thunk
import { BlogPostInput } from "@/backend/types";
import { AppDispatch } from "@/backend/store"; // Ajuste o caminho para o seu store

// Variantes de animação
const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

// Palavras-chave obrigatórias para SEO
const requiredKeywords = [
  "acompanhante em Lisboa",
  "acompanhante no Porto",
  "XGirl",
  "escort",
  "escort Portugal",
];

export default function SubmitPost() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showKeywordError, setShowKeywordError] = useState(false);
  const dispatch: AppDispatch = useReduxDispatch();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const validateContent = (text: string): boolean => {
    const lowerText = text.toLowerCase();
    return requiredKeywords.some((keyword) => lowerText.includes(keyword.toLowerCase()));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        throw new Error("Você precisa estar logado para enviar um artigo.");
      }

      const { data: profileData, error: profileError } = await supabase
        .from("ProfilesData")
        .select("premium")
        .eq("userUID", session.user.id)
        .single();

      if (profileError || !profileData?.premium) {
        throw new Error("Apenas usuários Premium podem escrever artigos.");
      }

      if (!validateContent(content)) {
        setShowKeywordError(true);
        setIsSubmitting(false);
        return;
      }

      let imagePath: string | null = null;
      if (image) {
        const fileName = `${Date.now()}-${image.name}`;
        const { error: uploadError } = await supabase.storage
          .from("blog-images")
          .upload(fileName, image);

        if (uploadError) {
          throw uploadError;
        }

        const { data: publicUrlData } = supabase.storage
          .from("blog-images")
          .getPublicUrl(fileName);
        imagePath = publicUrlData.publicUrl;
      }

      const timestamp = Date.now();
      const baseSlug = title.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
      const uniqueSlug = `${baseSlug}-${timestamp}`;

      const blogPost: BlogPostInput = {
        title,
        content: [{ type: "paragraph", text: content }],
        author_id: session.user.id,
        date: new Date().toISOString().split("T")[0],
        image: imagePath || "/logo.png",
        slug: uniqueSlug,
        status: "pending",
      };

      const { error: insertError } = await supabase
        .from("blog_posts")
        .insert(blogPost);

      if (insertError) {
        throw insertError;
      }

      const featuredUntil = new Date();
      featuredUntil.setDate(featuredUntil.getDate() + 5);
      const featuredUntilISO = featuredUntil.toISOString();

      // Atualiza apenas o featured_until
      await dispatch(updateFeaturedUntilThunk(featuredUntilISO)).unwrap();

      alert(
        "Artigo enviado com sucesso! Após aprovação, você receberá o badge 'Autora de Artigo' e 5 dias de destaque nos 'Featured Ads'."
      );
      setTitle("");
      setContent("");
      setImage(null);
    } catch (err: any) {
      console.error("Erro ao enviar artigo:", err);
      if (err.message !== "Você precisa estar logado para enviar um artigo." && !showKeywordError) {
        alert(err.message || "Erro ao enviar o artigo. Tente novamente.");
      }
    } finally {
      setIsSubmitting(false);
    }
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
          <motion.h1
            className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4"
            variants={fadeInUp}
          >
            Escreva Seu Artigo
          </motion.h1>
          <motion.p
            className="text-xl font-body text-gray-600 dark:text-gray-300 mb-6"
            variants={fadeInUp}
          >
            Compartilhe suas dicas ou histórias e ganhe destaque no XGirl.pt!
          </motion.p>
        </motion.div>

        {/* Seção de Regras e Benefícios */}
        <motion.div
          className="bg-white dark:bg-[#1a0a10] p-6 rounded-3xl shadow-2xl mb-6"
          initial="initial"
          animate="animate"
          variants={{ animate: { transition: { staggerChildren: 0.1 } } }}
        >
          <motion.h2
            className="text-2xl font-semibold text-gray-900 dark:text-white mb-4"
            variants={fadeInUp}
          >
            Por que escrever um artigo no XGirl.pt?
          </motion.h2>
          <motion.p className="text-gray-700 dark:text-gray-200 mb-4" variants={fadeInUp}>
            Como usuário Premium, você pode escrever artigos para o blog e aproveitar vantagens exclusivas enquanto ajuda o XGirl.pt a crescer:
          </motion.p>
          <motion.ul className="list-disc list-inside text-gray-700 dark:text-gray-200 space-y-2" variants={fadeInUp}>
            <li>
              <strong>Badge &quot;Autora de Artigo&quot;</strong>: Ganhe um selo especial no seu perfil após a aprovação do artigo.
            </li>
            <li>
              <strong>Destaque por 5 dias</strong>: Seu anúncio aparece nos &quot;Featured Ads&quot; no topo da lista por 5 dias.
            </li>
            <li>
              <strong>Melhora nosso SEO</strong>: Ajude-nos a atrair mais visitantes e, em troca, ganhe mais visibilidade!
            </li>
          </motion.ul>
          <motion.h3
            className="text-xl font-semibold text-gray-900 dark:text-white mt-6 mb-2"
            variants={fadeInUp}
          >
            Regras para Escrever um Artigo
          </motion.h3>
          <motion.p className="text-gray-700 dark:text-gray-200 mb-4" variants={fadeInUp}>
            Para que seu artigo seja válido e aproveitado ao máximo, siga estas diretrizes:
          </motion.p>
          <motion.ul className="list-disc list-inside text-gray-700 dark:text-gray-200 space-y-2" variants={fadeInUp}>
            <li>
              Inclua pelo menos uma das palavras-chave: <strong>{requiredKeywords.join(", ")}</strong>.
            </li>
            <li>Escreva um conteúdo original com no mínimo 200 palavras.</li>
            <li>
              Evite linguagem ofensiva ou conteúdo que viole nossas políticas.
            </li>
            <li>
              Após envio, seu artigo será revisado e, se aprovado, publicado em até 48 horas.
            </li>
          </motion.ul>
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
            <label className="block text-gray-700 dark:text-gray-200 mb-2">Imagem (opcional)</label>
            <Input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full rounded-full"
            />
          </motion.div>
          <motion.div variants={fadeInUp}>
            <label className="block text-gray-700 dark:text-gray-200 mb-2">Conteúdo</label>
            <Textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Escreva seu artigo aqui (inclua palavras-chave como 'acompanhante em Lisboa', 'XGirl', etc.)..."
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
              {isSubmitting ? "Enviando..." : "Enviar Artigo"}
            </Button>
          </motion.div>
        </motion.form>

        {/* Popup de Erro de Palavras-Chave */}
        <Dialog open={showKeywordError} onOpenChange={setShowKeywordError}>
          <DialogContent className="bg-gradient-to-br from-pink-100 to-rose-50 dark:from-[#1a0a10] dark:to-[#2b1a21] rounded-3xl shadow-2xl border-none">
            <DialogHeader>
              <DialogTitle className="text-2xl font-semibold text-gray-900 dark:text-white">
                Palavras-Chave Obrigatórias
              </DialogTitle>
              <DialogDescription className="text-gray-700 dark:text-gray-200">
                Seu artigo deve incluir pelo menos uma das seguintes palavras-chave para ser válido: <br />
                <strong>{requiredKeywords.join(", ")}</strong>.
              </DialogDescription>
            </DialogHeader>
            <div className="flex justify-center mt-4">
              <Button
                onClick={() => setShowKeywordError(false)}
                className="bg-pink-600 hover:bg-pink-700 text-white rounded-full px-6 py-2"
              >
                Entendido
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}