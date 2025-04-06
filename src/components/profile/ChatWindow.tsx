'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '@/backend/store';
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

interface UserProfile {
  userUID: string;
  nome?: string;
  email?: string;
  photoUrl?: string | null;
}

interface Message {
  id: string;
  chat_room_id: string;
  sender_id: string;
  content: string;
  created_at: string;
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
  const chatRooms = useSelector((state: RootState) => state.profile.chatRooms || []);
  const profiles = useSelector((state: RootState) => state.profile.profiles || []);
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [otherUserProfile, setOtherUserProfile] = useState<UserProfile | null>(null);
  const [isMaximized, setIsMaximized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const prevOtherUserIdRef = useRef<string | undefined>();
  const subscriptionRef = useRef<{ messageChannel: any; typingChannel: any } | null>(null);

  const chatRoom = chatRooms.find((room) => room.id === chatRoomId);
  const otherUserId = chatRoom?.user_id === userUID ? chatRoom?.advertiser_id : chatRoom?.user_id;

  useEffect(() => {
    const fetchOtherUserProfile = async () => {
      if (otherUserProfile || prevOtherUserIdRef.current === otherUserId || !otherUserId) return;

      console.log('[DEBUG] Buscando perfil para otherUserId:', otherUserId);
      let profile: UserProfile | undefined = profiles.find((p) => p.userUID === otherUserId);

      if (!profile) {
        const { data: profileData, error: profileError } = await supabase
          .from('ProfilesData')
          .select('userUID, nome, email')
          .eq('userUID', otherUserId)
          .limit(1)
          .maybeSingle();

        if (profileError) {
          console.error('[DEBUG] Erro ao buscar perfil em ProfilesData:', profileError);
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

        if (photoError && photoError.code !== 'PGRST116') {
          console.error('[DEBUG] Erro ao buscar foto em profilephoto:', JSON.stringify(photoError, null, 2));
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
    if (!chatRoomId || !userUID) {
      console.log('[DEBUG] chatRoomId ou userUID ausente, subscrição não iniciada:', { chatRoomId, userUID });
      return;
    }

    console.log('[DEBUG] Iniciando subscrição para chatRoomId:', chatRoomId);

    const messageChannel = supabase.channel(`chat:${chatRoomId}`);
    messageChannel
      .on('broadcast', { event: 'message' }, (payload) => {
        console.log('[DEBUG] Nova mensagem recebida via broadcast:', payload.payload);
        const newMessage: Message = payload.payload;
        setMessages((prev) => {
          const isDuplicate = prev.some((msg) => msg.id === newMessage.id);
          if (!isDuplicate) {
            return [...prev, newMessage];
          }
          return prev;
        });
        scrollToBottom();
      })
      .subscribe((status, err) => {
        console.log('[DEBUG] Status da subscrição de mensagens:', status);
        if (status === 'SUBSCRIBED') {
          console.log('[DEBUG] Subscrição de mensagens ativa para chatRoomId:', chatRoomId);
        } else if (status === 'CHANNEL_ERROR') {
          console.error('[DEBUG] Erro no canal de mensagens:', err?.message || 'Detalhes indisponíveis');
          setTimeout(() => {
            console.log('[DEBUG] Tentando reconectar ao canal de mensagens');
            messageChannel.subscribe();
          }, 1000);
        }
      });

    const typingChannel = supabase.channel(`typing:${chatRoomId}`);
    typingChannel
      .on('broadcast', { event: 'typing' }, (payload) => {
        if (payload.payload.userId !== userUID) {
          console.log('[DEBUG] Usuário está digitando:', payload.payload.userId);
          setIsTyping(true);
          setTimeout(() => setIsTyping(false), 2000);
        }
      })
      .subscribe((status, err) => {
        console.log('[DEBUG] Status da subscrição de typing:', status);
        if (status === 'CHANNEL_ERROR') {
          console.error('[DEBUG] Erro no canal de typing:', err?.message || 'Detalhes indisponíveis');
          setTimeout(() => {
            console.log('[DEBUG] Tentando reconectar ao canal de typing');
            typingChannel.subscribe();
          }, 1000);
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
  }, [chatRoomId, userUID]);

  useEffect(() => {
    if (newMessage.trim() && subscriptionRef.current) {
      subscriptionRef.current.typingChannel.send({
        type: 'broadcast',
        event: 'typing',
        payload: { userId: userUID },
      });
    }
  }, [newMessage, chatRoomId, userUID]);

  const handleSend = () => {
    if (!newMessage.trim() || !userUID) return;

    const message: Message = {
      id: `msg-${Date.now()}-${Math.random()}`,
      chat_room_id: chatRoomId,
      sender_id: userUID,
      content: newMessage,
      created_at: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, message]);
    setNewMessage('');
    scrollToBottom();

    if (subscriptionRef.current) {
      subscriptionRef.current.messageChannel.send({
        type: 'broadcast',
        event: 'message',
        payload: message,
      });
      console.log('[DEBUG] Mensagem enviada via broadcast:', message);
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