"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, LockKeyhole, Mail, Scissors, Trash2, Upload, UserRound } from "lucide-react";
import { authClient } from "@/lib/auth-client";

const SignUpPage = () => {
    const router = useRouter();
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [imageUrl, setImageUrl] = useState("");
    const [imagePreview, setImagePreview] = useState("");
    const [isUploadingImage, setIsUploadingImage] = useState(false);
    const [imageError, setImageError] = useState("");
    
    const handleImageChange = async (event) => {
        const file = event.target.files?.[0];

        if (imagePreview) URL.revokeObjectURL(imagePreview);
        setImagePreview(file ? URL.createObjectURL(file) : "");
        setImageUrl("");
        setImageError("");

        if (!file) return;

        setIsUploadingImage(true);

        try {
            const formData = new FormData();
            formData.append("image", file);

            const imgbbApi = `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_API_KEY}`;
            const response = await fetch(imgbbApi, { method: "POST", body: formData });
            const result = await response.json();

            if (!response.ok || !result.success) {
                throw new Error("Unable to upload the selected image.");
            }

            setImageUrl(result.data.url);
        } catch (uploadError) {
            setImageError(uploadError.message || "Unable to upload the selected image.");
        } finally {
            setIsUploadingImage(false);
        }
    };

    const clearImage = () => {
        if (imagePreview) URL.revokeObjectURL(imagePreview);
        setImagePreview("");
        setImageUrl("");
        setImageError("");

    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError(null);
        setIsLoading(true);

        const data = new FormData(event.currentTarget);
        try {
            const { error: signUpError } = await authClient.signUp.email({
                name: String(data.get("name") || ""),
                email: String(data.get("email") || ""),
                password: String(data.get("password") || ""),
                callbackURL: "/",
                image: imageUrl || undefined,
            });

            if (signUpError) {
                setError(signUpError.message || "Something went wrong. Please try again.");
                return;
            }

            router.refresh();
            router.push("/");
        } catch (requestError) {
            setError(requestError.message || "Something went wrong. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <main className="grid min-h-screen bg-card lg:h-screen lg:max-h-screen lg:grid-cols-[48%_52%]">
            <section className="relative hidden h-full overflow-hidden lg:block">
                <Image src="/images/hero.png" alt="A professional stylist working in a salon" fill priority sizes="48vw" className="object-cover object-center" />
                <div className="absolute inset-0 bg-black/45" />

                <Link href="/" className="absolute left-10 top-9 flex items-center gap-3 text-white xl:left-14">
                    <span className="grid size-11 place-items-center rounded-full border border-cream/80 text-cream">
                        <Scissors className="size-6" aria-hidden="true" />
                    </span>
                    <span className="font-heading text-4xl font-semibold tracking-tight">SalonBook</span>
                </Link>

                <div className="absolute inset-x-10 bottom-14 max-w-xl text-white xl:left-14">
                    <h1 className="font-heading text-5xl leading-[1.05] font-semibold xl:text-6xl">Book Your Beauty &amp; Wellness Appointments Online</h1>
                    <p className="mt-6 max-w-md text-lg leading-8 text-white/85">Discover top salon services, book instantly, and look your best — anytime, anywhere.</p>
                </div>
            </section>

            <section className="flex items-center justify-center overflow-y-auto px-6 py-12 sm:px-10 lg:px-16 xl:px-24">
                <div className="w-full max-w-xl">
                    <Link href="/" className="mb-12 flex items-center gap-3 text-charcoal lg:hidden">
                        <span className="grid size-10 place-items-center rounded-full border border-charcoal/50 text-charcoal">
                            <Scissors className="size-5" aria-hidden="true" />
                        </span>
                        <span className="font-heading text-3xl font-semibold tracking-tight">SalonBook</span>
                    </Link>

                    <div className="text-center">
                        <h2 className="font-heading text-4xl font-semibold tracking-tight text-charcoal sm:text-5xl">Create an Account</h2>
                        <p className="mx-auto mt-4 max-w-md text-base leading-7 text-ash sm:text-lg">Join SalonBook to book appointments, track your visits, and get exclusive offers.</p>
                    </div>

                    <form onSubmit={handleSubmit} className="mt-10 space-y-5">
                        <label className="block">
                            <span className="mb-2 block text-sm font-semibold text-charcoal">Full Name</span>
                            <span className="relative block">
                                <UserRound className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-ash" aria-hidden="true" />
                                <input type="text" name="name" autoComplete="name" required placeholder="Enter your full name" className="h-14 w-full rounded-lg border border-border bg-background px-12 text-base text-charcoal outline-none placeholder:text-ash focus:border-charcoal" />
                            </span>
                        </label>

                        <label className="block">
                            <span className="mb-2 block text-sm font-semibold text-charcoal">Email Address</span>
                            <span className="relative block">
                                <Mail className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-ash" aria-hidden="true" />
                                <input type="email" name="email" autoComplete="email" required placeholder="Enter your email address" className="h-14 w-full rounded-lg border border-border bg-background px-12 text-base text-charcoal outline-none placeholder:text-ash focus:border-charcoal" />
                            </span>
                        </label>

                        <label className="block">
                            <span className="mb-2 block text-sm font-semibold text-charcoal">Password</span>
                            <span className="relative block">
                                <LockKeyhole className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-ash" aria-hidden="true" />
                                <input type="password" name="password" autoComplete="new-password" required minLength="6" placeholder="Create a password" className="h-14 w-full rounded-lg border border-border bg-background px-12 pr-12 text-base text-charcoal outline-none placeholder:text-ash focus:border-charcoal" />
                                <Eye className="pointer-events-none absolute right-4 top-1/2 size-5 -translate-y-1/2 text-ash" aria-hidden="true" />
                            </span>
                        </label>

                        <fieldset>
                            <legend className="mb-2 text-sm font-semibold text-charcoal">Profile Image <span className="font-normal text-ash">(optional)</span></legend>
                            <div className="flex items-center gap-3">
                                {imagePreview ? (
                                    // eslint-disable-next-line @next/next/no-img-element
                                    <img src={imagePreview} alt="Selected profile preview" className="size-12 shrink-0 rounded-full border border-border object-cover" />
                                ) : (
                                    <span className="grid size-12 shrink-0 place-items-center rounded-full bg-cream text-charcoal">
                                        <UserRound className="size-5" aria-hidden="true" />
                                    </span>
                                )}
                                <label className="inline-flex h-11 cursor-pointer items-center gap-2 rounded-md border border-border bg-background px-4 text-sm font-medium text-charcoal transition-colors hover:bg-cream">
                                    <Upload className="size-4" aria-hidden="true" />
                                    {imagePreview ? "Change image" : "Upload image"}
                                    <input type="file" name="image" accept="image/*" onChange={handleImageChange} className="sr-only" />
                                </label>
                                {imagePreview && (
                                    <button type="button" onClick={clearImage} aria-label="Remove selected image" className="rounded-md p-2 text-ash transition-colors hover:bg-cream hover:text-charcoal">
                                        <Trash2 className="size-5" aria-hidden="true" />
                                    </button>
                                )}
                                {isUploadingImage && <span className="text-xs text-ash">Uploading...</span>}
                            </div>
                            {imageError && <p className="mt-2 text-sm text-destructive">{imageError}</p>}
                        </fieldset>

                        {error && <p role="alert" className="rounded-md bg-destructive/10 px-4 py-3 text-sm text-destructive">{error}</p>}

                        <button type="submit" disabled={isLoading || isUploadingImage} className="mt-3 h-14 w-full rounded-lg bg-charcoal text-base font-semibold text-white transition-colors hover:bg-charcoal/85 disabled:cursor-not-allowed disabled:opacity-60">
                            {isLoading ? "Creating Account..." : "Sign Up"}
                        </button>
                    </form>

                    <p className="mt-7 text-center text-sm text-ash sm:text-base">Already have an account? <Link href="/sign-in" className="font-semibold text-charcoal underline decoration-[#b89462] decoration-2 underline-offset-8 hover:text-ash">Sign In</Link></p>
                </div>
            </section>
        </main>
    );
};

export default SignUpPage;
