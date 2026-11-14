"use client";

import Link from "next/link";
import { useState } from "react";
import { jobs } from "../data/site";
import JobCard from "./JobCard";
import { SectionHeading } from "./ui";
import { Icon } from "./Icons";

const categories = ["All Roles", "Design", "Engineering", "Product"];

export default function FeaturedJobs() {
  const [selectedCategory, setSelectedCategory] = useState("All Roles");

  const filteredJobs =
    selectedCategory === "All Roles"
      ? jobs.slice(0, 6)
      : jobs.filter((j) => j.category.toLowerCase() === selectedCategory.toLowerCase()).slice(0, 6);

  return (
    <section className="relative px-4 py-20 sm:px-6 sm:py-24">
      <div className="mx-auto w-full max-w-[1320px]">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div>
            <SectionHeading
              eyebrow="Smart job discovery"
              title="The roles you'd never find by searching"
              subtitle="Curated, high-signal career opportunities at vetted technology leaders and hyper-growth teams."
              align="left"
            />

            <div className="mt-6 flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`rounded-full px-4 py-1.5 text-xs font-medium transition-colors ${
                    selectedCategory === cat
                      ? "bg-[#5c53fe] text-white shadow-[0_0_12px_rgba(92,83,254,0.4)]"
                      : "border border-white/10 bg-[#141418] text-zinc-400 hover:border-white/20 hover:text-white"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <Link
            href="/jobs"
            className="inline-flex shrink-0 items-center gap-2 rounded-xl border border-white/15 bg-white/[0.04] px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-white/10 hover:border-white/30"
          >
            <span>View all job open</span>
            <Icon name="arrowUpRight" className="h-4 w-4 text-[#9c95ff]" />
          </Link>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredJobs.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      </div>
    </section>
  );
}
