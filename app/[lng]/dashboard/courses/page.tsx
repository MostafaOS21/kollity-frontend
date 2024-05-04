"use client";

import { selectToken } from "@/lib/features/auth/authSlice";
import {
  Department,
  departments,
  emptyCourses,
  selectCourses,
} from "@/lib/features/courses/coursesSlice";
import { useLazyGetCoursesQuery } from "@/lib/features/services/courses/courseServices";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import useTrans from "@/lib/hooks/useTrans";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

// Filter : Department
function FilterDepartment({
  set,
  value,
}: {
  set: Dispatch<SetStateAction<Department | "">>;
  value: Department | "";
}) {
  const { t } = useTrans({ path: "courses" });
  const dispatch = useAppDispatch();

  return (
    <Select
      defaultValue={value}
      onValueChange={(val) => {
        if (val === "all") {
          set("");
        } else {
          set(val as Department);
        }

        dispatch(emptyCourses());
      }}
    >
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder={t("FilterDepartment", {})} />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">All</SelectItem>
        {departments.map((d) => (
          <SelectItem value={d} className="uppercase" key={d}>
            {d}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

// Page : Courses
export default function page() {
  const [pageIndex, setPageIndex] = useState(1);
  const [ignorePage, setIgnorePage] = useState(false);
  const [department, setDepartment] = useState<Department | "">("");
  const [getCourses, { isLoading: isGettingCourses, data, isError }] =
    useLazyGetCoursesQuery();
  const courses = useAppSelector(selectCourses);
  const token = useAppSelector(selectToken);
  const { t } = useTrans({ path: "courses" });

  useEffect(() => {
    const gettingCourses = async () => {
      const data = await getCourses({
        PageIndex: pageIndex,
        PageSize: 10,
      });

      console.log(data);
    };

    if (token && !ignorePage) {
      gettingCourses();
    }

    if (ignorePage) {
      setIgnorePage(false);
    }
  }, [token, pageIndex]);

  useEffect(() => {
    const getCoursesWithDepartment = async () => {
      setIgnorePage(true);
      setPageIndex(1);

      await getCourses({
        PageIndex: 1,
        PageSize: 10,
        Department: department ? department : undefined,
      });
    };

    if (token) {
      getCoursesWithDepartment();
    }
  }, [department]);

  return (
    <section>
      <h2>{t("title", { loader: true })}</h2>

      <div className="py-5">
        <FilterDepartment set={setDepartment} value={department} />
      </div>

      <Table className="text-center mb-3">
        <TableHeader>
          <TableRow>
            <TableHead className="text-center">{t("CourseName", {})}</TableHead>
            <TableHead className="text-center">
              {t("CourseDepartment", {})}
            </TableHead>
            <TableHead className="text-center">{t("CourseCode", {})}</TableHead>
            <TableHead className="text-center">
              {t("CourseHours", {})}
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {courses.map((course) => (
            <TableRow key={course.id}>
              <TableCell>{course.name}</TableCell>
              <TableCell>{course.department}</TableCell>
              <TableCell>{course.code}</TableCell>
              <TableCell>{course.hours}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Button
        variant={"secondary"}
        className="w-full"
        disabled={!token || !data || isGettingCourses || isError}
        onClick={() => setPageIndex(pageIndex + 1)}
      >
        {t("GetMoreCourses", {})}
      </Button>
    </section>
  );
}
