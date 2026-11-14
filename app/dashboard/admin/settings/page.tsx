"use client";

import Image from "next/image";
import { useState } from "react";
import { Icon } from "../../../components/Icons";

export default function AdminSettingsPage() {
  const [name, setName] = useState("Platform Administrator");
  const [email, setEmail] = useState("admin@hireloop.io");
  const [password, setPassword] = useState("");
  const [systemAlerts, setSystemAlerts] = useState(true);
  const [stripeWebhooks, setStripeWebhooks] = useState(true);
  const [saving, setSaving] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      setToastMessage("Administrator security settings saved successfully!");
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
          <h1 className="text-2xl font-bold text-white sm:text-3xl">Admin Console Settings</h1>
          <p className="mt-1 text-xs text-zinc-400">
            Platform root credentials, global moderation hooks, and automated audit logging.
          </p>
        </div>

        <button
          type="button"
          onClick={handleSave}
          disabled={saving}
          className="rounded-xl bg-[#5c53fe] px-5 py-2 text-xs font-bold text-white shadow-lg transition-colors hover:bg-[#6c64ff] disabled:opacity-50"
        >
          {saving ? "Saving..." : "Save Settings"}
        </button>
      </div>

      <form onSubmit={handleSave} className="space-y-8">
        {/* Administrator Identity */}
        <section className="rounded-3xl border border-white/10 bg-[#121218] p-6 sm:p-8">
          <h2 className="text-base font-bold text-white">Super Admin Identity</h2>
          <p className="text-xs text-zinc-400">Root credentials for the platform moderation suite</p>

          <div className="mt-6 flex flex-col gap-6 sm:flex-row sm:items-center">
            <div className="relative h-20 w-20 overflow-hidden rounded-2xl border-2 border-red-500/40 shadow-lg">
              <Image src="/avatars/admin.jpg" alt="Admin" fill className="object-cover" />
            </div>

            <div>
              <p className="text-xs font-semibold text-white">System Avatar</p>
              <p className="text-[11px] text-zinc-400">Admin badge visible on official communications</p>
              <div className="mt-2 flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => alert("Change system avatar...")}
                  className="rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-zinc-300 hover:text-white"
                >
                  Change Avatar
                </button>
              </div>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="text-xs font-semibold text-zinc-300">Admin Display Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="mt-1.5 w-full rounded-xl border border-white/10 bg-white/5 p-3 text-xs text-white focus:border-[#5c53fe] focus:outline-none"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-zinc-300">Root Admin Email</label>
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

        {/* Global Webhooks & System Alerts */}
        <section className="rounded-3xl border border-white/10 bg-[#121218] p-6 sm:p-8 space-y-4">
          <h2 className="text-base font-bold text-white">System Notification Hooks</h2>
          <p className="text-xs text-zinc-400">Receive alerts when new companies or jobs require review</p>

          <div className="space-y-3 pt-2">
            <label className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 p-4 cursor-pointer">
              <div>
                <p className="text-xs font-bold text-white">New Company Submission Alerts</p>
                <p className="text-[11px] text-zinc-400">
                  Notify admin team immediately when a company registers and enters Pending status.
                </p>
              </div>
              <input
                type="checkbox"
                checked={systemAlerts}
                onChange={(e) => setSystemAlerts(e.target.checked)}
                className="h-4 w-4 rounded border-white/20 text-[#5c53fe]"
              />
            </label>

            <label className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 p-4 cursor-pointer">
              <div>
                <p className="text-xs font-bold text-white">Stripe Webhook Sync</p>
                <p className="text-[11px] text-zinc-400">
                  Automatically process subscription upgrade webhooks and generate platform revenue receipts.
                </p>
              </div>
              <input
                type="checkbox"
                checked={stripeWebhooks}
                onChange={(e) => setStripeWebhooks(e.target.checked)}
                className="h-4 w-4 rounded border-white/20 text-[#5c53fe]"
              />
            </label>
          </div>
        </section>

        {/* Root Security Password */}
        <section className="rounded-3xl border border-white/10 bg-[#121218] p-6 sm:p-8">
          <h2 className="text-base font-bold text-white">Admin Master Key &amp; Password</h2>
          <p className="text-xs text-zinc-400">Requires minimum 14 characters with hardware 2FA support</p>

          <div className="mt-6 max-w-sm">
            <label className="text-xs font-semibold text-zinc-300">New Master Password</label>
            <input
              type="password"
              placeholder="••••••••••••••••"
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
            {saving ? "Saving Changes..." : "Save Admin Settings"}
          </button>
        </div>
      </form>
    </div>
  );
}
