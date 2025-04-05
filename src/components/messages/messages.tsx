'use client';

import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '@/backend/store';
import { fetchChatRooms } from '@/backend/actions/ChatActions';
import ChatWindow from '../profile/ChatWindow';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { RiMessage2Fill } from 'react-icons/ri';
import { cn } from '@/backend/lib/utils';
import { useTheme } from 'next-themes';
import { useMemo } from 'react';
import supabase from '@/backend/database/supabase';
import { useRouter } from 'next/navigation';

// Variantes de animação
const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

const staggerChildren = {
  animate: { transition: { staggerChildren: 0.1 } },
};

const Messages: React.FC = () => {
  const [showChat, setShowChat] = useState(false);
  const [selectedChatRoomId, setSelectedChatRoomId] = useState<string | null>(null);
  const dispatch = useDispatch<AppDispatch>();
  const { theme } = useTheme();
  const userUID = useSelector((state: RootState) => state.profile.userUID);
  const chatRooms = useSelector((state: RootState) => state.profile.chatRooms || []);
  const profiles = useSelector((state: RootState) => state.profile.profiles || []);
  const nome = useSelector((state: RootState) => state.profile.nome);
  const isLoggedIn = useSelector((state: RootState) => state.profile.isLoggedIn);
  const router = useRouter();

  useEffect(() => {
    if (!isLoggedIn || !userUID) {
      router.push('/login');
    }
  }, [isLoggedIn, userUID, router]);

  useEffect(() => {
    if (userUID) {
      dispatch(fetchChatRooms(userUID))
        .unwrap()
        .catch((error) => console.error('Erro ao carregar salas de chat:', error));
    }
  }, [userUID, dispatch]);

  // Mapear chatRooms para evitar duplicatas e buscar nome/email
  const uniqueChatRooms = useMemo(() => {
    const roomMap = new Map<string, any>();
    chatRooms.forEach((room) => {
      const otherUserId = room.user_id === userUID ? room.advertiser_id : room.user_id;
      if (!roomMap.has(otherUserId)) {
        const profile = profiles.find((p) => p.userUID === otherUserId);
        roomMap.set(otherUserId, {
          ...room,
          displayName: profile?.nome || profile?.email || otherUserId,
        });
      }
    });
    return Array.from(roomMap.values());
  }, [chatRooms, profiles, userUID]);

  const handleOpenChat = (chatRoomId: string) => {
    setSelectedChatRoomId(chatRoomId);
    setShowChat(true);
  };

  const renderChatWindow = () => {
    if (showChat && selectedChatRoomId) {
      return <ChatWindow chatRoomId={selectedChatRoomId} onClose={() => setShowChat(false)} />;
    }
    return null;
  };

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-br from-pink-100 to-rose-50 dark:from-[#100007] dark:to-[#2b1a21] py-12 px-4 md:px-8"
      initial="initial"
      animate="animate"
      variants={staggerChildren}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-pink-600/10 via-transparent to-transparent" />

      <motion.div
        className="relative max-w-4xl mx-auto z-10"
        variants={fadeInUp}
      >
        <motion.h1
          className="text-4xl md:text-5xl font-bold text-center text-pink-600 dark:text-pink-400 mb-8"
          variants={fadeInUp}
        >
          Minhas Mensagens
        </motion.h1>

        {uniqueChatRooms.length > 0 ? (
          <div className="space-y-4">
            {uniqueChatRooms.map((room) => (
              <motion.div key={room.id} variants={fadeInUp}>
                <Card
                  className={cn(
                    'bg-white dark:bg-[#1a0a10] rounded-2xl shadow-md p-4 flex items-center justify-between transition-all hover:shadow-lg hover:scale-[1.02]',
                    theme === 'dark' ? 'text-gray-200' : 'text-gray-900'
                  )}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-pink-500 to-rose-400 flex items-center justify-center text-white font-bold text-lg">
                      {room.displayName.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <p className="font-semibold text-lg">{room.displayName}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Última mensagem: {room.last_message_at ? new Date(room.last_message_at).toLocaleDateString() : 'Nenhuma'}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {room.unread_count > 0 && (
                      <span className="bg-red-500 text-white rounded-full px-2 py-1 text-xs">
                        {room.unread_count}
                      </span>
                    )}
                    <Button
                      variant="outline"
                      className="rounded-full border-pink-600 text-pink-600 dark:border-pink-400 dark:text-pink-400 hover:bg-pink-600 hover:text-white dark:hover:bg-pink-400"
                      onClick={() => handleOpenChat(room.id)}
                    >
                      <RiMessage2Fill size={20} />
                    </Button>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        ) : (
          <motion.p
            className="text-center text-gray-600 dark:text-gray-300"
            variants={fadeInUp}
          >
            Nenhuma conversa encontrada.
          </motion.p>
        )}
      </motion.div>

      {renderChatWindow()}
    </motion.div>
  );
};

export default Messages;