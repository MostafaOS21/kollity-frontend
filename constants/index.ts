import { languages } from "@/app/i18n/settings";

// Protected routes
// ["/profile"] add it with language prefix
export const PROTECTED_ROUTES = ["/dashboard"]
  .map((route) => {
    return languages.map((lng) => {
      return `/${lng}${route}`;
    });
  })
  .flat();

// Public routes
export const PUBLIC_ROUTES = ["/log-in"]
  .map((route) => {
    return languages.map((lng) => {
      return `/${lng}${route}`;
    });
  })
  .flat();

// Nav items
import { FaHome } from "react-icons/fa";
import { PiBooksFill } from "react-icons/pi";
import { FaChalkboardTeacher } from "react-icons/fa";
import { PiStudentFill } from "react-icons/pi";
import { IoSettings } from "react-icons/io5";

export type NavItem = {
  title: string;
  path: {
    ar: string;
    en: string;
  };
  icon: React.ElementType;
};

export const navItems = [
  {
    title: "Home",
    path: {
      ar: "/ar/dashboard",
      en: "/en/dashboard",
    },
    icon: FaHome,
  },
  {
    title: "Courses",
    path: {
      ar: "/ar/dashboard/courses",
      en: "/en/dashboard/courses",
    },
    icon: PiBooksFill,
  },
  {
    title: "Doctors",
    path: {
      ar: "/ar/dashboard/doctors",
      en: "/en/dashboard/doctors",
    },
    icon: FaChalkboardTeacher,
  },
  {
    title: "Students",
    path: {
      ar: "/ar/dashboard/students",
      en: "/en/dashboard/students",
    },
    icon: PiStudentFill,
  },
  {
    title: "Settings",
    path: {
      ar: "/ar/dashboard/settings",
      en: "/en/dashboard/settings",
    },
    icon: IoSettings,
  },
];

// Profile nav items
import { IoIosInformationCircleOutline } from "react-icons/io";
import { IoIosUnlock } from "react-icons/io";
import { MdOutlineLibraryBooks } from "react-icons/md";

export const profileNavItems = [
  {
    title: "My Profile",
    path: {
      ar: "/ar/dashboard/profile",
      en: "/en/dashboard/profile",
    },
    icon: IoIosInformationCircleOutline,
  },
  {
    title: "Change Password",
    path: {
      ar: "/ar/dashboard/change-password",
      en: "/en/dashboard/change-password",
    },
    icon: IoIosUnlock,
  },
  {
    title: "My Courses",
    path: {
      ar: "/ar/dashboard/my-courses",
      en: "/en/dashboard/my-courses",
    },
    icon: MdOutlineLibraryBooks,
  },
];
