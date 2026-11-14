"use client";

import Image from "next/image";
import { useState } from "react";
import { seekerData } from "../../../data/site";
import { Icon } from "../../../components/Icons";

export default function SeekerSettingsPage() {
  const p = seekerData.profile;

  const [name, setName] = useState(p.name);
  const [email, setEmail] = useState(p.email);
  const [headline, setHeadline] = useState(p.headline);
  const [location, setLocation] = useState(p.location);
  const [bio, setBio] = useState(p.bio);
  const [skills, setSkills] = useState(p.skills);
  const [newSkill, setNewSkill] = useState("");
  const [resumeName, setResumeName] = useState("Alex_Rivera_Product_Design_Resume_2026.pdf");
  const [resumeUploadedDate, setResumeUploadedDate] = useState("Updated 2 days ago");
  const [password, setPassword] = useState("");
  const [saving, setSaving] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const addSkill = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSkill.trim() || skills.includes(newSkill.trim())) return;
    setSkills([...skills, newSkill.trim()]);
    setNewSkill("");
  };

  const removeSkill = (s: string) => {
    setSkills(skills.filter((item) => item !== s));
  };

  const handleResumeUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setResumeName(file.name);
      setResumeUploadedDate("Just now");
      showToast(`Uploaded ${file.name} successfully!`);
    }
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      showToast("Profile and candidate settings updated successfully!");
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
          <h1 className="text-2xl font-bold text-white sm:text-3xl">Seeker Settings</h1>
          <p className="mt-1 text-xs text-zinc-400">
            Customize your candidate profile, resume credentials, and security preferences.
          </p>
        </div>

        <button
          type="button"
          onClick={handleSave}
          disabled={saving}
          className="rounded-xl bg-[#5c53fe] px-5 py-2 text-xs font-bold text-white shadow-lg transition-colors hover:bg-[#6c64ff] disabled:opacity-50"
        >
          {saving ? "Saving Changes..." : "Save Profile"}
        </button>
      </div>

      <form onSubmit={handleSave} className="space-y-8">
        {/* Personal Profile & Avatar */}
        <section className="rounded-3xl border border-white/10 bg-[#121218] p-6 sm:p-8">
          <h2 className="text-base font-bold text-white">Personal Information</h2>
          <p className="text-xs text-zinc-400">
            This information is visible to hiring managers when you submit applications.
          </p>

          <div className="mt-6 flex flex-col gap-6 sm:flex-row sm:items-center">
            <div className="relative h-20 w-20 overflow-hidden rounded-2xl border-2 border-[#5c53fe]/40 shadow-lg">
              <Image src={p.avatar} alt={p.name} fill className="object-cover" />
            </div>

            <div>
              <p className="text-xs font-semibold text-white">Profile Photo</p>
              <p className="text-[11px] text-zinc-400">JPG, PNG or GIF. Max 5MB.</p>
              <div className="mt-2.5 flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => alert("Upload custom avatar dialog")}
                  className="rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-zinc-300 hover:text-white"
                >
                  Change Avatar
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
                className="mt-1.5 w-full rounded-xl border border-white/10 bg-white/5 p-3 text-xs text-white focus:border-[#5c53fe] focus:outline-none"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-zinc-300">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1.5 w-full rounded-xl border border-white/10 bg-white/5 p-3 text-xs text-white focus:border-[#5c53fe] focus:outline-none"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-zinc-300">Professional Headline</label>
              <input
                type="text"
                value={headline}
                onChange={(e) => setHeadline(e.target.value)}
                className="mt-1.5 w-full rounded-xl border border-white/10 bg-white/5 p-3 text-xs text-white focus:border-[#5c53fe] focus:outline-none"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-zinc-300">Location</label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="mt-1.5 w-full rounded-xl border border-white/10 bg-white/5 p-3 text-xs text-white focus:border-[#5c53fe] focus:outline-none"
              />
            </div>
          </div>

          <div className="mt-4">
            <label className="text-xs font-semibold text-zinc-300">Candidate Bio</label>
            <textarea
              rows={4}
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className="mt-1.5 w-full rounded-xl border border-white/10 bg-white/5 p-3 text-xs leading-relaxed text-white focus:border-[#5c53fe] focus:outline-none"
            />
          </div>
        </section>

        {/* PDF Resume Section */}
        <section className="rounded-3xl border border-white/10 bg-[#121218] p-6 sm:p-8">
          <h2 className="text-base font-bold text-white">Default Resume (PDF)</h2>
          <p className="text-xs text-zinc-400">
            Automatically attached when applying to verified platform job posts.
          </p>

          <div className="mt-6 flex flex-col justify-between gap-4 rounded-2xl border border-white/10 bg-white/5 p-4 sm:flex-row sm:items-center">
            <div className="flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-red-500/10 text-red-400">
                <Icon name="briefcase" className="h-5 w-5" />
              </span>
              <div>
                <p className="font-semibold text-white text-xs">{resumeName}</p>
                <p className="text-[11px] text-zinc-400">{resumeUploadedDate} • 2.4 MB PDF</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => alert(`Downloading preview of ${resumeName}...`)}
                className="rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-zinc-300 hover:text-white"
              >
                Preview PDF
              </button>

              <label className="cursor-pointer rounded-lg bg-[#5c53fe] px-3.5 py-1.5 text-xs font-bold text-white shadow-md hover:bg-[#6c64ff]">
                <span>Upload New PDF</span>
                <input
                  type="file"
                  accept=".pdf"
                  onChange={handleResumeUpload}
                  className="hidden"
                />
              </label>
            </div>
          </div>
        </section>

        {/* Skills Tag Editor */}
        <section className="rounded-3xl border border-white/10 bg-[#121218] p-6 sm:p-8">
          <h2 className="text-base font-bold text-white">Skills &amp; Competencies</h2>
          <p className="text-xs text-zinc-400">
            Used by our AI algorithm to match you with top recruiter listings.
          </p>

          <div className="mt-6 flex flex-wrap gap-2">
            {skills.map((skill) => (
              <span
                key={skill}
                className="inline-flex items-center gap-1.5 rounded-lg border border-[#5c53fe]/30 bg-[#5c53fe]/10 px-3 py-1 text-xs font-semibold text-[#b3aefc]"
              >
                <span>{skill}</span>
                <button
                  type="button"
                  onClick={() => removeSkill(skill)}
                  className="text-zinc-400 hover:text-white"
                >
                  <Icon name="close" className="h-3 w-3" />
                </button>
              </span>
            ))}
          </div>

          <div className="mt-4 flex max-w-sm items-center gap-2">
            <input
              type="text"
              placeholder="Add skill (e.g. Tailwind, Figma)..."
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
              className="flex-1 rounded-xl border border-white/10 bg-white/5 p-2.5 text-xs text-white focus:border-[#5c53fe] focus:outline-none"
            />
            <button
              type="button"
              onClick={addSkill}
              className="rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-xs font-semibold text-zinc-300 hover:text-white"
            >
              Add
            </button>
          </div>
        </section>

        {/* Security & Password */}
        <section className="rounded-3xl border border-white/10 bg-[#121218] p-6 sm:p-8">
          <h2 className="text-base font-bold text-white">Security &amp; Password</h2>
          <p className="text-xs text-zinc-400">Manage account access and credentials.</p>

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
