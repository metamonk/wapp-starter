"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { AlignRight } from "lucide-react";
import { defaultLinks } from "@/config/nav";
import Logo from "@/components/Logo"
import { useLogout, usePrivy } from "@privy-io/react-auth"
import { useRouter } from "next/navigation"
import { useLogin } from "@privy-io/react-auth"
export default function Navbar() {
  const router = useRouter();
  const { authenticated, user: privyUser } = usePrivy();
  const { login } = useLogin({
    onComplete: ({ isNewUser }) => {
      if (isNewUser) {
        router.push("/onboarding");
      } else {
        router.push("/dashboard");
      }
    },
  });
  const { logout } = useLogout({
    onSuccess: () => {
      router.push("/login");
    },
  });
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const handleAuth = async () => {
    if (authenticated) {
      await logout();
    } else {
      try {
        await login();
      } catch (error) {
        console.error("Login failed:", error);
      }
    }
  };

  return (
    <div className="border-b mb-4 pb-2 w-full">
      <nav className="flex justify-between w-full items-center">
        <div className="flex items-center w-8 h-8">
          <Logo />
        </div>
        <Button variant="ghost" onClick={() => setOpen(!open)}>
          <AlignRight />
        </Button>
        <Button onClick={handleAuth}>
          {authenticated ? "Logout" : "Login"}
        </Button>
      </nav>
      {open ? (
        <div className="my-4 p-4 bg-muted">
          <ul className="space-y-2">
            {defaultLinks.map((link) => (
              <li key={link.title} onClick={() => setOpen(false)} className="">
                <Link
                  href={link.href}
                  className={
                    pathname === link.href
                      ? "text-primary hover:text-primary font-semibold"
                      : "text-muted-foreground hover:text-primary"
                  }
                >
                  {link.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
}
