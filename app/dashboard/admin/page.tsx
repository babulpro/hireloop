"use client";

import Link from "next/link";
import { adminData } from "../../data/site";
import { Icon } from "../../components/Icons";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function AdminHomePage() {
  const m = adminData.metrics;

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="flex flex-col justify-between gap-4 border-b border-white/10 pb-6 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-bold text-white sm:text-3xl">Admin Overview</h1>
          <p className="mt-1 text-xs text-zinc-400">
            Real-time platform performance, user registrations, revenue, and ecosystem moderation.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/dashboard/admin/companies"
            className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold text-zinc-300 hover:text-white"
          >
            Review Companies
          </Link>
          <Link
            href="/dashboard/admin/jobs"
            className="rounded-xl bg-[#5c53fe] px-4 py-2 text-xs font-bold text-white shadow-lg transition-colors hover:bg-[#6c64ff]"
          >
            Moderate Jobs
          </Link>
        </div>
      </div>

      {/* Stats Row matching Project Requirements:
          Total Users, Total Recruiters, Total Companies, Total Jobs Posted, Platform Revenue */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-5">
        <div className="rounded-2xl border border-white/10 bg-[#121218] p-5">
          <span className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
            Total Users
          </span>
          <p className="mt-2 text-2xl font-extrabold text-white">{m.totalUsers}</p>
          <span className="mt-1 block text-[11px] text-emerald-400">+14% this month</span>
        </div>

        <div className="rounded-2xl border border-white/10 bg-[#121218] p-5">
          <span className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
            Total Recruiters
          </span>
          <p className="mt-2 text-2xl font-extrabold text-[#9c95ff]">{m.totalRecruiters}</p>
          <span className="mt-1 block text-[11px] text-emerald-400">+8% active hiring</span>
        </div>

        <div className="rounded-2xl border border-white/10 bg-[#121218] p-5">
          <span className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
            Total Companies
          </span>
          <p className="mt-2 text-2xl font-extrabold text-white">{m.totalCompanies}</p>
          <span className="mt-1 block text-[11px] text-zinc-500">4,120 approved</span>
        </div>

        <div className="rounded-2xl border border-white/10 bg-[#121218] p-5">
          <span className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
            Jobs Posted
          </span>
          <p className="mt-2 text-2xl font-extrabold text-white">{m.totalJobsPosted}</p>
          <span className="mt-1 block text-[11px] text-emerald-400">+340 this week</span>
        </div>

        <div className="col-span-2 rounded-2xl border border-white/10 bg-[#121218] p-5 lg:col-span-1">
          <span className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
            Platform Revenue
          </span>
          <p className="mt-2 text-2xl font-extrabold text-emerald-400">{m.platformRevenue}</p>
          <span className="mt-1 block text-[11px] text-zinc-500">Stripe net volume</span>
        </div>
      </div>

      {/* Two Column Layout: Recharts Bar Chart (Jobs by Category) + Line Chart (User Growth) */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        {/* Recharts Bar Chart: Job Posts per Category */}
        <section className="rounded-3xl border border-white/10 bg-[#121218] p-6 sm:p-8">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-white">Job Posts by Category</h2>
              <p className="text-xs text-zinc-400">
                Distribution of active job postings across industry sectors
              </p>
            </div>
            <span className="rounded-lg bg-white/5 px-2.5 py-1 text-[11px] text-zinc-400">
              Live Distribution
            </span>
          </div>

          <div className="mt-6 h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={adminData.jobsByCategory} margin={{ top: 10, right: 10, left: -20, bottom: 10 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#232332" />
                <XAxis dataKey="category" stroke="#71717a" tick={{ fill: "#a1a1aa", fontSize: 11 }} />
                <YAxis stroke="#71717a" tick={{ fill: "#a1a1aa", fontSize: 11 }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#161622",
                    borderColor: "#2e2e42",
                    borderRadius: "12px",
                    color: "#fff",
                    fontSize: "12px",
                  }}
                />
                <Bar dataKey="count" fill="#5c53fe" radius={[6, 6, 0, 0]} name="Active Jobs" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </section>

        {/* Recharts Line Chart: New User Registrations (30 Days) */}
        <section className="rounded-3xl border border-white/10 bg-[#121218] p-6 sm:p-8">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-white">User Growth Trend</h2>
              <p className="text-xs text-zinc-400">
                Daily candidate and recruiter signups over the last 30 days
              </p>
            </div>
            <span className="rounded-lg bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 text-[11px] font-bold text-emerald-400">
              +620 / day
            </span>
          </div>

          <div className="mt-6 h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={adminData.userGrowthTrend} margin={{ top: 10, right: 10, left: -20, bottom: 10 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#232332" />
                <XAxis dataKey="day" stroke="#71717a" tick={{ fill: "#a1a1aa", fontSize: 11 }} />
                <YAxis stroke="#71717a" tick={{ fill: "#a1a1aa", fontSize: 11 }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#161622",
                    borderColor: "#2e2e42",
                    borderRadius: "12px",
                    color: "#fff",
                    fontSize: "12px",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="users"
                  stroke="#10b981"
                  strokeWidth={3}
                  dot={{ fill: "#10b981", r: 4 }}
                  name="New Users"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </section>
      </div>

      {/* Recent Payments Notification-Style List */}
      <section className="rounded-3xl border border-white/10 bg-[#121218] p-6 sm:p-8">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-white">Recent Subscription Transactions</h2>
            <p className="text-xs text-zinc-400">
              Latest incoming Stripe charges from candidates and enterprise recruiters
            </p>
          </div>

          <Link
            href="/dashboard/admin/payments"
            className="text-xs font-semibold text-[#9c95ff] hover:text-white"
          >
            View All Payments →
          </Link>
        </div>

        <div className="mt-6 divide-y divide-white/5">
          {adminData.recentPayments.map((p) => (
            <div
              key={p.id}
              className="flex flex-col justify-between gap-3 py-3.5 sm:flex-row sm:items-center text-xs"
            >
              <div className="flex items-center gap-3">
                <span className="grid h-8 w-8 place-items-center rounded-xl bg-emerald-500/10 text-emerald-400">
                  <Icon name="creditCard" className="h-4 w-4" />
                </span>
                <div>
                  <p className="font-semibold text-white">{p.userEmail}</p>
                  <p className="text-zinc-400">{p.plan}</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <span className="font-bold text-emerald-400">{p.amount}</span>
                <span className="text-[11px] text-zinc-500">{p.time}</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
