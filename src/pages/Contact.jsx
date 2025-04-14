import React, { useState } from "react";
import Navbar from "../components/Navbar";
import backgroundImage from '/assets/landing-page/background.jpg';
import LoadingSpinner from "../components/LoadingSpinner";

const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    subject: "",
    message: ""
  });
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSuccess(false);

    try {
      const response = await fetch("https://formspree.io/f/xovelwal", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setSuccess(true);
        setFormData({ email: "", subject: "", message: "" });
      } else {
        alert("There was a problem submitting your message.");
      }
    } catch (error) {
      console.error("Submit failed:", error);
      alert("There was an error. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative w-full min-h-screen">
      <div
        className="fixed inset-0 bg-cover bg-center -z-10"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          filter: "contrast(100%) brightness(30%)",
        }}
      ></div>

      <Navbar className="relative z-20" />

      {isSubmitting && <LoadingSpinner />}

      <section className="relative z-10 flex justify-center items-center min-h-[calc(100vh-4rem)] pt-16 pb-8 px-4">
        <div className="w-full max-w-4xl bg-gray-800/90 backdrop-blur-sm rounded-xl shadow-2xl p-6 sm:p-8 md:p-10">
          <h2 className="mb-6 text-3xl font-bold text-center text-amber-400">Contact Us</h2>

          {success && (
            <p className="mb-4 text-green-400 text-center">
              Your message has been sent successfully!
            </p>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block mb-2 text-sm font-medium text-amber-100">
                Your email
              </label>
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-3 text-gray-900 bg-gray-100 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-400 focus:border-amber-400"
                placeholder="name@example.com"
                required
              />
            </div>

            <div>
              <label htmlFor="subject" className="block mb-2 text-sm font-medium text-amber-100">
                Subject
              </label>
              <input
                type="text"
                id="subject"
                value={formData.subject}
                onChange={handleChange}
                className="w-full p-3 text-gray-900 bg-gray-100 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-400 focus:border-amber-400"
                placeholder="How can we help you?"
                required
              />
            </div>

            <div>
              <label htmlFor="message" className="block mb-2 text-sm font-medium text-amber-100">
                Your message
              </label>
              <textarea
                id="message"
                value={formData.message}
                onChange={handleChange}
                rows="5"
                className="w-full p-3 text-gray-900 bg-gray-100 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-400 focus:border-amber-400"
                placeholder="Tell us about your project or inquiry..."
                required
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full py-3 px-5 text-sm font-medium text-center text-white bg-amber-600 rounded-lg hover:bg-amber-700 focus:ring-4 focus:outline-none focus:ring-amber-400 transition-colors"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Contact;
