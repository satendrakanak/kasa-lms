import { getErrorMessage } from "@/lib/error-handler";
import { articleServerService } from "@/services/articles/article.server";
import { courseServerService } from "@/services/courses/course.server";
import { testimonialServerService } from "@/services/testimonials/testimonial.server";
import { userServerService } from "@/services/users/user.server";
import type { Article } from "@/types/article";
import type { Course } from "@/types/course";
import type { Testimonial } from "@/types/testimonial";
import type { User } from "@/types/user";

export type HomeData = {
  courses: Course[];
  articles: Article[];
  testimonials: Testimonial[];
  faculties: User[];
};

export async function getHomeData(): Promise<HomeData> {
  try {
    const [courses, articles, testimonials, faculties] = await Promise.all([
      courseServerService.getPopularCourses().then((response) => response.data),
      articleServerService.getAll().then((response) => response.data),
      testimonialServerService
        .getFeatured(6)
        .then((response) => response.data),
      userServerService.getFaculties().then((response) => response.data),
    ]);

    return { courses, articles, testimonials, faculties };
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
}
