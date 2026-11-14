"use client";

import Link from "next/link";
import { useState } from "react";
import { adminData } from "../../../data/site";
import { Icon } from "../../../components/Icons";

export default function AdminCompaniesPage() {
  const [companies, setCompanies] = useState(adminData.companies);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const updateStatus = (id: string, newStatus: "Approved" | "Rejected") => {
    setCompanies((prev) =>
      prev.map((c) => (c.id === id ? { ...c, status: newStatus } : c))
    );

    const target = companies.find((c) => c.id === id);
    setToastMessage(
      `Company "${target?.name}" marked as ${newStatus}. ${
        newStatus === "Approved" ? "Now publicly visible." : "Hidden from public directory."
      }`
    );
    setTimeout(() => setToastMessage(null), 4000);
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
          <h1 className="text-2xl font-bold text-white sm:text-3xl">Manage Company Approvals</h1>
          <p className="mt-1 text-xs text-zinc-400">
            Review employer registration requests, verify credentials, and approve public directory status.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/companies"
            className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold text-zinc-300 hover:text-white"
          >
            View Public Directory
          </Link>
        </div>
      </div>

      {/* Companies Verification Table */}
      <div className="overflow-hidden rounded-3xl border border-white/10 bg-[#121218]">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="border-b border-white/10 bg-white/[0.02] text-[11px] font-semibold uppercase tracking-wider text-zinc-400">
              <tr>
                <th className="px-6 py-4">Company Name</th>
                <th className="px-6 py-4">Recruiter Email</th>
                <th className="px-6 py-4">Industry</th>
                <th className="px-6 py-4">Date Submitted</th>
                <th className="px-6 py-4">Verification Status</th>
                <th className="px-6 py-4 text-right">Moderation Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-zinc-300">
              {companies.map((c) => (
                <tr key={c.id} className="transition-colors hover:bg-white/[0.02]">
                  <td className="px-6 py-4">
                    <span className="font-bold text-white">{c.name}</span>
                  </td>

                  <td className="px-6 py-4 font-mono text-zinc-400">{c.recruiterEmail}</td>

                  <td className="px-6 py-4 text-zinc-300">{c.industry}</td>

                  <td className="px-6 py-4 text-zinc-400">{c.dateSubmitted}</td>

                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center rounded-md border px-2.5 py-0.5 text-[10px] font-bold ${
                        c.status === "Approved"
                          ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-400"
                          : c.status === "Pending"
                          ? "border-amber-500/30 bg-amber-500/10 text-amber-400"
                          : "border-red-500/30 bg-red-500/10 text-red-400"
                      }`}
                    >
                      {c.status}
                    </span>
                  </td>

                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      {/* Approve button: if Pending or Rejected */}
                      {(c.status === "Pending" || c.status === "Rejected") && (
                        <button
                          type="button"
                          onClick={() => updateStatus(c.id, "Approved")}
                          className="rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-400 transition-colors hover:bg-emerald-500/20"
                        >
                          Approve
                        </button>
                      )}

                      {/* Reject button: if Pending or Approved */}
                      {(c.status === "Pending" || c.status === "Approved") && (
                        <button
                          type="button"
                          onClick={() => updateStatus(c.id, "Rejected")}
                          className="rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-1 text-xs font-semibold text-red-400 transition-colors hover:bg-red-500/20"
                        >
                          Reject
                        </button>
                      )}
                    </div>
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
