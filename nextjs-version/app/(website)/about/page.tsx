import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BookOpen, GraduationCap, ShieldCheck, Sparkles } from "lucide-react";

import Container from "@/components/container";
import { PageHero } from "@/components/sliders/page-hero";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "About",
  description:
    "Learn about the Kasa LMS static theme, demo course catalog, faculty pages, checkout flow, and learner experience.",
  path: "/about",
});

const highlights = [
  {
    title: "Static Theme Ready",
    description: "Every public, learner, faculty, and admin-facing demo screen runs from local static data.",
    icon: Sparkles,
  },
  {
    title: "Course Marketplace",
    description: "Recorded, live, hybrid, free, paid, enrolled, and cart-ready course states are included.",
    icon: BookOpen,
  },
  {
    title: "Safe Demo Faculty",
    description: "Faculty profiles use fictional names and original illustrated avatars for safer distribution.",
    icon: GraduationCap,
  },
  {
    title: "Theme Checkout",
    description: "Checkout is set up as a demo order flow without external payment gateway dependency.",
    icon: ShieldCheck,
  },
];

export default function AboutPage() {
  return (
    <div className="relative min-h-screen bg-background">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-(--surface-shell)" />
      </div>

      <div className="relative z-10">
        <PageHero
          pageTitle="About Kasa LMS"
          pageHeadline="A complete LMS theme shaped for marketplace previews."
          pageDescription="Kasa LMS is packaged as a polished static Next.js learning platform with rich demo courses, faculty pages, articles, testimonials, cart, checkout, certificates, dashboards, and dark mode."
        />

        <section className="py-12 md:py-16">
          <Container>
            <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
              <div className="academy-card overflow-hidden p-3">
                <div className="relative aspect-[4/3] overflow-hidden rounded-[24px] bg-muted">
                  <Image
                    src="/assets/demo/course-nextjs.svg"
                    alt="Kasa LMS course dashboard preview"
                    fill
                    sizes="(max-width: 1024px) 100vw, 46vw"
                    className="object-cover"
                    priority
                  />
                </div>
              </div>

              <div>
                <p className="text-xs font-bold uppercase tracking-[0.24em] text-primary">
                  Built For ThemeForest
                </p>
                <h2 className="mt-3 text-3xl font-semibold tracking-tight text-card-foreground md:text-4xl">
                  Everything buyers need to inspect is already visible.
                </h2>
                <p className="mt-4 text-sm leading-7 text-muted-foreground md:text-base">
                  The theme keeps the existing LMS experience but removes backend setup friction.
                  Static data powers courses, instructors, reviews, Q&A, exams, certificates,
                  orders, and checkout so the demo feels full from the first load.
                </p>

                <div className="mt-7 grid gap-4 sm:grid-cols-2">
                  {highlights.map((item) => {
                    const Icon = item.icon;
                    return (
                      <div key={item.title} className="rounded-3xl border border-border bg-card p-5">
                        <span className="mb-4 flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/10 text-primary ring-1 ring-primary/15">
                          <Icon className="h-5 w-5" />
                        </span>
                        <h3 className="font-semibold text-card-foreground">{item.title}</h3>
                        <p className="mt-2 text-sm leading-6 text-muted-foreground">
                          {item.description}
                        </p>
                      </div>
                    );
                  })}
                </div>

                <div className="mt-8 flex flex-wrap gap-3">
                  <Link
                    href="/courses"
                    className="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-primary px-5 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90"
                  >
                    Explore Courses
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                  <Link
                    href="/our-faculty"
                    className="inline-flex h-11 items-center justify-center rounded-full border border-border bg-card px-5 text-sm font-semibold text-card-foreground transition hover:border-primary/25 hover:text-primary"
                  >
                    Meet Faculty
                  </Link>
                </div>
              </div>
            </div>
          </Container>
        </section>
      </div>
    </div>
  );
}
