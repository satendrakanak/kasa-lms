export const navbarItems = [
  {
    label: "Home",
    href: "/",
    kind: "home-demos",
    hasChild: true,
    featured: {
      title: "Homepage Variations",
      description: "Preview multiple landing directions for the same static LMS content.",
      href: "/",
    },
    groups: [
      {
        label: "Home Demos",
        items: [
          { label: "Default Home", href: "/", description: "Animated academy hero with course slider", image: "/assets/demo/course-nextjs.svg" },
          { label: "Classic Academy", href: "/home-2", description: "Trust-first academy layout", image: "/assets/demo/course-ui.svg" },
          { label: "Live Cohort", href: "/home-3", description: "Mentor and batch focused hero", image: "/assets/demo/course-react-live.svg" },
          { label: "Marketplace", href: "/home-4", description: "Catalog-first storefront", image: "/assets/demo/course-data-ai.svg" },
          { label: "LMS Platform", href: "/home-5", description: "Dashboard and product-led story", image: "/assets/demo/course-devops.svg" },
        ],
      },
    ],
  },
  {
    label: "Courses",
    href: "/courses",
    hasChild: true,
    featured: {
      title: "Explore LMS Programs",
      description: "Recorded, live, hybrid, free, and paid course states are included for marketplace demos.",
      href: "/courses",
    },
    groups: [
      {
        label: "Popular Tracks",
        items: [
          { label: "Full-Stack Next.js", href: "/course/full-stack-nextjs-mastery", description: "Hybrid enrolled course", image: "/assets/demo/course-nextjs.svg" },
          { label: "API Architecture", href: "/course/api-architecture-bootcamp", description: "Paid self-learning course", image: "/assets/demo/course-api.svg" },
          { label: "UI Systems", href: "/course/ui-systems-with-tailwind", description: "Free completed course", image: "/assets/demo/course-ui.svg" },
          { label: "Data Analytics AI", href: "/course/data-analytics-with-ai", description: "Hybrid paid program", image: "/assets/demo/course-data-ai.svg" },
        ],
      },
      {
        label: "Delivery Modes",
        items: [
          { label: "Self Learning", href: "/courses?mode=self_learning", description: "Recorded lessons and exams" },
          { label: "Live Batches", href: "/courses?mode=faculty_led", description: "Faculty-led cohorts" },
          { label: "Blended Courses", href: "/courses?mode=hybrid", description: "Recorded plus live sessions" },
          { label: "Free Courses", href: "/courses?price=free", description: "Zero-price demo cards" },
        ],
      },
      {
        label: "Skill Areas",
        items: [
          { label: "Web Development", href: "/courses?category=web-development", description: "Frontend and full-stack" },
          { label: "Cloud DevOps", href: "/course/cloud-devops-foundations", description: "Pipelines and releases" },
          { label: "Cybersecurity", href: "/course/cybersecurity-essentials", description: "Security foundations" },
          { label: "Product Design", href: "/course/product-design-sprint", description: "Live design sprint" },
        ],
      },
    ],
  },
  {
    label: "Pages",
    href: "/about",
    hasChild: true,
    featured: {
      title: "Complete LMS Pages",
      description: "Content, faculty, testimonials, component demos, and company pages are grouped for a cleaner marketplace header.",
      href: "/about",
    },
    groups: [
      {
        label: "Website Pages",
        items: [
          { label: "Articles", href: "/articles", description: "Grid, list, and masonry article layouts" },
          { label: "Faculty", href: "/our-faculty", description: "Instructor listing and profile pages" },
          { label: "Testimonials", href: "/client-testimonials", description: "Client and learner success stories" },
          { label: "About", href: "/about", description: "Marketplace-ready product story" },
        ],
      },
    ],
  },
  {
    label: "Components",
    href: "/components",
    hasChild: true,
    featured: {
      title: "UI Component Library",
      description: "Buttons, forms, tables, charts, switches, and dashboard-ready examples for LMS products.",
      href: "/components",
    },
    groups: [
      {
        label: "Component Demos",
        items: [
          { label: "Components Hub", href: "/components", description: "UI demo overview" },
          { label: "Buttons", href: "/components/buttons", description: "Button variants and states" },
          { label: "Inputs & Forms", href: "/components/inputs", description: "Form controls and validation states" },
          { label: "Tables", href: "/components/tables", description: "Admin-style data tables" },
          { label: "Charts", href: "/components/charts", description: "Analytics and dashboard charts" },
          { label: "Switches", href: "/components/switches", description: "Toggles and settings controls" },
        ],
      },
    ],
  },
  {
    label: "Contact",
    href: "/contact",
    hasChild: false,
  },
];
