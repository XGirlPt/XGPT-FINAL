"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { supabase } from "@/backend/database/supabase";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { Card } from "@/components/ui/card";
import StatsCards from "./_ui/StatsCards";
import ProfileManagement from "./_ui/ProfileManagement";
import BlogManagement from "./_ui/BlogManagement";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const fadeInUp = { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.5 } };
const staggerChildren = { animate: { transition: { staggerChildren: 0.1 } } };

interface BlogPost {
  id: number;
  slug: string;
  title: string;
  author_id: string;
  date: string;
  image: string;
  content: { type: string; text: string }[];
  status: "pending" | "approved" | "rejected";
  created_at: string;
}

interface Profile {
  id: number;
  nome: string;
  photos: string[];
  vphotos: string[];
  stories: string[];
  userUID?: string;
  description?: string;
  tag?: string;
  tagtimestamp?: Date;
  tarifa: number;
  lingua: string[];
  telefone: string;
  email: string;
  idade: number;
  altura: string;
  distrito: string;
  origem: string;
  cidade: string;
  address: string;
  latitude: number;
  longitude: number;
  peso: string;
  tatuagem: string;
  pelos: string;
  olhos: string;
  seios: string;
  mamas: string;
  signo: string;
  pagamento: string[];
  inactive: boolean;
  certificado: boolean;
  live?: boolean;
  comment?: string[];
  premium: boolean;
  created_at?: string;
  last_login?: string;
  payment_history?: { date: string; amount: number; status: string }[];
}

interface AdminLog {
  id: number;
  action: string;
  userUID: string;
  timestamp: string;
}

export default function AdminLayout() {
  const { t } = useTranslation();
  const currentUserUID = useSelector((state: { profile: { userUID?: string } }) => state.profile.userUID);
  const [isAdmin, setIsAdmin] = useState(false);
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [logs, setLogs] = useState<AdminLog[]>([]);
  const [activeTab, setActiveTab] = useState<"profiles" | "blogs" | "logs">("profiles");

  useEffect(() => {
    const loadData = async () => {
      if (!currentUserUID) {
        toast.error(t("messages.userNotIdentified"));
        return;
      }

      const { data: userData, error: userError } = await supabase.auth.getUser();
      if (userError || !userData?.user) {
        toast.error(t("messages.authError"));
        return;
      }

      const userEmail = userData.user.email;
      const adminEmail = process.env.NEXT_PUBLIC_ADMIN_EMAIL;
      if (userEmail !== adminEmail) {
        toast.error(t("messages.notAdmin"));
        setIsAdmin(false);
        return;
      }

      setIsAdmin(true);

      const { data: profilesData, error: profilesError } = await supabase.from("ProfilesData").select("*");
      if (profilesError) {
        toast.error(t("messages.fetchError"));
      } else {
        const enrichedProfiles = await Promise.all(
          profilesData.map(async (p) => {
            const { data: photos } = await supabase.from("profilephoto").select("imageurl").eq("userUID", p.userUID);
            const { data: vphotos } = await supabase.from("VPhoto").select("imageurl").eq("userUID", p.userUID);
            const { data: stories } = await supabase.from("stories").select("imageurl").eq("userUID", p.userUID);
            const { data: authData } = await supabase.from("users").select("last_sign_in_at").eq("id", p.userUID).single();
            const { data: payments } = await supabase.from("payments").select("date, amount, status").eq("userUID", p.userUID);
            return {
              ...p,
              photos: photos?.map((ph) => ph.imageurl) || [],
              vphotos: vphotos?.map((vp) => vp.imageurl) || [],
              stories: stories?.map((s) => s.imageurl) || [],
              inactive: p.inactive ?? false,
              certificado: p.certificado ?? false,
              premium: p.premium ?? false,
              live: p.live ?? false,
              created_at: p.created_at,
              last_login: authData?.last_sign_in_at,
              payment_history: payments || [],
            };
          })
        );
        setProfiles(enrichedProfiles);
      }

      const { data: blogData, error: blogError } = await supabase.from("blog_posts").select("*");
      if (blogError) {
        toast.error(t("messages.fetchError"));
      } else {
        setBlogPosts(blogData);
      }

      const { data: logsData, error: logsError } = await supabase.from("admin_logs").select("*").order("timestamp", { ascending: false });
      if (logsError) {
        toast.error(t("messages.fetchLogsError"));
      } else {
        setLogs(logsData || []);
      }
    };

    loadData();
  }, [currentUserUID, t]);

  const logAction = async (action: string, userUID: string) => {
    const { error } = await supabase.from("admin_logs").insert({ action, userUID, timestamp: new Date().toISOString() });
    if (!error) {
      setLogs((prev) => [{ id: Date.now(), action, userUID, timestamp: new Date().toISOString() }, ...prev]);
    }
  };

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-100 to-rose-50 dark:from-[#100007] dark:via-[#1a0a10] dark:to-[#2b1a21] py-10 px-4 md:px-8 lg:px-12 flex items-center justify-center">
        <Card className="p-6 bg-white dark:bg-[#1a0a10] rounded-3xl shadow-2xl">
          <p className="text-red-500 text-center">{t("messages.notAdmin")}</p>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 to-rose-50 dark:from-[#100007] dark:via-[#1a0a10] dark:to-[#2b1a21] py-10 px-4 md:px-8 lg:px-12">
      <div className="max-w-7xl mx-auto">
        <motion.div className="text-center mb-12" initial="initial" animate="animate" variants={staggerChildren}>
          <motion.h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4" variants={fadeInUp}>
            Painel de Administração Avançado
          </motion.h1>
          <motion.p className="text-xl font-body text-gray-600 dark:text-gray-300" variants={fadeInUp}>
            Gerencie perfis, posts do blog e obtenha insights detalhados
          </motion.p>
        </motion.div>

        <StatsCards profiles={profiles} blogPosts={blogPosts} activeTab={activeTab} />

        <div className="flex justify-center mb-8 space-x-4">
          <button
            className={`rounded-full px-6 py-2 ${activeTab === "profiles" ? "bg-pink-600 text-white" : "bg-white dark:bg-[#1a0a10] text-gray-600 dark:text-gray-300 hover:bg-pink-100 dark:hover:bg-[#300d1b]"}`}
            onClick={() => setActiveTab("profiles")}
          >
            Perfis
          </button>
          <button
            className={`rounded-full px-6 py-2 ${activeTab === "blogs" ? "bg-pink-600 text-white" : "bg-white dark:bg-[#1a0a10] text-gray-600 dark:text-gray-300 hover:bg-pink-100 dark:hover:bg-[#300d1b]"}`}
            onClick={() => setActiveTab("blogs")}
          >
            Blog Posts
          </button>
          <button
            className={`rounded-full px-6 py-2 ${activeTab === "logs" ? "bg-pink-600 text-white" : "bg-white dark:bg-[#1a0a10] text-gray-600 dark:text-gray-300 hover:bg-pink-100 dark:hover:bg-[#300d1b]"}`}
            onClick={() => setActiveTab("logs")}
          >
            Logs
          </button>
        </div>

        {activeTab === "profiles" ? (
          <ProfileManagement
            profiles={profiles}
            setProfiles={setProfiles}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            logAction={logAction}
          />
        ) : activeTab === "blogs" ? (
          <BlogManagement
            blogPosts={blogPosts}
            setBlogPosts={setBlogPosts}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />
        ) : (
          <Card className="p-6 bg-white dark:bg-[#1a0a10] rounded-3xl shadow-2xl">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Logs de Administração</h2>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Ação</TableHead>
                  <TableHead>Usuário</TableHead>
                  <TableHead>Data/Hora</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {logs.map((log) => (
                  <TableRow key={log.id}>
                    <TableCell>{log.action}</TableCell>
                    <TableCell>{log.userUID}</TableCell>
                    <TableCell>{new Date(log.timestamp).toLocaleString("pt-PT")}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        )}
      </div>
    </div>
  );
}