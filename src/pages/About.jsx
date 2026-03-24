import {
  Target,
  Lightbulb,
  Users,
  TrendingUp,
  Globe,
  Laptop,
  Rocket,
  Sparkles
} from "lucide-react";
import { Code, Database, Server, Cpu, Cloud, Shield } from "lucide-react";
import { useState } from "react";

import { motion } from "framer-motion";

const About = () => {

  const features = [
    {
      icon: Target,
      title: "Our Mission",
      description:
        "Deliver advanced digital solutions that empower businesses worldwide."
    },
    {
      icon: Lightbulb,
      title: "Innovation Driven",
      description:
        "We adopt emerging technologies to build powerful modern systems."
    },
    {
      icon: Users,
      title: "People First",
      description:
        "We build long-term partnerships with clients and employees."
    },
    {
      icon: TrendingUp,
      title: "Growth Focused",
      description:
        "Helping startups and enterprises scale through technology."
    }
  ];

const developers = [
  {
    icon: Code,
    title: "Frontend Engineers",
    description:
      "Building modern user interfaces using React, responsive layouts and interactive UI systems."
  },
  {
    icon: Server,
    title: "Backend Developers",
    description:
      "Developing scalable APIs, microservices and enterprise backend architectures."
  },
  {
    icon: Database,
    title: "Database Specialists",
    description:
      "Designing secure and optimized database systems for enterprise applications."
  },
  {
    icon: Cloud,
    title: "Cloud Engineers",
    description:
      "Managing cloud infrastructure, deployment pipelines and scalable hosting environments."
  },
  {
    icon: Cpu,
    title: "AI & Automation",
    description:
      "Implementing intelligent systems and automation workflows for modern digital solutions."
  },
  {
    icon: Shield,
    title: "Security Experts",
    description:
      "Ensuring application security, data protection and reliable enterprise system integrity."
  }
];

const [hoverVision, setHoverVision] = useState(false);
  const hybridCulture = [
    {
      icon: Laptop,
      title: "Hybrid Flexibility",
      description:
        "Employees can work from office or remotely creating better productivity."
    },
    {
      icon: Globe,
      title: "Global Collaboration",
      description:
        "Work with clients worldwide through seamless digital communication."
    },
    {
      icon: Users,
      title: "Stronger Teams",
      description:
        "Hybrid culture builds collaboration across distributed teams."
    },
    {
      icon: Rocket,
      title: "Faster Innovation",
      description:
        "Distributed ideas lead to faster and smarter innovation."
    }
  ];

  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-white via-gray-50 to-blue-50">

      {/* Floating Background Blur */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-200 blur-[150px] opacity-40"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-200 blur-[150px] opacity-40"></div>

      <div className="max-w-7xl mx-auto px-6 py-28 relative z-10">

        {/* HERO SECTION */}
        <div className="grid md:grid-cols-2 gap-16 items-center mb-32">

          <motion.div
            initial={{opacity:0,y:40}}
            animate={{opacity:1,y:0}}
            transition={{duration:1}}
          >

            <span className="text-blue-600 font-semibold uppercase tracking-widest text-sm">
              About Lightning Cognitions
            </span>

            <h1 className="text-6xl font-bold mt-6 text-gray-900 leading-tight">
              Building The Future
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                With Technology
              </span>
            </h1>

            <p className="text-gray-600 text-xl mt-6">
              Lightning Cognitions is a technology driven company delivering
              digital innovation, enterprise systems, and scalable software
              solutions for businesses across the globe.
            </p>

          </motion.div>

          {/* Hero Image */}
          <motion.img
            initial={{opacity:0,scale:0.9}}
            animate={{opacity:1,scale:1}}
            transition={{duration:1}}
            src="https://images.unsplash.com/photo-1551434678-e076c223a692"
            alt="technology team"
            className="rounded-3xl shadow-2xl"
          />

        </div>

        {/* FEATURES */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-32">

          {features.map((feature,index)=>{

            return(

              <motion.div
              key={index}
              whileHover={{y:-10}}
              className="bg-white/70 backdrop-blur-lg border border-gray-200 rounded-3xl p-8 shadow-lg hover:shadow-2xl transition"
              >

                <feature.icon className="w-10 h-10 text-blue-600 mb-4"/>

                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {feature.title}
                </h3>

                <p className="text-gray-600 text-sm">
                  {feature.description}
                </p>

              </motion.div>

            )

          })}

        </div>

        {/* HYBRID CULTURE SECTION */}

        <div className="mb-32">

          <div className="text-center mb-16">

            <h2 className="text-4xl font-bold text-gray-900">
              Our Hybrid Work Culture
            </h2>

            <p className="text-gray-600 mt-4 max-w-3xl mx-auto">
              Our hybrid environment allows employees and clients to collaborate
              efficiently from anywhere in the world, enabling productivity,
              flexibility and innovation.
            </p>

          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">

            {hybridCulture.map((item,index)=>{

              return(

                <motion.div
                key={index}
                whileHover={{scale:1.05}}
                className="bg-white rounded-3xl shadow-lg p-8 border border-gray-100"
                >

                  <item.icon className="w-10 h-10 text-purple-600 mb-4"/>

                  <h4 className="font-bold text-lg text-gray-900 mb-2">
                    {item.title}
                  </h4>

                  <p className="text-gray-600 text-sm">
                    {item.description}
                  </p>

                </motion.div>

              )

            })}

          </div>

        </div>

        {/* CLIENT ADVANTAGES */}

        <div className="grid md:grid-cols-2 gap-16 items-center mb-32">

          <motion.img
          initial={{opacity:0,x:-40}}
          whileInView={{opacity:1,x:0}}
          transition={{duration:1}}
          src="https://images.unsplash.com/photo-1522071820081-009f0129c71c"
          alt="team collaboration"
          className="rounded-3xl shadow-xl"
          />

          <div>

            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Benefits For Clients
            </h2>

            <ul className="space-y-4 text-gray-600">

              <li>✔ Seamless communication with international teams</li>
              <li>✔ Flexible time zone collaboration</li>
              <li>✔ Faster project delivery</li>
              <li>✔ Affordable development cost</li>
              <li>✔ Access to global experts</li>
              <li>✔ Scalable solutions for startups and enterprises</li>

            </ul>

          </div>

        </div>

{/* DEVELOPMENT TEAM EXPERTISE */}

<div className="mb-32">

  <div className="text-center mb-16">

    <h2 className="text-4xl font-bold text-gray-900">
      Our Development Expertise
    </h2>

    <p className="text-gray-600 mt-4 max-w-3xl mx-auto">
      Our team consists of skilled engineers and technology experts
      specializing in modern software development, cloud systems,
      automation and enterprise solutions.
    </p>

  </div>

  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

    {developers.map((dev,index)=>{

      return(

        <motion.div
        key={index}
        whileHover={{y:-8, scale:1.02}}
        className="bg-white rounded-3xl shadow-lg p-8 border border-gray-100 transition"
        >

          <div className="p-3 w-fit rounded-xl bg-blue-100 mb-4">
            <dev.icon className="text-blue-600 w-6 h-6"/>
          </div>

          <h4 className="font-bold text-lg text-gray-900 mb-2">
            {dev.title}
          </h4>

          <p className="text-gray-600 text-sm">
            {dev.description}
          </p>

        </motion.div>

      )

    })}

  </div>

</div>

        {/* STORY */}

        <motion.div
  onMouseEnter={() => setHoverVision(true)}
  onMouseLeave={() => setHoverVision(false)}
  initial={{ opacity: 0, y: 40 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.9 }}

  className={`relative overflow-hidden rounded-3xl p-16 text-center 
  border border-gray-200 backdrop-blur-xl transition-all duration-700 ease-out
  ${
    hoverVision
      ? "bg-gradient-to-r from-blue-50 via-purple-50 to-indigo-50 shadow-2xl scale-[1.01]"
      : "bg-white shadow-lg"
  }`}
>

  {/* Soft Glow */}
  <div className="absolute -top-24 -right-24 w-72 h-72 bg-blue-200 blur-3xl opacity-40"></div>
  <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-purple-200 blur-3xl opacity-40"></div>

  {/* Floating Icons */}
  <motion.div
    animate={{ y: [0, -12, 0] }}
    transition={{ repeat: Infinity, duration: 6 }}
    className="absolute top-10 right-10 opacity-20 text-blue-400"
  >
    <Rocket size={60} />
  </motion.div>

  <motion.div
    animate={{ y: [0, -10, 0] }}
    transition={{ repeat: Infinity, duration: 7 }}
    className="absolute bottom-10 left-10 opacity-20 text-purple-400"
  >
    <Globe size={60} />
  </motion.div>

  <motion.div
    animate={{ y: [0, -8, 0] }}
    transition={{ repeat: Infinity, duration: 8 }}
    className="absolute top-1/2 left-1/4 opacity-20 text-indigo-400"
  >
    <Sparkles size={50} />
  </motion.div>

  {/* Icon */}
  <motion.div
    whileHover={{ rotate: 10 }}
    className="flex justify-center mb-6"
  >
    <div className="p-4 rounded-2xl bg-gradient-to-r from-blue-100 to-purple-100">
      <Rocket className="text-blue-600" size={36} />
    </div>
  </motion.div>

  {/* Title */}
  <h2 className="text-4xl font-bold text-gray-900 mb-6">
    Our Vision
  </h2>

  {/* Main Text */}
  <p className="text-gray-600 max-w-3xl mx-auto text-lg leading-relaxed">
    At Lightning Cognitions, our vision is to become a global leader in
    digital innovation by building intelligent technology solutions that
    empower businesses to grow, adapt, and succeed in an ever-evolving
    digital world.
  </p>

  {/* Smooth expanding text */}
  <motion.div
    initial={{ height: 0, opacity: 0 }}
    animate={
      hoverVision
        ? { height: "auto", opacity: 1 }
        : { height: 0, opacity: 0 }
    }
    transition={{ duration: 0.6 }}
    className="overflow-hidden"
  >
    <p className="text-gray-600 max-w-3xl mx-auto text-lg mt-6 leading-relaxed">
      Through our hybrid work culture, we bring together talented
      professionals from different locations and expertise to collaborate
      seamlessly with domestic and international clients. This flexibility
      enables faster innovation, stronger teamwork, and scalable solutions
      that help organizations unlock new opportunities and achieve
      sustainable growth.
    </p>
  </motion.div>

</motion.div>
      </div>
    </div>
  );
};

export default About;