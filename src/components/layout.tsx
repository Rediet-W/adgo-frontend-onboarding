import { Link, Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div>
      <nav className="mb-3">
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/page">Page</Link>
      </nav>
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
