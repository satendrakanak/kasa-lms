"use client";

import Link from "next/link";
import {
  ArrowRight,
  Award,
  BookOpen,
  BriefcaseBusiness,
  CalendarDays,
  GraduationCap,
  LayoutDashboard,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
  Sparkles,
  Users,
} from "lucide-react";
import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { FaXTwitter, FaYoutube } from "react-icons/fa6";

import Container from "../container";
import Logo from "../logo";
import { useSiteSettings } from "@/context/site-settings-context";
import FooterCta from "./footer-cta";

export default function Footer() {
  const { site } = useSiteSettings();

  const socialLinks = [
    {
      href: site.facebookUrl,
      icon: <FaFacebookF size={15} />,
      label: "Facebook",
    },
    {
      href: site.twitterUrl,
      icon: <FaXTwitter size={15} />,
      label: "X",
    },
    {
      href: site.youtubeUrl,
      icon: <FaYoutube size={15} />,
      label: "YouTube",
    },
    {
      href: site.instagramUrl,
      icon: <FaInstagram size={15} />,
      label: "Instagram",
    },
    {
      href: site.linkedinUrl,
      icon: <FaLinkedinIn size={15} />,
      label: "LinkedIn",
    },
  ].filter((item) => item.href);

  const footerGroups = [
    {
      title: "Home Demos",
      links: [
        { href: "/", label: "Default Home" },
        { href: "/home-2", label: "Classic Academy" },
        { href: "/home-3", label: "Live Cohort" },
        { href: "/home-4", label: "Marketplace" },
        { href: "/home-5", label: "LMS Platform" },
      ],
    },
    {
      title: "Learning",
      links: [
        { href: "/courses", label: "All Courses" },
        { href: "/course/full-stack-nextjs-mastery", label: "Next.js Mastery" },
        { href: "/course/api-architecture-bootcamp", label: "API Bootcamp" },
        { href: "/course/live-react-career-accelerator", label: "Live React Batch" },
        { href: "/course/product-design-sprint", label: "Design Sprint" },
        { href: "/my-courses", label: "My Courses" },
      ],
    },
    {
      title: "Community",
      links: [
        { href: "/our-faculty", label: "Faculty" },
        { href: "/client-testimonials", label: "Testimonials" },
        { href: "/articles", label: "Articles" },
        { href: "/certificates", label: "Certificates" },
        { href: "/classes", label: "Live Classes" },
        { href: "/exams", label: "Exams" },
      ],
    },
    {
      title: "Theme Pages",
      links: [
        { href: "/components", label: "Components" },
        { href: "/components/buttons", label: "Buttons" },
        { href: "/components/inputs", label: "Inputs" },
        { href: "/components/tables", label: "Tables" },
        { href: "/components/charts", label: "Charts" },
        { href: "/components/switches", label: "Switches" },
      ],
    },
    {
      title: "Dashboard",
      links: [
        { href: "/dashboard", label: "Learner Dashboard" },
        { href: "/profile", label: "Profile" },
        { href: "/orders", label: "Orders" },
        { href: "/cart", label: "Cart" },
        { href: "/checkout", label: "Checkout" },
        { href: "/settings", label: "Settings" },
      ],
    },
    {
      title: "Company",
      links: [
        { href: "/about", label: "About" },
        { href: "/contact", label: "Contact" },
        { href: "/admin/dashboard", label: "Admin Preview" },
        { href: "/faculty/dashboard", label: "Faculty Workspace" },
        { href: "/privacy", label: "Privacy Policy" },
        { href: "/terms", label: "Terms of Use" },
      ],
    },
  ];

  const highlights = [
    {
      icon: BookOpen,
      label: "9 course demos",
      text: "Free, paid, enrolled, live, and hybrid states.",
    },
    {
      icon: LayoutDashboard,
      label: "Full dashboard flow",
      text: "Learner, faculty, and admin areas included.",
    },
    {
      icon: Award,
      label: "Certificates & exams",
      text: "Static demo data for real LMS workflows.",
    },
    {
      icon: ShieldCheck,
      label: "Theme-ready static data",
      text: "No backend setup needed for marketplace preview.",
    },
  ];

  return (
    <>
      <FooterCta />

      <footer className="relative overflow-hidden bg-background text-muted-foreground">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-border to-transparent" />

          <div className="absolute -left-32 top-16 h-72 w-72 rounded-full bg-primary/10 blur-[100px]" />

          <div className="absolute -right-30 bottom-0 h-72 w-72 rounded-full bg-primary/10 blur-[100px]" />

          <div className="academy-grid-mask absolute inset-0 opacity-20" />
        </div>

        <Container className="relative z-10">
          <div className="grid gap-8 py-16 lg:grid-cols-[1.15fr_1.85fr] xl:gap-12">
            <div className="space-y-6">
              <div>
                <Logo footer />
              </div>

              <p className="max-w-md text-sm leading-7 text-muted-foreground">
                {site.footerAbout ||
                  "Kasa LMS is a polished static learning theme with course catalogs, live batches, faculty profiles, learner dashboards, admin screens, certificates, and component demos ready for marketplace preview."}
              </p>

              <div className="grid gap-3 sm:grid-cols-2">
                {[
                  { icon: GraduationCap, value: "500+", label: "Learners" },
                  { icon: CalendarDays, value: "Live", label: "Cohorts" },
                  { icon: Users, value: "6", label: "Faculty" },
                  { icon: Sparkles, value: "5", label: "Home demos" },
                ].map((item) => {
                  const Icon = item.icon;

                  return (
                    <div
                      key={item.label}
                      className="rounded-2xl border border-border bg-card/70 p-4 shadow-sm"
                    >
                      <Icon className="h-4 w-4 text-primary" />
                      <p className="mt-3 text-xl font-semibold text-foreground">
                        {item.value}
                      </p>
                      <p className="mt-1 text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                        {item.label}
                      </p>
                    </div>
                  );
                })}
              </div>

              <div className="flex flex-wrap gap-3">
                <Link
                  href="/courses"
                  className="group inline-flex h-11 items-center justify-center gap-2 rounded-full bg-primary px-5 text-sm font-semibold text-primary-foreground shadow-sm transition hover:-translate-y-0.5 hover:bg-primary/90"
                >
                  Explore Courses
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </Link>

                <Link
                  href="/home-2"
                  className="inline-flex h-11 items-center justify-center rounded-full border border-border bg-card px-5 text-sm font-semibold text-foreground shadow-sm transition hover:-translate-y-0.5 hover:border-primary hover:text-primary"
                >
                  View Home Demos
                </Link>
              </div>
            </div>

            <div className="grid gap-8 sm:grid-cols-2 xl:grid-cols-3">
              {footerGroups.map((group) => (
                <div key={group.title}>
                  <h3 className="mb-4 text-sm font-semibold uppercase tracking-[0.18em] text-foreground">
                    {group.title}
                  </h3>

                  <ul className="space-y-3 text-sm">
                    {group.links.map((item) => (
                      <li key={`${group.title}-${item.href}-${item.label}`}>
                        <Link
                          href={item.href}
                          className="inline-flex text-muted-foreground transition hover:translate-x-1 hover:text-primary"
                        >
                          {item.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-4 border-t border-border py-8 md:grid-cols-2 xl:grid-cols-4">
            {highlights.map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.label}
                  className="rounded-2xl border border-border bg-card/70 p-4 shadow-sm"
                >
                  <div className="flex items-start gap-3">
                    <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                      <Icon className="h-5 w-5" />
                    </span>
                    <div>
                      <p className="font-semibold text-foreground">
                        {item.label}
                      </p>
                      <p className="mt-1 text-sm leading-6 text-muted-foreground">
                        {item.text}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="grid gap-6 border-t border-border py-8 lg:grid-cols-[1.35fr_0.65fr] lg:items-center">
            <div className="grid gap-4 md:grid-cols-3">
              {site.supportPhone && (
                <a
                  href={`tel:${site.supportPhone}`}
                  className="flex gap-3 rounded-2xl border border-border bg-card/70 p-4 transition hover:border-primary"
                >
                  <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                    <Phone className="h-4 w-4" />
                  </span>
                  <span>
                    <span className="block text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                      Phone
                    </span>
                    <span className="mt-1 block text-sm font-semibold text-foreground">
                      {site.supportPhone}
                    </span>
                  </span>
                </a>
              )}

              {site.supportEmail && (
                <a
                  href={`mailto:${site.supportEmail}`}
                  className="flex gap-3 rounded-2xl border border-border bg-card/70 p-4 transition hover:border-primary"
                >
                  <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                    <Mail className="h-4 w-4" />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                      Email
                    </span>
                    <span className="mt-1 block truncate text-sm font-semibold text-foreground">
                      {site.supportEmail}
                    </span>
                  </span>
                </a>
              )}

              {site.supportAddress && (
                <div className="flex gap-3 rounded-2xl border border-border bg-card/70 p-4">
                  <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                    <MapPin className="h-4 w-4" />
                  </span>
                  <span>
                    <span className="block text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                      Location
                    </span>
                    <span className="mt-1 block text-sm font-semibold leading-5 text-foreground">
                      {site.supportAddress}
                    </span>
                  </span>
                </div>
              )}
            </div>

            <div className="space-y-4 lg:text-right">
              <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card/70 px-4 py-2 text-sm font-semibold text-foreground shadow-sm">
                <BriefcaseBusiness className="h-4 w-4 text-primary" />
                Static LMS theme for marketplace previews
              </div>

              {socialLinks.length > 0 && (
                <div className="flex flex-wrap gap-3 lg:justify-end">
                  {socialLinks.map((item) => (
                    <a
                      key={item.href}
                      href={item.href}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={item.label}
                      className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card text-muted-foreground shadow-sm transition hover:-translate-y-0.5 hover:border-primary hover:bg-primary hover:text-primary-foreground"
                    >
                      {item.icon}
                    </a>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="flex flex-col items-center justify-between gap-4 border-t border-border py-6 text-sm text-muted-foreground md:flex-row">
            <p>{site.footerCopyright}</p>

            <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
              {[
                { href: "/privacy", label: "Privacy" },
                { href: "/terms", label: "Terms" },
                { href: "/contact", label: "Support" },
                { href: "/sitemap.xml", label: "Sitemap" },
              ].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="transition hover:text-primary"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </Container>
      </footer>
    </>
  );
}
