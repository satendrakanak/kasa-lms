import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowRight, BarChart3, ListChecks, MousePointerClick, SlidersHorizontal, Table2, TextCursorInput } from "lucide-react";

import Container from "@/components/container";
import { PageHero } from "@/components/sliders/page-hero";
import { cn } from "@/lib/utils";

export const componentSections = [
  {
    title: "Buttons",
    href: "/components/buttons",
    description: "Button variants, sizes, icon actions, and CTA groups.",
    icon: MousePointerClick,
  },
  {
    title: "Inputs",
    href: "/components/inputs",
    description: "Inputs, selects, textareas, OTP, search, and form states.",
    icon: TextCursorInput,
  },
  {
    title: "Tables",
    href: "/components/tables",
    description: "Course, order, learner, and invoice table examples.",
    icon: Table2,
  },
  {
    title: "Charts",
    href: "/components/charts",
    description: "Revenue, progress, enrollment, and completion charts.",
    icon: BarChart3,
  },
  {
    title: "Switches",
    href: "/components/switches",
    description: "Switches, checkboxes, radios, sliders, progress, and toggles.",
    icon: SlidersHorizontal,
  },
];

export function ComponentShell({
  active,
  eyebrow = "UI Components",
  title,
  description,
  children,
}: {
  active?: string;
  eyebrow?: string;
  title: string;
  description: string;
  children: ReactNode;
}) {
  return (
    <div className="relative min-h-screen bg-background">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-(--surface-shell)" />
      </div>

      <div className="relative z-10">
        <PageHero
          pageTitle={eyebrow}
          pageHeadline={title}
          pageDescription={description}
        />

        <section className="py-12 pb-20">
          <Container>
            <div className="grid gap-8 lg:grid-cols-[280px_1fr] lg:items-start">
              <aside className="academy-card sticky top-28 hidden p-3 lg:block">
                <p className="px-3 pb-3 pt-2 text-xs font-bold uppercase tracking-[0.22em] text-primary">
                  Component Pages
                </p>
                <nav className="space-y-1">
                  {componentSections.map((item) => {
                    const Icon = item.icon;
                    const isActive = active === item.title;

                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        className={cn(
                          "group flex items-start gap-3 rounded-2xl px-3 py-3 text-sm transition",
                          isActive
                            ? "bg-primary text-primary-foreground"
                            : "text-muted-foreground hover:bg-primary/10 hover:text-primary",
                        )}
                      >
                        <Icon className="mt-0.5 h-4 w-4 shrink-0" />
                        <span>
                          <span className="block font-semibold">{item.title}</span>
                          <span
                            className={cn(
                              "mt-1 block text-xs leading-5",
                              isActive
                                ? "text-primary-foreground/75"
                                : "text-muted-foreground",
                            )}
                          >
                            {item.description}
                          </span>
                        </span>
                      </Link>
                    );
                  })}
                </nav>
              </aside>

              <div className="min-w-0">
                <div className="academy-card mb-6 flex flex-wrap gap-2 p-3 lg:hidden">
                  {componentSections.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={cn(
                        "rounded-full px-4 py-2 text-sm font-semibold",
                        active === item.title
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted text-muted-foreground",
                      )}
                    >
                      {item.title}
                    </Link>
                  ))}
                </div>

                {children}
              </div>
            </div>
          </Container>
        </section>
      </div>
    </div>
  );
}

export function ShowcaseSection({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: ReactNode;
}) {
  return (
    <section className="academy-card p-5 md:p-6">
      <div className="mb-6 flex flex-col gap-2 border-b border-border pb-5 md:flex-row md:items-end md:justify-between">
        <div>
          <h2 className="text-xl font-semibold text-card-foreground">
            {title}
          </h2>
          <p className="mt-1 text-sm leading-6 text-muted-foreground">
            {description}
          </p>
        </div>
        <ListChecks className="hidden h-5 w-5 text-primary md:block" />
      </div>
      {children}
    </section>
  );
}

export function OverviewCard({
  title,
  href,
  description,
  icon: Icon,
}: (typeof componentSections)[number]) {
  return (
    <Link
      href={href}
      className="academy-card group flex h-full flex-col p-5 transition hover:-translate-y-1 hover:border-primary/25 hover:shadow-[0_24px_70px_color-mix(in_oklab,var(--primary)_14%,transparent)]"
    >
      <span className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary ring-1 ring-primary/15">
        <Icon className="h-5 w-5" />
      </span>
      <h3 className="text-lg font-semibold text-card-foreground">{title}</h3>
      <p className="mt-2 flex-1 text-sm leading-6 text-muted-foreground">
        {description}
      </p>
      <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-primary">
        View examples
        <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
      </span>
    </Link>
  );
}
