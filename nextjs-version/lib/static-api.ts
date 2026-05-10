import { OrderStatus, RefundRequestStatus } from "@/types/order";
import { CouponScope, CouponStatus, CouponType } from "@/types/coupon";

type Method = "GET" | "POST" | "PATCH" | "DELETE";

const now = "2026-05-10T09:00:00.000Z";

const file = (id: number, name: string, path: string, type = "image") => ({
  id,
  name,
  path,
  type,
  mime: type === "image" ? "image/jpeg" : "video/mp4",
  size: "420 KB",
  url: path,
  createdAt: now,
  updatedAt: now,
});

const permissions = [
  { id: 1, name: "admin.access" },
  { id: 2, name: "courses.manage" },
  { id: 3, name: "users.manage" },
  { id: 4, name: "faculty.access" },
];

const roles = [
  { id: 1, name: "admin", permissions },
  { id: 2, name: "faculty", permissions: [permissions[3], permissions[1]] },
  { id: 3, name: "student", permissions: [] },
];

const makeFaculty = (
  id: number,
  firstName: string,
  lastName: string,
  username: string,
  headline: string,
  expertise: string,
  location: string,
) => ({
  id,
  email: `${username}@kasalms.com`,
  firstName,
  lastName,
  phoneNumber: `+91 90000 11${String(id).padStart(3, "0")}`,
  username,
  avatar: file(20 + id, `${firstName} avatar`, `/assets/demo/faculty-${username}.svg`),
  coverImage: file(30 + id, `${firstName} cover`, "/assets/demo/course-nextjs.svg"),
  avatarUrl: `/assets/demo/faculty-${username}.svg`,
  canRequestRefund: true,
  roles: id === 1 ? roles : [roles[1]],
  profile: {
    id,
    bio: `${headline} with a practical, project-first teaching style for modern learners.`,
    isPublic: true,
    showCourses: true,
    showCertificates: true,
    location,
    website: "https://kasalms.example",
    headline,
    company: "Kasa LMS",
    linkedin: "https://linkedin.com",
    youtube: "https://youtube.com",
  },
  facultyProfile: {
    id,
    expertise,
    experience: id < 3 ? "10+ years" : id < 5 ? "8+ years" : "6+ years",
    designation: id === 1 ? "Lead Instructor" : "Senior Faculty",
    linkedin: "https://linkedin.com",
    isApproved: true,
  },
  createdAt: now,
  updatedAt: now,
  deletedAt: null,
});

const users: any[] = [
  makeFaculty(1, "Ava", "Patel", "ava-patel", "Full-stack product engineer", "Next.js, TypeScript, LMS architecture", "Bengaluru"),
  makeFaculty(2, "Noah", "Reed", "noah-reed", "Backend systems mentor", "API design, databases, cloud services", "Austin"),
  makeFaculty(3, "Maya", "Chen", "maya-chen", "Design systems coach", "React, Tailwind, accessibility", "Singapore"),
  makeFaculty(4, "Omar", "Brooks", "omar-brooks", "Cloud and DevOps trainer", "Docker, CI, Kubernetes, observability", "Dubai"),
  makeFaculty(5, "Lena", "Hart", "lena-hart", "Data and AI instructor", "Analytics, Python, AI workflows", "London"),
  makeFaculty(6, "Sophia", "Lee", "sophia-lee", "Product design facilitator", "UX research, prototyping, design sprints", "Toronto"),
];

const categories = [
  {
    id: 1,
    name: "Web Development",
    slug: "web-development",
    type: "course",
    description: "Modern frontend and full-stack programs.",
    image: file(41, "Web category", "/assets/demo/course-nextjs.svg"),
    imageAlt: "Web development",
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 2,
    name: "API Design",
    slug: "api-design",
    type: "course",
    description: "Backend architecture, APIs, and production services.",
    image: file(42, "API category", "/assets/demo/course-api.svg"),
    imageAlt: "API Design",
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 3,
    name: "Design Systems",
    slug: "design-systems",
    type: "course",
    description: "UI systems, component libraries, and product design.",
    image: file(43, "Design category", "/assets/demo/course-ui.svg"),
    imageAlt: "Design systems",
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 4,
    name: "Data & AI",
    slug: "data-ai",
    type: "course",
    description: "Analytics dashboards, AI workflows, and reporting.",
    image: file(44, "Data category", "/assets/demo/course-data-ai.svg"),
    imageAlt: "Data and AI",
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 5,
    name: "Cloud & DevOps",
    slug: "cloud-devops",
    type: "course",
    description: "Deployment, monitoring, and cloud operations.",
    image: file(45, "Cloud category", "/assets/demo/course-devops.svg"),
    imageAlt: "Cloud and DevOps",
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 6,
    name: "Learning Guides",
    slug: "learning-guides",
    type: "article",
    description: "Articles for learners and course creators.",
    image: file(46, "Guide category", "/assets/demo/article-learning.svg"),
    imageAlt: "Learning guides",
    createdAt: now,
    updatedAt: now,
  },
];

const tags = [
  { id: 1, name: "Next.js", slug: "nextjs", description: "Next.js courses", createdAt: now },
  { id: 2, name: "API", slug: "api", description: "API design", createdAt: now },
  { id: 3, name: "Career", slug: "career", description: "Career learning", createdAt: now },
  { id: 4, name: "Tailwind", slug: "tailwind", description: "UI systems", createdAt: now },
  { id: 5, name: "Live Batch", slug: "live-batch", description: "Faculty-led learning", createdAt: now },
  { id: 6, name: "Certificate", slug: "certificate", description: "Certificate programs", createdAt: now },
  { id: 7, name: "AI", slug: "ai", description: "AI workflows", createdAt: now },
  { id: 8, name: "DevOps", slug: "devops", description: "Cloud operations", createdAt: now },
];

const makeLectures = (courseId: number, titles: string[], completed = 0) =>
  titles.map((title, index) => ({
    id: courseId * 100 + index + 1,
    chapterId: courseId * 10 + Math.floor(index / 3) + 1,
    title,
    description: `Practical lesson for ${title.toLowerCase()}.`,
    video: file(500 + courseId * 10 + index, `${title} video`, "/assets/default-cover.jpg", "video"),
    attachments: [],
    isFree: index === 0,
    isPublished: true,
    position: index + 1,
    progress: {
      isCompleted: index < completed,
      progress: index < completed ? 100 : index === completed ? 45 : 0,
      lastTime: index < completed ? 600 : 120,
    },
  }));

const makeChapters = (courseId: number, topics: string[], completed = 0) => {
  const lectures = makeLectures(courseId, topics, completed);

  return [
    {
      id: courseId * 10 + 1,
      courseId,
      title: "Foundation",
      description: "Core concepts, setup, and project framing.",
      lectures: lectures.slice(0, 3),
      isFree: true,
      isPublished: true,
      position: 1,
    },
    {
      id: courseId * 10 + 2,
      courseId,
      title: "Build Sprint",
      description: "Guided build with realistic workflows and reviews.",
      lectures: lectures.slice(3, 6),
      isFree: false,
      isPublished: true,
      position: 2,
    },
  ];
};

const makeCourse = ({
  id,
  title,
  slug,
  shortDescription,
  description,
  asset,
  categoryIds,
  tagIds,
  facultyIds,
  priceInr,
  priceUsd,
  mode,
  duration,
  level,
  featured,
  enrolled,
  progress,
  lessons,
}: any) => ({
  id,
  title,
  slug,
  shortDescription,
  description,
  image: file(60 + id, `${title} cover`, `/assets/demo/${asset}`),
  imageAlt: title,
  video: null,
  isFree: Number(priceInr) === 0,
  isPublished: true,
  isFeatured: featured,
  priceInr: String(priceInr),
  priceUsd: String(priceUsd),
  duration,
  mode,
  monthlyLiveClassLimit: mode === "self_learning" ? null : 4,
  liveClassAttendanceRequirementType: mode === "self_learning" ? null : "percentage",
  liveClassAttendanceRequirementValue: mode === "self_learning" ? null : 70,
  certificate: "Certificate included",
  exams: "Quizzes and final project",
  experienceLevel: level,
  studyMaterial: "Downloadable workbooks, checklists, and starter files",
  additionalBook: "Implementation playbook",
  language: "English",
  technologyRequirements: "Laptop, modern browser, and stable internet",
  eligibilityRequirements: level === "Beginner" ? "No prior experience required" : "Basic programming knowledge",
  disclaimer: "Static demo content for marketplace preview.",
  faqs: [
    { question: "Is this course static?", answer: "Yes, every section is powered by local demo data." },
    { question: "Can buyers connect a backend?", answer: "Yes, the static adapter can be replaced with real API services." },
  ],
  exam: null,
  metaTitle: title,
  metaSlug: slug,
  metaDescription: shortDescription,
  categories: categoryIds.map((categoryId: number) => categories.find((category) => category.id === categoryId)),
  tags: tagIds.map((tagId: number) => tags.find((tag) => tag.id === tagId)),
  isEnrolled: enrolled,
  progress: { isCompleted: progress >= 100, progress, lastTime: 240 },
  chapters: makeChapters(id, lessons, Math.floor((progress / 100) * 4)),
  faculties: facultyIds.map((facultyId: number) => users.find((user) => user.id === facultyId)),
  testimonials: [],
  createdBy: users[0],
  updatedBy: users[0],
  createdAt: now,
  updatedAt: now,
  deletedAt: null,
});

const courses: any[] = [
  makeCourse({
    id: 1,
    title: "Full-Stack Next.js Mastery",
    slug: "full-stack-nextjs-mastery",
    shortDescription: "Build production LMS-grade apps with App Router, auth screens, dashboards, and checkout.",
    description: "<p>Learn App Router, static data adapters, course pages, learner dashboards, checkout states, exams, and certificates in a complete theme-ready workflow.</p>",
    asset: "course-nextjs.svg",
    categoryIds: [1],
    tagIds: [1, 3, 6],
    facultyIds: [1, 3],
    priceInr: 6999,
    priceUsd: 79,
    mode: "hybrid",
    duration: "10 weeks",
    level: "Intermediate",
    featured: true,
    enrolled: true,
    progress: 54,
    lessons: ["Project setup and routing", "Static API adapter", "Course catalog sections", "Learner dashboard", "Checkout and cart states", "Final exam workflow"],
  }),
  makeCourse({
    id: 2,
    title: "API Architecture Bootcamp",
    slug: "api-architecture-bootcamp",
    shortDescription: "Design clean APIs, DTOs, database models, queues, and production-ready service modules.",
    description: "<p>A backend-heavy program for building stable API contracts, layered modules, validation, permissions, and integrations.</p>",
    asset: "course-api.svg",
    categoryIds: [2],
    tagIds: [2, 6],
    facultyIds: [2],
    priceInr: 7999,
    priceUsd: 89,
    mode: "self_learning",
    duration: "8 weeks",
    level: "Advanced",
    featured: true,
    enrolled: false,
    progress: 0,
    lessons: ["API contract planning", "Validation and DTOs", "Auth and permissions", "Database relations", "Background jobs", "Deployment checklist"],
  }),
  makeCourse({
    id: 3,
    title: "UI Systems With Tailwind",
    slug: "ui-systems-with-tailwind",
    shortDescription: "Create polished cards, layouts, dashboards, forms, and theme-ready responsive sections.",
    description: "<p>Build a production UI system with tokens, reusable sections, dark mode, responsive grids, and accessibility habits.</p>",
    asset: "course-ui.svg",
    categoryIds: [1, 3],
    tagIds: [3, 4, 6],
    facultyIds: [3],
    priceInr: 0,
    priceUsd: 0,
    mode: "self_learning",
    duration: "6 weeks",
    level: "Beginner",
    featured: true,
    enrolled: true,
    progress: 100,
    lessons: ["Design tokens", "Card systems", "Responsive shells", "Dashboard patterns", "Dark mode polish", "Component QA"],
  }),
  makeCourse({
    id: 4,
    title: "Live React Career Accelerator",
    slug: "live-react-career-accelerator",
    shortDescription: "Faculty-led React cohort with weekly classes, project critique, and interview preparation.",
    description: "<p>A live batch course with structured classes, practice assignments, mentor reviews, and career-focused project delivery.</p>",
    asset: "course-react-live.svg",
    categoryIds: [1],
    tagIds: [4, 5, 6],
    facultyIds: [1, 3],
    priceInr: 11999,
    priceUsd: 129,
    mode: "faculty_led",
    duration: "12 weeks",
    level: "Beginner",
    featured: false,
    enrolled: false,
    progress: 0,
    lessons: ["React fundamentals", "State and effects", "Project planning", "Live code review", "Mock interviews", "Portfolio launch"],
  }),
  makeCourse({
    id: 5,
    title: "Data Analytics With AI",
    slug: "data-analytics-with-ai",
    shortDescription: "Turn raw data into dashboards, insights, AI-assisted reports, and stakeholder-ready stories.",
    description: "<p>Practice analytics workflows, KPI modeling, prompt-assisted reporting, and dashboard storytelling with realistic datasets.</p>",
    asset: "course-data-ai.svg",
    categoryIds: [4],
    tagIds: [7, 3, 6],
    facultyIds: [5],
    priceInr: 8999,
    priceUsd: 99,
    mode: "hybrid",
    duration: "9 weeks",
    level: "Intermediate",
    featured: true,
    enrolled: false,
    progress: 0,
    lessons: ["Data cleaning", "KPI modeling", "AI report prompts", "Chart selection", "Dashboard critique", "Executive summary"],
  }),
  makeCourse({
    id: 6,
    title: "Cloud DevOps Foundations",
    slug: "cloud-devops-foundations",
    shortDescription: "Deploy apps with pipelines, monitoring, releases, backups, and cloud-ready operational habits.",
    description: "<p>Learn practical deployment flows, environment setup, CI patterns, logging, monitoring, and rollback planning.</p>",
    asset: "course-devops.svg",
    categoryIds: [5],
    tagIds: [8, 6],
    facultyIds: [4],
    priceInr: 6499,
    priceUsd: 69,
    mode: "self_learning",
    duration: "7 weeks",
    level: "Intermediate",
    featured: false,
    enrolled: true,
    progress: 28,
    lessons: ["Environment setup", "Build pipelines", "Release strategies", "Logs and alerts", "Backups", "Rollback drills"],
  }),
  makeCourse({
    id: 7,
    title: "Mobile App Launchpad",
    slug: "mobile-app-launchpad",
    shortDescription: "Plan, prototype, and ship a mobile app experience with polished onboarding and release flows.",
    description: "<p>A product-oriented course covering mobile UX, React Native-style patterns, release assets, and QA checklists.</p>",
    asset: "course-mobile.svg",
    categoryIds: [1, 3],
    tagIds: [3, 6],
    facultyIds: [6, 3],
    priceInr: 7499,
    priceUsd: 84,
    mode: "hybrid",
    duration: "8 weeks",
    level: "Intermediate",
    featured: false,
    enrolled: false,
    progress: 0,
    lessons: ["App scope", "Onboarding UX", "State flows", "Offline states", "Release assets", "QA checklist"],
  }),
  makeCourse({
    id: 8,
    title: "Cybersecurity Essentials",
    slug: "cybersecurity-essentials",
    shortDescription: "Understand web security, access control, safe releases, and practical threat modeling.",
    description: "<p>Learn security foundations with common web risks, secure defaults, permission checks, and team-ready review habits.</p>",
    asset: "course-security.svg",
    categoryIds: [2, 5],
    tagIds: [2, 8, 6],
    facultyIds: [2, 4],
    priceInr: 5999,
    priceUsd: 59,
    mode: "self_learning",
    duration: "5 weeks",
    level: "Beginner",
    featured: false,
    enrolled: false,
    progress: 0,
    lessons: ["Threat modeling", "Auth risks", "Input safety", "Secrets handling", "Security reviews", "Incident basics"],
  }),
  makeCourse({
    id: 9,
    title: "Product Design Sprint",
    slug: "product-design-sprint",
    shortDescription: "Run discovery, map flows, prototype screens, test ideas, and hand off design-ready specs.",
    description: "<p>A live sprint for founders, designers, and engineers who want structured product thinking and polished UX handoff.</p>",
    asset: "course-product-design.svg",
    categoryIds: [3],
    tagIds: [3, 5],
    facultyIds: [6],
    priceInr: 4999,
    priceUsd: 49,
    mode: "faculty_led",
    duration: "4 weeks",
    level: "All Levels",
    featured: true,
    enrolled: false,
    progress: 0,
    lessons: ["Problem framing", "User journey", "Wireframes", "Prototype review", "Usability test", "Handoff pack"],
  }),
];

users.forEach((user) => {
  user.taughtCourses = courses.filter((course) =>
    course.faculties.some((faculty: any) => faculty.id === user.id),
  );
});

const allLectures = courses.flatMap((course) =>
  course.chapters.flatMap((chapter: any) => chapter.lectures),
);

const courseToCartItem = (course: any, meta: any = {}) => ({
  id: course.id,
  title: course.title,
  price: Number(course.priceInr || 0),
  image: course.image?.path,
  slug: course.slug,
  instructor:
    meta.instructor ||
    course.faculties
      ?.map((faculty: any) =>
        [faculty.firstName, faculty.lastName].filter(Boolean).join(" "),
      )
      .join(", ") ||
    "Kasa Faculty",
  totalDuration: meta.totalDuration || course.duration || "Self paced",
  totalLectures:
    meta.totalLectures ||
    course.chapters?.flatMap((chapter: any) => chapter.lectures || []).length ||
    0,
});

const testimonials: any[] = [
  {
    id: "1",
    type: "TEXT",
    name: "Priya Sharma",
    designation: "Frontend Developer",
    company: "Demo Learner",
    message: "The course flow, progress states, and certificates make the theme feel ready for a real LMS launch.",
    rating: 5,
    avatar: file(71, "Student", "/assets/guest-user.webp"),
    avatarAlt: "Priya Sharma",
    video: null,
    isActive: true,
    isFeatured: true,
    priority: 1,
    status: "approved",
    courses: [courses[0]],
    createdAt: now,
    updatedAt: now,
  },
  {
    id: "2",
    type: "TEXT",
    name: "Mohit Jain",
    designation: "Agency Founder",
    company: "Demo Studio",
    message: "The static data makes the theme easy to preview, customize, and pitch without backend setup.",
    rating: 5,
    avatar: file(72, "Student", "/assets/guest-user.webp"),
    avatarAlt: "Mohit Jain",
    video: null,
    isActive: true,
    isFeatured: true,
    priority: 2,
    status: "approved",
    courses: [courses[1]],
    createdAt: now,
    updatedAt: now,
  },
  {
    id: "3",
    type: "TEXT",
    name: "Anika Rao",
    designation: "Learning Designer",
    company: "SkillWorks Demo",
    message: "Faculty profiles, live courses, free courses, paid courses, and learner pages all have believable content.",
    rating: 5,
    avatar: file(73, "Student", "/assets/guest-user.webp"),
    avatarAlt: "Anika Rao",
    video: null,
    isActive: true,
    isFeatured: true,
    priority: 3,
    status: "approved",
    courses: [courses[3], courses[8]],
    createdAt: now,
    updatedAt: now,
  },
  {
    id: "4",
    type: "TEXT",
    name: "Kabir Malhotra",
    designation: "Engineering Manager",
    company: "Demo Labs",
    message: "The catalog has enough variety to test cart icons, progress bars, featured listings, and dark mode cards.",
    rating: 4,
    avatar: file(74, "Student", "/assets/guest-user.webp"),
    avatarAlt: "Kabir Malhotra",
    video: null,
    isActive: true,
    isFeatured: false,
    priority: 4,
    status: "approved",
    courses: [courses[4], courses[5]],
    createdAt: now,
    updatedAt: now,
  },
];

courses.forEach((course) => {
  course.testimonials = testimonials.filter((item) =>
    item.courses.some((linked: any) => linked.id === course.id),
  );
});

const courseReviews = [
  {
    id: 1,
    rating: 5,
    comment:
      "The course detail page, learning player, and dashboard flow feel complete and easy to follow.",
    isPublished: true,
    user: users[0],
    course: courses[0],
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 2,
    rating: 4,
    comment:
      "Good static demo data for checking reviews, course tabs, and learner interactions.",
    isPublished: true,
    user: users[1],
    course: courses[0],
    createdAt: now,
    updatedAt: now,
  },
];

const courseReviewSummary = {
  average: 4.5,
  total: courseReviews.length,
  breakdown: [5, 4, 3, 2, 1].map((rating) => ({
    rating,
    count: courseReviews.filter((review) => review.rating === rating).length,
  })),
};

const courseQuestions = [
  {
    id: 1,
    title: "Can I customize the static course content?",
    body: "Where should I update the course, lessons, reviews, and exam demo data?",
    isResolved: true,
    isPublished: true,
    user: users[1],
    course: courses[0],
    answers: [
      {
        id: 1,
        body: "Yes. Update the objects in lib/static-api.ts. The adapter mirrors the original API response shapes.",
        isAccepted: true,
        isPublished: true,
        user: users[0],
        createdAt: now,
        updatedAt: now,
      },
    ],
    createdAt: now,
    updatedAt: now,
  },
];

const articles: any[] = [
  {
    id: 1,
    title: "How to structure a course catalog",
    slug: "how-to-structure-a-course-catalog",
    excerpt: "A practical guide to LMS categories, cards, faculty, and outcomes.",
    content: "<p>Use a clear catalog model with categories, levels, outcomes, pricing, and instructor context.</p>",
    featuredImage: file(81, "Article", "/assets/demo/article-learning.svg"),
    imageAlt: "Course catalog",
    status: "published",
    metaTitle: "Course catalog structure",
    metaDescription: "LMS catalog article.",
    metaSlug: "how-to-structure-a-course-catalog",
    viewCount: 1240,
    readingTime: 5,
    categories: [categories[5]],
    tags: [tags[2]],
    author: users[0],
    createdBy: users[0],
    updatedBy: users[0],
    isPublished: true,
    isFeatured: true,
    publishedAt: now,
    createdAt: now,
    updatedAt: now,
    deletedAt: null,
  },
  {
    id: 2,
    title: "Static data for theme demos",
    slug: "static-data-for-theme-demos",
    excerpt: "Why static JSON-style data is better for marketplace previews.",
    content: "<p>A static adapter removes setup friction while keeping realistic screens.</p>",
    featuredImage: file(82, "Article", "/assets/demo/article-static-theme.svg"),
    imageAlt: "Static data",
    status: "published",
    metaTitle: "Static theme data",
    metaDescription: "Static data article.",
    metaSlug: "static-data-for-theme-demos",
    viewCount: 980,
    readingTime: 4,
    categories: [categories[5]],
    tags: [tags[0]],
    author: users[1],
    createdBy: users[0],
    updatedBy: users[0],
    isPublished: true,
    isFeatured: true,
    publishedAt: now,
    createdAt: now,
    updatedAt: now,
    deletedAt: null,
  },
  {
    id: 3,
    title: "Designing LMS navigation that sells the demo",
    slug: "designing-lms-navigation-that-sells-the-demo",
    excerpt: "How mega menus, course groupings, and learner shortcuts make a marketplace preview feel complete.",
    content: "<p>A strong theme preview gives buyers fast access to course categories, faculty pages, learner flows, and commerce states.</p>",
    featuredImage: file(83, "Article", "/assets/demo/article-navigation.svg"),
    imageAlt: "LMS navigation",
    status: "published",
    metaTitle: "LMS navigation design",
    metaDescription: "Navigation article for LMS themes.",
    metaSlug: "designing-lms-navigation-that-sells-the-demo",
    viewCount: 860,
    readingTime: 6,
    categories: [categories[5]],
    tags: [tags[3], tags[2]],
    author: users[2],
    createdBy: users[0],
    updatedBy: users[0],
    isPublished: true,
    isFeatured: true,
    publishedAt: now,
    createdAt: now,
    updatedAt: now,
    deletedAt: null,
  },
  {
    id: 4,
    title: "Choosing course delivery modes",
    slug: "choosing-course-delivery-modes",
    excerpt: "A practical breakdown of self-learning, live batches, and hybrid courses for LMS products.",
    content: "<p>Course cards should clearly show whether a learner is buying recorded lessons, joining live classes, or getting a blended program.</p>",
    featuredImage: file(84, "Article", "/assets/demo/article-delivery.svg"),
    imageAlt: "Course delivery modes",
    status: "published",
    metaTitle: "Course delivery modes",
    metaDescription: "Course mode guide.",
    metaSlug: "choosing-course-delivery-modes",
    viewCount: 710,
    readingTime: 5,
    categories: [categories[5]],
    tags: [tags[4], tags[5]],
    author: users[5],
    createdBy: users[0],
    updatedBy: users[0],
    isPublished: true,
    isFeatured: false,
    publishedAt: now,
    createdAt: now,
    updatedAt: now,
    deletedAt: null,
  },
];

const siteSettings = {
  siteName: "Kasa LMS",
  siteTagline: "Practical coding courses for modern learners",
  siteDescription:
    "A polished LMS theme with courses, faculty, articles, certificates, dashboards, and dark mode.",
  logoUrl: "/assets/kasa-logo-light.png",
  footerLogoUrl: "/assets/kasa-logo-dark.png",
  faviconUrl: "/favicon.png",
  adminPanelName: "Kasa LMS",
  adminPanelIconUrl: "/assets/pwa-icon-192.png",
  supportEmail: "hello@kasalms.com",
  supportPhone: "+91 98765 43210",
  supportAddress: "India",
  footerAbout: "Static LMS theme powered by local demo data.",
  footerCopyright: "© 2026 Kasa LMS. All Rights Reserved",
  footerCtaEyebrow: "Start Learning",
  footerCtaHeading: "Build practical coding expertise with a complete LMS theme.",
  footerCtaDescription:
    "Explore courses, faculty profiles, learner dashboards, and content pages.",
  footerPrimaryCtaLabel: "Explore Courses",
  footerPrimaryCtaHref: "/courses",
  footerSecondaryCtaLabel: "Contact Us",
  footerSecondaryCtaHref: "/contact",
  facebookUrl: "",
  instagramUrl: "",
  youtubeUrl: "",
  linkedinUrl: "",
  twitterUrl: "",
};

const orders: any[] = [
  {
    id: 1001,
    userId: 1,
    user: users[0],
    subTotal: 79,
    discount: 0,
    tax: 0,
    totalAmount: 79,
    currency: "USD",
    autoDiscount: 0,
    manualDiscount: 0,
    autoCouponCode: null,
    manualCouponCode: null,
    status: OrderStatus.PAID,
    paymentId: "pay_static_1001",
    paymentMethod: "DEMO",
    billingAddress: {
      firstName: "Ava",
      lastName: "Patel",
      email: "ava-patel@kasalms.com",
      phoneNumber: "+91 90000 11001",
      address: "Static Demo Address",
      country: "India",
      state: "Delhi",
      city: "New Delhi",
      pincode: "110001",
    },
    items: [{ id: 1, courseId: 1, price: 79, quantity: 1, course: courses[0] }],
    refundRequests: [],
    createdAt: now,
    updatedAt: now,
    paidAt: now,
  },
];

const coupons: any[] = [
  {
    id: 1,
    code: "KASA25",
    type: CouponType.PERCENTAGE,
    value: 25,
    maxDiscount: 2500,
    minOrderValue: 4999,
    scope: CouponScope.GLOBAL,
    applicableCourseIds: [],
    isAutoApply: true,
    usageLimit: 500,
    usedCount: 186,
    perUserLimit: 1,
    validFrom: "2026-05-01T00:00:00.000Z",
    validTill: "2026-06-30T23:59:59.000Z",
    status: CouponStatus.ACTIVE,
    createdAt: "2026-05-01T09:00:00.000Z",
    updatedAt: now,
    deletedAt: null,
  },
  {
    id: 2,
    code: "NEXTJS1000",
    type: CouponType.FIXED,
    value: 1000,
    maxDiscount: 1000,
    minOrderValue: 6999,
    scope: CouponScope.COURSE,
    applicableCourseIds: [1, 4],
    isAutoApply: false,
    usageLimit: 120,
    usedCount: 48,
    perUserLimit: 1,
    validFrom: "2026-05-05T00:00:00.000Z",
    validTill: "2026-07-15T23:59:59.000Z",
    status: CouponStatus.ACTIVE,
    createdAt: "2026-05-05T09:00:00.000Z",
    updatedAt: now,
    deletedAt: null,
  },
  {
    id: 3,
    code: "LIVEBATCH15",
    type: CouponType.PERCENTAGE,
    value: 15,
    maxDiscount: 1800,
    minOrderValue: 9999,
    scope: CouponScope.COURSE,
    applicableCourseIds: [4, 9],
    isAutoApply: false,
    usageLimit: 80,
    usedCount: 22,
    perUserLimit: 1,
    validFrom: "2026-04-20T00:00:00.000Z",
    validTill: "2026-05-31T23:59:59.000Z",
    status: CouponStatus.ACTIVE,
    createdAt: "2026-04-20T09:00:00.000Z",
    updatedAt: now,
    deletedAt: null,
  },
  {
    id: 4,
    code: "ALUMNI500",
    type: CouponType.FIXED,
    value: 500,
    maxDiscount: 500,
    minOrderValue: 2999,
    scope: CouponScope.GLOBAL,
    applicableCourseIds: [],
    isAutoApply: false,
    usageLimit: 250,
    usedCount: 250,
    perUserLimit: 2,
    validFrom: "2026-03-01T00:00:00.000Z",
    validTill: "2026-04-30T23:59:59.000Z",
    status: CouponStatus.EXPIRED,
    createdAt: "2026-03-01T09:00:00.000Z",
    updatedAt: now,
    deletedAt: null,
  },
];

const contactLeads = [
  {
    id: 1,
    fullName: "Rohan Mehta",
    email: "rohan.mehta@example.com",
    phoneNumber: "+91 98765 12001",
    subject: "Need guidance for Full-Stack Next.js Mastery",
    message:
      "I want to understand the live session schedule and whether the course includes portfolio review.",
    status: "NEW",
    source: "Course detail page",
    pageUrl: "/course/full-stack-nextjs-mastery",
    adminNotes: "High intent learner. Call during evening slot.",
    user: null,
    createdAt: "2026-05-10T08:15:00.000Z",
    updatedAt: now,
  },
  {
    id: 2,
    fullName: "Nisha Kapoor",
    email: "nisha.kapoor@example.com",
    phoneNumber: "+91 98765 12002",
    subject: "Corporate team training",
    message:
      "Looking for a custom batch for 18 frontend engineers covering React, Tailwind, and design systems.",
    status: "QUALIFIED",
    source: "Contact page",
    pageUrl: "/contact",
    adminNotes: "Send enterprise demo proposal.",
    user: null,
    createdAt: "2026-05-09T14:20:00.000Z",
    updatedAt: now,
  },
  {
    id: 3,
    fullName: "Arjun Sethi",
    email: "arjun.sethi@example.com",
    phoneNumber: "+91 98765 12003",
    subject: "Coupon not applying",
    message:
      "Trying to enroll in API Architecture Bootcamp and want to know if NEXTJS1000 applies.",
    status: "CONTACTED",
    source: "Checkout",
    pageUrl: "/checkout",
    adminNotes: "Explained course-specific coupon scope.",
    user: users[1],
    createdAt: "2026-05-08T11:40:00.000Z",
    updatedAt: now,
  },
  {
    id: 4,
    fullName: "Meera Iyer",
    email: "meera.iyer@example.com",
    phoneNumber: "+91 98765 12004",
    subject: "Certificate verification",
    message:
      "Need details about final exam, certificate generation, and profile sharing after completion.",
    status: "CLOSED",
    source: "Certificates page",
    pageUrl: "/certificates",
    adminNotes: "Resolved with certificate flow documentation.",
    user: users[2],
    createdAt: "2026-05-07T10:05:00.000Z",
    updatedAt: now,
  },
];

const emailTemplates = [
  {
    id: 1,
    templateName: "welcome_learner",
    subject: "Welcome to Kasa LMS, {{firstName}}",
    body: "<p>Hi {{firstName}}, your learning dashboard is ready. Start with your enrolled courses and track progress from one place.</p>",
    createAt: "2026-05-01T09:00:00.000Z",
    updatedAt: now,
    deletedAt: null,
  },
  {
    id: 2,
    templateName: "purchase_confirmation",
    subject: "Your Kasa LMS order {{orderId}} is confirmed",
    body: "<p>Your course purchase is complete. Open {{courseTitle}} and continue learning from your dashboard.</p>",
    createAt: "2026-05-02T09:00:00.000Z",
    updatedAt: now,
    deletedAt: null,
  },
  {
    id: 3,
    templateName: "certificate_issued",
    subject: "Certificate issued for {{courseTitle}}",
    body: "<p>Congratulations {{firstName}}. Your certificate is ready to view, download, and share from your profile.</p>",
    createAt: "2026-05-03T09:00:00.000Z",
    updatedAt: now,
    deletedAt: null,
  },
  {
    id: 4,
    templateName: "live_class_reminder",
    subject: "Live class starts soon: {{classTitle}}",
    body: "<p>Your live class for {{courseTitle}} starts at {{startTime}}. Join from the classroom link in your dashboard.</p>",
    createAt: "2026-05-04T09:00:00.000Z",
    updatedAt: now,
    deletedAt: null,
  },
];

const engagementDashboard = {
  summary: {
    activeSchedulers: 2,
    enabledRules: 3,
    broadcastsSent: 5,
    scheduledBroadcasts: 1,
  },
  jobs: [
    {
      id: 1,
      name: "Daily learner nudge",
      slug: "daily-learner-nudge",
      description: "Send a gentle study reminder to active enrolled learners.",
      status: "active",
      triggerType: "cron",
      cronExpression: "0 9 * * *",
      timezone: "Asia/Kolkata",
      eventKey: null,
      actionType: "notification_broadcast",
      actionPayload: {
        title: "Your learning streak is waiting",
        message: "Open your current course and complete one lesson today.",
        audience: "enrolled_users",
      },
      conditions: { minProgress: 1 },
      lastRunAt: "2026-05-10T03:30:00.000Z",
      nextRunAt: "2026-05-11T03:30:00.000Z",
      runCount: 24,
      failureCount: 0,
      createdAt: "2026-04-15T09:00:00.000Z",
      updatedAt: now,
    },
    {
      id: 2,
      name: "Weekend course offer",
      slug: "weekend-course-offer",
      description: "Promote featured courses every Friday evening.",
      status: "active",
      triggerType: "cron",
      cronExpression: "0 18 * * 5",
      timezone: "Asia/Kolkata",
      eventKey: null,
      actionType: "notification_broadcast",
      actionPayload: {
        title: "Weekend learning offer",
        message: "Use KASA25 on selected programs before Sunday night.",
        audience: "all_users",
      },
      conditions: {},
      lastRunAt: "2026-05-08T12:30:00.000Z",
      nextRunAt: "2026-05-15T12:30:00.000Z",
      runCount: 8,
      failureCount: 0,
      createdAt: "2026-04-18T09:00:00.000Z",
      updatedAt: now,
    },
  ],
  rules: [
    {
      id: 1,
      eventKey: "course.enrolled",
      label: "Course enrollment welcome",
      description: "Welcome learners immediately after a successful purchase.",
      isEnabled: true,
      audience: "selected_users",
      channels: ["in_app", "email"],
      type: "success",
      titleTemplate: "Welcome to {{courseTitle}}",
      messageTemplate: "Your course is ready. Start with the first module today.",
      hrefTemplate: "/course/{{courseSlug}}/learn",
      imageUrl: "/assets/demo/course-nextjs.svg",
      filters: null,
      createdAt: "2026-04-12T09:00:00.000Z",
      updatedAt: now,
    },
    {
      id: 2,
      eventKey: "certificate.issued",
      label: "Certificate celebration",
      description: "Notify learners when a certificate is generated.",
      isEnabled: true,
      audience: "selected_users",
      channels: ["in_app", "email", "push"],
      type: "achievement",
      titleTemplate: "Certificate ready",
      messageTemplate: "Congratulations. Your {{courseTitle}} certificate is ready to share.",
      hrefTemplate: "/certificates",
      imageUrl: "/assets/demo/course-ui.svg",
      filters: null,
      createdAt: "2026-04-13T09:00:00.000Z",
      updatedAt: now,
    },
    {
      id: 3,
      eventKey: "class.reminder",
      label: "Live class reminder",
      description: "Remind learners before upcoming live sessions.",
      isEnabled: true,
      audience: "course_enrolled",
      channels: ["in_app", "push"],
      type: "info",
      titleTemplate: "{{classTitle}} starts soon",
      messageTemplate: "Join your live class from the classroom page.",
      hrefTemplate: "/classes",
      imageUrl: "/assets/demo/course-react-live.svg",
      filters: { offsetMinutes: 60 },
      createdAt: "2026-04-14T09:00:00.000Z",
      updatedAt: now,
    },
  ],
  broadcasts: [
    {
      id: 1,
      title: "New Product Design Sprint is live",
      message: "A 4-week faculty-led sprint is now open for enrollment.",
      href: "/course/product-design-sprint",
      imageUrl: "/assets/demo/course-product-design.svg",
      type: "announcement",
      audience: "all_users",
      channels: ["in_app", "email"],
      audienceFilters: null,
      status: "sent",
      scheduledAt: null,
      sentAt: "2026-05-09T12:00:00.000Z",
      recipientCount: 1260,
      deliveredCount: 1238,
      failureReason: null,
      stats: {
        totalRecipients: 1260,
        notificationsCreated: 1260,
        delivered: 1238,
        failed: 22,
        read: 842,
        clicked: 214,
        readRate: 68,
        clickRate: 17,
      },
      createdAt: "2026-05-09T09:00:00.000Z",
      updatedAt: now,
    },
    {
      id: 2,
      title: "Live React batch reminder",
      message: "Seats close tomorrow for the May React cohort.",
      href: "/course/live-react-career-accelerator",
      imageUrl: "/assets/demo/course-react-live.svg",
      type: "reminder",
      audience: "course_enrolled",
      channels: ["in_app", "push"],
      audienceFilters: { courseId: 4 },
      status: "scheduled",
      scheduledAt: "2026-05-11T13:30:00.000Z",
      sentAt: null,
      recipientCount: 320,
      deliveredCount: 0,
      failureReason: null,
      stats: {
        totalRecipients: 320,
        notificationsCreated: 0,
        delivered: 0,
        failed: 0,
        read: 0,
        clicked: 0,
        readRate: 0,
        clickRate: 0,
      },
      createdAt: "2026-05-10T09:00:00.000Z",
      updatedAt: now,
    },
  ],
};

const mediaFiles = [
  file(60, "Full-Stack Next.js cover", "/assets/demo/course-nextjs.svg"),
  file(61, "API Architecture cover", "/assets/demo/course-api.svg"),
  file(62, "UI Systems cover", "/assets/demo/course-ui.svg"),
  file(63, "Live React cover", "/assets/demo/course-react-live.svg"),
  file(64, "Data and AI cover", "/assets/demo/course-data-ai.svg"),
  file(71, "Learner avatar placeholder", "/assets/guest-user.webp"),
  file(81, "Learning article", "/assets/demo/article-learning.svg"),
  file(82, "Static theme article", "/assets/demo/article-static-theme.svg"),
  file(201, "Kasa light logo", "/assets/kasa-logo-light.png"),
  file(202, "Kasa dark logo", "/assets/kasa-logo-dark.png"),
];

const countries = [
  { id: 1, name: "India", countryCode: "IN" },
];

const states = [
  { id: 1, countryId: 1, name: "Delhi" },
  { id: 2, countryId: 1, name: "Maharashtra" },
  { id: 3, countryId: 1, name: "Karnataka" },
  { id: 4, countryId: 1, name: "Rajasthan" },
  { id: 5, countryId: 1, name: "Gujarat" },
  { id: 6, countryId: 1, name: "Uttar Pradesh" },
];

const cities = [
  { id: 1, stateId: 1, name: "New Delhi" },
  { id: 2, stateId: 1, name: "Dwarka" },
  { id: 3, stateId: 2, name: "Mumbai" },
  { id: 4, stateId: 2, name: "Pune" },
  { id: 5, stateId: 3, name: "Bengaluru" },
  { id: 6, stateId: 3, name: "Mysuru" },
  { id: 7, stateId: 4, name: "Jaipur" },
  { id: 8, stateId: 4, name: "Udaipur" },
  { id: 9, stateId: 5, name: "Ahmedabad" },
  { id: 10, stateId: 5, name: "Surat" },
  { id: 11, stateId: 6, name: "Lucknow" },
  { id: 12, stateId: 6, name: "Noida" },
];

const notifications = [
  {
    id: 1,
    title: "Welcome to Kasa LMS",
    message: "Static theme mode is active.",
    type: "system",
    isRead: false,
    clickedAt: null,
    readAt: null,
    createdAt: now,
    updatedAt: now,
  },
];

const paginated = <T>(data: T[]) => ({
  data,
  meta: {
    itemsPerPage: data.length || 10,
    totalItems: data.length,
    currentPage: 1,
    totalPages: 1,
  },
  links: {
    first: "",
    last: "",
    current: "",
    next: "",
    previous: "",
  },
});

const ok = <T>(data: T) => ({ apiVersion: "static", data });

const byId = <T extends { id: number | string }>(items: T[], id: string) =>
  items.find((item) => String(item.id) === id) || items[0];

const publicProfile = (user = users[0]) => ({
  user,
  stats: dashboardStats,
  weeklyProgress,
  courses,
  certificates,
  examHistory,
});

const dashboardStats = {
  courses: courses.length,
    completed: courses.filter((course) => course.progress.isCompleted).length,
    progress: 61,
    examsTaken: 5,
    examsPassed: 4,
    certificatesEarned: 2,
  learningSummary: {
    totalCourses: courses.length,
    completedCourses: courses.filter((course) => course.progress.isCompleted).length,
    averageProgress: 61,
    recordedCourses: courses.filter((course) => course.mode === "self_learning" || course.mode === "hybrid").length,
    liveCourses: courses.filter((course) => course.mode === "faculty_led" || course.mode === "hybrid").length,
    upcomingLiveClasses: 4,
    completedLiveClasses: 11,
    attendedLiveClasses: 9,
    missedLiveClasses: 2,
    courses: courses.map((course) => ({
      courseId: course.id,
      title: course.title,
      slug: course.slug,
      mode: course.mode,
      overallProgress: course.progress.progress,
      recorded: {
        enabled: true,
        totalLectures: course.chapters.flatMap((chapter: any) => chapter.lectures).length,
        completedLectures: 1,
        progress: course.progress.progress,
      },
      live: {
        enabled: course.mode === "faculty_led" || course.mode === "hybrid",
        completedClasses: 4,
        attendedClasses: 3,
        missedClasses: 1,
        upcomingClasses: 1,
        progress: 75,
      },
    })),
  },
};

const weeklyProgress = [
  { day: "Mon", progress: 20 },
  { day: "Tue", progress: 35 },
  { day: "Wed", progress: 45 },
  { day: "Thu", progress: 62 },
  { day: "Fri", progress: 74 },
  { day: "Sat", progress: 80 },
  { day: "Sun", progress: 86 },
];

const certificates = [
  {
    id: 1,
    certificateNumber: "KASA-2026-001",
    issuedAt: now,
    emailedAt: now,
    file: file(91, "Certificate", "/assets/default-cover.jpg"),
    user: users[0],
    course: { id: 3, title: courses[2].title, slug: courses[2].slug },
    createdAt: now,
    updatedAt: now,
  },
];

const courseCertificate = {
  id: 2,
  certificateNumber: "KASA-2026-002",
  issuedAt: now,
  emailedAt: null,
  file: file(92, "Course Certificate", "/assets/default-cover.jpg"),
  user: users[0],
  course: { id: courses[0].id, title: courses[0].title, slug: courses[0].slug },
  createdAt: now,
  updatedAt: now,
};

const certificateRows = [
  {
    id: 1,
    enrolledAt: "2026-04-01T09:00:00.000Z",
    learner: users[0],
    course: { id: courses[2].id, title: courses[2].title, slug: courses[2].slug },
    progress: 100,
    totalLectures: 6,
    completedLectures: 6,
    examRequired: true,
    examPassed: true,
    courseCompleted: true,
    status: "issued",
    actionHint: "Certificate is issued and ready to download.",
    certificate: certificates[0],
  },
  {
    id: 2,
    enrolledAt: "2026-04-18T09:00:00.000Z",
    learner: users[1],
    course: { id: courses[0].id, title: courses[0].title, slug: courses[0].slug },
    progress: 100,
    totalLectures: 6,
    completedLectures: 6,
    examRequired: true,
    examPassed: true,
    courseCompleted: true,
    status: "ready_to_generate",
    actionHint: "Learner passed all requirements. Generate certificate.",
    certificate: null,
  },
  {
    id: 3,
    enrolledAt: "2026-04-22T09:00:00.000Z",
    learner: users[2],
    course: { id: courses[0].id, title: courses[0].title, slug: courses[0].slug },
    progress: 100,
    totalLectures: 6,
    completedLectures: 6,
    examRequired: true,
    examPassed: false,
    courseCompleted: true,
    status: "exam_pending",
    actionHint: "Final exam must be passed before certificate generation.",
    certificate: null,
  },
  {
    id: 4,
    enrolledAt: "2026-05-01T09:00:00.000Z",
    learner: users[3],
    course: { id: courses[5].id, title: courses[5].title, slug: courses[5].slug },
    progress: 68,
    totalLectures: 6,
    completedLectures: 4,
    examRequired: false,
    examPassed: false,
    courseCompleted: false,
    status: "course_incomplete",
    actionHint: "Learner needs to finish remaining lessons.",
    certificate: null,
  },
];

const adminCertificateDashboard = {
  summary: {
    enrolledLearners: certificateRows.length,
    issuedCertificates: certificateRows.filter((row) => row.status === "issued").length,
    readyToGenerate: certificateRows.filter((row) => row.status === "ready_to_generate").length,
    examPending: certificateRows.filter((row) => row.status === "exam_pending").length,
    courseIncomplete: certificateRows.filter((row) => row.status === "course_incomplete").length,
  },
  rows: certificateRows,
};

const examHistory = [
  {
    course: { id: courses[0].id, title: courses[0].title, slug: courses[0].slug },
    attemptsCount: 2,
    bestScore: 86,
    latestScore: 86,
    latestMaxScore: 100,
    latestPercentage: 86,
    passed: true,
    lastAttemptedAt: now,
  },
];

const exams = [
  {
    id: 1,
    title: "Next.js Final Assessment",
    description: "Static demo exam",
    status: "published",
    course: courses[0],
    courseId: 1,
    faculty: users[0],
    facultyId: 1,
    createdAt: now,
    updatedAt: now,
  },
];

const learnerExamQuestions = [
  {
    id: 1,
    title: "Static data flow",
    prompt: "Where does this theme read demo data from?",
    type: "mcq_single",
    points: 5,
    allowPartialMarking: false,
    options: [
      { id: "a", text: "lib/static-api.ts", isCorrect: true },
      { id: "b", text: "A remote database", isCorrect: false },
      { id: "c", text: "Docker compose", isCorrect: false },
    ],
    matchingPairs: [],
    explanation: "The static adapter provides local API-shaped responses.",
  },
  {
    id: 2,
    title: "Course page sections",
    prompt: "Which sections are included in the course detail page?",
    type: "mcq_multiple",
    points: 5,
    allowPartialMarking: true,
    options: [
      { id: "a", text: "Overview and curriculum", isCorrect: true },
      { id: "b", text: "Instructor and reviews", isCorrect: true },
      { id: "c", text: "Only a single hero banner", isCorrect: false },
    ],
    matchingPairs: [],
    explanation: "The course page keeps all original tabs and rich sections.",
  },
];

const learnerSubmittedAttempt = {
  id: 1,
  status: "submitted",
  startedAt: now,
  expiresAt: null,
  submittedAt: now,
  score: 10,
  maxScore: 10,
  percentage: 100,
  passed: true,
  needsManualGrading: false,
  questions: learnerExamQuestions,
  answers: [
    { questionId: 1, answer: "a" },
    { questionId: 2, answer: ["a", "b"] },
  ],
  questionResults: [
    { questionId: 1, score: 5, maxScore: 5, isCorrect: true },
    { questionId: 2, score: 5, maxScore: 5, isCorrect: true },
  ],
};

const learnerActiveAttempt = {
  ...learnerSubmittedAttempt,
  id: 2,
  status: "in_progress",
  submittedAt: null,
  score: 0,
  maxScore: 10,
  percentage: 0,
  passed: false,
  answers: [],
  questionResults: [],
  expiresAt: "2026-05-10T12:00:00.000Z",
};

const learnerExamPayload = {
  exam: {
    id: 1,
    title: "Next.js Theme Final Assessment",
    description:
      "A short static exam to demonstrate the learner exam workspace.",
    instructions:
      "Answer each question and submit to see the result state, certificate prompt, and review screen.",
    passingPercentage: 70,
    durationMinutes: 30,
    attemptLimit: 3,
    randomizeQuestions: false,
    shuffleOptions: false,
    fullscreenRequired: false,
    serverTimerEnabled: true,
    autoSubmitEnabled: true,
    perQuestionFeedbackEnabled: true,
    overallFeedback: "Great work. You understand how the static theme is wired.",
    correctAnswerVisibility: "after_submit",
  },
  activeAttempt: null,
  attempts: [learnerSubmittedAttempt],
  attemptsUsed: 1,
  extraAttempts: 0,
  effectiveAttemptLimit: 3,
  attemptsRemaining: 2,
  canAttempt: true,
  isPassed: true,
  isUnlocked: true,
  unlockProgress: 100,
  unlockMessage: "Final exam is unlocked.",
};

const classSessions = [
  {
    id: 1,
    title: "Live doubt solving",
    description: "Weekly live class for project review and learner questions.",
    startsAt: now,
    endsAt: "2026-05-10T10:00:00.000Z",
    timezone: "Asia/Kolkata",
    status: "scheduled",
    meetingUrl: "https://example.com/live-class",
    hasBbbMeeting: false,
    bbbIsRunning: false,
    bbbParticipantCount: 0,
    bbbModeratorCount: 0,
    bbbRecord: true,
    allowRecordingAccess: true,
    location: null,
    attendance: { attended: false, joinedAt: null },
    reminderBeforeMinutes: 30,
    reminderOffsetsMinutes: [60, 15],
    sentReminderOffsetsMinutes: [],
    recordings: [],
    batch: { id: 1, name: "May Cohort" },
    course: { id: courses[0].id, title: courses[0].title, slug: courses[0].slug },
    faculty: {
      id: users[0].id,
      firstName: users[0].firstName,
      lastName: users[0].lastName,
    },
  },
];

export async function staticApiRequest<T>(
  rawUrl: string,
  method: Method,
  body?: unknown,
): Promise<T> {
  const normalized = rawUrl.startsWith("/api/")
    ? rawUrl.slice(4)
    : rawUrl.startsWith("http")
      ? new URL(rawUrl).pathname
      : rawUrl;
  const [path, queryString = ""] = normalized.split("?");
  const parts = path.split("/").filter(Boolean);

  if (method !== "GET") {
    if (path.includes("sign-in") || path.includes("refresh-tokens")) {
      return ok({ user: users[0], accessToken: "static-token" }) as T;
    }
    if (path.includes("sign-out")) return ok({ message: "Signed out" }) as T;
    if (path === "/courses") {
      return ok({
        ...courses[0],
        id: 100,
        title: (body as any)?.title || "New Static Demo Course",
        slug: ((body as any)?.title || "new-static-demo-course")
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/^-|-$/g, ""),
        isPublished: false,
        isFeatured: false,
        progress: { isCompleted: false, progress: 0, lastTime: 0 },
        createdAt: now,
        updatedAt: now,
      }) as T;
    }
    if (path.startsWith("/courses/") && path.endsWith("/duplicate")) {
      const source = byId(courses, parts[1]);
      return ok({
        ...source,
        id: 101,
        title: `${source.title} Copy`,
        slug: `${source.slug}-copy`,
        isPublished: false,
        isFeatured: false,
        createdAt: now,
        updatedAt: now,
      }) as T;
    }
    if (parts[0] === "courses" && parts[1]) {
      return ok({ ...byId(courses, parts[1]), ...(body as object), updatedAt: now }) as T;
    }
    if (path === "/articles") {
      return ok({
        ...articles[0],
        id: 100,
        title: (body as any)?.title || "New Static Demo Article",
        slug: (body as any)?.slug || "new-static-demo-article",
        status: "draft",
        isPublished: false,
        isFeatured: false,
        publishedAt: null,
        createdAt: now,
        updatedAt: now,
      }) as T;
    }
    if (parts[0] === "articles" && parts[1]) {
      return ok({ ...byId(articles, parts[1]), ...(body as object), updatedAt: now }) as T;
    }
    if (path === "/coupons") {
      return ok({
        ...coupons[0],
        id: 100,
        code: (body as any)?.code || "DEMO100",
        status: CouponStatus.ACTIVE,
        usedCount: 0,
        createdAt: now,
        updatedAt: now,
      }) as T;
    }
    if (path === "/coupons/apply" || path === "/coupons/auto-apply") {
      const cartTotal = Number((body as any)?.cartTotal || 0);
      const discount = Math.min(Math.round(cartTotal * 0.15), 1500);
      return ok({
        couponId: coupons[0].id,
        code: coupons[0].code,
        discount,
        finalAmount: Math.max(cartTotal - discount, 0),
      }) as T;
    }
    if (path === "/coupons/auto-apply-bulk") {
      const items = Array.isArray((body as any)?.courses) ? (body as any).courses : [];
      return ok({
        data: Object.fromEntries(
          items.map((item: any) => {
            const discount = Math.min(Math.round(Number(item.price || 0) * 0.15), 1500);
            return [
              item.id,
              {
                couponId: coupons[0].id,
                code: coupons[0].code,
                discount,
                finalAmount: Math.max(Number(item.price || 0) - discount, 0),
              },
            ];
          }),
        ),
      }) as T;
    }
    if (parts[0] === "coupons" && parts[1]) {
      return ok({ ...byId(coupons, parts[1]), ...(body as object), updatedAt: now }) as T;
    }
    if (path === "/users") return ok({ ...users[0], id: 100, ...(body as object), createdAt: now, updatedAt: now }) as T;
    if (path.startsWith("/users/update/") || path.startsWith("/users/update-profile/")) {
      return ok({ ...byId(users, parts.at(-1) || "1"), ...(body as object), updatedAt: now }) as T;
    }
    if (path === "/categories" || path === "/tags" || path === "/email-templates") {
      return ok({ id: 100, ...(body as object), createdAt: now, updatedAt: now, deletedAt: null }) as T;
    }
    if (path === "/tags/bulk") {
      const names = Array.isArray((body as any)?.names) ? (body as any).names : [];
      return ok(
        names.map((name: string, index: number) => ({
          id: 100 + index,
          name,
          slug: name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""),
          description: "Static demo tag",
          createdAt: now,
          updatedAt: now,
        })),
      ) as T;
    }
    if (path.startsWith("/engagement/broadcasts")) {
      return ok({ ...engagementDashboard.broadcasts[0], ...(body as object), id: 100, updatedAt: now }) as T;
    }
    if (path.startsWith("/engagement/notification-rules")) {
      return ok({ ...engagementDashboard.rules[0], ...(body as object), id: 100, updatedAt: now }) as T;
    }
    if (path.startsWith("/engagement/schedulers")) {
      return ok({ ...engagementDashboard.jobs[0], ...(body as object), id: 100, updatedAt: now }) as T;
    }
    if (path.startsWith("/contact-leads/")) {
      return ok({ ...byId(contactLeads, parts.at(-1) || "1"), ...(body as object), updatedAt: now }) as T;
    }
    if (path === "/uploads/init") {
      return ok({ uploadId: 100, url: "/assets/default-cover.jpg", key: "static-demo-upload" }) as T;
    }
    if (path.startsWith("/uploads/confirm/") || path === "/uploads/file") {
      return ok(file(100, "Static demo upload", "/assets/default-cover.jpg")) as T;
    }
    if (path.includes("orders")) {
      return ok({
        orderId: orders[0].id,
        gatewayOrderId: "order_static_demo",
        amount: orders[0].totalAmount,
        currency: orders[0].currency,
        courses: courses.map(({ id, slug, title }) => ({ id, slug, title })),
      }) as T;
    }
    if (path === "/cart/sync") {
      const items = Array.isArray((body as any)?.items)
        ? (body as any).items
        : [];
      const cartItems = items
        .map((item: any) => {
          const course = courses.find(
            (currentCourse) => currentCourse.id === Number(item.courseId),
          );
          return course ? courseToCartItem(course, item) : null;
        })
        .filter(Boolean);

      return ok({ id: 1, items: cartItems }) as T;
    }
    if (path === "/cart") {
      return ok({ success: true }) as T;
    }
    if (path.startsWith("/exams/course/") && path.endsWith("/attempts/start")) {
      return ok(learnerActiveAttempt) as T;
    }
    if (path.startsWith("/exams/attempts/") && path.endsWith("/submit")) {
      return ok(learnerSubmittedAttempt) as T;
    }
    if (path.startsWith("/certificates/course/") && path.endsWith("/generate")) {
      return ok(courseCertificate) as T;
    }
    if (path.includes("/course-reviews/")) {
      return ok({ ...courseReviews[0], ...(body as object) }) as T;
    }
    if (path.includes("/course-qa/")) {
      return ok(courseQuestions[0]) as T;
    }
    return ok(body || { success: true, message: "Static theme action" }) as T;
  }

  if (path === "/installer/status") return ok({ isInstalled: true }) as T;
  if (path === "/auth/profile" || path === "/users/me") return ok(users[0]) as T;
  if (path === "/settings/public") {
    return ok({ site: siteSettings, socialProviders: [] }) as T;
  }
  if (path === "/settings/gateways/active") {
    return ok([{ provider: "DEMO", displayName: "Demo Checkout" }]) as T;
  }
  if (path === "/settings/gateways") {
    return ok([
      {
        id: 1,
        provider: "COD",
        displayName: "Demo Checkout",
        mode: "TEST",
        isActive: true,
        keyIdPreview: "demo_theme_mode",
        hasKeySecret: false,
        hasWebhookSecret: false,
        webhookUrl: null,
        createdAt: now,
        updatedAt: now,
      },
    ]) as T;
  }
  if (path === "/settings/site") return ok(siteSettings) as T;
  if (path === "/settings/email") {
    return ok({
      isEnabled: false,
      smtpHost: "",
      smtpPort: 587,
      secure: false,
      smtpUser: "",
      smtpPassword: "",
      hasPassword: false,
      fromName: "Kasa LMS",
      fromEmail: "hello@kasalms.com",
      replyToEmail: "hello@kasalms.com",
    }) as T;
  }
  if (path === "/settings/aws-storage") {
    return ok({ isEnabled: false, region: "", bucketName: "", cloudfrontUrl: "", accessKeyId: "", accessKeySecret: "", hasAccessKeySecret: false }) as T;
  }
  if (path === "/settings/bbb") {
    return ok({ isEnabled: false, apiUrl: "", sharedSecret: "", hasSharedSecret: false, defaultRecord: true, autoStartRecording: false, allowStartStopRecording: true, meetingExpireIfNoUserJoinedInMinutes: 30 }) as T;
  }
  if (path === "/settings/push-notifications") {
    return ok({ isEnabled: false, subject: "mailto:hello@kasalms.com", publicKey: "", privateKey: "", hasPrivateKey: false }) as T;
  }
  if (path === "/settings/social-auth" || path === "/settings/social-auth/active") {
    return ok(path.endsWith("active") ? [] : { providers: [] }) as T;
  }
  if (path === "/settings/payment-config") return ok({ keyId: "demo_theme_mode" }) as T;

  if (path === "/countries") return ok(countries) as T;
  if (path.startsWith("/countries/") && path.endsWith("/states")) {
    const countryId = Number(parts[1]);
    return ok(states.filter((state) => state.countryId === countryId)) as T;
  }
  if (path.startsWith("/states/") && path.endsWith("/cities")) {
    const stateId = Number(parts[1]);
    return ok(cities.filter((city) => city.stateId === stateId)) as T;
  }

  if (path === "/courses/featured") {
    return ok(courses.filter((course) => course.isFeatured)) as T;
  }
  if (path === "/courses") {
    return ok(queryString.includes("isPublished=true") ? courses : { data: courses }) as T;
  }
  if (path === "/courses/enrolled/1" || path.startsWith("/courses/enrolled/")) return ok(courses) as T;
  if (path.startsWith("/courses/slug/")) {
    return ok(courses.find((course) => course.slug === parts.at(-1)) || courses[0]) as T;
  }
  if (path.startsWith("/courses/learn/")) {
    return ok(courses.find((course) => course.slug === parts.at(-1)) || courses[0]) as T;
  }
  if (path.startsWith("/courses/related/")) return ok(courses.slice(0, 3)) as T;
  if (parts[0] === "courses" && parts[1]) return ok(byId(courses, parts[1])) as T;

  if (path === "/articles/featured") {
    return ok(articles.filter((article) => article.isFeatured)) as T;
  }
  if (path === "/articles") {
    return ok(queryString.includes("isPublished=true") ? articles : { data: articles }) as T;
  }
  if (path.startsWith("/articles/slug/")) {
    return ok(articles.find((article) => article.slug === parts.at(-1)) || articles[0]) as T;
  }
  if (path.startsWith("/articles/related/")) return ok(articles) as T;
  if (parts[0] === "articles" && parts[1]) return ok(byId(articles, parts[1])) as T;

  if (path === "/categories") {
    return ok(queryString ? paginated(categories) : { data: categories }) as T;
  }
  if (path === "/categories/by-type") {
    const type = new URLSearchParams(queryString).get("type")?.toLowerCase();
    return ok(
      categories.filter((category) =>
        type ? category.type?.toLowerCase() === type : true,
      ),
    ) as T;
  }
  if (parts[0] === "categories" && parts[1]) return ok(byId(categories, parts[1])) as T;
  if (path === "/tags/") return ok(tags) as T;
  if (path === "/tags") return ok({ data: tags }) as T;
  if (parts[0] === "tags" && parts[1]) return ok(byId(tags, parts[1])) as T;

  if (path === "/users") return ok(paginated(users)) as T;
  if (path === "/users/all-faculty") return ok(users) as T;
  if (path.startsWith("/users/faculty-profile/")) return ok(byId(users, parts.at(-1)!)) as T;
  if (path.startsWith("/users/public-profile/")) {
    const user = users.find((item) => item.username === parts.at(-1)) || users[0];
    return ok(publicProfile(user)) as T;
  }
  if (path.startsWith("/users/dashboard-stats/")) return ok(dashboardStats) as T;
  if (path.startsWith("/users/weekly-progress/")) return ok(weeklyProgress) as T;
  if (parts[0] === "users" && parts[1]) return ok(byId(users, parts[1])) as T;

  if (path === "/testimonials" || path === "/testimonials/public") {
    return ok(paginated(testimonials)) as T;
  }
  if (path === "/testimonials/featured") return ok(testimonials) as T;
  if (parts[0] === "testimonials" && parts[1]) return ok(byId(testimonials, parts[1])) as T;

  if (path === "/orders" || path === "/orders/my-orders") return ok(orders) as T;
  if (parts[0] === "orders" && parts[1]) return ok(byId(orders, parts[1])) as T;
  if (path === "/refund-requests/my" || path === "/refund-requests/admin") {
    return ok([
      {
        id: 1,
        order: orders[0],
        status: RefundRequestStatus.REQUESTED,
        reason: "Static demo refund request",
        customerNote: "Demo data",
        requestedAmount: 20,
        logs: [],
        createdAt: now,
        updatedAt: now,
      },
    ]) as T;
  }

  if (path === "/cart") return ok({ id: 1, items: [] }) as T;
  if (path === "/certificates/my") return ok(certificates) as T;
  if (path.startsWith("/certificates/course/")) return ok(courseCertificate) as T;
  if (path === "/certificates/admin/dashboard") {
    return ok(adminCertificateDashboard) as T;
  }
  if (path === "/course-exams/my-history") return ok(examHistory) as T;
  if (path === "/course-exams/admin-overview") {
    return ok({
      totalAttempts: 8,
      uniqueLearners: 5,
      passedAttempts: 6,
      certificatesIssued: certificates.length,
      averageScore: 82,
      passRate: 75,
      recentAttempts: [
        {
          id: 1,
          source: "advanced",
          learnerName: "Priya Sharma",
          courseTitle: courses[0].title,
          score: 86,
          maxScore: 100,
          percentage: 86,
          passed: true,
          submittedAt: now,
        },
      ],
      topCourses: [
        {
          courseId: courses[0].id,
          courseTitle: courses[0].title,
          attempts: 5,
          passCount: 4,
          averageScore: 84,
        },
      ],
    }) as T;
  }
  if (path.includes("access-overrides")) return ok([]) as T;

  if (path.startsWith("/exams/course/") && path.endsWith("/learner")) {
    return ok(learnerExamPayload) as T;
  }
  if (path === "/exams") return ok(paginated(exams)) as T;
  if (path === "/exams/question-bank/categories") return ok(paginated([{ id: 1, name: "General", description: "Static category", createdAt: now, updatedAt: now }])) as T;
  if (path === "/exams/question-bank/questions") return ok(paginated([{ id: 1, prompt: "What is a static theme?", type: "single", points: 5, options: [], createdAt: now, updatedAt: now }])) as T;
  if (parts[0] === "exams" && parts[1]) return ok(exams[0]) as T;

  if (path === "/faculty/workspace") {
    return ok({
      summary: {
        assignedCourses: courses.length,
        publishedCourses: courses.filter((course) => course.isPublished).length,
        selfLearningCourses: 2,
        facultyLedCourses: 1,
        hybridCourses: 1,
        activeStudents: 124,
        assignedExams: exams.length,
        pendingManualReviews: 2,
        upcomingClasses: 1,
        activeBatches: 1,
        upcomingBatches: 1,
        pendingReminders: 3,
      },
      courses: courses.map((course) => ({
        id: course.id,
        title: course.title,
        slug: course.slug,
        isPublished: course.isPublished,
        mode: course.mode,
        duration: course.duration,
        studentsCount: 42,
      })),
      exams: exams.map((exam) => ({
        id: exam.id,
        title: exam.title,
        slug: "nextjs-final-assessment",
        status: "published",
        courses: [{ id: courses[0].id, title: courses[0].title, slug: courses[0].slug }],
        attemptsCount: 8,
      })),
      recentAttempts: [
        {
          id: 1,
          learnerName: "Priya Sharma",
          courseTitle: courses[0].title,
          examTitle: "Next.js Final Assessment",
          percentage: 86,
          passed: true,
          status: "submitted",
          submittedAt: now,
        },
      ],
      upcomingSessions: [
        {
          id: 1,
          title: "Live doubt solving",
          batchName: "May Cohort",
          courseTitle: courses[0].title,
          startsAt: now,
          endsAt: "2026-05-10T10:00:00.000Z",
          status: "scheduled",
          meetingUrl: "https://example.com/live-class",
          hasBbbMeeting: false,
          bbbIsRunning: false,
          bbbParticipantCount: 0,
          bbbModeratorCount: 0,
          bbbRecord: true,
          allowRecordingAccess: true,
          reminderOffsetsMinutes: [60, 15],
          sentReminderOffsetsMinutes: [],
        },
      ],
      batches: [
        {
          id: 1,
          name: "May Cohort",
          status: "Active",
          rawStatus: "active",
          courseTitle: courses[0].title,
          startDate: now,
          endDate: "2026-07-10T09:00:00.000Z",
          studentsCount: 42,
          sessionsCount: 8,
        },
      ],
    }) as T;
  }
  if (path === "/faculty/batches") return ok([]) as T;
  if (path === "/faculty/courses") return ok(courses) as T;
  if (path === "/faculty/sessions" || path === "/class-sessions/my") return ok(classSessions) as T;
  if (path === "/faculty/recordings" || path === "/class-sessions/my/recordings") return ok([]) as T;
  if (path === "/faculty/exam-attempts") return ok([]) as T;

  if (path === "/notifications/my") return ok(notifications) as T;
  if (path === "/notifications/my/unread-count") return ok({ count: 1 }) as T;
  if (path === "/notifications/push/public-key") return ok({ isEnabled: false, publicKey: "" }) as T;

  if (path.startsWith("/course-reviews/course/") && path.endsWith("/summary")) {
    return ok(courseReviewSummary) as T;
  }
  if (path.startsWith("/course-reviews/course/") && path.endsWith("/mine")) {
    return ok(courseReviews[0]) as T;
  }
  if (path.startsWith("/course-reviews/course/")) return ok(courseReviews) as T;
  if (path === "/course-reviews") return ok(courseReviews) as T;

  if (path.startsWith("/course-qa/course/")) return ok(courseQuestions) as T;
  if (path === "/course-qa/questions") return ok(courseQuestions) as T;
  if (path === "/course-qa/answers") {
    return ok(courseQuestions.flatMap((question) => question.answers)) as T;
  }

  if (path === "/roles-permissions") return ok(roles) as T;
  if (path === "/roles-permissions/permissions") return ok(permissions) as T;
  if (path === "/roles-permissions/dashboard") {
    return ok({ roles, permissions, stats: { roles: roles.length, permissions: permissions.length } }) as T;
  }

  if (path === "/uploads") return ok(mediaFiles) as T;
  if (path === "/contact-leads") return ok(contactLeads) as T;
  if (path === "/coupons") return ok({ data: coupons }) as T;
  if (parts[0] === "coupons" && parts[1]) return ok(byId(coupons, parts[1])) as T;
  if (path === "/email-templates") return ok(paginated(emailTemplates)) as T;
  if (parts[0] === "email-templates" && parts[1]) return ok(byId(emailTemplates, parts[1])) as T;
  if (path === "/engagement/dashboard") return ok(engagementDashboard) as T;
  if (path.startsWith("/engagement/broadcasts/") && path.endsWith("/stats")) {
    return ok(engagementDashboard.broadcasts[0].stats) as T;
  }
  if (path.startsWith("/user-progress/course/")) {
    return ok(Object.fromEntries(allLectures.map((lecture) => [lecture.id, lecture.progress]))) as T;
  }
  if (path.startsWith("/user-progress/lecture/")) return ok(allLectures[0].progress) as T;

  return ok([]) as T;
}
