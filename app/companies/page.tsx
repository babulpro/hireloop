"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useMemo } from "react";
import { companies } from "../data/site";
import { Icon } from "../components/Icons";
import Footer from "../components/Footer";

const industries = [
  "All",
  "Cloud Tech",
  "Fintech",
  "HealthTech",
  "Design",
  "CleanTech",
  "AI",
  "SaaS",
];

export default function BrowseCompaniesPage() {
  const [search, setSearch] = useState("");
  const [selectedIndustry, setSelectedIndustry] = useState("All");

  const filteredCompanies = useMemo(() => {
    return companies.filter((comp) => {
      const matchSearch =
        !search ||
        comp.name.toLowerCase().includes(search.toLowerCase()) ||
        comp.industry.toLowerCase().includes(search.toLowerCase()) ||
        comp.location.toLowerCase().includes(search.toLowerCase()) ||
        comp.about.toLowerCase().includes(search.toLowerCase());

      const matchIndustry =
        selectedIndustry === "All" ||
        comp.industry.toLowerCase().includes(selectedIndustry.toLowerCase());

      return matchSearch && matchIndustry;
    });
  }, [search, selectedIndustry]);

  return (
    <div className="flex min-h-screen flex-col bg-[#07070a] text-zinc-100">
      {/* Header Banner matching Figma */}
      <section className="relative border-b border-white/10 bg-[#0d0d12] px-4 py-12 sm:px-6">
        <div className="mx-auto max-w-[1320px]">
          <div className="max-w-2xl">
            <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
              Browse Companies
            </h1>
            <p className="mt-3 text-sm leading-relaxed text-zinc-400 sm:text-base">
              Discover the world&apos;s leading technology and creative organizations. Filter by
              industry, size, and values to find your next professional home.
            </p>
          </div>

          {/* Search Bar matching Figma */}
          <div className="mt-8 flex flex-col gap-3 rounded-2xl border border-white/10 bg-[#14141c] p-2.5 shadow-xl sm:flex-row sm:items-center">
            <div className="flex flex-1 items-center gap-3 px-3 py-2">
              <Icon name="search" className="h-5 w-5 shrink-0 text-zinc-400" />
              <input
                type="text"
                placeholder="Search by name, industry, or location..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-transparent text-sm text-white placeholder:text-zinc-500 focus:outline-none"
              />
            </div>

            <button
              type="button"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#5c53fe] px-7 py-3 text-sm font-semibold text-white shadow-[0_0_20px_rgba(92,83,254,0.35)] transition-all hover:bg-[#6c64ff]"
            >
              <span>Find Companies</span>
            </button>
          </div>

          {/* Industry Filter Pills */}
          <div className="mt-6 flex flex-wrap gap-2">
            {industries.map((ind) => (
              <button
                key={ind}
                type="button"
                onClick={() => setSelectedIndustry(ind)}
                className={`rounded-full px-4 py-1.5 text-xs font-medium transition-colors ${
                  selectedIndustry === ind
                    ? "bg-[#5c53fe] text-white shadow-[0_0_12px_rgba(92,83,254,0.4)]"
                    : "border border-white/10 bg-[#141418] text-zinc-400 hover:border-white/20 hover:text-white"
                }`}
              >
                {ind}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Companies Grid */}
      <main className="mx-auto w-full max-w-[1320px] flex-1 px-4 py-12 sm:px-6">
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <span className="text-sm font-semibold text-white">
            Showing {filteredCompanies.length} Top Organizations
          </span>
          <span className="text-xs text-zinc-400">All companies strictly verified</span>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredCompanies.map((comp) => (
            <div
              key={comp.id}
              className="group flex flex-col justify-between rounded-3xl border border-white/10 bg-[#121218] p-6 transition-all hover:border-[#5c53fe]/50 hover:bg-[#14141e] hover:shadow-2xl"
            >
              <div>
                <div className="flex items-start justify-between gap-4">
                  <div className="relative h-14 w-14 overflow-hidden rounded-2xl border border-white/10 bg-white p-2">
                    <Image
                      src={comp.logo}
                      alt={comp.name}
                      width={52}
                      height={52}
                      className="h-full w-full object-contain"
                    />
                  </div>

                  {comp.verified && (
                    <span className="inline-flex items-center gap-1 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-emerald-400">
                      <Icon name="check" className="h-3 w-3" />
                      VERIFIED
                    </span>
                  )}
                </div>

                <Link
                  href={`/companies/${comp.id}`}
                  className="mt-5 block text-xl font-bold text-white transition-colors group-hover:text-[#b3aefc]"
                >
                  {comp.name}
                </Link>
                <p className="mt-2 line-clamp-3 text-xs leading-relaxed text-zinc-400">
                  {comp.about}
                </p>

                <div className="mt-5 flex flex-wrap gap-2 text-xs">
                  <span className="rounded-lg border border-white/10 bg-white/5 px-2.5 py-1 text-zinc-300">
                    {comp.industry}
                  </span>
                  <span className="rounded-lg border border-white/10 bg-white/5 px-2.5 py-1 text-zinc-400">
                    {comp.location}
                  </span>
                </div>
              </div>

              <div className="mt-8 flex items-center justify-between border-t border-white/10 pt-4">
                <span className="text-xs font-semibold text-[#b3aefc]">
                  {comp.activeJobs} Active Jobs
                </span>

                <Link
                  href={`/companies/${comp.id}`}
                  className="inline-flex items-center gap-1.5 rounded-xl bg-[#5c53fe] px-4 py-2 text-xs font-semibold text-white transition-all hover:bg-[#6c64ff]"
                >
                  <span>View Profile &amp; Jobs</span>
                  <Icon name="arrowUpRight" className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
