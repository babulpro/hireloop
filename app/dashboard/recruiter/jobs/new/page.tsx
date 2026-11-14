"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { recruiterData } from "../../../../data/site";
import { Icon } from "../../../../components/Icons";

export default function PostNewJobPage() {
  const router = useRouter();
  const comp = recruiterData.companyInfo;
  const p = recruiterData.profile;

  // Job Info
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Engineering");
  const [type, setType] = useState("Full-time");
  const [salaryMin, setSalaryMin] = useState("140k");
  const [salaryMax, setSalaryMax] = useState("180k");
  const [currency, setCurrency] = useState("USD ($)");
  const [location, setLocation] = useState("San Francisco, CA");
  const [isRemote, setIsRemote] = useState(false);
  const [deadline, setDeadline] = useState("2026-06-30");

  // Job Description
  const [responsibilities, setResponsibilities] = useState(
    "• Architect scalable software interfaces.\n• Collaborate with product and design leads.\n• Mentor junior engineers."
  );
  const [requirements, setRequirements] = useState(
    "• 5+ years of React / TypeScript experience.\n• Strong understanding of system design.\n• Excellent communication skills."
  );
  const [benefits, setBenefits] = useState(
    "• Health & Dental Insurance\n• 401(k) Matching\n• Flexible PTO & Remote work"
  );

  const [submitting, setSubmitting] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    setTimeout(() => {
      setSubmitting(false);
      setToastMessage("Job post published successfully! Status: Active.");
      setTimeout(() => {
        router.push("/dashboard/recruiter/jobs");
      }, 1500);
    }, 1000);
  };

  return (
    <div className="space-y-6">
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 rounded-2xl border border-emerald-500/30 bg-[#0e1f14] p-4 text-emerald-300 shadow-2xl backdrop-blur-xl animate-in fade-in">
          <Icon name="checkCircle" className="h-5 w-5 text-emerald-400" />
          <p className="text-xs font-semibold">{toastMessage}</p>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col justify-between gap-4 border-b border-white/10 pb-6 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-bold text-white sm:text-3xl">Post a New Job</h1>
          <p className="mt-1 text-xs text-zinc-400">
            Publish a role to the HireLoop marketplace and reach qualified candidates worldwide.
          </p>
        </div>

        <Link
          href="/dashboard/recruiter/jobs"
          className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold text-zinc-300 hover:text-white"
        >
          Cancel
        </Link>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Company Info Banner (Auto-filled) */}
        <section className="rounded-3xl border border-white/10 bg-[#121218] p-6">
          <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-500">
            REGISTERED HIRING ENTITY
          </span>
          <div className="mt-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-white p-1 text-black font-extrabold flex items-center justify-center text-xs">
                TF
              </div>
              <div>
                <p className="text-sm font-bold text-white">{comp.name}</p>
                <p className="text-xs text-zinc-400">
                  {comp.industry} • Status:{" "}
                  <span className="text-emerald-400 font-semibold">{comp.status}</span>
                </p>
              </div>
            </div>

            <div className="text-right text-xs">
              <span className="text-zinc-400">Active Job Limit:</span>{" "}
              <span className="font-bold text-[#b3aefc]">
                {p.activeJobsUsed} / {p.activeJobsLimit} used
              </span>
            </div>
          </div>
        </section>

        {/* Section 1: Job Info */}
        <section className="rounded-3xl border border-white/10 bg-[#121218] p-6 sm:p-8">
          <h2 className="text-base font-bold text-white">1. Job Information</h2>
          <p className="text-xs text-zinc-400">Essential title, classification, and compensation data</p>

          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label className="text-xs font-semibold text-zinc-300">Job Title</label>
              <input
                type="text"
                required
                placeholder="e.g. Senior Frontend Architect"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="mt-1.5 w-full rounded-xl border border-white/10 bg-white/5 p-3 text-xs text-white placeholder-zinc-500 focus:border-[#5c53fe] focus:outline-none"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-zinc-300">Job Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="mt-1.5 w-full rounded-xl border border-white/10 bg-[#161622] p-3 text-xs text-white focus:border-[#5c53fe] focus:outline-none"
              >
                <option value="Engineering">Engineering</option>
                <option value="Design">Design</option>
                <option value="Product">Product</option>
                <option value="Marketing">Marketing</option>
                <option value="Operations">Operations</option>
                <option value="Sales">Sales</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-semibold text-zinc-300">Job Type</label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="mt-1.5 w-full rounded-xl border border-white/10 bg-[#161622] p-3 text-xs text-white focus:border-[#5c53fe] focus:outline-none"
              >
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
                <option value="Contract">Contract</option>
                <option value="Remote">Remote</option>
                <option value="Internship">Internship</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-semibold text-zinc-300">Salary Range (Min - Max)</label>
              <div className="mt-1.5 flex items-center gap-2">
                <input
                  type="text"
                  placeholder="Min (e.g. $140k)"
                  value={salaryMin}
                  onChange={(e) => setSalaryMin(e.target.value)}
                  className="w-1/2 rounded-xl border border-white/10 bg-white/5 p-3 text-xs text-white focus:border-[#5c53fe] focus:outline-none"
                />
                <span className="text-zinc-500">–</span>
                <input
                  type="text"
                  placeholder="Max (e.g. $180k)"
                  value={salaryMax}
                  onChange={(e) => setSalaryMax(e.target.value)}
                  className="w-1/2 rounded-xl border border-white/10 bg-white/5 p-3 text-xs text-white focus:border-[#5c53fe] focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-zinc-300">Currency</label>
              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                className="mt-1.5 w-full rounded-xl border border-white/10 bg-[#161622] p-3 text-xs text-white focus:border-[#5c53fe] focus:outline-none"
              >
                <option value="USD ($)">USD ($)</option>
                <option value="EUR (€)">EUR (€)</option>
                <option value="GBP (£)">GBP (£)</option>
                <option value="BDT (৳)">BDT (৳)</option>
              </select>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold text-zinc-300">Location</label>
                <label className="flex items-center gap-1.5 text-xs text-zinc-400 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isRemote}
                    onChange={(e) => setIsRemote(e.target.checked)}
                    className="rounded border-white/20 bg-white/5 text-[#5c53fe]"
                  />
                  <span>Remote Friendly</span>
                </label>
              </div>
              <input
                type="text"
                disabled={isRemote}
                value={isRemote ? "Anywhere (100% Remote)" : location}
                onChange={(e) => setLocation(e.target.value)}
                className="mt-1.5 w-full rounded-xl border border-white/10 bg-white/5 p-3 text-xs text-white focus:border-[#5c53fe] focus:outline-none disabled:opacity-50"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-zinc-300">Application Deadline</label>
              <input
                type="date"
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
                className="mt-1.5 w-full rounded-xl border border-white/10 bg-white/5 p-3 text-xs text-white focus:border-[#5c53fe] focus:outline-none"
              />
            </div>
          </div>
        </section>

        {/* Section 2: Job Description */}
        <section className="rounded-3xl border border-white/10 bg-[#121218] p-6 sm:p-8 space-y-6">
          <div>
            <h2 className="text-base font-bold text-white">2. Job Description &amp; Scope</h2>
            <p className="text-xs text-zinc-400">Outline candidate responsibilities and technical qualifications</p>
          </div>

          <div>
            <label className="text-xs font-semibold text-zinc-300">Key Responsibilities</label>
            <textarea
              rows={4}
              required
              value={responsibilities}
              onChange={(e) => setResponsibilities(e.target.value)}
              className="mt-1.5 w-full rounded-xl border border-white/10 bg-white/5 p-3 text-xs text-white leading-relaxed focus:border-[#5c53fe] focus:outline-none"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-zinc-300">Requirements &amp; Skills</label>
            <textarea
              rows={4}
              required
              value={requirements}
              onChange={(e) => setRequirements(e.target.value)}
              className="mt-1.5 w-full rounded-xl border border-white/10 bg-white/5 p-3 text-xs text-white leading-relaxed focus:border-[#5c53fe] focus:outline-none"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-zinc-300">Company Benefits &amp; Perks (Optional)</label>
            <textarea
              rows={3}
              value={benefits}
              onChange={(e) => setBenefits(e.target.value)}
              className="mt-1.5 w-full rounded-xl border border-white/10 bg-white/5 p-3 text-xs text-white leading-relaxed focus:border-[#5c53fe] focus:outline-none"
            />
          </div>
        </section>

        <div className="flex items-center justify-end gap-3">
          <Link
            href="/dashboard/recruiter/jobs"
            className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold text-zinc-300 hover:text-white"
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={submitting}
            className="flex items-center gap-2 rounded-xl bg-[#5c53fe] px-6 py-2.5 text-xs font-bold text-white shadow-xl transition-colors hover:bg-[#6c64ff] disabled:opacity-50"
          >
            {submitting ? "Publishing Job..." : "Publish Job Listing"}
          </button>
        </div>
      </form>
    </div>
  );
}
