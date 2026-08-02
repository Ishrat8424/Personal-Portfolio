import { useState } from "react";
import { sendMessage } from "../../services/contactService";

import {
  FaEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaGithub,
  FaLinkedin,
} from "react-icons/fa";

function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      await sendMessage(form);

      alert("Message Sent Successfully!");

      setForm({
        name: "",
        email: "",
        message: "",
      });
    } catch (error) {
      alert(error.response?.data?.message || "Failed to send message");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="contact"
      className="py-20 bg-gradient-to-b from-gray-100 to-white"
    >
      <div className="max-w-7xl mx-auto px-6">

        <h2 className="text-4xl font-bold text-center mb-4">
          Contact Me
        </h2>

        <p className="text-center text-gray-500 mb-12">
          Have a project, internship opportunity, or collaboration in mind?
          I'd love to hear from you.
        </p>

        <div className="grid lg:grid-cols-2 gap-10">

          {/* Left Side */}
          <div className="bg-white rounded-2xl shadow-lg p-8">

            <h3 className="text-2xl font-bold mb-8">
              Let's Connect
            </h3>

            <div className="space-y-6">

              <div className="flex items-center gap-4">
                <div className="bg-blue-100 p-4 rounded-full">
                  <FaEnvelope className="text-blue-600 text-xl" />
                </div>

                <div>
                  <h4 className="font-semibold">Email</h4>

                  <a
                    href="mailto:ijkhazi4@gmail.com"
                    className="text-gray-600 hover:text-blue-600"
                  >
                    ijkhazi4@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="bg-green-100 p-4 rounded-full">
                  <FaPhoneAlt className="text-green-600 text-xl" />
                </div>

                <div>
                  <h4 className="font-semibold">Phone</h4>

                  <a
                    href="tel:+917259358424"
                    className="text-gray-600 hover:text-green-600"
                  >
                    +91 7259358424
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="bg-red-100 p-4 rounded-full">
                  <FaMapMarkerAlt className="text-red-600 text-xl" />
                </div>

                <div>
                  <h4 className="font-semibold">Location</h4>

                  <p className="text-gray-600">
                    Kundapura, Karnataka, India
                  </p>
                </div>
              </div>

            </div>

            {/* Social Links */}
            <div className="mt-10">

              <h4 className="font-semibold mb-4">
                Follow Me
              </h4>

              <div className="flex gap-5">

                <a
                  href="https://github.com/ishrat8424"
                  target="_blank"
                  rel="noreferrer"
                  className="bg-gray-900 text-white p-4 rounded-full hover:scale-110 transition"
                >
                  <FaGithub size={22} />
                </a>

                <a
                  href="https://linkedin.com/in/ishrat-jahan-khazi"
                  target="_blank"
                  rel="noreferrer"
                  className="bg-blue-600 text-white p-4 rounded-full hover:scale-110 transition"
                >
                  <FaLinkedin size={22} />
                </a>

              </div>

            </div>

            {/* Optional Google Maps */}
            <div className="mt-10 rounded-xl overflow-hidden shadow">

              <iframe
                title="Location"
                src="https://www.google.com/maps?q=Kundapura,Karnataka&output=embed"
                width="100%"
                height="250"
                loading="lazy"
                allowFullScreen
              ></iframe>

            </div>

          </div>

          {/* Right Side */}
          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-2xl shadow-lg p-8 space-y-5"
          >

            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={form.name}
              onChange={handleChange}
              className="w-full border rounded-lg p-4 focus:ring-2 focus:ring-blue-500 outline-none"
              required
            />

            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={form.email}
              onChange={handleChange}
              className="w-full border rounded-lg p-4 focus:ring-2 focus:ring-blue-500 outline-none"
              required
            />

            <textarea
              name="message"
              rows="7"
              placeholder="Write your message..."
              value={form.message}
              onChange={handleChange}
              className="w-full border rounded-lg p-4 focus:ring-2 focus:ring-blue-500 outline-none"
              required
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-4 rounded-lg hover:bg-blue-700 transition font-semibold disabled:opacity-50"
            >
              {loading ? "Sending..." : "Send Message"}
            </button>

          </form>

        </div>

      </div>
    </section>
  );
}

export default Contact;