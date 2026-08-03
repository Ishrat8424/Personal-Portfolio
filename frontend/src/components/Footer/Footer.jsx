import { useEffect, useState } from "react";
import {
  FaGithub,
  FaLinkedin,
  FaEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaArrowUp,
} from "react-icons/fa";
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

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="bg-slate-900 text-white scroll-mt-24">

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-6 py-14">

        <div className="grid md:grid-cols-3 gap-10">

          {/* About */}
          <div>
            <h2 className="text-3xl font-bold text-blue-400">
              {portfolio.fullName}
            </h2>

            <p className="mt-3 text-gray-300">
              {portfolio.title}
            </p>

            <p className="mt-4 text-gray-400 leading-7">
              Passionate MERN Stack Developer focused on building
              responsive, scalable and user-friendly web applications.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-semibold mb-5">
              Quick Links
            </h3>

            <ul className="space-y-3 text-gray-400">

              <li>
                <a href="#home" className="hover:text-blue-400">
                  Home
                </a>
              </li>

              <li>
                <a href="#about" className="hover:text-blue-400">
                  About
                </a>
              </li>

              <li>
                <a href="#skills" className="hover:text-blue-400">
                  Skills
                </a>
              </li>

              <li>
                <a href="#projects" className="hover:text-blue-400">
                  Projects
                </a>
              </li>

              <li>
                <a href="#experience" className="hover:text-blue-400">
                  Experience
                </a>
              </li>

              <li>
                <a href="#contact" className="hover:text-blue-400">
                  Contact
                </a>
              </li>

            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-xl font-semibold mb-5">
              Contact
            </h3>

            <div className="space-y-4 text-gray-400">

              <div className="flex items-center gap-3">
                <FaEnvelope className="text-blue-400" />
                <a
                  href={`mailto:${portfolio.email}`}
                  className="hover:text-blue-400"
                >
                  {portfolio.email}
                </a>
              </div>

              <div className="flex items-center gap-3">
                <FaPhoneAlt className="text-blue-400" />
                <a
                  href={`tel:${portfolio.phone}`}
                  className="hover:text-blue-400"
                >
                  {portfolio.phone}
                </a>
              </div>

              <div className="flex items-center gap-3">
                <FaMapMarkerAlt className="text-blue-400" />
                <span>{portfolio.location}</span>
              </div>

            </div>

            {/* Social Icons */}
            <div className="flex gap-4 mt-8">

              <a
                href={portfolio.github}
                target="_blank"
                rel="noreferrer"
                className="bg-gray-800 p-3 rounded-full hover:bg-blue-600 transition"
              >
                <FaGithub size={22} />
              </a>

              <a
                href={portfolio.linkedin}
                target="_blank"
                rel="noreferrer"
                className="bg-gray-800 p-3 rounded-full hover:bg-blue-600 transition"
              >
                <FaLinkedin size={22} />
              </a>

            </div>

          </div>

        </div>

        {/* Divider */}
        <hr className="my-10 border-gray-700" />

        {/* Bottom */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-5">

          <p className="text-gray-400 text-center">
            © {new Date().getFullYear()}{" "}
            <span className="font-semibold text-white">
              {portfolio.fullName}
            </span>
            . All Rights Reserved.
          </p>

          <button
            onClick={scrollToTop}
            className="bg-blue-600 hover:bg-blue-700 p-3 rounded-full transition"
          >
            <FaArrowUp />
          </button>

        </div>

      </div>

    </footer>
  );
}

export default Footer;