import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import emailjs from '@emailjs/browser';
import { Code, MessageSquare, Smartphone, Database, Cloud, Settings, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { parsePhoneNumberFromString } from 'libphonenumber-js';

const serviceFormLinks = {
  "ASP.NET Development": "https://docs.google.com/forms/d/e/1FAIpQLSdO6Ny87AZmP2_GGiAVBpl388auhfbZqfHpLJnCbhIB5AHqGw/viewform?usp=sharing&ouid=106109446349367343435",
  "Chatbot Solutions": "https://docs.google.com/forms/d/e/1FAIpQLSfaoCEOxIITnL9vtxGj6MdYVrNUjKwf-yXvaVrLg4HloLK7pA/viewform?usp=publish-editor",
  "Application Development": "https://forms.gle/zEWGaQqsCXu3NA2x8",
  "Microsoft Dynamics 365": "https://forms.gle/jKMBpk1Sh47ZTuVw5",
  "Salesforce": "https://forms.gle/2TSxwyrVm4Jjfrdq8",
  "Sugar CRM": "https://forms.gle/RFafAZsXt2aQpePH8",
};

const Services = () => {
  const navigate = useNavigate();
  const [showForm, setShowForm] = useState(false);
  const [activeService, setActiveService] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '', // raw value used by PhoneInput (no '+' prefix)
    budget: '', // now stores the selected budget range string
    services: [],
    message: '',
  });
  const [serviceInput, setServiceInput] = useState('');
  // phoneMeta now includes e164 for submission
  const [phoneMeta, setPhoneMeta] = useState({ valid: false, country: null, error: '', e164: '' });

  // email validity state
  const [emailValid, setEmailValid] = useState(false);
  const [emailTouched, setEmailTouched] = useState(false);

  const allServices = [
    'ASP.NET Development',
    'Chatbot Solutions',
    'Application Development',
    'Microsoft Dynamics 365',
    'Salesforce',
    'Sugar CRM',
  ];
  const serviceKeyMap = {
    "ASP.NET Development": "aspnet",
    "Chatbot Solutions": "chatbot",
    "Application Development": "appdev",
    "Microsoft Dynamics 365": "dynamics",
    "Salesforce": "salesforce",
    "Sugar CRM": "sugarcrm"
  };

  const handleBookNow = (serviceTitle) => {
    const serviceKey = serviceKeyMap[serviceTitle];
    if (serviceKey) {
      navigate(`/book/${serviceKey}`);
    } else {
      alert("Service not available.");
    }
  };


  const filteredServices = allServices.filter(
    (srv) => srv.toLowerCase().includes(serviceInput.toLowerCase()) && !formData.services.includes(srv)
  );

  const handleAddService = (srv) => {
    setFormData({ ...formData, services: [...formData.services, srv] });
    setServiceInput('');
  };

  const handleRemoveService = (srv) => {
    setFormData({
      ...formData,
      services: formData.services.filter((s) => s !== srv),
    });
  };

  // Email change handler with validation
  const onEmailChange = (e) => {
    const value = e.target.value;
    setFormData(prev => ({ ...prev, email: value }));

    // simple permissive email regex: allows any domain (not limited to gmail)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setEmailValid(emailRegex.test(value.trim()));
    setEmailTouched(true);
  };

  // onPhoneChange stores raw value in formData.phone and normalized +E.164 in phoneMeta.e164
  const onPhoneChange = (value, data, event, formattedValue) => {
    // `value` from react-phone-input-2 is usually numeric string without '+' (e.g. "919876543210")
    const e164 = value ? (value.startsWith('+') ? value : `+${value}`) : '';

    let valid = false;
    let err = '';
    try {
      const parsed = parsePhoneNumberFromString(e164);
      valid = parsed ? parsed.isValid() : false;
    } catch (e) {
      valid = false;
      err = 'Invalid number format';
    }

    // Optional India-specific hint (kept as hint, libphonenumber-js remains the authority)
    if (data?.countryCode === 'in' && valid) {
      const parsed = parsePhoneNumberFromString(e164);
      const national = parsed?.nationalNumber ?? '';
      if (national.length === 10 && !/^[6-9]/.test(national[0])) {
        err = 'Indian mobile numbers typically start with 6/7/8/9 — verify if this is a landline or special number.';
      }
    }

    // store RAW value for PhoneInput editing (no '+') — critical for caret behavior
    setFormData(prev => ({ ...prev, phone: value || '' }));

    // keep validation + normalized e164 in phoneMeta
    setPhoneMeta({ valid, country: data?.countryCode ?? null, error: err, e164 });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Final defensive checks: require fields and valid email & phone
    if (
      !formData.name ||
      !formData.email ||
      !formData.phone ||
      !formData.budget ||
      formData.services.length === 0
    ) {
      alert('Please fill all required fields and select at least one service.');
      return;
    }

    if (!emailValid) {
      alert('Please enter a valid email address.');
      return;
    }

    if (!phoneMeta.valid) {
      alert('Please enter a valid phone number.');
      return;
    }

    emailjs
      .send(
        'service_1vf255r',
        'template_ym4lkwa',
        {
          from_name: formData.name,
          from_email: formData.email,
          // prefer normalized E.164 from phoneMeta; fallback to '+' + raw phone
          phone: phoneMeta.e164 || (formData.phone ? `+${formData.phone}` : ''),
          budget: formData.budget,
          selected_services: formData.services.join(', '),
          message: formData.message || 'No message provided',
        },
        'H-4cU5H60WKRBib6q'
      )
      .then(() => {
        alert('Message sent successfully!');
        setFormData({ name: '', email: '', phone: '', budget: '', services: [], message: '' });
        setServiceInput('');
        // clear phoneMeta & email state too
        setPhoneMeta({ valid: false, country: null, error: '', e164: '' });
        setEmailValid(false);
        setEmailTouched(false);
        setShowForm(false);
      })
      .catch(() => alert('Failed to send message.'));
  };

  const services = [
    {
      icon: Code,
      title: 'ASP.NET Development',
      description:
        'Build robust, scalable web applications with Microsoft ASP.NET framework for enterprise-grade performance.',
      longDescription: `ASP.NET empowers developers to build dynamic, fast, and scalable web applications. Our expertise covers ASP.NET Core, MVC, and Blazor with integration into cloud environments like Azure.

We provide:
• Custom enterprise-grade solutions
• API & microservice architecture
• Cloud-based deployment
• Database optimization
• Security & authentication systems
• Ongoing support and modernization

We deliver efficiency, reliability, and future-ready software for modern businesses.`,
      image: 'https://cdn-icons-png.flaticon.com/512/919/919853.png',
      gradient: 'from-blue-500 to-cyan-500',
      link: 'https://docs.google.com/forms/d/e/1FAIpQLSdO6Ny87AZmP2_GGiAVBpl388auhfbZqfHpLJnCbhIB5AHqGw/viewform?usp=sharing&ouid=106109446349367343435', 
    },
    {
      icon: MessageSquare,
      title: 'Chatbot Solutions',
      description: 'Smart AI chatbots to automate conversations and customer support using NLP and machine learning.',
      longDescription: `Our intelligent chatbots streamline your communication. Using NLP and AI, we craft conversational systems that understand your customers and deliver instant, personalized responses.

Features:
• 24/7 automated customer support
• Integration with WhatsApp, Messenger, Telegram
• Voice and text-based bots
• Multilingual capabilities
• Analytics dashboard for insights

Chatbots reduce operational costs while improving response time and customer satisfaction.`,
      image: 'https://cdn-icons-png.flaticon.com/512/4712/4712109.png',
      gradient: 'from-purple-500 to-pink-500',
    },
    {
      icon: Smartphone,
      title: 'Application Development',
      description: 'Custom mobile and web apps built using Flutter, React Native, and cutting-edge frameworks.',
      longDescription: `We design and build applications that empower your business. From concept to deployment, our team ensures performance, scalability, and beautiful UI across all devices.

Capabilities:
• Native & cross-platform mobile apps
• Web app development
• API integrations
• Secure backend systems
• Maintenance & updates

We transform your vision into a polished, powerful product.`,
      image: 'https://cdn-icons-png.flaticon.com/512/1828/1828911.png',
      gradient: 'from-green-500 to-emerald-500',
    },
    {
      icon: Database,
      title: 'Microsoft Dynamics 365',
      description:
        'Streamline business operations with customized Microsoft Dynamics 365 CRM and ERP solutions.',
      longDescription: `We offer tailored Microsoft Dynamics 365 solutions that unify your business processes — from sales and customer service to operations and marketing.

Our Dynamics 365 services include:
• Implementation & customization
• Power Automate integration
• AI-based analytics
• Data migration & training
• Support & maintenance

Empower your teams to make smarter decisions, boost productivity, and improve customer relationships.`,
      image: 'https://cdn-icons-png.flaticon.com/512/888/888848.png',
      gradient: 'from-orange-500 to-red-500',
    },
    {
      icon: Cloud,
      title: 'Salesforce',
      description:
        'Expert Salesforce consulting, implementation, and automation to supercharge customer engagement.',
      longDescription: `We help businesses harness the full power of Salesforce through tailored solutions that improve collaboration and efficiency.

Our expertise covers:
• Salesforce Sales, Service & Marketing Cloud
• Custom workflows & automation
• Integration with external systems
• Data analytics & visualization
• Lightning app development

We make Salesforce work for your business goals with smooth integration and continuous optimization.`,
      image: 'https://cdn-icons-png.flaticon.com/512/5968/5968914.png',
      gradient: 'from-blue-500 to-indigo-500',
    },
    {
      icon: Settings,
      title: 'Sugar CRM',
      description:
        'Flexible, open-source CRM platform to manage customer interactions, sales, and marketing efficiently.',
      longDescription: `SugarCRM enables your business to build strong customer connections through powerful automation and analytics.

Key Benefits:
• Lead & pipeline management
• Email marketing automation
• Reporting & dashboards
• Integration with ERP & third-party tools
• Workflow automation

Our team customizes and supports your CRM journey with scalability and precision.`,
      image: 'https://cdn-icons-png.flaticon.com/512/7615/7615154.png',
      gradient: 'from-teal-500 to-cyan-500',
    },
  ];

  // disable submit button unless required fields are present and email is valid
  const isSubmitDisabled = !emailValid || !formData.name || !formData.phone || !formData.budget || formData.services.length === 0;

  return (
    <div className="relative min-h-screen bg-white">
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-blue-50"></div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 py-32">
        {/* Header */}
        <div className="text-center mb-20">
          <span className="text-blue-600 font-semibold tracking-wider uppercase text-sm">Our Services</span>
          <div className="w-12 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto mt-2"></div>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-8 leading-tight">
            Comprehensive
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-purple-600">
              Technology Solutions
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            We offer a full spectrum of technology services designed to accelerate your digital transformation and drive business growth.
          </p>
        </div>

        {/* Service Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div key={index} className="group relative">
              <div className="relative h-full p-8 rounded-3xl bg-white border border-gray-200 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500">
                <div className={`w-16 h-16 mb-6 rounded-2xl bg-gradient-to-br ${service.gradient} flex items-center justify-center`}>
                  <service.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">{service.title}</h3>
                <p className="text-gray-600 mb-6">{service.description}</p>
                <button
                  onClick={() => setActiveService(service)}
                  className="text-blue-600 font-semibold text-sm hover:underline transition"
                >
                  Learn More →
                </button>
                <button
  onClick={() => handleBookNow(service.title)}
  className="mt-4 ml-20 rounded-md bg-blue-500 px-5 py-2 text-sm font-medium text-white transition hover:bg-blue-600"
>
  Book Now
</button>


              </div>
            </div>
          ))}
        </div>

        {/* Service Modal */}
        <AnimatePresence>
          {activeService && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-6"
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ duration: 0.4, ease: 'easeInOut' }}
                className="bg-white rounded-3xl p-8 w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl relative"
              >
                <button
                  onClick={() => setActiveService(null)}
                  className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 transition"
                >
                  <X size={28} />
                </button>

                <div className="flex flex-col md:flex-row gap-8">
                  <div className="flex-shrink-0 md:w-1/3 flex items-center justify-center">
                    <img
                      src={activeService.image}
                      alt={activeService.title}
                      className="w-48 h-48 object-contain rounded-2xl"
                    />
                  </div>

                  <div className="flex-1">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">{activeService.title}</h2>
                    <p className="text-gray-700 whitespace-pre-line leading-relaxed">
                      {activeService.longDescription}
                    </p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* CTA Section */}
        <div className="mt-20 text-center">
          <div className="inline-block p-8 rounded-3xl bg-gradient-to-br from-gray-900 to-black text-white">
            <p className="text-lg mb-4">Need a custom solution?</p>
            <h3 className="text-3xl font-bold mb-6">Let's Build Something Amazing Together</h3>
            <button
              onClick={() => setShowForm(true)}
              className="group relative inline-flex items-center space-x-2 px-8 py-4 bg-white text-gray-900 rounded-full font-semibold overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/50"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></span>
              <span className="relative group-hover:text-white transition-colors duration-300">Get in Touch</span>
            </button>
          </div>
        </div>

        {/* Contact Form */}
        {showForm && (
          <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
            <div className="bg-white rounded-3xl p-8 w-full max-w-lg shadow-2xl relative animate-fadeIn">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Let's Discuss Your Project</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  type="text"
                  placeholder="Your Name"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:border-blue-500 outline-none"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
                <div>
                  <input
                    type="email"
                    placeholder="Your Email"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:border-blue-500 outline-none"
                    value={formData.email}
                    onChange={onEmailChange}
                    onBlur={() => setEmailTouched(true)}
                  />
                  <div className="mt-2 text-sm">
                    {emailTouched && !emailValid ? (
                      <p className="text-red-600">Please enter a valid email address.</p>
                    ) : emailValid ? (
                      <p className="text-green-600">Email looks good.</p>
                    ) : null}
                  </div>
                </div>

                {/* phone input (replace the existing tel input) */}
                <div>
                  <PhoneInput
                    country={'in'} // default country; optional
                    value={formData.phone}
                    onChange={onPhoneChange}
                    enableAreaCodes={true}
                    separateDialCode={true}
                    enableSearch={true}
                    autoFormat={true}
                    containerStyle={{ width: '100%' }}
                    inputStyle={{ width: '100%', paddingLeft: 96 }}
                    buttonStyle={{ border: 'none', left: 8 }}
                    dropdownStyle={{ zIndex: 9999 }}
                    inputProps={{
                      name: 'phone',
                      required: true,
                      placeholder: 'Enter phone number',
                      className: 'outline-none'
                    }}
                  />

                  <div className="mt-2 text-sm">
                    {phoneMeta.valid ? (
                      <p className="text-green-600">Valid phone number ({phoneMeta.country?.toUpperCase() || 'unknown'})</p>
                    ) : (
                      <p className="text-red-600">
                        {phoneMeta.error || 'Please enter a valid phone number including country code.'}
                      </p>
                    )}
                  </div>
                </div>

                {/* Budget dropdown instead of numeric input */}
                <div>
                  <label className="sr-only">Estimated Budget (USD)</label>
                  <select
                    required
                    value={formData.budget}
                    onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:border-blue-500 outline-none bg-white"
                  >
                    <option value="">Estimated Budget (USD)</option>
                    <option value="Under $500">Under $500</option>
                    <option value="$500 - $1,000">$500 - $1,000</option>
                    <option value="$1,000 - $5,000">$1,000 - $5,000</option>
                    <option value="$5,000 - $10,000">$5,000 - $10,000</option>
                    <option value="$10,000 - $50,000">$10,000 - $50,000</option>
                    <option value="$50,000 - $100,000">$50,000 - $100,000</option>
                    <option value="Above $100,000">Above $100,000</option>
                  </select>
                </div>

                {/* Service Selection */}
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Select Services *</label>
                  <div className="border border-gray-300 rounded-xl px-4 py-3 flex flex-wrap gap-2">
                    {formData.services.map((srv, index) => (
                      <span
                        key={index}
                        className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full flex items-center gap-1 text-sm"
                      >
                        {srv}
                        <X
                          size={14}
                          className="cursor-pointer hover:text-red-500"
                          onClick={() => handleRemoveService(srv)}
                        />
                      </span>
                    ))}
                    <input
                      type="text"
                      placeholder="Type to select service"
                      className="flex-1 outline-none"
                      value={serviceInput}
                      onChange={(e) => setServiceInput(e.target.value)}
                    />
                  </div>

                  {filteredServices.length > 0 && serviceInput && (
                    <div className="border border-gray-200 rounded-xl mt-2 shadow-lg bg-white max-h-40 overflow-y-auto">
                      {filteredServices.map((srv, i) => (
                        <div
                          key={i}
                          className="px-4 py-2 cursor-pointer hover:bg-blue-50"
                          onClick={() => handleAddService(srv)}
                        >
                          {srv}
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <textarea
                  rows="4"
                  placeholder="Describe your project (optional)"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:border-blue-500 outline-none"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                ></textarea>

                <div className="flex justify-between pt-4">
                  <button
                    type="button"
                    onClick={() => setShowForm(false)}
                    className="px-6 py-3 rounded-xl bg-gray-200 text-gray-700 font-semibold hover:bg-gray-300 transition"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitDisabled}
                    className={`px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold hover:opacity-90 transition ${isSubmitDisabled ? 'opacity-60 cursor-not-allowed' : ''}`}
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Services;
