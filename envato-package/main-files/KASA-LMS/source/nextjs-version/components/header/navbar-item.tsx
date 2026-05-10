"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight, ChevronDown } from "lucide-react";
import Image from "next/image";

import { cn } from "@/lib/utils";

type MegaItem = {
  label: string;
  href: string;
  description?: string;
  image?: string;
};

interface NavbarItemProps {
  item: {
    label: string;
    href: string;
    kind?: string;
    featured?: {
      title: string;
      description: string;
      href: string;
    };
    groups?: Array<{
      label: string;
      items: MegaItem[];
    }>;
  };
}

const NavbarItem = ({ item }: NavbarItemProps) => {
  const pathname = usePathname();

  const childItems = item.groups?.flatMap((group) => group.items) || [];
  const isActive =
    item.href === "/" && childItems.length
      ? pathname === "/" ||
        childItems.some((child) => pathname === child.href)
      : item.href === "/"
        ? pathname === "/"
      : pathname === item.href ||
        pathname.startsWith(`${item.href}/`) ||
        childItems.some(
          (child) =>
            pathname === child.href || pathname.startsWith(`${child.href}/`),
        );

  if (item.kind === "home-demos" && item.groups?.length) {
    const demos = item.groups.flatMap((group) => group.items);

    return (
      <div className="group relative">
        <Link
          href={item.href}
          aria-current={isActive ? "page" : undefined}
          className={cn(
            "inline-flex h-10 items-center justify-center gap-1 rounded-full px-3.5 text-sm font-semibold transition-colors xl:px-5",
            "text-foreground/75 hover:bg-primary/10 hover:text-primary",
            isActive &&
              "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground",
          )}
        >
          {item.label}
          <ChevronDown className="size-3.5 transition-transform group-hover:rotate-180" />
        </Link>

        <div className="invisible absolute left-0 top-full z-50 w-[min(920px,calc(100vw-2rem))] translate-y-2 pt-4 opacity-0 transition duration-200 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
          <div className="overflow-hidden rounded-[28px] border border-border/70 bg-background p-5 shadow-[0_32px_100px_rgba(15,23,42,0.2)] dark:bg-slate-950">
            <div className="mb-5 flex flex-col gap-3 border-b border-border/70 pb-5 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.22em] text-primary">
                  Homepage demos
                </p>
                <h3 className="mt-2 text-2xl font-semibold text-foreground">
                  Pick a landing style
                </h3>
                <p className="mt-2 max-w-xl text-sm leading-6 text-muted-foreground">
                  Same LMS content, four extra homepage compositions with
                  different hero, catalog, cohort, and dashboard emphasis.
                </p>
              </div>
              <Link
                href="/home-2"
                className="inline-flex h-10 items-center justify-center gap-2 rounded-full bg-primary px-5 text-sm font-semibold text-primary-foreground transition hover:-translate-y-0.5"
              >
                View demos
                <ArrowRight className="size-4" />
              </Link>
            </div>

            <div className="grid gap-4 lg:grid-cols-3">
              {demos.map((demo, index) => (
                <Link
                  key={demo.href}
                  href={demo.href}
                  className={cn(
                    "group/card overflow-hidden rounded-3xl border border-border bg-card p-3 transition hover:-translate-y-1 hover:border-primary/30 hover:shadow-[0_24px_70px_color-mix(in_oklab,var(--primary)_16%,transparent)]",
                    index === 0 && "lg:col-span-2",
                  )}
                >
                  <div
                    className={cn(
                      "relative overflow-hidden rounded-2xl bg-muted",
                      index === 0 ? "h-48" : "h-36",
                    )}
                  >
                    {demo.image ? (
                      <Image
                        src={demo.image}
                        alt={`${demo.label} preview`}
                        fill
                        sizes={index === 0 ? "560px" : "300px"}
                        className="object-cover transition duration-500 group-hover/card:scale-105"
                      />
                    ) : null}
                    <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/10 to-transparent" />
                    <span className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-primary shadow-sm backdrop-blur">
                      Home {index === 0 ? "01" : `0${index + 1}`}
                    </span>
                    <span className="absolute bottom-3 left-3 right-3 line-clamp-1 text-lg font-semibold text-white">
                      {demo.label}
                    </span>
                  </div>
                  <div className="flex items-center justify-between gap-3 px-2 pb-1 pt-4">
                    <p className="line-clamp-2 text-sm leading-6 text-muted-foreground">
                      {demo.description}
                    </p>
                    <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary transition group-hover/card:bg-primary group-hover/card:text-primary-foreground">
                      <ArrowRight className="size-4" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (item.groups?.length) {
    return (
      <div className="group relative">
        <Link
          href={item.href}
          aria-current={isActive ? "page" : undefined}
          className={cn(
            "inline-flex h-10 items-center justify-center gap-1 rounded-full px-3.5 text-sm font-semibold transition-colors xl:px-5",
            "text-foreground/75 hover:bg-primary/10 hover:text-primary",
            isActive &&
              "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground",
          )}
        >
          {item.label}
          <ChevronDown className="size-3.5 transition-transform group-hover:rotate-180" />
        </Link>

        <div className="invisible absolute left-1/2 top-full z-50 w-[min(840px,calc(100vw-2rem))] -translate-x-1/2 translate-y-2 pt-4 opacity-0 transition duration-200 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
          <div className="overflow-hidden rounded-2xl border border-border/70 bg-background shadow-[0_28px_90px_rgba(15,23,42,0.18)] dark:bg-slate-950">
            <div className="grid gap-0 lg:grid-cols-[230px_1fr]">
              {item.featured ? (
                <Link
                  href={item.featured.href}
                  className="flex flex-col justify-between bg-primary p-5 text-primary-foreground"
                >
                  <span className="text-xs font-semibold uppercase tracking-wide opacity-80">
                    Featured
                  </span>
                  <div className="mt-6">
                    <p className="text-lg font-semibold leading-snug">
                      {item.featured.title}
                    </p>
                    <p className="mt-2 text-sm leading-6 opacity-85">
                      {item.featured.description}
                    </p>
                  </div>
                  <span className="mt-6 text-sm font-semibold">
                    {item.label === "Courses" ? "View all courses" : "Explore pages"}
                  </span>
                </Link>
              ) : null}

              <div
                className={cn(
                  "grid gap-5 p-5",
                  item.groups.length > 2 ? "lg:grid-cols-3" : "lg:grid-cols-2",
                  !item.featured && "lg:col-span-2",
                )}
              >
                {item.groups.map((group) => (
                  <div key={group.label}>
                    <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                      {group.label}
                    </p>
                    <div className="space-y-1">
                      {group.items.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className="flex gap-3 rounded-xl px-3 py-2.5 text-sm transition hover:bg-primary/10 hover:text-primary"
                        >
                          {child.image ? (
                            <span className="relative mt-0.5 block size-12 shrink-0 overflow-hidden rounded-lg bg-muted">
                              <Image
                                src={child.image}
                                alt={`${child.label} course`}
                                fill
                                sizes="48px"
                                className="object-cover"
                              />
                            </span>
                          ) : null}
                          <span className="min-w-0">
                            <span className="block font-semibold">{child.label}</span>
                            {child.description ? (
                              <span className="mt-0.5 block text-xs leading-5 text-muted-foreground">
                                {child.description}
                              </span>
                            ) : null}
                          </span>
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <Link
      href={item.href}
      aria-current={isActive ? "page" : undefined}
      className={cn(
        "inline-flex h-10 items-center justify-center rounded-full px-3.5 text-sm font-semibold transition-colors xl:px-5",
        "text-foreground/75 hover:bg-primary/10 hover:text-primary",
        isActive &&
          "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground",
      )}
    >
      {item.label}
    </Link>
  );
};

export default NavbarItem;
