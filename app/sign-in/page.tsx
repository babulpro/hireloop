import { Suspense } from "react";
import SignInClient from "./SignInClient";

export default function SignInPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-[#07070a] text-xs text-zinc-400">
          Loading authentication...
        </div>
      }
    >
      <SignInClient />
    </Suspense>
  );
}
