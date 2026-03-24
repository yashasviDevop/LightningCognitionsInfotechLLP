import { motion } from "framer-motion";
import { FileText } from "lucide-react";

const Terms = () => {
  return (
    <div className="bg-gradient-to-br from-white via-gray-50 to-blue-50 min-h-screen">

      <div className="max-w-5xl mx-auto px-6 py-24">

        {/* Header */}

        <div className="text-center mb-16">

          <div className="flex justify-center mb-4">
            <FileText className="text-blue-600" size={40}/>
          </div>

          <h1 className="text-5xl font-bold text-gray-900">
            Terms & Conditions
          </h1>

          <p className="text-gray-600 mt-4">
            Last Updated: March 2026
          </p>

        </div>

        {/* Content */}

        <motion.div
        initial={{opacity:0,y:20}}
        animate={{opacity:1,y:0}}
        transition={{duration:0.6}}
        className="bg-white rounded-3xl shadow-lg border border-gray-100 p-10 space-y-10 text-gray-700 leading-relaxed"
        >

          {/* Introduction */}

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">
              1. Introduction
            </h2>

            <p>
              Welcome to Lightning Cognitions. By accessing or using our
              website and services, you agree to comply with and be bound
              by these Terms and Conditions. If you do not agree with these
              terms, please do not use our website.
            </p>
          </section>

          {/* Services */}

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">
              2. Services
            </h2>

            <p>
              Lightning Cognitions provides technology consulting,
              software development, digital solutions, and related
              services. The scope of services for each project will be
              defined in a separate agreement or contract with the client.
            </p>
          </section>

          {/* User Responsibilities */}

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">
              3. User Responsibilities
            </h2>

            <ul className="list-disc pl-6 space-y-2">

              <li>Provide accurate and complete information when contacting us.</li>

              <li>Use our website only for lawful purposes.</li>

              <li>Do not attempt to interfere with website functionality or security.</li>

              <li>Respect intellectual property and company resources.</li>

            </ul>
          </section>

          {/* Intellectual Property */}

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">
              4. Intellectual Property
            </h2>

            <p>
              All content on this website including text, graphics,
              logos, designs, and software is the property of
              Lightning Cognitions unless otherwise stated.
              Unauthorized use, reproduction, or distribution
              is prohibited.
            </p>
          </section>

          {/* Confidentiality */}

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">
              5. Confidentiality
            </h2>

            <p>
              Any confidential information shared between
              Lightning Cognitions and clients during projects
              will be protected and not disclosed to third
              parties without proper authorization.
            </p>
          </section>

          {/* Limitation of Liability */}

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">
              6. Limitation of Liability
            </h2>

            <p>
              Lightning Cognitions will not be liable for any
              direct, indirect, incidental, or consequential
              damages arising from the use or inability to use
              our website or services.
            </p>
          </section>

          {/* Third Party Links */}

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">
              7. Third-Party Links
            </h2>

            <p>
              Our website may contain links to external websites.
              Lightning Cognitions is not responsible for the
              content, security, or privacy practices of those
              third-party websites.
            </p>
          </section>

          {/* Changes */}

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">
              8. Changes to Terms
            </h2>

            <p>
              We may update these Terms & Conditions from time
              to time. Changes will be posted on this page with
              an updated revision date.
            </p>
          </section>

          {/* Governing Law */}

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">
              9. Governing Law
            </h2>

            <p>
              These Terms & Conditions shall be governed by and
              interpreted in accordance with applicable laws.
            </p>
          </section>

          {/* Contact */}

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">
              10. Contact Information
            </h2>

            <p>
              If you have any questions regarding these
              Terms & Conditions, please contact us through
              the contact page on our website.
            </p>
          </section>

        </motion.div>

      </div>
    </div>
  );
};

export default Terms;