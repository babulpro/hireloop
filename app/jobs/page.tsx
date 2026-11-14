"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useMemo } from "react";
import { jobs } from "../data/site";
import { Icon } from "../components/Icons";
import { Badge } from "../components/ui";
import Footer from "../components/Footer";

const jobTypeFilters = [
  { label: "Full-time", count: "1.2k" },
  { label: "Contract", count: "432" },
  { label: "Freelance", count: "156" },
  { label: "Internship", count: "45" },
];

const experienceFilters = [
  { label: "Entry Level", range: "0-2 Years" },
  { label: "Mid-level", range: "3-5 Years" },
  { label: "Senior", range: "5+ Years" },
  { label: "Lead / Executive", range: "6+ Years" },
];

const workplaceFilters = ["All", "Remote", "Hybrid", "On-site"];

export default function BrowseJobsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [locationQuery, setLocationQuery] = useState("");
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedWorkplace, setSelectedWorkplace] = useState("All");
  const [sortBy, setSortBy] = useState("Most Recent");
  const [bookmarkedIds, setBookmarkedIds] = useState<Record<string, boolean>>({
    "senior-product-designer": true,
    "lead-frontend-engineer": true,
  });
  const [currentPage, setCurrentPage] = useState(1);

  const toggleBookmark = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setBookmarkedIds((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleType = (type: string) => {
    setSelectedTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };

  const clearFilters = () => {
    setSearchQuery("");
    setLocationQuery("");
    setSelectedTypes([]);
    setSelectedWorkplace("All");
  };

  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      if (
        searchQuery &&
        !job.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !job.company.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !job.skills.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()))
      ) {
        return false;
      }
      if (
        locationQuery &&
        !job.location.toLowerCase().includes(locationQuery.toLowerCase())
      ) {
        return false;
      }
      if (selectedTypes.length > 0 && !selectedTypes.includes(job.type)) {
        return false;
      }
      if (selectedWorkplace !== "All") {
        if (
          !job.schedule.toLowerCase().includes(selectedWorkplace.toLowerCase()) &&
          !job.location.toLowerCase().includes(selectedWorkplace.toLowerCase())
        ) {
          return false;
        }
      }
      return true;
    });
  }, [searchQuery, locationQuery, selectedTypes, selectedWorkplace]);

  return (
    <div className="flex min-h-screen flex-col bg-[#07070a] text-zinc-100">
      {/* Search Header Banner */}
      <section className="relative border-b border-white/10 bg-[#0d0d12] px-4 py-10 sm:px-6">
        <div className="mx-auto max-w-[1320px]">
          <div className="max-w-2xl">
            <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Explore Professional Opportunities
            </h1>
            <p className="mt-2 text-sm text-zinc-400">
              Browse thousands of high-impact roles at vetted technology and innovative companies.
            </p>
          </div>

          {/* Search bar matching Figma frame */}
          <div className="mt-6 flex flex-col gap-3 rounded-2xl border border-white/10 bg-[#14141c] p-2.5 shadow-xl md:flex-row md:items-center">
            <div className="flex flex-1 items-center gap-3 px-3 py-2">
              <Icon name="search" className="h-5 w-5 shrink-0 text-zinc-400" />
              <input
                type="text"
                placeholder="Search by job title, keywords..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-transparent text-sm text-white placeholder:text-zinc-500 focus:outline-none"
              />
            </div>

            <span className="hidden h-8 w-px bg-white/10 md:block" />

            <div className="flex flex-1 items-center gap-3 px-3 py-2">
              <Icon name="pin" className="h-5 w-5 shrink-0 text-zinc-400" />
              <input
                type="text"
                placeholder="City, state or remote"
                value={locationQuery}
                onChange={(e) => setLocationQuery(e.target.value)}
                className="w-full bg-transparent text-sm text-white placeholder:text-zinc-500 focus:outline-none"
              />
            </div>

            <button
              type="button"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#5c53fe] px-6 py-3 text-sm font-semibold text-white shadow-[0_0_20px_rgba(92,83,254,0.35)] transition-all hover:bg-[#6c64ff]"
            >
              <Icon name="search" className="h-4 w-4" />
              <span>Search Jobs</span>
            </button>
          </div>
        </div>
      </section>

      {/* Main Content Area: Sidebar + Job Listings */}
      <main className="mx-auto w-full max-w-[1320px] flex-1 px-4 py-8 sm:px-6">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[280px_1fr]">
          {/* Left Filter Sidebar */}
          <aside className="space-y-6">
            <div className="rounded-2xl border border-white/10 bg-[#121218] p-5">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <span className="text-sm font-semibold text-white">Filters</span>
                {(searchQuery || locationQuery || selectedTypes.length > 0 || selectedWorkplace !== "All") && (
                  <button
                    type="button"
                    onClick={clearFilters}
                    className="text-xs font-medium text-[#9c95ff] hover:text-white"
                  >
                    Clear all
                  </button>
                )}
              </div>

              {/* Job Type Filter */}
              <div className="mt-5">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
                  Job Type
                </h3>
                <div className="mt-3 space-y-2.5">
                  {jobTypeFilters.map((t) => (
                    <label
                      key={t.label}
                      className="flex cursor-pointer items-center justify-between text-xs text-zinc-300 hover:text-white"
                    >
                      <span className="flex items-center gap-2.5">
                        <input
                          type="checkbox"
                          checked={selectedTypes.includes(t.label)}
                          onChange={() => toggleType(t.label)}
                          className="h-4 w-4 rounded border-zinc-700 bg-zinc-900 text-[#5c53fe] focus:ring-[#5c53fe]"
                        />
                        <span>{t.label}</span>
                      </span>
                      <span className="text-zinc-500">{t.count}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Workplace Filter */}
              <div className="mt-6 border-t border-white/10 pt-5">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
                  Workplace
                </h3>
                <div className="mt-3 flex flex-wrap gap-2">
                  {workplaceFilters.map((w) => (
                    <button
                      key={w}
                      type="button"
                      onClick={() => setSelectedWorkplace(w)}
                      className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
                        selectedWorkplace === w
                          ? "bg-[#5c53fe] text-white"
                          : "border border-white/10 bg-white/5 text-zinc-400 hover:text-white"
                      }`}
                    >
                      {w}
                    </button>
                  ))}
                </div>
              </div>

              {/* Experience Level */}
              <div className="mt-6 border-t border-white/10 pt-5">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
                  Experience Level
                </h3>
                <div className="mt-3 space-y-2">
                  {experienceFilters.map((exp) => (
                    <div key={exp.label} className="flex items-center justify-between text-xs text-zinc-300">
                      <span>{exp.label}</span>
                      <span className="text-zinc-500">{exp.range}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* Right Main Job Listings */}
          <div>
            {/* Header & Sort Bar */}
            <div className="flex flex-col items-start justify-between gap-4 border-b border-white/10 pb-5 sm:flex-row sm:items-center">
              <div>
                <span className="text-base font-semibold text-white">
                  Found {filteredJobs.length > 0 ? "1,248" : "0"} Professional Jobs
                </span>
                <p className="text-xs text-zinc-400">
                  Showing {filteredJobs.length} active listings matching your preferences
                </p>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs text-zinc-400">Sort by:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="rounded-lg border border-white/10 bg-[#14141c] px-3 py-1.5 text-xs font-medium text-white focus:outline-none"
                >
                  <option value="Most Recent">Most Recent</option>
                  <option value="Highest Salary">Highest Salary</option>
                  <option value="Most Relevant">Most Relevant</option>
                </select>
              </div>
            </div>

            {/* Job Cards List matching Figma format */}
            <div className="mt-6 space-y-4">
              {filteredJobs.length === 0 ? (
                <div className="rounded-2xl border border-white/10 bg-[#121218] p-12 text-center">
                  <p className="text-base text-zinc-300">No jobs match your selected criteria.</p>
                  <button
                    type="button"
                    onClick={clearFilters}
                    className="mt-4 rounded-xl bg-[#5c53fe] px-4 py-2 text-xs font-semibold text-white"
                  >
                    Reset All Filters
                  </button>
                </div>
              ) : (
                filteredJobs.map((job) => {
                  const isSaved = bookmarkedIds[job.id] || false;
                  return (
                    <article
                      key={job.id}
                      className="group relative flex flex-col justify-between rounded-2xl border border-white/10 bg-[#121218] p-5 transition-all hover:border-[#5c53fe]/50 hover:bg-[#14141e] sm:flex-row sm:items-center sm:p-6"
                    >
                      <div className="flex items-start gap-4">
                        <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-xl border border-white/10 bg-white p-1">
                          <Image
                            src={job.logo}
                            alt={job.company}
                            width={44}
                            height={44}
                            className="h-full w-full object-contain"
                          />
                        </div>

                        <div>
                          <div className="flex flex-wrap items-center gap-2">
                            <Link
                              href={`/jobs/${job.id}`}
                              className="text-base font-semibold text-white transition-colors group-hover:text-[#b3aefc]"
                            >
                              {job.title}
                            </Link>
                            {job.hot && <Badge tone="warning">Hot Job</Badge>}
                            {job.featured && !job.hot && <Badge tone="purple">Featured</Badge>}
                          </div>

                          <p className="mt-1 text-xs text-zinc-400">
                            <span className="font-medium text-zinc-300">{job.company}</span>
                            <span className="mx-2 text-zinc-600">•</span>
                            <span>{job.location}</span>
                          </p>

                          <div className="mt-3 flex flex-wrap items-center gap-2 text-xs">
                            <span className="rounded-md border border-white/10 bg-white/5 px-2.5 py-0.5 font-medium text-emerald-400">
                              {job.salary}
                            </span>
                            <span className="rounded-md border border-white/10 bg-white/5 px-2.5 py-0.5 text-zinc-300">
                              {job.type}
                            </span>
                            <span className="rounded-md border border-white/10 bg-white/5 px-2.5 py-0.5 text-zinc-400">
                              {job.schedule}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="mt-4 flex items-center justify-between gap-3 border-t border-white/5 pt-4 sm:mt-0 sm:flex-col sm:items-end sm:border-0 sm:pt-0">
                        <span className="text-[11px] text-zinc-500">{job.posted}</span>

                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={(e) => toggleBookmark(job.id, e)}
                            title={isSaved ? "Remove bookmark" : "Save job"}
                            className={`grid h-9 w-9 place-items-center rounded-lg border transition-colors ${
                              isSaved
                                ? "border-[#5c53fe] bg-[#5c53fe]/20 text-[#b3aefc]"
                                : "border-white/10 bg-white/5 text-zinc-400 hover:text-white"
                            }`}
                          >
                            <Icon name="bookmark" className="h-4 w-4" />
                          </button>

                          <Link
                            href={`/jobs/${job.id}`}
                            className="inline-flex items-center gap-1.5 rounded-lg bg-[#5c53fe] px-4 py-2 text-xs font-semibold text-white shadow-[0_0_12px_rgba(92,83,254,0.3)] transition-all hover:bg-[#6c64ff]"
                          >
                            <span>Easy Apply</span>
                            <Icon name="arrowUpRight" className="h-3 w-3" />
                          </Link>
                        </div>
                      </div>
                    </article>
                  );
                })
              )}
            </div>

            {/* Pagination Matching Figma: 1 2 3 ... 42 */}
            <div className="mt-10 flex items-center justify-center gap-2">
              <button
                type="button"
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="grid h-9 w-9 place-items-center rounded-lg border border-white/10 bg-white/5 text-zinc-400 transition-colors hover:text-white disabled:opacity-40"
              >
                <Icon name="chevronLeft" className="h-4 w-4" />
              </button>

              {[1, 2, 3].map((page) => (
                <button
                  key={page}
                  type="button"
                  onClick={() => setCurrentPage(page)}
                  className={`grid h-9 w-9 place-items-center rounded-lg text-xs font-semibold transition-colors ${
                    currentPage === page
                      ? "bg-[#5c53fe] text-white"
                      : "border border-white/10 bg-white/5 text-zinc-400 hover:text-white"
                  }`}
                >
                  {page}
                </button>
              ))}

              <span className="px-1 text-zinc-600">...</span>

              <button
                type="button"
                onClick={() => setCurrentPage(42)}
                className={`grid h-9 w-9 place-items-center rounded-lg text-xs font-semibold transition-colors ${
                  currentPage === 42
                    ? "bg-[#5c53fe] text-white"
                    : "border border-white/10 bg-white/5 text-zinc-400 hover:text-white"
                }`}
              >
                42
              </button>

              <button
                type="button"
                onClick={() => setCurrentPage((p) => p + 1)}
                className="grid h-9 w-9 place-items-center rounded-lg border border-white/10 bg-white/5 text-zinc-400 transition-colors hover:text-white"
              >
                <Icon name="chevronRight" className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
