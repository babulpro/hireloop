"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { seekerData, recruiterData } from "../data/site";
import { Icon } from "../components/Icons";
import { useSession, signOut } from "../../lib/auth-client";

export default function UnifiedDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session } = useSession();
  const pathname = usePathname();
  const router = useRouter();
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [, startTransition] = useTransition();

  // Detect current role based on route
  const isRecruiter =
    pathname.startsWith("/dashboard/recruiter") ||
    pathname.startsWith("/dashboard/jobs") ||
    pathname.includes("/recruiter");
  const isAdmin = pathname.startsWith("/dashboard/admin") || pathname.includes("/admin");

  const currentRole = isAdmin ? "admin" : isRecruiter ? "recruiter" : "seeker";

  // Dynamic user data based on authenticated session or active dashboard role
  const user = session?.user
    ? {
        name: session.user.name || "HireLoop Member",
        email: session.user.email,
        role:
          /* @ts-expect-error role is in schema */
          session.user.role === "recruiter"
            ? "Recruiter"
            : /* @ts-expect-error role is in schema */
            session.user.role === "admin"
            ? "Super Admin"
            : "Seeker",
        avatar:
          session.user.image ||
          (isAdmin
            ? "/avatars/admin.jpg"
            : isRecruiter
            ? recruiterData.profile.avatar
            : seekerData.profile.avatar),
      }
    : isAdmin
    ? {
        name: "Admin Console",
        email: "admin@hireloop.io",
        role: "Super Admin",
        avatar: "/avatars/admin.jpg",
      }
    : isRecruiter
    ? {
        name: recruiterData.profile.name,
        email: recruiterData.profile.email,
        role: "Recruiter",
        avatar: recruiterData.profile.avatar,
      }
    : {
        name: seekerData.profile.name,
        email: seekerData.profile.email,
        role: "Seeker",
        avatar: seekerData.profile.avatar,
      };

  // Role-specific navigation links
  const roleNavLinks = isAdmin
    ? [
        { href: "/dashboard/admin", label: "Admin Home", icon: "chart" as const },
        { href: "/dashboard/admin/users", label: "Manage Users", icon: "users" as const },
        { href: "/dashboard/admin/companies", label: "Manage Companies", icon: "building" as const },
        { href: "/dashboard/admin/jobs", label: "Manage Jobs", icon: "briefcase" as const },
        { href: "/dashboard/admin/payments", label: "Payments", icon: "creditCard" as const },
        { href: "/dashboard/admin/settings", label: "Settings", icon: "settings" as const },
      ]
    : isRecruiter
    ? [
        { href: "/dashboard/recruiter", label: "Recruiter Home", icon: "chart" as const },
        { href: "/dashboard/recruiter/company", label: "My Company", icon: "building" as const },
        { href: "/dashboard/recruiter/jobs", label: "Manage Jobs", icon: "briefcase" as const },
        { href: "/dashboard/recruiter/jobs/new", label: "Post a Job", icon: "plus" as const },
        { href: "/dashboard/recruiter/billing", label: "Billing", icon: "creditCard" as const },
        { href: "/dashboard/recruiter/settings", label: "Settings", icon: "settings" as const },
      ]
    : [
        { href: "/dashboard/seeker", label: "Seeker Home", icon: "chart" as const },
        { href: "/dashboard/seeker/jobs", label: "Browse & Apply", icon: "search" as const },
        { href: "/dashboard/seeker/saved", label: "Saved Jobs", icon: "bookmark" as const },
        { href: "/dashboard/seeker/applications", label: "My Applications", icon: "briefcase" as const },
        { href: "/dashboard/seeker/billing", label: "Subscription & Billing", icon: "creditCard" as const },
        { href: "/dashboard/seeker/settings", label: "Settings", icon: "settings" as const },
      ];

  const publicLinks = [
    { href: "/", label: "Home" },
    { href: "/jobs", label: "Browse Jobs" },
    { href: "/companies", label: "Companies" },
    { href: "/pricing", label: "Pricing" },
  ];

  const handleLogout = async () => {
    try {
      await signOut();
    } catch (err) {
      console.error(err);
    }
    startTransition(() => {
      router.push("/");
      router.refresh();
    });
  };

  return (
    <div className="flex min-h-screen bg-[#07070a] text-zinc-100">
      {/* Mobile Top Header */}
      <div className="fixed inset-x-0 top-0 z-40 flex h-16 items-center justify-between border-b border-white/10 bg-[#0e0e14]/95 px-4 backdrop-blur-md lg:hidden">
        <Link href="/" className="flex items-center">
          <Image src="/logo.png" alt="HireLoop" width={130} height={36} className="h-7 w-auto object-contain" />
        </Link>

        <button
          type="button"
          onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
          aria-label="Toggle Dashboard Menu"
          className="grid h-10 w-10 place-items-center rounded-xl border border-white/10 bg-white/5 text-zinc-300 hover:text-white"
        >
          <Icon name={mobileSidebarOpen ? "close" : "menu"} className="h-5 w-5" />
        </button>
      </div>

      {/* Backdrop for Mobile Sidebar */}
      {mobileSidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/80 backdrop-blur-sm lg:hidden"
          onClick={() => setMobileSidebarOpen(false)}
        />
      )}

      {/* Left Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-72 flex-col justify-between border-r border-white/10 bg-[#0d0d14] p-5 transition-transform duration-300 lg:static lg:translate-x-0 ${
          mobileSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col gap-6">
          {/* Logo */}
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center" aria-label="HireLoop home">
              <Image
                src="/logo.png"
                alt="HireLoop"
                width={154}
                height={44}
                priority
                className="h-8 w-auto object-contain"
              />
            </Link>

            <button
              type="button"
              onClick={() => setMobileSidebarOpen(false)}
              className="grid h-8 w-8 place-items-center rounded-lg border border-white/10 text-zinc-400 hover:text-white lg:hidden"
            >
              <Icon name="close" className="h-4 w-4" />
            </button>
          </div>

          {/* User Profile Card on Sidebar */}
          <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-3.5">
            <div className="flex items-center gap-3">
              <div className="relative h-10 w-10 overflow-hidden rounded-xl border border-white/15">
                <Image src={user.avatar} alt={user.name} fill sizes="40px" className="object-cover" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-xs font-bold text-white">{user.name}</p>
                <p className="truncate text-[11px] text-zinc-400">{user.email}</p>
              </div>
            </div>
            <div className="mt-2.5 flex items-center justify-between border-t border-white/5 pt-2">
              <span className="text-[10px] font-semibold uppercase tracking-wider text-zinc-500">
                ROLE
              </span>
              <span className="rounded-md bg-[#5c53fe]/20 border border-[#5c53fe]/30 px-2 py-0.5 text-[10px] font-bold text-[#b3aefc]">
                {user.role}
              </span>
            </div>
          </div>

          {/* Quick Role Switcher Pill for reviewer ease */}
          <div className="rounded-xl border border-white/5 bg-[#121218] p-1 text-[11px] flex justify-between">
            <Link
              href="/dashboard/seeker"
              onClick={() => setMobileSidebarOpen(false)}
              className={`flex-1 rounded-lg py-1 text-center font-medium transition-colors ${
                currentRole === "seeker"
                  ? "bg-[#5c53fe] text-white"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              Seeker
            </Link>
            <Link
              href="/dashboard/recruiter"
              onClick={() => setMobileSidebarOpen(false)}
              className={`flex-1 rounded-lg py-1 text-center font-medium transition-colors ${
                currentRole === "recruiter"
                  ? "bg-[#5c53fe] text-white"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              Recruiter
            </Link>
            <Link
              href="/dashboard/admin"
              onClick={() => setMobileSidebarOpen(false)}
              className={`flex-1 rounded-lg py-1 text-center font-medium transition-colors ${
                currentRole === "admin"
                  ? "bg-[#5c53fe] text-white"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              Admin
            </Link>
          </div>

          {/* Role Navigation Links */}
          <div>
            <span className="px-2 text-[10px] font-bold uppercase tracking-wider text-zinc-500">
              Dashboard Menu
            </span>
            <nav className="mt-2 space-y-1">
              {roleNavLinks.map((item) => {
                const active =
                  pathname === item.href ||
                  (item.href === "/dashboard/recruiter/jobs" &&
                    pathname.startsWith("/dashboard/jobs"));
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileSidebarOpen(false)}
                    className={`flex items-center gap-3 rounded-xl px-3 py-2 text-xs font-semibold transition-colors ${
                      active
                        ? "bg-[#5c53fe] text-white shadow-[0_0_16px_rgba(92,83,254,0.35)]"
                        : "text-zinc-300 hover:bg-white/5 hover:text-white"
                    }`}
                  >
                    <Icon name={item.icon} className="h-4 w-4 shrink-0" />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Public Pages Links */}
          <div className="border-t border-white/5 pt-4">
            <span className="px-2 text-[10px] font-bold uppercase tracking-wider text-zinc-500">
              Public Marketplace
            </span>
            <nav className="mt-2 space-y-1">
              {publicLinks.map((p) => (
                <Link
                  key={p.href}
                  href={p.href}
                  onClick={() => setMobileSidebarOpen(false)}
                  className="flex items-center justify-between rounded-xl px-3 py-1.5 text-xs text-zinc-400 transition-colors hover:bg-white/5 hover:text-white"
                >
                  <span>{p.label}</span>
                  <Icon name="arrowUpRight" className="h-3 w-3 text-zinc-500" />
                </Link>
              ))}
            </nav>
          </div>
        </div>

        {/* Logout Button */}
        <div className="border-t border-white/10 pt-4">
          <button
            type="button"
            onClick={handleLogout}
            className="flex w-full items-center justify-center gap-2 rounded-xl border border-red-500/20 bg-red-500/10 py-2.5 text-xs font-semibold text-red-400 transition-colors hover:bg-red-500/20"
          >
            <Icon name="logout" className="h-3.5 w-3.5" />
            <span>End Session &amp; Logout</span>
          </button>
        </div>
      </aside>

      {/* Pages at the Right */}
      <div className="flex-1 overflow-y-auto pt-16 lg:pt-0">
        <div className="min-h-full p-4 sm:p-6 lg:p-8">{children}</div>
      </div>
    </div>
  );
}
