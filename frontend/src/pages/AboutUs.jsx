import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

const AboutUs = ({ darkMode }) => {
  return (
    <div
      className={`min-h-screen w-full py-16 px-4 flex flex-col theme-transition ${
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
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h1
            className={`text-5xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'} mb-6`}
          >
            About Us
          </h1>
          <h2
            className={`text-2xl ${darkMode ? 'text-blue-400' : 'text-blue-600'} font-semibold mb-4`}
          >
            Simplifying Tech Discovery for Everyone
          </h2>
          <p
            className={`text-lg ${darkMode ? 'text-gray-300' : 'text-gray-600'} max-w-4xl mx-auto leading-relaxed`}
          >
            In today's rapidly evolving technology landscape, finding the right tech products can be overwhelming.
            With countless options, specifications, and features to compare, consumers and businesses often struggle
            to make informed decisions quickly and efficiently.
          </p>
          <p
            className={`text-xl ${darkMode ? 'text-white' : 'text-gray-900'} font-medium mt-4`}
          >
            That's where we come in.
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
            className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'} mb-6 text-center`}
          >
            Our Mission
          </h2>
          <p
            className={`text-lg ${darkMode ? 'text-gray-300' : 'text-gray-600'} leading-relaxed text-center max-w-4xl mx-auto`}
          >
            We are dedicated to revolutionizing how people discover and evaluate tech products. Our platform
            leverages advanced search algorithms and comprehensive product databases to help users find exactly
            what they need in seconds, not hours.
          </p>
        </div>

        <div className="mb-12">
          <h2
            className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'} mb-8 text-center`}
          >
            What We Do
          </h2>
          <p
            className={`text-lg ${darkMode ? 'text-gray-300' : 'text-gray-600'} mb-8 text-center max-w-4xl mx-auto`}
          >
            Our cutting-edge platform aggregates and analyzes thousands of tech products from smartphones
            and laptops to enterprise software and emerging technologies.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                emoji: '🎯',
                title: 'Intelligent Product Matching',
                desc: 'Smart algorithms that understand your specific needs and recommend the most suitable options',
              },
              {
                emoji: '📊',
                title: 'Comprehensive Comparisons',
                desc: 'Side-by-side analysis of features, specifications, and pricing',
              },
              {
                emoji: '🔄',
                title: 'Real-time Updates',
                desc: 'Stay current with the latest product releases and market trends',
              },
              {
                emoji: '💡',
                title: 'Expert Insights',
                desc: 'Professional reviews and technical analysis to guide your decisions',
              },
            ].map((item, i) => (
              <div
                key={i}
                className={`bg-${darkMode ? 'gray-800' : 'white'} rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow`}
              >
                <div className={`w-12 h-12 bg-${darkMode ? 'blue-900' : 'blue-100'} rounded-lg flex items-center justify-center mb-4`}>
                  <span className={`text-2xl ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>{item.emoji}</span>
                </div>
                <h3
                  className={`text-xl font-semibold ${darkMode ? 'text-white' : 'text-gray-900'} mb-3`}
                >
                  {item.title}
                </h3>
                <p className={darkMode ? 'text-gray-300' : 'text-gray-600'}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div
          className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 mb-12"
          style={{ background: 'linear-gradient(135deg, var(--primary) 0%, #8b5cf6 100%)' }}
        >
          <h2
            className={`text-3xl font-bold text-white mb-8 text-center`}
          >
            Why Choose TeachGear Store
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: '⚡', title: 'Speed', text: 'Find what you need in minutes, not days of research' },
              { icon: '🎯', title: 'Accuracy', text: 'Our data-driven approach ensures reliable product information' },
              { icon: '📚', title: 'Comprehensiveness', text: 'Access to the most extensive tech product database available' },
              { icon: '👥', title: 'User-Focused', text: 'Designed by tech professionals who understand your challenges' },
            ].map((item, i) => (
              <div key={i} className="text-center">
                <div className="text-4xl mb-3 text-white">{item.icon}</div>
                <h3 className="text-xl font-semibold text-white mb-2">{item.title}</h3>
                <p className="text-white">{item.text}</p>
              </div>
            ))}
          </div>
        </div>

        <div
          className={`bg-${darkMode ? 'gray-800/90' : 'white/90'} rounded-2xl shadow-lg p-8 mb-12`}
          style={{
            backgroundColor: darkMode ? 'var(--bg-card)' : '#ffffff',
            borderColor: darkMode ? 'var(--border-color)' : '#e5e7eb',
          }}
        >
          <h2
            className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'} mb-6 text-center`}
          >
            Our Commitment
          </h2>
          <div className="max-w-4xl mx-auto">
            <p
              className={`text-lg ${darkMode ? 'text-gray-300' : 'text-gray-600'} leading-relaxed mb-6 text-center`}
            >
              We believe technology should enhance lives and drive progress. By making tech product discovery
              faster and more intuitive, we empower individuals and businesses to make confident decisions
              that accelerate their success.
            </p>
            <p
              className={`text-lg ${darkMode ? 'text-gray-300' : 'text-gray-600'} leading-relaxed text-center`}
            >
              Whether you're a consumer looking for the perfect device, a startup building your tech stack,
              or an enterprise upgrading your infrastructure, we're here to connect you with the technology
              solutions that match your exact requirements.
            </p>
          </div>
        </div>

        <div
          className={`bg-${darkMode ? 'gray-800/90' : 'gray-800'} rounded-2xl p-8`}
          style={{
            backgroundColor: darkMode ? 'var(--bg-card)' : '#1f2937',
          }}
        >
          <h2
            className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-white'} mb-8 text-center`}
          >
            Contact Us
          </h2>
          <div className="grid md:grid-cols-3 gap-6 text-center">
            {[
              { icon: '📧', title: 'Email', info: 'support@teachgear.com' },
              { icon: '📞', title: 'Phone', info: '+977 980-123-4567' },
              { icon: '📍', title: 'Address', info: 'Thamel, Kathmandu, Nepal' },
            ].map((item, i) => (
              <div key={i}>
                <div className="text-3xl mb-3 text-white">{item.icon}</div>
                <h3
                  className={`text-xl font-semibold ${darkMode ? 'text-white' : 'text-white'} mb-2`}
                >
                  {item.title}
                </h3>
                <p className={darkMode ? 'text-gray-300' : 'text-gray-100'}>{item.info}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <p className={darkMode ? 'text-white' : 'text-white'}>
              Ready to discover your next tech solution?{' '}
              <Link
                to="/products"
                className={`font-bold ${darkMode ? 'text-indigo-400' : 'text-indigo-600'} hover:underline`}
              >
                Start exploring our platform today
              </Link>
              .
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
