"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect, useRef, useCallback } from "react";
import { Icon } from "./Icons";
import { useSession, signOut } from "../../lib/auth-client";

/* ---------- static config ---------- */

const navLinks = [
  { href: "/jobs", label: "Browse Jobs", icon: "briefcase" as const },
  { href: "/companies", label: "Companies", icon: "building" as const },
  { href: "/pricing", label: "Pricing", icon: "coin" as const },
] as const;

const portalLinks = [
  {
    href: "/dashboard/seeker",
    label: "Candidate Portal",
    badge: "Seeker",
    icon: "users" as const,
    desc: "Applications & saved roles",
    tag: "Seeker Workspace",
  },
  {
    href: "/dashboard/recruiter",
    label: "Recruiter Console",
    badge: "Hiring",
    icon: "briefcase" as const,
    desc: "Post jobs & review candidates",
    tag: "Recruiter Console",
  },
  {
    href: "/dashboard/admin",
    label: "Admin Console",
    badge: "Admin",
    icon: "shield" as const,
    desc: "Platform health & moderation",
    tag: "Admin Panel",
  },
] as const;

/* ---------- path helpers ---------- */

/** Exact match or `/<href>/segment` — avoids `/jobs` matching `/jobseeker`. */
function isActive(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

/** Return the matching portal entry (or undefined) for the current pathname. */
function activePortal(pathname: string) {
  return portalLinks.find((p) => isActive(pathname, p.href));
}

/* ---------- component ---------- */

export default function Navbar() {
  const router = useRouter();
  const { data: session } = useSession();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [portalsOpen, setPortalsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const pathname = usePathname();
  const navRef = useRef<HTMLElement>(null);

  const [prevPathname, setPrevPathname] = useState(pathname);
  if (pathname !== prevPathname) {
    setPrevPathname(pathname);
    setMobileOpen(false);
    setPortalsOpen(false);
    setProfileOpen(false);
  }

  const closeMenus = useCallback(() => {
    setMobileOpen(false);
    setPortalsOpen(false);
    setProfileOpen(false);
  }, []);

  // Close on click-outside / Escape — listeners only exist while a menu is open
  useEffect(() => {
    if (!mobileOpen && !portalsOpen && !profileOpen) return;

    const handleMouseDown = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) closeMenus();
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeMenus();
    };

    document.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [mobileOpen, portalsOpen, profileOpen, closeMenus]);

  // Lock body scroll while the mobile drawer is open
  useEffect(() => {
    if (!mobileOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [mobileOpen]);

  const currentPortal = activePortal(pathname);
  const isPortal = currentPortal !== undefined;

  // The unified dashboard (/dashboard/*) provides its own Left Sidebar and mobile header
  if (pathname.startsWith("/dashboard")) {
    return null;
  }

  return (
    <header className="sticky top-0 z-50 w-full px-4 pt-2 sm:px-6">
      <nav
        ref={navRef}
        className="relative mx-auto flex w-full max-w-[1320px] items-center justify-between gap-4 rounded-2xl border border-white/10 bg-[#16161a]/95 px-4 py-3 text-sm text-white shadow-xl backdrop-blur-md sm:px-6"
      >
        {/* Brand */}
        <div className="flex items-center gap-4">
          <Link
            href="/"
            className="flex shrink-0 items-center transition-opacity hover:opacity-90"
            aria-label="HireLoop home"
          >
            <Image
              src="/logo.png"
              alt="HireLoop"
              width={154}
              height={44}
              priority
              className="h-8 w-auto object-contain sm:h-9"
            />
          </Link>

          {isPortal && (
            <span className="hidden items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 text-[11px] font-medium text-zinc-300 lg:inline-flex">
              <span className="h-1.5 w-1.5 rounded-full bg-[#5c53fe]" />
              {currentPortal.tag}
            </span>
          )}
        </div>

        {/* Desktop nav */}
        <div className="hidden items-center gap-6 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm font-medium transition-colors hover:text-white ${
                isActive(pathname, link.href) ? "text-[#b3aefc]" : "text-zinc-400"
              }`}
            >
              {link.label}
            </Link>
          ))}

          <div className="relative">
            <button
              type="button"
              onClick={() => setPortalsOpen((v) => !v)}
              aria-expanded={portalsOpen}
              aria-haspopup="menu"
              aria-controls="portals-menu"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-zinc-400 transition-colors hover:text-white"
            >
              <span>Portals</span>
              <Icon
                name="chevronDown"
                className={`h-3.5 w-3.5 text-zinc-400 transition-transform ${
                  portalsOpen ? "rotate-180 text-white" : ""
                }`}
              />
            </button>

            {portalsOpen && (
              <div
                id="portals-menu"
                role="menu"
                className="absolute right-0 top-full z-50 mt-3 w-64 rounded-2xl border border-white/10 bg-[#16161e] p-2 shadow-2xl backdrop-blur-xl"
              >
                <div className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-zinc-500">
                  Role Workspaces
                </div>
                {portalLinks.map((p) => (
                  <Link
                    key={p.href}
                    href={p.href}
                    role="menuitem"
                    onClick={closeMenus}
                    className={`flex items-start justify-between rounded-xl p-2.5 transition-colors ${
                      isActive(pathname, p.href)
                        ? "bg-[#5c53fe]/20 text-white"
                        : "text-zinc-300 hover:bg-white/5 hover:text-white"
                    }`}
                  >
                    <div>
                      <p className="text-xs font-semibold">{p.label}</p>
                      <p className="text-[11px] text-zinc-500">{p.desc}</p>
                    </div>
                    <span className="rounded bg-white/10 px-1.5 py-0.5 text-[10px] text-zinc-400">
                      {p.badge}
                    </span>
                  </Link>
                ))}
              </div>
            )}
          </div>

          <span className="h-5 w-px bg-white/15" aria-hidden="true" />

          {session?.user ? (
            <div className="relative">
              <button
                type="button"
                onClick={() => setProfileOpen((v) => !v)}
                className="flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 py-1.5 pl-2 pr-3 text-xs font-semibold text-white transition-colors hover:border-[#5c53fe] hover:bg-white/10"
              >
                <div className="relative h-6 w-6 overflow-hidden rounded-lg border border-white/20 bg-[#5c53fe]/30">
                  {session.user.image ? (
                    <Image
                      src={session.user.image}
                      alt={session.user.name || "User"}
                      fill
                      sizes="24px"
                      className="object-cover"
                    />
                  ) : (
                    <div className="grid h-full w-full place-items-center text-[10px] font-bold text-white uppercase">
                      {(session.user.name || session.user.email || "U")[0]}
                    </div>
                  )}
                </div>
                <span className="max-w-[120px] truncate">{session.user.name || session.user.email}</span>
                <Icon
                  name="chevronDown"
                  className={`h-3 w-3 text-zinc-400 transition-transform ${
                    profileOpen ? "rotate-180 text-white" : ""
                  }`}
                />
              </button>

              {profileOpen && (
                <div className="absolute right-0 top-full z-50 mt-2.5 w-60 rounded-2xl border border-white/10 bg-[#161620] p-2 shadow-2xl backdrop-blur-xl">
                  <div className="border-b border-white/10 px-3 py-2.5">
                    <p className="truncate text-xs font-bold text-white">
                      {session.user.name || "HireLoop Member"}
                    </p>
                    <p className="truncate text-[11px] text-zinc-400">{session.user.email}</p>
                    <span className="mt-1.5 inline-block rounded-md bg-[#5c53fe]/20 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-[#b3aefc]">
                      {/* @ts-expect-error role is in schema */}
                      {session.user.role || "Member"}
                    </span>
                  </div>

                  <div className="py-1">
                    <Link
                      href={
                        /* @ts-expect-error role is in schema */
                        session.user.role === "recruiter"
                          ? "/dashboard/recruiter"
                          : /* @ts-expect-error role is in schema */
                          session.user.role === "admin"
                          ? "/dashboard/admin"
                          : "/dashboard/seeker"
                      }
                      onClick={closeMenus}
                      className="flex items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-medium text-zinc-300 transition-colors hover:bg-white/5 hover:text-white"
                    >
                      <Icon name="chart" className="h-3.5 w-3.5 text-[#9c95ff]" />
                      <span>My Dashboard</span>
                    </Link>

                    <Link
                      href={
                        /* @ts-expect-error role is in schema */
                        session.user.role === "recruiter"
                          ? "/dashboard/recruiter/settings"
                          : /* @ts-expect-error role is in schema */
                          session.user.role === "admin"
                          ? "/dashboard/admin/settings"
                          : "/dashboard/seeker/settings"
                      }
                      onClick={closeMenus}
                      className="flex items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-medium text-zinc-300 transition-colors hover:bg-white/5 hover:text-white"
                    >
                      <Icon name="settings" className="h-3.5 w-3.5 text-zinc-400" />
                      <span>Account Settings</span>
                    </Link>
                  </div>

                  <div className="border-t border-white/5 pt-1">
                    <button
                      type="button"
                      onClick={async () => {
                        closeMenus();
                        await signOut();
                        router.push("/");
                        router.refresh();
                      }}
                      className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-medium text-red-400 transition-colors hover:bg-red-500/10"
                    >
                      <Icon name="logout" className="h-3.5 w-3.5" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link
                href="/sign-in"
                className="text-sm font-medium text-[#b3aefc] transition-colors hover:text-white"
              >
                Sign In
              </Link>

              <Link
                href="/sign-in?mode=signup"
                className="rounded-xl bg-[#5c53fe] px-4 py-2 text-sm font-medium text-white shadow-[0_0_16px_rgba(92,83,254,0.35)] transition-all hover:bg-[#6c64ff]"
              >
                Get Started
              </Link>
            </>
          )}
        </div>

        {/* Mobile bar */}
        <div className="flex items-center gap-2 md:hidden">
          {session?.user ? (
            <Link
              href={
                /* @ts-expect-error role is in schema */
                session.user.role === "recruiter"
                  ? "/dashboard/recruiter"
                  : /* @ts-expect-error role is in schema */
                  session.user.role === "admin"
                  ? "/dashboard/admin"
                  : "/dashboard/seeker"
              }
              className="rounded-lg border border-white/10 bg-white/5 px-2.5 py-1.5 text-xs font-semibold text-[#b3aefc]"
            >
              Dashboard
            </Link>
          ) : (
            <Link
              href="/sign-in"
              className="rounded-lg border border-white/10 bg-white/5 px-2.5 py-1.5 text-xs font-semibold text-zinc-300 hover:text-white"
            >
              Sign In
            </Link>
          )}

          <button
            type="button"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label={mobileOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
            className="relative grid h-10 w-10 place-items-center rounded-xl border border-white/15 bg-white/5 text-zinc-200 transition-colors hover:bg-white/10 hover:text-white focus:outline-none focus:ring-2 focus:ring-[#5c53fe]"
          >
            <div className="flex h-4 w-5 flex-col justify-between">
              <span
                className={`h-0.5 w-full rounded-full bg-current transition-all duration-300 ease-in-out ${
                  mobileOpen ? "translate-y-1.5 rotate-45" : ""
                }`}
              />
              <span
                className={`h-0.5 w-full rounded-full bg-current transition-all duration-200 ease-in-out ${
                  mobileOpen ? "opacity-0" : ""
                }`}
              />
              <span
                className={`h-0.5 w-full rounded-full bg-current transition-all duration-300 ease-in-out ${
                  mobileOpen ? "-translate-y-2 -rotate-45" : ""
                }`}
              />
            </div>
          </button>
        </div>

        {/* Mobile drawer */}
        {mobileOpen && (
          <div
            id="mobile-menu"
            className="absolute inset-x-0 top-[calc(100%+8px)] z-50 max-h-[85vh] overflow-y-auto rounded-3xl border border-white/10 bg-[#14141c]/98 p-5 shadow-2xl backdrop-blur-2xl md:hidden"
          >
            <div className="flex flex-col gap-5">
              <div>
                <p className="px-3 text-[10px] font-bold uppercase tracking-wider text-zinc-500">
                  Navigation
                </p>
                <div className="mt-2 space-y-1">
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={closeMenus}
                      className={`flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium transition-colors ${
                        isActive(pathname, link.href)
                          ? "border border-[#5c53fe]/30 bg-[#5c53fe]/15 text-[#b3aefc]"
                          : "text-zinc-300 hover:bg-white/5 hover:text-white"
                      }`}
                    >
                      <span className="grid h-7 w-7 place-items-center rounded-lg bg-white/5 text-zinc-400">
                        <Icon name={link.icon} className="h-4 w-4" />
                      </span>
                      <span>{link.label}</span>
                    </Link>
                  ))}
                </div>
              </div>

              <div className="border-t border-white/10 pt-4">
                <p className="px-3 text-[10px] font-bold uppercase tracking-wider text-zinc-500">
                  Role Portals
                </p>
                <div className="mt-2 space-y-1.5">
                  {portalLinks.map((p) => (
                    <Link
                      key={p.href}
                      href={p.href}
                      onClick={closeMenus}
                      className={`flex items-center justify-between rounded-xl p-3 transition-colors ${
                        isActive(pathname, p.href)
                          ? "border border-[#5c53fe]/30 bg-[#5c53fe]/20 text-white"
                          : "border border-white/5 bg-white/[0.02] text-zinc-300 hover:bg-white/5 hover:text-white"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="grid h-8 w-8 place-items-center rounded-lg bg-white/5 text-[#9c95ff]">
                          <Icon name={p.icon} className="h-4 w-4" />
                        </span>
                        <div>
                          <p className="text-xs font-semibold">{p.label}</p>
                          <p className="text-[10px] text-zinc-500">{p.desc}</p>
                        </div>
                      </div>
                      <span className="rounded bg-white/10 px-2 py-0.5 text-[10px] font-medium text-zinc-400">
                        {p.badge}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>

              <div className="space-y-2 border-t border-white/10 pt-4">
                {session?.user ? (
                  <>
                    <div className="rounded-xl border border-white/10 bg-white/5 p-3 text-xs">
                      <p className="font-bold text-white">{session.user.name || "Member"}</p>
                      <p className="text-[11px] text-zinc-400">{session.user.email}</p>
                    </div>

                    <Link
                      href={
                        /* @ts-expect-error role is in schema */
                        session.user.role === "recruiter"
                          ? "/dashboard/recruiter"
                          : /* @ts-expect-error role is in schema */
                          session.user.role === "admin"
                          ? "/dashboard/admin"
                          : "/dashboard/seeker"
                      }
                      onClick={closeMenus}
                      className="flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-[#5c53fe] text-xs font-bold text-white shadow-md hover:bg-[#6c64ff]"
                    >
                      <span>Open My Dashboard</span>
                      <Icon name="arrow" className="h-3.5 w-3.5" />
                    </Link>

                    <button
                      type="button"
                      onClick={async () => {
                        closeMenus();
                        await signOut();
                        router.push("/");
                        router.refresh();
                      }}
                      className="flex h-10 w-full items-center justify-center gap-2 rounded-xl border border-red-500/20 bg-red-500/10 text-xs font-semibold text-red-400 hover:bg-red-500/20"
                    >
                      <Icon name="logout" className="h-3.5 w-3.5" />
                      <span>Sign Out</span>
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      href="/sign-in?mode=signup"
                      onClick={closeMenus}
                      className="flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-[#5c53fe] text-xs font-bold text-white shadow-[0_0_20px_rgba(92,83,254,0.4)] transition-all hover:bg-[#6c64ff]"
                    >
                      <span>Get Started for Free</span>
                      <Icon name="arrow" className="h-3.5 w-3.5" />
                    </Link>
                    <Link
                      href="/sign-in"
                      onClick={closeMenus}
                      className="flex h-10 w-full items-center justify-center rounded-xl border border-white/10 bg-white/5 text-xs font-semibold text-zinc-300 hover:text-white"
                    >
                      Sign In to Account
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}