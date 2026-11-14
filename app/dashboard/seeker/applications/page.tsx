"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { seekerData } from "../../../data/site";
import { Icon } from "../../../components/Icons";

const statusBadges: Record<string, string> = {
  Applied: "border-blue-500/30 bg-blue-500/10 text-blue-400",
  "Under Review": "border-amber-500/30 bg-amber-500/10 text-amber-400",
  Shortlisted: "border-indigo-500/30 bg-indigo-500/10 text-[#b3aefc]",
  Interviewing: "border-purple-500/30 bg-purple-500/10 text-purple-300",
  Offered: "border-emerald-500/30 bg-emerald-500/10 text-emerald-400",
  Rejected: "border-red-500/30 bg-red-500/10 text-red-400",
};

export default function SeekerApplicationsPage() {
  const [filterStatus, setFilterStatus] = useState("All");
  const [search, setSearch] = useState("");

  const applications = seekerData.applicationsList;

  const filteredApps = applications.filter((app) => {
    const matchesSearch =
      !search ||
      app.jobTitle.toLowerCase().includes(search.toLowerCase()) ||
      app.company.toLowerCase().includes(search.toLowerCase());

    const matchesStatus =
      filterStatus === "All" || app.status === filterStatus;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col justify-between gap-4 border-b border-white/10 pb-6 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-bold text-white sm:text-3xl">My Applications</h1>
          <p className="mt-1 text-xs text-zinc-400">
            Real-time tracking of your submitted applications and hiring stages.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/dashboard/seeker/jobs"
            className="rounded-xl bg-[#5c53fe] px-4 py-2 text-xs font-semibold text-white shadow-lg hover:bg-[#6c64ff]"
          >
            Apply to New Roles
          </Link>
        </div>
      </div>

      {/* 4 Quick Pipeline Metrics */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <div className="rounded-2xl border border-white/10 bg-[#121218] p-5">
          <span className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
            Total Submitted
          </span>
          <p className="mt-2 text-3xl font-extrabold text-white">24</p>
          <span className="mt-1 block text-[11px] text-zinc-500">Across 18 tech companies</span>
        </div>

        <div className="rounded-2xl border border-white/10 bg-[#121218] p-5">
          <span className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
            Under Review
          </span>
          <p className="mt-2 text-3xl font-extrabold text-amber-400">6</p>
          <span className="mt-1 block text-[11px] text-zinc-500">Hiring managers reviewing</span>
        </div>

        <div className="rounded-2xl border border-white/10 bg-[#121218] p-5">
          <span className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
            Shortlisted
          </span>
          <p className="mt-2 text-3xl font-extrabold text-[#b3aefc]">5</p>
          <span className="mt-1 block text-[11px] text-zinc-500">Technical round scheduled</span>
        </div>

        <div className="rounded-2xl border border-white/10 bg-[#121218] p-5">
          <span className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
            Offers
          </span>
          <p className="mt-2 text-3xl font-extrabold text-emerald-400">1</p>
          <span className="mt-1 block text-[11px] text-zinc-500">Awaiting candidate signature</span>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-col justify-between gap-4 rounded-2xl border border-white/10 bg-[#121218] p-4 sm:flex-row sm:items-center">
        <div className="relative flex-1 sm:max-w-xs">
          <Icon
            name="search"
            className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400"
          />
          <input
            type="text"
            placeholder="Search by job title or company..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-xl border border-white/10 bg-white/5 py-2 pl-9 pr-4 text-xs text-white placeholder-zinc-500 focus:border-[#5c53fe] focus:outline-none"
          />
        </div>

        <div className="flex flex-wrap items-center gap-1.5">
          {["All", "Under Review", "Shortlisted", "Applied", "Offered"].map((st) => (
            <button
              key={st}
              type="button"
              onClick={() => setFilterStatus(st)}
              className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
                filterStatus === st
                  ? "bg-[#5c53fe] text-white"
                  : "border border-white/5 bg-white/5 text-zinc-400 hover:text-white"
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Applications Table */}
      <div className="overflow-hidden rounded-3xl border border-white/10 bg-[#121218]">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="border-b border-white/10 bg-white/[0.02] text-[11px] font-semibold uppercase tracking-wider text-zinc-400">
              <tr>
                <th className="px-6 py-4">Job Title</th>
                <th className="px-6 py-4">Company</th>
                <th className="px-6 py-4">Date Applied</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-zinc-300">
              {filteredApps.map((app) => (
                <tr key={app.id} className="transition-colors hover:bg-white/[0.02]">
                  <td className="px-6 py-4">
                    <span className="font-bold text-white">{app.jobTitle}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2.5">
                      <div className="relative h-6 w-6 shrink-0 overflow-hidden rounded-md border border-white/10 bg-white p-0.5">
                        <Image
                          src={app.logo}
                          alt={app.company}
                          fill
                          className="object-contain"
                        />
                      </div>
                      <span className="text-zinc-300">{app.company}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="font-medium text-white">{app.dateApplied}</span>
                    <span className="block text-[11px] text-zinc-500">
                      ({app.absoluteDate})
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center rounded-md border px-2.5 py-1 text-[11px] font-bold ${
                        statusBadges[app.status] || "border-white/10 bg-white/5 text-zinc-300"
                      }`}
                    >
                      {app.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <Link
                      href={`/jobs/${app.jobId}`}
                      className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-semibold text-zinc-300 transition-colors hover:border-[#5c53fe] hover:bg-[#5c53fe]/10 hover:text-white"
                    >
                      <span>View Details</span>
                      <Icon name="arrowUpRight" className="h-3 w-3 text-zinc-400" />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
