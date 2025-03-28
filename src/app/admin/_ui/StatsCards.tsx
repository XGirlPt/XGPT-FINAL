import { Card } from "@/components/ui/card";

interface StatsCardsProps {
  profiles: Profile[];
  blogPosts: BlogPost[];
  activeTab: "profiles" | "blogs" | "logs";
}

export default function StatsCards({ profiles, blogPosts, activeTab }: StatsCardsProps) {
  const totalProfiles = profiles.length;
  const activeProfiles = profiles.filter((p) => !p.inactive).length;
  const totalBlogs = blogPosts.length;
  const pendingBlogs = blogPosts.filter((b) => b.status === "pending").length;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      {activeTab === "profiles" ? (
        <>
          <Card className="p-6 bg-white dark:bg-[#1a0a10] rounded-3xl shadow-2xl">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Total de Perfis</h3>
            <p className="text-3xl font-bold text-pink-600">{totalProfiles}</p>
          </Card>
          <Card className="p-6 bg-white dark:bg-[#1a0a10] rounded-3xl shadow-2xl">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Perfis Ativos</h3>
            <p className="text-3xl font-bold text-green-600">{activeProfiles}</p>
          </Card>
          <Card className="p-6 bg-white dark:bg-[#1a0a10] rounded-3xl shadow-2xl">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Posts Pendentes</h3>
            <p className="text-3xl font-bold text-yellow-600">{pendingBlogs}</p>
          </Card>
        </>
      ) : activeTab === "blogs" ? (
        <>
          <Card className="p-6 bg-white dark:bg-[#1a0a10] rounded-3xl shadow-2xl">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Total de Posts</h3>
            <p className="text-3xl font-bold text-pink-600">{totalBlogs}</p>
          </Card>
          <Card className="p-6 bg-white dark:bg-[#1a0a10] rounded-3xl shadow-2xl">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Posts Pendentes</h3>
            <p className="text-3xl font-bold text-yellow-600">{pendingBlogs}</p>
          </Card>
          <Card className="p-6 bg-white dark:bg-[#1a0a10] rounded-3xl shadow-2xl">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Perfis Ativos</h3>
            <p className="text-3xl font-bold text-green-600">{activeProfiles}</p>
          </Card>
        </>
      ) : (
        <>
          <Card className="p-6 bg-white dark:bg-[#1a0a10] rounded-3xl shadow-2xl">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Total de Logs</h3>
            <p className="text-3xl font-bold text-pink-600">{/* Adicione a contagem de logs aqui se disponível */}</p>
          </Card>
          <Card className="p-6 bg-white dark:bg-[#1a0a10] rounded-3xl shadow-2xl">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Perfis Ativos</h3>
            <p className="text-3xl font-bold text-green-600">{activeProfiles}</p>
          </Card>
          <Card className="p-6 bg-white dark:bg-[#1a0a10] rounded-3xl shadow-2xl">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Posts Pendentes</h3>
            <p className="text-3xl font-bold text-yellow-600">{pendingBlogs}</p>
          </Card>
        </>
      )}
    </div>
  );
}