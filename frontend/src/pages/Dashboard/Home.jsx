import { useEffect, useState } from "react";
import { getProjects } from "../../services/projectService";
import { getExperiences } from "../../services/experienceService";
import { getContacts } from "../../services/contactService";
import { getPortfolio } from "../../services/portfolioService";

function Home() {
  const [stats, setStats] = useState({
    portfolio: 0,
    projects: 0,
    experiences: 0,
    contacts: 0,
  });

  useEffect(() => {
    const loadData = async () => {
      try {
        const portfolio = await getPortfolio();
        const projects = await getProjects();
        const experiences = await getExperiences();
        const contacts = await getContacts();

        setStats({
          portfolio: portfolio ? 1 : 0,
          projects: projects.length,
          experiences: experiences.length,
          contacts: contacts.length,
        });
      } catch (error) {
        console.log(error);
      }
    };

    loadData();
  }, []);

  return (
    <div>
      <h1 className="text-4xl font-bold mb-8">
        Welcome Admin 👋
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

        <div className="bg-white shadow rounded-xl p-6">
          <h2 className="text-lg font-semibold">Portfolio</h2>
          <p className="text-4xl font-bold mt-3">{stats.portfolio}</p>
        </div>

        <div className="bg-white shadow rounded-xl p-6">
          <h2 className="text-lg font-semibold">Projects</h2>
          <p className="text-4xl font-bold mt-3">{stats.projects}</p>
        </div>

        <div className="bg-white shadow rounded-xl p-6">
          <h2 className="text-lg font-semibold">Experience</h2>
          <p className="text-4xl font-bold mt-3">{stats.experiences}</p>
        </div>

        <div className="bg-white shadow rounded-xl p-6">
          <h2 className="text-lg font-semibold">Messages</h2>
          <p className="text-4xl font-bold mt-3">{stats.contacts}</p>
        </div>

      </div>
    </div>
  );
}

export default Home;