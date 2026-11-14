"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { recruiterData } from "../../../data/site";
import { Icon } from "../../../components/Icons";

export default function RecruiterCompanyPage() {
  const initialComp = recruiterData.companyInfo;

  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(initialComp.name);
  const [industry, setIndustry] = useState(initialComp.industry);
  const [website, setWebsite] = useState(initialComp.website);
  const [location, setLocation] = useState(initialComp.location);
  const [employeeCount, setEmployeeCount] = useState(initialComp.employeeCount);
  const [description, setDescription] = useState(initialComp.description);
  const [status, setStatus] = useState<"Pending" | "Approved" | "Rejected">(initialComp.status);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleSaveCompany = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("Pending");
    setIsEditing(false);
    setToastMessage(
      "Company profile updated and submitted for Admin review. Status is now Pending."
    );
    setTimeout(() => setToastMessage(null), 5000);
  };

  return (
    <div className="space-y-6">
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 rounded-2xl border border-amber-500/30 bg-[#1f1a0e] p-4 text-amber-300 shadow-2xl backdrop-blur-xl animate-in fade-in">
          <Icon name="checkCircle" className="h-5 w-5 text-amber-400" />
          <p className="text-xs font-semibold">{toastMessage}</p>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col justify-between gap-4 border-b border-white/10 pb-6 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-bold text-white sm:text-3xl">My Company Profile</h1>
          <p className="mt-1 text-xs text-zinc-400">
            Manage your company information, brand assets, and platform verification status.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setIsEditing(!isEditing)}
            className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold text-zinc-300 hover:text-white"
          >
            {isEditing ? "Cancel Editing" : "Edit Company Info"}
          </button>
          <Link
            href="/companies/techflow"
            className="rounded-xl bg-[#5c53fe] px-4 py-2 text-xs font-bold text-white shadow-lg transition-colors hover:bg-[#6c64ff]"
          >
            View Public Page
          </Link>
        </div>
      </div>

      {/* Verification Notice Banner */}
      <div
        className={`rounded-2xl border p-4 text-xs ${
          status === "Approved"
            ? "border-emerald-500/20 bg-emerald-500/5 text-emerald-300"
            : status === "Pending"
            ? "border-amber-500/20 bg-amber-500/5 text-amber-300"
            : "border-red-500/20 bg-red-500/5 text-red-300"
        }`}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-current" />
            <span className="font-bold">
              Verification Status: {status}
            </span>
          </div>
          <span className="text-[11px] opacity-80">
            {status === "Approved"
              ? "Verified company • Publicly visible across the marketplace"
              : status === "Pending"
              ? "Under Admin review • Changes will appear once approved"
              : "Registration Declined • Contact support for clarification"}
          </span>
        </div>
      </div>

      {/* Company Overview or Edit Form */}
      {isEditing ? (
        <form
          onSubmit={handleSaveCompany}
          className="space-y-6 rounded-3xl border border-white/10 bg-[#121218] p-6 sm:p-8"
        >
          <div className="border-b border-white/10 pb-4">
            <h2 className="text-base font-bold text-white">Edit Company Information</h2>
            <p className="text-xs text-zinc-400">
              Updates will change your verification status to Pending awaiting Admin re-approval.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="text-xs font-semibold text-zinc-300">Company Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="mt-1.5 w-full rounded-xl border border-white/10 bg-white/5 p-3 text-xs text-white focus:border-[#5c53fe] focus:outline-none"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-zinc-300">Industry / Category</label>
              <input
                type="text"
                value={industry}
                onChange={(e) => setIndustry(e.target.value)}
                required
                className="mt-1.5 w-full rounded-xl border border-white/10 bg-white/5 p-3 text-xs text-white focus:border-[#5c53fe] focus:outline-none"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-zinc-300">Website URL</label>
              <input
                type="url"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
                required
                className="mt-1.5 w-full rounded-xl border border-white/10 bg-white/5 p-3 text-xs text-white focus:border-[#5c53fe] focus:outline-none"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-zinc-300">Location (Headquarters)</label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                required
                className="mt-1.5 w-full rounded-xl border border-white/10 bg-white/5 p-3 text-xs text-white focus:border-[#5c53fe] focus:outline-none"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-zinc-300">Employee Count Range</label>
              <select
                value={employeeCount}
                onChange={(e) => setEmployeeCount(e.target.value)}
                className="mt-1.5 w-full rounded-xl border border-white/10 bg-[#161622] p-3 text-xs text-white focus:border-[#5c53fe] focus:outline-none"
              >
                <option value="1 – 10 Employees">1 – 10 Employees</option>
                <option value="11 – 50 Employees">11 – 50 Employees</option>
                <option value="51 – 200 Employees">51 – 200 Employees</option>
                <option value="500 – 1,000 Employees">500 – 1,000 Employees</option>
                <option value="1,000+ Employees">1,000+ Employees</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-semibold text-zinc-300">Company Logo</label>
              <div className="mt-1.5 flex items-center gap-3">
                <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-xl border border-white/10 bg-white p-1">
                  <Image src={initialComp.logo} alt={name} fill className="object-contain" />
                </div>
                <button
                  type="button"
                  onClick={() => alert("Upload new logo file...")}
                  className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-xs font-medium text-zinc-300 hover:text-white"
                >
                  Upload New Image
                </button>
              </div>
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-zinc-300">Short Description</label>
            <textarea
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              className="mt-1.5 w-full rounded-xl border border-white/10 bg-white/5 p-3 text-xs leading-relaxed text-white focus:border-[#5c53fe] focus:outline-none"
            />
          </div>

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/10">
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold text-zinc-300 hover:text-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-xl bg-[#5c53fe] px-6 py-2 text-xs font-bold text-white shadow-lg transition-colors hover:bg-[#6c64ff]"
            >
              Save &amp; Submit for Review
            </button>
          </div>
        </form>
      ) : (
        <section className="rounded-3xl border border-white/10 bg-[#121218] p-6 sm:p-8">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
            <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-2xl border border-white/10 bg-white p-2 shadow-xl">
              <Image src={initialComp.logo} alt={name} fill className="object-contain p-2" />
            </div>

            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-3">
                <h2 className="text-2xl font-extrabold text-white">{name}</h2>
                <span
                  className={`rounded-md border px-2.5 py-0.5 text-[10px] font-bold ${
                    status === "Approved"
                      ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-400"
                      : "border-amber-500/30 bg-amber-500/10 text-amber-400"
                  }`}
                >
                  {status}
                </span>
              </div>

              <p className="mt-1 text-xs text-[#b3aefc]">{industry}</p>
              <p className="mt-3 text-xs leading-relaxed text-zinc-300">{description}</p>

              <div className="mt-6 grid grid-cols-2 gap-4 border-t border-white/5 pt-4 text-xs sm:grid-cols-4">
                <div>
                  <span className="text-[10px] font-bold uppercase text-zinc-500">Website</span>
                  <p className="mt-1 truncate font-semibold text-white">
                    <a
                      href={website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:underline text-[#9c95ff]"
                    >
                      {website}
                    </a>
                  </p>
                </div>

                <div>
                  <span className="text-[10px] font-bold uppercase text-zinc-500">Location</span>
                  <p className="mt-1 font-semibold text-white">{location}</p>
                </div>

                <div>
                  <span className="text-[10px] font-bold uppercase text-zinc-500">Company Size</span>
                  <p className="mt-1 font-semibold text-white">{employeeCount}</p>
                </div>

                <div>
                  <span className="text-[10px] font-bold uppercase text-zinc-500">Active Jobs</span>
                  <p className="mt-1 font-semibold text-white">4 listings</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
