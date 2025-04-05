'use client';

import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '@/backend/store';
import { fetchChatRooms } from '@/backend/actions/ChatActions';
import { setCurrentChatRoom } from '@/backend/reducers/profileSlice'; // Importar a ação
import ChatWindow from './profile/ChatWindow';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { RiMessage2Fill } from 'react-icons/ri';
import { motion } from 'framer-motion';
import supabase from '@/backend/database/supabase';
import { X } from 'lucide-react';

const avatarVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3, staggerChildren: 0.1 } },
};

const avatarChildVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 },
};

const buttonVariants = {
  hover: { scale: 1.1, rotate: 5 },
  tap: { scale: 0.95 },
};

const ChatFloatingButton: React.FC = () => {
  const [showAvatars, setShowAvatars] = useState(false);
  const [chatRooms, setChatRooms] = useState<any[]>([]);
  const [profiles, setProfiles] = useState<{ [key: string]: { nome: string; photoUrl: string | null } }>({});
  const dispatch = useDispatch<AppDispatch>();
  const userUID = useSelector((state: RootState) => state.profile.userUID);
  const currentChatRoomId = useSelector((state: RootState) => state.profile.currentChatRoomId);

  useEffect(() => {
    if (userUID) {
      dispatch(fetchChatRooms(userUID))
        .unwrap()
        .then((rooms) => {
          console.log('[DEBUG] ChatRooms carregados:', rooms);
          setChatRooms(rooms);
        })
        .catch((error) => console.error('[DEBUG] Erro ao carregar salas de chat:', error));
    }
  }, [userUID, dispatch]);

  useEffect(() => {
    const fetchProfiles = async () => {
      const newProfiles: { [key: string]: { nome: string; photoUrl: string | null } } = {};
      let needsUpdate = false;

      for (const room of chatRooms) {
        const otherUserId = room.user_id === userUID ? room.advertiser_id : room.user_id;
        if (!profiles[otherUserId]) {
          needsUpdate = true;
          const { data: profileData, error: profileError } = await supabase
            .from('ProfilesData')
            .select('userUID, nome, email')
            .eq('userUID', otherUserId)
            .limit(1)
            .maybeSingle();

          const { data: photoData, error: photoError } = await supabase
            .from('profilephoto')
            .select('imageurl')
            .eq('userUID', otherUserId)
            .limit(1)
            .maybeSingle();

          let photoUrl: string | null = null;
          if (photoData) {
            photoUrl = photoData.imageurl;
            console.log('[DEBUG] Foto encontrada para', otherUserId, photoUrl);
          } else if (photoError) {
            console.error('[DEBUG] Erro ao buscar foto:', photoError.message);
          }

          newProfiles[otherUserId] = {
            nome: profileData?.nome || profileData?.email || 'Desconhecido',
            photoUrl,
          };
        }
      }

      if (needsUpdate) {
        console.log('[DEBUG] Perfis atualizados:', newProfiles);
        setProfiles((prev) => ({ ...prev, ...newProfiles }));
      }
    };

    if (chatRooms.length > 0) {
      fetchProfiles();
    }
  }, [chatRooms, userUID, profiles]); 
  
  // Adicionado 'profiles' às dependências
  const totalUnread = chatRooms.reduce((sum, room) => sum + (room.unread_count || 0), 0);

  const handleOpenChat = (chatRoomId: string) => {
    console.log('[DEBUG] Tentando abrir chat com ID:', chatRoomId);
    console.log('[DEBUG] currentChatRoomId antes:', currentChatRoomId);
    dispatch(setCurrentChatRoom(chatRoomId)); // Usar a ação diretamente
    setShowAvatars(false);
  };

  const handleCloseChat = (chatRoomId: string) => {
    console.log('[DEBUG] Fechando chat com ID:', chatRoomId);
    setChatRooms((prev) => prev.filter((room) => room.id !== chatRoomId));
    if (currentChatRoomId === chatRoomId) {
      dispatch(setCurrentChatRoom(null));
    }
  };

  const handleCloseChatWindow = () => {
    console.log('[DEBUG] Fechando janela de chat para chatRoomId:', currentChatRoomId);
    dispatch(setCurrentChatRoom(null));
  };

  const renderChatWindow = () => {
    console.log('[DEBUG] Renderizando ChatWindow, currentChatRoomId:', currentChatRoomId);
    if (currentChatRoomId) {
      return <ChatWindow key={currentChatRoomId} chatRoomId={currentChatRoomId} onClose={handleCloseChatWindow} />;
    }
    return null;
  };

  useEffect(() => {
    console.log('[DEBUG] currentChatRoomId mudou para:', currentChatRoomId);
  }, [currentChatRoomId]);

  return (
    <>
      <motion.div
        className="fixed bottom-4 right-4 z-[1000]"
        whileHover="hover"
        whileTap="tap"
        variants={buttonVariants}
      >
        <Button
          className="rounded-full bg-pink-600 hover:bg-red-700 text-white p-6 shadow-lg flex items-center gap-2"
          onClick={() => setShowAvatars((prev) => !prev)}
        >
          <RiMessage2Fill size={28} />
          <span className="text-lg font-semibold">Chat</span>
          {totalUnread > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs">
              {totalUnread}
            </span>
          )}
        </Button>
      </motion.div>

      {showAvatars && (
        <motion.div
          className="fixed bottom-20 right-4 flex flex-col space-y-2 z-[1000]"
          initial="hidden"
          animate="visible"
          variants={avatarVariants}
        >
          {chatRooms.length > 0 ? (
            chatRooms.map((room) => {
              const otherUserId = room.user_id === userUID ? room.advertiser_id : room.user_id;
              const profile = profiles[otherUserId] || { nome: 'Carregando...', photoUrl: null };

              return (
                <motion.div
                  key={room.id}
                  variants={avatarChildVariants}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="relative"
                >
                  <Button
                    variant="ghost"
                    className="rounded-full p-0 w-14 h-14"
                    onClick={() => handleOpenChat(room.id)}
                  >
                    <Avatar className="w-14 h-14">
                      {profile.photoUrl ? (
                        <AvatarImage src={profile.photoUrl} alt={profile.nome} />
                      ) : (
                        <AvatarFallback className="bg-pink-600 text-white">
                          {profile.nome.charAt(0).toUpperCase()}
                        </AvatarFallback>
                      )}
                      {room.unread_count > 0 && (
                        <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                          {room.unread_count}
                        </span>
                      )}
                    </Avatar>
                  </Button>
                  <Button
                    variant="ghost"
                    className="absolute -top-1 -right-1 p-0 w-5 h-5 bg-gray-800 text-white rounded-full flex items-center justify-center"
                    onClick={() => handleCloseChat(room.id)}
                  >
                    <X size={12} />
                  </Button>
                </motion.div>
              );
            })
          ) : (
            <motion.p
              className="text-white bg-gray-800 p-2 rounded"
              variants={avatarChildVariants}
            >
              Sem conversas.
            </motion.p>
          )}
        </motion.div>
      )}

      {renderChatWindow()}
    </>
  );
};

export default ChatFloatingButton;