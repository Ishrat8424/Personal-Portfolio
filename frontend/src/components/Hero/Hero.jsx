function Hero() {
  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-50 to-white pt-24"
    >
      <div className="text-center">
        <p className="text-xl text-gray-600">Hello, I'm</p>

        <h1 className="text-6xl font-bold text-gray-800 mt-2">
          Ishrat Jahan Mohammed Afzal Khazi
        </h1>

        <h2 className="text-3xl text-blue-600 mt-4 font-semibold">
          Full Stack MERN Developer
        </h2>

        <p className="max-w-2xl mx-auto mt-6 text-gray-600">
          Passionate Computer Science student specializing in MERN Stack
          Development, Data Analytics, and Artificial Intelligence.
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