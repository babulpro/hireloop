export type Job = {
  id: string;
  title: string;
  company: string;
  companyId: string;
  logo: string;
  location: string;
  type: string;
  schedule: string;
  salary: string;
  posted: string;
  category: string;
  experience: string;
  featured?: boolean;
  hot?: boolean;
  description: string;
  responsibilities: string[];
  requirements: string[];
  skills: string[];
  benefits: string[];
};

export type Company = {
  id: string;
  name: string;
  logo: string;
  industry: string;
  location: string;
  size: string;
  website: string;
  verified?: boolean;
  status?: "Approved" | "Pending" | "Rejected";
  about: string;
  mission: string;
  employees: string;
  presence: string;
  activeJobs: number;
  gallery: string[];
};

export const jobs: Job[] = [
  {
    id: "senior-product-designer",
    title: "Senior Product Designer",
    company: "CloudScale AI",
    companyId: "cloudscale",
    logo: "/logos/cloudscale.png",
    location: "Remote (US)",
    type: "Full-time",
    schedule: "Remote",
    salary: "$140k – $180k",
    posted: "2 hours ago",
    category: "Design",
    experience: "5+ Years",
    featured: true,
    hot: true,
    description:
      "At CloudScale AI, we are building the next generation of infrastructure monitoring tools. We are looking for a Senior Product Designer who is passionate about translating complex technical workflows into elegant, intuitive interfaces. You will be a key member of our design team, working closely with engineering and product leadership to define the vision for our core platform experience.",
    responsibilities: [
      "Lead the end-to-end design process for major platform features, from discovery to high-fidelity implementation.",
      "Collaborate with cross-functional partners to understand user needs and translate them into functional design requirements.",
      "Maintain and evolve our design system, ensuring consistency and accessibility across the entire product suite.",
      "Conduct user research and usability testing to validate design decisions and iterate based on feedback.",
    ],
    requirements: [
      "5+ years of experience designing complex B2B SaaS products or data-heavy applications.",
      "A strong portfolio showcasing your design process and problem-solving skills.",
      "Expert command of Figma, design systems, and rapid interactive prototyping.",
      "Excellent communication skills and comfort collaborating directly with engineering leaders.",
    ],
    skills: ["Figma Expertise", "System Thinking", "UI/UX Design", "Basic Frontend"],
    benefits: ["Full Health & Dental", "Competitive 401k", "Latest Hardware Stipend", "Unlimited PTO"],
  },
  {
    id: "lead-frontend-engineer",
    title: "Lead Frontend Engineer",
    company: "FinGrid Solutions",
    companyId: "finedge",
    logo: "/logos/finedge.png",
    location: "New York, NY",
    type: "Full-time",
    schedule: "Hybrid",
    salary: "$165k – $210k",
    posted: "5 hours ago",
    category: "Engineering",
    experience: "6+ Years",
    featured: true,
    hot: true,
    description:
      "FinGrid Solutions is looking for a Lead Frontend Engineer to architect high-frequency financial dashboards and real-time execution platforms. You will direct frontend architecture decisions, mentor engineers, and ensure sub-millisecond responsiveness.",
    responsibilities: [
      "Architect and scale performant, accessible trading interfaces used by institutional traders worldwide.",
      "Mentor engineers and raise the bar for frontend code quality, testing, and CI/CD automation.",
      "Partner with product and quant teams to ship critical high-throughput visualization components.",
      "Instrument web vitals, memory benchmarks, and client-side streaming protocols.",
    ],
    requirements: [
      "6+ years of professional React/TypeScript engineering experience in high-stakes environments.",
      "Deep understanding of browser rendering internals, WebSockets, and state management.",
      "Proven track record of technical leadership and team mentorship.",
      "Strong foundation in accessibility, component libraries, and automated testing.",
    ],
    skills: ["React", "TypeScript", "Next.js", "WebSockets", "Tailwind CSS"],
    benefits: ["Comprehensive Medical/Vision", "401k with 6% Match", "Generous Annual Bonus", "Flexible Hybrid Work"],
  },
  {
    id: "ux-researcher",
    title: "UX Researcher",
    company: "CreativeStudio",
    companyId: "creativex",
    logo: "/logos/creativex.png",
    location: "Austin, TX",
    type: "Contract",
    schedule: "On-site",
    salary: "$110k – $145k",
    posted: "1 day ago",
    category: "Design",
    experience: "3+ Years",
    featured: true,
    description:
      "CreativeStudio is searching for a passionate UX Researcher to uncover deep user behaviors, run qualitative research sessions, and turn insights into high-impact product roadmaps.",
    responsibilities: [
      "Plan and execute generative and evaluative research studies with global participants.",
      "Synthesize behavioral research into clear heuristics, journey maps, and executive briefs.",
      "Build shared research repositories and standardized benchmarking protocols.",
      "Collaborate with design and product leads to guide strategic feature development.",
    ],
    requirements: [
      "3+ years of UX research experience in modern digital products or agency teams.",
      "Mastery of moderated interviews, unmoderated usability tests, and quantitative survey design.",
      "Exceptional storytelling and synthesis skills with cross-functional stakeholders.",
    ],
    skills: ["User Interviews", "Usability Testing", "Survey Analysis", "Journey Mapping"],
    benefits: ["Travel Credits", "Annual Learning Stipend", "Health Insurance", "Flexible Working Hours"],
  },
  {
    id: "machine-learning-engineer",
    title: "Machine Learning Engineer",
    company: "HealthAI Corp",
    companyId: "biogen",
    logo: "/logos/biogen.png",
    location: "Boston, MA (Remote)",
    type: "Full-time",
    schedule: "Remote",
    salary: "$180k – $250k",
    posted: "1 day ago",
    category: "Engineering",
    experience: "4+ Years",
    featured: true,
    hot: true,
    description:
      "HealthAI Corp is pioneering generative biological models for clinical trials. Join our AI platform team to fine-tune, evaluate, and deploy high-accuracy models in HIPAA-compliant production pipelines.",
    responsibilities: [
      "Train, fine-tune, and evaluate deep learning architectures for genomics and molecular discovery.",
      "Optimize inference latency and distributed GPU cluster utilization.",
      "Collaborate with bioinformaticians to translate clinical data into benchmark datasets.",
      "Maintain automated evaluation pipelines and data drift detection systems.",
    ],
    requirements: [
      "4+ years of production machine learning engineering experience.",
      "Proficiency in Python, PyTorch, CUDA acceleration, and distributed training frameworks.",
      "Experience with Kubernetes, Triton Inference Server, and vector databases.",
      "Strong background in statistics and algorithmic efficiency.",
    ],
    skills: ["Python", "PyTorch", "Kubernetes", "Vector DBs", "CUDA"],
    benefits: ["Substantial Equity Grants", "Top-tier Health Coverage", "GPU Workstation Stipend", "Unlimited PTO"],
  },
  {
    id: "senior-cloud-architect",
    title: "Senior Cloud Infrastructure Architect",
    company: "NexaSystems",
    companyId: "nexasystems",
    logo: "/logos/nexasystems.png",
    location: "San Francisco, CA (Remote)",
    type: "Full-time",
    schedule: "Remote",
    salary: "$175k – $220k",
    posted: "2 days ago",
    category: "Engineering",
    experience: "5+ Years",
    featured: true,
    description:
      "NexaSystems provides autonomous cloud infrastructure for Fortune 500 enterprises. We are looking for an architect to design resilient multi-region cloud mesh solutions.",
    responsibilities: [
      "Design multi-cloud orchestration patterns with 99.999% availability SLAs.",
      "Architect Terraform modules and zero-trust security postures.",
      "Oversee cloud migration strategies for enterprise partners.",
    ],
    requirements: [
      "5+ years architecting enterprise AWS/GCP cloud environments.",
      "In-depth knowledge of Kubernetes, service meshes, and infrastructure-as-code.",
      "Demonstrated ability to resolve complex latency and security bottlenecks.",
    ],
    skills: ["Terraform", "AWS", "Kubernetes", "Zero Trust", "Go"],
    benefits: ["Remote First", "Annual Conference Budget", "Comprehensive Healthcare", "Home Office Setup"],
  },
  {
    id: "lead-product-manager",
    title: "Lead Product Manager - Enterprise",
    company: "TechFlow Systems",
    companyId: "techflow",
    logo: "/logos/techflow.png",
    location: "San Francisco, CA",
    type: "Full-time",
    schedule: "Hybrid",
    salary: "$160k – $200k",
    posted: "3 days ago",
    category: "Product",
    experience: "5+ Years",
    featured: true,
    description:
      "Lead cross-functional teams building workflow automation and integration systems for thousands of high-growth technology companies.",
    responsibilities: [
      "Define product strategy and quarterly OKRs for our flagship workflow automation engine.",
      "Engage directly with Fortune 500 enterprise customers to uncover high-leverage workflows.",
      "Coordinate engineering, design, and go-to-market teams to launch impactful releases.",
    ],
    requirements: [
      "5+ years of product management experience in B2B SaaS or developer tooling.",
      "Proven ability to translate nuanced customer needs into crystal-clear PRDs.",
      "Strong analytical proficiency with product telemetry and growth loops.",
    ],
    skills: ["Product Strategy", "B2B SaaS", "Roadmapping", "SQL & Analytics"],
    benefits: ["Equity Options", "Full Medical/Dental", "Parental Leave", "Wellness Allowance"],
  },
];

export const companies: Company[] = [
  {
    id: "cloudscale",
    name: "CloudScale AI",
    logo: "/logos/cloudscale.png",
    industry: "AI & Developer Tools",
    location: "San Francisco, CA",
    size: "250 – 500 Employees",
    website: "cloudscale.ai",
    verified: true,
    status: "Approved",
    about:
      "CloudScale AI builds next-generation observability, monitoring, and automated remediation engines for distributed cloud infrastructure and AI workloads.",
    mission:
      "To eliminate cloud downtime by combining machine learning telemetry with autonomous infrastructure operations.",
    employees: "380+",
    presence: "15+ Countries",
    activeJobs: 12,
    gallery: ["/images/culture-1.png", "/images/culture-2.jpg", "/images/culture-3.jpg"],
  },
  {
    id: "nexasystems",
    name: "NexaSystems",
    logo: "/logos/nexasystems.png",
    industry: "Cloud Tech",
    location: "Remote",
    size: "500 – 1,000 Employees",
    website: "nexasystems.io",
    verified: true,
    status: "Approved",
    about:
      "Pioneering autonomous cloud infrastructure for Fortune 500 enterprises and emerging hyper-growth technology companies.",
    mission:
      "Empower global enterprises with resilient, zero-downtime multi-cloud infrastructure solutions.",
    employees: "750+",
    presence: "24 Countries",
    activeJobs: 14,
    gallery: ["/images/culture-1.png", "/images/culture-2.jpg", "/images/culture-3.jpg"],
  },
  {
    id: "finedge",
    name: "FinEdge Global",
    logo: "/logos/finedge.png",
    industry: "Fintech",
    location: "London, UK",
    size: "1,000+ Employees",
    website: "finedge.com",
    verified: true,
    status: "Approved",
    about:
      "Leading the fintech revolution with blockchain-integrated banking, institutional liquidity pools, and real-time global settlement.",
    mission:
      "Democratize institutional financial rails through transparent, secure, and instantaneous capital flow.",
    employees: "1,400+",
    presence: "32 Countries",
    activeJobs: 8,
    gallery: ["/images/culture-1.png", "/images/culture-2.jpg", "/images/culture-3.jpg"],
  },
  {
    id: "biogen",
    name: "BioGen Research",
    logo: "/logos/biogen.png",
    industry: "HealthTech",
    location: "Boston, MA",
    size: "200 – 500 Employees",
    website: "biogenresearch.org",
    verified: true,
    status: "Approved",
    about:
      "Bridging computational biology, genomics, and software engineering to develop next-generation personalized therapeutics.",
    mission:
      "Accelerate life-saving drug discovery through algorithmic intelligence and automated biological assays.",
    employees: "340+",
    presence: "8 Research Labs",
    activeJobs: 22,
    gallery: ["/images/culture-1.png", "/images/culture-2.jpg", "/images/culture-3.jpg"],
  },
  {
    id: "creativex",
    name: "CreativeX Studio",
    logo: "/logos/creativex.png",
    industry: "Design & Media",
    location: "Berlin, DE",
    size: "50 – 200 Employees",
    website: "creativex.design",
    verified: true,
    status: "Approved",
    about:
      "An award-winning design collective transforming how iconic global brands interact with users in the digital physical spectrum.",
    mission:
      "Craft timeless digital products that elevate human creativity and emotional resonance.",
    employees: "120+",
    presence: "Europe & Americas",
    activeJobs: 5,
    gallery: ["/images/culture-1.png", "/images/culture-2.jpg", "/images/culture-3.jpg"],
  },
  {
    id: "techflow",
    name: "TechFlow Systems",
    logo: "/logos/techflow.png",
    industry: "Developer Tools",
    location: "San Francisco, CA",
    size: "500 – 1,000 Employees",
    website: "techflow.io",
    verified: true,
    status: "Approved",
    about:
      "Enterprise workflow automation platform enabling seamless orchestration between distributed microservices and human teams.",
    mission:
      "Empower every software team to automate repetitive processes and focus on meaningful innovation.",
    employees: "620+",
    presence: "US, UK, Japan",
    activeJobs: 18,
    gallery: ["/images/culture-1.png", "/images/culture-2.jpg", "/images/culture-3.jpg"],
  },
];

// Requirement-Exact Pricing Plans:
export const seekerPricingPlans = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    tagline: "Essential tools for curious job hunters.",
    features: [
      "Browse & save up to 10 jobs",
      "Apply to up to 3 jobs per month",
      "Basic professional profile",
      "Daily email alerts",
    ],
    cta: "Get Started Free",
    popular: false,
  },
  {
    name: "Pro",
    price: "$19",
    period: "/month",
    tagline: "For active candidates seeking higher visibility.",
    features: [
      "Apply to up to 30 jobs per month",
      "Unlimited saved jobs",
      "Real-time application status tracking",
      "Verified salary insights & market bands",
      "Direct recruiter message previews",
    ],
    cta: "Upgrade to Pro",
    popular: true,
  },
  {
    name: "Premium",
    price: "$39",
    period: "/month",
    tagline: "Maximum leverage for senior leaders & fast hires.",
    features: [
      "Everything in Pro plan",
      "Unlimited job applications",
      "Candidate profile boost to top recruiters",
      "Early access to new listings (24h head start)",
      "Priority VIP support & resume review",
    ],
    cta: "Choose Premium",
    popular: false,
  },
];

export const recruiterPricingPlans = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    tagline: "Ideal for a company's first year of hiring.",
    features: [
      "Up to 3 active job posts at once",
      "Basic applicant management",
      "Standard marketplace listing visibility",
      "Direct candidate resume downloads",
    ],
    cta: "Start Free Hiring",
    popular: false,
  },
  {
    name: "Growth",
    price: "$49",
    period: "/month",
    tagline: "For scaling startups with recurring hiring needs.",
    features: [
      "Up to 10 active job posts at once",
      "Applicant tracking & hiring stages",
      "Basic applicant analytics & metrics",
      "Priority email support & notifications",
    ],
    cta: "Start Growth Plan",
    popular: true,
  },
  {
    name: "Enterprise",
    price: "$149",
    period: "/month",
    tagline: "For established organizations and enterprise teams.",
    features: [
      "Up to 50 active job posts at once",
      "Advanced analytics dashboard & time-to-hire",
      "Featured job listings on homepage & top of search",
      "Team collaboration & shared candidate notes",
      "Custom employer branding & verified checkmark",
      "Dedicated account manager & 24/7 priority support",
    ],
    cta: "Upgrade to Enterprise",
    popular: false,
  },
];

export const pricingPlans = seekerPricingPlans;

export const seekerData = {
  profile: {
    name: "Alex Rivera",
    email: "alex.rivera@example.com",
    role: "Seeker",
    tier: "Pro Member ($19/mo)",
    headline: "Senior UX/UI Designer & Systems Architect",
    avatar: "/avatars/alex-rivera.jpg",
    location: "San Francisco, CA",
    applicationsUsedThisMonth: 8,
    applicationsLimit: 30,
    savedJobsCount: 12,
    bio: "Passionate product designer with 6+ years of experience crafting accessible, scalable enterprise design systems and intuitive user interfaces.",
    skills: ["Figma", "UI Design", "Design Systems", "User Research", "Prototyping", "Next.js"],
  },
  metrics: {
    savedJobs: 12,
    applicationsSubmitted: 24,
    interviewsScheduled: 3,
    offersReceived: 1,
  },
  // Application status distribution for Recharts:
  statusDistribution: [
    { name: "Applied", value: 10, fill: "#3b82f6" },
    { name: "Under Review", value: 6, fill: "#f59e0b" },
    { name: "Shortlisted", value: 5, fill: "#8b5cf6" },
    { name: "Rejected", value: 2, fill: "#ef4444" },
    { name: "Offered", value: 1, fill: "#10b981" },
  ],
  recentActivity: [
    {
      id: "act-1",
      title: "Application moved to 'Under Review'",
      company: "TechFlow Systems",
      role: "Senior Product Designer",
      time: "2 hours ago",
      type: "status",
    },
    {
      id: "act-2",
      title: "New Job Alert matching your design skills",
      company: "FinGrid Solutions",
      role: "Lead Frontend Engineer",
      time: "5 hours ago",
      type: "alert",
    },
    {
      id: "act-3",
      title: "Interview scheduled for Technical Stage",
      company: "CloudScale AI",
      role: "Senior Product Designer",
      time: "Yesterday at 3:30 PM",
      type: "interview",
    },
  ],
  savedJobsList: [
    {
      id: "senior-product-designer",
      title: "Senior Product Designer",
      company: "TechFlow Systems",
      location: "San Francisco, CA (Hybrid)",
      salary: "$160k – $200k + Equity",
      dateSaved: "May 12, 2026 · 2 days ago",
      category: "Design",
      logo: "/logos/techflow.png",
    },
    {
      id: "lead-frontend-engineer",
      title: "Lead Frontend Engineer",
      company: "FinGrid Solutions",
      location: "New York, NY (Hybrid)",
      salary: "$165k – $210k",
      dateSaved: "May 10, 2026 · 4 days ago",
      category: "Engineering",
      logo: "/logos/finedge.png",
    },
    {
      id: "ux-researcher",
      title: "UX Researcher",
      company: "CreativeStudio",
      location: "Austin, TX (On-site)",
      salary: "$110k – $145k",
      dateSaved: "May 08, 2026 · 6 days ago",
      category: "Design",
      logo: "/logos/creativex.png",
    },
  ],
  applicationsList: [
    {
      id: "app-1",
      jobId: "senior-product-designer",
      jobTitle: "Senior Product Designer",
      company: "CloudScale AI",
      dateApplied: "2 days ago",
      absoluteDate: "May 12, 2026",
      status: "Interviewing",
      logo: "/logos/cloudscale.png",
    },
    {
      id: "app-2",
      jobId: "lead-frontend-engineer",
      jobTitle: "Lead Frontend Engineer",
      company: "FinGrid Solutions",
      dateApplied: "5 days ago",
      absoluteDate: "May 09, 2026",
      status: "Shortlisted",
      logo: "/logos/finedge.png",
    },
    {
      id: "app-3",
      jobId: "senior-cloud-architect",
      jobTitle: "Senior Cloud Infrastructure Architect",
      company: "NexaSystems",
      dateApplied: "8 days ago",
      absoluteDate: "May 06, 2026",
      status: "Under Review",
      logo: "/logos/nexasystems.png",
    },
    {
      id: "app-4",
      jobId: "machine-learning-engineer",
      jobTitle: "Machine Learning Engineer",
      company: "HealthAI Corp",
      dateApplied: "14 days ago",
      absoluteDate: "Apr 30, 2026",
      status: "Applied",
      logo: "/logos/biogen.png",
    },
    {
      id: "app-5",
      jobId: "lead-product-manager",
      jobTitle: "Lead Product Manager",
      company: "TechFlow Systems",
      dateApplied: "18 days ago",
      absoluteDate: "Apr 26, 2026",
      status: "Offered",
      logo: "/logos/techflow.png",
    },
  ],
  billing: {
    plan: "Pro Plan",
    price: "$19/month",
    applicationsUsed: 8,
    applicationsTotal: 30,
    renewalDate: "June 14, 2026",
    paymentHistory: [
      { id: "TX-SEEK-003", date: "May 14, 2026", plan: "Pro ($19/mo)", amount: "$19.00", status: "Paid" },
      { id: "TX-SEEK-002", date: "Apr 14, 2026", plan: "Pro ($19/mo)", amount: "$19.00", status: "Paid" },
      { id: "TX-SEEK-001", date: "Mar 14, 2026", plan: "Pro ($19/mo)", amount: "$19.00", status: "Paid" },
    ],
  },
};

export const recruiterData = {
  profile: {
    name: "Alex Sterling",
    company: "TechFlow Systems",
    email: "alex.sterling@techflow.io",
    role: "Recruiter",
    avatar: "/avatars/recruiter.jpg",
    tier: "Growth Plan ($49/mo)",
    activeJobsUsed: 7,
    activeJobsLimit: 10,
  },
  metrics: {
    totalJobPosts: 12,
    totalApplicants: 1284,
    activeJobs: 7,
    jobsClosed: 5,
  },
  // Recharts Bar chart showing applicant count per job post over last 30 days:
  applicantPerformance: [
    { job: "Sr. Product Designer", applicants: 42, views: 340 },
    { job: "Lead Frontend Eng", applicants: 68, views: 512 },
    { job: "Cloud Architect", applicants: 29, views: 240 },
    { job: "ML Engineer", applicants: 54, views: 430 },
    { job: "Lead Product Mgr", applicants: 38, views: 290 },
    { job: "Embedded Dev", applicants: 19, views: 180 },
  ],
  companyInfo: {
    name: "TechFlow Systems",
    logo: "/logos/techflow.png",
    industry: "Developer Tools & SaaS",
    location: "San Francisco, CA",
    website: "https://techflow.io",
    employeeCount: "500 – 1,000 Employees",
    status: "Approved" as const,
    description:
      "Enterprise workflow automation platform enabling seamless orchestration between distributed microservices and human teams.",
  },
  postedJobs: [
    {
      id: "senior-product-designer",
      title: "Senior Product Designer",
      category: "Design",
      type: "Full-time",
      salary: "$140k – $180k",
      status: "Active" as const,
      applicantsCount: 42,
      datePosted: "May 10, 2026",
    },
    {
      id: "lead-frontend-engineer",
      title: "Lead Frontend Engineer",
      category: "Engineering",
      type: "Full-time",
      salary: "$165k – $210k",
      status: "Active" as const,
      applicantsCount: 68,
      datePosted: "May 08, 2026",
    },
    {
      id: "senior-cloud-architect",
      title: "Senior Cloud Infrastructure Architect",
      category: "Engineering",
      type: "Full-time",
      salary: "$175k – $220k",
      status: "Active" as const,
      applicantsCount: 29,
      datePosted: "May 04, 2026",
    },
    {
      id: "lead-product-manager",
      title: "Lead Product Manager",
      category: "Product",
      type: "Full-time",
      salary: "$160k – $200k",
      status: "Closed" as const,
      applicantsCount: 94,
      datePosted: "Apr 20, 2026",
    },
  ],
  // Specific job applicants list for /dashboard/jobs/:jobId/applicants:
  applicantsByJob: {
    "senior-product-designer": [
      {
        id: "cand-1",
        name: "Alex Rivera",
        email: "alex.rivera@example.com",
        dateApplied: "May 12, 2026 · 2 days ago",
        resumeUrl: "#",
        status: "Interviewing",
        experience: "6 years",
        avatar: "/avatars/alex-rivera.jpg",
      },
      {
        id: "cand-2",
        name: "Julianne Moore",
        email: "julianne.m@example.com",
        dateApplied: "May 11, 2026 · 3 days ago",
        resumeUrl: "#",
        status: "Under Review",
        experience: "5 years",
        avatar: "/avatars/elena.jpg",
      },
      {
        id: "cand-3",
        name: "Robert Downey",
        email: "robert.d@example.com",
        dateApplied: "May 10, 2026 · 4 days ago",
        resumeUrl: "#",
        status: "Applied",
        experience: "4 years",
        avatar: "/avatars/tom.jpg",
      },
      {
        id: "cand-4",
        name: "Emma Stone",
        email: "emma.s@example.com",
        dateApplied: "May 08, 2026 · 6 days ago",
        resumeUrl: "#",
        status: "Shortlisted",
        experience: "8 years",
        avatar: "/avatars/sarah-chen.jpg",
      },
    ],
  },
  billing: {
    plan: "Growth Plan",
    price: "$49/month",
    activeJobsUsed: 7,
    activeJobsLimit: 10,
    renewalDate: "June 08, 2026",
    paymentHistory: [
      { id: "TX-REC-002", date: "May 08, 2026", plan: "Growth ($49/mo)", amount: "$49.00", status: "Paid" },
      { id: "TX-REC-001", date: "Apr 08, 2026", plan: "Growth ($49/mo)", amount: "$49.00", status: "Paid" },
    ],
  },
};

export const adminData = {
  metrics: {
    totalUsers: "124,892",
    totalRecruiters: "12,405",
    totalCompanies: "4,281",
    totalJobsPosted: "8,920",
    platformRevenue: "$245,800",
  },
  // Recharts Bar chart for jobs per category:
  jobsByCategory: [
    { category: "Engineering", count: 3200 },
    { category: "Design", count: 2100 },
    { category: "Sales", count: 2400 },
    { category: "Marketing", count: 1800 },
    { category: "Operations", count: 1200 },
  ],
  // Recharts Line chart of new user registrations over 30 days:
  userGrowthTrend: [
    { day: "Day 1", users: 110 },
    { day: "Day 5", users: 180 },
    { day: "Day 10", users: 240 },
    { day: "Day 15", users: 310 },
    { day: "Day 20", users: 390 },
    { day: "Day 25", users: 480 },
    { day: "Day 30", users: 620 },
  ],
  recentPayments: [
    { id: "PAY-901", userEmail: "billing@techflow.io", plan: "Enterprise ($149/mo)", amount: "$149.00", time: "10 mins ago" },
    { id: "PAY-900", userEmail: "alex.rivera@example.com", plan: "Seeker Pro ($19/mo)", amount: "$19.00", time: "45 mins ago" },
    { id: "PAY-899", userEmail: "finance@nexasystems.io", plan: "Growth ($49/mo)", amount: "$49.00", time: "2 hours ago" },
    { id: "PAY-898", userEmail: "hr@finedge.com", plan: "Enterprise ($149/mo)", amount: "$149.00", time: "5 hours ago" },
  ],
  users: [
    {
      id: "usr-1",
      name: "Alex Rivera",
      email: "alex.rivera@example.com",
      role: "Seeker" as const,
      joined: "May 10, 2026",
      status: "Active" as const,
      avatar: "/avatars/alex-rivera.jpg",
    },
    {
      id: "usr-2",
      name: "Alex Sterling",
      email: "alex.sterling@techflow.io",
      role: "Recruiter" as const,
      joined: "Apr 22, 2026",
      status: "Active" as const,
      avatar: "/avatars/recruiter.jpg",
    },
    {
      id: "usr-3",
      name: "Sarah Chen",
      email: "sarah.chen@cloudscale.ai",
      role: "Recruiter" as const,
      joined: "Apr 14, 2026",
      status: "Active" as const,
      avatar: "/avatars/sarah-chen.jpg",
    },
    {
      id: "usr-4",
      name: "Elena Rodriguez",
      email: "elena.r@designer.me",
      role: "Seeker" as const,
      joined: "Mar 30, 2026",
      status: "Active" as const,
      avatar: "/avatars/elena.jpg",
    },
    {
      id: "usr-5",
      name: "Tom Hiddleston",
      email: "tom.h@spammer.org",
      role: "Seeker" as const,
      joined: "Feb 12, 2026",
      status: "Suspended" as const,
      avatar: "/avatars/tom.jpg",
    },
  ],
  companies: [
    {
      id: "comp-1",
      name: "CloudScale AI",
      recruiterEmail: "sarah.chen@cloudscale.ai",
      industry: "AI & Developer Tools",
      status: "Approved" as const,
      dateSubmitted: "May 02, 2026",
    },
    {
      id: "comp-2",
      name: "TechFlow Systems",
      recruiterEmail: "alex.sterling@techflow.io",
      industry: "Developer Tools",
      status: "Approved" as const,
      dateSubmitted: "Apr 20, 2026",
    },
    {
      id: "comp-3",
      name: "GreenRoot Logistics",
      recruiterEmail: "founder@greenroot.io",
      industry: "CleanTech & Logistics",
      status: "Pending" as const,
      dateSubmitted: "May 13, 2026",
    },
    {
      id: "comp-4",
      name: "ShadowCorp Crypto",
      recruiterEmail: "anonymous@shadowcorp.xyz",
      industry: "Crypto",
      status: "Rejected" as const,
      dateSubmitted: "Apr 05, 2026",
    },
  ],
  paymentsList: [
    {
      id: "TX-ADMIN-001",
      userEmail: "alex.sterling@techflow.io",
      plan: "Recruiter Growth",
      amount: "$49.00",
      dateFormatted: "May 10, 2026 · 4 days ago",
      status: "Paid",
    },
    {
      id: "TX-ADMIN-002",
      userEmail: "alex.rivera@example.com",
      plan: "Seeker Pro",
      amount: "$19.00",
      dateFormatted: "May 08, 2026 · 6 days ago",
      status: "Paid",
    },
    {
      id: "TX-ADMIN-003",
      userEmail: "billing@cloudscale.ai",
      plan: "Recruiter Enterprise",
      amount: "$149.00",
      dateFormatted: "May 01, 2026 · 13 days ago",
      status: "Paid",
    },
    {
      id: "TX-ADMIN-004",
      userEmail: "david.miller@example.com",
      plan: "Seeker Premium",
      amount: "$39.00",
      dateFormatted: "Apr 28, 2026 · 16 days ago",
      status: "Refunded",
    },
  ],
};

export const faqs = [
  {
    q: "Can I switch plans at any time?",
    a: "Yes. You can upgrade or downgrade your plan whenever you like. Changes take effect at the start of your next billing cycle with prorated billing.",
  },
  {
    q: "Is there a free trial for paid plans?",
    a: "All paid plans include a 14-day money-back guarantee. No questions asked if you decide the plan is not for you.",
  },
  {
    q: "What is the difference between Seeker and Recruiter plans?",
    a: "Job Seekers pay for application volume and candidate profile boosts, whereas Recruiters pay for active concurrent job listings and applicant analytics.",
  },
  {
    q: "How does the Free plan work for employers?",
    a: "New employers can post up to 3 active jobs completely free of charge — ideal for their first year of hiring — and upgrade as their team scales.",
  },
  {
    q: "How are payments processed?",
    a: "All subscription transactions are securely handled via Stripe with 256-bit encryption and support for major global cards.",
  },
];
