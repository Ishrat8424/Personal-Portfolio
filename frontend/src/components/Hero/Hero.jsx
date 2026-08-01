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

  if (!portfolio) {
    return (
      <section className="min-h-screen flex items-center justify-center">
        <h2 className="text-2xl font-bold">Loading...</h2>
      </section>
    );
  }

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-50 to-white pt-24"
    >
      <div className="text-center">

        <p className="text-xl text-gray-600">
          Hello, I'm
        </p>

        <h1 className="text-6xl font-bold text-gray-800 mt-2">
          {portfolio.fullName}
        </h1>

        <h2 className="text-3xl text-blue-600 mt-4 font-semibold">
          {portfolio.title}
        </h2>

        <p className="max-w-2xl mx-auto mt-6 text-gray-600">
          {portfolio.about}
        </p>

        <div className="mt-8 flex justify-center gap-4">

          <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700">
            View Projects
          </button>

          <button className="border border-blue-600 text-blue-600 px-6 py-3 rounded-lg hover:bg-blue-600 hover:text-white">
            Download Resume
          </button>

        </div>

      </div>
    </section>
  );
}

export default Hero;