'use client';

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updatePremiumStatus } from '@/backend/actions/ProfileActions';
import { supabase } from '@/backend/database/supabase';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import { Profile } from '@/backend/types';

interface AdminProfile extends Profile {
  status: boolean | null; // Adiciona status para refletir ativo/inativo
}

const Admin = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const currentUserUID = useSelector((state: { profile: { userUID?: string } }) => state.profile.userUID);
  const loading = useSelector((state: { profile: { loading: boolean } }) => state.profile.loading);
  const error = useSelector((state: { profile: { error?: string | null } }) => state.profile.error);

  const [profiles, setProfiles] = useState<AdminProfile[]>([]);
  const [isAdmin, setIsAdmin] = useState(false);

  // Carregar perfis e verificar se o usuário é admin com base no .env
  useEffect(() => {
    const loadData = async () => {
      if (!currentUserUID) {
        console.log('currentUserUID não disponível');
        toast.error(t('messages.userNotIdentified'));
        return;
      }

      // Obter o e-mail do usuário atual via Supabase Auth
      const { data: userData, error: userError } = await supabase.auth.getUser();
      if (userError || !userData?.user) {
        console.error('Erro ao obter usuário atual:', userError?.message);
        toast.error(t('messages.authError'));
        return;
      }

      const userEmail = userData.user.email;
      console.log('E-mail do usuário atual:', userEmail);

      // Verificar se o e-mail corresponde ao ADMIN_EMAIL do .env
      const adminEmail = process.env.NEXT_PUBLIC_ADMIN_EMAIL; // Ajuste o nome da variável conforme teu .env
      if (!adminEmail) {
        console.error('ADMIN_EMAIL não definido no .env');
        toast.error(t('messages.configError'));
        return;
      }

      if (userEmail !== adminEmail) {
        console.log('Usuário não é admin. E-mail esperado:', adminEmail);
        toast.error(t('messages.notAdmin'));
        setIsAdmin(false);
        return;
      }

      setIsAdmin(true);

      // Carregar todos os perfis
      try {
        const { data, error } = await supabase
          .from('ProfilesData')
          .select('*');

        if (error) throw error;

        const fetchedProfiles = await Promise.all(
          data.map(async (profile) => {
            const { data: photoData } = await supabase
              .from('profilephoto')
              .select('imageurl')
              .eq('userUID', profile.userUID);

            return {
              ...profile,
              photos: photoData ? photoData.map((p) => p.imageurl) : [],
              status: profile.status ?? null, // Se null, considera pendente
            } as AdminProfile;
          })
        );

        console.log('Perfis carregados:', fetchedProfiles);
        setProfiles(fetchedProfiles);
      } catch (err: any) {
        console.error('Erro ao carregar perfis:', err.message);
        toast.error(t('messages.fetchError'));
      }
    };

    loadData();
  }, [currentUserUID, dispatch, t]);

  // Função para atualizar o status do perfil (ativo/inativo)
  const handleToggleStatus = async (userUID: string, currentStatus: boolean | null) => {
    const newStatus = currentStatus === true ? false : true; // Alterna entre ativo e inativo
    try {
      await supabase
        .from('ProfilesData')
        .update({ status: newStatus })
        .eq('userUID', userUID);

      setProfiles((prev) =>
        prev.map((p) => (p.userUID === userUID ? { ...p, status: newStatus } : p))
      );
      toast.success(t('messages.profileStatusUpdated'));
    } catch (error: any) {
      console.error('Erro ao atualizar status:', error.message);
      toast.error(t('messages.updateError'));
    }
  };

  // Função para atualizar o status premium
  const handleTogglePremium = async (userUID: string, currentPremium: boolean) => {
    const newPremium = !currentPremium;
    try {
      await dispatch(updatePremiumStatus({ userUID, premium: newPremium })).unwrap();
      setProfiles((prev) =>
        prev.map((p) => (p.userUID === userUID ? { ...p, premium: newPremium } : p))
      );
      toast.success(t('messages.premiumUpdated'));
    } catch (error: any) {
      console.error('Erro ao atualizar premium:', error.message);
      toast.error(t('messages.updateError'));
    }
  };

  // Função para atualizar o status certificado
  const handleToggleCertified = async (userUID: string, currentCertified: boolean) => {
    const newCertified = !currentCertified;
    try {
      await supabase
        .from('ProfilesData')
        .update({ certificado: newCertified })
        .eq('userUID', userUID);

      setProfiles((prev) =>
        prev.map((p) => (p.userUID === userUID ? { ...p, certificado: newCertified } : p))
      );
      toast.success(t('messages.certifiedUpdated'));
    } catch (error: any) {
      console.error('Erro ao atualizar certificado:', error.message);
      toast.error(t('messages.updateError'));
    }
  };

  // Função para excluir um perfil
  const handleDeleteProfile = async (userUID: string) => {
    if (!confirm(t('messages.confirmDelete'))) return;

    try {
      // Excluir fotos do storage
      const { data: photos } = await supabase
        .from('profilephoto')
        .select('imageurl')
        .eq('userUID', userUID);

      if (photos && photos.length > 0) {
        const filePaths = photos.map((photo) => `${userUID}/${photo.imageurl.split('/').pop()}`);
        await supabase.storage.from('profileFoto').remove(filePaths);
      }

      // Excluir dados associados
      await Promise.all([
        supabase.from('profilephoto').delete().eq('userUID', userUID),
        supabase.from('VPhoto').delete().eq('userUID', userUID),
        supabase.from('stories').delete().eq('userUID', userUID),
        supabase.from('ProfilesData').delete().eq('userUID', userUID),
      ]);

      setProfiles((prev) => prev.filter((p) => p.userUID !== userUID));
      toast.success(t('messages.profileDeleted'));
    } catch (error: any) {
      console.error('Erro ao excluir perfil:', error.message);
      toast.error(t('messages.deleteError'));
    }
  };

  if (loading) {
    return <div className="p-8 text-center">{t('loading')}</div>;
  }

  if (error) {
    return <div className="p-8 text-center text-red-500">{t('error')}: {error}</div>;
  }

  if (!isAdmin) {
    return <div className="p-8 text-center text-red-500">{t('messages.notAdmin')}</div>;
  }

  return (
    <div className="p-8 bg-white dark:bg-[#100007] dark:border-gray-800 dark:border-opacity-50 dark:border rounded-3xl">
      <h1 className="text-3xl font-bold mb-6">{t('admin.title')}</h1>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-100 dark:bg-gray-800">
              <th className="p-4 font-semibold">{t('admin.name')}</th>
              <th className="p-4 font-semibold">{t('admin.email')}</th>
              <th className="p-4 font-semibold">{t('admin.status')}</th>
              <th className="p-4 font-semibold">{t('admin.premium')}</th>
              <th className="p-4 font-semibold">{t('admin.certified')}</th>
              <th className="p-4 font-semibold">{t('admin.actions')}</th>
            </tr>
          </thead>
          <tbody>
            {profiles.map((profile) => (
              <tr key={profile.userUID} className="border-b dark:border-gray-700">
                <td className="p-4">{profile.nome}</td>
                <td className="p-4">{profile.email}</td>
                <td className="p-4">
                  <div className="flex items-center space-x-2">
                    <Switch
                      id={`status-${profile.userUID}`}
                      checked={profile.status === true}
                      onCheckedChange={() => handleToggleStatus(profile.userUID!, profile.status)}
                    />
                    <Label htmlFor={`status-${profile.userUID}`}>
                      {profile.status === true
                        ? t('admin.active')
                        : profile.status === false
                        ? t('admin.inactive')
                        : t('admin.pending')}
                    </Label>
                  </div>
                </td>
                <td className="p-4">
                  <div className="flex items-center space-x-2">
                    <Switch
                      id={`premium-${profile.userUID}`}
                      checked={profile.premium}
                      onCheckedChange={() => handleTogglePremium(profile.userUID!, profile.premium)}
                    />
                    <Label htmlFor={`premium-${profile.userUID}`}>
                      {profile.premium ? t('admin.yes') : t('admin.no')}
                    </Label>
                  </div>
                </td>
                <td className="p-4">
                  <div className="flex items-center space-x-2">
                    <Switch
                      id={`certified-${profile.userUID}`}
                      checked={profile.certificado}
                      onCheckedChange={() => handleToggleCertified(profile.userUID!, profile.certificado)}
                    />
                    <Label htmlFor={`certified-${profile.userUID}`}>
                      {profile.certificado ? t('admin.yes') : t('admin.no')}
                    </Label>
                  </div>
                </td>
                <td className="p-4">
                  <Button
                    variant="destructive"
                    className="rounded-full"
                    onClick={() => handleDeleteProfile(profile.userUID!)}
                  >
                    {t('admin.delete')}
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Admin;