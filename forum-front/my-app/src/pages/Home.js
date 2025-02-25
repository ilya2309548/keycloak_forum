import { useEffect, useState } from "react";
import { getPosts } from "../api/api"; // Функция API для получения постов
import { Link } from "react-router-dom";

const Home = () => {
  const [posts, setPosts] = useState([]); // Состояние для хранения постов

  useEffect(() => {
    getPosts().then((res) => setPosts(res.data)); // Загружаем посты при монтировании
  }, []);

  return (
    <div>
      <h1>Posts</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <h3>{post.title}</h3>
            <p>{post.content}</p>
            <small>
              By {post.username} on {new Date(post.createdAt).toLocaleString()} {/* Отображаем автора и дату */}
            </small>
            <br />
            <Link to={`/post/${post.id}`}>View Post</Link> {/* Ссылка на детальную страницу поста */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
