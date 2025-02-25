import { useState } from "react";
import { createPost } from "../api/api"; // ✅ Убедитесь, что импорт правильный
import { useNavigate } from "react-router-dom";

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();

  const handleCreatePost = () => {
    if (!title.trim() || !content.trim()) return;

    createPost({ title, content })
      .then(() => {
        navigate("/"); // После создания поста переходим на главную страницу
      })
      .catch((err) => console.error("Error creating post:", err));
  };

  return (
    <div>
      <h1>Create Post</h1>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        placeholder="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <button onClick={handleCreatePost}>Submit</button>
    </div>
  );
};

export default CreatePost;
