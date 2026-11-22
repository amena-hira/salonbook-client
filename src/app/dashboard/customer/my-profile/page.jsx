"use client";

import { useState } from "react";
import { Camera, Eye, EyeOff, LockKeyhole, UserRound } from "lucide-react";
import { authClient, useSession } from "@/lib/auth-client";
import { toast } from "@/components/ui/toast";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const MyProfilePage = () => {
  const { data: session } = useSession();
  const user = session?.user;
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const initials =
    user?.name
      ?.split(" ")
      .map((name) => name[0])
      .join("")
      .slice(0, 2)
      .toUpperCase() || "U";

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const currentPassword = String(formData.get("currentPassword") || "");
    const newPassword = String(formData.get("newPassword") || "");
    const confirmPassword = String(formData.get("confirmPassword") || "");

    if (newPassword && newPassword !== confirmPassword) {
      toast.add({
        title: "Passwords do not match",
        description: "Please confirm your new password again.",
        type: "error",
      });
      return;
    }

    setIsSaving(true);

    try {
      const { error: profileError } = await authClient.updateUser({
        name: String(formData.get("name") || ""),
        phone: String(formData.get("phone") || ""),
      });

      if (profileError) {
        toast.add({
          title: "Profile update failed",
          description: profileError.message || "Please try again.",
          type: "error",
        });
        return;
      }

      if (newPassword) {
        if (!currentPassword) {
          toast.add({
            title: "Current password required",
            description: "Enter your current password to set a new password.",
            type: "error",
          });
          return;
        }

        const { error: passwordError } = await authClient.changePassword({
          currentPassword,
          newPassword,
        });
        if (passwordError) {
          toast.add({
            title: "Password update failed",
            description: passwordError.message || "Please try again.",
            type: "error",
          });
          return;
        }
      }

      toast.add({
        title: "Profile updated",
        description: "Your changes have been saved.",
        type: "success",
      });
      event.currentTarget.reset();
    } catch (error) {
      toast.add({
        title: "Profile update failed",
        description: error.message || "Please try again.",
        type: "error",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const passwordFields = [
    {
      name: "currentPassword",
      label: "Current Password",
      placeholder: "Enter current password",
      visible: showCurrentPassword,
      toggle: () => setShowCurrentPassword(!showCurrentPassword),
    },
    {
      name: "newPassword",
      label: "New Password",
      placeholder: "Enter new password",
      visible: showNewPassword,
      toggle: () => setShowNewPassword(!showNewPassword),
    },
    {
      name: "confirmPassword",
      label: "Confirm New Password",
      placeholder: "Confirm new password",
      visible: showConfirmPassword,
      toggle: () => setShowConfirmPassword(!showConfirmPassword),
    },
  ];

  return (
    <section className="mx-auto w-full max-w-[1200px] p-5 sm:px-7">
      <div>
        <h2 className="font-heading text-2xl font-semibold tracking-tight text-charcoal sm:text-3xl">
          My Profile
        </h2>
        <p className="mt-1 text-sm text-ash">
          View and update your personal information.
        </p>
      </div>

      <div className="mt-6 grid items-start gap-5 xl:grid-cols-[280px_minmax(0,1fr)]">
        <aside className="flex h-[330px] w-full max-w-[280px] self-start justify-self-center flex-col items-center justify-center rounded-xl bg-[#f5efec] p-6 text-center xl:justify-self-start">
          <div className="relative">
            <Avatar className="size-28 border-0">
              {user?.image && (
                <AvatarImage
                  src={user.image}
                  alt={user.name || "User profile"}
                />
              )}
              <AvatarFallback className="bg-[#d8cec1] text-3xl font-semibold text-charcoal">
                {initials}
              </AvatarFallback>
            </Avatar>
            <button
              type="button"
              onClick={() =>
                toast.add({
                  title: "Profile photo",
                  description: "Photo updates will be available soon.",
                  type: "info",
                })
              }
              aria-label="Change profile photo"
              className="absolute bottom-0 right-0 grid size-8 place-items-center rounded-full border-2 border-cream bg-white text-charcoal shadow-sm hover:bg-background"
            >
              <Camera className="size-4" aria-hidden="true" />
            </button>
          </div>
          <h3 className="mt-4 font-heading text-2xl font-semibold text-charcoal">
            {user?.name || "SalonBook User"}
          </h3>
          <p className="mt-1 text-sm text-ash">{user?.email}</p>
        </aside>

        <form
          key={user?.id || "profile"}
          onSubmit={handleSubmit}
          className="flex flex-col rounded-xl border border-border bg-card p-5 sm:p-6 xl:min-h-[690px]"
        >
          <div className="flex items-center gap-2">
            <UserRound className="size-5 text-charcoal" aria-hidden="true" />
            <h3 className="text-xl font-semibold text-charcoal">
              Profile Information
            </h3>
          </div>
          <div className="mt-5 grid gap-4 xl:grid-cols-2 xl:gap-x-5">
            <label className="block xl:col-span-2">
              <span className="mb-1.5 block text-sm font-semibold text-charcoal">
                Full Name
              </span>
              <input
                name="name"
                defaultValue={user?.name || ""}
                required
                className="h-11 w-full rounded-lg border border-border bg-background px-3 text-sm text-charcoal outline-none focus:border-charcoal"
              />
            </label>
            <label className="block">
              <span className="mb-1.5 block text-sm font-semibold text-charcoal">
                Email Address
              </span>
              <input
                value={user?.email || ""}
                readOnly
                className="h-11 w-full cursor-not-allowed rounded-lg border border-border bg-muted px-3 text-sm text-ash outline-none"
              />
            </label>
            <label className="block">
              <span className="mb-1.5 block text-sm font-semibold text-charcoal">
                Phone Number
              </span>
              <input
                name="phone"
                defaultValue={user?.phone || ""}
                placeholder="Enter your phone number"
                className="h-11 w-full rounded-lg border border-border bg-background px-3 text-sm text-charcoal outline-none placeholder:text-ash focus:border-charcoal"
              />
            </label>
          </div>

          <div className="my-6 border-t border-border" />
          <div className="flex items-center gap-2">
            <LockKeyhole className="size-5 text-charcoal" aria-hidden="true" />
            <h3 className="text-xl font-semibold text-charcoal">
              Change Password
            </h3>
          </div>
          <div className="mt-5 space-y-4">
            {passwordFields.map((field) => (
              <label key={field.name} className="block">
                <span className="mb-1.5 block text-sm font-semibold text-charcoal">
                  {field.label}
                </span>
                <span className="relative block">
                  <input
                    type={field.visible ? "text" : "password"}
                    name={field.name}
                    autoComplete={
                      field.name === "currentPassword"
                        ? "current-password"
                        : "new-password"
                    }
                    placeholder={field.placeholder}
                    className="h-11 w-full rounded-lg border border-border bg-background px-3 pr-10 text-sm text-charcoal outline-none placeholder:text-ash focus:border-charcoal"
                  />
                  <button
                    type="button"
                    onClick={field.toggle}
                    aria-label={`Toggle ${field.label} visibility`}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-ash hover:text-charcoal"
                  >
                    {field.visible ? (
                      <EyeOff className="size-4" aria-hidden="true" />
                    ) : (
                      <Eye className="size-4" aria-hidden="true" />
                    )}
                  </button>
                </span>
              </label>
            ))}
          </div>
          <div className="mt-6 flex flex-wrap justify-end gap-3 xl:mt-auto xl:pt-6">
            <button
              type="reset"
              className="rounded-lg border border-border px-5 py-2.5 text-sm font-semibold text-charcoal hover:bg-cream"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSaving}
              className="rounded-lg bg-[#3c2a1d] px-5 py-2.5 text-sm font-semibold text-white hover:bg-charcoal disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSaving ? "Updating..." : "Update Profile"}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default MyProfilePage;
