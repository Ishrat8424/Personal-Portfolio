import { useEffect, useState } from "react";
import { getPortfolio } from "../../services/portfolioService";

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
      if (!portfolio?.resume) {
        throw new Error("Resume is unavailable");
      }

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

  return (
    <section
      id="home"
      className="relative overflow-hidden min-h-screen flex items-center justify-center pt-24 scroll-mt-24"
    >
      {/* Background Blobs */}
      <div className="absolute inset-0 overflow-hidden -z-10">
        <div className="blob w-96 h-96 bg-blue-500 top-10 left-10"></div>

        <div className="blob w-[450px]h-[450px] bg-cyan-400 bottom-0 right-0"></div>

        <div className="blob w-80 h-80 bg-indigo-400 top-1/2 left-1/2"></div>

        <div className="blob w-72 h-72 bg-purple-400 bottom-10 left-20"></div>
      </div>

      <div className="w-full max-w-7xl mx-auto px-6 flex flex-col-reverse lg:flex-row items-center justify-between gap-12 lg:gap-16">

        {/* Left Side */}
        <div className="flex-1 text-center lg:text-left">

          <p className="text-lg md:text-xl text-gray-600">
            Hello, I'm
          </p>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mt-3 break-words">
            {portfolio?.fullName || "Your Name"}
          </h1>

          <h2 className="text-2xl lg:text-3xl text-blue-600 font-semibold mt-4">
            {portfolio?.title || "Developer"}
          </h2>

          <p className="mt-6 text-gray-600 leading-8 max-w-xl mx-auto lg:mx-0">
            {portfolio?.heroDescription || "Welcome to my portfolio."}
          </p>

          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">

            <button
              onClick={() =>
                document
                  .getElementById("projects")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="bg-blue-600 hover:bg-blue-700 text-white px-7 py-3 rounded-xl shadow-lg transition"
            >
              View Projects
            </button>

            <button
              onClick={handleDownloadResume}
              className="border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-7 py-3 rounded-xl transition"
            >
              Download Resume
            </button>

          </div>

        </div>

    {/* Right Side */}
<div className="flex-1 flex justify-center">

  <img
    src={
      portfolio?.profileImage ||
      "https://via.placeholder.com/500"
    }
    alt={portfolio?.fullName || "Profile"}
    className="animate-float w-full max-w-[420px] h-auto aspect-[5/6] object-cover shadow-2xl"
    style={{
      borderRadius: "42% 58% 56% 44% / 40% 42% 58% 60%",
    }}
  />

</div>

      </div>
    </section>
  );
}

export default Hero;