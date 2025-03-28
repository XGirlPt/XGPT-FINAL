import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import BlogCard from "./BlogCard";
import AdminPagination from "./AdminPagination";
import { supabase } from "@/backend/database/supabase";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

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

interface BlogManagementProps {
  blogPosts: BlogPost[];
  setBlogPosts: React.Dispatch<React.SetStateAction<BlogPost[]>>;
  activeTab: "profiles" | "blogs";
  setActiveTab: React.Dispatch<React.SetStateAction<"profiles" | "blogs">>;
}

export default function BlogManagement({ blogPosts, setBlogPosts, activeTab, setActiveTab }: BlogManagementProps) {
  const { t } = useTranslation();
  const [blogFilter, setBlogFilter] = useState({ search: "", status: "pending" });
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [selectedItems, setSelectedItems] = useState<Set<string | number>>(new Set());

  const handleUpdateBlogStatus = async (id: number, status: "approved" | "rejected") => {
    try {
      await supabase.from("blog_posts").update({ status }).eq("id", id);
      setBlogPosts((prev) => prev.map((p) => (p.id === id ? { ...p, status } : p)));
      toast.success(t(`messages.blog${status === "approved" ? "Approved" : "Rejected"}`));
    } catch (error) {
      toast.error(t("messages.updateError"));
    }
  };

  const handleBulkBlogAction = async (status: "approved" | "rejected") => {
    if (!confirm(t(`messages.confirmBulk${status === "approved" ? "Approve" : "Reject"}`))) return;
    try {
      await Promise.all(
        Array.from(selectedItems).map((id) => supabase.from("blog_posts").update({ status }).eq("id", id))
      );
      setBlogPosts((prev) => prev.map((p) => (selectedItems.has(p.id) ? { ...p, status } : p)));
      setSelectedItems(new Set());
      toast.success(t(`messages.bulkBlogs${status === "approved" ? "Approved" : "Rejected"}`));
    } catch (error) {
      toast.error(t("messages.updateError"));
    }
  };

  const filteredBlogs = blogPosts.filter((p) => {
    const matchesSearch =
      p.title.toLowerCase().includes(blogFilter.search.toLowerCase()) ||
      p.author_id.toLowerCase().includes(blogFilter.search.toLowerCase());
    const matchesStatus = blogFilter.status === "all" || p.status === blogFilter.status;
    return matchesSearch && matchesStatus;
  });

  const paginatedBlogs = filteredBlogs.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  const totalPages = Math.ceil(filteredBlogs.length / itemsPerPage);

  return (
    <>
      <div className="flex justify-center mb-8">
        <Button
          className={`rounded-full px-6 py-2 mx-2 ${activeTab === "profiles" ? "bg-pink-600 text-white" : "bg-white dark:bg-[#1a0a10] text-gray-600 dark:text-gray-300 hover:bg-pink-100 dark:hover:bg-[#300d1b]"}`}
          onClick={() => {
            setActiveTab("profiles");
            setCurrentPage(1);
            setSelectedItems(new Set());
          }}
        >
          Perfis
        </Button>
        <Button
          className={`rounded-full px-6 py-2 mx-2 ${activeTab === "blogs" ? "bg-pink-600 text-white" : "bg-white dark:bg-[#1a0a10] text-gray-600 dark:text-gray-300 hover:bg-pink-100 dark:hover:bg-[#300d1b]"}`}
          onClick={() => {
            setActiveTab("blogs");
            setCurrentPage(1);
            setSelectedItems(new Set());
          }}
        >
          Blog Posts
        </Button>
      </div>

      <Card className="p-6 bg-white dark:bg-[#1a0a10] rounded-3xl shadow-2xl mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            placeholder="Pesquisar por título ou autor"
            value={blogFilter.search}
            onChange={(e) => setBlogFilter({ ...blogFilter, search: e.target.value })}
            className="rounded-full"
          />
          <Select value={blogFilter.status} onValueChange={(value) => setBlogFilter({ ...blogFilter, status: value })}>
            <SelectTrigger className="rounded-full">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos</SelectItem>
              <SelectItem value="pending">Pendente</SelectItem>
              <SelectItem value="approved">Aprovado</SelectItem>
              <SelectItem value="rejected">Rejeitado</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </Card>

      <Card className="p-6 bg-white dark:bg-[#1a0a10] rounded-3xl shadow-2xl">
        {selectedItems.size > 0 && (
          <div className="mb-4 flex space-x-4">
            <Button
              className="bg-green-600 hover:bg-green-700 text-white rounded-full"
              onClick={() => handleBulkBlogAction("approved")}
            >
              Aprovar Selecionados ({selectedItems.size})
            </Button>
            <Button
              className="bg-red-600 hover:bg-red-700 text-white rounded-full"
              onClick={() => handleBulkBlogAction("rejected")}
            >
              Rejeitar Selecionados ({selectedItems.size})
            </Button>
          </div>
        )}

        <div className="grid grid-cols-6 gap-4 p-4 bg-pink-50 dark:bg-[#300d1b] rounded-t-2xl font-semibold text-gray-900 dark:text-white">
          <div className="col-span-1">Selecionar</div>
          <div className="col-span-3">Título (Status)</div>
          <div className="col-span-2">Ações</div>
        </div>

        {paginatedBlogs.map((post) => (
          <BlogCard
            key={post.id}
            post={post}
            selectedItems={selectedItems}
            setSelectedItems={setSelectedItems}
            handleUpdateBlogStatus={handleUpdateBlogStatus}
          />
        ))}

        <AdminPagination totalPages={totalPages} currentPage={currentPage} setCurrentPage={setCurrentPage} />
      </Card>
    </>
  );
}