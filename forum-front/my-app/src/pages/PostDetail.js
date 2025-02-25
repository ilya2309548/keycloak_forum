import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPostById, getComments, addComment } from "../api/api";

const PostDetail = () => {
  const { postId } = useParams(); // Получаем ID поста из URL
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    getPostById(postId).then((res) => setPost(res.data)); // Загружаем пост
    getComments(postId).then((res) => setComments(res.data)); // Загружаем комментарии
  }, [postId]);

  const handleAddComment = () => {
    if (!newComment.trim()) return; // Проверяем, что комментарий не пустой
    const comment = { content: newComment };

    addComment(postId, comment).then(() => {
      setNewComment(""); // Очищаем поле ввода
      getComments(postId).then((res) => setComments(res.data)); // Обновляем список комментариев
    });
  };

  if (!post) return <div>Loading...</div>; // Если пост еще загружается

  return (
    <div>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
      <small>
        By {post.username} on {new Date(post.createdAt).toLocaleString()} {/* Отображаем автора и дату */}
      </small>

      <h2>Comments</h2>
      {comments.length === 0 ? (
        <p>No comments yet.</p>
      ) : (
        <ul>
          {comments.map((comment) => (
            <li key={comment.id}>
              <p>{comment.content}</p>
              <small>
                By {comment.username} on {new Date(comment.createdAt).toLocaleString()} {/* Автор и дата комментария */}
              </small>
            </li>
          ))}
        </ul>
      )}

      <textarea
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
        placeholder="Add a comment"
      />
      <button onClick={handleAddComment}>Submit Comment</button>
    </div>
  );
};

export default PostDetail;
