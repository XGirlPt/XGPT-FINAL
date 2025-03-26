'use client';

import React, { useState, useRef } from 'react';
import emailjs from 'emailjs-com';
import ReCAPTCHA from 'react-google-recaptcha';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/backend/lib/utils';
import { useTheme } from 'next-themes';

// Variantes de animação
const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

const staggerChildren = {
  animate: { transition: { staggerChildren: 0.2 } },
};

function Contacto() {
  const { t } = useTranslation();
  const { theme } = useTheme();

  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [recaptchaValue, setRecaptchaValue] = useState<string | null>(null);

  const recaptchaRef = useRef<ReCAPTCHA>(null);

  const handleRecaptchaChange = (value: string | null) => {
    setRecaptchaValue(value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!recaptchaValue) {
      toast.error(t('contact.recaptcha_error'), { position: 'top-right' });
      return;
    }

    const templateParams = {
      from_email: email,
      subject: subject,
      message: message,
    };

    emailjs
      .send(
        'service_dbp2kn8', // Substitua pelo seu ID do serviço
        'template_hghiro9', // Substitua pelo seu ID do template
        templateParams,
        'xinftXeZEUNtgiQHk' // Substitua pela sua chave pública
      )
      .then((response) => {
        console.log('SUCCESS!', response.status, response.text);
        toast.success(t('contact.success_message'), { position: 'top-right' });
        setEmail('');
        setSubject('');
        setMessage('');
        setRecaptchaValue(null);
        if (recaptchaRef.current) {
          recaptchaRef.current.reset();
        }
      })
      .catch((err) => {
        console.error('FAILED...', err);
        toast.error(t('contact.error_message'), { position: 'top-right' });
      });
  };

  return (
    <motion.div
      className="min-h-screen flex items-center justify-center bg-[#f2ebee] dark:bg-[#100007] p-4 md:p-8"
      initial="initial"
      animate="animate"
      variants={staggerChildren}
    >
      <motion.section
        className={cn(
          'w-full max-w-lg bg-white dark:bg-[#1a0a10] rounded-3xl shadow-lg p-6 md:p-8',
          theme === 'dark' ? 'text-zinc-50' : 'text-gray-900'
        )}
        variants={fadeInUp}
      >
        <motion.h1
          className="text-3xl md:text-4xl font-bold text-center text-pink-600 mb-4"
          variants={fadeInUp}
        >
          {t('contact.title')}
        </motion.h1>
        <motion.h2
          className="text-sm font-light text-center text-gray-500 dark:text-gray-400 mb-6"
          variants={fadeInUp}
        >
          {t('contact.subtitle')}
        </motion.h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <motion.div variants={fadeInUp}>
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-200"
            >
              {t('contact.email_label')}
            </label>
            <Input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t('contact.email_placeholder')}
              required
              className={cn(
                'w-full px-4 py-3 rounded-full border shadow-sm focus:ring-2 focus:ring-pink-500',
                theme === 'dark'
                  ? 'bg-[#2b1a21] border-zinc-700 text-white placeholder:text-zinc-400'
                  : 'bg-white border-gray-200 text-gray-900 placeholder:text-gray-400'
              )}
            />
          </motion.div>

          <motion.div variants={fadeInUp}>
            <label
              htmlFor="subject"
              className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-200"
            >
              {t('contact.subject_label')}
            </label>
            <Input
              type="text"
              id="subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder={t('contact.subject_placeholder')}
              required
              className={cn(
                'w-full px-4 py-3 rounded-full border shadow-sm focus:ring-2 focus:ring-pink-500',
                theme === 'dark'
                  ? 'bg-[#2b1a21] border-zinc-700 text-white placeholder:text-zinc-400'
                  : 'bg-white border-gray-200 text-gray-900 placeholder:text-gray-400'
              )}
            />
          </motion.div>

          <motion.div variants={fadeInUp}>
            <label
              htmlFor="message"
              className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-200"
            >
              {t('contact.message_label')}
            </label>
            <textarea
              id="message"
              rows={4}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder={t('contact.message_placeholder')}
              required
              className={cn(
                'w-full px-4 py-3 rounded-lg border shadow-sm focus:ring-2 focus:ring-pink-500 resize-none',
                theme === 'dark'
                  ? 'bg-[#2b1a21] border-zinc-700 text-white placeholder:text-zinc-400'
                  : 'bg-white border-gray-200 text-gray-900 placeholder:text-gray-400'
              )}
            />
          </motion.div>

          <motion.div variants={fadeInUp} className="flex justify-center">
            <ReCAPTCHA
              sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || 'defaultSiteKey'}
              onChange={handleRecaptchaChange}
              ref={recaptchaRef}
            />
          </motion.div>

          <motion.div variants={fadeInUp}>
            <Button
              type="submit"
              className="w-full rounded-full bg-gradient-to-r from-pink-600 to-rose-500 hover:from-pink-700 hover:to-rose-600 text-white font-bold py-3 shadow-md transition-all duration-300"
            >
              {t('contact.send_button')}
            </Button>
          </motion.div>
        </form>

        <motion.p
          className="mt-6 text-center text-sm text-gray-500 dark:text-gray-400"
          variants={fadeInUp}
        >
          {t('contact.thank_you_message')}
        </motion.p>
      </motion.section>

      <ToastContainer position="top-right" />
    </motion.div>
  );
}

export default Contacto;