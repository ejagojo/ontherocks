import React from "react";
import { useState } from "react";
import Navbar from "../components/Navbar";
import backgroundImage from '../assets/landing-page/background.jpg';
import LoadingSpinner from "../components/LoadingSpinner";

const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
    }, 2000);
  };
  return (
    <div className="relative w-full min-h-screen">
      {/* Background Image */}
      <div
        className="fixed inset-0 bg-cover bg-center -z-10"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          filter: "contrast(100%) brightness(30%)",
        }}
      ></div>

      <Navbar className="relative z-20" />

      {isSubmitting && <LoadingSpinner />}

      {/* Main Content Area */}
      <section className="relative z-10 flex justify-center items-center min-h-[calc(100vh-4rem)] pt-16 pb-8 px-4">
        <div className="w-full max-w-4xl bg-gray-800/90 backdrop-blur-sm rounded-xl shadow-2xl p-6 sm:p-8 md:p-10">
          <h2 className="mb-6 text-3xl font-bold text-center text-amber-400">Contact Us</h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block mb-2 text-sm font-medium text-amber-100">
                Your email
              </label>
              <input
                type="email"
                id="email"
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
                rows="5"
                className="w-full p-3 text-gray-900 bg-gray-100 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-400 focus:border-amber-400"
                placeholder="Tell us about your project or inquiry..."
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