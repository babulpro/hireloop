"use client";

import Image from "next/image";
import { useState } from "react";
import { adminData } from "../../../data/site";
import { Icon } from "../../../components/Icons";

type PlatformUser = {
  id: string;
  name: string;
  email: string;
  role: "Seeker" | "Recruiter";
  joined: string;
  status: "Active" | "Suspended";
  avatar: string;
};

export default function AdminUsersPage() {
  const [users, setUsers] = useState<PlatformUser[]>(adminData.users as PlatformUser[]);
  const [search, setSearch] = useState("");
  const [filterRole, setFilterRole] = useState("All");
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const toggleRole = (userId: string, currentRole: "Seeker" | "Recruiter") => {
    const nextRole = currentRole === "Seeker" ? "Recruiter" : "Seeker";
    const confirmed = window.confirm(
      `Are you sure you want to change this user's role to ${nextRole}? This will adjust their dashboard access and permissions.`
    );
    if (!confirmed) return;

    setUsers((prev) =>
      prev.map((u) => (u.id === userId ? { ...u, role: nextRole } : u))
    );
    showToast(`User role updated to ${nextRole}.`);
  };

  const toggleSuspend = (userId: string, currentStatus: "Active" | "Suspended") => {
    const nextStatus = currentStatus === "Active" ? "Suspended" : "Active";
    setUsers((prev) =>
      prev.map((u) => (u.id === userId ? { ...u, status: nextStatus } : u))
    );
    showToast(`User status changed to ${nextStatus}.`);
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const filteredUsers = users.filter((u) => {
    const matchesSearch =
      !search ||
      u.email.toLowerCase().includes(search.toLowerCase()) ||
      u.name.toLowerCase().includes(search.toLowerCase());

    const matchesRole = filterRole === "All" || u.role === filterRole;

    return matchesSearch && matchesRole;
  });

  return (
    <div className="space-y-6">
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 rounded-2xl border border-white/15 bg-[#161622] p-4 text-white shadow-2xl backdrop-blur-xl animate-in fade-in">
          <Icon name="checkCircle" className="h-5 w-5 text-emerald-400" />
          <p className="text-xs font-semibold">{toastMessage}</p>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col justify-between gap-4 border-b border-white/10 pb-6 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-bold text-white sm:text-3xl">Manage Platform Users</h1>
          <p className="mt-1 text-xs text-zinc-400">
            Control registered candidate and recruiter accounts, permissions, and moderation status.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <span className="rounded-xl border border-white/10 bg-[#121218] px-3.5 py-1.5 text-xs text-zinc-300">
            Total Accounts: <span className="font-bold text-[#b3aefc]">{users.length}</span>
          </span>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col justify-between gap-4 rounded-2xl border border-white/10 bg-[#121218] p-4 sm:flex-row sm:items-center">
        <div className="relative flex-1 sm:max-w-xs">
          <Icon
            name="search"
            className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400"
          />
          <input
            type="text"
            placeholder="Search by email address or name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-xl border border-white/10 bg-white/5 py-2 pl-9 pr-4 text-xs text-white placeholder-zinc-500 focus:border-[#5c53fe] focus:outline-none"
          />
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-zinc-400 font-medium">Filter by Role:</span>
          <div className="flex gap-1.5">
            {["All", "Seeker", "Recruiter"].map((r) => (
              <button
                key={r}
                type="button"
                onClick={() => setFilterRole(r)}
                className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
                  filterRole === r
                    ? "bg-[#5c53fe] text-white"
                    : "border border-white/5 bg-white/5 text-zinc-400 hover:text-white"
                }`}
              >
                {r}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Users Table */}
      <div className="overflow-hidden rounded-3xl border border-white/10 bg-[#121218]">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="border-b border-white/10 bg-white/[0.02] text-[11px] font-semibold uppercase tracking-wider text-zinc-400">
              <tr>
                <th className="px-6 py-4">User</th>
                <th className="px-6 py-4">Email</th>
                <th className="px-6 py-4">Role</th>
                <th className="px-6 py-4">Join Date</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-zinc-300">
              {filteredUsers.map((u) => (
                <tr key={u.id} className="transition-colors hover:bg-white/[0.02]">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="relative h-9 w-9 shrink-0 overflow-hidden rounded-xl border border-white/10">
                        <Image src={u.avatar} alt={u.name} fill className="object-cover" />
                      </div>
                      <span className="font-bold text-white">{u.name}</span>
                    </div>
                  </td>

                  <td className="px-6 py-4 font-mono text-zinc-400">{u.email}</td>

                  <td className="px-6 py-4">
                    <span
                      className={`rounded-md border px-2.5 py-0.5 text-[10px] font-bold ${
                        u.role === "Recruiter"
                          ? "border-[#5c53fe]/30 bg-[#5c53fe]/10 text-[#b3aefc]"
                          : "border-blue-500/30 bg-blue-500/10 text-blue-400"
                      }`}
                    >
                      {u.role}
                    </span>
                  </td>

                  <td className="px-6 py-4 text-zinc-400">{u.joined}</td>

                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center rounded-md border px-2.5 py-0.5 text-[10px] font-bold ${
                        u.status === "Active"
                          ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-400"
                          : "border-red-500/30 bg-red-500/10 text-red-400"
                      }`}
                    >
                      {u.status}
                    </span>
                  </td>

                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        type="button"
                        onClick={() => toggleRole(u.id, u.role)}
                        className="rounded-lg border border-white/10 bg-white/5 px-2.5 py-1 text-xs font-medium text-zinc-300 transition-colors hover:bg-white/10 hover:text-white"
                      >
                        {u.role === "Seeker" ? "Make Recruiter" : "Make Seeker"}
                      </button>

                      <button
                        type="button"
                        onClick={() => toggleSuspend(u.id, u.status)}
                        className={`rounded-lg border px-2.5 py-1 text-xs font-medium transition-colors ${
                          u.status === "Active"
                            ? "border-red-500/20 bg-red-500/10 text-red-400 hover:bg-red-500/20"
                            : "border-emerald-500/20 bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20"
                        }`}
                      >
                        {u.status === "Active" ? "Suspend" : "Activate"}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
