"use client";

import Image from "next/image";
import Link from "next/link";
import { recruiterData } from "../../data/site";
import { Icon } from "../../components/Icons";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function RecruiterHomePage() {
  const m = recruiterData.metrics;
  const p = recruiterData.profile;
  const comp = recruiterData.companyInfo;
  const perfData = recruiterData.applicantPerformance;

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="flex flex-col justify-between gap-4 border-b border-white/10 pb-6 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-bold text-white sm:text-3xl">Recruiter Console</h1>
          <p className="mt-1 text-xs text-zinc-400">
            Monitor applicant pipelines, job post performance, and hiring velocity for{" "}
            <span className="font-semibold text-white">{comp.name}</span>.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/dashboard/recruiter/jobs/new"
            className="inline-flex items-center gap-2 rounded-xl bg-[#5c53fe] px-4 py-2 text-xs font-bold text-white shadow-lg transition-colors hover:bg-[#6c64ff]"
          >
            <Icon name="plus" className="h-3.5 w-3.5" />
            <span>Post New Job</span>
          </Link>
        </div>
      </div>

      {/* Stats Row matching Project Requirements */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <div className="rounded-2xl border border-white/10 bg-[#121218] p-5">
          <span className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
            Total Job Posts
          </span>
          <p className="mt-2 text-3xl font-extrabold text-white">{m.totalJobPosts}</p>
          <span className="mt-1 block text-[11px] text-zinc-500">Across 6 departments</span>
        </div>

        <div className="rounded-2xl border border-white/10 bg-[#121218] p-5">
          <span className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
            Total Applicants
          </span>
          <p className="mt-2 text-3xl font-extrabold text-[#9c95ff]">
            {m.totalApplicants.toLocaleString()}
          </p>
          <span className="mt-1 block text-[11px] text-emerald-400">+12% vs last month</span>
        </div>

        <div className="rounded-2xl border border-white/10 bg-[#121218] p-5">
          <span className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
            Active Jobs
          </span>
          <p className="mt-2 text-3xl font-extrabold text-emerald-400">{m.activeJobs}</p>
          <span className="mt-1 block text-[11px] text-zinc-500">
            {p.activeJobsUsed} / {p.activeJobsLimit} plan capacity used
          </span>
        </div>

        <div className="rounded-2xl border border-white/10 bg-[#121218] p-5">
          <span className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
            Jobs Closed
          </span>
          <p className="mt-2 text-3xl font-extrabold text-zinc-400">{m.jobsClosed}</p>
          <span className="mt-1 block text-[11px] text-zinc-500">Successfully fulfilled</span>
        </div>
      </div>

      {/* Two Column Layout: Company Card (Left) + Recharts Bar Chart (Right) */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        {/* Left: Company Profile Card */}
        <section className="rounded-3xl border border-white/10 bg-[#121218] p-6 sm:p-8">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-white">Company Profile</h2>
            <Link
              href="/dashboard/recruiter/company"
              className="rounded-xl border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-semibold text-zinc-300 hover:text-white"
            >
              Edit Company
            </Link>
          </div>

          <div className="mt-6 flex flex-col items-center gap-4 text-center sm:flex-row sm:items-start sm:text-left">
            <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-2xl border border-white/10 bg-white p-2 shadow-lg">
              <Image src={comp.logo} alt={comp.name} fill className="object-contain p-2" />
            </div>

            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="text-xl font-bold text-white">{comp.name}</h3>
                <span className="rounded-md border border-emerald-500/30 bg-emerald-500/10 px-2 py-0.5 text-[10px] font-bold text-emerald-400">
                  {comp.status}
                </span>
              </div>
              <p className="mt-1 text-xs text-[#b3aefc]">{comp.industry}</p>
              <p className="mt-2 text-xs text-zinc-400 leading-relaxed line-clamp-2">
                {comp.description}
              </p>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-3 border-t border-white/5 pt-4 text-xs">
            <div className="rounded-xl border border-white/5 bg-white/[0.02] p-3">
              <span className="text-[10px] uppercase font-bold text-zinc-500">Location</span>
              <p className="mt-1 font-semibold text-white">{comp.location}</p>
            </div>
            <div className="rounded-xl border border-white/5 bg-white/[0.02] p-3">
              <span className="text-[10px] uppercase font-bold text-zinc-500">Employees</span>
              <p className="mt-1 font-semibold text-white">{comp.employeeCount}</p>
            </div>
          </div>

          <div className="mt-4 flex items-center justify-between border-t border-white/5 pt-4">
            <span className="text-xs text-zinc-400">Recruiter Lead</span>
            <span className="text-xs font-bold text-white">
              {p.name} ({p.email})
            </span>
          </div>
        </section>

        {/* Right: Recharts Bar Chart of Applicant Count per Job Post */}
        <section className="flex flex-col justify-between rounded-3xl border border-white/10 bg-[#121218] p-6 sm:p-8">
          <div>
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-base font-bold text-white">Applicant Volume by Job Post</h2>
                <p className="text-xs text-zinc-400">
                  Total incoming applicants per active position (last 30 days)
                </p>
              </div>
              <span className="rounded-lg bg-white/5 px-2.5 py-1 text-[11px] font-medium text-zinc-300">
                Last 30 Days
              </span>
            </div>

            <div className="mt-6 h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={perfData} margin={{ top: 10, right: 10, left: -20, bottom: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#232332" />
                  <XAxis
                    dataKey="job"
                    stroke="#71717a"
                    tick={{ fill: "#a1a1aa", fontSize: 11 }}
                    interval={0}
                    angle={-20}
                    textAnchor="end"
                  />
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
                  <Bar dataKey="applicants" fill="#5c53fe" radius={[6, 6, 0, 0]} name="Applicants" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="border-t border-white/5 pt-4 text-right">
            <Link
              href="/dashboard/recruiter/jobs"
              className="text-xs font-semibold text-[#9c95ff] hover:text-white"
            >
              Manage all job listings →
            </Link>
          </div>
        </section>
      </div>

      {/* Recent Applications Notification List */}
      <section className="rounded-3xl border border-white/10 bg-[#121218] p-6 sm:p-8">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-white">Recent Incoming Applicants</h2>
            <p className="text-xs text-zinc-400">Latest candidate submissions across all active openings</p>
          </div>
          <Link
            href="/dashboard/jobs/senior-product-designer/applicants"
            className="text-xs font-semibold text-[#9c95ff] hover:text-white"
          >
            Review All Applicants →
          </Link>
        </div>

        <div className="mt-6 divide-y divide-white/5">
          {recruiterData.applicantsByJob["senior-product-designer"].map((cand) => (
            <div
              key={cand.id}
              className="flex flex-col justify-between gap-4 py-3.5 sm:flex-row sm:items-center"
            >
              <div className="flex items-center gap-3">
                <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-xl border border-white/10">
                  <Image src={cand.avatar} alt={cand.name} fill className="object-cover" />
                </div>
                <div>
                  <p className="text-xs font-bold text-white">{cand.name}</p>
                  <p className="text-[11px] text-zinc-400">
                    Applied for <span className="text-zinc-200">Senior Product Designer</span> • {cand.experience} exp
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-[11px] text-zinc-500">{cand.dateApplied}</span>
                <span className="rounded-md border border-indigo-500/30 bg-indigo-500/10 px-2 py-0.5 text-[10px] font-bold text-[#b3aefc]">
                  {cand.status}
                </span>
                <Link
                  href="/dashboard/jobs/senior-product-designer/applicants"
                  className="rounded-lg border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] font-medium text-zinc-300 hover:text-white"
                >
                  Review
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
