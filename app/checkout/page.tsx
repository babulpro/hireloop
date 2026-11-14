"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Icon } from "../components/Icons";

export default function CheckoutPage() {
  const [currency, setCurrency] = useState<"BDT" | "USD">("BDT");
  const [email, setEmail] = useState("alex.rivera@example.com");
  const [cardNumber, setCardNumber] = useState("4242 4242 4242 4242");
  const [expiry, setExpiry] = useState("12 / 28");
  const [cvc, setCvc] = useState("321");
  const [cardholderName, setCardholderName] = useState("Alex Rivera");
  const [country, setCountry] = useState("Bangladesh");
  const [saveInfo, setSaveInfo] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [success, setSuccess] = useState(false);

  const priceBDT = "BDT 2,553.33";
  const priceUSD = "$20.00";
  const currentPrice = currency === "BDT" ? priceBDT : priceUSD;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setProcessing(true);
    setTimeout(() => {
      setProcessing(false);
      setSuccess(true);
    }, 1500);
  };

  return (
    <div className="flex min-h-screen flex-col bg-[#07070a] text-zinc-100">
      {/* Sandbox Header Banner matching Figma */}
      <div className="flex items-center justify-between border-b border-amber-500/20 bg-amber-500/10 px-4 py-2 text-xs font-semibold text-amber-400 sm:px-6">
        <div className="mx-auto flex w-full max-w-[900px] items-center justify-between">
          <span className="rounded bg-amber-500/20 px-2 py-0.5 tracking-wider uppercase text-[10px]">
            SANDBOX
          </span>
          <span>Stripe Test Mode Simulation</span>
          <Link href="/pricing" className="text-zinc-400 hover:text-white">
            Return to Pricing
          </Link>
        </div>
      </div>

      <main className="mx-auto w-full max-w-[900px] flex-1 px-4 py-10 sm:px-6">
        {/* Currency Switcher matching Figma */}
        <div className="flex flex-col items-center justify-between gap-3 rounded-2xl border border-white/10 bg-[#121218] p-4 sm:flex-row">
          <span className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
            CHOOSE A CURRENCY:
          </span>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setCurrency("BDT")}
              className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-semibold transition-all ${
                currency === "BDT"
                  ? "bg-[#5c53fe] text-white shadow-md"
                  : "border border-white/10 bg-white/5 text-zinc-400 hover:text-white"
              }`}
            >
              <div className="relative h-3 w-5 overflow-hidden rounded-sm">
                <Image src="/images/flag-bd.png" alt="BD" fill className="object-cover" />
              </div>
              <span>BDT 2,553.33</span>
            </button>

            <button
              type="button"
              onClick={() => setCurrency("USD")}
              className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-semibold transition-all ${
                currency === "USD"
                  ? "bg-[#5c53fe] text-white shadow-md"
                  : "border border-white/10 bg-white/5 text-zinc-400 hover:text-white"
              }`}
            >
              <div className="relative h-3 w-5 overflow-hidden rounded-sm">
                <Image src="/images/flag-us.png" alt="US" fill className="object-cover" />
              </div>
              <span>$20.00</span>
            </button>
          </div>
          <span className="text-[11px] text-zinc-500">1 USD = 127.6665 BDT</span>
        </div>

        {/* Main Stripe Card Layout */}
        <div className="mt-8 rounded-3xl border border-white/10 bg-[#14141c] p-6 shadow-2xl sm:p-10">
          {success ? (
            <div className="py-12 text-center">
              <span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-emerald-500/20 text-emerald-400">
                <Icon name="checkCircle" className="h-8 w-8" />
              </span>
              <h2 className="mt-4 text-2xl font-bold text-white">Payment Succeeded!</h2>
              <p className="mt-2 text-sm text-zinc-400">
                You are now subscribed to the <span className="text-white">Hireloop Pro Plan</span>.
                Your receipt has been emailed to <span className="text-white">{email}</span>.
              </p>
              <div className="mt-8 flex justify-center gap-4">
                <Link
                  href="/seeker"
                  className="rounded-xl bg-[#5c53fe] px-6 py-3 text-xs font-bold text-white shadow-lg"
                >
                  Go to Seeker Dashboard
                </Link>
                <Link
                  href="/seeker/billing"
                  className="rounded-xl border border-white/10 bg-white/5 px-6 py-3 text-xs font-semibold text-zinc-300 hover:text-white"
                >
                  View Subscription
                </Link>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              {/* Product Header */}
              <div className="flex items-start justify-between border-b border-white/10 pb-6">
                <div>
                  <h2 className="text-2xl font-bold text-white">Hireloop Pro Plan</h2>
                  <p className="mt-1 text-xs text-zinc-400">Access to all features</p>
                </div>
                <div className="text-right">
                  <span className="text-2xl font-bold text-white">{currentPrice}</span>
                  <p className="text-[11px] text-zinc-500">per month</p>
                </div>
              </div>

              {/* Express Checkout Options matching Figma (Link, Visa 4242) */}
              <div className="mt-6">
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      setProcessing(true);
                      setTimeout(() => {
                        setProcessing(false);
                        setSuccess(true);
                      }, 1000);
                    }}
                    className="flex h-11 items-center justify-center gap-2 rounded-xl bg-[#00d66f] text-xs font-bold text-black transition-opacity hover:opacity-90"
                  >
                    <span>link</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setProcessing(true);
                      setTimeout(() => {
                        setProcessing(false);
                        setSuccess(true);
                      }, 1000);
                    }}
                    className="flex h-11 items-center justify-center gap-2 rounded-xl bg-[#26262b] text-xs font-bold text-white transition-colors hover:bg-[#32323a]"
                  >
                    <div className="relative h-3 w-8">
                      <Image src="/images/card-visa.png" alt="Visa" fill className="object-contain" />
                    </div>
                    <span>4242</span>
                  </button>
                </div>

                <div className="relative my-6 text-center">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-white/10" />
                  </div>
                  <span className="relative bg-[#14141c] px-3 text-[11px] font-semibold text-zinc-500">
                    OR
                  </span>
                </div>
              </div>

              {/* Form Fields matching Figma */}
              <div className="space-y-5">
                {/* Contact information */}
                <div>
                  <label className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
                    Contact information
                  </label>
                  <div className="mt-2">
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="email@example.com"
                      className="w-full rounded-xl border border-white/10 bg-[#0d0d12] px-4 py-3 text-xs text-white focus:border-[#5c53fe] focus:outline-none"
                    />
                  </div>
                </div>

                {/* Payment Method Card */}
                <div>
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
                      Payment method
                    </label>
                    <div className="flex items-center gap-2">
                      <div className="relative h-4 w-6">
                        <Image src="/images/card-visa.png" alt="Visa" fill className="object-contain" />
                      </div>
                      <div className="relative h-4 w-6">
                        <Image src="/images/card-mastercard.png" alt="Mastercard" fill className="object-contain" />
                      </div>
                      <div className="relative h-4 w-6">
                        <Image src="/images/card-amex.png" alt="Amex" fill className="object-contain" />
                      </div>
                      <div className="relative h-4 w-6">
                        <Image src="/images/card-discover.png" alt="Discover" fill className="object-contain" />
                      </div>
                    </div>
                  </div>

                  <div className="mt-2 rounded-2xl border border-white/10 bg-[#0d0d12] p-4 space-y-3">
                    <div>
                      <span className="text-[10px] font-semibold uppercase tracking-wider text-zinc-500">
                        CARD INFORMATION
                      </span>
                      <div className="mt-1 flex items-center justify-between rounded-lg border border-white/10 bg-[#16161e] px-3 py-2">
                        <input
                          type="text"
                          required
                          value={cardNumber}
                          onChange={(e) => setCardNumber(e.target.value)}
                          placeholder="1234 1234 1234 1234"
                          className="w-full bg-transparent text-xs text-white focus:outline-none"
                        />
                        <Icon name="creditCard" className="h-4 w-4 text-zinc-400" />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <span className="text-[10px] font-semibold uppercase tracking-wider text-zinc-500">
                          MM / YY
                        </span>
                        <input
                          type="text"
                          required
                          value={expiry}
                          onChange={(e) => setExpiry(e.target.value)}
                          placeholder="MM / YY"
                          className="mt-1 w-full rounded-lg border border-white/10 bg-[#16161e] px-3 py-2 text-xs text-white focus:outline-none"
                        />
                      </div>
                      <div>
                        <span className="text-[10px] font-semibold uppercase tracking-wider text-zinc-500">
                          CVC
                        </span>
                        <input
                          type="text"
                          required
                          value={cvc}
                          onChange={(e) => setCvc(e.target.value)}
                          placeholder="CVC"
                          className="mt-1 w-full rounded-lg border border-white/10 bg-[#16161e] px-3 py-2 text-xs text-white focus:outline-none"
                        />
                      </div>
                    </div>

                    <div>
                      <span className="text-[10px] font-semibold uppercase tracking-wider text-zinc-500">
                        CARDHOLDER NAME
                      </span>
                      <input
                        type="text"
                        required
                        value={cardholderName}
                        onChange={(e) => setCardholderName(e.target.value)}
                        placeholder="Full name on card"
                        className="mt-1 w-full rounded-lg border border-white/10 bg-[#16161e] px-3 py-2 text-xs text-white focus:outline-none"
                      />
                    </div>

                    <div>
                      <span className="text-[10px] font-semibold uppercase tracking-wider text-zinc-500">
                        COUNTRY OR REGION
                      </span>
                      <select
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                        className="mt-1 w-full rounded-lg border border-white/10 bg-[#16161e] px-3 py-2 text-xs text-white focus:outline-none"
                      >
                        <option value="Bangladesh">Bangladesh</option>
                        <option value="United States">United States</option>
                        <option value="United Kingdom">United Kingdom</option>
                        <option value="Canada">Canada</option>
                        <option value="Germany">Germany</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Save info checkbox */}
                <label className="flex cursor-pointer items-start gap-3 text-xs text-zinc-400">
                  <input
                    type="checkbox"
                    checked={saveInfo}
                    onChange={(e) => setSaveInfo(e.target.checked)}
                    className="mt-0.5 h-4 w-4 rounded border-zinc-700 bg-zinc-900 text-[#5c53fe] focus:ring-[#5c53fe]"
                  />
                  <span>
                    Save my information for faster checkout. Pay securely on this site and everywhere
                    Link is accepted.
                  </span>
                </label>

                {/* Pay Button */}
                <button
                  type="submit"
                  disabled={processing}
                  className="mt-4 flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#5c53fe] text-sm font-bold text-white shadow-[0_0_24px_rgba(92,83,254,0.4)] transition-all hover:bg-[#6e66ff] disabled:opacity-50"
                >
                  <Icon name="lock" className="h-4 w-4" />
                  <span>{processing ? "Processing payment..." : `Pay ${currentPrice}`}</span>
                </button>
              </div>

              {/* Stripe Footer */}
              <div className="mt-8 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-4 text-[11px] text-zinc-500 sm:flex-row">
                <span className="flex items-center gap-1.5">
                  <Icon name="shield" className="h-3.5 w-3.5 text-zinc-400" />
                  Powered by <strong className="text-zinc-300">Stripe</strong>
                </span>
                <div className="flex gap-4">
                  <Link href="#" className="hover:text-zinc-300">
                    Terms
                  </Link>
                  <Link href="#" className="hover:text-zinc-300">
                    Privacy
                  </Link>
                </div>
              </div>
            </form>
          )}
        </div>
      </main>
    </div>
  );
}
