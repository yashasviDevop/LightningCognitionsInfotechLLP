import { useState } from 'react';
import emailjs from '@emailjs/browser';
import { Mail, Phone, MapPin, Send, CheckCircle } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [focusedField, setFocusedField] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    emailjs
      .send(
        'service_1vf255r', // Replace with your EmailJS Service ID
        'template_mfeyvi9', // Replace with your EmailJS Template ID
        {
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
        },
        'H-4cU5H60WKRBib6q' // Replace with your EmailJS Public Key
      )
      .then(
        (result) => {
          console.log('Email sent successfully:', result.text);
          setIsSubmitted(true);
          setTimeout(() => {
            setFormData({ name: '', email: '', message: '' });
            setIsSubmitted(false);
          }, 3000);
        },
        (error) => {
          console.error('EmailJS Error:', error.text);
          alert('Failed to send message. Please try again later.');
        }
      );
  };

  const contactInfo = [
    {
      icon: Mail,
      title: 'Email',
      value: 'info@lightningcognitions.com',
      gradient: 'from-blue-500 to-cyan-500',
    },
    {
      icon: Phone,
      title: 'Phone',
      value: '+91 9925374476',
      gradient: 'from-purple-500 to-pink-500',
    },
    {
      icon: MapPin,
      title: 'Location',
      value: 'India',
      gradient: 'from-green-500 to-emerald-500',
    },
  ];

  return (
    <div className="relative min-h-screen">
      <div className="absolute inset-0 bg-gradient-to-br from-white via-gray-50 to-blue-50">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="absolute top-40 right-1/4 w-96 h-96 bg-blue-300 rounded-full filter blur-3xl opacity-30 animate-pulse-slow"></div>
        <div className="absolute bottom-40 left-1/4 w-96 h-96 bg-purple-300 rounded-full filter blur-3xl opacity-30 animate-pulse-slow-delay"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 py-32">
        <div className="text-center mb-20">
          <div className="inline-block mb-6">
            <span className="text-blue-600 font-semibold tracking-wider uppercase text-sm">Contact Us</span>
            <div className="w-12 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto mt-2"></div>
          </div>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-8 leading-tight">
            Let's Start a
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              Conversation
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Have a project in mind? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {contactInfo.map((info, index) => (
            <div
              key={index}
              className="group relative p-8 rounded-3xl bg-white/80 backdrop-blur-sm border border-gray-200/50 hover:border-transparent transition-all duration-500 hover:shadow-2xl hover:shadow-blue-500/20 hover:-translate-y-2 text-center"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${info.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500 rounded-3xl`}></div>
              <div className="relative">
                <div className="mb-6 relative inline-block">
                  <div className={`absolute inset-0 bg-gradient-to-br ${info.gradient} blur-xl opacity-0 group-hover:opacity-60 transition-opacity duration-500`}></div>
                  <div className={`relative w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br ${info.gradient} flex items-center justify-center transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-500`}>
                    <info.icon className="w-8 h-8 text-white" />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{info.title}</h3>
                <p className="text-gray-600">{info.value}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="relative p-8 md:p-12 rounded-3xl bg-white/80 backdrop-blur-sm border border-gray-200/50 shadow-2xl">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 rounded-3xl"></div>

            {isSubmitted ? (
              <div className="relative text-center py-12 animate-fade-in">
                <div className="mb-6 relative inline-block">
                  <div className="absolute inset-0 bg-green-500 blur-xl opacity-50"></div>
                  <CheckCircle className="relative w-20 h-20 text-green-500 mx-auto" />
                </div>
                <h3 className="text-3xl font-bold text-gray-900 mb-4">Message Sent!</h3>
                <p className="text-gray-600">Thank you for reaching out. We'll get back to you soon.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="relative space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-semibold text-gray-900 mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    onFocus={() => setFocusedField('name')}
                    onBlur={() => setFocusedField(null)}
                    className={`w-full px-6 py-4 rounded-2xl bg-white border-2 transition-all duration-300 outline-none ${
                      focusedField === 'name'
                        ? 'border-blue-500 shadow-lg shadow-blue-500/20'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    placeholder="First Last"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-gray-900 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    onFocus={() => setFocusedField('email')}
                    onBlur={() => setFocusedField(null)}
                    className={`w-full px-6 py-4 rounded-2xl bg-white border-2 transition-all duration-300 outline-none ${
                      focusedField === 'email'
                        ? 'border-blue-500 shadow-lg shadow-blue-500/20'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    placeholder="yourmail@example.com"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-semibold text-gray-900 mb-2">
                    Your Message
                  </label>
                  <textarea
                    id="message"
                    required
                    rows={6}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    onFocus={() => setFocusedField('message')}
                    onBlur={() => setFocusedField(null)}
                    className={`w-full px-6 py-4 rounded-2xl bg-white border-2 transition-all duration-300 outline-none resize-none ${
                      focusedField === 'message'
                        ? 'border-blue-500 shadow-lg shadow-blue-500/20'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    placeholder="Tell us about your project..."
                  />
                </div>

                <button
                  type="submit"
                  className="group relative w-full inline-flex items-center justify-center space-x-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl font-semibold overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/50 hover:-translate-y-1"
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 translate-x-full group-hover:translate-x-0 transition-transform duration-300"></span>
                  <span className="relative">Send Message</span>
                  <Send className="relative w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                </button>
              </form>
            )}
          </div>
        </div>

        <div className="mt-16 p-8 rounded-3xl bg-gradient-to-br from-gray-900 to-black text-white text-center overflow-hidden relative">
          <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
          <div className="relative">
            <h3 className="text-2xl font-bold mb-4">Ready to Transform Your Business?</h3>
            <p className="text-white/80 max-w-2xl mx-auto">
              Join hundreds of satisfied clients who have accelerated their digital transformation with Lightning Cognitions.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
