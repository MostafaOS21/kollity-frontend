import apiSlice from "../../api/apiSlice";
import { Department, ICourse } from "../../courses/coursesSlice";

// GET: /api/Course

interface IGetCoursesParams {
  PageIndex: number;
  PageSize: number;
  Department?: Department;
  Code?: string;
  NamePrefix?: string;
  HasADoctor?: boolean;
}

export const courseServices = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getCourses: build.query<ICourse[], IGetCoursesParams>({
      query: (params) => ({
        url: "/Course",
        method: "GET",
        params,
      }),
    }),
  }),
});

export const { useLazyGetCoursesQuery } = courseServices;
