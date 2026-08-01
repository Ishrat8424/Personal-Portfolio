import { useEffect, useState } from "react";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";
import { getPortfolio } from "../../services/portfolioService";

function Footer() {
  const [portfolio, setPortfolio] = useState({});

  useEffect(() => {
    const fetchPortfolio = async () => {
      try {
        const data = await getPortfolio();
        setPortfolio(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchPortfolio();
  }, []);

  return (
    <footer className="bg-slate-900 text-white py-10">
      <div className="max-w-6xl mx-auto px-6">

        <h2 className="text-2xl font-bold">
          {portfolio.fullName}
        </h2>

        <p className="text-gray-400 mt-2">
          {portfolio.title}
        </p>

        <div className="flex gap-6 mt-6 text-2xl">

          <a
            href={portfolio.github}
            target="_blank"
            rel="noreferrer"
            className="hover:text-blue-400"
          >
            <FaGithub />
          </a>

          <a
            href={portfolio.linkedin}
            target="_blank"
            rel="noreferrer"
            className="hover:text-blue-400"
          >
            <FaLinkedin />
          </a>

          <a
            href={`mailto:${portfolio.email}`}
            className="hover:text-blue-400"
          >
            <FaEnvelope />
          </a>

        </div>

        <hr className="my-6 border-gray-700" />

        <p className="text-center text-gray-400">
          © {new Date().getFullYear()} {portfolio.fullName}. All Rights Reserved.
        </p>

      </div>
    </footer>
  );
}

export default Footer;