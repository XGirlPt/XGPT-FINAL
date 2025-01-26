import { useState, useEffect, useRef, useCallback } from "react";
import supabase from "@/database/supabase";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { useTranslation } from "react-i18next";

type Comment = {
  id: number;
  authorName: string;
  rating: number;
  comment: string;
  created_at: string;
  profileuid: string; // Expecting profileUID as a prop

};

type CommentsProps = {
  profileuid: string;
  comments?: Comment[]; // Accept comments as a direct prop
};

function Comments({ profileuid, comments: initialComments = [] }: CommentsProps) {
  const [comments, setComments] = useState<Comment[]>(initialComments);
  const [newComment, setNewComment] = useState("");
  const [rating, setRating] = useState(0);
  const [authorName, setAuthorName] = useState("");
  const [isEmojiPickerVisible, setIsEmojiPickerVisible] = useState(false);
  const emojiInputRef = useRef<HTMLTextAreaElement | null>(null);
  const { t } = useTranslation();

  const emojiList = ["😊", "😂", "😍", "😐", "😢", "😠", "😎", "🥳", "🤩", "🤔"];

  // Fetch comments for the specific userUID
  const fetchComments = useCallback(async () => {
    if (!profileuid || profileuid.trim() === "") {
        console.warn("profileuid is missing or invalid. Skipping fetch.");
        setComments([]); // Certifique-se de limpar os comentários neste caso.
        return;
    }

    try {
        const { data, error } = await supabase
            .from("comments")
            .select("*")
            .eq("profileuid", profileuid)
            .order("created_at", { ascending: false });

        if (error) throw error;
        setComments(data || []);
    } catch (err) {
        if (err instanceof Error) {
            console.error("Error fetching comments:", err.message);
        } else if (typeof err === "object" && err !== null) {
            console.error("Unexpected error object:", JSON.stringify(err));
        } else {
            console.error("Unknown error type:", err);
        }
    }
}, [profileuid]);

  useEffect(() => {
    fetchComments(); // Fetch comments when the component mounts or userUID changes
  }, [fetchComments]);

  const handleCommentSubmit = async () => {
    if (!newComment.trim() || rating === 0 || !authorName.trim()) {
      alert("Por favor, preencha todos os campos e selecione uma classificação.");
      return;
    }

    try {
      const { data, error } = await supabase.from("comments").insert([
        {
          profileuid,
          authorName,
          rating,
          comment: newComment,
        },
      ]);

      if (error) throw error;

      setNewComment("");
      setRating(0);
      setAuthorName("");
      fetchComments(); // Refresh comments after adding a new one
    } catch (error) {
      console.error("Error submitting comment:", error);
    }
  };

  const toggleEmojiPicker = () => setIsEmojiPickerVisible(!isEmojiPickerVisible);

  const addEmojiToComment = (emoji: string) => {
    if (emojiInputRef.current) {
      const cursorPosition = emojiInputRef.current.selectionStart;
      const newText =
        newComment.slice(0, cursorPosition) + emoji + newComment.slice(cursorPosition);
      setNewComment(newText);
      emojiInputRef.current.selectionStart = cursorPosition + emoji.length;
      emojiInputRef.current.selectionEnd = cursorPosition + emoji.length;
    }
    setIsEmojiPickerVisible(false);
  };

  return (
    <div className="space-y-4">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
        <h2 className="text-pink-500 text-2xl mb-4">{t("profile.comments")}</h2>
        <div className="space-y-2">
          {comments.length === 0 ? (
            <p className="text-gray-700 dark:text-gray-400">{t("profile.no_comments_yet")}</p>
          ) : (
            comments.map((comment) => (
              <div key={comment.id} className="bg-gray-200 dark:bg-gray-700 p-4 rounded-md shadow-sm">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex">
                    {[...Array(5)].map((_, index) => (
                      <span key={index}>
                        {index < comment.rating ? (
                          <AiFillStar className="text-yellow-500" />
                        ) : (
                          <AiOutlineStar className="text-gray-500" />
                        )}
                      </span>
                    ))}
                  </div>
                  <p className="text-pink-500 text-sm font-semibold">
                    {comment.authorName || t("profile.anonymous")}
                  </p>
                </div>
                <p className="text-gray-600 dark:text-gray-200">{comment.comment}</p>
                <p className="text-gray-500 dark:text-gray-400 text-sm mt-2">
                  {new Date(comment.created_at).toLocaleString()}
                </p>
              </div>
            ))
          )}
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md relative">
        <h3 className="text-pink-500 text-lg mb-4">{t("profile.leave_comment")}</h3>
        <input
          type="text"
          className="w-full bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-white p-4 rounded-md mb-4"
          placeholder={t("profile.write_comment_placeholder")}
          value={authorName}
          onChange={(e) => setAuthorName(e.target.value)}
        />
        <div className="flex items-center mb-4">
          {[...Array(5)].map((_, index) => (
            <span key={index} onClick={() => setRating(index + 1)}>
              {index < rating ? (
                <AiFillStar className="text-yellow-500 cursor-pointer" />
              ) : (
                <AiOutlineStar className="text-gray-500 cursor-pointer" />
              )}
            </span>
          ))}
        </div>
        <textarea
          ref={emojiInputRef}
          className="w-full bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-white p-4 rounded-md mb-4"
          rows={4}
          placeholder="Escreva seu comentário aqui..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <span onClick={toggleEmojiPicker} className="absolute right-4 bottom-4 text-2xl cursor-pointer">
          😀
        </span>
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
          className="bg-pink-500 text-white px-4 py-2 rounded-md hover:bg-pink-600"
        >
          {t("profile.send_comment")}
        </button>
      </div>
    </div>
  );
}

export default Comments;
