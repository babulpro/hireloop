import Link from "next/link";
import type { ReactNode } from "react";

export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-[11px] font-medium uppercase tracking-[0.14em] text-[#b3aefc]">
      <span className="h-1 w-1 rounded-full bg-[#6d65ff]" />
      {children}
      <span className="h-1 w-1 rounded-full bg-[#6d65ff]" />
    </span>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "center",
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "center" | "left";
}) {
  return (
    <div className={align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      <h2 className="mt-5 text-3xl font-semibold leading-tight tracking-[-0.02em] text-white sm:text-4xl">
        {title}
      </h2>
      {subtitle && <p className="mt-4 text-sm leading-relaxed text-zinc-400 sm:text-base">{subtitle}</p>}
    </div>
  );
}

export function Badge({
  children,
  tone = "neutral",
  className = "",
}: {
  children: ReactNode;
  tone?: "neutral" | "success" | "warning" | "danger" | "purple" | "info";
  className?: string;
}) {
  const tones: Record<string, string> = {
    neutral: "border-white/10 bg-white/5 text-zinc-300",
    success: "border-emerald-500/20 bg-emerald-500/10 text-emerald-400",
    warning: "border-amber-500/20 bg-amber-500/10 text-amber-400",
    danger: "border-red-500/20 bg-red-500/10 text-red-400",
    purple: "border-[#5c53fe]/30 bg-[#5c53fe]/15 text-[#b3aefc]",
    info: "border-sky-500/20 bg-sky-500/10 text-sky-400",
  };
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-medium ${tones[tone]} ${className}`}
    >
      {children}
    </span>
  );
}

export function PrimaryLink({
  href,
  children,
  className = "",
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={`inline-flex items-center justify-center gap-2 rounded-lg bg-[#5c53fe] px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-[#6d65ff] ${className}`}
    >
      {children}
    </Link>
  );
}

export function GhostLink({
  href,
  children,
  className = "",
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={`inline-flex items-center justify-center gap-2 rounded-lg border border-white/15 px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-white/5 ${className}`}
    >
      {children}
    </Link>
  );
}
