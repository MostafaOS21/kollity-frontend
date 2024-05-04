import { createSlice } from "@reduxjs/toolkit";
import { courseServices } from "../services/courses/courseServices";

// Define the course interface
export const departments = ["it", "cs", "is", "mm"] as const;
export type Department = (typeof departments)[number];

export interface ICourse {
  id: string;
  name: string;
  department: Department;
  code: string;
  hours: number;
}

const initialState: ICourse[] = [];

// Methods
const setCoursesMethod = (state: ICourse[], action: { payload: ICourse[] }) => {
  state.push(...action.payload);
};

export const coursesSlice = createSlice({
  name: "courses",
  initialState,
  reducers: {
    setCourses: setCoursesMethod,
    emptyCourses: (state) => {
      // Empty the courses array
      state.splice(0, state.length);
    },
  },

  extraReducers(builder) {
    builder.addMatcher(
      courseServices.endpoints.getCourses.matchFulfilled,
      setCoursesMethod
    );
  },
});

export const selectCourses = (state: { courses: ICourse[] }) => state.courses;

export const { setCourses, emptyCourses } = coursesSlice.actions;
