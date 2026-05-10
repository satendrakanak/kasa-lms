import Container from "@/components/container";
import { CouponBulkClient } from "@/components/coupon/coupon-bulk-client";
import { CoursesBanner } from "@/components/layout/courses-banner";
import { getErrorMessage } from "@/lib/error-handler";
import { buildMetadata } from "@/lib/seo";
import { courseServerService } from "@/services/courses/course.server";
import { Course } from "@/types/course";
import Link from "next/link";
import { cn } from "@/lib/utils";

const courseViews = [
  { label: "Grid View", value: "grid" },
  { label: "List View", value: "list" },
  { label: "Masonry View", value: "masonry" },
] as const;

export const metadata = buildMetadata({
  title: "Courses",
  description:
    "Browse Code With Kasa courses across programming, projects, live classes, and professional learning.",
  path: "/courses",
});

export default async function CoursesPage({
  searchParams,
}: {
  searchParams: Promise<{ view?: string }>;
}) {
  const { view: rawView } = await searchParams;
  const view =
    rawView === "list" || rawView === "masonry" || rawView === "grid"
      ? rawView
      : "grid";
  let courses: Course[] = [];

  try {
    const response = await courseServerService.getPopularCourses();
    courses = response.data;
  } catch (error: unknown) {
    const message = getErrorMessage(error);
    throw new Error(message);
  }
  return (
    <div>
      <CoursesBanner totalCourses={courses.length} />

      <section className="academy-section relative bg-background">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 bg-(--surface-shell)" />
        </div>

        <Container className="relative z-10">
          <div className="academy-card mb-8 flex flex-col gap-4 p-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm font-semibold text-card-foreground">
                Course catalog layouts
              </p>
              <p className="mt-1 text-sm text-muted-foreground">
                Switch between marketplace-ready listing styles.
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              {courseViews.map((item) => (
                <Link
                  key={item.value}
                  href={`/courses?view=${item.value}`}
                  className={cn(
                    "rounded-full px-4 py-2 text-sm font-semibold transition-colors",
                    view === item.value
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground hover:bg-primary/10 hover:text-primary",
                  )}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          <CouponBulkClient courses={courses} view={view} />
        </Container>
      </section>
    </div>
  );
}
