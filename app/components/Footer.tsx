import Image from "next/image";
import Link from "next/link";
import { Icon } from "./Icons";

const columns = [
  {
    title: "Product",
    links: [
      { label: "Job discovery", href: "/jobs" },
      { label: "Worker AI", href: "/pricing" },
      { label: "Companies", href: "/companies" },
      { label: "Salary data", href: "/jobs" },
    ],
  },
  {
    title: "Navigations",
    links: [
      { label: "Help center", href: "/pricing" },
      { label: "Career library", href: "/jobs" },
      { label: "Contact", href: "/companies" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Brand Guideline", href: "/pricing" },
      { label: "Newsroom", href: "/companies" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-[#07070a]">
      <div className="pointer-events-none absolute -left-32 top-0 h-72 w-72 rounded-full bg-[#5c53fe]/10 blur-3xl" />
      <div className="mx-auto grid w-full max-w-[1320px] gap-10 px-6 py-14 sm:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr_1fr]">
        <div>
          <Image src="/logo.png" alt="HireLoop" width={154} height={44} className="h-8 w-auto" />
          <p className="mt-5 max-w-xs text-sm leading-relaxed text-zinc-400">
            The AI-native career platform. Built for people who take their work seriously.
          </p>
          <div className="mt-6 flex items-center gap-2">
            {(["twitter", "linkedin", "mail"] as const).map((name) => (
              <span
                key={name}
                className="grid h-9 w-9 place-items-center rounded-lg border border-white/10 text-zinc-400"
              >
                <Icon name={name} className="h-4 w-4" />
              </span>
            ))}
          </div>
        </div>

        {columns.map((col) => (
          <div key={col.title}>
            <h3 className="text-sm font-medium text-white">{col.title}</h3>
            <ul className="mt-4 space-y-3">
              {col.links.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm text-zinc-400 transition-colors hover:text-white">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex w-full max-w-[1320px] flex-col gap-3 px-6 py-5 text-xs text-zinc-500 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2024 HireLoop — Programming Hero. All rights reserved.</p>
          <p className="flex gap-4">
            <span>Terms &amp; Policy</span>
            <span>Privacy Guideline</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
