'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '@/backend/store';
import { sendMessage, fetchChatMessages } from '@/backend/actions/ChatActions';
import supabase from '@/backend/database/supabase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { motion } from 'framer-motion';
import { X, Send, Minimize2, Maximize2 } from 'lucide-react';
import { cn } from '@/backend/lib/utils';
import { useTheme } from 'next-themes';
import { formatDistanceToNow } from 'date-fns';
import { pt } from 'date-fns/locale';

// Definição explícita do tipo UserProfile
interface UserProfile {
  userUID: string;
  nome?: string;
  email?: string;
  photoUrl?: string | null;
}

// Supondo que Profile vem de algum lugar (ajuste conforme sua definição real)
interface Profile {
  id: string;
  userUID: string;
  nome: string;
  email?: string;
  photos?: string[];
  vphotos?: string[];
  // Adicione outras propriedades conforme necessário
}

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.3 },
};

const messageVariants = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.2 },
};

interface ChatWindowProps {
  chatRoomId: string;
  onClose: () => void;
}

export function ChatWindow({ chatRoomId, onClose }: ChatWindowProps) {
  const dispatch = useDispatch<AppDispatch>();
  const { theme } = useTheme();
  const userUID = useSelector((state: RootState) => state.profile.userUID);
  const messages = useSelector((state: RootState) => state.profile.messages[chatRoomId] || []);
  const chatRooms = useSelector((state: RootState) => state.profile.chatRooms || []);
  const profiles = useSelector((state: RootState) => state.profile.profiles || []);
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [otherUserProfile, setOtherUserProfile] = useState<UserProfile | null>(null);
  const [isMaximized, setIsMaximized] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const prevOtherUserIdRef = useRef<string | undefined>();
  const subscriptionRef = useRef<{ messageChannel: any; typingChannel: any } | null>(null);

  const chatRoom = chatRooms.find((room) => room.id === chatRoomId);
  const otherUserId = chatRoom?.user_id === userUID ? chatRoom?.advertiser_id : chatRoom?.user_id;

  useEffect(() => {
    const fetchOtherUserProfile = async () => {
      if (otherUserProfile || prevOtherUserIdRef.current === otherUserId || !otherUserId) return;

      console.log('[DEBUG] Buscando perfil para otherUserId:', otherUserId);
      let profile: Profile | UserProfile | undefined = profiles.find((p) => p.userUID === otherUserId);

      if (!profile) {
        const { data: profileData, error: profileError } = await supabase
          .from('ProfilesData')
          .select('userUID, nome, email')
          .eq('userUID', otherUserId)
          .limit(1)
          .maybeSingle();

        if (profileError) {
          console.error('[DEBUG] Erro ao buscar perfil em ProfilesData:', profileError.message);
          profile = { userUID: otherUserId };
        } else if (profileData) {
          profile = profileData as UserProfile;
        } else {
          profile = { userUID: otherUserId };
        }

        const { data: photoData, error: photoError } = await supabase
          .from('profilephoto')
          .select('imageurl')
          .eq('userUID', otherUserId)
          .maybeSingle();

        if (photoError) {
          console.error('[DEBUG] Erro ao buscar foto em profilephoto:', photoError.message);
        } else if (photoData) {
          profile = { ...profile, photoUrl: photoData.imageurl };
        }
      }

      setOtherUserProfile(profile as UserProfile);
      prevOtherUserIdRef.current = otherUserId;
    };

    if (otherUserId) {
      fetchOtherUserProfile();
    }
  }, [otherUserId, profiles, chatRoom]);

  const displayName = useMemo(
    () => otherUserProfile?.nome || otherUserProfile?.email || otherUserId || 'Sem Nome',
    [otherUserProfile, otherUserId]
  );
  const avatarUrl = useMemo(() => otherUserProfile?.photoUrl || null, [otherUserProfile]);

  const filteredMessages = useMemo(() => {
    const messageMap = new Map();
    messages.forEach((msg) => messageMap.set(msg.id, msg));
    return Array.from(messageMap.values()).sort(
      (a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
    );
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    console.log('[DEBUG] Iniciando subscrição para chatRoomId:', chatRoomId);
    dispatch(fetchChatMessages(chatRoomId))
      .unwrap()
      .then(() => scrollToBottom())
      .catch((error) => console.error('[DEBUG] Erro ao carregar mensagens:', error));

    // Cria os canais apenas uma vez
    const messageChannel = supabase.channel(`chat:${chatRoomId}`, { selfBroadcast: false });
    const typingChannel = supabase.channel(`typing:${chatRoomId}`, { selfBroadcast: false });

    // Configura os listeners antes de subscrever
    messageChannel
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'messages', filter: `chat_room_id=eq.${chatRoomId}` },
        (payload) => {
          dispatch({
            type: 'profile/sendMessage/fulfilled',
            payload: payload.new,
            meta: { arg: { chatRoomId } },
          });
          scrollToBottom();
        }
      )
      .subscribe((status) => {
        console.log('[DEBUG] Status da subscrição de mensagens:', status);
        if (status === 'CLOSED') {
          console.warn('[DEBUG] Subscrição de mensagens fechada:', chatRoomId);
        }
      });

    typingChannel
      .on('broadcast', { event: 'typing' }, (payload) => {
        if (payload.payload.userId !== userUID) {
          setIsTyping(true);
          setTimeout(() => setIsTyping(false), 2000);
        }
      })
      .subscribe((status) => {
        console.log('[DEBUG] Status da subscrição de typing:', status);
        if (status === 'CLOSED') {
          console.warn('[DEBUG] Subscrição de typing fechada:', chatRoomId);
        }
      });

    subscriptionRef.current = { messageChannel, typingChannel };

    return () => {
      console.log('[DEBUG] Limpando subscrições para chatRoomId:', chatRoomId);
      if (subscriptionRef.current) {
        supabase.removeChannel(subscriptionRef.current.messageChannel);
        supabase.removeChannel(subscriptionRef.current.typingChannel);
        subscriptionRef.current = null;
      }
    };
  }, [chatRoomId, dispatch, userUID]);

  useEffect(() => {
    if (newMessage.trim() && subscriptionRef.current) {
      subscriptionRef.current.typingChannel.send({
        type: 'broadcast',
        event: 'typing',
        payload: { userId: userUID },
      });
    }
  }, [newMessage, chatRoomId, userUID]);

  const handleSend = async () => {
    if (!newMessage.trim() || !userUID) return;

    const tempMessage = {
      id: `temp-${Date.now()}`,
      chat_room_id: chatRoomId,
      sender_id: userUID,
      content: newMessage,
      created_at: new Date().toISOString(),
      is_read: false,
    };

    dispatch({
      type: 'profile/sendMessage/fulfilled',
      payload: tempMessage,
      meta: { arg: { chatRoomId } },
    });
    setNewMessage('');
    scrollToBottom();

    try {
      await dispatch(sendMessage({ chatRoomId, senderId: userUID, content: newMessage })).unwrap();
    } catch (error) {
      console.error('[DEBUG] Erro ao enviar mensagem:', error);
    }
  };

  if (!otherUserProfile) {
    return <div>Carregando perfil...</div>;
  }

  return (
    <motion.div
      className={cn(
        'fixed bottom-20 right-6 w-[400px] h-[500px] flex flex-col rounded-lg shadow-xl z-[2000] border border-gray-200 dark:border-gray-700',
        theme === 'dark' ? 'bg-[#1a0a10] text-gray-200' : 'bg-white text-gray-900',
        isMaximized ? 'w-[600px] h-[80vh]' : ''
      )}
      initial="initial"
      animate="animate"
      variants={fadeInUp}
    >
      <div className="flex items-center justify-between p-3 border-b border-pink-200 dark:border-gray-800 bg-pink-50 dark:bg-[#2b1a21]">
        <div className="flex items-center gap-2">
          <Avatar className="w-10 h-10">
            {avatarUrl ? (
              <AvatarImage src={avatarUrl} alt={displayName} />
            ) : (
              <AvatarFallback className="bg-pink-600 text-white">
                {displayName.charAt(0).toUpperCase()}
              </AvatarFallback>
            )}
          </Avatar>
          <div>
            <h2 className="text-md font-semibold">{displayName}</h2>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {isTyping ? 'Está a escrever...' : 'Online'}
            </p>
          </div>
        </div>
        <div className="flex gap-1">
          <Button variant="ghost" size="sm" onClick={() => setIsMaximized(!isMaximized)}>
            {isMaximized ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
          </Button>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X size={16} />
          </Button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-3 space-y-3 bg-gradient-to-b from-pink-50 to-white dark:from-[#2b1a21] dark:to-[#1a0a10]">
        {filteredMessages.map((msg) => (
          <motion.div
            key={msg.id}
            className={`flex ${msg.sender_id === userUID ? 'justify-end' : 'justify-start'}`}
            variants={messageVariants}
            initial="initial"
            animate="animate"
          >
            <div
              className={cn(
                'max-w-[75%] p-2 rounded-lg shadow-sm',
                msg.sender_id === userUID
                  ? 'bg-pink-600 text-white'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100'
              )}
            >
              <p className="text-sm">{msg.content}</p>
              <p className="text-xs mt-1 opacity-60">
                {formatDistanceToNow(new Date(msg.created_at), { addSuffix: true, locale: pt })}
              </p>
            </div>
          </motion.div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-2 border-t border-pink-200 dark:border-gray-800 flex items-center gap-2 bg-white dark:bg-[#1a0a10]">
        <Input
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Escreve uma mensagem..."
          className="flex-1 rounded-full bg-gray-100 dark:bg-[#2b1a21] border-none text-sm focus:ring-pink-500"
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
        />
        <Button onClick={handleSend} size="sm" className="rounded-full bg-pink-600 hover:bg-pink-700 text-white">
          <Send size={16} />
        </Button>
      </div>
    </motion.div>
  );
}

export default ChatWindow;