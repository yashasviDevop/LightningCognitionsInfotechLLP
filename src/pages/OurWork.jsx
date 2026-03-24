import React from "react";
import { motion } from "framer-motion";
import { Star } from "lucide-react";
import {
FaReact,
FaHtml5,
FaCss3Alt,
FaJs,
FaNodeJs,
FaDatabase,
FaCloud,
FaGitAlt,
FaDocker,
FaBrain,
FaChartLine,
FaShieldAlt,
FaTools,
FaServer,
FaNetworkWired,
FaCloudUploadAlt,
FaRobot,
FaCogs,
FaCode
} from "react-icons/fa";

import { SiMongodb } from "react-icons/si";
const projects = [
  {
    title: "Centerbase Platform Customization",
    image: "./centerbase1.png",
    desc: "Our team builds automation workflows, dynamic document templates, and intelligent reporting systems tailored to Centerbase business processes.",
    tech: ["Automation", "Custom Reports", "Workflow Design"],
  },
  {
    title: "Yokogawa Enterprise Systems",
    image: "./yokogawa1.png",
    desc: "We contribute to full-stack enterprise development by building scalable system modules, enhancing UI components, and maintaining robust backend services.",
    tech: ["Full Stack", "Enterprise Systems", "Database"],
  },
  {
    title: "Vendavo Platform Enhancement",
    image: "./vendavo1.png",
    desc: "Our solutions enhance the Vendavo platform through optimized modules, performance improvements, and scalable backend architecture.",
    tech: ["Backend", "UI Optimization", "Scalable Systems"],
  },
];
const techStack = [
  { name: "React", icon: <FaReact /> },
  { name: "HTML5", icon: <FaHtml5 /> },
  { name: "CSS3", icon: <FaCss3Alt /> },
  { name: "JavaScript", icon: <FaJs /> },

  { name: "Node.js", icon: <FaNodeJs /> },
  { name: ".NET Core", icon: <FaCode /> },
  { name: "REST APIs", icon: <FaServer /> },
  { name: "Microservices", icon: <FaNetworkWired /> },

  { name: "SQL Database", icon: <FaDatabase /> },
  { name: "MongoDB", icon: <SiMongodb /> },
  { name: "Cloud Platforms", icon: <FaCloud /> },
  { name: "AWS / Azure", icon: <FaCloudUploadAlt /> },

  { name: "Git", icon: <FaGitAlt /> },
  { name: "Docker", icon: <FaDocker /> },
  { name: "CI/CD", icon: <FaCogs /> },
  { name: "Automation", icon: <FaRobot /> },

  { name: "AI Solutions", icon: <FaBrain /> },
  { name: "Data Analytics", icon: <FaChartLine /> },
  { name: "Cyber Security", icon: <FaShieldAlt /> },
  { name: "DevOps", icon: <FaTools /> },
];
const testimonials = [
  {
    name: "Kenji Tanaka",
    company: "Yokogawa Electric Corporation",
    text: "Their engineering team helped modernize our enterprise modules and improve operational performance.",
  },
  {
    name: "Michael Roberts",
    company: "Centerbase",
    text: "Automation and reporting solutions built by their developers significantly improved our productivity.",
  },
  {
    name: "Laura Martinez",
    company: "Vendavo",
    text: "The platform optimizations helped scale our systems and improve performance across multiple services.",
  },
];

const OurWork = () => {
  return (
    <div className="bg-white text-gray-900 py-24 px-6 overflow-hidden">

      {/* HERO */}
      <div className="max-w-5xl mx-auto text-center mb-28">

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-6xl font-extrabold tracking-tight mb-6"
        >
          Our Work
        </motion.h1>

        <p className="text-gray-600 text-lg leading-relaxed max-w-3xl mx-auto">
          Highlighted Projects & Client Success Stories
Discover how our expertise helped leading platforms improve performance, automation, and system scalability.
          We partner with global technology platforms and enterprise
          organizations to design scalable digital ecosystems.  
          Our development expertise combines innovation, automation,
          and intelligent system design to deliver impactful solutions.
        </p>

      </div>

      {/* PROJECTS */}
      <div className="max-w-7xl mx-auto space-y-32">

        {projects.map((project, i) => (
          <div
            key={i}
            className={`grid md:grid-cols-2 gap-16 items-center`}
          >

            {/* IMAGE */}
            <motion.div
              initial={{ opacity: 0, x: i % 2 === 0 ? -80 : 80 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.9 }}
              className={`${i % 2 !== 0 ? "md:order-2" : ""} relative`}
            >

              <div className="absolute -inset-3 bg-blue-100 blur-2xl opacity-30 rounded-3xl"></div>

              <img
                src={project.image}
                alt={project.title}
                className="relative rounded-3xl shadow-xl w-full h-[360px] object-cover hover:scale-105 transition duration-700"
              />

            </motion.div>

            {/* TEXT */}
            <motion.div
              initial={{ opacity: 0, x: i % 2 === 0 ? 80 : -80 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.9 }}
            >

              <h3 className="text-3xl font-bold mb-5">
                {project.title}
              </h3>

              <p className="text-gray-600 leading-relaxed mb-6">
                {project.desc}
              </p>

              <div className="flex flex-wrap gap-3">
                {project.tech.map((tag, index) => (
                  <span
                    key={index}
                    className="bg-blue-50 text-blue-600 px-4 py-2 rounded-full text-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>

            </motion.div>

          </div>
        ))}

      </div>
{/* MORE PROJECTS SECTION */}

<div className="max-w-7xl mx-auto mt-32 overflow-hidden">

  <div className="text-center mb-14">

    <h2 className="text-4xl font-bold mb-4">
      More Solutions We Have Built
    </h2>

    <p className="text-gray-600 max-w-3xl mx-auto">
      Beyond enterprise platforms, our team has also developed modern
      websites and digital platforms for businesses, educational
      organizations and startups.
    </p>

  </div>

  {/* INFINITE SLIDER */}

  <motion.div
    className="flex gap-8"
    animate={{ x: ["0%", "-50%"] }}
    transition={{
      duration: 30,
      ease: "linear",
      repeat: Infinity,
    }}
  >

    {[

      {
        title: "Business Website",
        image:
          "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=500&fit=crop",
        desc: "Professional corporate website built for business branding and service showcase.",
      },

      {
        title: "Educational Platform",
        image:
          "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&h=500&fit=crop",
        desc: "Modern learning platform providing educational resources and interactive student experience.",
      },

      {
        title: "Construction Company Website",
        image:
          "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800&h=500&fit=crop",
        desc: "Website designed to showcase construction projects and company achievements.",
      },

      {
        title: "Startup Landing Page",
        image:
          "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&h=500&fit=crop",
        desc: "High-converting startup landing page designed for product presentation and marketing.",
      },

      {
        title: "Portfolio Website",
        image:
          "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&h=500&fit=crop",
        desc: "Creative portfolio platform for designers and developers to present their work.",
      },

      {
        title: "E-Commerce Website",
        image:
          "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&h=500&fit=crop",
        desc: "Modern e-commerce interface designed for product showcase and online shopping experience.",
      },

    ]
      .concat([
        /* duplicate for infinite effect */
        {
          title: "Business Website",
          image:
            "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=500&fit=crop",
          desc: "Professional corporate website built for business branding and service showcase.",
        },

        {
          title: "Educational Platform",
          image:
            "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&h=500&fit=crop",
          desc: "Modern learning platform providing educational resources and interactive student experience.",
        },

        {
          title: "Construction Company Website",
          image:
            "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800&h=500&fit=crop",
          desc: "Website designed to showcase construction projects and company achievements.",
        },

        {
          title: "Startup Landing Page",
          image:
            "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&h=500&fit=crop",
          desc: "High-converting startup landing page designed for product presentation and marketing.",
        },

        {
          title: "Portfolio Website",
          image:
            "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&h=500&fit=crop",
          desc: "Creative portfolio platform for designers and developers to present their work.",
        },

        {
          title: "E-Commerce Website",
          image:
            "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&h=500&fit=crop",
          desc: "Modern e-commerce interface designed for product showcase and online shopping experience.",
        },

      ])
      .map((project, i) => (

        <div
          key={i}
          className="min-w-[320px] bg-white rounded-2xl shadow-md border overflow-hidden hover:shadow-xl transition"
        >

          <img
            src={project.image}
            className="h-48 w-full object-cover hover:scale-110 transition duration-700"
          />

          <div className="p-6">

            <h3 className="font-semibold text-lg mb-2">
              {project.title}
            </h3>

            <p className="text-gray-600 text-sm">
              {project.desc}
            </p>

          </div>

        </div>

      ))}

  </motion.div>

</div>

{/* TECH STACK SECTION */}

<div className="max-w-6xl mx-auto mt-32">

  <div className="text-center mb-16">

    <h2 className="text-4xl font-bold mb-4">
      Technologies We Work With
    </h2>

    <p className="text-gray-600 max-w-3xl mx-auto">
      Our development team uses modern technologies and tools to
      build scalable applications, enterprise platforms and
      high-performance digital solutions.
    </p>

  </div>

  <div className="grid grid-cols-2 md:grid-cols-4 gap-10">

    {techStack.map((tech, index) => (

      <motion.div
        key={index}

        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}

        transition={{ delay: index * 0.1 }}

        whileHover={{
          scale: 1.15,
          boxShadow: "0px 0px 40px rgba(59,130,246,0.35)",
        }}

        className="group bg-gray-50 p-10 rounded-2xl text-center border cursor-pointer transition-all duration-500"
      >

        <motion.div
          className="text-5xl mb-4 flex justify-center text-blue-600"
          whileHover={{ rotate: 10 }}
        >
          {tech.icon}
        </motion.div>

        <h3 className="font-semibold text-gray-800">
          {tech.name}
        </h3>

      </motion.div>

    ))}

  </div>

</div>

      {/* TESTIMONIAL SLIDER */}
      <div className="mt-40 max-w-6xl mx-auto">

        <h2 className="text-4xl font-bold text-center mb-16">
          Client Testimonials
        </h2>

        <div className="overflow-hidden relative">

          <motion.div
            className="flex gap-10"
            animate={{ x: ["0%", "-100%"] }}
            transition={{
              repeat: Infinity,
              duration: 30,
              ease: "linear",
            }}
          >

            {[...testimonials, ...testimonials].map((t, i) => (

              <div
                key={i}
                className="min-w-[320px] bg-gray-50 p-8 rounded-2xl shadow-md border"
              >

                <div className="flex text-yellow-400 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={18} fill="currentColor" />
                  ))}
                </div>

                <p className="text-gray-700 mb-5 text-sm leading-relaxed">
                  "{t.text}"
                </p>

                <h4 className="font-semibold">{t.name}</h4>
                <p className="text-gray-500 text-xs">{t.company}</p>

              </div>

            ))}

          </motion.div>

        </div>

      </div>

    </div>
  );
};

export default OurWork;