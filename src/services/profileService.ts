import supabase from "../database/supabase";
import { updateStories } from "@/actions/ProfileActions";
import { Dispatch } from "redux";





// FETCH PROFILE START
export async function fetchProfiles() {
  try {
    // Buscar perfis com status ativo
    const { data: profilesData, error: profilesError } = await supabase
      .from("ProfilesData")
      .select("*")
      .eq("status", true);

    if (profilesError) {
      throw profilesError;
    }

    // Buscar comentários de todos os perfis
    const { data: commentsData, error: commentsError } = await supabase
      .from("comments")
      .select("*");

    if (commentsError) {
      throw commentsError;
    }

    // Buscar fotos de perfis
    const { data: photosData, error: photosError } = await supabase
      .from("profilephoto")
      .select("*");

    if (photosError) {
      throw photosError;
    }

    // Buscar stories de perfis
    const { data: storiesData, error: storiesError } = await supabase
      .from("stories")
      .select("*");

    if (storiesError) {
      throw storiesError;
    }

    // Buscar fotos de verificação
    const { data: VphotosData, error: VphotosError } = await supabase
      .from("VPhoto")
      .select("*");

    if (VphotosError) {
      throw VphotosError;
    }

    // Combinar dados dos perfis
    const combinedProfiles = profilesData.map((profile) => {
      const photos = photosData.filter((photo) => photo.userUID === profile.userUID);
      const stories = storiesData.filter((story) => story.userUID === profile.userUID);
      const Vphotos = VphotosData.filter((Vphoto) => Vphoto.userUID === profile.userUID);
      const comments = commentsData.filter((comment) => comment.userUID === profile.userUID);

      return {
        ...profile,
        photos: photos.map((photo) => photo.imageurl), // URLs das fotos
        Vphotos: Vphotos.map((Vphoto) => Vphoto.imageurl), // URLs das fotos de verificação
        stories: stories.map((story) => story.storyurl), // URLs dos stories
        comments: comments, // Associar comentários ao perfil
      };
    });

    console.log("Perfis combinados:", combinedProfiles);
    return combinedProfiles; // Retorna perfis combinados
  } catch (error) {
    console.error("Erro ao buscar perfis:", error.message);
    throw error;
  }
}
// END FETCH PROFILE

// FETCH PHOTOS PROFILE START
export async function fetchProfilePhotos() {
  try {
    const { data: photosData, error: photosError } = await supabase
      .from("profilephoto")
      .select("*");

    if (photosError) {
      throw photosError;
    }

    return photosData;
  } catch (error) {
    console.error("Error fetching profile photos:", error.message);
    throw error;
  }
}
// END FETCH PHOTOS PROFILE

// FETCH PROFILE BY USER UID START
export async function fetchProfileFromDatabase(userUID: string) {
  try {
    // Recupera os dados do perfil do usuário
    const { data: profileData, error: profileError } = await supabase
      .from("ProfilesData")
      .select("*")
      .eq("userUID", userUID)
      .single();

    if (profileError) {
      throw new Error("Erro ao buscar dados do perfil");
    }

    // Recupera os URLs das fotos do perfil do usuário
    const { data: photoData, error: photoError } = await supabase
      .from("profilephoto")
      .select("imageurl")
      .eq("userUID", userUID);

    if (photoError) {
      throw new Error("Erro ao buscar URLs das fotos do perfil");
    }

    // Recupera os URLs das stories do perfil do usuário
    const { data: storyData, error: storyError } = await supabase
      .from("stories")
      .select("storyurl")
      .eq("userUID", userUID);

    if (storyError) {
      throw new Error("Erro ao buscar URLs das stories do perfil");
    }

    // Recupera os URLs das fotos de verificação do perfil do usuário
    const { data: VPhotoData, error: VPhotoError } = await supabase
      .from("VPhoto")
      .select("imageurl")
      .eq("userUID", userUID);

    if (VPhotoError) {
      throw new Error("Erro ao buscar URLs das fotos de verificação do perfil");
    }

    // Recupera os comentários associados ao perfil do usuário
    const { data: commentsData, error: commentsError } = await supabase
      .from("comments")
      .select("*")
      .eq("userUID", userUID);

    if (commentsError) {
      throw new Error("Erro ao buscar comentários do perfil");
    }

    // Combina os dados do perfil do usuário com os URLs das fotos, stories, fotos de verificação e comentários
    const profileWithPhotos = {
      ...profileData,
      photos: photoData.map((photo) => photo.imageurl),
      stories: storyData.map((story) => story.storyurl),
      vphotos: VPhotoData.map((vphoto) => vphoto.imageurl),
      comments: commentsData.map((comment) => ({
        id: comment.id,
        authorName: comment.authorName,
        comment: comment.comment,
        rating: comment.rating,
        created_at: comment.created_at,
      })),
    };

    console.log("Dados do perfil recuperados:", profileWithPhotos);
    return profileWithPhotos;
  } catch (error) {
    console.error("Erro ao buscar dados do perfil:", error.message);
    throw error;
  }
}

// UPDATE DATA PERFIL START

export async function updateProfileData(dataToUpdate, userUID) {
  try {
    console.log("Data to update:", dataToUpdate);
    console.log("User UID:", userUID);

    const { data, error } = await supabase
      .from("ProfilesData")
      .update(dataToUpdate)
      .eq("userUID", userUID);
      
    console.log("Response from Supabase:", data, error);

    if (error) {
      console.error("Erro ao atualizar o perfil:", Error);
    } else {
      console.log("Perfil atualizado com sucesso:", data);
      // Aqui você pode adicionar qualquer ação que deseja executar após a atualização do perfil
    }
  } catch (error) {
    console.error("Erro ao atualizar o perfil:", Error);
  }
}
// END UPDATE DATA PERFIL

// UPDATE PROFILE TAG START
export async function updateProfileTag(userUID, newTagValue) {
  try {
    const { data, error } = await supabase
      .from("ProfilesData")
      .update({
        tag: newTagValue, // Sua nova "tag"
        tagTimestamp: new Date().toISOString(), // Atualiza o timestamp para agora
      })
      .eq("userUID", userUID);

    if (error) {
      console.error("Erro ao atualizar a tag do perfil:", Error);
    } else {
      console.log("Tag do perfil atualizada com sucesso:", data);
    }
  } catch (error) {
    console.error("Erro ao atualizar a tag do perfil:", Error);
  }
}
// END UPDATE PROFILE TAG



// Função para buscar stories do Supabase
export const fetchStories = async (userUID: string, dispatch: Dispatch) => {
  try {
    const { data: storyData, error: storyError } = await supabase
      .from("stories")
      .select("*")
      .eq("userUID", userUID);

    if (storyError) throw new Error;

    // Atualiza o estado no Redux
    if (storyData) {
      dispatch(updateStories(storyData.map((story) => story.storyurl)));
    }
  } catch (error: any) {
    console.error("Erro ao buscar stories:", Error);
    throw error;
  }
};

// Função para fazer upload das stories
export const uploadStories = async (files: File[], userUID: string) => {
  const uploadedStoryURLs: string[] = [];

  const uploadPromises = files.map(async (file) => {
    const filePath = `${userUID}/${file.name.toLowerCase().replace(/ /g, "_").replace(/\./g, "_")}`;

    try {
      const { data, error } = await supabase.storage
        .from("storyStorage")
        .upload(filePath, file);

      if (error) throw new Error;

      const publicURLStory = `https://ulcggrutwonkxbiuigdu.supabase.co/storage/v1/object/public/storyStorage/${filePath}`;
      uploadedStoryURLs.push(publicURLStory);
    } catch (error: any) {
      console.error("Erro durante o upload:", Error);
      throw error;
    }
  });

  await Promise.all(uploadPromises);
  return uploadedStoryURLs;
};

// Função para deletar uma story
export const deleteStory = async (storyURL: string, userUID: string) => {
  const fileName = storyURL.split("/").pop();
  if (!fileName) throw new Error("Nome do arquivo não encontrado no URL.");

  const filePath = `${userUID}/${fileName}`;

  try {
    // Remove do storage do Supabase
    const { error: storageError } = await supabase.storage
      .from("storyStorage")
      .remove([filePath]);

    if (storageError) throw new Error(storageError.message);

    // Remove do banco de dados
    const { error: dbError } = await supabase
      .from("stories")
      .delete()
      .match({ storyurl: storyURL, userUID });

    if (dbError) throw new Error(dbError.message);
  } catch (error: any) {
    console.error("Erro ao deletar story:", error.message);
    throw error;
  }
};

// START FECTH LANDING PAGE

export async function fetchProfilesMain() {
  try {
    // Buscar apenas os dados principais do perfil (nome, cidade, foto, verificação)
    const { data: profilesData, error: profilesError } = await supabase
      .from("ProfilesData")
      .select("userUID, nome, cidade, certificado, tag, tagtimestamp, live") // Buscar apenas os dados necessários
      .eq('status', true)
      .limit(10); // Filtro de status

    if (profilesError) {
      throw profilesError;
    }

    // Buscar apenas a foto principal
    const { data: photosData, error: photosError } = await supabase
      .from("profilephoto")
      .select("userUID, imageurl");

    if (photosError) {
      throw photosError;
    }

    // Buscar stories (assumindo que há uma tabela 'stories' com 'userUID' e 'storyUrl')
    const { data: storiesData, error: storiesError } = await supabase
      .from("stories")
      .select("userUID, storyurl");

    if (storiesError) {
      throw storiesError;
    }

    // Combinar os dados
    const combinedProfiles = profilesData.map((profile) => {
      const mainPhoto = photosData.find(photo => photo.userUID === profile.userUID);
      const userStories = storiesData
        .filter(story => story.userUID === profile.userUID)
        .map(story => story.storyurl); // Extrair apenas os URLs dos stories

      return {
        nome: profile.nome,
        cidade: profile.cidade,
        certificado: profile.certificado,
        photos: mainPhoto ? [mainPhoto.imageurl] : [], // Convertendo foto para um array
        stories: userStories || [], // Adicionando os stories
        tag: profile.tag,
        tagtimestamp: profile.tagtimestamp,
        userUID: profile.userUID,
        photo: mainPhoto ? mainPhoto.imageurl : "",
        live: profile.live || false,
      };
    });

    combinedProfiles.sort((a, b) => {
      const timeA = new Date(a.tagtimestamp).getTime();
      const timeB = new Date(b.tagtimestamp).getTime();
      return timeB - timeA; // Ordena do mais recente para o mais antigo
    });

    console.log("Perfis combinados com fotos principais e stories:", combinedProfiles);
    return combinedProfiles;
  } catch (error) {
    console.error("Error fetching profiles:", Error);
    throw error;
  }
}
// END FECTH LANDING PAGE