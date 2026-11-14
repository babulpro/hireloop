import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { companies, jobs } from "../../data/site";
import { Icon } from "../../components/Icons";
import Footer from "../../components/Footer";

export function generateStaticParams() {
  return companies.map((c) => ({
    id: c.id,
  }));
}

export default async function CompanyProfilePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolved = await params;
  const company = companies.find((c) => c.id === resolved.id);

  if (!company) {
    notFound();
  }

  const companyJobs = jobs.filter(
    (j) => j.companyId === company.id || j.company.toLowerCase() === company.name.toLowerCase()
  );

  return (
    <div className="flex min-h-screen flex-col bg-[#07070a] text-zinc-100">
      {/* Breadcrumbs */}
      <div className="border-b border-white/10 bg-[#0c0c10] px-4 py-4 sm:px-6">
        <div className="mx-auto flex max-w-[1320px] items-center gap-2 text-xs text-zinc-400">
          <Link href="/companies" className="hover:text-white transition-colors">
            Companies
          </Link>
          <span>/</span>
          <span className="text-zinc-200">{company.name}</span>
        </div>
      </div>

      <main className="mx-auto w-full max-w-[1320px] flex-1 px-4 py-10 sm:px-6">
        {/* Company Header Card */}
        <section className="rounded-3xl border border-white/10 bg-gradient-to-b from-[#14141e] to-[#0e0e14] p-6 shadow-xl sm:p-10">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-center">
            <div className="flex items-start gap-5">
              <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-2xl border border-white/10 bg-white p-2 sm:h-20 sm:w-20">
                <Image
                  src={company.logo}
                  alt={company.name}
                  width={64}
                  height={64}
                  className="h-full w-full object-contain"
                />
              </div>

              <div>
                <div className="flex flex-wrap items-center gap-3">
                  <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl lg:text-4xl">
                    {company.name}
                  </h1>
                  {company.verified && (
                    <span className="inline-flex items-center gap-1 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2.5 py-0.5 text-xs font-semibold text-emerald-400">
                      <Icon name="check" className="h-3 w-3" />
                      Verified Employer
                    </span>
                  )}
                </div>

                <p className="mt-2 text-sm text-zinc-400">
                  <span>{company.industry}</span>
                  <span className="mx-2 text-zinc-600">•</span>
                  <span>{company.location}</span>
                  <span className="mx-2 text-zinc-600">•</span>
                  <span>{company.size}</span>
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Link
                href={`https://${company.website}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-5 py-2.5 text-xs font-semibold text-zinc-200 transition-colors hover:bg-white/10 hover:text-white"
              >
                <span>Visit Website</span>
                <Icon name="arrowUpRight" className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>

          <div className="mt-8 grid grid-cols-2 gap-4 border-t border-white/10 pt-6 sm:grid-cols-4 text-xs">
            <div>
              <span className="text-zinc-500 font-semibold uppercase tracking-wider">EMPLOYEES</span>
              <p className="mt-1 text-sm font-semibold text-white">{company.employees}</p>
            </div>
            <div>
              <span className="text-zinc-500 font-semibold uppercase tracking-wider">GLOBAL PRESENCE</span>
              <p className="mt-1 text-sm font-semibold text-white">{company.presence}</p>
            </div>
            <div>
              <span className="text-zinc-500 font-semibold uppercase tracking-wider">ACTIVE OPENINGS</span>
              <p className="mt-1 text-sm font-semibold text-emerald-400">{company.activeJobs} Jobs</p>
            </div>
            <div>
              <span className="text-zinc-500 font-semibold uppercase tracking-wider">HEADQUARTERS</span>
              <p className="mt-1 text-sm font-semibold text-white">{company.location}</p>
            </div>
          </div>
        </section>

        {/* About & Culture */}
        <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-[1fr_380px]">
          <div className="space-y-8">
            <section className="rounded-3xl border border-white/10 bg-[#121218] p-6 sm:p-8">
              <h2 className="text-lg font-bold text-white">About {company.name}</h2>
              <p className="mt-3 text-sm leading-relaxed text-zinc-300">{company.about}</p>
              <h3 className="mt-6 text-sm font-semibold text-white">Our Mission</h3>
              <p className="mt-2 text-sm leading-relaxed text-zinc-400">{company.mission}</p>
            </section>

            {/* Workplace Culture Gallery */}
            <section className="rounded-3xl border border-white/10 bg-[#121218] p-6 sm:p-8">
              <h2 className="text-lg font-bold text-white">Office &amp; Engineering Culture</h2>
              <p className="text-xs text-zinc-400">Collaborative workspaces and team life</p>

              <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
                {company.gallery.map((img, i) => (
                  <div key={i} className="relative h-44 overflow-hidden rounded-2xl border border-white/10">
                    <Image src={img} alt="Culture" fill className="object-cover" />
                  </div>
                ))}
              </div>
            </section>

            {/* Active Openings at this Company */}
            <section className="rounded-3xl border border-white/10 bg-[#121218] p-6 sm:p-8">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-bold text-white">Open Positions ({companyJobs.length})</h2>
                  <p className="text-xs text-zinc-400">Current vacancies open for application</p>
                </div>
              </div>

              <div className="mt-6 space-y-3">
                {companyJobs.length === 0 ? (
                  <p className="text-xs text-zinc-500">No active job listings currently posted.</p>
                ) : (
                  companyJobs.map((j) => (
                    <div
                      key={j.id}
                      className="flex flex-col justify-between gap-3 rounded-2xl border border-white/5 bg-white/[0.02] p-4 transition-colors hover:border-[#5c53fe]/40 sm:flex-row sm:items-center"
                    >
                      <div>
                        <h3 className="text-sm font-semibold text-white">{j.title}</h3>
                        <p className="text-xs text-zinc-400">
                          {j.location} • {j.type} • <span className="text-emerald-400">{j.salary}</span>
                        </p>
                      </div>
                      <Link
                        href={`/jobs/${j.id}`}
                        className="rounded-xl bg-[#5c53fe] px-4 py-2 text-center text-xs font-semibold text-white shadow-md hover:bg-[#6c64ff]"
                      >
                        View &amp; Apply
                      </Link>
                    </div>
                  ))
                )}
              </div>
            </section>
          </div>

          <aside className="space-y-6">
            <div className="rounded-3xl border border-white/10 bg-[#121218] p-6">
              <h3 className="text-base font-bold text-white">Company Summary</h3>
              <div className="mt-4 space-y-3 text-xs">
                <div className="flex justify-between border-b border-white/5 pb-2">
                  <span className="text-zinc-500">Industry</span>
                  <span className="font-semibold text-white">{company.industry}</span>
                </div>
                <div className="flex justify-between border-b border-white/5 pb-2">
                  <span className="text-zinc-500">Location</span>
                  <span className="font-semibold text-white">{company.location}</span>
                </div>
                <div className="flex justify-between border-b border-white/5 pb-2">
                  <span className="text-zinc-500">Website</span>
                  <span className="font-semibold text-[#b3aefc]">{company.website}</span>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </main>

      <Footer />
    </div>
  );
}
