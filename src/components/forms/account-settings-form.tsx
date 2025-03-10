'use client';

import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useForm } from 'react-hook-form';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { Separator } from '../ui/separator';
import { Label } from '../ui/label';
import { EyeIcon, EyeOffIcon } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthService } from '@/backend/services/authService';
import { profileDataService } from '@/backend/services/profileDataService';
import { logout } from '@/backend/actions/ProfileActions';
import ModalConfirmation from '../../app/settings/ModalConfirmation';

export function AccountSettingsForm() {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  // Dados do Redux
  const emailRedux = useSelector((state: any) => state.profile?.profile?.email || 'Email não disponível');
  const userUID = useSelector((state: any) => state.profile?.profile?.userUID);

  // Estados para visibilidade das senhas
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Estados para status da conta
  const [status, setStatus] = useState(true);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showSuspendModal, setShowSuspendModal] = useState(false);

  // Password form schema
  const passwordFormSchema = z
    .object({
      currentPassword: z.string().min(1, t('password.currentRequired')),
      newPassword: z.string().min(8, t('password.minLength')),
      confirmPassword: z.string().min(1, t('password.confirmRequired')),
    })
    .refine((data) => data.newPassword === data.confirmPassword, {
      message: t('password.matchError'),
      path: ['confirmPassword'],
    });

  type PasswordFormValues = z.infer<typeof passwordFormSchema>;

  const form = useForm<PasswordFormValues>({
    resolver: zodResolver(passwordFormSchema),
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
  });

  // Fetch initial account status
  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const currentStatus = await profileDataService.fetchProfileStatus(userUID);
        setStatus(currentStatus);
      } catch (error) {
        console.error('Error fetching status:', error);
        toast.error(t('messages.fetchError'));
      }
    };

    if (userUID) {
      fetchStatus();
    }
  }, [userUID, t]);

  // Funções de manipulação da conta
  const deleteAccount = async () => {
    if (!userUID) {
      toast.error(t('messages.noUser'));
      return;
    }

    try {
      await profileDataService.deleteAccount(userUID);
      toast.success(t('messages.accountDeleted'));
      dispatch(logout());
      window.location.replace('/login');
    } catch (error) {
      toast.error(t('messages.deleteError'));
      console.error('Error deleting account:', error);
    }
  };

  const toggleStatus = async () => {
    try {
      const newStatus = !status;
      await profileDataService.updateProfileStatus(userUID, newStatus);
      setStatus(newStatus);
      toast.success(newStatus ? t('messages.accountReactivated') : t('messages.accountSuspended'));
    } catch (error) {
      toast.error(t('messages.statusError'));
      console.error('Error updating status:', error);
    }
  };

  const toggleAccountStatus = async () => {
    try {
      await toggleStatus();
      setShowSuspendModal(false);
    } catch (error) {
      toast.error(t('messages.statusChangeError'));
    }
  };

  // Manipulação da mudança de senha
  const onPasswordSubmit = async (data: PasswordFormValues) => {
    try {
      const response = await AuthService.changePassword(data.currentPassword, data.newPassword);
      if (response.success) {
        toast.success(response.message || t('messages.passwordChanged'));
        form.reset();
      } else {
        form.setError('currentPassword', {
          type: 'manual',
          message: response.error || t('messages.passwordChangeError'),
        });
      }
    } catch (error) {
      console.error('Error changing password:', error);
      form.setError('currentPassword', {
        type: 'manual',
        message: t('messages.passwordChangeError'),
      });
    }
  };

  return (
    <div className="p-8 bg-white dark:bg-[#100007] dark:border-gray-800 dark:border dark:border-opacity-50 rounded-3xl">
      <h1 className="text-2xl font-bold">{t('accountSettings.title')}</h1>
      <Separator className="my-6 h-0.5 bg-gray-200 dark:bg-gray-800 dark:opacity-50" />

      <div className="space-y-8">
        {/* Email and Password Grid */}
        <div className="grid md:grid-cols-2 gap-0">
          {/* Left Column - Email & Notifications */}
          <div className="space-y-8 md:pr-6">
            {/* Email Address */}
            <div>
              <h3 className="text-lg font-semibold mb-4">{t('accountSettings.emailAddress')}</h3>
              <Label className="text-sm text-gray-400">{t('accountSettings.currentEmail')}</Label>
              <div className="flex items-center gap-2 mt-1 bg-[#FFF5F8] dark:bg-[#27191F] dark:text-white rounded-full border border-gray-200 dark:border-gray-800 p-1">
                <Input
                  value={emailRedux}
                  className="flex-1 bg-transparent border-none"
                  readOnly
                />
                <Button className="bg-darkpink hover:bg-darkpinkhover text-white rounded-full">
                  {t('button.update')}
                </Button>
              </div>
            </div>

            {/* Verification */}
            <div>
              <h3 className="text-lg font-semibold mb-2">{t('accountSettings.verification')}</h3>
              <p className="text-sm text-gray-400 mb-4">{t('accountSettings.verificationMessage')}</p>
              <Button
                variant="outline"
                className="text-darkpink border-darkpink hover:bg-darkpink hover:text-white rounded-full"
              >
                {t('button.resendVerification')}
              </Button>
            </div>

            {/* Notifications */}
            <div>
              <h3 className="text-lg font-semibold mb-4">{t('accountSettings.notifications')}</h3>
              <div className="space-y-4 dark:text-gray-400">
                <div className="flex items-start space-x-2">
                  <Checkbox id="notifications" />
                  <Label htmlFor="notifications" className="text-sm leading-none pt-0.5">
                    {t('accountSettings.notifyMessages')}
                  </Label>
                </div>
                <div className="flex items-start space-x-2">
                  <Checkbox id="offers" defaultChecked />
                  <Label htmlFor="offers" className="text-sm leading-none pt-0.5">
                    {t('accountSettings.notifyOffers')}
                  </Label>
                </div>
                <div className="flex items-start space-x-2">
                  <Checkbox id="reminders" />
                  <Label htmlFor="reminders" className="text-sm leading-none pt-0.5">
                    {t('accountSettings.notifyReminders')}
                  </Label>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Password Settings */}
          <div className="md:border-l md:border-gray-200 dark:border-gray-800 dark:border-opacity-50 mt-10 md:mt-0 md:pl-6">
            <h3 className="text-lg font-semibold mb-4">{t('accountSettings.passwordSettings')}</h3>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onPasswordSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="currentPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm text-gray-400">{t('password.current')}</FormLabel>
                      <div className="relative">
                        <FormControl>
                          <Input
                            type={showCurrentPassword ? 'text' : 'password'}
                            className="bg-[#FFF5F8] dark:bg-[#27191F] dark:text-white pr-10"
                            {...field}
                          />
                        </FormControl>
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="absolute right-2 top-1/2 -translate-y-1/2"
                          onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                        >
                          {showCurrentPassword ? <EyeOffIcon className="h-4 w-4" /> : <EyeIcon className="h-4 w-4" />}
                        </Button>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="newPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm text-gray-400">{t('password.new')}</FormLabel>
                      <div className="relative">
                        <FormControl>
                          <Input
                            type={showNewPassword ? 'text' : 'password'}
                            className="bg-[#FFF5F8] dark:bg-[#27191F] dark:text-white pr-10"
                            {...field}
                          />
                        </FormControl>
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="absolute right-2 top-1/2 -translate-y-1/2"
                          onClick={() => setShowNewPassword(!showNewPassword)}
                        >
                          {showNewPassword ? <EyeOffIcon className="h-4 w-4" /> : <EyeIcon className="h-4 w-4" />}
                        </Button>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm text-gray-400">{t('password.confirm')}</FormLabel>
                      <div className="relative">
                        <FormControl>
                          <Input
                            type={showConfirmPassword ? 'text' : 'password'}
                            className="bg-[#FFF5F8] dark:bg-[#27191F] dark:text-white pr-10"
                            {...field}
                          />
                        </FormControl>
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="absolute right-2 top-1/2 -translate-y-1/2"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        >
                          {showConfirmPassword ? <EyeOffIcon className="h-4 w-4" /> : <EyeIcon className="h-4 w-4" />}
                        </Button>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="mt-6">
                  <h4 className="text-sm font-medium mb-2">{t('password.tipsTitle')}</h4>
                  <ul className="text-sm text-gray-500 list-disc pl-5 space-y-1">
                    <li>{t('password.tip1')}</li>
                    <li>{t('password.tip2')}</li>
                    <li>{t('password.tip3')}</li>
                  </ul>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-darkpink hover:bg-darkpinkhover text-white rounded-full mt-4"
                >
                  {t('button.changePassword')}
                </Button>
              </form>
            </Form>
          </div>
        </div>

        {/* Account Status */}
        <div>
          <h2 className="text-lg font-semibold mt-8 mb-4">{t('accountSettings.accountStatus')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Suspend Account Card */}
            <div className="bg-[#FFF5F8] dark:bg-[#27191F] dark:text-white rounded-2xl p-6">
              <div className="flex justify-between items-center">
                <div className="space-y-1">
                  <h3 className="font-medium">
                    {status ? t('accountSettings.suspendAccount') : t('accountSettings.reactivateAccount')}
                  </h3>
                  <p className="text-sm text-gray-400">
                    {status ? t('accountSettings.suspendMessage') : t('accountSettings.reactivateMessage')}
                  </p>
                </div>
                <Button
                  variant="default"
                  className={`${status ? 'bg-darkpink hover:bg-darkpinkhover' : 'bg-green-600 hover:bg-green-700'} text-white rounded-full`}
                  onClick={() => setShowSuspendModal(true)}
                >
                  {status ? t('button.suspend') : t('button.reactivate')}
                </Button>
              </div>
            </div>

            {/* Delete Account Card */}
            <div className="bg-[#FFF5F8] dark:bg-[#27191F] dark:text-white rounded-2xl p-6">
              <div className="flex justify-between items-center">
                <div className="space-y-1">
                  <h3 className="font-medium">{t('accountSettings.deleteAccount')}</h3>
                  <p className="text-sm text-gray-400">{t('accountSettings.deleteMessage')}</p>
                </div>
                <Button
                  variant="outline"
                  className="border-gray-200 text-black dark:text-white bg-transparent rounded-full"
                  onClick={() => setShowDeleteModal(true)}
                >
                  {t('button.deleteAccount')}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modais de confirmação */}
      <ModalConfirmation
        show={showSuspendModal}
        title={status ? t('accountSettings.suspendAccount') : t('accountSettings.reactivateAccount')}
        message={
          status
            ? t('accountSettings.suspendConfirmMessage')
            : t('accountSettings.reactivateConfirmMessage')
        }
        onConfirm={toggleAccountStatus}
        onCancel={() => setShowSuspendModal(false)}
      />

      <ModalConfirmation
        show={showDeleteModal}
        title={t('accountSettings.deleteConfirmTitle')}
        message={t('accountSettings.deleteConfirmMessage')}
        onConfirm={deleteAccount}
        onCancel={() => setShowDeleteModal(false)}
      />

      <ToastContainer />
    </div>
  );
}

export default AccountSettingsForm;