'use client';

import { useState } from 'react';
import { EnvelopeIcon, PhoneIcon } from '@heroicons/react/24/outline';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
    // Reset form
    setFormData({ name: '', email: '', subject: '', message: '' });
    alert('Thank you for your message! We\'ll get back to you soon.');
  };

  const contactInfo = [
    {
      icon: EnvelopeIcon,
      title: "Email",
      details: ["info@NaughtyBouyeez.com", "booking@NaughtyBouyeez.com"],
      description: "For general inquiries and booking requests"
    },
    {
      icon: PhoneIcon,
      title: "Phone",
      details: ["+1 (555) 123-ROCK", "+1 (555) 123-7625"],
      description: "Call us for urgent matters or booking"
    },
  ];

  const socialLinks = [
    { name: "Instagram", handle: "@NaughtyBouyeezband", url: "#", icon: "📷" },
    { name: "Facebook", handle: "/electricpulseofficial", url: "#", icon: "📘" },
    { name: "Twitter", handle: "@NaughtyBouyeez", url: "#", icon: "🐦" },
    { name: "YouTube", handle: "/NaughtyBouyeezmusic", url: "#", icon: "📺" },
    { name: "TikTok", handle: "@electricpulse", url: "#", icon: "🎵" },
    { name: "Spotify", handle: "Naughtyy Bouyeez", url: "#", icon: "🎧" }
  ];

  return (
    <div className="relative">
      {/* Hero Section */}
      <section className="relative section-padding bg-gradient-to-br from-black via-blue-900/20 to-black">
        <div className="absolute inset-0 bg-noise opacity-5"></div>
        <div className="relative z-10 container-padding text-center">
          <h1 className="text-5xl sm:text-7xl font-bold mb-6">
            <span className="gradient-text">Contact</span> Us
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Ready to connect with Naughtyy Bouyeez? Whether you're a fan, venue owner, or media professional,
            we'd love to hear from you. Let's create something resonant together.
          </p>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="section-padding bg-gray-900">
        <div className="container-padding">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <h2 className="text-3xl font-bold text-white mb-8">Send Us a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                      Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-colors duration-200"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-colors duration-200"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-2">
                    Subject *
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    required
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-blue-500 transition-colors duration-200"
                  >
                    <option value="">Select a subject</option>
                    <option value="booking">Booking Inquiry</option>
                    <option value="media">Media/Press</option>
                    <option value="collaboration">Collaboration</option>
                    <option value="fan">Fan Message</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={6}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-colors duration-200 resize-none"
                    placeholder="Tell us what's on your mind..."
                  />
                </div>
                
                <button type="submit" className="btn-primary w-full">
                  Send Message
                </button>
              </form>
            </div>

            {/* Contact Information */}
            <div>
              <h2 className="text-3xl font-bold text-white mb-8">Get in Touch</h2>
              <div className="space-y-8">
                {contactInfo.map((info, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-lg flex items-center justify-center">
                      <info.icon className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-white mb-2">{info.title}</h3>
                      {info.details.map((detail, detailIndex) => (
                        <p key={detailIndex} className="text-blue-400 font-medium">
                          {detail}
                        </p>
                      ))}
                      <p className="text-gray-400 mt-1">{info.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Response Time */}
              <div className="mt-8 p-6 bg-gray-800 rounded-lg border border-gray-700">
                <h3 className="text-lg font-semibold text-white mb-2">Response Time</h3>
                <p className="text-gray-300 text-sm">
                  We typically respond to all inquiries within 24-48 hours. For urgent booking matters, 
                  please call our booking line directly.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Media */}
      <section className="section-padding bg-black">
        <div className="container-padding">
          <h2 className="text-4xl font-bold text-center mb-12">
            Follow the <span className="gradient-text">Pulse</span>
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {socialLinks.map((social, index) => (
              <a
                key={index}
                href={social.url}
                className="card text-center hover:scale-105 transition-transform duration-300"
              >
                <div className="text-4xl mb-3">{social.icon}</div>
                <h3 className="text-white font-semibold mb-1">{social.name}</h3>
                <p className="text-gray-400 text-sm">{social.handle}</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="section-padding bg-gradient-to-r from-blue-900/20 to-cyan-900/20">
        <div className="container-padding text-center">
          <h2 className="text-4xl font-bold mb-6">
            Stay <span className="gradient-text">Connected</span>
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Join our mailing list for exclusive updates,
            and behind-the-scenes content you won't find anywhere else.
          </p>
          
          <div className="max-w-md mx-auto">
            <div className="flex gap-4">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
              />
              <button className="btn-primary">
                Subscribe
              </button>
            </div>
            <p className="text-gray-400 text-sm mt-4">
              We respect your privacy and never spam. Unsubscribe anytime.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
