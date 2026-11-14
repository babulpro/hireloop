"use client";

import Link from "next/link";
import { useState } from "react";
import { jobs } from "../../../data/site";
import { Icon } from "../../../components/Icons";

export default function AdminJobsModerationPage() {
  const [jobsList, setJobsList] = useState(
    jobs.map((j) => ({
      ...j,
      status: "Active" as "Active" | "Closed",
    }))
  );
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const confirmDelete = () => {
    if (!deleteId) return;
    const target = jobsList.find((j) => j.id === deleteId);
    setJobsList((prev) => prev.filter((j) => j.id !== deleteId));
    setDeleteId(null);
    showToast(`Removed job listing "${target?.title}".`);
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const filteredJobs = jobsList.filter((j) => {
    const matchesSearch =
      !search ||
      j.title.toLowerCase().includes(search.toLowerCase()) ||
      j.company.toLowerCase().includes(search.toLowerCase());

    const matchesCat = selectedCategory === "All" || j.category === selectedCategory;
    const matchesStatus = selectedStatus === "All" || j.status === selectedStatus;

    return matchesSearch && matchesCat && matchesStatus;
  });

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
          <h1 className="text-2xl font-bold text-white sm:text-3xl">Manage Platform Jobs</h1>
          <p className="mt-1 text-xs text-zinc-400">
            Monitor and moderate all active job listings published across HireLoop.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <span className="rounded-xl border border-white/10 bg-[#121218] px-3.5 py-1.5 text-xs text-zinc-300">
            Total Listings: <span className="font-bold text-[#b3aefc]">{jobsList.length}</span>
          </span>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col gap-4 rounded-2xl border border-white/10 bg-[#121218] p-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="relative flex-1 lg:max-w-xs">
          <Icon
            name="search"
            className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400"
          />
          <input
            type="text"
            placeholder="Search title or company..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-xl border border-white/10 bg-white/5 py-2 pl-9 pr-4 text-xs text-white placeholder-zinc-500 focus:border-[#5c53fe] focus:outline-none"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs text-zinc-400 font-medium">Category:</span>
          {["All", "Engineering", "Design", "Product"].map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setSelectedCategory(c)}
              className={`rounded-lg px-2.5 py-1 text-xs font-medium transition-colors ${
                selectedCategory === c
                  ? "bg-[#5c53fe] text-white"
                  : "border border-white/5 bg-white/5 text-zinc-400 hover:text-white"
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-zinc-400 font-medium">Status:</span>
          {["All", "Active", "Closed"].map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => setSelectedStatus(s)}
              className={`rounded-lg px-2.5 py-1 text-xs font-medium transition-colors ${
                selectedStatus === s
                  ? "bg-[#5c53fe] text-white"
                  : "border border-white/5 bg-white/5 text-zinc-400 hover:text-white"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Jobs Moderation Table */}
      <div className="overflow-hidden rounded-3xl border border-white/10 bg-[#121218]">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="border-b border-white/10 bg-white/[0.02] text-[11px] font-semibold uppercase tracking-wider text-zinc-400">
              <tr>
                <th className="px-6 py-4">Title &amp; Company</th>
                <th className="px-6 py-4">Category</th>
                <th className="px-6 py-4">Type</th>
                <th className="px-6 py-4">Salary</th>
                <th className="px-6 py-4">Date Posted</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Moderation Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-zinc-300">
              {filteredJobs.map((j) => (
                <tr key={j.id} className="transition-colors hover:bg-white/[0.02]">
                  <td className="px-6 py-4">
                    <p className="font-bold text-white">{j.title}</p>
                    <p className="text-[11px] text-zinc-400">{j.company}</p>
                  </td>

                  <td className="px-6 py-4 text-zinc-300">{j.category}</td>

                  <td className="px-6 py-4 text-zinc-300">{j.type}</td>

                  <td className="px-6 py-4 font-semibold text-emerald-400">{j.salary}</td>

                  <td className="px-6 py-4 text-zinc-400">{j.posted}</td>

                  <td className="px-6 py-4">
                    <span className="rounded-md border border-emerald-500/30 bg-emerald-500/10 px-2 py-0.5 text-[10px] font-bold text-emerald-400">
                      {j.status}
                    </span>
                  </td>

                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/jobs/${j.id}`}
                        className="rounded-lg border border-white/10 bg-white/5 px-2.5 py-1 text-xs font-semibold text-zinc-300 transition-colors hover:bg-white/10 hover:text-white"
                      >
                        View
                      </Link>

                      <button
                        type="button"
                        onClick={() => setDeleteId(j.id)}
                        className="rounded-lg border border-red-500/20 bg-red-500/10 px-2.5 py-1 text-xs font-semibold text-red-400 transition-colors hover:bg-red-500/20"
                      >
                        Remove
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Confirmation Modal */}
      {deleteId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm animate-in fade-in">
          <div className="w-full max-w-sm rounded-3xl border border-white/15 bg-[#121218] p-6 shadow-2xl">
            <h3 className="text-base font-bold text-white">Moderate &amp; Remove Job?</h3>
            <p className="mt-2 text-xs leading-relaxed text-zinc-400">
              Removing this job post will take it down from the public search index and revoke applicant submissions.
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
                Confirm Removal
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
