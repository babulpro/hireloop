import { Icon, type IconName } from "./Icons";
import { SectionHeading } from "./ui";

const features: { icon: IconName; title: string; description: string }[] = [
  { icon: "search", title: "Smart Search", description: "Find your ideal job with advanced filters." },
  { icon: "chart", title: "Salary Insights", description: "Get real salary data to negotiate confidently." },
  { icon: "star", title: "Top Companies", description: "Apply to vetted companies that are hiring." },
  { icon: "bookmark", title: "Saved Jobs", description: "Manage apps & favourites on your dashboard." },
  { icon: "click", title: "One-Click Apply", description: "Simplify your job applications for an easier process!" },
  { icon: "resume", title: "Resume Builder", description: "Create professional resumes with modern templates." },
  { icon: "sparkles", title: "Skill-Based Matching", description: "Discover jobs that match your skills and experience." },
  { icon: "arrowUpRight", title: "Career Growth Resources", description: "Boost your career with quick interview tips." },
];

export default function FeaturesSection() {
  return (
    <section id="features" className="border-t border-white/5 px-4 py-20 sm:px-6 sm:py-24">
      <div className="mx-auto w-full max-w-[1320px]">
        <SectionHeading
          eyebrow="Features"
          title="Everything you need to succeed"
          subtitle="A complete toolkit for every stage of your career search — from discovery to offer."
        />

        <div className="mt-12 grid grid-cols-1 gap-x-8 gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <div key={feature.title} className="flex items-start gap-4">
              <span className="grid h-14 w-14 shrink-0 place-items-center rounded-xl border border-white/10 bg-gradient-to-b from-[#17171d] to-[#101014] text-[#9c95ff]">
                <Icon name={feature.icon} className="h-6 w-6" />
              </span>
              <div>
                <h3 className="text-sm font-semibold text-white">{feature.title}</h3>
                <p className="mt-1.5 text-[13px] leading-relaxed text-zinc-400">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
