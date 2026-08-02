import { Link, Outlet, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  FaHome,
  FaUser,
  FaProjectDiagram,
  FaCode,
  FaBriefcase,
  FaEnvelope,
  FaSignOutAlt,
  FaMoon,
  FaSun,
} from "react-icons/fa";

function Dashboard() {
  const navigate = useNavigate();

  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  useEffect(() => {
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div
      className={`flex h-screen overflow-hidden transition-all duration-300 ${
        darkMode
          ? "bg-slate-950 text-white"
          : "bg-gray-100 text-gray-900"
      }`}
    >
      {/* Sidebar */}
      <aside
        className={`w-64 h-screen flex flex-col p-6 transition-all duration-300 ${
          darkMode
            ? "bg-slate-900 border-r border-slate-700"
            : "bg-slate-900 border-r border-slate-800"
        } text-white`}
      >
        <h2 className="text-2xl font-bold mb-10 text-cyan-400">
          Portfolio Admin
        </h2>

        {/* Navigation */}
        <nav className="flex-1 space-y-2 overflow-y-auto">
          <Link
            to="/dashboard"
            className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-cyan-600 hover:text-white transition-all"
          >
            <FaHome />
            Dashboard
          </Link>

          <Link
            to="/dashboard/portfolio"
            className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-cyan-600 hover:text-white transition-all"
          >
            <FaUser />
            Portfolio
          </Link>

          <Link
            to="/dashboard/projects"
            className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-cyan-600 hover:text-white transition-all"
          >
            <FaProjectDiagram />
            Projects
          </Link>

          <Link
            to="/dashboard/skills"
            className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-cyan-600 hover:text-white transition-all"
          >
            <FaCode />
            Skills
          </Link>

          <Link
            to="/dashboard/experience"
            className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-cyan-600 hover:text-white transition-all"
          >
            <FaBriefcase />
            Experience
          </Link>

          <Link
            to="/dashboard/contacts"
            className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-cyan-600 hover:text-white transition-all"
          >
            <FaEnvelope />
            Contacts
          </Link>
        </nav>

        <div className="border-t border-slate-700 pt-6 mt-6">
          {/* Theme Button */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-yellow-400 hover:bg-yellow-500 hover:text-black transition-all"
          >
            {darkMode ? <FaSun /> : <FaMoon />}
            {darkMode ? "Light Mode" : "Dark Mode"}
          </button>

          {/* Logout */}
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-400 hover:bg-red-600 hover:text-white transition-all mt-3"
          >
            <FaSignOutAlt />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main
        className={`flex-1 h-screen overflow-y-auto p-8 transition-all duration-300 ${
          darkMode
            ? "bg-slate-950 text-white"
            : "bg-gray-100 text-gray-900"
        }`}
      >
        <Outlet context={{ darkMode }} />
      </main>
    </div>
  );
}

export default Dashboard;