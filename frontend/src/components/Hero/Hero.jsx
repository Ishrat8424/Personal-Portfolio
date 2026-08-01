import { useEffect, useState } from "react";
import { getPortfolio } from "../../services/portfolioService";
import { ArrowDownTrayIcon } from "@heroicons/react/24/outline";
function Hero() {
  const [portfolio, setPortfolio] = useState(null);

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
const handleDownloadResume = async () => {
  try {
    const response = await fetch(portfolio.resume);

    if (!response.ok) {
      throw new Error("Failed to download resume");
    }

    const blob = await response.blob();

    const blobUrl = window.URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = blobUrl;
    link.download = "Ishrat_Jahan_Khazi_Resume.pdf";

    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);
    window.URL.revokeObjectURL(blobUrl);
  } catch (error) {
    console.error(error);
    alert("Unable to download resume.");
  }
};
  if (!portfolio) return null;

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-50 to-white pt-24"
    >
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-12">

        {/* Left Side */}
        <div className="flex-1">
          <p className="text-xl text-gray-600">
            Hello, I'm
          </p>

          <h1 className="text-5xl md:text-6xl font-bold mt-3">
            {portfolio.fullName}
          </h1>

          <h2 className="text-3xl text-blue-600 font-semibold mt-4">
            {portfolio.title}
          </h2>

          <p className="mt-6 text-gray-600 max-w-xl">
            {portfolio.heroDescription}
          </p>

          <div className="mt-8 flex gap-4">
            <button className="bg-blue-600 text-white px-6 py-3 rounded-lg">
              View Projects
            </button>

           <button
  onClick={handleDownloadResume}
  className="border border-blue-600 text-blue-600 px-6 py-3 rounded-lg hover:bg-blue-600 hover:text-white"
>
  Download Resume
</button>
          </div>
        </div>

        {/* Right Side */}
        <div className="flex-1 flex justify-center">
          <img
            src={
              portfolio.profileImage ||
              "https://via.placeholder.com/300"
            }
            alt={portfolio.fullName}
            className="w-80 h-80 rounded-full object-cover border-8 border-white shadow-2xl"
          />
        </div>

      </div>
    </section>
  );
}

export default Hero;