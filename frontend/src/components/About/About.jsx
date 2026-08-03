import { useEffect, useState } from "react";
import { getPortfolio } from "../../services/portfolioService";


function About() {
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

  if (!portfolio) return null;

  return (
    
    <section
      id="about"
      className="py-20 bg-white scroll-mt-24"
    >
      <div className="max-w-5xl mx-auto px-6">

        <h2 className="text-4xl font-bold text-center mb-10">
          About Me
        </h2>

        <p className="text-gray-700 text-lg leading-8 text-center">
          {portfolio.about}
        </p>

      </div>
    </section>
  );
}

export default About;