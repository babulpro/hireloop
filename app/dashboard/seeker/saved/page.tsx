"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { seekerData } from "../../../data/site";
import { Icon } from "../../../components/Icons";

export default function SeekerSavedJobsPage() {
  const [savedJobs, setSavedJobs] = useState(seekerData.savedJobsList);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Apply modal
  const [applyingJob, setApplyingJob] = useState<(typeof seekerData.savedJobsList)[0] | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const handleRemove = (id: string, title: string) => {
    setSavedJobs((prev) => prev.filter((j) => j.id !== id));
    showToast(`Removed "${title}" from saved jobs`);
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleConfirmApply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!applyingJob) return;

    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      showToast(`Application submitted for ${applyingJob.title}!`);
      setApplyingJob(null);
    }, 700);
  };

  return (
    <div className="space-y-6">
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 rounded-2xl border border-white/15 bg-[#161622] p-4 text-white shadow-2xl backdrop-blur-xl animate-in fade-in">
          <Icon name="checkCircle" className="h-5 w-5 text-emerald-400" />
          <p className="text-xs font-semibold">{toastMessage}</p>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col justify-between gap-4 border-b border-white/10 pb-6 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-bold text-white sm:text-3xl">Saved Jobs</h1>
          <p className="mt-1 text-xs text-zinc-400">
            Keep track of roles you are interested in and apply whenever you are ready.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <span className="rounded-xl border border-white/10 bg-[#121218] px-3.5 py-1.5 text-xs text-zinc-300">
            Saved: <span className="font-bold text-[#b3aefc]">{savedJobs.length}</span> / 10 limit
          </span>
          <Link
            href="/dashboard/seeker/jobs"
            className="rounded-xl bg-[#5c53fe] px-4 py-2 text-xs font-semibold text-white shadow-lg hover:bg-[#6c64ff]"
          >
            Find More Jobs
          </Link>
        </div>
      </div>

      {/* Saved Jobs Table / Cards */}
      {savedJobs.length === 0 ? (
        <div className="rounded-3xl border border-white/10 bg-[#121218] p-12 text-center">
          <Icon name="bookmark" className="mx-auto h-12 w-12 text-zinc-600" />
          <h3 className="mt-4 text-base font-bold text-white">No saved jobs yet</h3>
          <p className="mt-1 text-xs text-zinc-400">
            Explore opportunities and bookmark jobs to review or apply to later.
          </p>
          <Link
            href="/dashboard/seeker/jobs"
            className="mt-6 inline-flex rounded-xl bg-[#5c53fe] px-4 py-2 text-xs font-bold text-white hover:bg-[#6c64ff]"
          >
            Browse Opportunities
          </Link>
        </div>
      ) : (
        <div className="overflow-hidden rounded-3xl border border-white/10 bg-[#121218]">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="border-b border-white/10 bg-white/[0.02] text-[11px] font-semibold uppercase tracking-wider text-zinc-400">
                <tr>
                  <th className="px-6 py-4">Job Title &amp; Company</th>
                  <th className="px-6 py-4">Location</th>
                  <th className="px-6 py-4">Salary</th>
                  <th className="px-6 py-4">Date Saved</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-zinc-300">
                {savedJobs.map((item) => (
                  <tr key={item.id} className="transition-colors hover:bg-white/[0.02]">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-xl border border-white/10 bg-white p-1">
                          <Image
                            src={item.logo}
                            alt={item.company}
                            fill
                            className="object-contain p-0.5"
                          />
                        </div>
                        <div>
                          <Link
                            href={`/jobs/${item.id}`}
                            className="font-bold text-white transition-colors hover:text-[#b3aefc]"
                          >
                            {item.title}
                          </Link>
                          <p className="text-[11px] text-zinc-400">{item.company}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-zinc-300">{item.location}</td>
                    <td className="px-6 py-4 font-semibold text-emerald-400">{item.salary}</td>
                    <td className="px-6 py-4 text-zinc-400">{item.dateSaved}</td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          type="button"
                          onClick={() => handleRemove(item.id, item.title)}
                          className="rounded-lg border border-red-500/20 bg-red-500/10 px-3 py-1.5 text-xs font-medium text-red-400 transition-colors hover:bg-red-500/20"
                        >
                          Remove
                        </button>
                        <button
                          type="button"
                          onClick={() => setApplyingJob(item)}
                          className="rounded-lg bg-[#5c53fe] px-3.5 py-1.5 text-xs font-bold text-white shadow-md transition-colors hover:bg-[#6c64ff]"
                        >
                          Apply
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Apply Modal */}
      {applyingJob && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm animate-in fade-in">
          <div className="w-full max-w-md rounded-3xl border border-white/15 bg-[#121218] p-6 shadow-2xl sm:p-8">
            <h3 className="text-lg font-bold text-white">Apply for {applyingJob.title}</h3>
            <p className="mt-1 text-xs text-zinc-400">
              {applyingJob.company} • {applyingJob.location}
            </p>

            <form onSubmit={handleConfirmApply} className="mt-6 space-y-4">
              <div className="rounded-xl border border-white/10 bg-white/5 p-3 text-xs">
                <p className="font-semibold text-white">{seekerData.profile.name}</p>
                <p className="text-zinc-400">{seekerData.profile.email}</p>
                <p className="mt-1 text-[11px] text-zinc-400">Default PDF Resume will be sent</p>
              </div>

              <div>
                <label className="text-xs font-semibold text-zinc-300">
                  Quick Note to Hiring Manager
                </label>
                <textarea
                  rows={3}
                  placeholder="I am excited to apply for this position..."
                  className="mt-1.5 w-full rounded-xl border border-white/10 bg-white/5 p-3 text-xs text-white placeholder-zinc-500 focus:border-[#5c53fe] focus:outline-none"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setApplyingJob(null)}
                  className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold text-zinc-300 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="rounded-xl bg-[#5c53fe] px-5 py-2 text-xs font-bold text-white hover:bg-[#6c64ff]"
                >
                  {submitting ? "Sending..." : "Confirm Application"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
