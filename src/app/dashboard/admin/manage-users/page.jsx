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

const initialUsers = [
  {
    id: 1,
    name: "Sara Ahmed",
    email: "sara@example.com",
    joinedAt: "Nov 20, 2026",
    active: true,
    image: "/images/services/hair-cut.jpg",
  },
  {
    id: 2,
    name: "Rahim Hasan",
    email: "rahim@example.com",
    joinedAt: "Nov 19, 2026",
    active: true,
    image: "/images/services/man-hair-cut.jpg",
  },
  {
    id: 3,
    name: "Nusrat Jahan",
    email: "nusrat@example.com",
    joinedAt: "Nov 18, 2026",
    active: true,
    image: "/images/services/hair-color.jpg",
  },
  {
    id: 4,
    name: "Tanvir Alam",
    email: "tanvir@example.com",
    joinedAt: "Nov 17, 2026",
    active: false,
    image: "/images/services/man-hair-cut.jpg",
  },
  {
    id: 5,
    name: "Faria Islam",
    email: "faria@example.com",
    joinedAt: "Nov 16, 2026",
    active: true,
    image: "/images/services/eye-makeup.jpg",
  },
  {
    id: 6,
    name: "Imran Hossain",
    email: "imran@example.com",
    joinedAt: "Nov 15, 2026",
    active: true,
    image: "/images/services/man-hair-cut.jpg",
  },
];

const ManageUsersPage = () => {
  const [users, setUsers] = useState(initialUsers);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All Statuses");
  const visibleUsers = users.filter(
    (user) =>
      `${user.name} ${user.email}`
        .toLowerCase()
        .includes(search.toLowerCase()) &&
      (status === "All Statuses" ||
        (status === "Active" ? user.active : !user.active)),
  );
  const toggleUser = (id) =>
    setUsers((items) =>
      items.map((user) =>
        user.id === id ? { ...user, active: !user.active } : user,
      ),
    );
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
            "Banned Users",
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
          <option>Banned</option>
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
                    <Image
                      src={user.image}
                      alt={user.name}
                      width={40}
                      height={40}
                      className="size-10 rounded-full object-cover"
                    />
                    <b className="text-sm">{user.name}</b>
                  </div>
                </td>
                <td className="px-4 py-4 text-sm text-ash">{user.email}</td>
                <td className="px-4 py-4">
                  <span className="rounded-md bg-cream px-3 py-1 text-xs">
                    Customer
                  </span>
                </td>
                <td className="px-4 py-4">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${user.active ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}
                  >
                    ● {user.active ? "Active" : "Banned"}
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
                      onClick={() => {
                        toggleUser(user.id);
                        toast.add({
                          title: user.active ? "User banned" : "User activated",
                          description: `${user.name}'s access has been updated.`,
                          type: "success",
                        });
                      }}
                      className={`grid size-9 place-items-center rounded-md ${user.active ? "bg-red-100 text-red-600" : "bg-green-100 text-green-700"}`}
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

export default ManageUsersPage;
