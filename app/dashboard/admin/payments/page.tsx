"use client";

import { useState } from "react";
import { adminData } from "../../../data/site";
import { Icon } from "../../../components/Icons";

export default function AdminPaymentsPage() {
  const [payments] = useState(adminData.paymentsList);
  const [search, setSearch] = useState("");

  const filteredPayments = payments.filter(
    (p) =>
      p.userEmail.toLowerCase().includes(search.toLowerCase()) ||
      p.plan.toLowerCase().includes(search.toLowerCase()) ||
      p.id.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col justify-between gap-4 border-b border-white/10 pb-6 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-bold text-white sm:text-3xl">Payment &amp; Subscriptions</h1>
          <p className="mt-1 text-xs text-zinc-400">
            Platform-wide transaction history, MRR tracking, and Stripe subscription telemetry.
          </p>
        </div>

        <button
          type="button"
          onClick={() => alert("Downloading all payment CSV records...")}
          className="inline-flex items-center gap-2 rounded-xl bg-[#5c53fe] px-4 py-2 text-xs font-bold text-white shadow-lg hover:bg-[#6c64ff]"
        >
          <Icon name="download" className="h-3.5 w-3.5" />
          <span>Export Ledger</span>
        </button>
      </div>

      {/* 4 Summary Cards at the Top matching Project Requirements:
          Total Revenue, Monthly Revenue, Active Seeker Subscriptions, Active Recruiter Subscriptions */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <div className="rounded-2xl border border-white/10 bg-[#121218] p-5">
          <span className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
            Total Revenue
          </span>
          <p className="mt-2 text-3xl font-extrabold text-white">$245,800</p>
          <span className="mt-1 block text-[11px] text-emerald-400">+18% year-to-date</span>
        </div>

        <div className="rounded-2xl border border-white/10 bg-[#121218] p-5">
          <span className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
            Monthly Revenue
          </span>
          <p className="mt-2 text-3xl font-extrabold text-emerald-400">$42,100</p>
          <span className="mt-1 block text-[11px] text-zinc-500">Net recurring MRR</span>
        </div>

        <div className="rounded-2xl border border-white/10 bg-[#121218] p-5">
          <span className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
            Active Seeker Subscriptions
          </span>
          <p className="mt-2 text-3xl font-extrabold text-[#9c95ff]">3,840</p>
          <span className="mt-1 block text-[11px] text-zinc-500">Pro &amp; Premium seekers</span>
        </div>

        <div className="rounded-2xl border border-white/10 bg-[#121218] p-5">
          <span className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
            Active Recruiter Subscriptions
          </span>
          <p className="mt-2 text-3xl font-extrabold text-amber-400">1,210</p>
          <span className="mt-1 block text-[11px] text-zinc-500">Growth &amp; Enterprise teams</span>
        </div>
      </div>

      {/* Search and Table */}
      <div className="space-y-4">
        <div className="flex flex-col justify-between gap-4 rounded-2xl border border-white/10 bg-[#121218] p-4 sm:flex-row sm:items-center">
          <div className="relative flex-1 sm:max-w-xs">
            <Icon
              name="search"
              className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400"
            />
            <input
              type="text"
              placeholder="Search by email, plan, or TX ID..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-xl border border-white/10 bg-white/5 py-2 pl-9 pr-4 text-xs text-white placeholder-zinc-500 focus:border-[#5c53fe] focus:outline-none"
            />
          </div>

          <span className="text-xs text-zinc-400 font-medium">
            Showing {filteredPayments.length} recorded payments
          </span>
        </div>

        {/* Payments Table */}
        <div className="overflow-hidden rounded-3xl border border-white/10 bg-[#121218]">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="border-b border-white/10 bg-white/[0.02] text-[11px] font-semibold uppercase tracking-wider text-zinc-400">
                <tr>
                  <th className="px-6 py-4">Transaction ID</th>
                  <th className="px-6 py-4">User Email</th>
                  <th className="px-6 py-4">Subscription Plan</th>
                  <th className="px-6 py-4">Amount</th>
                  <th className="px-6 py-4">Date (Absolute &amp; Relative)</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-right">Receipt</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-zinc-300">
                {filteredPayments.map((p) => (
                  <tr key={p.id} className="transition-colors hover:bg-white/[0.02]">
                    <td className="px-6 py-4 font-mono text-zinc-400">{p.id}</td>

                    <td className="px-6 py-4 font-medium text-white">{p.userEmail}</td>

                    <td className="px-6 py-4 font-semibold text-[#b3aefc]">{p.plan}</td>

                    <td className="px-6 py-4 font-bold text-emerald-400">{p.amount}</td>

                    <td className="px-6 py-4 text-zinc-300">{p.dateFormatted}</td>

                    <td className="px-6 py-4">
                      <span
                        className={`rounded-md border px-2.5 py-0.5 text-[10px] font-bold ${
                          p.status === "Paid"
                            ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-400"
                            : "border-red-500/30 bg-red-500/10 text-red-400"
                        }`}
                      >
                        {p.status}
                      </span>
                    </td>

                    <td className="px-6 py-4 text-right">
                      <button
                        type="button"
                        onClick={() => alert(`Downloading Stripe receipt for ${p.id}...`)}
                        className="rounded-lg border border-white/10 bg-white/5 px-2.5 py-1 text-xs text-zinc-300 hover:text-white"
                      >
                        Receipt
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
