"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useMemo } from "react";
import { jobs, seekerData } from "../../../data/site";
import { Icon } from "../../../components/Icons";

const categories = ["All", "Engineering", "Design", "Product"];
const jobTypes = ["All", "Full-time", "Contract", "Remote"];

export default function SeekerJobsPage() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedType, setSelectedType] = useState("All");
  const [savedJobs, setSavedJobs] = useState<Record<string, boolean>>({
    "senior-product-designer": true,
    "lead-frontend-engineer": true,
  });

  // Apply Modal state
  const [selectedJob, setSelectedJob] = useState<(typeof jobs)[0] | null>(null);
  const [coverLetter, setCoverLetter] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [appliedSuccess, setAppliedSuccess] = useState<string | null>(null);
  const [appsUsed, setAppsUsed] = useState(seekerData.profile.applicationsUsedThisMonth);

  const toggleSave = (id: string) => {
    setSavedJobs((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const filteredJobs = useMemo(() => {
    return jobs.filter((j) => {
      const matchSearch =
        !search ||
        j.title.toLowerCase().includes(search.toLowerCase()) ||
        j.company.toLowerCase().includes(search.toLowerCase()) ||
        j.skills.some((s) => s.toLowerCase().includes(search.toLowerCase()));

      const matchCat =
        selectedCategory === "All" || j.category === selectedCategory;

      const matchType =
        selectedType === "All" ||
        j.type.toLowerCase().includes(selectedType.toLowerCase()) ||
        j.schedule.toLowerCase().includes(selectedType.toLowerCase());

      return matchSearch && matchCat && matchType;
    });
  }, [search, selectedCategory, selectedType]);

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedJob) return;

    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setAppsUsed((prev) => prev + 1);
      setAppliedSuccess(selectedJob.title);
      setSelectedJob(null);
      setCoverLetter("");
      setTimeout(() => setAppliedSuccess(null), 4000);
    }, 800);
  };

  return (
    <div className="space-y-6">
      {/* Toast Alert */}
      {appliedSuccess && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 rounded-2xl border border-emerald-500/30 bg-[#0e1f14] p-4 text-emerald-300 shadow-2xl backdrop-blur-xl animate-in fade-in slide-in-from-bottom-5">
          <span className="grid h-8 w-8 place-items-center rounded-xl bg-emerald-500/20 text-emerald-400">
            <Icon name="checkCircle" className="h-5 w-5" />
          </span>
          <div>
            <p className="text-xs font-bold text-white">Application Submitted!</p>
            <p className="text-[11px] text-emerald-400/90">
              Successfully applied for <span className="font-semibold">{appliedSuccess}</span>.
            </p>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col justify-between gap-4 border-b border-white/10 pb-6 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-bold text-white sm:text-3xl">Browse &amp; Apply</h1>
          <p className="mt-1 text-xs text-zinc-400">
            Search verified opportunities directly within your seeker console.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="rounded-xl border border-white/10 bg-[#121218] px-3.5 py-1.5 text-xs text-zinc-300">
            Monthly Applications:{" "}
            <span className="font-bold text-[#b3aefc]">
              {appsUsed} / {seekerData.profile.applicationsLimit}
            </span>
          </div>
        </div>
      </div>

      {/* Search & Filters */}
      <div className="flex flex-col gap-4 rounded-2xl border border-white/10 bg-[#121218] p-4 md:flex-row md:items-center">
        <div className="relative flex-1">
          <Icon
            name="search"
            className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400"
          />
          <input
            type="text"
            placeholder="Search role, company, or skill..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-xl border border-white/10 bg-white/5 py-2.5 pl-10 pr-4 text-xs text-white placeholder-zinc-500 focus:border-[#5c53fe] focus:outline-none"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <span className="text-[11px] font-semibold text-zinc-400">Category:</span>
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
                selectedCategory === cat
                  ? "bg-[#5c53fe] text-white"
                  : "border border-white/5 bg-white/5 text-zinc-400 hover:text-white"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <span className="text-[11px] font-semibold text-zinc-400">Type:</span>
          {jobTypes.map((type) => (
            <button
              key={type}
              type="button"
              onClick={() => setSelectedType(type)}
              className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
                selectedType === type
                  ? "bg-[#5c53fe] text-white"
                  : "border border-white/5 bg-white/5 text-zinc-400 hover:text-white"
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* Jobs Grid */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {filteredJobs.map((job) => {
          const isSaved = !!savedJobs[job.id];

          return (
            <div
              key={job.id}
              className="flex flex-col justify-between rounded-2xl border border-white/10 bg-[#121218] p-5 transition-all hover:border-[#5c53fe]/40 hover:bg-white/[0.02]"
            >
              <div>
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-xl border border-white/10 bg-white p-1">
                      <Image
                        src={job.logo}
                        alt={job.company}
                        fill
                        className="object-contain p-1"
                      />
                    </div>
                    <div>
                      <Link
                        href={`/jobs/${job.id}`}
                        className="font-bold text-white transition-colors hover:text-[#b3aefc]"
                      >
                        {job.title}
                      </Link>
                      <p className="text-xs text-zinc-400">{job.company}</p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => toggleSave(job.id)}
                    aria-label={isSaved ? "Remove from saved" : "Save job"}
                    className={`grid h-9 w-9 shrink-0 place-items-center rounded-xl border transition-colors ${
                      isSaved
                        ? "border-[#5c53fe]/50 bg-[#5c53fe]/20 text-[#b3aefc]"
                        : "border-white/10 bg-white/5 text-zinc-400 hover:text-white"
                    }`}
                  >
                    <Icon name="bookmark" className="h-4 w-4" />
                  </button>
                </div>

                <p className="mt-3 line-clamp-2 text-xs leading-relaxed text-zinc-400">
                  {job.description}
                </p>

                <div className="mt-4 flex flex-wrap items-center gap-2 text-[11px] text-zinc-400">
                  <span className="rounded-md border border-white/5 bg-white/5 px-2 py-0.5 font-medium text-zinc-300">
                    {job.location}
                  </span>
                  <span className="rounded-md border border-white/5 bg-white/5 px-2 py-0.5 font-medium text-zinc-300">
                    {job.type}
                  </span>
                  <span className="rounded-md border border-white/5 bg-white/5 px-2 py-0.5 font-bold text-emerald-400">
                    {job.salary}
                  </span>
                </div>
              </div>

              <div className="mt-5 flex items-center justify-between border-t border-white/5 pt-4">
                <span className="text-[11px] text-zinc-500">Posted {job.posted}</span>
                <div className="flex items-center gap-2">
                  <Link
                    href={`/jobs/${job.id}`}
                    className="rounded-xl border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-semibold text-zinc-300 hover:text-white"
                  >
                    Details
                  </Link>
                  <button
                    type="button"
                    onClick={() => setSelectedJob(job)}
                    className="rounded-xl bg-[#5c53fe] px-4 py-1.5 text-xs font-bold text-white shadow-md transition-colors hover:bg-[#6c64ff]"
                  >
                    Apply Now
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Quick Application Modal */}
      {selectedJob && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm animate-in fade-in">
          <div className="w-full max-w-lg rounded-3xl border border-white/15 bg-[#121218] p-6 shadow-2xl sm:p-8">
            <div className="flex items-start justify-between">
              <div>
                <span className="rounded-md bg-[#5c53fe]/20 px-2 py-0.5 text-[10px] font-bold text-[#b3aefc]">
                  CONFIRM APPLICATION
                </span>
                <h3 className="mt-2 text-lg font-bold text-white">
                  Apply for {selectedJob.title}
                </h3>
                <p className="text-xs text-zinc-400">
                  {selectedJob.company} • {selectedJob.location}
                </p>
              </div>

              <button
                type="button"
                onClick={() => setSelectedJob(null)}
                className="grid h-8 w-8 place-items-center rounded-lg border border-white/10 text-zinc-400 hover:text-white"
              >
                <Icon name="close" className="h-4 w-4" />
              </button>
            </div>

            <form onSubmit={handleApply} className="mt-6 space-y-4">
              <div>
                <label className="text-xs font-semibold text-zinc-300">
                  Applicant Profile
                </label>
                <div className="mt-1.5 flex items-center justify-between rounded-xl border border-white/10 bg-white/5 p-3 text-xs">
                  <div>
                    <p className="font-semibold text-white">{seekerData.profile.name}</p>
                    <p className="text-zinc-400">{seekerData.profile.email}</p>
                  </div>
                  <span className="rounded-md bg-white/10 px-2 py-0.5 text-[10px] text-zinc-300">
                    Resume: Attached (PDF)
                  </span>
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-zinc-300">
                  Personal Note / Cover Letter (Optional)
                </label>
                <textarea
                  rows={4}
                  value={coverLetter}
                  onChange={(e) => setCoverLetter(e.target.value)}
                  placeholder="Introduce yourself and explain why you're a great fit for this role..."
                  className="mt-1.5 w-full rounded-xl border border-white/10 bg-white/5 p-3 text-xs text-white placeholder-zinc-500 focus:border-[#5c53fe] focus:outline-none"
                />
              </div>

              <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-3 text-[11px] text-emerald-400">
                Plan usage: Application {appsUsed + 1} of{" "}
                {seekerData.profile.applicationsLimit} for this month.
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setSelectedJob(null)}
                  className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold text-zinc-300 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="flex items-center gap-2 rounded-xl bg-[#5c53fe] px-5 py-2 text-xs font-bold text-white shadow-lg transition-colors hover:bg-[#6c64ff] disabled:opacity-50"
                >
                  {submitting ? "Submitting..." : "Confirm & Send"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
