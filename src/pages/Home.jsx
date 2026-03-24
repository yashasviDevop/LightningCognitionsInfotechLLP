import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Rocket, Cpu, Cloud, Globe, Zap } from "lucide-react";
import "../style/Home.css";
import { Code, Server, Database, Shield } from "lucide-react";


const services = [
  {
    icon: <Rocket className="w-10 h-10 text-blue-600" />,
    title: "Digital Transformation",
    desc: "We help businesses evolve digitally by integrating modern technologies that drive innovation and efficiency.",
  },
  {
    icon: <Cpu className="w-10 h-10 text-purple-600" />,
    title: "AI & Automation",
    desc: "Leveraging artificial intelligence and automation to enhance decision-making and streamline operations.",
  },
  {
    icon: <Cloud className="w-10 h-10 text-cyan-600" />,
    title: "Cloud Solutions",
    desc: "Secure, scalable, and cost-effective cloud infrastructure designed to empower your business growth.",
  },
  {
    icon: <Globe className="w-10 h-10 text-indigo-600" />,
    title: "Web & App Development",
    desc: "Building robust web and mobile applications with intuitive design and world-class performance.",
  },
];

const stats = [
  { number: "50+", label: "Projects Completed" },
  { number: "50+", label: "Expert Engineers" },
  { number: "15+", label: "Years of Experience" },
  { number: "98%", label: "Client Satisfaction" },
];

const developers = [
  {
    icon: Code,
    title: "Frontend Developers",
    desc: "Experts in building responsive and interactive user interfaces using modern frameworks."
  },
  {
    icon: Server,
    title: "Backend Engineers",
    desc: "Designing scalable APIs, microservices and robust server architectures."
  },
  {
    icon: Database,
    title: "Database Architects",
    desc: "Creating optimized database structures ensuring performance and reliability."
  },
  {
    icon: Cloud,
    title: "Cloud Specialists",
    desc: "Deploying and managing applications on modern cloud infrastructure."
  },
  {
    icon: Cpu,
    title: "AI & Automation",
    desc: "Developing intelligent systems and automated workflows for digital businesses."
  },
  {
    icon: Shield,
    title: "Security Experts",
    desc: "Ensuring strong cybersecurity and data protection for enterprise systems."
  }
];

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="home-wrapper">
      {/* Fixed Background */}
      <div className="hero-bg"></div>
      <div className="hero-overlay"></div>

      {/* HERO SECTION */}
      <section className="hero-content">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-center z-10"
        >
          <h1 className="hero-title">
            Empowering <span className="gradient-text">Digital Innovation</span>
            <br />
            with <span className="gradient-text">Lightning Speed</span>
          </h1>
          <p className="hero-subtext">
            Lightning Cognitions Infotech LLP delivers cutting-edge technology
            solutions to accelerate your business success.
          </p>

          {/* ✅ Fixed navigation button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            className="hero-btn"
            onClick={() => navigate("/services")}
          >
            <span>Explore Our Work</span>
            <ArrowRight className="ml-2 w-5 h-5" />
          </motion.button>
        </motion.div>
      </section>

      {/* SERVICES SECTION */}
      <section className="py-24 bg-white text-gray-900">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-5xl font-bold mb-16"
          >
            Our <span className="gradient-text">Core Services</span>
          </motion.h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="service-card p-8 rounded-3xl bg-gray-50 border border-gray-200 hover:border-blue-600 hover:bg-blue-50 transition-all duration-300 shadow-md hover:shadow-blue-100"
              >
                <div className="mb-6 flex justify-center">{service.icon}</div>
                <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {service.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
{/* ABOUT US GLIMPSE */}

<section className="relative py-28 bg-gradient-to-b from-white to-blue-50 overflow-hidden">

  {/* background glow */}
  <div className="absolute top-0 right-0 w-96 h-96 bg-blue-200 blur-[140px] opacity-40"></div>
  <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-200 blur-[140px] opacity-40"></div>

  <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">

    {/* Image */}
    <motion.div
      initial={{ opacity: 0, x: -80 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.9 }}
      className="relative"
    >

      <img
        src="https://images.unsplash.com/photo-1551434678-e076c223a692"
        alt="tech team"
        className="rounded-3xl shadow-2xl"
      />

      {/* floating card */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="absolute -bottom-10 -right-10 bg-white p-6 rounded-2xl shadow-xl border border-gray-100"
      >
        <h4 className="text-lg font-semibold text-gray-900">
          Hybrid Innovation
        </h4>
        <p className="text-gray-600 text-sm mt-2">
          Our hybrid culture enables global collaboration with
          clients and teams from anywhere in the world.
        </p>
      </motion.div>

    </motion.div>

    {/* Content */}
    <motion.div
      initial={{ opacity: 0, x: 80 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.9 }}
    >

      <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
        About
        <span className="bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text">
          {" "}Lightning Cognitions
        </span>
      </h2>

      <p className="text-gray-700 leading-relaxed mb-6">
        Lightning Cognitions Infotech LLP is a modern technology company
        dedicated to helping businesses transform digitally. We combine
        innovation, engineering excellence, and strategic thinking to
        deliver powerful software, cloud platforms, and AI-driven
        solutions.
      </p>

      <p className="text-gray-600 leading-relaxed mb-8">
        Our hybrid work culture allows talented professionals to
        collaborate seamlessly across locations while supporting
        domestic and international clients with flexible, scalable,
        and future-ready technology solutions.
      </p>

      <motion.button
        whileHover={{ scale: 1.05 }}
        className="px-8 py-4 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg"
        onClick={() => navigate("/about")}
      >
        Discover More
      </motion.button>

    </motion.div>

  </div>
</section>

{/* DEVELOPER GLIMPSE SECTION */}

<div className="max-w-7xl mx-auto px-6 mt-32">

  <div className="text-center mb-16">

    <h2 className="text-4xl font-bold text-gray-900">
      Meet Our Developers
    </h2>

    <p className="text-gray-600 mt-4 max-w-3xl mx-auto">
      Our talented team of engineers and technology experts build
      scalable digital solutions, enterprise systems and modern
      applications for businesses across the globe.
    </p>

  </div>

  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

    {developers.map((dev,index)=>{

      return(

        <motion.div
        key={index}
        whileHover={{y:-10, scale:1.03}}
        initial={{opacity:0,y:40}}
        whileInView={{opacity:1,y:0}}
        transition={{delay:index*0.1}}
        className="bg-white rounded-3xl shadow-lg border border-gray-100 p-8 hover:shadow-2xl transition duration-300"
        >

          <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-blue-100 mb-4">
            <dev.icon className="text-blue-600"/>
          </div>

          <h3 className="text-lg font-bold text-gray-900 mb-2">
            {dev.title}
          </h3>

          <p className="text-gray-600 text-sm">
            {dev.desc}
          </p>

        </motion.div>

      )

    })}

  </div>

</div>
{/* OUR WORK GLIMPSE */}

<section className="py-28 bg-white text-gray-900">

<div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">

<motion.div
initial={{opacity:0,x:-60}}
whileInView={{opacity:1,x:0}}
transition={{duration:0.8}}
>

<h2 className="text-4xl font-bold mb-6">
Our <span className="gradient-text">Work</span>
</h2>

<p className="text-gray-700 leading-relaxed mb-6">
We collaborate with global platforms and enterprises to deliver
scalable digital systems, automation workflows, and
high-performance enterprise applications.
</p>

<p className="text-gray-600 leading-relaxed mb-8">
Our team has worked with leading technology platforms,
developing modules, automation solutions, and enterprise
applications that power modern businesses.
</p>

<motion.button
whileHover={{scale:1.05}}
className="px-8 py-4 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg"
onClick={()=>navigate("/ourwork")}
>
View Our Work
</motion.button>

</motion.div>


<motion.div
initial={{opacity:0,x:60}}
whileInView={{opacity:1,x:0}}
transition={{duration:0.8}}
className="grid grid-cols-2 gap-6"
>

<img
src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800"
className="rounded-2xl shadow-lg"
/>

<img
src="https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800"
className="rounded-2xl shadow-lg mt-10"
/>

</motion.div>

</div>

</section>

{/* SMALL PROJECTS GLIMPSE */}

<section className="py-28 bg-gray-50 overflow-hidden">

<div className="max-w-7xl mx-auto px-6 text-center mb-14">

<h2 className="text-4xl font-bold mb-4">
Small <span className="gradient-text">Projects</span>
</h2>

<p className="text-gray-600 max-w-3xl mx-auto">
Alongside enterprise systems, we design modern websites,
startup landing pages, and digital platforms for
businesses and educational organizations.
</p>

</div>

<motion.div
className="flex gap-8"
animate={{x:["0%","-50%"]}}
transition={{
repeat:Infinity,
duration:30,
ease:"linear"
}}
>

{[
"https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800",
"https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800",
"https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800",
"https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800",
].concat([
"https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800",
"https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800",
"https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800",
"https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800",
]).map((img,i)=>(

<img
key={i}
src={img}
className="w-72 h-44 object-cover rounded-2xl shadow-lg"
/>

))}

</motion.div>

<div className="text-center mt-12">

<motion.button
whileHover={{scale:1.05}}
className="px-8 py-4 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg"
onClick={()=>navigate("/ourwork")}
>
Explore Projects
</motion.button>

</div>

</section>

{/* TECH STACK GLIMPSE */}

<section className="py-28 bg-white">

<div className="max-w-6xl mx-auto px-6 text-center mb-16">

<h2 className="text-4xl font-bold mb-4">
Technology <span className="gradient-text">Stack</span>
</h2>

<p className="text-gray-600 max-w-3xl mx-auto">
We leverage modern technologies and development tools
to build scalable and high-performance applications.
</p>

</div>

<div className="max-w-5xl mx-auto grid grid-cols-3 md:grid-cols-6 gap-10 text-center">

{["React","HTML","CSS","JavaScript","Cloud","Database"].map((tech,i)=>(

<motion.div
key={i}
whileHover={{scale:1.2}}
className="p-6 rounded-xl border bg-gray-50 hover:shadow-lg transition"
>

<p className="font-semibold text-gray-800">
{tech}
</p>

</motion.div>

))}

</div>

<div className="text-center mt-12">

<motion.button
whileHover={{scale:1.05}}
className="px-8 py-4 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg"
onClick={()=>navigate("/ourwork")}
>
See Technologies
</motion.button>

</div>

</section>



      {/* ABOUT SECTION */}
      <section className="py-24 bg-gradient-to-br from-blue-50 to-white text-gray-900">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl font-bold mb-6">
              Who We <span className="gradient-text">Are</span>
            </h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              Lightning Cognitions Infotech LLP is a forward-thinking technology
              firm passionate about innovation. We specialize in crafting
              scalable, intelligent, and visually stunning digital experiences
              that help businesses thrive in an ever-evolving world.
            </p>
            <p className="text-gray-600 leading-relaxed">
              From AI-driven platforms to enterprise-grade systems, we ensure
              your ideas become impactful realities.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="relative flex justify-center"
          >
            <div className="relative z-10 w-full max-w-md rounded-3xl bg-white border border-gray-200 p-8 shadow-lg hover:shadow-blue-200 transition-all">
              <Zap className="w-10 h-10 text-blue-600 mb-4" />
              <h4 className="text-xl font-semibold mb-2">Our Vision</h4>
              <p className="text-gray-600 text-sm leading-relaxed">
                To be a global leader in technological transformation by
                delivering intelligent, lightning-fast, and reliable digital
                solutions for the modern world.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* STATS SECTION */}
      <section className="py-20 bg-gray-50 text-center text-gray-900">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-10">
          {stats.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="flex flex-col items-center"
            >
              <h3 className="text-4xl md:text-5xl font-bold gradient-text mb-2">
                {item.number}
              </h3>
              <p className="text-gray-700 text-sm font-medium">
                {item.label}
              </p>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
