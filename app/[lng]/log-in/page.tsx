"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import useTrans from "@/lib/hooks/useTrans";
import Image from "next/image";
import { useEffect, useRef } from "react";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { useLogInMutation } from "@/lib/features/services/auth/authService";
import Link from "next/link";

export default function LogInPage() {
  const { t, isLoading, lng } = useTrans({ path: "log-in" });
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const submitRef = useRef<HTMLButtonElement>(null);
  const { toast } = useToast();
  const [logIn, { isLoading: isLoggingIn, isError, error, isSuccess }] =
    useLogInMutation();
  const router = useRouter();

  useEffect(() => {
    if (isSuccess) {
      router.push(`/${lng}/profile`);
    }
  }, [isSuccess]);

  useEffect(() => {
    if (isError) {
      toast({
        title: t("UnknownErrorError", {}),
        description: t("UnknownErrorDescription", {}),
      });
    }
  }, [isError]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const username = usernameRef.current?.value;
    const password = passwordRef.current?.value;
    if (!username || !password) {
      return toast({
        title: t("InvalidCredentials", {}),
        description: t("InvalidCredentialsDescription", {}),
      });
    }

    await logIn({ username, password });
  };

  return (
    <>
      <div>
        <Image
          width={320}
          height={320}
          alt="Logo"
          src={"/assets/images/logo.png"}
          className="w-36 h-36"
        />
      </div>

      <h3>{t("title", {})}</h3>
      <form action="" className="w-[280px]" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-3 mb-5">
          <Label>{t("username", {})}</Label>
          <Input
            type="string"
            placeholder={t("username", { loader: false })}
            required
            disabled={isLoading || isLoggingIn}
            defaultValue={"Mahmoudhd134"}
            ref={usernameRef}
          />
        </div>
        <div className="flex flex-col gap-3 mb-8">
          <Label>{t("password", {})}</Label>
          <Input
            type="password"
            placeholder={t("password", { loader: false })}
            required
            disabled={isLoading || isLoggingIn}
            ref={passwordRef}
            defaultValue={"Mahmoud2320030@"}
          />
        </div>
        <div>
          <Button
            disabled={isLoading || isLoggingIn}
            ref={submitRef}
            className="w-full mb-3"
          >
            {t("SignIn", {})}
          </Button>

          <Button
            className="w-full text-primary-200"
            variant={"secondary"}
            asChild
          >
            <Link href={`/${lng}`}>{t("ReturnToMainPage", {})}</Link>
          </Button>
        </div>
      </form>
    </>
  );
}
