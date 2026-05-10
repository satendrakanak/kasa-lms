"use client";

import { useEffect, useState } from "react";
import { couponClientService } from "@/services/coupons/coupon.client";
import { Course } from "@/types/course";
import { CourseCard } from "../courses/course-card";
import Image from "next/image";
import Link from "next/link";
import { Check, Clock3, ListChecks, ShoppingCart } from "lucide-react";
import { useCartStore } from "@/store/cart-store";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

type CouponApplyResponse = {
  couponId: number;
  code: string;
  discount: number;
  finalAmount: number;
};

type CouponMap = Record<number, CouponApplyResponse | null>;

type Props = {
  courses: Course[];
  view?: "grid" | "list" | "masonry";
};

const coursePrice = (course: Course, coupon?: CouponApplyResponse | null) =>
  coupon?.finalAmount ?? Number(course.priceInr || 0);

export const CouponBulkClient = ({ courses, view = "grid" }: Props) => {
  const [couponMap, setCouponMap] = useState<CouponMap>({});
  const addToCart = useCartStore((state) => state.addToCart);
  const openCartSheet = useCartStore((state) => state.openCartSheet);
  const cartItems = useCartStore((state) => state.cartItems);
  const router = useRouter();

  useEffect(() => {
    if (!courses.length) return;

    const run = async () => {
      try {
        const res = await couponClientService.autoApplyBulk({
          courses: courses.map((c) => ({
            id: c.id,
            price: Number(c.priceInr),
          })),
        });

        setCouponMap(res.data.data || {});
      } catch (e) {
        console.error("❌ BULK FAILED", e);
      }
    };

    run();
  }, [courses]);

  if (view === "list") {
    return (
      <div className="space-y-5">
        {courses.map((course) => {
          const alreadyAdded = cartItems.some((item) => item.id === course.id);
          const coupon = couponMap[course.id];
          const finalPrice = coursePrice(course, coupon);

          const addCourse = () => {
            if (course.isEnrolled) {
              router.push(`/course/${course.slug}/learn`);
              return;
            }

            if (alreadyAdded) {
              openCartSheet();
              return;
            }

            addToCart({
              id: course.id,
              title: course.title,
              price: Number(course.priceInr || 0),
              image: course.image?.path,
              instructor: course.faculties?.[0]
                ? `${course.faculties[0].firstName} ${course.faculties[0].lastName}`
                : "Kasa Faculty",
              totalDuration: course.duration,
              totalLectures: course.chapters?.flatMap((chapter) => chapter.lectures || []).length || 0,
              slug: course.slug,
            });
            toast.success("Added to cart");
          };

          return (
            <article
              key={course.id}
              className="academy-card grid gap-5 overflow-hidden p-4 md:grid-cols-[260px_1fr_auto] md:items-center"
            >
              <Link
                href={`/course/${course.slug}`}
                className="relative block aspect-video overflow-hidden rounded-2xl bg-muted md:aspect-[4/3]"
              >
                <Image
                  src={course.image?.path || "/assets/default-cover.jpg"}
                  alt={course.imageAlt || course.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 260px"
                  className="object-cover transition duration-500 hover:scale-105"
                />
              </Link>

              <div className="min-w-0">
                <div className="mb-3 flex flex-wrap gap-2">
                  {course.categories?.slice(0, 2).map((category) => (
                    <span
                      key={category.id}
                      className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary"
                    >
                      {category.name}
                    </span>
                  ))}
                </div>
                <Link href={`/course/${course.slug}`}>
                  <h3 className="text-xl font-semibold text-card-foreground hover:text-primary">
                    {course.title}
                  </h3>
                </Link>
                <p className="mt-2 line-clamp-2 text-sm leading-6 text-muted-foreground">
                  {course.shortDescription}
                </p>
                <div className="mt-4 flex flex-wrap gap-4 text-xs text-muted-foreground">
                  <span className="inline-flex items-center gap-1.5">
                    <Clock3 className="h-3.5 w-3.5" />
                    {course.duration}
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <ListChecks className="h-3.5 w-3.5" />
                    {course.experienceLevel}
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between gap-4 md:flex-col md:items-end">
                <p className="text-xl font-bold text-primary">
                  ₹{new Intl.NumberFormat("en-IN").format(finalPrice)}
                </p>
                <button
                  type="button"
                  onClick={addCourse}
                  className="inline-flex h-10 items-center justify-center gap-2 rounded-full bg-primary px-4 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90"
                >
                  {course.isEnrolled ? (
                    "Continue"
                  ) : alreadyAdded ? (
                    <>
                      <Check className="h-4 w-4" />
                      Cart
                    </>
                  ) : (
                    <>
                      <ShoppingCart className="h-4 w-4" />
                      Add
                    </>
                  )}
                </button>
              </div>
            </article>
          );
        })}
      </div>
    );
  }

  if (view === "masonry") {
    return (
      <div className="columns-1 gap-6 md:columns-2 xl:columns-3">
        {courses.map((course, index) => (
          <div key={course.id} className="mb-6 break-inside-avoid">
            <div className={index % 3 === 1 ? "[&_.academy-card>div:first-child]:h-64" : ""}>
              <CourseCard course={course} coupon={couponMap[course.id]} />
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {courses.map((course) => (
        <CourseCard
          key={course.id}
          course={course}
          coupon={couponMap[course.id]}
        />
      ))}
    </div>
  );
};
