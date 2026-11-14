import Image from "next/image";
import Link from "next/link";
import type { Job } from "../data/site";
import { Icon } from "./Icons";
import { Badge } from "./ui";

export default function JobCard({ job }: { job: Job }) {
  return (
    <article className="group flex flex-col rounded-2xl border border-white/10 bg-[#121216] p-5 transition-colors hover:border-[#5c53fe]/40 sm:p-6">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className="grid h-10 w-10 shrink-0 place-items-center overflow-hidden rounded-full bg-white p-1">
            <Image src={job.logo} alt={job.company} width={36} height={36} className="h-full w-full object-contain" />
          </span>
          <div>
            <p className="text-sm font-medium text-white">{job.company}</p>
            <p className="text-[11px] text-zinc-500">{job.posted}</p>
          </div>
        </div>
        {job.hot && <Badge tone="warning">Hot job</Badge>}
        {!job.hot && <Badge tone="purple">Featured</Badge>}
      </div>

      <h3 className="mt-5 text-lg font-semibold tracking-[-0.01em] text-white">
        <Link href={`/jobs/${job.id}`} className="transition-colors group-hover:text-[#c9c5ff]">
          {job.title}
        </Link>
      </h3>
      <p className="mt-2 line-clamp-2 text-[13px] leading-relaxed text-zinc-400">{job.description}</p>

      <div className="mt-5 space-y-2.5 text-[12px] text-zinc-400">
        <p className="flex items-center gap-2">
          <Icon name="pin" className="h-4 w-4 text-zinc-500" />
          {job.location}
        </p>
        <p className="flex items-center gap-2">
          <Icon name="clock" className="h-4 w-4 text-zinc-500" />
          {job.schedule} · {job.type}
        </p>
        <p className="flex items-center gap-2">
          <Icon name="coin" className="h-4 w-4 text-zinc-500" />
          {job.salary}
        </p>
      </div>

      <div className="mt-auto flex items-center justify-between gap-3 pt-6">
        <Link
          href={`/jobs/${job.id}`}
          className="inline-flex items-center gap-1.5 text-[11px] font-medium text-zinc-500 transition-colors hover:text-white"
        >
          View details
          <Icon name="arrowUpRight" className="h-3.5 w-3.5" />
        </Link>
        <Link
          href={`/jobs/${job.id}`}
          className="inline-flex items-center gap-1.5 rounded-lg bg-[#5c53fe] px-4 py-2 text-xs font-medium text-white transition-colors hover:bg-[#6d65ff]"
        >
          Apply Now
          <Icon name="arrow" className="h-3.5 w-3.5" />
        </Link>
      </div>
    </article>
  );
}
