import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import ProfileCard from "./ProfileCard";
import AdminPagination from "./AdminPagination";
import { supabase } from "@/backend/database/supabase";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

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

interface ProfileManagementProps {
  profiles: Profile[];
  setProfiles: React.Dispatch<React.SetStateAction<Profile[]>>;
  activeTab: "profiles" | "blogs" | "logs";
  setActiveTab: React.Dispatch<React.SetStateAction<"profiles" | "blogs" | "logs">>;
  logAction?: (action: string, userUID: string) => void;
}

export default function ProfileManagement({ profiles, setProfiles, logAction }: ProfileManagementProps) {
  const { t } = useTranslation();
  const [profileFilter, setProfileFilter] = useState({ search: "", status: "all", premium: "all", certificado: "all" });
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [selectedItems, setSelectedItems] = useState<Set<string | number>>(new Set());

  const handleToggleField = async (userUID: string, field: keyof Profile, currentValue: boolean) => {
    const newValue = !currentValue;
    try {
      await supabase.from("ProfilesData").update({ [field]: newValue }).eq("userUID", userUID);
      setProfiles((prev) => prev.map((p) => (p.userUID === userUID ? { ...p, [field]: newValue } : p)));
      toast.success(t(`messages.${field}Updated`));
      if (logAction) logAction(`${field} alterado para ${newValue ? "Sim" : "Não"}`, userUID);
    } catch (error) {
      toast.error(t("messages.updateError"));
    }
  };

  const handleDeleteProfile = async (userUID: string) => {
    try {
      await Promise.all([
        supabase.from("profilephoto").delete().eq("userUID", userUID),
        supabase.from("VPhoto").delete().eq("userUID", userUID),
        supabase.from("stories").delete().eq("userUID", userUID),
        supabase.from("ProfilesData").delete().eq("userUID", userUID),
      ]);
      setProfiles((prev) => prev.filter((p) => p.userUID !== userUID));
      toast.success(t("messages.profileDeleted"));
      if (logAction) logAction("Perfil excluído", userUID);
    } catch (error) {
      toast.error(t("messages.deleteError"));
    }
  };

  const handleBulkDeleteProfiles = async () => {
    if (!confirm(t("messages.confirmBulkDelete"))) return;
    try {
      await Promise.all(
        Array.from(selectedItems).map((userUID) =>
          Promise.all([
            supabase.from("profilephoto").delete().eq("userUID", userUID),
            supabase.from("VPhoto").delete().eq("userUID", userUID),
            supabase.from("stories").delete().eq("userUID", userUID),
            supabase.from("ProfilesData").delete().eq("userUID", userUID),
          ])
        )
      );
      setProfiles((prev) => prev.filter((p) => !selectedItems.has(p.userUID!)));
      setSelectedItems(new Set());
      toast.success(t("messages.bulkProfilesDeleted"));
      if (logAction) Array.from(selectedItems).forEach((userUID) => logAction("Perfil excluído em massa", userUID as string));
    } catch (error) {
      toast.error(t("messages.deleteError"));
    }
  };

  const handleBulkToggleField = async (field: keyof Profile, value: boolean) => {
    if (!confirm(t(`messages.confirmBulk${field === "inactive" ? (value ? "Deactivate" : "Activate") : value ? "Enable" : "Disable"}`))) return;
    try {
      await supabase
        .from("ProfilesData")
        .update({ [field]: value })
        .in("userUID", Array.from(selectedItems));
      setProfiles((prev) =>
        prev.map((p) => (selectedItems.has(p.userUID!) ? { ...p, [field]: value } : p))
      );
      setSelectedItems(new Set());
      toast.success(t(`messages.bulk${field}Updated`));
      if (logAction) Array.from(selectedItems).forEach((userUID) => logAction(`Bulk ${field} alterado para ${value ? "Sim" : "Não"}`, userUID as string));
    } catch (error) {
      toast.error(t("messages.updateError"));
    }
  };

  const filteredProfiles = profiles.filter((p) => {
    const matchesSearch =
      p.nome.toLowerCase().includes(profileFilter.search.toLowerCase()) ||
      p.email.toLowerCase().includes(profileFilter.search.toLowerCase());
    const matchesStatus =
      profileFilter.status === "all" ||
      (profileFilter.status === "active" && !p.inactive) ||
      (profileFilter.status === "inactive" && p.inactive);
    const matchesPremium =
      profileFilter.premium === "all" ||
      (profileFilter.premium === "yes" && p.premium) ||
      (profileFilter.premium === "no" && !p.premium);
    const matchesCertified =
      profileFilter.certificado === "all" ||
      (profileFilter.certificado === "yes" && p.certificado) ||
      (profileFilter.certificado === "no" && !p.certificado);
    return matchesSearch && matchesStatus && matchesPremium && matchesCertified;
  });

  const paginatedProfiles = filteredProfiles.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  const totalPages = Math.ceil(filteredProfiles.length / itemsPerPage);

  return (
    <>
      <Card className="p-6 bg-white dark:bg-[#1a0a10] rounded-3xl shadow-2xl mb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <Input
            placeholder="Pesquisar por nome ou email"
            value={profileFilter.search}
            onChange={(e) => setProfileFilter({ ...profileFilter, search: e.target.value })}
            className="rounded-full"
          />
          <Select value={profileFilter.status} onValueChange={(value) => setProfileFilter({ ...profileFilter, status: value })}>
            <SelectTrigger className="rounded-full">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos</SelectItem>
              <SelectItem value="active">Ativo</SelectItem>
              <SelectItem value="inactive">Inativo</SelectItem>
            </SelectContent>
          </Select>
          <Select value={profileFilter.premium} onValueChange={(value) => setProfileFilter({ ...profileFilter, premium: value })}>
            <SelectTrigger className="rounded-full">
              <SelectValue placeholder="Premium" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos</SelectItem>
              <SelectItem value="yes">Sim</SelectItem>
              <SelectItem value="no">Não</SelectItem>
            </SelectContent>
          </Select>
          <Select
            value={profileFilter.certificado}
            onValueChange={(value) => setProfileFilter({ ...profileFilter, certificado: value })}
          >
            <SelectTrigger className="rounded-full">
              <SelectValue placeholder="Certificado" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos</SelectItem>
              <SelectItem value="yes">Sim</SelectItem>
              <SelectItem value="no">Não</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </Card>

      <Card className="bg-white dark:bg-[#1a0a10] rounded-3xl shadow-2xl overflow-hidden">
        {selectedItems.size > 0 && (
          <div className="p-6 flex flex-wrap gap-4 border-b border-gray-200 dark:border-gray-700">
            <Button
              variant="destructive"
              className="rounded-full bg-red-600 hover:bg-red-700 text-white"
              onClick={handleBulkDeleteProfiles}
            >
              Excluir Selecionados ({selectedItems.size})
            </Button>
            <Button
              className="rounded-full bg-blue-600 hover:bg-blue-700 text-white"
              onClick={() => handleBulkToggleField("premium", true)}
            >
              Tornar Premium ({selectedItems.size})
            </Button>
            <Button
              className="rounded-full bg-blue-800 hover:bg-blue-900 text-white"
              onClick={() => handleBulkToggleField("premium", false)}
            >
              Remover Premium ({selectedItems.size})
            </Button>
            <Button
              className="rounded-full bg-yellow-600 hover:bg-yellow-700 text-white"
              onClick={() => handleBulkToggleField("certificado", true)}
            >
              Certificar ({selectedItems.size})
            </Button>
            <Button
              className="rounded-full bg-yellow-800 hover:bg-yellow-900 text-white"
              onClick={() => handleBulkToggleField("certificado", false)}
            >
              Remover Certificação ({selectedItems.size})
            </Button>
            <Button
              className="rounded-full bg-green-600 hover:bg-green-700 text-white"
              onClick={() => handleBulkToggleField("inactive", false)}
            >
              Ativar ({selectedItems.size})
            </Button>
            <Button
              className="rounded-full bg-green-800 hover:bg-green-900 text-white"
              onClick={() => handleBulkToggleField("inactive", true)}
            >
              Desativar ({selectedItems.size})
            </Button>
          </div>
        )}

        <div className="grid grid-cols-12 gap-4 p-4 bg-pink-50 dark:bg-[#300d1b] font-semibold text-gray-900 dark:text-white sticky top-0 z-10">
          <div className="col-span-1 text-center">Selecionar</div>
          <div className="col-span-3">Nome (Email)</div>
          <div className="col-span-2 text-center">Status</div>
          <div className="col-span-2 text-center">Premium</div>
          <div className="col-span-2 text-center">Certificado</div>
          <div className="col-span-2 text-center">Ações</div>
        </div>

        <div className="divide-y divide-gray-200 dark:divide-gray-700">
          {paginatedProfiles.map((profile) => (
            <ProfileCard
              key={profile.userUID}
              profile={profile}
              selectedItems={selectedItems}
              setSelectedItems={setSelectedItems}
              handleToggleField={handleToggleField}
              handleDeleteProfile={handleDeleteProfile}
            />
          ))}
        </div>

        <div className="p-6">
          <AdminPagination totalPages={totalPages} currentPage={currentPage} setCurrentPage={setCurrentPage} />
        </div>
      </Card>
    </>
  );
}