import { Link } from "react-router-dom"; // Импортируем Link для маршрутов

const Navbar = () => {
  return (
    <nav>
      <Link to="/">Home</Link> {/* Ссылка на главную страницу */}
      <Link to="/create">Create Post</Link> {/* Ссылка на страницу создания поста */}
    </nav>
  );
};

export default Navbar;
