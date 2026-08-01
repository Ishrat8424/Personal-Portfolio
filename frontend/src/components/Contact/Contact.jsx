import { useState } from "react";
import { sendMessage } from "../../services/contactService";

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
      className="py-20 bg-gray-50"
    >
      <div className="max-w-6xl mx-auto px-6">

        <h2 className="text-4xl font-bold text-center mb-3">
          Contact Me
        </h2>

        <p className="text-center text-gray-500 mb-12">
          Have a project or opportunity? Feel free to reach out.
        </p>

        <div className="grid md:grid-cols-2 gap-12">

          {/* Left Side */}
          <div>
            <h3 className="text-2xl font-semibold mb-6">
              Let's Connect
            </h3>

            <div className="space-y-4">

              <div>
                <p className="font-semibold">Email</p>
                <p className="text-gray-600">
                  ijkhazi4@gmail.com
                </p>
              </div>

              <div>
                <p className="font-semibold">Phone</p>
                <p className="text-gray-600">
                  +91 7259358424
                </p>
              </div>

              <div>
                <p className="font-semibold">Location</p>
                <p className="text-gray-600">
                  Kundapura, Karnataka
                </p>
              </div>

            </div>
          </div>

          {/* Right Side */}
          <form
            onSubmit={handleSubmit}
            className="bg-white p-8 rounded-xl shadow-lg space-y-5"
          >

            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={form.name}
              onChange={handleChange}
              className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />

            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={form.email}
              onChange={handleChange}
              className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />

            <textarea
              name="message"
              rows="6"
              placeholder="Write your message..."
              value={form.message}
              onChange={handleChange}
              className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
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