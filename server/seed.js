const mongoose = require('mongoose');
require('dotenv').config();
const Project = require('./models/Project');
const Skill = require('./models/Skill');

const projectsData = [
  {
    id: 1,
    title: "Healthcare Microservices Platform",
    shortDesc: "A full-stack MERN application with an API Gateway architecture and microservices.",
    description: "Developed a scalable backend using 8+ independently deployable microservices. Features include patient and doctor management, appointment booking, video consultations (telemedicine), an AI-based symptom checker, payment processing, and real-time notifications.",
    problem: "Traditional monolithic healthcare systems struggle to scale and are difficult to maintain when handling complex, concurrent tasks like telemedicine, booking, and AI diagnosis simultaneously.",
    solution: "Designed a distributed microservices architecture with an API Gateway. This decoupled services, allowed independent scaling for high-traffic components like telemedicine, and ensured continuous availability.",
    techStack: ["React", "Node.js", "Express.js", "MongoDB", "Microservices", "REST API"],
    demoLink: "https://github.com/ShafnyHadhy/health_care_appointment-microservices",
    githubLink: "https://github.com/ShafnyHadhy/health_care_appointment-microservices",
    color: "#6366f1"
  },
  {
    id: 2,
    title: "ReVolve – Circular Economy Service Platform",
    shortDesc: "Full-stack service management platform supporting repair, recycling, and product lifecycle tracking.",
    description: "Built a full-stack service management platform supporting repair, recycling, and product lifecycle tracking for a circular economy.",
    problem: "E-waste and broken appliances are frequently discarded due to a lack of accessible repair and recycling infrastructure, harming the environment.",
    solution: "Developed a centralized platform connecting users with local repair shops and recyclers. Implemented location-based service discovery and lifecycle tracking to promote a circular economy.",
    techStack: ["React", "Node.js", "Express", "MongoDB", "Google Maps API", "Jest", "Supertest"],
    demoLink: "https://revolve-af.vercel.app/",
    githubLink: "https://github.com/ShafnyHadhy/AF-backend-express",
    color: "#ec4899"
  },
  {
    id: 3,
    title: "Smart Vacation Home Rental",
    shortDesc: "Full-stack MERN application for property listings and bookings.",
    description: "A comprehensive vacation home rental platform allowing users to browse property listings, book stays, leave reviews, and process payments securely. Built with MVC architecture on the backend.",
    problem: "Finding and booking vacation homes often involves fragmented platforms, poor UI, and lack of transparent reviews.",
    solution: "Built a unified, seamless booking experience with robust search filters, an integrated secure payment gateway, and a transparent review system to build trust between hosts and guests.",
    techStack: ["MongoDB", "Express.js", "React", "Node.js", "REST API"],
    demoLink: "#",
    githubLink: "https://github.com/NajiAhmad18",
    color: "#14b8a6"
  },
  {
    id: 4,
    title: "Online Pharmacy Portal",
    shortDesc: "Full-stack pharmacy system with digital prescription uploads.",
    description: "Developed a full-stack pharmacy system featuring digital prescription uploads, product management, and order processing. Implemented secure user authentication and role-based access control.",
    problem: "Manual pharmacy systems require patients to physically visit stores to submit prescriptions and verify medicine availability, causing delays.",
    solution: "Created a digital ordering platform where patients can upload prescriptions securely, check real-time stock, and order medicines directly to their doorstep.",
    techStack: ["HTML", "CSS", "JavaScript", "PHP", "MySQL"],
    demoLink: "#",
    githubLink: "https://github.com/NajiAhmad18",
    color: "#f59e0b"
  },
  {
    id: 5,
    title: "Online Bidding System",
    shortDesc: "An online auction platform for placing and tracking bids.",
    description: "Built an online auction platform featuring bid placement, auction tracking, and comprehensive bid history. Applied Agile practices in team collaboration for development.",
    problem: "Traditional auctions are geograpically constrained and lack real-time tracking, limiting participant engagement.",
    solution: "Engineered a real-time online bidding environment that allows users globally to place bids instantly, track auction statuses dynamically, and view comprehensive bid histories.",
    techStack: ["Java", "MySQL", "Tailwind CSS", "Alpine.js"],
    demoLink: "#",
    githubLink: "https://github.com/NajiAhmad18",
    color: "#8b5cf6"
  }
];

const skillsData = [
  // Programming
  { name: "Python", icon: "SiPython", color: "#3776AB", category: "programming" },
  { name: "JavaScript", icon: "SiJavascript", color: "#F7DF1E", category: "programming" },
  { name: "TypeScript", icon: "SiTypescript", color: "#3178C6", category: "programming" },
  { name: "Java", icon: "FaJava", color: "#007396", category: "programming" },
  { name: "PHP", icon: "SiPhp", color: "#777BB4", category: "programming" },
  { name: "C", icon: "SiC", color: "#A8B9CC", category: "programming" },
  // Tools
  { name: "Git", icon: "SiGit", color: "#F05032", category: "tools" },
  { name: "VS Code", icon: "SiVisualstudiocode", color: "#007ACC", category: "tools" },
  { name: "Postman", icon: "SiPostman", color: "#FF6C37", category: "tools" },
  { name: "Figma", icon: "SiFigma", color: "#F24E1E", category: "tools" },
  { name: "Docker", icon: "SiDocker", color: "#2496ED", category: "tools" },
  // Technologies
  { name: "React", icon: "SiReact", color: "#61DAFB", category: "technologies" },
  { name: "Node.js", icon: "SiNodedotjs", color: "#339933", category: "technologies" },
  { name: "Express", icon: "SiExpress", color: "#8b8b8b", category: "technologies" },
  { name: "MongoDB", icon: "SiMongodb", color: "#47A248", category: "technologies" },
  { name: "MySQL", icon: "SiMysql", color: "#4479A1", category: "technologies" },
  { name: "Tailwind CSS", icon: "SiTailwindcss", color: "#06B6D4", category: "technologies" },
  { name: "Three.js", icon: "SiThreedotjs", color: "#8b8b8b", category: "technologies" },
];

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/portfolio');
    
    // Seed Projects
    await Project.deleteMany({});
    await Project.insertMany(projectsData);
    console.log('Projects seeded successfully');

    // Seed Skills
    await Skill.deleteMany({});
    await Skill.insertMany(skillsData);
    console.log('Skills seeded successfully');

    process.exit();
  } catch (err) {
    console.error('Error seeding database:', err);
    process.exit(1);
  }
};

seedDB();
