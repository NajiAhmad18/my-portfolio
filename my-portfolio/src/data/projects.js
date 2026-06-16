export const projectsData = [
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
    title: "LuxeKey – Vacation Home Rental Platform",
    shortDesc: "Full-stack vacation rental platform with role-based access control and Stripe payments.",
    description: "Built LuxeKey, a vacation rental platform featuring role-based access control for Guest, Host, and Admin users. Developed a booking system with property search, availability tracking, host dashboards, and analytics. Integrated Stripe API for secure payments, and implemented real-time notifications and wishlists with Zustand. Enhanced booking efficiency with seamless reservations and secure transactions.",
    problem: "Traditional vacation rental platforms lack clear role isolation for Guest and Host features, suffer from clunky payment integrations, and struggle to sync user states like wishlists in real time.",
    solution: "Engineered LuxeKey, a full-stack platform separating Guest, Host, and Admin features with secure dashboards. Integrated Stripe API for payments and leveraged Zustand for smooth, real-time client-side wishlist management.",
    techStack: ["MongoDB", "Express.js", "React.js", "Node.js", "Stripe API", "Zustand", "JWT", "REST API"],
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
