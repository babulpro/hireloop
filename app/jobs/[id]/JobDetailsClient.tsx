"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { jobs, companies } from "../../data/site";
import { Icon } from "../../components/Icons";
import Footer from "../../components/Footer";

export default function JobDetailsClient({ jobId }: { jobId: string }) {
  const job = jobs.find((j) => j.id === jobId) || jobs[0];
  const company = companies.find((c) => c.id === job.companyId) || companies[0];
  const similarJobs = jobs.filter((j) => j.id !== job.id).slice(0, 3);

  const [saved, setSaved] = useState(false);
  const [applyModalOpen, setApplyModalOpen] = useState(false);
  const [applied, setApplied] = useState(false);
  const [formData, setFormData] = useState({
    name: "Alex Rivera",
    email: "alex.rivera@example.com",
    portfolio: "https://alexrivera.design",
    coverNote: "I have 6 years of experience leading product design systems...",
    fileName: "Alex_Rivera_Resume_2026.pdf",
  });

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();
    setApplied(true);
    setTimeout(() => {
      setApplyModalOpen(false);
    }, 2000);
  };

  return (
    <div className="flex min-h-screen flex-col bg-[#07070a] text-zinc-100">
      {/* Breadcrumb Bar */}
      <div className="border-b border-white/10 bg-[#0c0c10] px-4 py-4 sm:px-6">
        <div className="mx-auto flex max-w-[1320px] items-center gap-2 text-xs text-zinc-400">
          <Link href="/jobs" className="transition-colors hover:text-white">
            Browse Jobs
          </Link>
          <span>/</span>
          <span className="text-zinc-200">{job.title}</span>
        </div>
      </div>

      <main className="mx-auto w-full max-w-[1320px] flex-1 px-4 py-8 sm:px-6">
        {/* Header Hero Card matching Figma frame */}
        <section className="rounded-3xl border border-white/10 bg-gradient-to-b from-[#13131c] to-[#0e0e14] p-6 shadow-xl sm:p-10">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-center">
            <div className="flex items-start gap-5">
              <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-2xl border border-white/10 bg-white p-2 sm:h-20 sm:w-20">
                <Image
                  src={job.logo}
                  alt={job.company}
                  width={64}
                  height={64}
                  className="h-full w-full object-contain"
                />
              </div>

              <div>
                <div className="flex flex-wrap items-center gap-3">
                  <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl lg:text-4xl">
                    {job.title}
                  </h1>
                </div>

                <div className="mt-2 flex flex-wrap items-center gap-2 text-sm text-zinc-400">
                  <span className="font-semibold text-white">{job.company}</span>
                  <span className="text-zinc-600">•</span>
                  <span className="inline-flex items-center gap-1 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2 py-0.5 text-xs font-medium text-emerald-400">
                    <Icon name="check" className="h-3 w-3" />
                    Verified Employer
                  </span>
                  <span className="text-zinc-600">•</span>
                  <span>Posted {job.posted}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setSaved((v) => !v)}
                className={`grid h-12 w-12 place-items-center rounded-xl border transition-colors ${
                  saved
                    ? "border-[#5c53fe] bg-[#5c53fe]/20 text-[#b3aefc]"
                    : "border-white/10 bg-white/5 text-zinc-400 hover:text-white"
                }`}
                title={saved ? "Saved" : "Save Job"}
              >
                <Icon name="bookmark" className="h-5 w-5" />
              </button>

              <button
                type="button"
                onClick={() => setApplyModalOpen(true)}
                className="inline-flex h-12 items-center gap-2 rounded-xl bg-[#5c53fe] px-7 text-sm font-semibold text-white shadow-[0_0_24px_rgba(92,83,254,0.4)] transition-all hover:bg-[#6c64ff]"
              >
                <span>Apply Now</span>
                <Icon name="arrowUpRight" className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Quick Meta Grid matching Figma */}
          <div className="mt-8 grid grid-cols-2 gap-4 border-t border-white/10 pt-6 sm:grid-cols-4">
            <div className="rounded-xl border border-white/5 bg-white/[0.02] p-4">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-zinc-500">
                SALARY RANGE
              </span>
              <p className="mt-1 text-base font-semibold text-emerald-400">{job.salary}</p>
            </div>

            <div className="rounded-xl border border-white/5 bg-white/[0.02] p-4">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-zinc-500">
                LOCATION
              </span>
              <p className="mt-1 text-base font-semibold text-white">{job.location}</p>
            </div>

            <div className="rounded-xl border border-white/5 bg-white/[0.02] p-4">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-zinc-500">
                JOB TYPE
              </span>
              <p className="mt-1 text-base font-semibold text-white">{job.type}</p>
            </div>

            <div className="rounded-xl border border-white/5 bg-white/[0.02] p-4">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-zinc-500">
                EXPERIENCE
              </span>
              <p className="mt-1 text-base font-semibold text-white">{job.experience}</p>
            </div>
          </div>
        </section>

        {/* Two Column Layout: Details + Company Sidebar */}
        <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-[1fr_360px]">
          {/* Main Details Column */}
          <div className="space-y-10">
            {/* Description */}
            <section className="rounded-2xl border border-white/10 bg-[#121218] p-6 sm:p-8">
              <h2 className="text-xl font-bold text-white">Job Description</h2>
              <p className="mt-4 leading-relaxed text-zinc-300">{job.description}</p>
            </section>

            {/* Responsibilities */}
            <section className="rounded-2xl border border-white/10 bg-[#121218] p-6 sm:p-8">
              <h2 className="text-xl font-bold text-white">Responsibilities</h2>
              <ul className="mt-4 space-y-3">
                {job.responsibilities.map((resp, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-zinc-300">
                    <span className="mt-1 grid h-4 w-4 shrink-0 place-items-center rounded-full bg-[#5c53fe]/20 text-[#b3aefc]">
                      <Icon name="check" className="h-2.5 w-2.5" />
                    </span>
                    <span>{resp}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Requirements & Skills matching Figma */}
            <section className="rounded-2xl border border-white/10 bg-[#121218] p-6 sm:p-8">
              <h2 className="text-xl font-bold text-white">Requirements &amp; Skills</h2>

              {/* Skills Tags */}
              <div className="mt-4 flex flex-wrap gap-2">
                {job.skills.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-lg border border-[#5c53fe]/30 bg-[#5c53fe]/10 px-3 py-1.5 text-xs font-semibold text-[#b3aefc]"
                  >
                    {skill}
                  </span>
                ))}
              </div>

              <ul className="mt-6 space-y-3">
                {job.requirements.map((req, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-zinc-300">
                    <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-zinc-500" />
                    <span>{req}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Benefits */}
            <section className="rounded-2xl border border-white/10 bg-[#121218] p-6 sm:p-8">
              <h2 className="text-xl font-bold text-white">Benefits &amp; Perks</h2>
              <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
                {job.benefits.map((benefit, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 rounded-xl border border-white/5 bg-white/[0.02] p-3 text-sm text-zinc-200"
                  >
                    <span className="grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-emerald-500/10 text-emerald-400">
                      <Icon name="checkCircle" className="h-4 w-4" />
                    </span>
                    <span>{benefit}</span>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Right Sidebar: Company Info + Similar Jobs */}
          <aside className="space-y-8">
            {/* Company Overview Card */}
            <div className="rounded-2xl border border-white/10 bg-[#121218] p-6">
              <h3 className="text-base font-bold text-white">Company Overview</h3>

              <div className="mt-5 flex items-center gap-4">
                <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-xl border border-white/10 bg-white p-1">
                  <Image
                    src={company.logo}
                    alt={company.name}
                    width={48}
                    height={48}
                    className="h-full w-full object-contain"
                  />
                </div>
                <div>
                  <h4 className="font-semibold text-white">{company.name}</h4>
                  <p className="text-xs text-zinc-400">{company.location}</p>
                </div>
              </div>

              <p className="mt-4 text-xs leading-relaxed text-zinc-400">{company.about}</p>

              <div className="mt-5 space-y-3 border-t border-white/10 pt-4 text-xs">
                <div className="flex justify-between">
                  <span className="text-zinc-500">SIZE</span>
                  <span className="font-medium text-zinc-200">{company.size}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-500">INDUSTRY</span>
                  <span className="font-medium text-zinc-200">{company.industry}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-500">ACTIVE JOBS</span>
                  <span className="font-semibold text-[#9c95ff]">
                    {company.activeJobs} Openings
                  </span>
                </div>
              </div>

              <div className="mt-6 flex flex-col gap-2">
                <Link
                  href={`https://${company.website}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/5 py-2.5 text-xs font-semibold text-zinc-200 transition-colors hover:bg-white/10 hover:text-white"
                >
                  <span>Visit Website</span>
                  <Icon name="arrowUpRight" className="h-3.5 w-3.5" />
                </Link>

                <Link
                  href={`/companies`}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#5c53fe]/10 py-2.5 text-xs font-semibold text-[#b3aefc] transition-colors hover:bg-[#5c53fe]/20"
                >
                  <span>View Company Profile</span>
                </Link>
              </div>
            </div>

            {/* Similar Jobs */}
            <div className="rounded-2xl border border-white/10 bg-[#121218] p-6">
              <h3 className="text-base font-bold text-white">Similar Positions</h3>
              <div className="mt-4 space-y-4">
                {similarJobs.map((simJob) => (
                  <Link
                    key={simJob.id}
                    href={`/jobs/${simJob.id}`}
                    className="group block rounded-xl border border-white/5 bg-white/[0.02] p-3 transition-colors hover:border-[#5c53fe]/40 hover:bg-white/[0.04]"
                  >
                    <div className="flex items-center gap-3">
                      <div className="relative h-9 w-9 shrink-0 overflow-hidden rounded-lg bg-white p-1">
                        <Image
                          src={simJob.logo}
                          alt={simJob.company}
                          width={32}
                          height={32}
                          className="h-full w-full object-contain"
                        />
                      </div>
                      <div className="min-w-0 flex-1">
                        <h4 className="truncate text-xs font-semibold text-white group-hover:text-[#b3aefc]">
                          {simJob.title}
                        </h4>
                        <p className="text-[11px] text-zinc-400">{simJob.company}</p>
                      </div>
                    </div>
                    <div className="mt-2 flex items-center justify-between text-[11px] text-zinc-500">
                      <span>{simJob.salary}</span>
                      <span>{simJob.type}</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </main>

      {/* Interactive Apply Modal */}
      {applyModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm">
          <div className="relative w-full max-w-lg rounded-3xl border border-white/10 bg-[#14141c] p-6 shadow-2xl sm:p-8">
            <button
              type="button"
              onClick={() => setApplyModalOpen(false)}
              className="absolute right-5 top-5 grid h-8 w-8 place-items-center rounded-lg border border-white/10 text-zinc-400 hover:text-white"
            >
              <Icon name="close" className="h-4 w-4" />
            </button>

            {applied ? (
              <div className="py-8 text-center">
                <span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-emerald-500/20 text-emerald-400">
                  <Icon name="checkCircle" className="h-8 w-8" />
                </span>
                <h3 className="mt-4 text-xl font-bold text-white">Application Submitted!</h3>
                <p className="mt-2 text-xs text-zinc-400">
                  Your application for <span className="text-white">{job.title}</span> at{" "}
                  <span className="text-white">{job.company}</span> has been received. You can track
                  its progress on your Seeker Dashboard.
                </p>
                <div className="mt-6 flex justify-center gap-3">
                  <Link
                    href="/seeker/applications"
                    className="rounded-xl bg-[#5c53fe] px-5 py-2.5 text-xs font-semibold text-white shadow-lg"
                  >
                    View in Applications
                  </Link>
                </div>
              </div>
            ) : (
              <form onSubmit={handleApply}>
                <div className="flex items-center gap-3">
                  <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-xl bg-white p-1">
                    <Image
                      src={job.logo}
                      alt={job.company}
                      width={36}
                      height={36}
                      className="h-full w-full object-contain"
                    />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">Apply for {job.title}</h3>
                    <p className="text-xs text-zinc-400">{job.company}</p>
                  </div>
                </div>

                <div className="mt-6 space-y-4">
                  <div>
                    <label className="text-xs font-medium text-zinc-300">Full Name</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="mt-1 w-full rounded-xl border border-white/10 bg-[#0e0e14] px-3.5 py-2.5 text-xs text-white focus:border-[#5c53fe] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-medium text-zinc-300">Email Address</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="mt-1 w-full rounded-xl border border-white/10 bg-[#0e0e14] px-3.5 py-2.5 text-xs text-white focus:border-[#5c53fe] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-medium text-zinc-300">
                      Portfolio / LinkedIn URL
                    </label>
                    <input
                      type="url"
                      value={formData.portfolio}
                      onChange={(e) => setFormData({ ...formData, portfolio: e.target.value })}
                      className="mt-1 w-full rounded-xl border border-white/10 bg-[#0e0e14] px-3.5 py-2.5 text-xs text-white focus:border-[#5c53fe] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-medium text-zinc-300">Resume / CV File</label>
                    <div className="mt-1 flex items-center justify-between rounded-xl border border-dashed border-white/20 bg-white/[0.02] p-3 text-xs">
                      <div className="flex items-center gap-2 text-zinc-300">
                        <Icon name="resume" className="h-4 w-4 text-[#9c95ff]" />
                        <span>{formData.fileName}</span>
                      </div>
                      <span className="rounded bg-[#5c53fe]/20 px-2 py-0.5 text-[10px] font-medium text-[#b3aefc]">
                        Attached
                      </span>
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-medium text-zinc-300">
                      Short Note / Pitch
                    </label>
                    <textarea
                      rows={3}
                      value={formData.coverNote}
                      onChange={(e) => setFormData({ ...formData, coverNote: e.target.value })}
                      className="mt-1 w-full rounded-xl border border-white/10 bg-[#0e0e14] px-3.5 py-2.5 text-xs text-white focus:border-[#5c53fe] focus:outline-none"
                    />
                  </div>
                </div>

                <div className="mt-6 flex items-center justify-end gap-3 border-t border-white/10 pt-4">
                  <button
                    type="button"
                    onClick={() => setApplyModalOpen(false)}
                    className="rounded-xl border border-white/10 px-4 py-2 text-xs font-medium text-zinc-400 hover:text-white"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 rounded-xl bg-[#5c53fe] px-5 py-2 text-xs font-semibold text-white shadow-lg hover:bg-[#6c64ff]"
                  >
                    <span>Send Application</span>
                    <Icon name="arrow" className="h-3.5 w-3.5" />
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
