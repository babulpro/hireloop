"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { recruiterData } from "../../../data/site";
import { Icon } from "../../../components/Icons";

export default function RecruiterSettingsPage() {
  const p = recruiterData.profile;
  const comp = recruiterData.companyInfo;

  const [name, setName] = useState(p.name);
  const [email, setEmail] = useState(p.email);
  const [password, setPassword] = useState("");
  const [saving, setSaving] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      setToastMessage("Recruiter profile updated successfully!");
      setTimeout(() => setToastMessage(null), 3500);
    }, 600);
  };

  return (
    <div className="space-y-6">
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 rounded-2xl border border-emerald-500/30 bg-[#0e1f14] p-4 text-emerald-300 shadow-2xl backdrop-blur-xl animate-in fade-in">
          <Icon name="checkCircle" className="h-5 w-5 text-emerald-400" />
          <p className="text-xs font-semibold">{toastMessage}</p>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col justify-between gap-4 border-b border-white/10 pb-6 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-bold text-white sm:text-3xl">Recruiter Settings</h1>
          <p className="mt-1 text-xs text-zinc-400">
            Manage your personal profile, credentials, and linked enterprise company.
          </p>
        </div>

        <button
          type="button"
          onClick={handleSave}
          disabled={saving}
          className="rounded-xl bg-[#5c53fe] px-5 py-2 text-xs font-bold text-white shadow-lg transition-colors hover:bg-[#6c64ff] disabled:opacity-50"
        >
          {saving ? "Saving..." : "Save Changes"}
        </button>
      </div>

      <form onSubmit={handleSave} className="space-y-8">
        {/* Profile Card */}
        <section className="rounded-3xl border border-white/10 bg-[#121218] p-6 sm:p-8">
          <h2 className="text-base font-bold text-white">Personal Information</h2>
          <p className="text-xs text-zinc-400">
            Your name and email are displayed on verified job posts when messaging candidates.
          </p>

          <div className="mt-6 flex flex-col gap-6 sm:flex-row sm:items-center">
            <div className="relative h-20 w-20 overflow-hidden rounded-2xl border-2 border-[#5c53fe]/40 shadow-lg">
              <Image src={p.avatar} alt={p.name} fill className="object-cover" />
            </div>

            <div>
              <p className="text-xs font-semibold text-white">Recruiter Avatar</p>
              <p className="text-[11px] text-zinc-400">JPG, PNG or GIF. Max 5MB.</p>
              <div className="mt-2.5 flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => alert("Upload custom avatar dialog...")}
                  className="rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-zinc-300 hover:text-white"
                >
                  Change Photo
                </button>
              </div>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="text-xs font-semibold text-zinc-300">Full Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="mt-1.5 w-full rounded-xl border border-white/10 bg-white/5 p-3 text-xs text-white focus:border-[#5c53fe] focus:outline-none"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-zinc-300">Corporate Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="mt-1.5 w-full rounded-xl border border-white/10 bg-white/5 p-3 text-xs text-white focus:border-[#5c53fe] focus:outline-none"
              />
            </div>
          </div>
        </section>

        {/* Linked Company Section */}
        <section className="rounded-3xl border border-white/10 bg-[#121218] p-6 sm:p-8">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-white">Linked Employer Entity</h2>
              <p className="text-xs text-zinc-400">
                You are registered as the primary hiring recruiter for this company.
              </p>
            </div>

            <Link
              href="/dashboard/recruiter/company"
              className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold text-zinc-300 hover:text-white"
            >
              Manage Company Details →
            </Link>
          </div>

          <div className="mt-6 flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-4">
            <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-xl border border-white/10 bg-white p-1">
              <Image src={comp.logo} alt={comp.name} fill className="object-contain" />
            </div>
            <div>
              <h3 className="font-bold text-white">{comp.name}</h3>
              <p className="text-xs text-zinc-400">
                {comp.industry} • {comp.location} • Status:{" "}
                <span className="font-semibold text-emerald-400">{comp.status}</span>
              </p>
            </div>
          </div>
        </section>

        {/* Password & Security */}
        <section className="rounded-3xl border border-white/10 bg-[#121218] p-6 sm:p-8">
          <h2 className="text-base font-bold text-white">Password &amp; Security</h2>
          <p className="text-xs text-zinc-400">Update your access password and session authorization.</p>

          <div className="mt-6 max-w-sm">
            <label className="text-xs font-semibold text-zinc-300">New Password</label>
            <input
              type="password"
              placeholder="••••••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1.5 w-full rounded-xl border border-white/10 bg-white/5 p-3 text-xs text-white focus:border-[#5c53fe] focus:outline-none"
            />
          </div>
        </section>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={saving}
            className="rounded-xl bg-[#5c53fe] px-6 py-2.5 text-xs font-bold text-white shadow-xl transition-colors hover:bg-[#6c64ff] disabled:opacity-50"
          >
            {saving ? "Saving Changes..." : "Save All Changes"}
          </button>
        </div>
      </form>
    </div>
  );
}
