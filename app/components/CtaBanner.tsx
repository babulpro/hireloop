import Link from "next/link";
import { Icon } from "./Icons";

export default function CtaBanner() {
  return (
    <section className="relative px-4 py-20 sm:px-6 sm:py-28">
      {/* Background glow matching Figma ellipse */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[350px] w-full max-w-4xl rounded-full bg-gradient-to-r from-[#5c53fe]/20 via-[#dc02ce]/15 to-[#5c53fe]/20 blur-[100px]" />

      <div className="relative mx-auto max-w-4xl rounded-3xl border border-white/10 bg-gradient-to-b from-[#14141e]/90 to-[#0c0c12]/95 p-8 text-center shadow-[0_20px_60px_rgba(0,0,0,0.6)] backdrop-blur-xl sm:p-14">
        <span className="inline-flex items-center gap-2 rounded-full border border-[#5c53fe]/30 bg-[#5c53fe]/10 px-3.5 py-1 text-xs font-semibold text-[#b3aefc]">
          <span className="h-1.5 w-1.5 rounded-full bg-[#5c53fe] animate-pulse" />
          Join over 15,000 top professionals
        </span>

        <h2 className="mx-auto mt-6 max-w-2xl text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl lg:leading-[1.15]">
          Your next role is <br />
          <span className="bg-gradient-to-r from-white via-zinc-200 to-[#b3aefc] bg-clip-text text-transparent">
            already looking for you
          </span>
        </h2>

        <p className="mx-auto mt-5 max-w-xl text-sm leading-relaxed text-zinc-400 sm:text-base">
          Build a profile in three minutes. The matches start arriving tomorrow morning.
        </p>

        <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            href="/sign-in"
            className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#5c53fe] px-7 text-sm font-semibold text-white shadow-[0_0_24px_rgba(92,83,254,0.4)] transition-all hover:bg-[#6e66ff] hover:shadow-[0_0_32px_rgba(92,83,254,0.6)] sm:w-auto"
          >
            <span>Create a free account</span>
            <Icon name="arrow" className="h-4 w-4" />
          </Link>

          <Link
            href="/pricing"
            className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/[0.04] px-7 text-sm font-semibold text-zinc-300 transition-colors hover:border-white/30 hover:bg-white/10 hover:text-white sm:w-auto"
          >
            <span>View pricing</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
