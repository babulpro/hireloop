"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { jobs, recruiterData } from "../../../../data/site";
import { Icon } from "../../../../components/Icons";

const statusColors: Record<string, string> = {
  Applied: "border-blue-500/30 bg-blue-500/10 text-blue-400",
  "Under Review": "border-amber-500/30 bg-amber-500/10 text-amber-400",
  Shortlisted: "border-indigo-500/30 bg-indigo-500/10 text-[#b3aefc]",
  Interviewing: "border-purple-500/30 bg-purple-500/10 text-purple-300",
  Offered: "border-emerald-500/30 bg-emerald-500/10 text-emerald-400",
  Rejected: "border-red-500/30 bg-red-500/10 text-red-400",
};

export default function ApplicantsClient({ jobId }: { jobId: string }) {
  const currentJob = jobs.find((j) => j.id === jobId) || jobs[0];
  const initialApplicants =
    recruiterData.applicantsByJob[jobId as keyof typeof recruiterData.applicantsByJob] ||
    recruiterData.applicantsByJob["senior-product-designer"];

  const [applicants, setApplicants] = useState(initialApplicants);
  const [filterStatus, setFilterStatus] = useState("All");
  const [search, setSearch] = useState("");
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleStatusChange = (applicantId: string, newStatus: string, applicantEmail: string) => {
    setApplicants((prev) =>
      prev.map((app) => (app.id === applicantId ? { ...app, status: newStatus } : app))
    );

    setToastMessage(
      `Status changed to "${newStatus}". Email update dispatched to ${applicantEmail}.`
    );
    setTimeout(() => setToastMessage(null), 4000);
  };

  const filteredApplicants = applicants.filter((app) => {
    const matchesSearch =
      !search ||
      app.name.toLowerCase().includes(search.toLowerCase()) ||
      app.email.toLowerCase().includes(search.toLowerCase());

    const matchesStatus = filterStatus === "All" || app.status === filterStatus;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 rounded-2xl border border-emerald-500/30 bg-[#0e1f14] p-4 text-emerald-300 shadow-2xl backdrop-blur-xl animate-in fade-in">
          <Icon name="checkCircle" className="h-5 w-5 text-emerald-400" />
          <p className="text-xs font-semibold">{toastMessage}</p>
        </div>
      )}

      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs text-zinc-400">
        <Link href="/dashboard/recruiter/jobs" className="hover:text-white transition-colors">
          Manage Jobs
        </Link>
        <span>/</span>
        <span className="text-zinc-200 font-medium">{currentJob.title}</span>
        <span>/</span>
        <span className="text-[#b3aefc]">Applicants</span>
      </div>

      {/* Header */}
      <div className="flex flex-col justify-between gap-4 border-b border-white/10 pb-6 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-bold text-white sm:text-3xl">
            Applicants: {currentJob.title}
          </h1>
          <p className="mt-1 text-xs text-zinc-400">
            Review submitted profiles, inspect resumes, and update recruitment pipeline stages.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <span className="rounded-xl border border-white/10 bg-[#121218] px-3.5 py-1.5 text-xs text-zinc-300">
            Total Candidates: <span className="font-bold text-[#b3aefc]">{applicants.length}</span>
          </span>
          <Link
            href="/dashboard/recruiter/jobs"
            className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold text-zinc-300 hover:text-white"
          >
            Back to Jobs
          </Link>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="flex flex-col justify-between gap-4 rounded-2xl border border-white/10 bg-[#121218] p-4 sm:flex-row sm:items-center">
        <div className="relative flex-1 sm:max-w-xs">
          <Icon
            name="search"
            className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400"
          />
          <input
            type="text"
            placeholder="Search candidates by name or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-xl border border-white/10 bg-white/5 py-2 pl-9 pr-4 text-xs text-white placeholder-zinc-500 focus:border-[#5c53fe] focus:outline-none"
          />
        </div>

        <div className="flex flex-wrap items-center gap-1.5">
          {["All", "Applied", "Under Review", "Shortlisted", "Offered", "Rejected"].map((st) => (
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

      {/* Applicants Table */}
      <div className="overflow-hidden rounded-3xl border border-white/10 bg-[#121218]">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="border-b border-white/10 bg-white/[0.02] text-[11px] font-semibold uppercase tracking-wider text-zinc-400">
              <tr>
                <th className="px-6 py-4">Applicant Name</th>
                <th className="px-6 py-4">Email Address</th>
                <th className="px-6 py-4">Date Applied</th>
                <th className="px-6 py-4">Resume</th>
                <th className="px-6 py-4">Hiring Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-zinc-300">
              {filteredApplicants.map((app) => (
                <tr key={app.id} className="transition-colors hover:bg-white/[0.02]">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="relative h-9 w-9 shrink-0 overflow-hidden rounded-xl border border-white/10">
                        <Image src={app.avatar} alt={app.name} fill className="object-cover" />
                      </div>
                      <div>
                        <p className="font-bold text-white">{app.name}</p>
                        <p className="text-[11px] text-zinc-400">{app.experience} experience</p>
                      </div>
                    </div>
                  </td>

                  <td className="px-6 py-4 font-mono text-zinc-400">{app.email}</td>

                  <td className="px-6 py-4 text-zinc-300">{app.dateApplied}</td>

                  <td className="px-6 py-4">
                    <button
                      type="button"
                      onClick={() => alert(`Opening PDF resume for ${app.name}...`)}
                      className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-2.5 py-1 text-xs font-semibold text-zinc-300 hover:text-white"
                    >
                      <Icon name="briefcase" className="h-3 w-3 text-red-400" />
                      <span>Resume.pdf</span>
                    </button>
                  </td>

                  <td className="px-6 py-4">
                    <select
                      value={app.status}
                      onChange={(e) => handleStatusChange(app.id, e.target.value, app.email)}
                      className={`rounded-lg border px-2.5 py-1.5 text-xs font-bold focus:outline-none ${
                        statusColors[app.status] || "border-white/10 bg-white/5 text-zinc-300"
                      }`}
                    >
                      <option value="Applied" className="bg-[#121218] text-blue-400">
                        Applied
                      </option>
                      <option value="Under Review" className="bg-[#121218] text-amber-400">
                        Under Review
                      </option>
                      <option value="Shortlisted" className="bg-[#121218] text-indigo-400">
                        Shortlisted
                      </option>
                      <option value="Offered" className="bg-[#121218] text-emerald-400">
                        Offered
                      </option>
                      <option value="Rejected" className="bg-[#121218] text-red-400">
                        Rejected
                      </option>
                    </select>
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
