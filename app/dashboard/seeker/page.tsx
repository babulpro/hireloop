"use client";

import Image from "next/image";
import Link from "next/link";
import { seekerData } from "../../data/site";
import { Icon } from "../../components/Icons";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";

export default function SeekerDashboardHome() {
  const p = seekerData.profile;
  const m = seekerData.metrics;

  return (
    <div className="space-y-8">
      {/* Top Banner / Welcome */}
      <div className="flex flex-col justify-between gap-4 border-b border-white/10 pb-6 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-bold text-white sm:text-3xl">Seeker Dashboard</h1>
          <p className="mt-1 text-xs text-zinc-400">
            Track applications, monitor your hiring pipeline, and explore matched positions.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/dashboard/seeker/jobs"
            className="inline-flex items-center gap-2 rounded-xl bg-[#5c53fe] px-4 py-2 text-xs font-semibold text-white shadow-lg hover:bg-[#6c64ff]"
          >
            <Icon name="search" className="h-3.5 w-3.5" />
            <span>Search &amp; Apply</span>
          </Link>
        </div>
      </div>

      {/* Stats Row matching requirement */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <div className="rounded-2xl border border-white/10 bg-[#121218] p-5">
          <span className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
            Saved Jobs
          </span>
          <p className="mt-2 text-3xl font-extrabold text-white">{m.savedJobs}</p>
          <span className="mt-1 block text-[11px] text-zinc-500">Bookmarked opportunities</span>
        </div>

        <div className="rounded-2xl border border-white/10 bg-[#121218] p-5">
          <span className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
            Applications Submitted
          </span>
          <p className="mt-2 text-3xl font-extrabold text-[#9c95ff]">{m.applicationsSubmitted}</p>
          <span className="mt-1 block text-[11px] text-emerald-400">
            {p.applicationsUsedThisMonth} / {p.applicationsLimit} used this month
          </span>
        </div>

        <div className="rounded-2xl border border-white/10 bg-[#121218] p-5">
          <span className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
            Interviews Scheduled
          </span>
          <p className="mt-2 text-3xl font-extrabold text-amber-400">{m.interviewsScheduled}</p>
          <span className="mt-1 block text-[11px] text-zinc-500">Live technical rounds</span>
        </div>

        <div className="rounded-2xl border border-white/10 bg-[#121218] p-5">
          <span className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
            Offers Received
          </span>
          <p className="mt-2 text-3xl font-extrabold text-emerald-400">{m.offersReceived}</p>
          <span className="mt-1 block text-[11px] text-zinc-500">1 offer pending decision</span>
        </div>
      </div>

      {/* Two Column Layout: User Profile Card (Left) + Recharts Status Distribution (Right) */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        {/* Profile Card */}
        <section className="rounded-3xl border border-white/10 bg-[#121218] p-6 sm:p-8">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-white">Seeker Profile</h2>
            <Link
              href="/dashboard/seeker/settings"
              className="rounded-xl border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-semibold text-zinc-300 hover:text-white"
            >
              Edit Profile
            </Link>
          </div>

          <div className="mt-6 flex flex-col items-center gap-4 text-center sm:flex-row sm:items-start sm:text-left">
            <div className="relative h-20 w-20 overflow-hidden rounded-2xl border-2 border-[#5c53fe]/40 shadow-xl">
              <Image src={p.avatar} alt={p.name} fill className="object-cover" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">{p.name}</h3>
              <p className="text-xs text-[#9c95ff]">{p.headline}</p>
              <p className="mt-1 text-xs text-zinc-400">{p.email}</p>
              <p className="text-xs text-zinc-500">{p.location}</p>
            </div>
          </div>

          <p className="mt-5 text-xs leading-relaxed text-zinc-300">{p.bio}</p>

          <div className="mt-6 border-t border-white/5 pt-4">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-zinc-400">
              Verified Skills:
            </span>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {p.skills.map((skill) => (
                <span
                  key={skill}
                  className="rounded-lg border border-[#5c53fe]/20 bg-[#5c53fe]/10 px-2.5 py-1 text-xs text-[#b3aefc]"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Recharts Pie Chart of Application Status Distribution */}
        <section className="rounded-3xl border border-white/10 bg-[#121218] p-6 sm:p-8 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <h2 className="text-base font-bold text-white">Application Pipeline Status</h2>
              <span className="rounded-full bg-white/5 px-2.5 py-0.5 text-[10px] text-zinc-400">
                Live Distribution
              </span>
            </div>
            <p className="text-xs text-zinc-400">Current progress of your 24 active submissions</p>
          </div>

          <div className="h-64 w-full py-2">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={seekerData.statusDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {seekerData.statusDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} stroke="rgba(0,0,0,0.5)" />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#16161e",
                    borderColor: "rgba(255,255,255,0.1)",
                    borderRadius: 12,
                    fontSize: 12,
                  }}
                />
                <Legend
                  wrapperStyle={{ fontSize: 11, paddingTop: 10 }}
                  formatter={(val) => <span className="text-zinc-300">{val}</span>}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="border-t border-white/5 pt-3 text-right">
            <Link
              href="/dashboard/seeker/applications"
              className="text-xs font-semibold text-[#9c95ff] hover:text-white"
            >
              View detailed application tracker →
            </Link>
          </div>
        </section>
      </div>

      {/* Recent Activity List matching requirement */}
      <section className="rounded-3xl border border-white/10 bg-[#121218] p-6 sm:p-8">
        <h2 className="text-base font-bold text-white">Recent Activity &amp; Alerts</h2>
        <p className="text-xs text-zinc-400">Notification-style feed of application milestones</p>

        <div className="mt-6 space-y-3">
          {seekerData.recentActivity.map((act) => (
            <div
              key={act.id}
              className="flex items-start justify-between gap-3 rounded-2xl border border-white/5 bg-white/[0.02] p-4 text-xs"
            >
              <div className="flex items-start gap-3">
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-[#5c53fe]/15 text-[#b3aefc]">
                  <Icon
                    name={
                      act.type === "interview"
                        ? "calendar"
                        : act.type === "status"
                        ? "checkCircle"
                        : "sparkles"
                    }
                    className="h-4 w-4"
                  />
                </span>
                <div>
                  <p className="font-semibold text-white">{act.title}</p>
                  <p className="text-zinc-400">
                    {act.role} at <span className="text-zinc-200">{act.company}</span>
                  </p>
                </div>
              </div>
              <span className="whitespace-nowrap text-[11px] text-zinc-500">{act.time}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
