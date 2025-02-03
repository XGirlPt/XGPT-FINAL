import { useState, useEffect, useRef, useCallback } from 'react';
import supabase from '@/database/supabase';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';
import { useTranslation } from 'react-i18next';
import { Card } from '../../../../components/ui/card';

type Comment = {
  id: number;
  authorName: string;
  rating: number;
  comment: string;
  created_at: string;
  profileuid: string;
};

type CommentsProps = {
  profileuid: string;
  comments?: Comment[];
};

function Comments({ profileuid, comments: initialComments = [] }: CommentsProps) {
  const [comments, setComments] = useState<Comment[]>(initialComments);
  const [newComment, setNewComment] = useState('');
  const [rating, setRating] = useState(0);
  const [authorName, setAuthorName] = useState('');
  const [isEmojiPickerVisible, setIsEmojiPickerVisible] = useState(false);
  const emojiInputRef = useRef<HTMLTextAreaElement | null>(null);
  const { t } = useTranslation();

  const emojiList = ['😊', '😂', '😍', '😐', '😢', '😠', '😎', '🥳', '🤩', '🤔'];

  // Fetch comments for the specific profile
  const fetchComments = useCallback(async () => {
    if (!profileuid.trim()) {
      console.warn('profileuid is missing or invalid. Skipping fetch.');
      setComments([]);
      return;
    }

    try {
      const { data, error } = await supabase
        .from('comments')
        .select('*')
        .eq('profileuid', profileuid)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setComments(data || []);
    } catch (err) {
      console.error('Error fetching comments:', err);
    }
  }, [profileuid]);

  useEffect(() => {
    fetchComments();
  }, [fetchComments]);

  const handleCommentSubmit = async () => {
    if (!newComment.trim() || rating === 0 || !authorName.trim()) {
      alert('Por favor, preencha todos os campos e selecione uma classificação.');
      return;
    }

    try {
      const { data, error } = await supabase.from('comments').insert([
        {
          profileuid,
          authorName,
          rating,
          comment: newComment,
        },
      ]);

      if (error) throw error;

      setNewComment('');
      setRating(0);
      setAuthorName('');
      fetchComments();
    } catch (error) {
      console.error('Error submitting comment:', error);
    }
  };

  const toggleEmojiPicker = () => setIsEmojiPickerVisible(!isEmojiPickerVisible);

  const addEmojiToComment = (emoji: string) => {
    if (emojiInputRef.current) {
      const cursorPosition = emojiInputRef.current.selectionStart;
      const newText =
        newComment.slice(0, cursorPosition) + emoji + newComment.slice(cursorPosition);
      setNewComment(newText);
    }
    setIsEmojiPickerVisible(false);
  };

  return (
    <Card className="p-6 bg-[#faf3f6] dark:bg-[#13040b] backdrop-blur-xl rounded-3xl border-none">
      <h2 className="text-4xl mb-6 text-gray-900 dark:text-white">{t('profile.comments')}</h2>

      {comments.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-400">{t('profile.no_comments_yet')}</p>
      ) : (
        <div className="space-y-4">
          {comments.map((comment) => (
            <div key={comment.id} className="bg-[#faf3f6] dark:bg-black/10 p-4 rounded-2xl">
              <div className="flex justify-between items-start mb-2">
                <span className="font-medium text-gray-900 dark:text-white">{comment.authorName}</span>
                <span className="text-sm text-gray-500">{new Date(comment.created_at).toLocaleString()}</span>
              </div>
              <div className="flex">
                {[...Array(5)].map((_, index) => (
                  <span key={index}>
                    {index < comment.rating ? (
                      <AiFillStar className="text-yellow-500" />
                    ) : (
                      <AiOutlineStar className="text-gray-400" />
                    )}
                  </span>
                ))}
              </div>
              <p className="text-gray-700 dark:text-gray-300 mt-2">{comment.comment}</p>
            </div>
          ))}
        </div>
      )}

      {/* Área para adicionar novo comentário */}
      <div className="mt-6 bg-[#faf3f6] dark:bg-black/10 p-6 rounded-3xl">
        <h3 className="text-2xl mb-4 text-gray-900 dark:text-white">{t('profile.leave_comment')}</h3>
        <input
          type="text"
          className="w-full bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-white p-4 rounded-md mb-4"
          placeholder={t('profile.write_comment_placeholder')}
          value={authorName}
          onChange={(e) => setAuthorName(e.target.value)}
        />
        <div className="flex items-center mb-4">
          {[...Array(5)].map((_, index) => (
            <span key={index} onClick={() => setRating(index + 1)}>
              {index < rating ? (
                <AiFillStar className="text-yellow-500 cursor-pointer" />
              ) : (
                <AiOutlineStar className="text-gray-400 cursor-pointer" />
              )}
            </span>
          ))}
        </div>
        <textarea
          ref={emojiInputRef}
          className="w-full bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-white p-4 rounded-md mb-4"
          rows={4}
          placeholder={t('profile.write_comment_placeholder')}
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <span onClick={toggleEmojiPicker} className="text-2xl cursor-pointer">😀</span>
        {isEmojiPickerVisible && (
          <div className="absolute bottom-16 right-4 bg-white border border-gray-300 rounded-md p-2 z-10 grid grid-cols-5 gap-2">
            {emojiList.map((emoji) => (
              <span key={emoji} className="text-2xl cursor-pointer" onClick={() => addEmojiToComment(emoji)}>
                {emoji}
              </span>
            ))}
          </div>
        )}
        <button
          onClick={handleCommentSubmit}
          className="bg-pink-500 text-white px-4 py-2 rounded-md hover:bg-pink-600 mt-4"
        >
          {t('profile.send_comment')}
        </button>
      </div>
    </Card>
  );
}

export default Comments;
