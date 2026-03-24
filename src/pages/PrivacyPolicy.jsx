import { motion } from "framer-motion";
import { ShieldCheck } from "lucide-react";

const PrivacyPolicy = () => {
  return (
    <div className="bg-gradient-to-br from-white via-gray-50 to-blue-50 min-h-screen">

      <div className="max-w-5xl mx-auto px-6 py-24">

        {/* Header */}

        <div className="text-center mb-16">

          <div className="flex justify-center mb-4">
            <ShieldCheck className="text-blue-600" size={40}/>
          </div>

          <h1 className="text-5xl font-bold text-gray-900">
            Privacy Policy
          </h1>

          <p className="text-gray-600 mt-4">
            Last Updated: June 2026
          </p>

        </div>

        {/* Content */}

        <motion.div
        initial={{opacity:0,y:20}}
        animate={{opacity:1,y:0}}
        transition={{duration:0.6}}
        className="bg-white rounded-3xl shadow-lg border border-gray-100 p-10 space-y-10 text-gray-700 leading-relaxed"
        >

          {/* Intro */}

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">
              1. Introduction
            </h2>

            <p>
              Lightning Cognitions ("we", "our", or "us") respects your privacy
              and is committed to protecting your personal information.
              This Privacy Policy explains how we collect, use, and safeguard
              information when you visit our website or use our services.
            </p>
          </section>

          {/* Information Collected */}

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">
              2. Information We Collect
            </h2>

            <p className="mb-2">
              We may collect different types of information including:
            </p>

            <ul className="list-disc pl-6 space-y-2">

              <li>Personal information such as name, email address, and contact details.</li>

              <li>Business information shared during project inquiries.</li>

              <li>Technical data including browser type, device information and IP address.</li>

              <li>Usage data such as pages visited and interactions with our website.</li>

            </ul>
          </section>

          {/* Use of Info */}

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">
              3. How We Use Your Information
            </h2>

            <ul className="list-disc pl-6 space-y-2">

              <li>To provide and improve our services.</li>

              <li>To communicate with clients regarding projects or inquiries.</li>

              <li>To enhance website performance and user experience.</li>

              <li>To ensure security and prevent fraudulent activity.</li>

            </ul>

          </section>

          {/* Data Protection */}

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">
              4. Data Protection
            </h2>

            <p>
              We implement industry-standard security measures to protect
              your personal data from unauthorized access, disclosure,
              or misuse. Our systems are designed to ensure secure
              storage and processing of information.
            </p>

          </section>

          {/* Sharing */}

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">
              5. Information Sharing
            </h2>

            <p className="mb-2">
              We do not sell or rent your personal data. Information may only
              be shared in the following cases:
            </p>

            <ul className="list-disc pl-6 space-y-2">

              <li>With trusted service providers assisting in business operations.</li>

              <li>When required by law or legal processes.</li>

              <li>To protect company rights, security or safety.</li>

            </ul>

          </section>

          {/* Cookies */}

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">
              6. Cookies and Tracking
            </h2>

            <p>
              Our website may use cookies and similar technologies to
              improve user experience, analyze website traffic, and
              understand how visitors interact with our platform.
            </p>

          </section>

          {/* Third Party */}

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">
              7. Third-Party Services
            </h2>

            <p>
              Our website may include links to third-party websites or
              services. We are not responsible for the privacy practices
              of those external websites.
            </p>

          </section>

          {/* Rights */}

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">
              8. Your Privacy Rights
            </h2>

            <p className="mb-2">
              Depending on your location, you may have the right to:
            </p>

            <ul className="list-disc pl-6 space-y-2">

              <li>Request access to your personal data.</li>

              <li>Request correction or deletion of your data.</li>

              <li>Withdraw consent for data processing.</li>

            </ul>

          </section>

          {/* Changes */}

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">
              9. Changes to This Policy
            </h2>

            <p>
              We may update this Privacy Policy from time to time to reflect
              changes in our practices or legal requirements. Updated versions
              will be posted on this page with the revised date.
            </p>

          </section>

          {/* Contact */}

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">
              10. Contact Us
            </h2>

            <p>
              If you have any questions regarding this Privacy Policy,
              please contact our team through the contact page on our website.
            </p>

          </section>

        </motion.div>

      </div>
    </div>
  );
};

export default PrivacyPolicy;