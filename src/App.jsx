import React, { useState } from 'react';

export default function App() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    service: '',
    message: ''
  });
  const [status, setStatus] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('Sending...');

    try {
      const response = await fetch('/api/book', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setStatus('Inquiry sent! We will contact you shortly.');
        setFormData({ name: '', email: '', service: '', message: '' });
      } else {
        setStatus('Error sending inquiry. Please try again.');
      }
    } catch (error) {
      setStatus('Network error. Is the backend running?');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 font-sans">
      
      {/* Navigation */}
      <nav className="bg-slate-900 text-white p-6 shadow-md">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold tracking-wider">HARBOURVIEW MEDIA</h1>
          <ul className="flex space-x-6 text-sm font-medium">
            <li><a href="#about" className="hover:text-blue-400">About</a></li>
            <li><a href="#services" className="hover:text-blue-400">Services</a></li>
            <li><a href="#contact" className="hover:text-blue-400">Book Now</a></li>
          </ul>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="bg-slate-800 text-white py-24 text-center">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-5xl font-extrabold mb-4">Capturing Vancouver's Best Angles</h2>
          <p className="text-xl text-gray-300 mb-8">
            Professional commercial, real estate, and event photography based in the heart of British Columbia.
          </p>
          <a href="#contact" className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-8 rounded-full font-bold transition">
            Request a Quote
          </a>
        </div>
      </header>

      {/* Services Section */}
      <section id="services" className="py-20 max-w-6xl mx-auto px-6">
        <h3 className="text-3xl font-bold text-center mb-12">Our Services</h3>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100">
            <h4 className="text-xl font-bold mb-3 text-slate-800">Real Estate Media</h4>
            <p className="text-gray-600">Premium property photography and videography for Metro Vancouver listings. Make your properties stand out.</p>
          </div>
          <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100">
            <h4 className="text-xl font-bold mb-3 text-slate-800">Corporate Branding</h4>
            <p className="text-gray-600">Professional headshots, office culture capture, and branding materials to elevate your company's image.</p>
          </div>
          <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100">
            <h4 className="text-xl font-bold mb-3 text-slate-800">Event Coverage</h4>
            <p className="text-gray-600">Unobtrusive, high-quality documentation of corporate events, galas, and local activations.</p>
          </div>
        </div>
      </section>

      {/* Contact / Booking Section */}
      <section id="contact" className="bg-gray-200 py-20">
        <div className="max-w-3xl mx-auto px-6">
          <h3 className="text-3xl font-bold text-center mb-8">Book a Session</h3>
          <div className="bg-white p-8 rounded-lg shadow-md">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                  <input type="text" name="name" value={formData.name} onChange={handleInputChange} required className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input type="email" name="email" value={formData.email} onChange={handleInputChange} required className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Service Required</label>
                <select name="service" value={formData.service} onChange={handleInputChange} required className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option value="" disabled>Select a service...</option>
                  <option value="Real Estate">Real Estate</option>
                  <option value="Corporate">Corporate</option>
                  <option value="Events">Events</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Project Details</label>
                <textarea name="message" value={formData.message} onChange={handleInputChange} rows="4" className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"></textarea>
              </div>

              <button type="submit" className="w-full bg-slate-900 text-white font-bold py-3 rounded hover:bg-slate-800 transition">
                Submit Inquiry
              </button>
              
              {status && <p className="text-center mt-4 font-medium text-blue-600">{status}</p>}
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-center text-gray-400 py-8">
        <p>&copy; {new Date().getFullYear()} Harbourview Media. Vancouver, BC. All rights reserved.</p>
      </footer>

    </div>
  );
}
