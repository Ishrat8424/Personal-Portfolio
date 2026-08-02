import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { getProjects } from "../../services/projectService";
import { getExperiences } from "../../services/experienceService";
import { getContacts } from "../../services/contactService";
import { getPortfolio } from "../../services/portfolioService";
import { getSkills } from "../../services/skillService";

function Home() {
  const { darkMode } = useOutletContext();

  const [stats, setStats] = useState({
    portfolio: 0,
    projects: 0,
    experiences: 0,
    contacts: 0,
    skills: 0,
    unread: 0,
  });

  useEffect(() => {
    const loadData = async () => {
      try {
        const portfolio = await getPortfolio();
        const projects = await getProjects();
        const experiences = await getExperiences();
        const contacts = await getContacts();
        const skills = await getSkills();

        setStats({
          portfolio: portfolio ? 1 : 0,
          projects: projects.length,
          experiences: experiences.length,
          contacts: contacts.length,
          skills: skills.length,
          unread: contacts.filter((item) => !item.isRead).length,
        });
      } catch (error) {
        console.log(error);
      }
    };

    loadData();
  }, []);

  return (
    <div
      className={`min-h-screen p-8 transition-all duration-300 ${
        darkMode
          ? "bg-slate-950 text-white"
          : "bg-gray-100 text-gray-900"
      }`}
    >
      {/* Header */}
      <div className="flex justify-between items-center mb-10">
        <div>
          <h1
            className={`text-4xl font-bold ${
              darkMode ? "text-white" : "text-gray-900"
            }`}
          >
            Welcome Admin 👋
          </h1>

          <p
            className={`mt-2 ${
              darkMode ? "text-gray-400" : "text-gray-500"
            }`}
          >
            Here's an overview of your portfolio.
          </p>
        </div>
      </div>

      {/* Dashboard Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {/* Portfolio */}
        <div
          className={`rounded-xl shadow-lg p-6 transition-all duration-300 ${
            darkMode
              ? "bg-slate-900 border border-slate-700"
              : "bg-white border border-gray-200"
          }`}
        >
          <h2
            className={`text-lg font-semibold ${
              darkMode ? "text-gray-200" : "text-gray-700"
            }`}
          >
            Portfolio
          </h2>

          <p className="text-5xl font-bold text-blue-500 mt-4">
            {stats.portfolio}
          </p>
        </div>

        {/* Projects */}
        <div
          className={`rounded-xl shadow-lg p-6 transition-all duration-300 ${
            darkMode
              ? "bg-slate-900 border border-slate-700"
              : "bg-white border border-gray-200"
          }`}
        >
          <h2
            className={`text-lg font-semibold ${
              darkMode ? "text-gray-200" : "text-gray-700"
            }`}
          >
            Projects
          </h2>

          <p className="text-5xl font-bold text-green-500 mt-4">
            {stats.projects}
          </p>
        </div>

        {/* Skills */}
        <div
          className={`rounded-xl shadow-lg p-6 transition-all duration-300 ${
            darkMode
              ? "bg-slate-900 border border-slate-700"
              : "bg-white border border-gray-200"
          }`}
        >
          <h2
            className={`text-lg font-semibold ${
              darkMode ? "text-gray-200" : "text-gray-700"
            }`}
          >
            Skills
          </h2>

          <p className="text-5xl font-bold text-purple-500 mt-4">
            {stats.skills}
          </p>
        </div>

        {/* Experience */}
        <div
          className={`rounded-xl shadow-lg p-6 transition-all duration-300 ${
            darkMode
              ? "bg-slate-900 border border-slate-700"
              : "bg-white border border-gray-200"
          }`}
        >
          <h2
            className={`text-lg font-semibold ${
              darkMode ? "text-gray-200" : "text-gray-700"
            }`}
          >
            Experience
          </h2>

          <p className="text-5xl font-bold text-orange-500 mt-4">
            {stats.experiences}
          </p>
        </div>

        {/* Messages */}
        <div
          className={`rounded-xl shadow-lg p-6 transition-all duration-300 ${
            darkMode
              ? "bg-slate-900 border border-slate-700"
              : "bg-white border border-gray-200"
          }`}
        >
          <h2
            className={`text-lg font-semibold ${
              darkMode ? "text-gray-200" : "text-gray-700"
            }`}
          >
            Messages
          </h2>

          <p className="text-5xl font-bold text-pink-500 mt-4">
            {stats.contacts}
          </p>
        </div>

        {/* Unread Messages */}
        <div
          className={`rounded-xl shadow-lg p-6 transition-all duration-300 ${
            darkMode
              ? "bg-slate-900 border border-slate-700"
              : "bg-white border border-gray-200"
          }`}
        >
          <h2
            className={`text-lg font-semibold ${
              darkMode ? "text-gray-200" : "text-gray-700"
            }`}
          >
            Unread Messages
          </h2>

          <p className="text-5xl font-bold text-red-500 mt-4">
            {stats.unread}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Home;