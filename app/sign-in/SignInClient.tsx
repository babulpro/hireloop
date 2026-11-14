"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useTransition } from "react";
import { authClient, signIn, signUp } from "../../lib/auth-client";
import { Icon } from "../components/Icons";

export default function SignInClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialMode = searchParams.get("mode") === "signup" ? "signup" : "signin";

  const [mode, setMode] = useState<"signin" | "signup">(initialMode);
  const [role, setRole] = useState<"seeker" | "recruiter">("seeker");

  // Form Fields
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Demo Persona State
  const [demoRole, setDemoRole] = useState<"seeker" | "recruiter" | "admin">("seeker");
  const [, startTransition] = useTransition();

  const handleEmailSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage(null);

    try {
      const res = await signIn.email({
        email,
        password,
      });

      if (res.error) {
        setErrorMessage(res.error.message || "Invalid credentials. Please try again.");
        setLoading(false);
        return;
      }

      setSuccessMessage("Signed in successfully! Redirecting to dashboard...");
      startTransition(() => {
        router.push("/dashboard/seeker");
        router.refresh();
      });
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Failed to sign in. Please verify your connection.";
      setErrorMessage(msg);
      setLoading(false);
    }
  };

  const handleEmailSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage(null);

    try {
      const res = await signUp.email({
        email,
        password,
        name,
        // @ts-expect-error role is an additional field in schema
        role,
        callbackURL: role === "recruiter" ? "/dashboard/recruiter" : "/dashboard/seeker",
      });

      if (res.error) {
        setErrorMessage(res.error.message || "Failed to create account. Please try again.");
        setLoading(false);
        return;
      }

      setSuccessMessage(`Account created as ${role === "recruiter" ? "Recruiter" : "Candidate"}! Redirecting...`);
      startTransition(() => {
        router.push(role === "recruiter" ? "/dashboard/recruiter" : "/dashboard/seeker");
        router.refresh();
      });
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Registration failed. Please check your details.";
      setErrorMessage(msg);
      setLoading(false);
    }
  };

  const handleSocialSignIn = async (provider: "github" | "google") => {
    setLoading(true);
    setErrorMessage(null);
    try {
      const res = await authClient.signIn.social({
        provider,
        callbackURL: role === "recruiter" ? "/dashboard/recruiter" : "/dashboard/seeker",
      });
      if (res?.error) {
        setErrorMessage(res.error.message || `Failed to connect with ${provider}.`);
        setLoading(false);
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : `Failed to connect with ${provider}.`;
      setErrorMessage(msg);
      setLoading(false);
    }
  };

  const handleDemoPersonaEnter = (selectedPersona: "seeker" | "recruiter" | "admin") => {
    const targetUrl =
      selectedPersona === "admin"
        ? "/dashboard/admin"
        : selectedPersona === "recruiter"
        ? "/dashboard/recruiter"
        : "/dashboard/seeker";

    setSuccessMessage(`Entering as ${selectedPersona.toUpperCase()} demo persona...`);
    startTransition(() => {
      router.push(targetUrl);
    });
  };

  return (
    <div className="flex min-h-screen flex-col bg-[#07070a] text-zinc-100 selection:bg-[#5c53fe] selection:text-white">
      {/* Toast Alert */}
      {successMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 rounded-2xl border border-emerald-500/30 bg-[#0e1f14] p-4 text-emerald-300 shadow-2xl backdrop-blur-xl animate-in fade-in">
          <Icon name="checkCircle" className="h-5 w-5 text-emerald-400" />
          <p className="text-xs font-semibold">{successMessage}</p>
        </div>
      )}

      <main className="flex flex-1 items-center justify-center px-4 py-12 sm:px-6">
        <div className="w-full max-w-md rounded-3xl border border-white/10 bg-[#121218] p-8 shadow-2xl backdrop-blur-xl sm:p-10">
          {/* Logo & Headline */}
          <div className="text-center">
            <Link href="/" className="inline-flex justify-center" aria-label="HireLoop home">
              <Image
                src="/logo.png"
                alt="HireLoop"
                width={154}
                height={44}
                priority
                className="h-8 w-auto object-contain"
              />
            </Link>
            <h1 className="mt-5 text-2xl font-bold text-white">
              {mode === "signin" ? "Welcome Back" : "Join HireLoop"}
            </h1>
            <p className="mt-1 text-xs text-zinc-400">
              {mode === "signin"
                ? "Sign in to manage your jobs, candidates, and applications"
                : "Create an account to start applying or hiring top talent"}
            </p>
          </div>

          {/* Mode Switcher Tabs (Sign In vs Sign Up) */}
          <div className="mt-6 flex rounded-xl border border-white/10 bg-white/5 p-1 text-xs">
            <button
              type="button"
              onClick={() => {
                setMode("signin");
                setErrorMessage(null);
              }}
              className={`flex-1 rounded-lg py-2 font-semibold transition-all ${
                mode === "signin"
                  ? "bg-[#5c53fe] text-white shadow-md"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => {
                setMode("signup");
                setErrorMessage(null);
              }}
              className={`flex-1 rounded-lg py-2 font-semibold transition-all ${
                mode === "signup"
                  ? "bg-[#5c53fe] text-white shadow-md"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              Create Account
            </button>
          </div>

          {/* Error Alert Box */}
          {errorMessage && (
            <div className="mt-4 rounded-xl border border-red-500/30 bg-red-500/10 p-3 text-xs text-red-400">
              {errorMessage}
            </div>
          )}

          {/* Role Selector (visible during Sign Up) */}
          {mode === "signup" && (
            <div className="mt-6 space-y-2">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-zinc-400">
                I want to:
              </span>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setRole("seeker")}
                  className={`flex flex-col items-center gap-1.5 rounded-2xl border p-3 text-center transition-all ${
                    role === "seeker"
                      ? "border-[#5c53fe] bg-[#5c53fe]/15 text-white"
                      : "border-white/10 bg-white/5 text-zinc-400 hover:text-white"
                  }`}
                >
                  <Icon name="users" className="h-4 w-4" />
                  <span className="text-xs font-bold">Find a Job</span>
                  <span className="text-[10px] text-zinc-400">Candidate / Seeker</span>
                </button>

                <button
                  type="button"
                  onClick={() => setRole("recruiter")}
                  className={`flex flex-col items-center gap-1.5 rounded-2xl border p-3 text-center transition-all ${
                    role === "recruiter"
                      ? "border-[#5c53fe] bg-[#5c53fe]/15 text-white"
                      : "border-white/10 bg-white/5 text-zinc-400 hover:text-white"
                  }`}
                >
                  <Icon name="briefcase" className="h-4 w-4" />
                  <span className="text-xs font-bold">Hire Talent</span>
                  <span className="text-[10px] text-zinc-400">Employer / Recruiter</span>
                </button>
              </div>
            </div>
          )}

          {/* Social Logins */}
          <div className="mt-6 space-y-2.5">
            <button
              type="button"
              disabled={loading}
              onClick={() => handleSocialSignIn("github")}
              className="flex h-11 w-full items-center justify-center gap-3 rounded-xl border border-white/10 bg-white/5 text-xs font-semibold text-white transition-colors hover:bg-white/10 disabled:opacity-50"
            >
              <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
              </svg>
              <span>{mode === "signin" ? "Sign in with GitHub" : "Sign up with GitHub"}</span>
            </button>

            <button
              type="button"
              disabled={loading}
              onClick={() => handleSocialSignIn("google")}
              className="flex h-11 w-full items-center justify-center gap-3 rounded-xl border border-white/10 bg-white/5 text-xs font-semibold text-white transition-colors hover:bg-white/10 disabled:opacity-50"
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
              </svg>
              <span>{mode === "signin" ? "Sign in with Google" : "Sign up with Google"}</span>
            </button>
          </div>

          <div className="relative my-6 flex items-center justify-center">
            <div className="w-full border-t border-white/10" />
            <span className="absolute bg-[#121218] px-3 text-[11px] uppercase tracking-wider text-zinc-500">
              or with email
            </span>
          </div>

          {/* Email / Password Form */}
          <form
            onSubmit={mode === "signin" ? handleEmailSignIn : handleEmailSignUp}
            className="space-y-4"
          >
            {mode === "signup" && (
              <div>
                <label className="text-xs font-semibold text-zinc-300">Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Alex Rivera"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="mt-1.5 w-full rounded-xl border border-white/10 bg-white/5 p-3 text-xs text-white placeholder-zinc-500 focus:border-[#5c53fe] focus:outline-none"
                />
              </div>
            )}

            <div>
              <label className="text-xs font-semibold text-zinc-300">Email Address</label>
              <input
                type="email"
                required
                placeholder="name@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1.5 w-full rounded-xl border border-white/10 bg-white/5 p-3 text-xs text-white placeholder-zinc-500 focus:border-[#5c53fe] focus:outline-none"
              />
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold text-zinc-300">Password</label>
                {mode === "signin" && (
                  <button
                    type="button"
                    onClick={() => alert("Password reset link will be sent to your email.")}
                    className="text-[11px] text-[#9c95ff] hover:underline"
                  >
                    Forgot password?
                  </button>
                )}
              </div>
              <input
                type="password"
                required
                minLength={6}
                placeholder="••••••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1.5 w-full rounded-xl border border-white/10 bg-white/5 p-3 text-xs text-white placeholder-zinc-500 focus:border-[#5c53fe] focus:outline-none"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-[#5c53fe] text-xs font-bold text-white shadow-lg transition-colors hover:bg-[#6c64ff] disabled:opacity-50"
            >
              {loading
                ? "Processing..."
                : mode === "signin"
                ? "Sign In with Email"
                : "Create Account"}
            </button>
          </form>

          {/* Quick Demo Persona Access */}
          <div className="mt-8 border-t border-white/10 pt-6">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-400">
                1-Click Demo Persona Access:
              </span>
              <span className="text-[10px] text-zinc-500">Instant test</span>
            </div>

            <div className="mt-3 grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => {
                  setDemoRole("seeker");
                  handleDemoPersonaEnter("seeker");
                }}
                className={`rounded-xl border p-2 text-center text-xs font-semibold transition-all ${
                  demoRole === "seeker"
                    ? "border-[#5c53fe] bg-[#5c53fe]/20 text-white"
                    : "border-white/10 bg-white/5 text-zinc-400 hover:text-white"
                }`}
              >
                Candidate
              </button>

              <button
                type="button"
                onClick={() => {
                  setDemoRole("recruiter");
                  handleDemoPersonaEnter("recruiter");
                }}
                className={`rounded-xl border p-2 text-center text-xs font-semibold transition-all ${
                  demoRole === "recruiter"
                    ? "border-[#5c53fe] bg-[#5c53fe]/20 text-white"
                    : "border-white/10 bg-white/5 text-zinc-400 hover:text-white"
                }`}
              >
                Recruiter
              </button>

              <button
                type="button"
                onClick={() => {
                  setDemoRole("admin");
                  handleDemoPersonaEnter("admin");
                }}
                className={`rounded-xl border p-2 text-center text-xs font-semibold transition-all ${
                  demoRole === "admin"
                    ? "border-[#5c53fe] bg-[#5c53fe]/20 text-white"
                    : "border-white/10 bg-white/5 text-zinc-400 hover:text-white"
                }`}
              >
                Admin
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
