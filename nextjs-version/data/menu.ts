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
    label: "Articles",
    href: "/articles",
    hasChild: false,
  },
  {
    label: "Faculty",
    href: "/our-faculty",
    hasChild: false,
  },
  {
    label: "Client Testimonials",
    href: "/client-testimonials",
    hasChild: false,
  },
  {
    label: "About",
    href: "/about",
    hasChild: false,
  },
  {
    label: "Components",
    href: "/components",
    hasChild: false,
  },
  {
    label: "Contact",
    href: "/contact",
    hasChild: false,
  },
];
