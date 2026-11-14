import Image from "next/image";
import Link from "next/link";

const quickLinks = [
  "Trending Position",
  "Explore by Industry",
  "AI Engineering",
  "Remote Jobs",
];

const stats = [
  {
    value: "50K",
    label: "Active Jobs",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-5 w-5">
        <rect x="2" y="7" width="20" height="14" rx="2" />
        <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
      </svg>
    ),
  },
  {
    value: "12K",
    label: "Companies",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-5 w-5">
        <rect x="4" y="2" width="16" height="20" rx="2" />
        <path d="M9 22v-4h6v4M8 6h.01M12 6h.01M16 6h.01M8 10h.01M12 10h.01M16 10h.01M8 14h.01M12 14h.01M16 14h.01" />
      </svg>
    ),
  },
  {
    value: "2M",
    label: "Job Seekers",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-5 w-5">
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
  {
    value: "97%",
    label: "Satisfaction Rate",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-5 w-5">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 22 12 18.56 5.82 22 7 14.14l-5-4.87 6.91-1.01L12 2z" />
      </svg>
    ),
  },
];


export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-[#07070a] px-4 pt-12 pb-16">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[420px] bg-[radial-gradient(ellipse_at_top,rgba(84,70,236,0.22),transparent_65%)]" />

      {/* Hero card */}
      <div className="relative mx-auto max-w-3xl rounded-2xl border border-white/10 bg-gradient-to-b from-[#111117] to-[#0b0b10] px-6 py-9 text-center shadow-[0_0_90px_rgba(84,70,236,0.18)] sm:px-10 sm:py-11">
        <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.12em] text-[#A9A5F7]">
          <span className="h-1.5 w-1.5 rounded-full bg-[#F5821F]" />
          <span className="text-white">99,999+</span>
          New jobs this month
        </span>

        <h1 className="mt-5 text-3xl font-semibold tracking-tight text-white sm:text-4xl lg:text-[42px]">
          Find Your Dream Job Today
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-zinc-400">
          Hireloop connects top talent with world-class companies. Browse
          thousands of curated opportunities and find your next role — faster.
        </p>

        {/* Search */}
        <form className="mt-7 flex flex-col gap-2 rounded-xl border border-white/10 bg-[#0d0d13] p-2 sm:flex-row sm:items-center">
          <label className="flex flex-1 items-center gap-2 rounded-lg px-3 py-2">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-4 w-4 shrink-0 text-zinc-500">
              <circle cx="11" cy="11" r="7" />
              <path d="M21 21l-4.35-4.35" />
            </svg>
            <input
              type="text"
              placeholder="Job title, skill or company"
              className="w-full bg-transparent text-sm text-white placeholder:text-zinc-500 focus:outline-none"
            />
          </label>

          <span className="hidden h-6 w-px bg-white/10 sm:block" aria-hidden="true" />

          <label className="flex flex-1 items-center gap-2 rounded-lg px-3 py-2">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-4 w-4 shrink-0 text-zinc-500">
              <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            <input
              type="text"
              placeholder="Location or Remote"
              className="w-full bg-transparent text-sm text-white placeholder:text-zinc-500 focus:outline-none"
            />
          </label>

          <button
            type="submit"
            aria-label="Search jobs"
            className="grid h-10 w-10 shrink-0 place-items-center self-end rounded-lg bg-[#4b3ff2] text-white transition-colors hover:bg-[#5a4ffd] sm:self-auto"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-4 w-4">
              <circle cx="11" cy="11" r="7" />
              <path d="M21 21l-4.35-4.35" />
            </svg>
          </button>
        </form>

        {/* Action CTAs & Quick links */}
        <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/jobs"
            className="inline-flex items-center gap-1.5 rounded-xl bg-[#5c53fe] px-4 py-2 text-xs font-semibold text-white shadow-[0_0_16px_rgba(92,83,254,0.35)] transition-all hover:bg-[#6c64ff]"
          >
            <span>Search Jobs</span>
          </Link>
          <Link
            href="/dashboard/recruiter/jobs/new"
            className="inline-flex items-center gap-1.5 rounded-xl border border-white/15 bg-white/5 px-4 py-2 text-xs font-semibold text-zinc-300 hover:bg-white/10 hover:text-white transition-colors"
          >
            <span>Post a Job</span>
          </Link>
        </div>

        {/* Quick links */}
        <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
          {quickLinks.map((link) => (
            <button
              key={link}
              type="button"
              className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-[11px] text-zinc-400 transition-colors hover:border-white/20 hover:text-white"
            >
              {link}
            </button>
          ))}
        </div>
      </div>

      {/* Globe */}
      <div className="relative mx-auto mt-4 w-full max-w-5xl">
        <Image
          src="/cta-bg.png"
          alt=""
          fill
          sizes="1024px"
          className="object-cover object-bottom opacity-40 [mask-image:radial-gradient(ellipse_65%_55%_at_50%_55%,black_20%,transparent_75%)]"
        />

        <div className="relative h-[420px] overflow-hidden sm:h-[560px]">
          <Image
            src="/globe.png"
            alt=""
            fill
            priority
            sizes="(min-width: 1024px) 1024px, 100vw"
            className="object-cover object-[50%_42%] [mask-image:linear-gradient(to_bottom,transparent,black_22%,black_100%)]"
          />
          <div className="pointer-events-none absolute inset-x-0 top-0 h-44 bg-gradient-to-b from-[#07070a] via-[#07070a]/70 to-transparent" />
          <p className="absolute inset-x-0 top-[12%] px-6 text-center text-lg font-medium text-zinc-200 sm:text-xl">
            Assisting over{" "}
            <span className="text-[#8E8AF2]">15,000</span> job seekers
            <br className="hidden sm:block" /> find their dream positions.
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="relative z-10 mx-auto -mt-24 w-full max-w-5xl sm:-mt-28">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-xl border border-white/10 bg-[#0d0d11] p-5 shadow-[0_10px_40px_rgba(0,0,0,0.35)]"
            >
              <span className="text-zinc-500">{stat.icon}</span>
              <p className="mt-6 text-3xl font-semibold tracking-tight text-white">
                {stat.value}
              </p>
              <p className="mt-1 text-xs text-zinc-500">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
