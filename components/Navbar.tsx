"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";

import { Button } from "@/components/ui/button";

import { AlignRight } from "lucide-react";
import { defaultLinks } from "@/config/nav";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  return (
    <div className="md:hidden border-b mb-4 pb-2 w-full">
      <nav className="flex justify-between w-full px-6 items-center">
        <div className="font-semibold text-lg">Logo</div>
        <Button variant="ghost" onClick={() => setOpen(!open)}>
          <AlignRight />
        </Button>
      </nav>
      {open ? (
        <div className="p-4 bg-gradient-to-b from-background to-sky-100 dark:to-muted">
          <ul className="space-y-2">
            {defaultLinks.map((link) => (
              <li key={link.title} onClick={() => setOpen(false)} className="">
                <Button
                  className="w-full rounded-lg"
                  variant={"outline"}
                  asChild
                >
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
                </Button>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
}
