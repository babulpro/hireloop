"use client";

import Link from "next/link";
import { useState } from "react";
import { seekerPricingPlans, recruiterPricingPlans, faqs } from "../data/site";
import { Icon } from "../components/Icons";
import { Badge, SectionHeading } from "../components/ui";
import Footer from "../components/Footer";

export default function PricingPage() {
  const [activeTab, setActiveTab] = useState<"seeker" | "recruiter">("seeker");
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const plans = activeTab === "seeker" ? seekerPricingPlans : recruiterPricingPlans;

  return (
    <div className="flex min-h-screen flex-col bg-[#07070a] text-zinc-100">
      <main className="mx-auto w-full max-w-[1320px] flex-1 px-4 py-16 sm:px-6 sm:py-20">
        <SectionHeading
          eyebrow="Pricing Plans"
          title="Transparent pricing tailored to your role"
          subtitle="Whether you're looking for your next career leap or scaling an engineering team, choose the tier built for your goals."
        />

        {/* Dual Tab Switcher: For Job Seekers vs For Recruiters */}
        <div className="mt-10 flex justify-center">
          <div className="inline-flex items-center gap-1.5 rounded-2xl border border-white/10 bg-[#121216] p-1.5 text-sm shadow-xl">
            <button
              type="button"
              onClick={() => setActiveTab("seeker")}
              className={`rounded-xl px-6 py-2.5 font-semibold transition-all ${
                activeTab === "seeker"
                  ? "bg-[#5c53fe] text-white shadow-lg"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              For Job Seekers
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("recruiter")}
              className={`rounded-xl px-6 py-2.5 font-semibold transition-all ${
                activeTab === "recruiter"
                  ? "bg-[#5c53fe] text-white shadow-lg"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              For Recruiters &amp; Employers
            </button>
          </div>
        </div>

        {/* Role Description Note */}
        <p className="mt-4 text-center text-xs text-zinc-400">
          {activeTab === "seeker"
            ? "Seekers pay for higher application allowances, salary insights, and recruiter visibility."
            : "Recruiters pay for concurrent active job listings, applicant pipeline tracking, and advanced analytics."}
        </p>

        {/* 3 Pricing Cards Grid matching exact requirements */}
        <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-3">
          {plans.map((plan) => {
            const checkoutUrl =
              plan.name === "Free"
                ? activeTab === "seeker"
                  ? "/dashboard/seeker"
                  : "/dashboard/recruiter"
                : `/checkout?role=${activeTab}&plan=${encodeURIComponent(plan.name)}`;

            return (
              <div
                key={plan.name}
                className={`relative flex flex-col justify-between rounded-3xl border p-8 transition-all ${
                  plan.popular
                    ? "border-[#5c53fe] bg-gradient-to-b from-[#1a1832] to-[#111118] shadow-[0_0_60px_rgba(92,83,254,0.25)]"
                    : "border-white/10 bg-[#121218] hover:border-white/20"
                }`}
              >
                {plan.popular && (
                  <span className="absolute -top-3 left-8 rounded-full bg-[#5c53fe] px-3.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white shadow-md">
                    Most Popular
                  </span>
                )}

                <div>
                  <div className="flex items-center justify-between gap-3">
                    <h3 className="text-xl font-bold text-white">{plan.name}</h3>
                    <Badge tone={plan.popular ? "purple" : "neutral"}>
                      {plan.name === "Free" ? "Forever Free" : "Pro Tier"}
                    </Badge>
                  </div>

                  <p className="mt-2 text-xs text-zinc-400">{plan.tagline}</p>

                  <div className="mt-6 flex items-baseline gap-1.5">
                    <span className="text-5xl font-extrabold tracking-tight text-white">
                      {plan.price}
                    </span>
                    <span className="text-sm text-zinc-500">{plan.period}</span>
                  </div>

                  <div className="my-6 h-px bg-white/10" />

                  <p className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
                    Included Capabilities:
                  </p>

                  <ul className="mt-4 space-y-3">
                    {plan.features.map((feat) => (
                      <li key={feat} className="flex items-start gap-3 text-xs text-zinc-300">
                        <span className="mt-0.5 grid h-4 w-4 shrink-0 place-items-center rounded-full bg-emerald-500/20 text-emerald-400">
                          <Icon name="check" className="h-2.5 w-2.5" />
                        </span>
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-8 pt-4">
                  <Link
                    href={checkoutUrl}
                    className={`inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl text-xs font-bold transition-all ${
                      plan.popular
                        ? "bg-[#5c53fe] text-white shadow-[0_0_20px_rgba(92,83,254,0.4)] hover:bg-[#6e66ff]"
                        : "border border-white/15 bg-white/5 text-white hover:bg-white/10"
                    }`}
                  >
                    <span>{plan.cta}</span>
                    <Icon name="arrow" className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* FAQs Section */}
        <section className="mt-24 border-t border-white/10 pt-16">
          <SectionHeading
            eyebrow="Questions &amp; Answers"
            title="Frequently asked questions"
            subtitle="Everything you need to know about HireLoop plans, prorated billing, and job posting limits."
          />

          <div className="mx-auto mt-10 max-w-3xl space-y-4">
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={faq.q}
                  className="rounded-2xl border border-white/10 bg-[#121218] p-5 transition-colors"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="flex w-full items-center justify-between text-left text-sm font-semibold text-white"
                  >
                    <span>{faq.q}</span>
                    <Icon
                      name="chevronDown"
                      className={`h-4 w-4 text-zinc-400 transition-transform ${
                        isOpen ? "rotate-180 text-white" : ""
                      }`}
                    />
                  </button>
                  {isOpen && <p className="mt-3 text-xs leading-relaxed text-zinc-400">{faq.a}</p>}
                </div>
              );
            })}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
