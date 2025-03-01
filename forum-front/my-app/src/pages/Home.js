import React, { useState, useEffect } from 'react';
import { api } from '../api/api';
import { useAuth } from '../auth/AuthProvider';
import { Link } from 'react-router-dom';

// Импортируем изображение
import developerImage from './background.jpg';

const Home = () => {
  const [posts, setPosts] = useState([]);
  const { authenticated } = useAuth();

  useEffect(() => {
    if (authenticated) {
      api.get('/posts').then((response) => {
        setPosts(response.data);
      });
    }
  }, [authenticated]);

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">Forum</h1>
      <p className="text-center mb-5">Powered by the developers of Cum'a Forum</p>
      
      {/* Добавление изображения */}
      <div className="text-center mb-5">
        <img src={developerImage} alt="Developer" className="img-fluid" />
      </div>

      <div className="row">
        {posts.map((post) => (
          <div className="col-md-4 mb-4" key={post.id}>
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{post.title}</h5>
                <p className="card-text">{post.content.slice(0, 100)}...</p>
                <p className="card-text"><small className="text-muted">Author: {post.username}</small></p>
                <Link to={`/post/${post.id}`} className="btn btn-primary">View Post</Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
