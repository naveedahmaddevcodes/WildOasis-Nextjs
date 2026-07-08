"use client";

import Link from "next/link";
import {
  CalendarDaysIcon,
  HomeIcon,
  UserIcon,
} from "@heroicons/react/24/solid";
import SignOutButton from "./SignOutButton";
import { usePathname } from "next/navigation";

const navLinks = [
  {
    name: "Home",
    href: "/account",
    icon: <HomeIcon className="h-5 w-5 text-primary-600" />,
  },
  {
    name: "Reservations",
    href: "/account/reservations",
    icon: <CalendarDaysIcon className="h-5 w-5 text-primary-600" />,
  },
  {
    name: "Guest profile",
    href: "/account/profile",
    icon: <UserIcon className="h-5 w-5 text-primary-600" />,
  },
];

function SideNavigation() {
  const pathname = usePathname();

  return (
    <nav className="overflow-hidden rounded-md border border-primary-900 bg-primary-950 lg:border-r lg:border-y-0 lg:rounded-none lg:bg-transparent">
      <ul className="flex flex-col gap-2 text-base sm:text-lg lg:h-full">
        {navLinks.map((link) => (
          <li key={link.name}>
            <Link
              className={`flex items-center gap-3 px-4 py-3 font-semibold text-primary-200 transition-colors hover:bg-primary-900 hover:text-primary-100 lg:px-5 lg:py-3 ${
                pathname === link.href ? "bg-primary-900" : ""
              }`}
              href={link.href}
            >
              {link.icon}
              <span>{link.name}</span>
            </Link>
          </li>
        ))}

        <li className="mt-2 lg:mt-auto">
          <SignOutButton />
        </li>
      </ul>
    </nav>
  );
}

export default SideNavigation;
