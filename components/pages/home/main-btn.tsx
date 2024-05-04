"use client";

import { Button } from "@/components/ui/button";
import { selectIsAuth } from "@/lib/features/auth/authSlice";
import { useAppSelector } from "@/lib/hooks";
import useTrans from "@/lib/hooks/useTrans";
import { LogIn, User } from "lucide-react";
import Link from "next/link";

export default function MainButton() {
  const isAuth = useAppSelector(selectIsAuth);
  const { t, lng } = useTrans({ path: "index" });

  const linkContent = isAuth ? (
    <>
      {" "}
      <User /> {t("Profile", { loader: true })}
    </>
  ) : (
    <>
      <LogIn /> {t("Log in", { loader: true })}
    </>
  );

  const link = isAuth ? `${lng}/dashboard` : `${lng}/log-in`;

  return (
    <Button className="mx-auto" asChild>
      <Link href={link} className="flex items-center gap-2">
        {linkContent}
      </Link>
    </Button>
  );
}
