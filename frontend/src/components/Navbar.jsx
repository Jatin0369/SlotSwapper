import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const nav = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    nav("/");
  };

  return (
    <nav className="bg-black/40 backdrop-blur-md text-white px-6 py-4 flex items-center gap-6 border-b border-gray-700">
      <Link to="/dashboard" className="hover:text-blue-400">
        Dashboard
      </Link>

      <Link to="/events" className="hover:text-blue-400">
        Events
      </Link>

      <Link to="/marketplace" className="hover:text-blue-400">
        Marketplace
      </Link>

      <Link to="/requests" className="hover:text-blue-400">
        Requests
      </Link>

      <button
        className="ml-auto text-red-400 hover:text-red-300"
        onClick={handleLogout}
      >
        Logout
      </button>
    </nav>
  );
}
