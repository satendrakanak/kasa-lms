"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown } from "lucide-react";
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
    item.href === "/"
      ? pathname === "/"
      : pathname === item.href ||
        pathname.startsWith(`${item.href}/`) ||
        childItems.some(
          (child) =>
            pathname === child.href || pathname.startsWith(`${child.href}/`),
        );

  if (item.groups?.length) {
    return (
      <div className="group relative">
        <Link
          href={item.href}
          aria-current={isActive ? "page" : undefined}
          className={cn(
            "inline-flex h-10 items-center justify-center gap-1 rounded-full px-4 text-sm font-semibold transition-colors xl:px-5",
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
                  <span className="mt-6 text-sm font-semibold">View all courses</span>
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
        "inline-flex h-10 items-center justify-center rounded-full px-4 text-sm font-semibold transition-colors xl:px-5",
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
