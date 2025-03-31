// src/backend/services/profileService.ts
import { Profile, UpdateTagResponse, UserProfileData } from '@/backend/types';
import { supabase } from '../../backend/database/supabase';

export class ProfileDataService {

  private async fetchProfilePhotos(profile: Profile): Promise<Profile> {
    const { data: profilePhotoData, error: photoError } = await supabase
      .from('profilephoto')
      .select('imageurl')
      .eq('userUID', profile.userUID);

    if (photoError) {
      console.error('Erro ao buscar fotos do perfil:', photoError.message);
      return { ...profile, photos: [] }; // Retorna vazio em caso de erro
    }

    const photos = profilePhotoData?.map((photo) => photo.imageurl) || [];
    console.log('Fotos buscadas para o perfil:', photos);

    return {
      ...profile,
      photos, // Array com todas as fotos
      photoURL: photos.length > 0 ? photos[0] : null, // Mantém compatibilidade com photoURL
    };
  }

  private async fetchProfileVPhotos(profile: Profile): Promise<Profile> {
    const { data: profileVPhotoData, error: profileVPhotoDataError } = await supabase
      .from('VPhoto')
      .select('imageurl')
      .eq('userUID', profile.userUID);

    if (profileVPhotoDataError) {
      console.error('Erro ao buscar fotos de verificação:', profileVPhotoDataError.message);
      return { ...profile, vphotos: [] };
    }

    const vphotos = profileVPhotoData?.map((vphoto) => vphoto.imageurl) || [];
    console.log('Fotos de verificação buscadas:', vphotos);

    return {
      ...profile,
      vphotos,
      vphotoURL: vphotos.length > 0 ? vphotos[0] : null, // Mantém compatibilidade
    };
  }

  async getPendingProfiles(): Promise<Profile[]> {
    const { data, error } = await supabase
      .from('ProfilesData')
      .select('*')
      .is('status', null);

    if (error) throw error;

    return Promise.all(data.map((profile) => this.fetchProfileData(profile)));
  }

  async fetchProfileData(profile: Profile): Promise<Profile> {
    const profileWithPhoto = await this.fetchProfilePhotos(profile);
    const profileWithVPhoto = await this.fetchProfileVPhotos(profileWithPhoto);
    return profileWithVPhoto;
  }


  async getApprovedProfiles(): Promise<Profile[]> {
    const { data, error } = await supabase
      .from('ProfilesData')
      .select('*')
      .eq('status', true);

    if (error) throw error;

    return Promise.all(data.map((profile) => this.fetchProfileData(profile)));
  }

  async getInactiveProfiles(): Promise<Profile[]> {
    const { data, error } = await supabase
      .from('ProfilesData')
      .select('*')
      .eq('status', false);

    if (error) throw error;

    return Promise.all(data.map((profile) => this.fetchProfileData(profile)));
  }

  async getCertificatedProfiles(): Promise<Profile[]> {
    const { data, error } = await supabase
      .from('ProfilesData')
      .select('*')
      .eq('certificado', true);

    if (error) throw error;

    return Promise.all(data.map((profile) => this.fetchProfileData(profile)));
  }

  async getNonCertificatedProfiles(): Promise<Profile[]> {
    const { data, error } = await supabase
      .from('ProfilesData')
      .select('*')
      .eq('certificado', false);

    if (error) throw error;

    return Promise.all(data.map((profile) => this.fetchProfileData(profile)));
  }

  async approveProfile(id: number): Promise<void> {
    const { error } = await supabase
      .from('ProfilesData')
      .update({ status: true })
      .eq('id', id);

    if (error) throw error;
  }

  async rejectProfile(id: number): Promise<void> {
    const { error } = await supabase
      .from('ProfilesData')
      .update({ status: false })
      .eq('id', id);

    if (error) throw error;
  }

  async rejectCertificate(id: number): Promise<void> {
    const { error } = await supabase
      .from('ProfilesData')
      .update({ certificado: false })
      .eq('id', id);

    if (error) throw error;
  }

  async acceptCertificate(id: number): Promise<void> {
    const { error } = await supabase
      .from('ProfilesData')
      .update({ certificado: true })
      .eq('id', id);

    if (error) throw error;
  }
  async deleteVerificationPhotos(userUID: string): Promise<void> {
    const { error } = await supabase.from('VPhoto').delete().match({ userUID });
    if (error) {
      throw new Error(`Error deleting verification photos: ${error.message}`);
    }
  }

  async deleteStories(userUID: string): Promise<void> {
    const { error } = await supabase
      .from('stories')
      .delete()
      .match({ userUID });
    if (error) {
      throw new Error(`Error deleting stories: ${error.message}`);
    }
  }

  async deleteProfile(userUID: string): Promise<void> {
    const { error } = await supabase
      .from('ProfilesData')
      .delete()
      .match({ userUID });
    if (error) {
      throw new Error(`Error deleting profile: ${error.message}`);
    }
  }

  async deleteAccount(userUID: string): Promise<void> {
    await this.deleteStories(userUID);
    await this.deleteVerificationPhotos(userUID);
    await this.deleteProfile(userUID);

    const response = await fetch('/api/delete-account', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId: userUID }),
    });

    const result = await response.json();
    if (!response.ok) {
      throw new Error(result.error);
    }

    const { error } = await supabase.auth.signOut();
    if (error) {
      throw new Error('Error logging out: ' + error.message);
    }
  }

  async updateProfileStatus(userUID: string, status: boolean): Promise<void> {
    const { error } = await supabase
      .from('ProfilesData')
      .update({ status })
      .match({ userUID });

    if (error) {
      throw new Error(`Error updating status: ${error.message}`);
    }
  }

  async fetchProfileStatus(userUID: string): Promise<boolean> {
    const { data, error } = await supabase
      .from('ProfilesData')
      .select('status')
      .eq('userUID', userUID)
      .single();

    if (error) {
      throw new Error(`Error fetching status: ${error.message}`);
    }

    return data.status;
  }






  

  static async createProfile(userData: UserProfileData): Promise<null> {
    const { data: profileData, error: profileError } = await supabase
      .from('ProfilesData')
      .insert([userData]);

    if (profileError) {
      throw new Error(
        `Erro ao inserir dados na tabela ProfilesData: ${profileError.message}`
      );
    }

    return profileData;
  }

  static async uploadProfilePhotos(
    userUID: string,
    photoURLs: string[]
  ): Promise<null> {
    const photoInsertions = photoURLs.map((photoURL) => ({
      userUID,
      imageurl: photoURL,
    }));

    const { data: photoData, error: photoError } = await supabase
      .from('profilephoto')
      .insert(photoInsertions);

    if (photoError) {
      throw new Error(
        `Erro ao inserir URLs das fotos na tabela profilephoto: ${photoError.message}`
      );
    }

    return photoData;
  }

  static async uploadVerificationPhotos(
    userUID: string,
    photoURLs: string[]
  ): Promise<null> {
    const photoInsertions = photoURLs.map((photoURL) => ({
      userUID,
      imageurl: photoURL,
    }));

    const { data: photoData, error: photoError } = await supabase
      .from('VPhoto')
      .insert(photoInsertions);

    if (photoError) {
      throw new Error(
        `Erro ao inserir URLs das fotos de verificação: ${photoError.message}`
      );
    }

    return photoData;
  }

  async fetchProfiles() {
    try {
      const { data, error } = await supabase
        .from('ProfilesData')
        .select('*')
        .eq('status', true);

      if (error) {
        throw error;
      }
      return data;
    } catch (error: any) {
      console.error('Erro ao buscar perfis:', error?.message);
      throw error;
    }
  }

// src/backend/services/profileDataService.ts (atualizado)
async fetchProfile(profileName: string) {
  try {
    const { data: profileData, error: profileError } = await supabase
      .from('ProfilesData')
      .select('*')
      .eq('nome', decodeURIComponent(profileName))
      .single();

    if (profileError) throw profileError;

    const { data: photoData, error: photoError } = await supabase
      .from('profilephoto')
      .select('imageurl')
      .eq('userUID', profileData.userUID);

    if (photoError) throw photoError;

    const { data: storyData, error: storyError } = await supabase
      .from('stories')
      .select('storyurl')
      .eq('userUID', profileData.userUID);

    if (storyError) throw storyError;

    const combinedProfileData = {
      ...profileData,
      photos: photoData?.map((photo) => photo.imageurl) || [], // Alterado de photoURL para photos
      storyURL: storyData?.map((story) => story.storyurl) || [],
    };

    console.log('Perfil combinado retornado:', combinedProfileData); // Log para depuração

    return {
      profile: combinedProfileData,
      isCertified: profileData.certificado || false,
    };
  } catch (error: any) {
    console.error('Erro ao buscar perfil:', error.message);
    throw error;
  }
}






  async getSession() {
    try {
      const {
        data: { session },
        error,
      } = await supabase.auth.getSession();
      if (error) throw error;
      return { session, error: null };
    } catch (error: any) {
      console.error('Session error:', error);
      return { session: null, error: error.message };
    }
  }

  async updateTag(userUID: string, newTag: string): Promise<UpdateTagResponse> {
    try {
      // First verify session
      const { session, error: sessionError } = await this.getSession();
      if (sessionError || !session) {
        throw new Error('Authentication error. Please login again.');
      }

      // Update tag in Supabase
      const { data, error } = await supabase
        .from('ProfilesData')
        .update({ tag: newTag })
        .eq('userUID', userUID);

      if (error) throw error;

      return {
        success: true,
        data,
      };
    } catch (error: any) {
      console.error('Update tag error:', error);
      return {
        success: false,
        error: error.message || 'An unexpected error occurred',
      };
    }
  }


  
}

export const profileDataService = new ProfileDataService();
