import { OrderStatus, RefundRequestStatus } from "@/types/order";

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

const users: any[] = [
  {
    id: 1,
    email: "admin@kasalms.com",
    firstName: "Satendra",
    lastName: "Kanak",
    phoneNumber: "+91 98765 43210",
    username: "satendra",
    avatar: file(21, "Faculty 1", "/assets/faculty-1.jpg"),
    coverImage: file(31, "Cover", "/assets/courses/banner-01.webp"),
    avatarUrl: "/assets/faculty-1.jpg",
    canRequestRefund: true,
    roles,
    profile: {
      id: 1,
      bio: "Founder mentor for practical coding and LMS programs.",
      isPublic: true,
      showCourses: true,
      showCertificates: true,
      location: "India",
      website: "https://codewithkasa.com",
      headline: "Full-stack mentor and academy founder",
      company: "Kasa LMS",
      linkedin: "https://linkedin.com",
      youtube: "https://youtube.com",
    },
    facultyProfile: {
      id: 1,
      expertise: "Next.js, API design, LMS architecture",
      experience: "10+ years",
      designation: "Lead Instructor",
      linkedin: "https://linkedin.com",
      isApproved: true,
    },
    createdAt: now,
    updatedAt: now,
    deletedAt: null,
  },
  {
    id: 2,
    email: "aarav@kasalms.com",
    firstName: "Aarav",
    lastName: "Mehta",
    phoneNumber: "+91 90000 11111",
    username: "aarav",
    avatar: file(22, "Faculty 2", "/assets/faculty-2.jpg"),
    coverImage: file(32, "Cover", "/assets/default-cover.jpg"),
    avatarUrl: "/assets/faculty-2.jpg",
    canRequestRefund: true,
    roles: [roles[1]],
    profile: {
      id: 2,
      bio: "Frontend systems coach focused on practical UI delivery.",
      isPublic: true,
      showCourses: true,
      showCertificates: true,
      location: "Bengaluru",
      headline: "Frontend Systems Coach",
      company: "Kasa LMS",
      linkedin: "https://linkedin.com",
    },
    facultyProfile: {
      id: 2,
      expertise: "React, Tailwind, Design Systems",
      experience: "8+ years",
      designation: "Senior Faculty",
      linkedin: "https://linkedin.com",
      isApproved: true,
    },
    createdAt: now,
    updatedAt: now,
    deletedAt: null,
  },
];

const categories = [
  {
    id: 1,
    name: "Web Development",
    slug: "web-development",
    type: "course",
    description: "Practical web development programs.",
    image: file(41, "Course category", "/assets/courses/course-1.jpg"),
    imageAlt: "Web development",
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 2,
    name: "API Design",
    slug: "API",
    type: "course",
    description: "API Design APIs and production systems.",
    image: file(42, "API Design", "/assets/courses/course-2.jpg"),
    imageAlt: "API Design",
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 3,
    name: "Learning Guides",
    slug: "learning-guides",
    type: "article",
    description: "Articles for learners and course creators.",
    image: null,
    imageAlt: null,
    createdAt: now,
    updatedAt: now,
  },
];

const tags = [
  { id: 1, name: "Next.js", slug: "nextjs", description: "Next.js courses", createdAt: now },
  { id: 2, name: "API", slug: "api", description: "API API", createdAt: now },
  { id: 3, name: "Career", slug: "career", description: "Career learning", createdAt: now },
];

const lectures = [
  {
    id: 1,
    chapterId: 1,
    title: "Project setup and architecture",
    description: "Understand the starter structure and theme data flow.",
    video: file(51, "Intro video", "/assets/default-cover.jpg", "video"),
    attachments: [],
    isFree: true,
    isPublished: true,
    position: 1,
    progress: { isCompleted: true, progress: 100, lastTime: 320 },
  },
  {
    id: 2,
    chapterId: 1,
    title: "Building responsive course sections",
    description: "Create reusable course, faculty, and article sections.",
    video: file(52, "Lesson video", "/assets/default-cover.jpg", "video"),
    attachments: [],
    isFree: false,
    isPublished: true,
    position: 2,
    progress: { isCompleted: false, progress: 45, lastTime: 180 },
  },
];

const courses: any[] = [
  {
    id: 1,
    title: "Full-Stack Next.js Mastery",
    slug: "full-stack-nextjs-mastery",
    shortDescription: "Build production LMS-grade apps with Next.js.",
    description:
      "<p>Learn App Router, components, static data, checkout flows, dashboards, and polished course pages.</p>",
    image: file(61, "Next course", "/assets/courses/course-1.jpg"),
    imageAlt: "Next.js course",
    video: null,
    isFree: false,
    isPublished: true,
    isFeatured: true,
    priceInr: "6999",
    priceUsd: "79",
    duration: "10 weeks",
    mode: "Recorded + Live",
    monthlyLiveClassLimit: 4,
    liveClassAttendanceRequirementType: "percentage",
    liveClassAttendanceRequirementValue: 70,
    certificate: "Certificate included",
    exams: "Final assessment",
    experienceLevel: "Intermediate",
    studyMaterial: "Downloadable notes",
    additionalBook: "Frontend architecture checklist",
    language: "English",
    technologyRequirements: "Laptop and modern browser",
    eligibilityRequirements: "Basic JavaScript knowledge",
    disclaimer: "Static demo content for theme preview.",
    faqs: [
      { question: "Is this API dependent?", answer: "No, the theme uses static demo data." },
      { question: "Can I connect APIs later?", answer: "Yes, replace the static adapter with real services." },
    ],
    exam: null,
    metaTitle: "Full-Stack Next.js Mastery",
    metaSlug: "full-stack-nextjs-mastery",
    metaDescription: "A practical Next.js LMS course.",
    categories: [categories[0]],
    tags: [tags[0], tags[2]],
    isEnrolled: true,
    progress: { isCompleted: false, progress: 54, lastTime: 180 },
    chapters: [
      {
        id: 1,
        courseId: 1,
        title: "Getting Started",
        description: "Kick off with theme structure and core sections.",
        lectures,
        isFree: true,
        isPublished: true,
        position: 1,
      },
    ],
    faculties: users,
    testimonials: [],
    createdBy: users[0],
    updatedBy: users[0],
    createdAt: now,
    updatedAt: now,
    deletedAt: null,
  },
  {
    id: 2,
    title: "Practical API Design Design",
    slug: "practical-api-API",
    shortDescription: "Design scalable APIs and clean service modules.",
    description: "<p>Master DTOs, modules, guards, TypeORM, queues, and deployable service patterns.</p>",
    image: file(62, "Nest course", "/assets/courses/course-2.jpg"),
    imageAlt: "API course",
    video: null,
    isFree: false,
    isPublished: true,
    isFeatured: true,
    priceInr: "7999",
    priceUsd: "89",
    duration: "8 weeks",
    mode: "Recorded",
    monthlyLiveClassLimit: null,
    liveClassAttendanceRequirementType: null,
    liveClassAttendanceRequirementValue: null,
    certificate: "Certificate included",
    exams: "Quizzes",
    experienceLevel: "Advanced",
    studyMaterial: "API notes",
    additionalBook: "API Design checklist",
    language: "English",
    technologyRequirements: "Node.js",
    eligibilityRequirements: "JavaScript basics",
    disclaimer: "Static demo content.",
    faqs: [],
    exam: null,
    metaTitle: "Practical API Design Design",
    metaSlug: "practical-api-API",
    metaDescription: "API Design course for LMS theme.",
    categories: [categories[1]],
    tags: [tags[1]],
    isEnrolled: true,
    progress: { isCompleted: false, progress: 32, lastTime: 120 },
    chapters: [],
    faculties: [users[0]],
    testimonials: [],
    createdBy: users[0],
    updatedBy: users[0],
    createdAt: now,
    updatedAt: now,
    deletedAt: null,
  },
  {
    id: 3,
    title: "UI Systems With Tailwind",
    slug: "ui-systems-with-tailwind",
    shortDescription: "Reusable layouts, cards, dashboards, and sections.",
    description: "<p>Create polished responsive interfaces with a theme-ready component approach.</p>",
    image: file(63, "Tailwind course", "/assets/courses/course-3.png"),
    imageAlt: "Tailwind course",
    video: null,
    isFree: true,
    isPublished: true,
    isFeatured: false,
    priceInr: "0",
    priceUsd: "0",
    duration: "6 weeks",
    mode: "Recorded",
    monthlyLiveClassLimit: null,
    liveClassAttendanceRequirementType: null,
    liveClassAttendanceRequirementValue: null,
    certificate: "Certificate included",
    exams: "Project",
    experienceLevel: "Beginner",
    studyMaterial: "UI kit notes",
    additionalBook: "",
    language: "English",
    technologyRequirements: "Browser",
    eligibilityRequirements: "None",
    disclaimer: "Static demo content.",
    faqs: [],
    exam: null,
    metaTitle: "UI Systems With Tailwind",
    metaSlug: "ui-systems-with-tailwind",
    metaDescription: "Tailwind course for LMS theme.",
    categories: [categories[0]],
    tags: [tags[2]],
    isEnrolled: true,
    progress: { isCompleted: true, progress: 100, lastTime: 500 },
    chapters: [],
    faculties: [users[1]],
    testimonials: [],
    createdBy: users[0],
    updatedBy: users[0],
    createdAt: now,
    updatedAt: now,
    deletedAt: null,
  },
];

users[0].taughtCourses = courses;
users[1].taughtCourses = [courses[2]];

const testimonials: any[] = [
  {
    id: "1",
    type: "TEXT",
    name: "Priya Sharma",
    designation: "Frontend Developer",
    company: "Learner",
    message: "The course flow and dashboard experience feel complete and premium.",
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
    company: "Studio",
    message: "Static data makes the theme easy to present and customize.",
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
    featuredImage: file(81, "Article", "/assets/default-cover.jpg"),
    imageAlt: "Course catalog",
    status: "published",
    metaTitle: "Course catalog structure",
    metaDescription: "LMS catalog article.",
    metaSlug: "how-to-structure-a-course-catalog",
    viewCount: 1240,
    readingTime: 5,
    categories: [categories[2]],
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
    featuredImage: file(82, "Article", "/assets/courses/banner-01.webp"),
    imageAlt: "Static data",
    status: "published",
    metaTitle: "Static theme data",
    metaDescription: "Static data article.",
    metaSlug: "static-data-for-theme-demos",
    viewCount: 980,
    readingTime: 4,
    categories: [categories[2]],
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
];

const siteSettings = {
  siteName: "Kasa LMS",
  siteTagline: "Practical coding courses for modern learners",
  siteDescription:
    "A polished LMS theme with courses, faculty, articles, certificates, dashboards, and dark mode.",
  logoUrl: "/assets/cwk-logo.png",
  footerLogoUrl: "/assets/cwk-logo.png",
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
    paymentMethod: "RAZORPAY",
    billingAddress: {
      firstName: "Satendra",
      lastName: "Kanak",
      email: "admin@kasalms.com",
      phoneNumber: "+91 98765 43210",
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
  completed: 1,
  progress: 62,
  examsTaken: 3,
  examsPassed: 2,
  certificatesEarned: 1,
  learningSummary: {
    totalCourses: courses.length,
    completedCourses: 1,
    averageProgress: 62,
    recordedCourses: 3,
    liveCourses: 1,
    upcomingLiveClasses: 2,
    completedLiveClasses: 8,
    attendedLiveClasses: 7,
    missedLiveClasses: 1,
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
        enabled: course.mode?.includes("Live"),
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
  file: file(92, "Course Certificate", "/assets/default-cover.jpg"),
  user: users[0],
  course: { id: courses[0].id, title: courses[0].title, slug: courses[0].slug },
  createdAt: now,
  updatedAt: now,
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
    if (path.includes("orders")) {
      return ok({
        orderId: orders[0].id,
        razorpayOrderId: "order_static_1001",
        amount: orders[0].totalAmount,
        currency: orders[0].currency,
        courses: courses.map(({ id, slug, title }) => ({ id, slug, title })),
      }) as T;
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
    return ok([{ provider: "RAZORPAY", displayName: "Razorpay" }]) as T;
  }
  if (path === "/settings/gateways") {
    return ok([
      {
        id: 1,
        provider: "RAZORPAY",
        displayName: "Razorpay",
        mode: "TEST",
        isActive: true,
        keyIdPreview: "rzp_test_****",
        hasKeySecret: true,
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
  if (path === "/settings/payment-config") return ok({ keyId: "rzp_test_static" }) as T;

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
  if (parts[0] === "categories" && parts[1]) return ok(byId(categories, parts[1])) as T;
  if (path === "/tags" || path === "/tags/") return ok({ data: tags }) as T;
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

  if (path === "/cart") return ok({ items: courses.slice(0, 1), total: 79 }) as T;
  if (path === "/certificates/my") return ok(certificates) as T;
  if (path.startsWith("/certificates/course/")) return ok(courseCertificate) as T;
  if (path === "/certificates/admin/dashboard") {
    return ok({ totalIssued: certificates.length, certificates }) as T;
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

  if (path === "/contact-leads") return ok([]) as T;
  if (path === "/coupons") return ok({ data: [] }) as T;
  if (path === "/email-templates") return ok(paginated([])) as T;
  if (path === "/engagement/dashboard") return ok({ broadcasts: [], rules: [], jobs: [], stats: {} }) as T;
  if (path.startsWith("/user-progress/course/")) {
    return ok(Object.fromEntries(lectures.map((lecture) => [lecture.id, lecture.progress]))) as T;
  }
  if (path.startsWith("/user-progress/lecture/")) return ok(lectures[0].progress) as T;

  return ok([]) as T;
}
