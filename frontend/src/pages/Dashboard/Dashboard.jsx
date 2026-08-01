import { Link, Outlet, useNavigate } from "react-router-dom";
import {
  FaHome,
  FaUser,
  FaProjectDiagram,
  FaCode,
  FaBriefcase,
  FaEnvelope,
  FaSignOutAlt,
} from "react-icons/fa";

function Dashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 text-white p-6">
        <h2 className="text-2xl font-bold mb-10">
          Portfolio Admin
        </h2>

        <nav className="space-y-5">

          <Link
            to="/dashboard"
            className="flex items-center gap-3 hover:text-cyan-400"
          >
            <FaHome />
            Dashboard
          </Link>

          <Link
            to="/dashboard/portfolio"
            className="flex items-center gap-3 hover:text-cyan-400"
          >
            <FaUser />
            Portfolio
          </Link>

          <Link
            to="/dashboard/projects"
            className="flex items-center gap-3 hover:text-cyan-400"
          >
            <FaProjectDiagram />
            Projects
          </Link>
<Link
  to="/dashboard/skills"
  className="flex items-center gap-3 hover:text-cyan-400"
>
  <FaCode />
  Skills
</Link>
          <Link
            to="/dashboard/experience"
            className="flex items-center gap-3 hover:text-cyan-400"
          >
            <FaBriefcase />
            Experience
          </Link>

          <Link
            to="/dashboard/contacts"
            className="flex items-center gap-3 hover:text-cyan-400"
          >
            <FaEnvelope />
            Contacts
          </Link>

          <button
            onClick={handleLogout}
            className="flex items-center gap-3 text-red-400 mt-10 hover:text-red-300"
          >
            <FaSignOutAlt />
            Logout
          </button>

        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        <Outlet />
      </main>
    </div>
  );
}

export default Dashboard;