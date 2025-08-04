import React, { useState } from 'react';
import { Mail, Phone, HelpCircle, X, Plus } from 'lucide-react';

const HelpSupport = () => {
  const [selectedFaq, setSelectedFaq] = useState(null);
  const [contactForm, setContactForm] = useState({
    subject: '',
    message: '',
    category: 'general'
  });

  const faqs = [
    {
      id: 1,
      question: 'How do I reset my password?',
      answer: 'You can reset your password by clicking on "Forgot Password" on the login page. We\'ll send you a reset link via email.'
    },
    {
      id: 2,
      question: 'How do I track my order?',
      answer: 'Once your order is shipped, you\'ll receive a tracking number via email. You can also check your order status in the "My Orders" section of your account.'
    },
    {
      id: 3,
      question: 'What is your return policy?',
      answer: 'We offer a 30-day return policy for most items. Items must be unused and in original packaging. Some restrictions may apply.'
    },
    {
      id: 4,
      question: 'How do I earn loyalty points?',
      answer: 'You earn 1 point for every $1 spent. Bonus points are awarded during special promotions and for certain activities like writing reviews.'
    },
    {
      id: 5,
      question: 'How can I update my payment method?',
      answer: 'Go to the Payment Methods section in your account settings. You can add, remove, or set a default payment method there.'
    }
  ];

  const categories = [
    { value: 'general', label: 'General Inquiry' },
    { value: 'billing', label: 'Billing & Payments' },
    { value: 'orders', label: 'Orders & Shipping' },
    { value: 'technical', label: 'Technical Support' },
    { value: 'account', label: 'Account Issues' }
  ];

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (contactForm.subject && contactForm.message) {
      alert('Your message has been sent! We\'ll get back to you within 24 hours.');
      setContactForm({ subject: '', message: '', category: 'general' });
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Help & Support</h2>
        <p className="text-gray-600">Find answers to common questions or contact our support team</p>
      </div>

      {/* Quick Help Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center">
          <Mail className="mx-auto mb-2 text-blue-600" size={24} />
          <h3 className="font-semibold text-blue-900">Email Support</h3>
          <p className="text-sm text-blue-700 mt-1">support@example.com</p>
          <p className="text-xs text-blue-600 mt-2">Response within 24 hours</p>
        </div>
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
          <Phone className="mx-auto mb-2 text-green-600" size={24} />
          <h3 className="font-semibold text-green-900">Phone Support</h3>
          <p className="text-sm text-green-700 mt-1">1-800-SUPPORT</p>
          <p className="text-xs text-green-600 mt-2">Mon-Fri 9AM-6PM EST</p>
        </div>
        <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 text-center">
          <HelpCircle className="mx-auto mb-2 text-purple-600" size={24} />
          <h3 className="font-semibold text-purple-900">Live Chat</h3>
          <p className="text-sm text-purple-700 mt-1">Available 24/7</p>
          <button className="text-xs bg-purple-600 text-white px-3 py-1 rounded mt-2 hover:bg-purple-700 transition-colors">
            Start Chat
          </button>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold mb-4">Frequently Asked Questions</h3>
        <div className="space-y-3">
          {faqs.map((faq) => (
            <div key={faq.id} className="border border-gray-200 rounded-lg">
              <button
                onClick={() => setSelectedFaq(selectedFaq === faq.id ? null : faq.id)}
                className="w-full text-left p-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
              >
                <span className="font-medium">{faq.question}</span>
                <span className="text-gray-400">
                  {selectedFaq === faq.id ? <X size={16} /> : <Plus size={16} />}
                </span>
              </button>
              {selectedFaq === faq.id && (
                <div className="px-4 pb-4 text-gray-600 border-t border-gray-100">
                  <p className="pt-3">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Contact Form */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold mb-4">Contact Support</h3>
        <form onSubmit={handleFormSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
            <select
              value={contactForm.category}
              onChange={(e) => setContactForm({...contactForm, category: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              {categories.map((category) => (
                <option key={category.value} value={category.value}>
                  {category.label}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
            <input
              type="text"
              value={contactForm.subject}
              onChange={(e) => setContactForm({...contactForm, subject: e.target.value})}
              placeholder="Brief description of your issue"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
            <textarea
              value={contactForm.message}
              onChange={(e) => setContactForm({...contactForm, message: e.target.value})}
              placeholder="Please provide detailed information about your issue..."
              rows="5"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
              required
            ></textarea>
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Send Message
            </button>
          </div>
        </form>
      </div>

      {/* Status Indicators */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold mb-4">System Status</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="font-medium">Website</span>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
              <span className="text-green-600 text-sm">Operational</span>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span className="font-medium">Payment Processing</span>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
              <span className="text-green-600 text-sm">Operational</span>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span className="font-medium">Order Fulfillment</span>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></div>
              <span className="text-yellow-600 text-sm">Minor Delays</span>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span className="font-medium">Customer Support</span>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
              <span className="text-green-600 text-sm">Available</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpSupport;