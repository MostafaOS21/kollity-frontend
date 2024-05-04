"use client";

import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { navItems } from "@/constants";
import { selectAuth } from "@/lib/features/auth/authSlice";
import { useAppSelector } from "@/lib/hooks";
import useTrans from "@/lib/hooks/useTrans";
import { ChevronDown } from "lucide-react";
import { SlLogout } from "react-icons/sl";
import Link from "next/link";
import { useLogOutMutation } from "@/lib/features/services/auth/authService";
import { useRouter } from "next/navigation";

export const navWidth = 280;

const NavItems = () => {
  const { t, lng } = useTrans({ path: "nav-items" });
  const auth = useAppSelector(selectAuth);
  const [logOut] = useLogOutMutation();
  const router = useRouter();

  const handleLogout = async () => {
    await logOut();
    router.push(`${lng}/log-in`);
  };

  return (
    <>
      {/* Profile Bar */}
      <Button className="bg-gradient-to-r from-primary-400 to-primary-300 w-full mb-4 flex items-center gap-3 h-14">
        <Avatar className="bg-slate-300">
          <AvatarImage src={auth.profileImage} />
        </Avatar>

        <div dir="ltr" className="flex-1">
          {auth.userName ? (
            "@" + auth.userName
          ) : (
            <Skeleton className="h-2 w-full" />
          )}
        </div>

        <div>
          <ChevronDown />
        </div>
      </Button>

      {/* TODO: Extra Nav Item */}
      <ul className="absolute"></ul>

      {/* Main Nav Items */}
      <ul className="flex flex-col gap-3">
        {navItems.map((item) => (
          <li key={item.path[lng]}>
            <Button
              asChild
              variant={"ghost"}
              className="flex items-center gap-3 justify-start hover:text-primary-300 !py-3 text-[16px] !p-0 h-fit overflow-hidden"
            >
              <Link href={`${item.path[lng]}`}>
                <span className="bg-primary-200 p-[0.64rem]">
                  <item.icon className="text-white" size={22} />{" "}
                </span>
                {t(item.title, { loader: true, w: 150 })}{" "}
              </Link>
            </Button>
          </li>
        ))}

        <li>
          <Button
            className="w-full flex items-center gap-3 justify-start text-red-900 hover:text-red-950 !py-3 text-[16px] !p-0 h-fit overflow-hidden"
            onClick={handleLogout}
            variant={"outline"}
          >
            <span className="bg-red-900 p-[0.64rem]">
              <SlLogout className="text-white" size={22} />
            </span>
            {t("Logout", {})}
          </Button>
        </li>
      </ul>
    </>
  );
};

export default function Aside() {
  return (
    <aside className={`relative w-[280px]`}>
      <nav className={`fixed w-[280px] shadow-lg h-screen top-0 p-4`}>
        <NavItems />
      </nav>
    </aside>
  );
}
