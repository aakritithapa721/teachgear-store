import React from 'react';
import { Link } from 'react-router-dom';

const ContactUs = ({ darkMode }) => {
  return (
    <div
      className={`min-h-screen w-full py-16 px-4 flex flex-col items-center theme-transition ${
        darkMode
          ? 'bg-gradient-to-br from-gray-900 via-slate-900 to-indigo-900'
          : 'bg-gradient-to-br from-indigo-200 via-indigo-300 to-purple-300'
      }`}
      style={{
        background: darkMode
          ? 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #1e1b4b 100%)'
          : 'linear-gradient(135deg, #a3bffa 0%, #c4b5fd 50%, #d8b4fe 100%)',
      }}
    >
      <div className="max-w-6xl w-full">
        <div className="text-center mb-16">
          <h1
            className={`text-5xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'} mb-6`}
          >
            Contact Us
          </h1>
          <p
            className={`text-lg ${darkMode ? 'text-gray-300' : 'text-gray-600'} max-w-3xl mx-auto leading-relaxed`}
          >
            We’re here to help you with any questions or concerns. Reach out to us through the details below,
            and we’ll get back to you as soon as possible.
          </p>
        </div>

        <div
          className={`bg-${darkMode ? 'gray-800/90' : 'white/90'} rounded-2xl shadow-lg p-8 mb-12`}
          style={{
            backgroundColor: darkMode ? 'var(--bg-card)' : '#ffffff',
            borderColor: darkMode ? 'var(--border-color)' : '#e5e7eb',
          }}
        >
          <h2
            className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'} mb-8 text-center`}
          >
            Get in Touch
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            {[
              { icon: '📧', title: 'Email', info: 'support@teachgear.com' },
              { icon: '📞', title: 'Phone', info: '+977 980-123-4567' },
              { icon: '📍', title: 'Address', info: 'Thamel, Kathmandu, Nepal' },
            ].map((item, i) => (
              <div key={i} className="flex flex-col items-center">
                <div className={`text-4xl mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                  {item.icon}
                </div>
                <h3
                  className={`text-xl font-semibold ${darkMode ? 'text-gray-200' : 'text-gray-700'} mb-2`}
                >
                  {item.title}
                </h3>
                <p
                  className={`text-lg ${darkMode ? 'text-gray-400' : 'text-gray-600'} break-words`}
                >
                  {item.info}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div
          className={`bg-${darkMode ? 'gray-800/90' : 'white/90'} rounded-2xl shadow-lg p-8`}
          style={{
            backgroundColor: darkMode ? 'var(--bg-card)' : '#ffffff',
            borderColor: darkMode ? 'var(--border-color)' : '#e5e7eb',
          }}
        >
          <h2
            className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'} mb-8 text-center`}
          >
            Send Us a Message
          </h2>
          <form className="max-w-lg mx-auto space-y-6">
            <div>
              <label
                className={`block ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-2`}
              >
                Name
              </label>
              <input
                type="text"
                className={`w-full px-4 py-3 rounded-lg border-2 ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-gray-50 border-gray-200 text-gray-900'} focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                placeholder="Your Name"
              />
            </div>
            <div>
              <label
                className={`block ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-2`}
              >
                Email
              </label>
              <input
                type="email"
                className={`w-full px-4 py-3 rounded-lg border-2 ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-gray-50 border-gray-200 text-gray-900'} focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                placeholder="your@email.com"
              />
            </div>
            <div>
              <label
                className={`block ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-2`}
              >
                Message
              </label>
              <textarea
                className={`w-full px-4 py-3 rounded-lg border-2 ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-gray-50 border-gray-200 text-gray-900'} focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                placeholder="Your Message"
                rows="4"
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white py-3 rounded-lg transition-all duration-300"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;