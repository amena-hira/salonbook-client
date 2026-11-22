"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Ban,
  CalendarDays,
  CheckCircle2,
  MoreVertical,
  Pencil,
  Plus,
  Search,
  UsersRound,
} from "lucide-react";
import { toast } from "@/components/ui/toast";
import { updateUserBlockStatus } from "@/lib/actions/user";

const isBlocked = (value) => value === true || value === "true";

const normalizeUser = (user) => ({
  id: user._id,
  name: user.name || "Unnamed user",
  email: user.email,
  role: user.role || "customer",
  joinedAt: user.createdAt
    ? new Date(user.createdAt).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    : "—",
  active: !isBlocked(user.isBlocked),
  image: user.image,
});

const ManageUsersClient = ({ initialUsers }) => {
  const [users, setUsers] = useState(initialUsers.map(normalizeUser));
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All Statuses");
  const [updatingUserId, setUpdatingUserId] = useState("");
  const visibleUsers = users.filter(
    (user) =>
      `${user.name} ${user.email}`
        .toLowerCase()
        .includes(search.toLowerCase()) &&
      (status === "All Statuses" ||
        (status === "Active" ? user.active : !user.active)),
  );
  const toggleUser = async (user) => {
    const nextIsBlocked = user.active;
    setUpdatingUserId(user.id);

    try {
      await updateUserBlockStatus(user.id, nextIsBlocked);
      setUsers((items) =>
        items.map((item) =>
          item.id === user.id ? { ...item, active: !item.active } : item,
        ),
      );
      toast.add({
        title: user.active ? "User blocked" : "User unblocked",
        description: `${user.name}'s access has been updated.`,
        type: "success",
      });
    } catch (error) {
      toast.add({
        title: "Unable to update user",
        description: error.message || "Please try again.",
        type: "error",
      });
    } finally {
      setUpdatingUserId("");
    }
  };
  const showInfo = (title) =>
    toast.add({
      title,
      description:
        "This action will be available when the users API is connected.",
      type: "info",
    });
  const activeCount = users.filter((user) => user.active).length;

  return (
    <section className="mx-auto w-full max-w-[1440px] px-5 py-7 sm:px-7">
      <div>
        <h1 className="font-heading text-3xl font-semibold text-charcoal">
          Manage Users
        </h1>
        <p className="mt-1 text-sm text-ash">
          View and manage all registered users (customers).
        </p>
      </div>
      <div className="mt-7 grid gap-4 sm:grid-cols-3">
        {[
          ["Total Users", users.length, UsersRound, "bg-cream text-[#684521]"],
          [
            "Active Users",
            activeCount,
            UsersRound,
            "bg-green-100 text-green-600",
          ],
          [
            "Blocked Users",
            users.length - activeCount,
            Ban,
            "bg-red-100 text-red-600",
          ],
        ].map(([label, value, Icon, color]) => (
          <article
            key={label}
            className="flex items-center gap-4 rounded-xl border border-border bg-card p-5"
          >
            <span
              className={`grid size-12 place-items-center rounded-xl ${color}`}
            >
              <Icon className="size-6" />
            </span>
            <div>
              <p className="text-sm font-semibold">{label}</p>
              <p className="font-heading text-3xl font-semibold">{value}</p>
            </div>
          </article>
        ))}
      </div>
      <div className="mt-7 grid gap-3 lg:grid-cols-[minmax(0,1.55fr)_0.55fr_auto]">
        <label className="relative">
          <Search className="absolute left-4 top-1/2 size-5 -translate-y-1/2 text-ash" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search users by name or email..."
            className="h-12 w-full rounded-lg border border-border bg-card px-12 text-sm outline-none"
          />
        </label>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="h-12 rounded-lg border border-border bg-card px-4 text-sm"
        >
          <option>All Statuses</option>
          <option>Active</option>
          <option>Blocked</option>
        </select>
        <button
          onClick={() => showInfo("Add user")}
          className="inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-[#3c2a1d] px-5 text-sm font-semibold text-white"
        >
          <Plus className="size-5" />
          Add User
        </button>
      </div>
      <div className="mt-7 overflow-x-auto rounded-xl border border-border bg-card">
        <table className="w-full min-w-[900px] text-left">
          <thead className="bg-cream/50 text-xs">
            <tr>
              {[
                "#",
                "User",
                "Email",
                "Role",
                "Status",
                "Joined At",
                "Actions",
              ].map((label) => (
                <th key={label} className="px-4 py-4 font-semibold">
                  {label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {visibleUsers.map((user, index) => (
              <tr key={user.id} className="border-t border-border">
                <td className="px-4 py-4 text-sm">{index + 1}</td>
                <td className="px-4 py-4">
                  <div className="flex items-center gap-3">
                    {user.image ? (
                      <Image
                        src={user.image}
                        alt={user.name}
                        width={40}
                        height={40}
                        className="size-10 rounded-full object-cover"
                      />
                    ) : (
                      <span className="grid size-10 place-items-center rounded-full bg-cream text-sm font-semibold text-charcoal">
                        {user.name.charAt(0).toUpperCase()}
                      </span>
                    )}
                    <b className="text-sm">{user.name}</b>
                  </div>
                </td>
                <td className="px-4 py-4 text-sm text-ash">{user.email}</td>
                <td className="px-4 py-4">
                  <span className="rounded-md bg-cream px-3 py-1 text-xs">
                    {user.role}
                  </span>
                </td>
                <td className="px-4 py-4">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${user.active ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}
                  >
                    ● {user.active ? "Active" : "Blocked"}
                  </span>
                </td>
                <td className="px-4 py-4">
                  <span className="flex items-center gap-2 text-sm text-ash">
                    <CalendarDays className="size-4" />
                    {user.joinedAt}
                  </span>
                </td>
                <td className="px-4 py-4">
                  <div className="flex gap-2">
                    <button
                      onClick={() => showInfo("Edit user")}
                      className="grid size-9 place-items-center rounded-md border border-border"
                    >
                      <Pencil className="size-4" />
                    </button>
                    <button
                      onClick={() => toggleUser(user)}
                      disabled={updatingUserId === user.id}
                      className={`grid size-9 place-items-center rounded-md disabled:cursor-not-allowed disabled:opacity-60 ${user.active ? "bg-red-100 text-red-600" : "bg-green-100 text-green-700"}`}
                    >
                      {user.active ? (
                        <Ban className="size-4" />
                      ) : (
                        <CheckCircle2 className="size-4" />
                      )}
                    </button>
                    <button
                      onClick={() => showInfo("User options")}
                      className="grid size-9 place-items-center rounded-md"
                    >
                      <MoreVertical className="size-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default ManageUsersClient;
