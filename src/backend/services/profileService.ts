// src/backend/services/profileService.ts
import supabase from '../../backend/database/supabase';
import { Profile, UserProfileData, UpdateTagResponse } from '@/backend/types';
import { Dispatch } from 'redux';
import { updateStories } from '@/backend/reducers/profileSlice';

// FETCH PROFILES
export async function fetchProfiles(): Promise<Profile[]> {
  try {
    const { data: profilesData, error: profilesError } = await supabase
      .from('ProfilesData')
      .select('*')
      .eq('status', true);

    if (profilesError) throw profilesError;

    const { data: photosData, error: photosError } = await supabase
      .from('profilephoto')
      .select('*');

    if (photosError) throw photosError;

    const { data: storiesData, error: storiesError } = await supabase
      .from('stories')
      .select('*');

    if (storiesError) throw storiesError;

    const { data: vPhotosData, error: vPhotosError } = await supabase
      .from('VPhoto')
      .select('*');

    if (vPhotosError) throw vPhotosError;

    const { data: commentsData, error: commentsError } = await supabase
      .from('comments')
      .select('*');

    if (commentsError) throw commentsError;

    const combinedProfiles = profilesData.map((profile) => {
      const photos = photosData.filter((photo) => photo.userUID === profile.userUID);
      const stories = storiesData.filter((story) => story.userUID === profile.userUID);
      const vphotos = vPhotosData.filter((vphoto) => vphoto.userUID === profile.userUID);
      const comments = commentsData.filter((comment) => comment.profileuid === profile.userUID);

      return {
        ...profile,
        photos: photos.map((photo) => photo.imageurl) || [],
        vphotos: vphotos.map((vphoto) => vphoto.imageurl) || [],
        stories: stories.map((story) => story.storyurl) || [],
        photoURL: photos.map((photo) => photo.imageurl) || [],
        vphotoURL: vphotos.map((vphoto) => vphoto.imageurl) || [],
        storyURL: stories.map((story) => story.storyurl) || [],
        comment: comments.map((comment) => comment.comment) || [],
        id: profile.id,
        tarifa: profile.tarifa || 0,
        lingua: profile.lingua || [],
        telefone: profile.telefone || '',
        email: profile.email || '',
        idade: profile.idade || 0,
        altura: profile.altura || '',
        distrito: profile.distrito || '',
        origem: profile.origem || '',
        cidade: profile.cidade || '',
        address: profile.address || '',
        latitude: profile.latitude || 0,
        longitude: profile.longitude || 0,
        peso: profile.peso || '',
        tatuagem: profile.tatuagem || '',
        pelos: profile.pelos || '',
        olhos: profile.olhos || '',
        seios: profile.seios || '',
        mamas: profile.mamas || '',
        signo: profile.signo || '',
        pagamento: profile.pagamento || [],
        inactive: profile.status === false,
        certificado: profile.certificado || false,
        live: profile.live || false,
        premium: profile.premium || false,
      };
    });

    return combinedProfiles;
  } catch (error: any) {
    console.error('Erro ao buscar perfis:', error.message);
    throw error;
  }
}

// FETCH PROFILE PHOTOS
export async function fetchProfilePhotos(): Promise<any[]> {
  try {
    const { data: photosData, error: photosError } = await supabase
      .from('profilephoto')
      .select('*');

    if (photosError) throw photosError;
    return photosData;
  } catch (error: any) {
    console.error('Erro ao buscar fotos de perfil:', error.message);
    throw error;
  }
}

// FETCH PROFILE BY USER UID
export async function fetchProfileFromDatabase(userUID: string): Promise<Profile> {
  try {
    const { data: profileData, error: profileError } = await supabase
      .from('ProfilesData')
      .select('*')
      .eq('userUID', userUID)
      .single();

    if (profileError) throw new Error('Erro ao buscar dados do perfil');

    const { data: photoData, error: photoError } = await supabase
      .from('profilephoto')
      .select('imageurl')
      .eq('userUID', userUID);

    if (photoError) throw new Error('Erro ao buscar URLs das fotos do perfil');

    const { data: storyData, error: storyError } = await supabase
      .from('stories')
      .select('storyurl')
      .eq('userUID', userUID);

    if (storyError) throw new Error('Erro ao buscar URLs das stories do perfil');

    const { data: vPhotoData, error: vPhotoError } = await supabase
      .from('VPhoto')
      .select('imageurl')
      .eq('userUID', userUID);

    if (vPhotoError) throw new Error('Erro ao buscar URLs das fotos de verificação do perfil');

    const { data: commentsData, error: commentsError } = await supabase
      .from('comments')
      .select('*')
      .eq('profileuid', userUID);

    if (commentsError) throw new Error('Erro ao buscar comentários do perfil');

    const profileWithPhotos: Profile = {
      ...profileData,
      photos: photoData.map((photo) => photo.imageurl) || [],
      stories: storyData.map((story) => story.storyurl) || [],
      vphotos: vPhotoData.map((vphoto) => vphoto.imageurl) || [],
      photoURL: photoData.map((photo) => photo.imageurl) || [],
      vphotoURL: vPhotoData.map((vphoto) => vphoto.imageurl) || [],
      storyURL: storyData.map((story) => story.storyurl) || [],
      comment: commentsData.map((comment) => comment.comment) || [],
      id: profileData.id,
      tarifa: profileData.tarifa || 0,
      lingua: profileData.lingua || [],
      telefone: profileData.telefone || '',
      email: profileData.email || '',
      idade: profileData.idade || 0,
      altura: profileData.altura || '',
      distrito: profileData.distrito || '',
      origem: profileData.origem || '',
      cidade: profileData.cidade || '',
      address: profileData.address || '',
      latitude: profileData.latitude || 0,
      longitude: profileData.longitude || 0,
      peso: profileData.peso || '',
      tatuagem: profileData.tatuagem || '',
      pelos: profileData.pelos || '',
      olhos: profileData.olhos || '',
      seios: profileData.seios || '',
      mamas: profileData.mamas || '',
      signo: profileData.signo || '',
      pagamento: profileData.pagamento || [],
      inactive: profileData.status === false,
      certificado: profileData.certificado || false,
      live: profileData.live || false,
      premium: profileData.premium || false,
    };

    return profileWithPhotos;
  } catch (error: any) {
    console.error('Erro ao buscar dados do perfil:', error.message);
    throw error;
  }
}

// UPDATE PROFILE DATA
export async function updateProfileData(dataToUpdate: Partial<UserProfileData>, userUID: string) {
  try {
    const { data, error } = await supabase
      .from('ProfilesData')
      .update(dataToUpdate)
      .eq('userUID', userUID);

    if (error) throw new Error(`Erro ao atualizar o perfil: ${error.message}`);
    console.log('Perfil atualizado com sucesso:', data);
    return data;
  } catch (error: any) {
    console.error('Erro ao atualizar o perfil:', error.message);
    throw error;
  }
}

// UPDATE PROFILE TAG
export async function updateProfileTag(userUID: string, newTagValue: string) {
  try {
    const { data, error } = await supabase
      .from('ProfilesData')
      .update({
        tag: newTagValue,
        tagtimestamp: new Date().toISOString(),
      })
      .eq('userUID', userUID);

    if (error) throw new Error(`Erro ao atualizar a tag do perfil: ${error.message}`);
    console.log('Tag do perfil atualizada com sucesso:', data);
    return data;
  } catch (error: any) {
    console.error('Erro ao atualizar a tag do perfil:', error.message);
    throw error;
  }
}

// FETCH STORIES
export const fetchStories = async (userUID: string, dispatch: Dispatch) => {
  try {
    const { data: storyData, error: storyError } = await supabase
      .from('stories')
      .select('storyurl')
      .eq('userUID', userUID);

    if (storyError) throw new Error(storyError.message);

    if (storyData) {
      dispatch(updateStories(storyData.map((story) => story.storyurl)));
    }
    return storyData;
  } catch (error: any) {
    console.error('Erro ao buscar stories:', error.message);
    throw error;
  }
};

// UPLOAD STORIES
export const uploadStories = async (files: File[], userUID: string) => {
  const uploadedStoryURLs: string[] = [];

  const uploadPromises = files.map(async (file) => {
    const filePath = `${userUID}/${file.name.toLowerCase().replace(/ /g, '_').replace(/\./g, '_')}`;

    try {
      const { error } = await supabase.storage
        .from('storyStorage')
        .upload(filePath, file);

      if (error) throw new Error(error.message);

      const publicURLStory = `https://ulcggrutwonkxbiuigdu.supabase.co/storage/v1/object/public/storyStorage/${filePath}`;
      uploadedStoryURLs.push(publicURLStory);

      await supabase.from('stories').insert({ userUID, storyurl: publicURLStory });
    } catch (error: any) {
      console.error('Erro durante o upload:', error.message);
      throw error;
    }
  });

  await Promise.all(uploadPromises);
  return uploadedStoryURLs;
};

// DELETE STORY
export const deleteStory = async (storyURL: string, userUID: string) => {
  const fileName = storyURL.split('/').pop();
  if (!fileName) throw new Error('Nome do arquivo não encontrado no URL.');

  const filePath = `${userUID}/${fileName}`;

  try {
    const { error: storageError } = await supabase.storage
      .from('storyStorage')
      .remove([filePath]);

    if (storageError) throw new Error(storageError.message);

    const { error: dbError } = await supabase
      .from('stories')
      .delete()
      .match({ storyurl: storyURL, userUID });

    if (dbError) throw new Error(dbError.message);
  } catch (error: any) {
    console.error('Erro ao deletar story:', error.message);
    throw error;
  }
};

// FETCH PROFILES FOR LANDING PAGE
export async function fetchProfilesMain(): Promise<any[]> {
  try {
    const { data: profilesData, error: profilesError } = await supabase
      .from('ProfilesData')
      .select('userUID, nome, cidade, certificado, tag, tagtimestamp, live')
      .eq('status', true)
      .limit(10);

    if (profilesError) throw profilesError;

    const { data: photosData, error: photosError } = await supabase
      .from('profilephoto')
      .select('userUID, imageurl');

    if (photosError) throw photosError;

    const { data: storiesData, error: storiesError } = await supabase
      .from('stories')
      .select('userUID, storyurl');

    if (storiesError) throw storiesError;

    const combinedProfiles = profilesData.map((profile) => {
      const mainPhoto = photosData.find((photo) => photo.userUID === profile.userUID);
      const userStories = storiesData
        .filter((story) => story.userUID === profile.userUID)
        .map((story) => story.storyurl);

      return {
        nome: profile.nome,
        cidade: profile.cidade,
        certificado: profile.certificado,
        photos: mainPhoto ? [mainPhoto.imageurl] : [],
        stories: userStories || [],
        tag: profile.tag,
        tagtimestamp: profile.tagtimestamp,
        userUID: profile.userUID,
        photo: mainPhoto ? mainPhoto.imageurl : '',
        live: profile.live || false,
      };
    });

    combinedProfiles.sort((a, b) => {
      const timeA = new Date(a.tagtimestamp).getTime();
      const timeB = new Date(b.tagtimestamp).getTime();
      return timeB - timeA;
    });

    return combinedProfiles;
  } catch (error: any) {
    console.error('Erro ao buscar perfis para a landing page:', error.message);
    throw error;
  }
}