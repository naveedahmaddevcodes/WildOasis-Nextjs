"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";

export default function ResponsiveNavMenu({ session }) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    { href: "/cabins", label: "Cabins" },
    { href: "/about", label: "About" },
  ];

  return (
    <div className="relative z-20">
      <button
        type="button"
        onClick={() => setIsOpen((open) => !open)}
        className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-primary-800 text-primary-100 md:hidden"
        aria-label="Toggle navigation"
        aria-expanded={isOpen}
      >
        {isOpen ? (
          <XMarkIcon className="h-6 w-6" />
        ) : (
          <Bars3Icon className="h-6 w-6" />
        )}
      </button>

      <nav
        className={`${
          isOpen ? "flex" : "hidden"
        } absolute right-0 top-full mt-3 w-56 flex-col gap-2 rounded-md border border-primary-800 bg-primary-950/95 p-3 shadow-xl md:static md:mt-0 md:flex md:w-auto md:flex-row md:items-center md:gap-6 md:rounded-none md:border-0 md:bg-transparent md:p-0 md:shadow-none`}
      >
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            onClick={() => setIsOpen(false)}
            className={`rounded-sm px-2 py-2 text-base transition-colors hover:text-accent-400 md:px-0 md:py-0 ${
              pathname === link.href ? "text-accent-400" : ""
            }`}
          >
            {link.label}
          </Link>
        ))}

        {session?.user?.image ? (
          <Link
            href="/account"
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-3 rounded-sm px-2 py-2 transition-colors hover:text-accent-400 md:px-0 md:py-0"
          >
            <img
              className="h-8 w-8 rounded-full"
              src={session.user.image}
              alt={session.user.name}
              referrerPolicy="no-referrer"
            />
            <span>Guest area</span>
          </Link>
        ) : (
          <Link
            href="/account"
            onClick={() => setIsOpen(false)}
            className="rounded-sm px-2 py-2 transition-colors hover:text-accent-400 md:px-0 md:py-0"
          >
            Guest area
          </Link>
        )}
      </nav>
    </div>
  );
}
