import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  BarChart3,
  BookOpen,
  CalendarDays,
  CheckCircle2,
  Clock3,
  GraduationCap,
  Layers3,
  LibraryBig,
  MonitorPlay,
  PlayCircle,
  ShieldCheck,
  Sparkles,
  Star,
  Users,
} from "lucide-react";

import Container from "@/components/container";
import { ArticleCard } from "@/components/articles/article-card";
import { FacultyCard } from "@/components/faculty/faculty-card";
import { TestimonialCard } from "@/components/testimonials/testimonial-card";
import type { HomeData } from "@/app/(website)/home-data";
import type { Course } from "@/types/course";

const formatPrice = (course: Course) => {
  const price = Number(course.priceInr || 0);
  return price ? `₹${new Intl.NumberFormat("en-IN").format(price)}` : "Free";
};

const getFacultyName = (course: Course) =>
  course.faculties
    ?.map((faculty) =>
      [faculty.firstName, faculty.lastName].filter(Boolean).join(" "),
    )
    .join(", ") || "Kasa Faculty";

const SectionHeading = ({
  eyebrow,
  title,
  description,
  align = "left",
}: {
  eyebrow: string;
  title: string;
  description: string;
  align?: "left" | "center";
}) => (
  <div
    className={
      align === "center"
        ? "mx-auto max-w-3xl text-center"
        : "max-w-3xl text-left"
    }
  >
    <span className="academy-badge mb-4">{eyebrow}</span>
    <h2 className="text-3xl font-semibold tracking-tight text-foreground md:text-5xl">
      {title}
    </h2>
    <p className="mt-4 text-base leading-7 text-muted-foreground">
      {description}
    </p>
  </div>
);

const CourseStripCard = ({ course, index }: { course: Course; index: number }) => (
  <Link
    href={`/course/${course.slug}`}
    className="group grid gap-4 rounded-3xl border border-border bg-card p-3 shadow-sm transition hover:-translate-y-1 hover:border-primary/30 hover:shadow-[0_28px_80px_color-mix(in_oklab,var(--primary)_16%,transparent)] sm:grid-cols-[180px_1fr]"
  >
    <div className="relative h-44 overflow-hidden rounded-2xl bg-muted sm:h-full">
      <Image
        src={course.image?.path || "/assets/default.png"}
        alt={course.imageAlt || course.title}
        fill
        sizes="(max-width: 640px) 100vw, 180px"
        className="object-cover transition duration-500 group-hover:scale-105"
      />
      <span className="absolute left-3 top-3 inline-flex size-9 items-center justify-center rounded-full bg-white text-sm font-bold text-primary shadow-sm">
        {index + 1}
      </span>
    </div>
    <div className="flex min-w-0 flex-col p-2">
      <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-muted-foreground">
        <span>{course.experienceLevel || "All Levels"}</span>
        <span className="size-1 rounded-full bg-muted-foreground/40" />
        <span>{course.duration || "Self paced"}</span>
      </div>
      <h3 className="mt-3 line-clamp-2 text-xl font-semibold text-card-foreground group-hover:text-primary">
        {course.title}
      </h3>
      <p className="mt-3 line-clamp-2 text-sm leading-6 text-muted-foreground">
        {course.shortDescription}
      </p>
      <div className="mt-auto flex flex-wrap items-center justify-between gap-3 pt-5">
        <span className="text-sm text-muted-foreground">
          By <strong className="text-foreground">{getFacultyName(course)}</strong>
        </span>
        <span className="text-lg font-semibold text-primary">
          {formatPrice(course)}
        </span>
      </div>
    </div>
  </Link>
);

const MiniCourseCard = ({ course }: { course: Course }) => (
  <Link
    href={`/course/${course.slug}`}
    className="group block overflow-hidden rounded-3xl border border-border bg-card shadow-sm transition hover:-translate-y-1 hover:border-primary/30 hover:shadow-[0_28px_80px_color-mix(in_oklab,var(--primary)_16%,transparent)]"
  >
    <div className="relative h-48 bg-muted">
      <Image
        src={course.image?.path || "/assets/default.png"}
        alt={course.imageAlt || course.title}
        fill
        sizes="(max-width: 768px) 100vw, 33vw"
        className="object-cover transition duration-500 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-linear-to-t from-black/70 via-transparent to-transparent" />
      <span className="absolute bottom-3 left-3 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-primary backdrop-blur">
        {course.mode?.replaceAll("_", " ") || "Course"}
      </span>
    </div>
    <div className="p-5">
      <h3 className="line-clamp-2 text-lg font-semibold group-hover:text-primary">
        {course.title}
      </h3>
      <p className="mt-3 line-clamp-2 text-sm leading-6 text-muted-foreground">
        {course.shortDescription}
      </p>
      <div className="mt-5 flex items-center justify-between">
        <span className="text-sm font-semibold text-primary">
          {formatPrice(course)}
        </span>
        <span className="inline-flex size-9 items-center justify-center rounded-full bg-primary/10 text-primary transition group-hover:bg-primary group-hover:text-primary-foreground">
          <ArrowRight className="size-4" />
        </span>
      </div>
    </div>
  </Link>
);

export function ClassicHomeVariant({
  courses,
  articles,
  testimonials,
  faculties,
}: HomeData) {
  const heroCourse = courses[0];

  return (
    <div className="bg-background">
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(135deg,#f8fbff_0%,#eef4ff_48%,#ffffff_100%)] dark:bg-[linear-gradient(135deg,#07111f_0%,#0d1b31_52%,#070b12_100%)]" />
        <div className="academy-grid-mask absolute inset-0 opacity-45" />
        <Container className="relative z-10 grid min-h-[720px] items-center gap-12 py-20 lg:grid-cols-[1.02fr_0.98fr]">
          <div>
            <span className="academy-badge mb-5">Home 2 · Classic Academy</span>
            <h1 className="max-w-4xl text-4xl font-semibold tracking-tight text-foreground md:text-6xl">
              Learn practical skills through guided courses, clear milestones,
              and expert support.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">
              A polished LMS homepage for course creators, academies, and
              digital learning brands that need trust, structure, and momentum.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/courses"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-primary px-7 text-sm font-semibold text-primary-foreground shadow-lg transition hover:-translate-y-0.5"
              >
                Browse courses <ArrowRight className="size-4" />
              </Link>
              <Link
                href="/about"
                className="inline-flex h-12 items-center justify-center rounded-full border border-border bg-card px-7 text-sm font-semibold text-foreground transition hover:-translate-y-0.5 hover:border-primary hover:text-primary"
              >
                About the academy
              </Link>
            </div>
            <div className="mt-10 grid max-w-xl grid-cols-3 gap-4">
              {[
                ["9+", "Courses"],
                ["6", "Faculty"],
                ["4.8", "Rating"],
              ].map(([value, label]) => (
                <div key={label} className="rounded-2xl border border-border bg-card p-4 shadow-sm">
                  <p className="text-2xl font-semibold text-foreground">{value}</p>
                  <p className="mt-1 text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                    {label}
                  </p>
                </div>
              ))}
            </div>
          </div>
          <div className="relative">
            <div className="absolute -inset-6 rounded-[2rem] bg-primary/10 blur-3xl" />
            <div className="relative overflow-hidden rounded-[2rem] border border-border bg-card p-4 shadow-[0_35px_120px_-60px_rgba(15,23,42,0.65)]">
              <div className="relative h-[420px] overflow-hidden rounded-[1.5rem] bg-muted">
                <Image
                  src={heroCourse?.image?.path || "/assets/demo/course-nextjs.svg"}
                  alt={heroCourse?.title || "Featured course"}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 520px"
                  className="object-cover"
                />
              </div>
              <div className="grid gap-3 pt-4 sm:grid-cols-3">
                {courses.slice(0, 3).map((course) => (
                  <Link
                    key={course.id}
                    href={`/course/${course.slug}`}
                    className="rounded-2xl border border-border bg-background p-3 transition hover:border-primary"
                  >
                    <p className="line-clamp-2 text-sm font-semibold">{course.title}</p>
                    <p className="mt-2 text-xs text-muted-foreground">{course.duration}</p>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="py-24">
        <Container>
          <SectionHeading
            eyebrow="Featured Programs"
            title="Course cards built for marketplace browsing."
            description="Paid, free, live, hybrid, and enrolled states all use the same demo content."
            align="center"
          />
          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {courses.slice(0, 6).map((course) => (
              <MiniCourseCard key={course.id} course={course} />
            ))}
          </div>
        </Container>
      </section>

      <Faculty faculties={faculties} />
      <TestimonialsCompact testimonials={testimonials} />
      <ArticlesCompact articles={articles} />
    </div>
  );
}

export function CohortHomeVariant({
  courses,
  articles,
  testimonials,
  faculties,
}: HomeData) {
  const liveCourses = courses.filter((course) => course.mode !== "self_learning");
  const leadFaculty = faculties[0];

  return (
    <div className="bg-background">
      <section className="relative overflow-hidden bg-slate-950 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(37,99,235,0.42),transparent_34%),radial-gradient(circle_at_86%_18%,rgba(239,68,68,0.22),transparent_28%),linear-gradient(135deg,#020617_0%,#0f172a_55%,#111827_100%)]" />
        <div className="academy-hero-grid absolute inset-0 opacity-25" />
        <Container className="relative z-10 grid min-h-[760px] items-center gap-12 py-20 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <span className="mb-5 inline-flex rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.24em] text-white backdrop-blur">
              Home 3 · Live Cohort
            </span>
            <h1 className="max-w-3xl text-4xl font-semibold tracking-tight md:text-6xl">
              Join guided cohorts with live classes, mentor review, and clear
              weekly outcomes.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-white/75">
              This version leads with live learning energy: faculty, batches,
              reminders, project critique, and cohort momentum.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/courses?mode=faculty_led"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-white px-7 text-sm font-semibold text-slate-950 transition hover:-translate-y-0.5"
              >
                See live batches <CalendarDays className="size-4" />
              </Link>
              <Link
                href="/our-faculty"
                className="inline-flex h-12 items-center justify-center rounded-full border border-white/20 bg-white/10 px-7 text-sm font-semibold text-white backdrop-blur transition hover:-translate-y-0.5 hover:bg-white hover:text-slate-950"
              >
                Meet mentors
              </Link>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-[1fr_0.75fr]">
            <div className="space-y-4">
              {liveCourses.slice(0, 3).map((course, index) => (
                <Link
                  key={course.id}
                  href={`/course/${course.slug}`}
                  className="block rounded-3xl border border-white/15 bg-white/10 p-4 backdrop-blur transition hover:-translate-y-1 hover:bg-white/15"
                >
                  <div className="flex items-start gap-4">
                    <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-2xl bg-white text-sm font-bold text-slate-950">
                      {index + 1}
                    </span>
                    <div>
                      <p className="text-sm font-semibold text-white/65">
                        {course.mode?.replaceAll("_", " ")}
                      </p>
                      <h3 className="mt-1 text-lg font-semibold">{course.title}</h3>
                      <p className="mt-2 line-clamp-2 text-sm leading-6 text-white/65">
                        {course.shortDescription}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
            <div className="rounded-3xl border border-white/15 bg-white p-4 text-slate-950 shadow-2xl">
              <div className="relative h-64 overflow-hidden rounded-2xl bg-muted">
                <Image
                  src={leadFaculty?.avatar?.path || "/assets/guest-user.webp"}
                  alt={`${leadFaculty?.firstName || "Lead"} faculty`}
                  fill
                  sizes="320px"
                  className="object-cover"
                />
              </div>
              <p className="mt-5 text-xs font-bold uppercase tracking-[0.22em] text-primary">
                Lead mentor
              </p>
              <h3 className="mt-2 text-2xl font-semibold">
                {leadFaculty?.firstName} {leadFaculty?.lastName}
              </h3>
              <p className="mt-3 text-sm leading-6 text-slate-600">
                {leadFaculty?.profile?.headline || "Faculty mentor"} with
                live reviews, structured projects, and weekly feedback.
              </p>
            </div>
          </div>
        </Container>
      </section>

      <section className="py-24">
        <Container>
          <SectionHeading
            eyebrow="Cohort Flow"
            title="Everything a live learning demo needs."
            description="Use the same courses to showcase batches, progress, recordings, faculty guidance, and certificates."
            align="center"
          />
          <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {[
              [CalendarDays, "Weekly live classes", "Scheduled sessions and reminders."],
              [Users, "Faculty mentorship", "Real instructor profile surfaces."],
              [MonitorPlay, "Recorded backup", "Hybrid courses still include video learning."],
              [BadgeCheck, "Certificates", "Exam and certificate states included."],
            ].map(([Icon, title, text]) => (
              <div key={String(title)} className="rounded-3xl border border-border bg-card p-6 shadow-sm">
                <Icon className="size-6 text-primary" />
                <h3 className="mt-5 text-lg font-semibold">{String(title)}</h3>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">
                  {String(text)}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <CourseListShowcase courses={courses} />
      <TestimonialsCompact testimonials={testimonials} />
      <ArticlesCompact articles={articles} />
    </div>
  );
}

export function MarketplaceHomeVariant({
  courses,
  articles,
  testimonials,
  faculties,
}: HomeData) {
  return (
    <div className="bg-background">
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(180deg,#ffffff_0%,#f8fafc_45%,#eef4ff_100%)] dark:bg-[linear-gradient(180deg,#070b12_0%,#0f172a_55%,#111827_100%)]" />
        <Container className="relative z-10 py-20">
          <div className="mx-auto max-w-5xl text-center">
            <span className="academy-badge mb-5">Home 4 · Course Marketplace</span>
            <h1 className="text-4xl font-semibold tracking-tight text-foreground md:text-7xl">
              Browse a full learning catalog with courses, faculty, reviews,
              and articles in one polished storefront.
            </h1>
            <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-muted-foreground">
              This homepage version is made for catalog-first LMS themes where
              discovery, filtering, and buying are the primary experience.
            </p>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {courses.slice(0, 3).map((course) => (
              <MiniCourseCard key={course.id} course={course} />
            ))}
          </div>
        </Container>
      </section>

      <section className="py-20">
        <Container>
          <div className="grid gap-8 lg:grid-cols-[0.78fr_1.22fr]">
            <div className="lg:sticky lg:top-28 lg:self-start">
              <SectionHeading
                eyebrow="Catalog Categories"
                title="Multiple course states for a buyer-ready demo."
                description="Free, paid, enrolled, self-paced, live, and hybrid courses all appear from static data."
              />
              <Link
                href="/courses"
                className="mt-8 inline-flex h-12 items-center gap-2 rounded-full bg-primary px-6 text-sm font-semibold text-primary-foreground"
              >
                Open catalog <ArrowRight className="size-4" />
              </Link>
            </div>
            <div className="grid gap-4">
              {courses.slice(0, 6).map((course, index) => (
                <CourseStripCard key={course.id} course={course} index={index} />
              ))}
            </div>
          </div>
        </Container>
      </section>

      <section className="border-y border-border bg-card/40 py-20">
        <Container>
          <div className="grid gap-6 md:grid-cols-3">
            {[
              ["Static JSON-style data", "No backend dependency for marketplace preview."],
              ["Checkout-ready courses", "Course cards include pricing, cart, and progress states."],
              ["Content pages included", "Articles, faculty, testimonials, and components are ready."],
            ].map(([title, text]) => (
              <div key={title} className="rounded-3xl border border-border bg-background p-6 shadow-sm">
                <CheckCircle2 className="size-6 text-primary" />
                <h3 className="mt-5 text-lg font-semibold">{title}</h3>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">{text}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <FacultyPreview faculties={faculties} />
      <TestimonialsCompact testimonials={testimonials} />
      <ArticlesCompact articles={articles} />
    </div>
  );
}

export function DashboardHomeVariant({
  courses,
  articles,
  testimonials,
  faculties,
}: HomeData) {
  const enrolled = courses.filter((course) => course.isEnrolled);

  return (
    <div className="bg-background">
      <section className="relative overflow-hidden bg-slate-950 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,rgba(59,130,246,0.34),transparent_32%),radial-gradient(circle_at_84%_18%,rgba(16,185,129,0.22),transparent_28%),linear-gradient(135deg,#020617,#0f172a_55%,#111827)]" />
        <Container className="relative z-10 grid min-h-[760px] items-center gap-10 py-20 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <span className="mb-5 inline-flex rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.24em] text-white backdrop-blur">
              Home 5 · LMS Platform
            </span>
            <h1 className="max-w-3xl text-4xl font-semibold tracking-tight md:text-6xl">
              Show the complete learning system, from catalog to dashboard to
              certificates.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-white/75">
              A product-led homepage for buyers who want to see the operational
              depth of the LMS theme before opening the inner pages.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/dashboard"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-white px-7 text-sm font-semibold text-slate-950 transition hover:-translate-y-0.5"
              >
                View learner dashboard <BarChart3 className="size-4" />
              </Link>
              <Link
                href="/admin/dashboard"
                className="inline-flex h-12 items-center justify-center rounded-full border border-white/20 bg-white/10 px-7 text-sm font-semibold text-white backdrop-blur transition hover:-translate-y-0.5 hover:bg-white hover:text-slate-950"
              >
                Admin preview
              </Link>
            </div>
          </div>

          <div className="rounded-[2rem] border border-white/15 bg-white/10 p-4 shadow-2xl backdrop-blur">
            <div className="rounded-[1.5rem] bg-white p-4 text-slate-950">
              <div className="flex items-center justify-between border-b border-slate-200 pb-4">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
                    Learner progress
                  </p>
                  <h3 className="mt-1 text-xl font-semibold">Active courses</h3>
                </div>
                <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                  Live demo
                </span>
              </div>
              <div className="mt-5 space-y-4">
                {enrolled.slice(0, 3).map((course) => (
                  <div key={course.id} className="rounded-2xl border border-slate-200 p-4">
                    <div className="flex items-start gap-3">
                      <div className="relative size-14 shrink-0 overflow-hidden rounded-xl bg-slate-100">
                        <Image
                          src={course.image?.path || "/assets/default.png"}
                          alt={course.title}
                          fill
                          sizes="56px"
                          className="object-cover"
                        />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="line-clamp-1 font-semibold">{course.title}</p>
                        <p className="mt-1 text-xs text-slate-500">{course.duration}</p>
                        <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-100">
                          <div
                            className="h-full rounded-full bg-primary"
                            style={{ width: `${course.progress?.progress || 0}%` }}
                          />
                        </div>
                      </div>
                      <span className="text-sm font-semibold text-primary">
                        {course.progress?.progress || 0}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="py-24">
        <Container>
          <SectionHeading
            eyebrow="Platform Modules"
            title="A homepage that sells the full product surface."
            description="Highlight learner dashboards, faculty workspaces, admin management, exams, certificates, and engagement flows."
            align="center"
          />
          <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {[
              [LibraryBig, "Course catalog", "Static courses with pricing, media, instructors, and progress."],
              [GraduationCap, "Learner dashboard", "My courses, exams, certificates, orders, and profile pages."],
              [Layers3, "Admin control", "Courses, articles, coupons, orders, users, media, and settings."],
              [PlayCircle, "Learning player", "Course learning routes for recorded, live, and hybrid delivery."],
              [ShieldCheck, "Access states", "Role-aware admin, faculty workspace, and profile sections."],
              [Sparkles, "Theme demos", "Multiple home layouts and component showcase pages."],
            ].map(([Icon, title, text]) => (
              <div key={String(title)} className="rounded-3xl border border-border bg-card p-6 shadow-sm">
                <Icon className="size-6 text-primary" />
                <h3 className="mt-5 text-lg font-semibold">{String(title)}</h3>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">{String(text)}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <CourseListShowcase courses={courses} />
      <FacultyPreview faculties={faculties} />
      <TestimonialsCompact testimonials={testimonials} />
      <ArticlesCompact articles={articles} />
    </div>
  );
}

function CourseListShowcase({ courses }: { courses: Course[] }) {
  return (
    <section className="bg-card/35 py-24">
      <Container>
        <div className="mb-12 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            eyebrow="Course Paths"
            title="Same course data, different homepage presentation."
            description="These layouts reuse the same static LMS catalog while changing visual emphasis."
          />
          <Link
            href="/courses"
            className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-border bg-background px-6 text-sm font-semibold text-primary transition hover:border-primary hover:bg-primary hover:text-primary-foreground"
          >
            Explore all <ArrowRight className="size-4" />
          </Link>
        </div>
        <div className="grid gap-5 lg:grid-cols-2">
          {courses.slice(0, 4).map((course, index) => (
            <CourseStripCard key={course.id} course={course} index={index} />
          ))}
        </div>
      </Container>
    </section>
  );
}

function Faculty({ faculties }: { faculties: HomeData["faculties"] }) {
  return (
    <section className="bg-card/35 py-24">
      <Container>
        <SectionHeading
          eyebrow="Faculty"
          title="Mentor profiles built into the homepage story."
          description="Show instructors directly on the landing page while keeping links to full faculty pages."
          align="center"
        />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {faculties.slice(0, 4).map((faculty) => (
            <FacultyCard key={faculty.id} faculty={faculty} />
          ))}
        </div>
      </Container>
    </section>
  );
}

function FacultyPreview({ faculties }: { faculties: HomeData["faculties"] }) {
  return (
    <section className="py-24">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
          <SectionHeading
            eyebrow="Expert Faculty"
            title="Realistic instructor blocks for every homepage version."
            description="Faculty cards use demo names and generated SVG portraits, keeping the marketplace theme safe and complete."
          />
          <div className="grid gap-5 sm:grid-cols-2">
            {faculties.slice(0, 4).map((faculty) => (
              <FacultyCard key={faculty.id} faculty={faculty} />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

function TestimonialsCompact({
  testimonials,
}: {
  testimonials: HomeData["testimonials"];
}) {
  if (!testimonials.length) return null;

  return (
    <section className="py-24">
      <Container>
        <SectionHeading
          eyebrow="Testimonials"
          title="Social proof with believable learner stories."
          description="Short, practical reviews support every homepage direction."
          align="center"
        />
        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {testimonials.slice(0, 3).map((testimonial) => (
            <TestimonialCard
              key={testimonial.id}
              testimonial={testimonial}
              variant="featured"
            />
          ))}
        </div>
      </Container>
    </section>
  );
}

function ArticlesCompact({ articles }: { articles: HomeData["articles"] }) {
  if (!articles.length) return null;

  return (
    <section className="bg-card/35 py-24">
      <Container>
        <div className="mb-12 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            eyebrow="Articles"
            title="Learning resources included beyond courses."
            description="Article cards keep the theme rich for blogs, guides, SEO pages, and content marketing demos."
          />
          <Link
            href="/articles"
            className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-border bg-background px-6 text-sm font-semibold text-primary transition hover:border-primary hover:bg-primary hover:text-primary-foreground"
          >
            View articles <ArrowRight className="size-4" />
          </Link>
        </div>
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {articles.slice(0, 3).map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      </Container>
    </section>
  );
}
