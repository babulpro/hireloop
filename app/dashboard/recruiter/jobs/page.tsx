"use client";

import Link from "next/link";
import { useState } from "react";
import { recruiterData } from "../../../data/site";
import { Icon } from "../../../components/Icons";

export default function RecruiterJobsPage() {
  const [jobsList, setJobsList] = useState(recruiterData.postedJobs);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const activeJobsCount = jobsList.filter((j) => j.status === "Active").length;
  const activeLimit = recruiterData.profile.activeJobsLimit;
  const isLimitReached = activeJobsCount >= activeLimit;

  const toggleJobStatus = (id: string) => {
    setJobsList((prev) =>
      prev.map((job) => {
        if (job.id === id) {
          const nextStatus = job.status === "Active" ? "Closed" : "Active";
          showToast(`Job "${job.title}" marked as ${nextStatus}.`);
          return { ...job, status: nextStatus as "Active" | "Closed" };
        }
        return job;
      })
    );
  };

  const confirmDelete = () => {
    if (!deleteId) return;
    const target = jobsList.find((j) => j.id === deleteId);
    setJobsList((prev) => prev.filter((j) => j.id !== deleteId));
    setDeleteId(null);
    showToast(`Deleted job listing "${target?.title}".`);
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
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
          <h1 className="text-2xl font-bold text-white sm:text-3xl">Manage Job Listings</h1>
          <p className="mt-1 text-xs text-zinc-400">
            Publish, edit, and monitor live roles and candidate application pipelines.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/dashboard/recruiter/jobs/new"
            aria-disabled={isLimitReached}
            className={`inline-flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-bold text-white shadow-lg transition-colors ${
              isLimitReached
                ? "cursor-not-allowed bg-zinc-700 opacity-60"
                : "bg-[#5c53fe] hover:bg-[#6c64ff]"
            }`}
          >
            <Icon name="plus" className="h-3.5 w-3.5" />
            <span>Post New Job</span>
          </Link>
        </div>
      </div>

      {/* Plan Usage Indicator */}
      <div className="flex flex-col justify-between gap-3 rounded-2xl border border-white/10 bg-[#121218] p-4 sm:flex-row sm:items-center">
        <div>
          <span className="text-xs font-semibold text-zinc-300">Active Job Limit:</span>
          <span className="ml-2 text-xs font-bold text-[#b3aefc]">
            {activeJobsCount} / {activeLimit} active jobs used
          </span>
          <p className="mt-0.5 text-[11px] text-zinc-400">
            {recruiterData.profile.tier} • Allows up to {activeLimit} active concurrent job posts.
          </p>
        </div>

        <Link
          href="/dashboard/recruiter/billing"
          className="rounded-xl border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-semibold text-zinc-300 hover:text-white"
        >
          Upgrade Capacity
        </Link>
      </div>

      {/* Manage Jobs Table */}
      <div className="overflow-hidden rounded-3xl border border-white/10 bg-[#121218]">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="border-b border-white/10 bg-white/[0.02] text-[11px] font-semibold uppercase tracking-wider text-zinc-400">
              <tr>
                <th className="px-6 py-4">Job Title &amp; Category</th>
                <th className="px-6 py-4">Type</th>
                <th className="px-6 py-4">Salary</th>
                <th className="px-6 py-4">Applicants</th>
                <th className="px-6 py-4">Date Posted</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-zinc-300">
              {jobsList.map((job) => (
                <tr key={job.id} className="transition-colors hover:bg-white/[0.02]">
                  <td className="px-6 py-4">
                    <p className="font-bold text-white">{job.title}</p>
                    <span className="text-[11px] text-zinc-400">{job.category}</span>
                  </td>
                  <td className="px-6 py-4 text-zinc-300">{job.type}</td>
                  <td className="px-6 py-4 font-semibold text-emerald-400">{job.salary}</td>
                  <td className="px-6 py-4">
                    <Link
                      href={`/dashboard/jobs/${job.id}/applicants`}
                      className="font-bold text-[#b3aefc] hover:underline"
                    >
                      {job.applicantsCount} applicants
                    </Link>
                  </td>
                  <td className="px-6 py-4 text-zinc-400">{job.datePosted}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center rounded-md border px-2.5 py-0.5 text-[10px] font-bold ${
                        job.status === "Active"
                          ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-400"
                          : "border-zinc-500/30 bg-zinc-500/10 text-zinc-400"
                      }`}
                    >
                      {job.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/dashboard/jobs/${job.id}/applicants`}
                        className="rounded-lg border border-white/10 bg-white/5 px-2.5 py-1 text-xs font-medium text-zinc-300 hover:text-white"
                      >
                        Applicants
                      </Link>

                      <button
                        type="button"
                        onClick={() => toggleJobStatus(job.id)}
                        className="rounded-lg border border-white/10 bg-white/5 px-2.5 py-1 text-xs font-medium text-zinc-300 hover:text-white"
                      >
                        {job.status === "Active" ? "Close" : "Reopen"}
                      </button>

                      <button
                        type="button"
                        onClick={() => setDeleteId(job.id)}
                        className="rounded-lg border border-red-500/20 bg-red-500/10 px-2.5 py-1 text-xs font-medium text-red-400 hover:bg-red-500/20"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {deleteId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm animate-in fade-in">
          <div className="w-full max-w-sm rounded-3xl border border-white/15 bg-[#121218] p-6 shadow-2xl">
            <h3 className="text-base font-bold text-white">Delete Job Posting?</h3>
            <p className="mt-2 text-xs leading-relaxed text-zinc-400">
              Are you sure you want to permanently delete this job listing? All incoming applicant records tied to this post will be archived.
            </p>

            <div className="mt-6 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setDeleteId(null)}
                className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold text-zinc-300 hover:text-white"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={confirmDelete}
                className="rounded-xl bg-red-500 px-4 py-2 text-xs font-bold text-white hover:bg-red-600"
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
