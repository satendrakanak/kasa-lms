"use client";

import { Course } from "@/types/course";
import Container from "../container";
import CourseAuthor from "../course/course-author";
import CourseRatingDetails from "../courses/course-rating-details";
import CourseUpdateDetails from "../courses/course-update-details";
import guestAuthor from "@/public/assets/guest-user.webp";
interface CourseBannerProps {
  course: Course;
}

export function CourseBanner({ course }: CourseBannerProps) {
  const faculty = course.faculties?.[0] || course.createdBy;
  const authorName = [faculty?.firstName, faculty?.lastName]
    .filter(Boolean)
    .join(" ")
    .trim();

  return (
    <section className="academy-hero-gradient relative overflow-hidden py-20 text-white">
      <Container>
        <div className="relative flex justify-between items-start flex-col lg:flex-row">
          <div className="w-full lg:pr-8">
            {/* <CourseBreadcum currentCourse={course.title} /> */}
            <h1 className="text-2xl lg:text-5xl font-bold mb-4 text-center lg:text-left">
              {course.title}
            </h1>
              <div className="mb-4 lg:mb-0 text-center lg:text-left">
              {course.description && (
                <p className="text-white/84 lg:text-base wrap-break-word">
                  {course.description}
                </p>
              )}
            </div>
            <CourseRatingDetails
              rating={4.8}
              reviews={1560}
              enrolledStudentCount={2365}
            />
            <CourseAuthor
              authorName={authorName || "Kasa Faculty"}
              authorPhoto={faculty?.avatar?.path || faculty?.avatarUrl || guestAuthor}
            />
            <CourseUpdateDetails
              lastUpdateDate="March 25, 2024"
              language="English | Hindi"
              certificate="Certified Course"
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
