"use client";

import Link from "next/link";
import { useState } from "react";
import { pricingPlans } from "../data/site";
import { Icon } from "./Icons";
import { Badge, SectionHeading } from "./ui";

export default function PricingSection({ compact = false }: { compact?: boolean }) {
  const [yearly, setYearly] = useState(false);

  return (
    <section id="pricing" className="border-t border-white/5 px-4 py-20 sm:px-6 sm:py-24">
      <div className="mx-auto w-full max-w-[1320px]">
        {!compact && (
          <SectionHeading
            eyebrow="Pricing"
            title="Pay for the leverage, not the listings"
            subtitle="Simple plans that scale with your ambition. Cancel anytime."
          />
        )}

        <div className="mt-8 flex justify-center">
          <div className="inline-flex items-center gap-1 rounded-xl border border-white/10 bg-[#121216] p-1 text-sm">
            <button
              type="button"
              onClick={() => setYearly(false)}
              className={`rounded-lg px-4 py-2 font-medium transition-colors ${
                !yearly ? "bg-[#5c53fe] text-white" : "text-zinc-400 hover:text-white"
              }`}
            >
              Monthly
            </button>
            <button
              type="button"
              onClick={() => setYearly(true)}
              className={`inline-flex items-center gap-2 rounded-lg px-4 py-2 font-medium transition-colors ${
                yearly ? "bg-[#5c53fe] text-white" : "text-zinc-400 hover:text-white"
              }`}
            >
              Yearly
              <span className="rounded-full bg-emerald-500/15 px-1.5 py-0.5 text-[10px] font-semibold text-emerald-400">
                25%
              </span>
            </button>
          </div>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-5 lg:grid-cols-3">
          {pricingPlans.map((plan) => {
            const rawNumeric = parseInt(plan.price.replace("$", "")) || 0;
            const price = yearly && rawNumeric > 0 ? Math.round(rawNumeric * 0.75) : rawNumeric;
            return (
              <div
                key={plan.name}
                className={`relative flex flex-col rounded-2xl border p-6 sm:p-8 ${
                  plan.popular
                    ? "border-[#5c53fe]/60 bg-gradient-to-b from-[#1a1830] to-[#121216] shadow-[0_0_60px_rgba(92,83,254,0.18)]"
                    : "border-white/10 bg-[#121216]"
                }`}
              >
                {plan.popular && (
                  <span className="absolute -top-3 left-6 rounded-full bg-[#5c53fe] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-white">
                    Most popular
                  </span>
                )}

                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <span
                      className={`grid h-10 w-10 place-items-center rounded-lg border ${
                        plan.popular ? "border-[#5c53fe]/40 bg-[#5c53fe]/15 text-[#b3aefc]" : "border-white/10 bg-white/5 text-zinc-400"
                      }`}
                    >
                      <Icon name={plan.popular ? "sparkles" : plan.name === "Premium" ? "star" : "briefcase"} className="h-5 w-5" />
                    </span>
                    <h3 className="text-lg font-semibold text-white">{plan.name}</h3>
                  </div>
                  <Badge tone={plan.popular ? "purple" : "neutral"}>{plan.name === "Starter" ? "Free" : "Pro"}</Badge>
                </div>

                <div className="mt-6 flex items-end gap-1">
                  <span className="text-4xl font-semibold tracking-tight text-white">${price}</span>
                  <span className="pb-1 text-sm text-zinc-500">/month</span>
                </div>
                <p className="mt-1 text-xs text-zinc-500">
                  {yearly && rawNumeric > 0 ? `$${price * 12} billed yearly · save 25%` : plan.tagline}
                </p>

                <div className="mt-7 h-px bg-white/10" />

                <p className="mt-6 text-[13px] font-medium text-zinc-300">Start building your insights hub:</p>
                <ul className="mt-4 space-y-3">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2.5 text-[13px] text-zinc-400">
                      <span className="mt-0.5 grid h-4 w-4 shrink-0 place-items-center rounded-full bg-emerald-500/15 text-emerald-400">
                        <Icon name="check" className="h-2.5 w-2.5" strokeWidth={3} />
                      </span>
                      {feature}
                    </li>
                  ))}
                </ul>

                <Link
                  href={`/get-started?plan=${plan.name.toLowerCase()}`}
                  className={`mt-8 inline-flex items-center justify-between gap-2 rounded-lg px-5 py-3 text-sm font-medium transition-colors ${
                    plan.popular
                      ? "bg-[#5c53fe] text-white hover:bg-[#6d65ff]"
                      : "border border-white/15 text-white hover:bg-white/5"
                  }`}
                >
                  {plan.cta}
                  <Icon name="arrow" className="h-4 w-4" />
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
