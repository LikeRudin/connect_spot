"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import {
  GlobeAmericasIcon,
  UserCircleIcon,
  ArrowRightStartOnRectangleIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/solid";

import { IconButton } from "@/components/designs";

const NavigationBar = () => {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    const response = await fetch("/api/logout", {
      method: "POST",
    });
    console.log("로그아웃");

    if (response.ok) {
      alert("로그아웃 되었습니다.");
      router.push("/login");

      return;
    }
  };
  return (
    <div className="bg-custom-light-blue flex flex-col w-40 h-lvh">
      <Link href="/">
        <IconButton
          theme="nav"
          text="Spots"
          active={pathname === "/"}
          icon={<GlobeAmericasIcon />}
        />
      </Link>
      <Link href="/search">
        <IconButton
          theme="nav"
          text="Adventure"
          active={pathname === "/search"}
          icon={<MagnifyingGlassIcon />}
        />
      </Link>
      <Link href="/profile">
        <IconButton
          theme="nav"
          text="Profile"
          active={pathname === "/profile"}
          icon={<UserCircleIcon />}
        />
      </Link>
      <IconButton
        theme="nav"
        text="Logout"
        icon={<ArrowRightStartOnRectangleIcon />}
        onClick={handleLogout}
      />
    </div>
  );
};

export default NavigationBar;
