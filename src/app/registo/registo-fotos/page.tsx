"use client";

import { useState, useEffect, ChangeEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import { updatePhotos, updateVPhotos } from "@/backend/reducers/profileSlice";
import supabase from "@/backend/database/supabase";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { IoTrashBin } from "react-icons/io5";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { useRouter } from "next/navigation";
import { shallowEqual } from "react-redux";
import Image from 'next/image';

// Função para adicionar watermark centralizada, maior e mais transparente
const addWatermark = async (file: File): Promise<File> => {
  console.log("[DEBUG] Iniciando addWatermark para arquivo:", file.name);
  const logoUrl = "/logo.png"; // Caminho do logo no public ou storage
  return new Promise((resolve) => {
    const img = new Image();
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    img.onload = () => {
      console.log("[DEBUG] Logo carregado com dimensões:", img.width, "x", img.height);
      const reader = new FileReader();
      reader.onload = (e) => {
        const baseImage = new Image();
        baseImage.onload = () => {
          console.log("[DEBUG] Imagem base carregada com dimensões:", baseImage.width, "x", baseImage.height);
          canvas.width = baseImage.width;
          canvas.height = baseImage.height;

          ctx!.drawImage(baseImage, 0, 0);

          const logoWidth = baseImage.width * 0.5;
          const logoHeight = (logoWidth / img.width) * img.height;
          const x = (baseImage.width - logoWidth) / 2;
          const y = (baseImage.height - logoHeight) / 2;

          ctx!.globalAlpha = 0.5;
          console.log("[DEBUG] Desenhando watermark em x:", x, "y:", y, "com largura:", logoWidth, "e altura:", logoHeight);
          ctx!.drawImage(img, x, y, logoWidth, logoHeight);
          ctx!.globalAlpha = 1.0;

          canvas.toBlob((blob) => {
            if (blob) {
              const watermarkedFile = new File([blob], file.name.replace(/\.[^/.]+$/, "") + ".webp", {
                type: "image/webp",
              });
              console.log("[DEBUG] Watermark adicionada, arquivo gerado:", watermarkedFile.name);
              resolve(watermarkedFile);
            } else {
              console.error("[DEBUG] Falha ao gerar blob da imagem com watermark");
            }
          }, "image/webp");
        };
        baseImage.src = e.target!.result as string;
      };
      reader.readAsDataURL(file);
    };
    img.src = logoUrl;
  });
};

export function RegistoFotos() {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const router = useRouter();

  const { userUID: reduxUserUID, photosFromRedux, vphotosFromRedux, isPremium } = useSelector(
    (state: any) => ({
      userUID: state.profile?.profile?.userUID,
      photosFromRedux: state.profile?.profile?.photos || [],
      vphotosFromRedux: state.profile?.profile?.vphotos || [],
      isPremium: state.profile?.profile?.premium || false,
    }),
    shallowEqual
  );

  const [selectedPhotos, setSelectedPhotos] = useState<string[]>([]);
  const [vSelectedPhotos, setVSelectedPhotos] = useState<string[]>([]);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [showPlanChoiceModal, setShowPlanChoiceModal] = useState(false);
  const [userUID, setUserUID] = useState<string | null>(null);

  const maxProfilePhotos = isPremium ? 10 : 3;
  const maxVerificationPhotos = 1;

  // Carregar userUID e fotos existentes na inicialização
  useEffect(() => {
    const fetchUserAndPhotos = async () => {
      console.log("[DEBUG] Carregando userUID e fotos existentes");
      const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
      if (sessionError || !sessionData.session) {
        console.error("[DEBUG] Erro ao obter sessão:", sessionError?.message);
        toast.error("Usuário não autenticado. Por favor, faça login novamente.");
        return;
      }
      const uid = sessionData.session.user.id;
      setUserUID(uid);
      console.log("[DEBUG] userUID obtido da sessão:", uid);

      // Carregar fotos de perfil existentes
      const { data: profilePhotos, error: profileError } = await supabase
        .from("profilephoto")
        .select("imageurl")
        .eq("userUID", uid);
      if (profileError) {
        console.error("[DEBUG] Erro ao carregar fotos de perfil:", profileError.message);
      } else {
        const photoURLs = profilePhotos?.map((photo) => photo.imageurl) || [];
        console.log("[DEBUG] Fotos de perfil carregadas:", photoURLs);
        setSelectedPhotos(photoURLs);
        dispatch(updatePhotos(photoURLs));
      }

      // Carregar fotos de verificação existentes
      const { data: vPhotos, error: vError } = await supabase
        .from("VPhoto")
        .select("photo_url")
        .eq("userUID", uid);
      if (vError) {
        console.error("[DEBUG] Erro ao carregar fotos de verificação:", vError.message);
      } else {
        const vPhotoURLs = vPhotos?.map((photo) => photo.photo_url) || [];
        console.log("[DEBUG] Fotos de verificação carregadas:", vPhotoURLs);
        setVSelectedPhotos(vPhotoURLs);
        dispatch(updateVPhotos(vPhotoURLs));
      }
    };

    fetchUserAndPhotos();
  }, [dispatch]);

  const handleFileUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    console.log("[DEBUG] handleFileUpload iniciado");
    if (!event.target.files || event.target.files.length === 0) {
      console.log("[DEBUG] Nenhum arquivo selecionado");
      return;
    }

    if (!userUID) {
      console.error("[DEBUG] userUID não definido, abortando upload");
      toast.error("Usuário não autenticado. Por favor, faça login novamente.");
      return;
    }

    const files = Array.from(event.target.files);
    console.log("[DEBUG] Arquivos selecionados:", files.map(f => f.name));
    const remainingSlots = maxProfilePhotos - selectedPhotos.length;

    if (remainingSlots <= 0) {
      console.log("[DEBUG] Limite de fotos atingido, abrindo modal de upgrade");
      setShowUpgradeModal(true);
      return;
    }

    const filesToUpload = files.slice(0, remainingSlots);
    const uploadedPhotoURLs: string[] = [];

    for (const file of filesToUpload) {
      console.log("[DEBUG] Processando arquivo:", file.name);
      const watermarkedFile = await addWatermark(file);
      const filePath = `${userUID}/${watermarkedFile.name}`;

      try {
        console.log("[DEBUG] Fazendo upload para profileFoto no caminho:", filePath);
        const { error } = await supabase.storage.from("profileFoto").upload(filePath, watermarkedFile, {
          upsert: true,
        });
        if (error) throw new Error(error.message);

        const publicURLFoto = `https://ulcggrutwonkxbiuigdu.supabase.co/storage/v1/object/public/profileFoto/${filePath}`;
        uploadedPhotoURLs.push(publicURLFoto);
        console.log("[DEBUG] Foto de perfil carregada:", publicURLFoto);

        console.log("[DEBUG] Inserindo na tabela profilephoto com imageurl:", publicURLFoto);
        const { error: dbError } = await supabase.from("profilephoto").insert({
          userUID,
          imageurl: publicURLFoto,
        });
        if (dbError) throw new Error(dbError.message);
      } catch (error: any) {
        console.error("[DEBUG] Erro durante o upload:", error.message);
        toast.error(t("messages.uploadError"), { position: "top-right", autoClose: 1000 });
      }
    }

    if (uploadedPhotoURLs.length > 0) {
      const newSelectedPhotos = [...selectedPhotos, ...uploadedPhotoURLs];
      console.log("[DEBUG] Atualizando selectedPhotos para:", newSelectedPhotos);
      setSelectedPhotos(newSelectedPhotos);
      dispatch(updatePhotos(newSelectedPhotos));
      toast.success(t("messages.photoUploaded"), { position: "top-right", autoClose: 1000 });
    }
  };

  const handleVerificationPhotoUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    console.log("[DEBUG] handleVerificationPhotoUpload iniciado");
    if (!event.target.files || event.target.files.length === 0) {
      console.log("[DEBUG] Nenhum arquivo selecionado para verificação");
      return;
    }

    if (!userUID) {
      console.error("[DEBUG] userUID não definido, abortando upload");
      toast.error("Usuário não autenticado. Por favor, faça login novamente.");
      return;
    }

    const file = event.target.files[0];
    console.log("[DEBUG] Arquivo de verificação selecionado:", file.name);
    const watermarkedFile = await addWatermark(file);
    const filePath = `${userUID}/${watermarkedFile.name}`;

    try {
      console.log("[DEBUG] Fazendo upload para verificationFoto no caminho:", filePath);
      const { error } = await supabase.storage.from("verificationFoto").upload(filePath, watermarkedFile, {
        upsert: true,
      });
      if (error) throw new Error(error.message);

      const publicURLFotoV = `https://ulcggrutwonkxbiuigdu.supabase.co/storage/v1/object/public/verificationFoto/${filePath}`;
      console.log("[DEBUG] Foto de verificação carregada:", publicURLFotoV);
      setVSelectedPhotos([publicURLFotoV]);
      dispatch(updateVPhotos([publicURLFotoV]));
      toast.success(t("messages.photoUploaded"), { position: "top-right", autoClose: 1000 });

      console.log("[DEBUG] Inserindo na tabela VPhoto com photo_url:", publicURLFotoV);
      const { error: dbError } = await supabase.from("VPhoto").insert({
        userUID,
        photo_url: publicURLFotoV,
      });
      if (dbError) throw new Error(dbError.message);
    } catch (error: any) {
      console.error("[DEBUG] Erro durante o upload de verificação:", error.message);
      toast.error(t("messages.uploadError"), { position: "top-right", autoClose: 1000 });
    }
  };

  const handleDeletePhoto = async (index: number) => {
    console.log("[DEBUG] handleDeletePhoto iniciado para índice:", index);
    if (!userUID) {
      console.error("[DEBUG] userUID não definido, abortando exclusão");
      toast.error("Usuário não autenticado. Por favor, faça login novamente.");
      return;
    }

    try {
      const updatedPhotos = [...selectedPhotos];
      const photoURLToDelete = updatedPhotos[index];
      const fileName = photoURLToDelete.split("/").pop();
      const filePath = `${userUID}/${fileName}`;

      console.log("[DEBUG] Removendo foto do storage profileFoto no caminho:", filePath);
      const { error: storageError } = await supabase.storage.from("profileFoto").remove([filePath]);
      if (storageError) throw new Error(storageError.message);

      console.log("[DEBUG] Deletando da tabela profilephoto com imageurl:", photoURLToDelete);
      const { error: dbError } = await supabase
        .from("profilephoto")
        .delete()
        .eq("userUID", userUID)
        .eq("imageurl", photoURLToDelete);
      if (dbError) throw new Error(dbError.message);

      updatedPhotos.splice(index, 1);
      console.log("[DEBUG] Atualizando selectedPhotos após exclusão:", updatedPhotos);
      setSelectedPhotos(updatedPhotos);
      dispatch(updatePhotos(updatedPhotos));
      toast.success(t("messages.photoDeleted"), { position: "top-right", autoClose: 1000 });
    } catch (error: any) {
      console.error("[DEBUG] Erro ao excluir foto:", error.message);
      toast.error(t("messages.deleteError"), { position: "top-right", autoClose: 1000 });
    }
  };

  const handleDeleteVerificationPhoto = async (index: number) => {
    console.log("[DEBUG] handleDeleteVerificationPhoto iniciado para índice:", index);
    if (!userUID) {
      console.error("[DEBUG] userUID não definido, abortando exclusão");
      toast.error("Usuário não autenticado. Por favor, faça login novamente.");
      return;
    }

    try {
      const updatedVPhotos = [...vSelectedPhotos];
      const photoURLToDelete = updatedVPhotos[index];
      const fileName = photoURLToDelete.split("/").pop();
      const filePath = `${userUID}/${fileName}`;

      console.log("[DEBUG] Removendo foto do storage verificationFoto no caminho:", filePath);
      const { error: storageError } = await supabase.storage.from("verificationFoto").remove([filePath]);
      if (storageError) throw new Error(storageError.message);

      console.log("[DEBUG] Deletando da tabela VPhoto com photo_url:", photoURLToDelete);
      const { error: dbError } = await supabase
        .from("VPhoto")
        .delete()
        .eq("userUID", userUID)
        .eq("photo_url", photoURLToDelete);
      if (dbError) throw new Error(dbError.message);

      updatedVPhotos.splice(index, 1);
      console.log("[DEBUG] Atualizando vSelectedPhotos após exclusão:", updatedVPhotos);
      setVSelectedPhotos(updatedVPhotos);
      dispatch(updateVPhotos(updatedVPhotos));
      toast.success(t("messages.photoDeleted"), { position: "top-right", autoClose: 1000 });
    } catch (error: any) {
      console.error("[DEBUG] Erro ao excluir foto de verificação:", error.message);
      toast.error(t("messages.deleteError"), { position: "top-right", autoClose: 1000 });
    }
  };

  const renderProfilePhotoCards = () => {
    console.log("[DEBUG] Renderizando profile photo cards com selectedPhotos:", selectedPhotos);
    const photoCards = selectedPhotos.map((photoURL, index) => {
      console.log("[DEBUG] Adicionando card para foto:", photoURL);
      return (
        <div
          key={index}
          className="relative group aspect-square rounded-3xl overflow-hidden shadow-lg transition-transform duration-300 hover:scale-105"
        >
          <IoTrashBin
            size={26}
            className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 cursor-pointer text-white bg-red-600 rounded-full p-1 transition-opacity duration-300"
            onClick={() => handleDeletePhoto(index)}
          />
         <Image
              src={photoURL}
              alt={`Foto de Verificação ${index}`}
              fill
              className="object-cover rounded-3xl border border-gray-600"
              sizes="(max-width: 640px) 100vw, 50vw" // Opcional: ajusta o tamanho da imagem
            />
          
        </div>
      );
    });

    const placeholdersCount = maxProfilePhotos - selectedPhotos.length;
    for (let i = 0; i < placeholdersCount; i++) {
      photoCards.push(
        <label
          key={`placeholder-${i}`}
          htmlFor="upload-photo"
          className="aspect-square border-2 border-dashed dark:hover:border-darkpink border-gray-200 dark:border-gray-800 rounded-3xl flex flex-col items-center justify-center cursor-pointer hover:border-darkpink transition-colors"
        >
          <div className="text-darkpink mb-2">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 19H3C1.89543 19 1 18.1046 1 17V7C1 5.89543 1.89543 5 3 5H7L9 3H15L17 5H21C22.1046 5 23 5.89543 23 7V17C23 18.1046 22.1046 19 21 19Z" />
              <circle cx="12" cy="12" r="3" />
            </svg>
          </div>
          <span className="text-sm text-black dark:text-white font-medium underline">
            {t("photos.uploadPhoto")}
          </span>
        </label>
      );
    }

    if (!isPremium) {
      photoCards.push(
        <div
          key="locked"
          className="aspect-square bg-[#fff4de] dark:bg-[#27191f] rounded-3xl flex flex-col items-center justify-center cursor-pointer"
          onClick={() => setShowPlanChoiceModal(true)}
        >
          <div className="text-yellow-500 mb-2">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="#fdb315">
              <path d="M12 17C10.89 17 10 16.1 10 15C10 13.89 10.89 13 12 13C13.11 13 14 13.89 14 15C14 16.1 13.11 17 12 17M18 8H17V6C17 3.24 14.76 1 12 1C9.24 1 7 3.24 7 6V8H6C4.89 8 4 8.89 4 10V20C4 21.11 4.89 22 6 22H18C19.11 22 20 21.11 20 20V10C20 8.89 19.11 8 18 8M8.9 6C8.9 4.29 10.29 2.9 12 2.9C13.71 2.9 15.1 4.29 15.1 6V8H8.9V6Z" />
            </svg>
          </div>
          <h3>{t("photos.locked")}</h3>
          <span className="text-sm text-gray-500 text-center px-4">{t("photos.lockedMessage")}</span>
          <button className="mt-2 bg-[#fdb315] text-white dark:text-black px-4 py-1 rounded-full text-sm hover:bg-yellow-600">
            {t("photos.buyNow")}
          </button>
        </div>
      );
    }

    return photoCards;
  };

  const renderVerificationPhotoCard = () => {
    console.log("[DEBUG] Renderizando verification photo card com vSelectedPhotos:", vSelectedPhotos);
    return vSelectedPhotos.length > 0 ? (
      vSelectedPhotos.map((photoURL, index) => {
        console.log("[DEBUG] Adicionando card para foto de verificação:", photoURL);
        return (
          <div
            key={index}
            className="relative group sm:aspect-auto aspect-square rounded-3xl overflow-hidden shadow-lg transition-transform duration-300 hover:scale-105"
          >
            <IoTrashBin
              size={26}
              className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 cursor-pointer text-white bg-red-600 rounded-full p-1 transition-opacity duration-300"
              onClick={() => handleDeleteVerificationPhoto(index)}
            />
            <Image
              src={photoURL}
              alt={`Foto de Verificação ${index}`}
              fill
              className="object-cover rounded-3xl border border-gray-600"
              sizes="(max-width: 640px) 100vw, 50vw" // Opcional: ajusta o tamanho da imagem
            />
          </div>
        );
      })
    ) : (
      <label
        htmlFor="upload-verification-photo"
        className="sm:aspect-auto aspect-square border-2 border-dashed dark:hover:border-darkpink dark:border-gray-800 border-gray-200 rounded-3xl flex flex-col items-center justify-center cursor-pointer hover:border-darkpink transition-colors"
      >
        <div className="text-darkpink mb-2">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 19H3C1.89543 19 1 18.1046 1 17V7C1 5.89543 1.89543 5 3 5H7L9 3H15L17 5H21C22.1046 5 23 5.89543 23 7V17C23 18.1046 22.1046 19 21 19Z" />
            <circle cx="12" cy="12" r="3" />
          </svg>
        </div>
        <span className="text-sm text-black dark:text-white font-medium underline">
          {t("photos.uploadPhoto")}
        </span>
        <span className="text-xs text-gray-400 text-center mt-1 px-4">{t("photos.verifyMessage")}</span>
      </label>
    );
  };

  const handleContinue = async () => {
    console.log("[DEBUG] handleContinue iniciado com selectedPhotos:", selectedPhotos);
    if (selectedPhotos.length === 0) {
      console.log("[DEBUG] Nenhuma foto de perfil adicionada");
      toast.error("Por favor, adicione pelo menos uma foto de perfil.", {
        position: "top-right",
        autoClose: 2000,
      });
      return;
    }

    if (!userUID) {
      console.error("[DEBUG] userUID não definido, abortando continuação");
      toast.error("Usuário não autenticado. Por favor, faça login novamente.");
      return;
    }

    try {
      console.log("[DEBUG] Obtendo sessão do Supabase");
      const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
      if (sessionError || !sessionData.session) {
        console.error("[DEBUG] Usuário não autenticado:", sessionError?.message);
        toast.error("Usuário não autenticado. Por favor, faça login novamente.");
        return;
      }
      console.log("[DEBUG] userUID obtido da sessão:", userUID);

      const profileData = {
        userUID,
        photos: selectedPhotos,
        vphotos: vSelectedPhotos,
        premium: isPremium,
        status: false,
        approval_status: "pending",
      };
      console.log("[DEBUG] Dados do perfil a serem salvos:", profileData);

      console.log("[DEBUG] Verificando perfil existente no Supabase");
      const { data: existingProfile, error: fetchError } = await supabase
        .from("ProfilesData")
        .select("*")
        .eq("userUID", userUID)
        .single();

      if (fetchError && fetchError.code !== "PGRST116") {
        console.error("[DEBUG] Erro ao verificar perfil existente:", fetchError.message);
        throw new Error(`Erro ao verificar perfil existente: ${fetchError.message}`);
      }
      console.log("[DEBUG] Perfil existente encontrado:", existingProfile);

      if (existingProfile) {
        console.log("[DEBUG] Atualizando perfil existente");
        const { error: updateError } = await supabase
          .from("ProfilesData")
          .update(profileData)
          .eq("userUID", userUID);
        if (updateError) {
          console.error("[DEBUG] Erro ao atualizar perfil:", updateError.message);
          throw new Error(`Erro ao atualizar perfil: ${updateError.message}`);
        }
      } else {
        console.log("[DEBUG] Inserindo novo perfil");
        const { error: insertError } = await supabase.from("ProfilesData").insert(profileData);
        if (insertError) {
          console.error("[DEBUG] Erro ao criar perfil:", insertError.message);
          throw new Error(`Erro ao criar perfil: ${insertError.message}`);
        }
      }

      console.log("[DEBUG] Atualizando estado no Redux");
      dispatch(updatePhotos(selectedPhotos));
      dispatch(updateVPhotos(vSelectedPhotos));

      toast.success("Dados salvos com sucesso!", { position: "top-right", autoClose: 1000 });
    } catch (error: any) {
      console.error("[DEBUG] Erro ao processar o registro:", error.message);
      toast.error(`Erro ao salvar os dados: ${error.message}`, { position: "top-right", autoClose: 2000 });
    } finally {
      console.log("[DEBUG] Redirecionando para /registo/registo-pagamento");
      router.push("/registo/registo-pagamento");
    }
  };

  return (
    <div className="w-full bg-white dark:border dark:border-gray-800 dark:border-opacity-50 dark:bg-transparent rounded-3xl p-8">
      <div className="flex flex-col md:flex-row justify-between items-start mb-6">
        <div className="w-full md:w-auto">
          <h1 className="text-2xl font-bold">{t("photos.title")}</h1>
          <Separator className="my-3 md:my-6 h-0.5 bg-gray-200 dark:bg-gray-800 dark:opacity-50 md:hidden" />
        </div>
        <div className="w-full md:w-auto flex justify-between md:justify-end space-x-4 mt-3 md:mt-0">
          <Link href="/registo/registo-contacto">
            <Button className="rounded-full" variant="outline">
              {t("button.back")}
            </Button>
          </Link>
          
          <Button
            className="bg-darkpink hover:bg-darkpinkhover text-white rounded-full"
            onClick={handleContinue}
          >
            {t("button.next")}
          </Button>
        </div>
      </div>
      <Separator className="my-6 h-0.5 bg-gray-200 dark:bg-gray-800 dark:opacity-50 hidden md:block" />

      <div className="space-y-8">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <h2 className="text-lg font-semibold">{t("photos.profilePhotos")}</h2>
            <span className="text-gray-500 text-sm">(Max {maxProfilePhotos})</span>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {renderProfilePhotoCards()}
            <input
              type="file"
              id="upload-photo"
              style={{ display: "none" }}
              onChange={handleFileUpload}
              multiple
              accept="image/*"
            />
          </div>
        </div>

        <div>
          <div className="flex items-center gap-2 mb-4">
            <h2 className="text-lg font-semibold">{t("photos.verifyTitle")}</h2>
            <span className="text-gray-500 text-sm">(Max {maxVerificationPhotos})</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {renderVerificationPhotoCard()}
            <input
              type="file"
              id="upload-verification-photo"
              style={{ display: "none" }}
              onChange={handleVerificationPhotoUpload}
              accept="image/*"
            />
          </div>
        </div>
      </div>

      <Dialog open={showUpgradeModal} onOpenChange={setShowUpgradeModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Atualizar para Premium</DialogTitle>
            <DialogDescription>
              {isPremium
                ? "Você atingiu o limite de 10 fotos no plano premium."
                : "Você atingiu o limite de 3 fotos no plano gratuito. Atualize para o plano premium para adicionar até 10 fotos e desbloquear mais funcionalidades!"}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowUpgradeModal(false)}>
              Fechar
            </Button>
            {!isPremium && (
              <Button onClick={() => router.push("/planos")}>Mudar para Premium</Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={showPlanChoiceModal} onOpenChange={setShowPlanChoiceModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Escolha o Seu Plano</DialogTitle>
            <DialogDescription>Para adicionar mais fotos, escolha um plano premium.</DialogDescription>
          </DialogHeader>
          <div className="flex justify-between">
            <Button variant="outline" onClick={() => setShowPlanChoiceModal(false)}>
              Manter Plano Gratuito
            </Button>
            <Button onClick={() => router.push("/planos")}>Mudar para Premium</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default RegistoFotos;