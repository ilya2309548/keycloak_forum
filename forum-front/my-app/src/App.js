import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import PostDetail from "./pages/PostDetail";
import CreatePost from "./pages/CreatePost";
import Navbar from "./components/Navbar";
import { AuthProvider } from "./auth/AuthProvider"; // Импортируем AuthProvider

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar /> {/* Навигационная панель */}
        <Routes>
          <Route path="/" element={<Home />} /> {/* Главная страница */}
          <Route path="/post/:postId" element={<PostDetail />} /> {/* Страница поста по ID */}
          <Route path="/create" element={<CreatePost />} /> {/* Страница создания поста */}
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
