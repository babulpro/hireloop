import { Suspense } from "react";
import JobDetailsClient from "./JobDetailsClient";
import { jobs } from "../../data/site";

export function generateStaticParams() {
  return jobs.map((job) => ({
    id: job.id,
  }));
}

export default async function JobPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolved = await params;
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#07070a]" />}>
      <JobDetailsClient jobId={resolved.id} />
    </Suspense>
  );
}
