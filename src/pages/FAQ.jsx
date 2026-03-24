import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

import {
  ChevronDown,
  Search,
  Server,
  DollarSign,
  Cpu,
  Settings,
  LifeBuoy
} from "lucide-react";
const faqData = [
  {
    category: "Services",
    icon: Server,
    question: "What services does Lightning Cognitions provide?",
    answer:
      "We provide custom software development, enterprise systems, cloud solutions, web applications, and digital transformation services."
  },
  {
    category: "Services",
    icon: Server,
    question: "Do you build custom software solutions?",
    answer:
      "Yes. Our team designs and develops fully customized software tailored to the needs of startups, enterprises, and organizations."
  },
  {
    category: "Pricing",
    icon: DollarSign,
    question: "How much does a typical project cost?",
    answer:
      "Project cost depends on scope, complexity and required technologies. After analyzing requirements we provide a transparent estimate."
  },
  {
    category: "Technology",
    icon: Cpu,
    question: "Which technologies do your developers use?",
    answer:
      "Our team works with React, Node.js, .NET, cloud platforms, modern databases and automation technologies."
  },
  {
    category: "Process",
    icon: Settings,
    question: "What is your development process?",
    answer:
      "Our process includes discovery, planning, design, development, testing, deployment and ongoing support."
  },
  {
    category: "Support",
    icon: LifeBuoy,
    question: "Do you provide maintenance and support?",
    answer:
      "Yes. We provide ongoing maintenance, updates, performance optimization and technical support."
  },
  {
    category: "Technology",
    icon: Cpu,
    question: "Do you work with international clients?",
    answer:
      "Yes. Our hybrid work culture allows seamless collaboration with global clients through modern communication tools."
  },
  {
    category: "Process",
    icon: Settings,
    question: "How long does a project usually take?",
    answer:
      "Small projects can take a few weeks while complex enterprise systems may take several months depending on requirements."
  }
];
const categories = ["All", "Services", "Pricing", "Technology", "Process", "Support"];
const FAQ = () => {

  const [activeIndex, setActiveIndex] = useState(null);
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const filteredFAQ = faqData.filter((faq) => {
    const matchesSearch =
      faq.question.toLowerCase().includes(search.toLowerCase());

    const matchesCategory =
      activeCategory === "All" || faq.category === activeCategory;

    return matchesSearch && matchesCategory;
  });

  return (

    <div className="bg-gradient-to-br from-white via-gray-50 to-blue-50 min-h-screen">

      <div className="max-w-6xl mx-auto px-6 py-28">

        {/* TITLE */}

        <div className="text-center mb-16">

          <h1 className="text-5xl font-bold text-gray-900">
            Frequently Asked Questions
          </h1>

          <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
            Find answers to common questions about our services,
            development process and collaboration.
          </p>

        </div>

        {/* SEARCH */}

        <div className="relative max-w-xl mx-auto mb-12">

          <Search className="absolute left-4 top-3 text-gray-400" />

          <input
            type="text"
            placeholder="Search questions..."
            value={search}
            onChange={(e)=>setSearch(e.target.value)}
            className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

        </div>

        {/* CATEGORY FILTER */}

        <div className="flex flex-wrap justify-center gap-4 mb-12">

          {categories.map((cat,index)=>{

            return(

              <button
              key={index}
              onClick={()=>setActiveCategory(cat)}
              className={`px-6 py-2 rounded-full border transition
              ${
                activeCategory === cat
                ? "bg-blue-600 text-white"
                : "bg-white text-gray-700"
              }`}
              >

                {cat}

              </button>

            )

          })}

        </div>

        {/* FAQ LIST */}

        <div className="space-y-6">

          {filteredFAQ.map((faq,index)=>{

            const Icon = faq.icon;

            return(

              <motion.div
              key={index}
              initial={{opacity:0,y:30}}
              animate={{opacity:1,y:0}}
              className="bg-white/80 backdrop-blur-lg border border-gray-200 rounded-2xl shadow-sm"
              >

                <button
                onClick={()=>toggleFAQ(index)}
                className="w-full flex justify-between items-center p-6"
                >

                  <div className="flex items-center gap-4">

                    <Icon className="text-blue-600"/>

                    <span className="font-semibold text-gray-900 text-left">
                      {faq.question}
                    </span>

                  </div>

                  <ChevronDown
                  className={`transition-transform ${
                    activeIndex === index ? "rotate-180" : ""
                  }`}
                  />

                </button>

                <AnimatePresence>

                {activeIndex === index && (

                  <motion.div
                  initial={{height:0,opacity:0}}
                  animate={{height:"auto",opacity:1}}
                  exit={{height:0,opacity:0}}
                  transition={{duration:0.3}}
                  className="px-6 pb-6 text-gray-600"
                  >

                    {faq.answer}

                  </motion.div>

                )}

                </AnimatePresence>

              </motion.div>

            )

          })}

        </div>

        {/* CTA SECTION */}

        <div className="text-center mt-24">

          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Still Have Questions?
          </h2>

          <p className="text-gray-600 mb-6">
            Our team is ready to help you with any project or inquiry.
          </p>

         <Link to="/contact">
  <button className="bg-blue-600 text-white px-8 py-3 rounded-xl hover:bg-blue-700 transition">
    Contact Our Team
  </button>
</Link>

        </div>

      </div>

    </div>
  );
};

export default FAQ;