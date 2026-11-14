import { Suspense } from "react";
import ApplicantsClient from "./ApplicantsClient";
import { jobs } from "../../../../data/site";

export function generateStaticParams() {
  return jobs.map((job) => ({
    jobId: job.id,
  }));
}

export default async function JobApplicantsPage({
  params,
}: {
  params: Promise<{ jobId: string }>;
}) {
  const resolvedParams = await params;

  return (
    <Suspense fallback={<div className="p-8 text-xs text-zinc-400">Loading applicants...</div>}>
      <ApplicantsClient jobId={resolvedParams.jobId} />
    </Suspense>
  );
}
