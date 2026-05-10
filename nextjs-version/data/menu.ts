export const navbarItems = [
  {
    label: "Home",
    href: "/",
    hasChild: false,
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
          { label: "Full-Stack Next.js", href: "/course/full-stack-nextjs-mastery", description: "Hybrid enrolled course" },
          { label: "API Architecture", href: "/course/api-architecture-bootcamp", description: "Paid self-learning course" },
          { label: "UI Systems", href: "/course/ui-systems-with-tailwind", description: "Free completed course" },
          { label: "Data Analytics AI", href: "/course/data-analytics-with-ai", description: "Hybrid paid program" },
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
    href: "/articles",
    hasChild: true,
    groups: [
      {
        label: "Public Pages",
        items: [
          { label: "Articles", href: "/articles", description: "Blog and learning guides" },
          { label: "Testimonials", href: "/client-testimonials", description: "Learner social proof" },
          { label: "Our Faculty", href: "/our-faculty", description: "Instructor directory" },
          { label: "Contact", href: "/contact", description: "Lead form and support" },
        ],
      },
      {
        label: "Learner Demo",
        items: [
          { label: "Dashboard", href: "/dashboard", description: "Progress and stats" },
          { label: "My Courses", href: "/my-courses", description: "Enrolled courses" },
          { label: "Certificates", href: "/certificates", description: "Completion records" },
          { label: "Orders", href: "/orders", description: "Purchase history" },
        ],
      },
    ],
  },
  {
    label: "Faculty",
    href: "/our-faculty",
    hasChild: false,
  },
  {
    label: "Cart",
    href: "/cart",
    hasChild: false,
  },
  {
    label: "Contact",
    href: "/contact",
    hasChild: false,
  },
];
