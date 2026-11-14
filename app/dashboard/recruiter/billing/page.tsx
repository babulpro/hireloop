"use client";

import Link from "next/link";
import { useState } from "react";
import { recruiterData } from "../../../data/site";
import { Icon } from "../../../components/Icons";

export default function RecruiterBillingPage() {
  const [currentPlan, setCurrentPlan] = useState("Growth");
  const [payments, setPayments] = useState(recruiterData.billing.paymentHistory);
  const [activeJobsUsed] = useState(recruiterData.profile.activeJobsUsed);
  const [activeLimit, setActiveLimit] = useState(10);
  const [stripeModalOpen, setStripeModalOpen] = useState(false);
  const [targetUpgradePlan, setTargetUpgradePlan] = useState<string>("Enterprise");
  const [processing, setProcessing] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const openUpgradeModal = (planName: string) => {
    setTargetUpgradePlan(planName);
    setStripeModalOpen(true);
  };

  const handleSimulatePayment = (e: React.FormEvent) => {
    e.preventDefault();
    setProcessing(true);

    setTimeout(() => {
      setProcessing(false);
      setStripeModalOpen(false);
      setCurrentPlan(targetUpgradePlan);

      const newLimit = targetUpgradePlan === "Enterprise" ? 50 : targetUpgradePlan === "Growth" ? 10 : 3;
      setActiveLimit(newLimit);

      const price = targetUpgradePlan === "Enterprise" ? "$149.00" : "$49.00";
      const newTx = {
        id: `TX-REC-00${payments.length + 1}`,
        date: "Today",
        plan: `${targetUpgradePlan} (${price}/mo)`,
        amount: price,
        status: "Paid",
      };

      setPayments([newTx, ...payments]);
      setToastMessage(
        `Upgraded to ${targetUpgradePlan} Plan via Stripe! Active job capacity raised to ${newLimit}.`
      );
      setTimeout(() => setToastMessage(null), 4500);
    }, 1200);
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
          <h1 className="text-2xl font-bold text-white sm:text-3xl">Employer Billing &amp; Plans</h1>
          <p className="mt-1 text-xs text-zinc-400">
            Manage your company subscription, concurrent job limits, and Stripe invoices.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/pricing"
            className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold text-zinc-300 hover:text-white"
          >
            Compare Employer Tiers
          </Link>
        </div>
      </div>

      {/* Current Active Plan Overview */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="rounded-3xl border border-[#5c53fe]/50 bg-gradient-to-b from-[#181630] to-[#111118] p-6 shadow-xl lg:col-span-2">
          <div className="flex items-start justify-between">
            <div>
              <span className="rounded-md bg-[#5c53fe]/20 border border-[#5c53fe]/40 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-[#b3aefc]">
                Active Employer Tier
              </span>
              <h2 className="mt-3 text-2xl font-extrabold text-white">
                {currentPlan} Plan
              </h2>
              <p className="text-xs text-zinc-400">
                Billed monthly via Stripe • Next invoice on June 08, 2026
              </p>
            </div>

            <div className="text-right">
              <span className="text-3xl font-extrabold text-white">
                {currentPlan === "Enterprise" ? "$149" : currentPlan === "Growth" ? "$49" : "$0"}
              </span>
              <span className="text-xs text-zinc-400">/month</span>
            </div>
          </div>

          {/* Active Job Limit indicator */}
          <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-4">
            <div className="flex items-center justify-between text-xs">
              <span className="text-zinc-300 font-medium">Active Concurrent Job Slots</span>
              <span className="font-bold text-white">
                {activeJobsUsed} / {activeLimit} active posts used
              </span>
            </div>
            <div className="mt-2.5 h-2 w-full overflow-hidden rounded-full bg-white/10">
              <div
                className="h-full bg-gradient-to-r from-[#5c53fe] to-[#8b5cf6]"
                style={{ width: `${Math.min(100, (activeJobsUsed / activeLimit) * 100)}%` }}
              />
            </div>
            <p className="mt-2 text-[11px] text-zinc-400">
              {activeLimit - activeJobsUsed} active job slot(s) remaining for your company.
            </p>
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            {currentPlan !== "Enterprise" && (
              <button
                type="button"
                onClick={() => openUpgradeModal("Enterprise")}
                className="rounded-xl bg-[#5c53fe] px-5 py-2.5 text-xs font-bold text-white shadow-lg transition-colors hover:bg-[#6c64ff]"
              >
                Upgrade to Enterprise (50 active jobs • $149/mo)
              </button>
            )}

            {currentPlan !== "Free" && (
              <button
                type="button"
                onClick={() => {
                  setCurrentPlan("Free");
                  setActiveLimit(3);
                  setToastMessage("Downgraded to Free tier (3 active jobs max).");
                }}
                className="rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-xs font-semibold text-zinc-300 hover:text-white"
              >
                Downgrade to Free
              </button>
            )}
          </div>
        </div>

        {/* Corporate Stripe Billing Card */}
        <div className="rounded-3xl border border-white/10 bg-[#121218] p-6">
          <h3 className="text-base font-bold text-white">Corporate Payment</h3>
          <p className="mt-1 text-xs text-zinc-400">Stripe corporate card on file</p>

          <div className="mt-6 rounded-2xl border border-white/10 bg-gradient-to-br from-[#1a1a26] to-[#121218] p-5 shadow-inner">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-zinc-400">
                Corporate Card
              </span>
              <span className="text-xs font-extrabold text-[#5c53fe]">MASTERCARD</span>
            </div>
            <p className="mt-6 font-mono text-base tracking-widest text-white">
              •••• •••• •••• 9812
            </p>
            <div className="mt-4 flex items-center justify-between text-[11px] text-zinc-400">
              <span>TechFlow Systems Inc.</span>
              <span>Expires 08/29</span>
            </div>
          </div>

          <button
            type="button"
            onClick={() => openUpgradeModal(currentPlan === "Enterprise" ? "Growth" : "Enterprise")}
            className="mt-6 w-full rounded-xl border border-white/10 bg-white/5 py-2 text-xs font-semibold text-zinc-300 hover:text-white"
          >
            Update Payment Method
          </button>
        </div>
      </div>

      {/* Payment History Table */}
      <div className="mt-8">
        <h3 className="text-lg font-bold text-white">Invoice &amp; Transaction History</h3>
        <p className="text-xs text-zinc-400">Automated invoices processed via Stripe</p>

        <div className="mt-4 overflow-hidden rounded-3xl border border-white/10 bg-[#121218]">
          <table className="w-full text-left text-xs">
            <thead className="border-b border-white/10 bg-white/[0.02] text-[11px] font-semibold uppercase tracking-wider text-zinc-400">
              <tr>
                <th className="px-6 py-4">Transaction ID</th>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4">Plan</th>
                <th className="px-6 py-4">Amount</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Invoice</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-zinc-300">
              {payments.map((tx) => (
                <tr key={tx.id} className="transition-colors hover:bg-white/[0.02]">
                  <td className="px-6 py-4 font-mono text-zinc-400">{tx.id}</td>
                  <td className="px-6 py-4">{tx.date}</td>
                  <td className="px-6 py-4 font-semibold text-white">{tx.plan}</td>
                  <td className="px-6 py-4 font-bold text-emerald-400">{tx.amount}</td>
                  <td className="px-6 py-4">
                    <span className="rounded-md border border-emerald-500/20 bg-emerald-500/10 px-2 py-0.5 text-[10px] font-bold text-emerald-400">
                      {tx.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button
                      type="button"
                      onClick={() => alert(`Downloading Stripe receipt for ${tx.id}...`)}
                      className="rounded-lg border border-white/10 bg-white/5 px-3 py-1 text-xs text-zinc-300 hover:text-white"
                    >
                      Download PDF
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Stripe Modal */}
      {stripeModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm animate-in fade-in">
          <div className="w-full max-w-md rounded-3xl border border-white/15 bg-[#121218] p-6 shadow-2xl sm:p-8">
            <div className="flex items-center justify-between">
              <div>
                <span className="rounded-md bg-[#5c53fe]/20 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-[#b3aefc]">
                  STRIPE ENTERPRISE
                </span>
                <h3 className="mt-2 text-lg font-bold text-white">
                  Upgrade to {targetUpgradePlan} Plan
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setStripeModalOpen(false)}
                className="grid h-8 w-8 place-items-center rounded-lg border border-white/10 text-zinc-400 hover:text-white"
              >
                <Icon name="close" className="h-4 w-4" />
              </button>
            </div>

            <p className="mt-2 text-xs text-zinc-400">
              Billed today:{" "}
              <span className="font-bold text-white">
                {targetUpgradePlan === "Enterprise" ? "$149.00 / month" : "$49.00 / month"}
              </span>{" "}
              (50 active listings)
            </p>

            <form onSubmit={handleSimulatePayment} className="mt-6 space-y-4">
              <div>
                <label className="text-xs font-semibold text-zinc-300">Company Billing Entity</label>
                <input
                  type="text"
                  defaultValue="TechFlow Systems Inc."
                  className="mt-1.5 w-full rounded-xl border border-white/10 bg-white/5 p-3 text-xs text-white focus:border-[#5c53fe] focus:outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-zinc-300">Corporate Card</label>
                <div className="mt-1.5 rounded-xl border border-white/10 bg-white/5 p-3 text-xs text-white">
                  <div className="flex items-center justify-between">
                    <span className="font-mono">9812 •••• •••• 9812</span>
                    <span className="text-[11px] text-zinc-400">08/29 • 742</span>
                  </div>
                </div>
              </div>

              <div className="rounded-xl border border-white/5 bg-white/[0.02] p-3 text-[11px] text-zinc-400">
                🔒 Stripe encrypted transaction. Active job limit updates instantly upon confirmation.
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setStripeModalOpen(false)}
                  className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold text-zinc-300 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={processing}
                  className="flex items-center gap-2 rounded-xl bg-[#5c53fe] px-5 py-2.5 text-xs font-bold text-white shadow-lg transition-colors hover:bg-[#6c64ff] disabled:opacity-50"
                >
                  {processing ? "Authorizing Stripe..." : "Confirm & Raise Limit"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
