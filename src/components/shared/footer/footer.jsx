import Link from "next/link";
import { Clock3, Mail, MapPin, Phone } from "lucide-react";
import { FaFacebook, FaInstagram, FaYoutube } from "react-icons/fa";

const quickLinks = [
    { label: "Home", href: "/" },
    { label: "Browse Services", href: "/services" },
    { label: "About Us", href: "/about" },
    { label: "Contact", href: "/contact" },
];

const Footer = () => (
    <footer className="bg-[#191919] text-white">
        <div className="mx-auto max-w-7xl px-6 py-10 sm:px-10 lg:px-12 lg:pt-9 lg:pb-3">
            <div className="grid gap-10 md:grid-cols-2 xl:grid-cols-[330px_260px_290px_1fr] xl:gap-0">
                <div className="xl:pr-10">
                    <Link href="/" className="font-heading text-3xl font-semibold tracking-tight">
                        SalonBook
                    </Link>
                    <p className="mt-3 max-w-60 text-sm leading-5 text-white/75">
                        Your trusted salon booking platform. Explore professional services, book
                        your appointment, and look your best.
                    </p>
                    <div className="mt-6 flex items-center gap-5">
                        <Link
                            href="#"
                            aria-label="Facebook"
                            className="text-2xl text-white transition-colors hover:text-cream"
                        >
                            <FaFacebook />
                        </Link>
                        <Link
                            href="#"
                            aria-label="Instagram"
                            className="text-white transition-colors hover:text-cream"
                        >
                            <FaInstagram className="size-6" />
                        </Link>
                        <Link
                            href="#"
                            aria-label="YouTube"
                            className="text-white transition-colors hover:text-cream"
                        >
                            <FaYoutube className="size-7" />
                        </Link>
                    </div>
                </div>

                <div className="xl:border-l xl:border-white/15 xl:px-[68px]">
                    <h2 className="text-lg font-semibold">Quick Links</h2>
                    <nav className="mt-4 flex flex-col items-start gap-3" aria-label="Footer navigation">
                        {quickLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className="text-sm text-white/75 transition-colors hover:text-cream"
                            >
                                {link.label}
                            </Link>
                        ))}
                    </nav>
                </div>

                <div className="xl:px-8">
                    <h2 className="text-lg font-semibold">Contact Us</h2>
                    <ul className="mt-4 space-y-3 text-sm text-white/80">
                        <li className="flex items-center gap-4">
                            <Phone className="size-5 shrink-0 text-white" />
                            <a href="tel:+15551234567" className="hover:text-cream">
                                +1 (555) 123-4567
                            </a>
                        </li>
                        <li className="flex items-center gap-4">
                            <Mail className="size-5 shrink-0 text-white" />
                            <a href="mailto:hello@salonbook.com" className="hover:text-cream">
                                hello@salonbook.com
                            </a>
                        </li>
                        <li className="flex items-start gap-4">
                            <MapPin className="mt-0.5 size-5 shrink-0 text-white" />
                            <address className="not-italic">123 Beauty Lane, New York, NY 10001</address>
                        </li>
                    </ul>
                </div>

                <div className="xl:border-l xl:border-white/15 xl:pl-10">
                    <h2 className="text-lg font-semibold">Opening Hours</h2>
                    <div className="mt-4 flex gap-4 text-sm text-white/80">
                        <Clock3 className="size-5 shrink-0 text-white" />
                        <dl className="grid grid-cols-[76px_max-content] gap-x-4 gap-y-3">
                            <dt>Mon – Fri:</dt>
                            <dd className="whitespace-nowrap">9:00 AM – 8:00 PM</dd>
                            <dt>Sat:</dt>
                            <dd className="whitespace-nowrap">10:00 AM – 7:00 PM</dd>
                            <dt>Sun:</dt>
                            <dd className="whitespace-nowrap">11:00 AM – 5:00 PM</dd>
                        </dl>
                    </div>
                </div>
            </div>

            <div className="mt-8 flex flex-col gap-4 border-t border-white/25 pt-4 text-sm text-white/70 sm:flex-row sm:items-center sm:justify-between">
                <p>© 2026 SalonBook. All rights reserved.</p>
                <div className="flex gap-6">
                    <Link href="/privacy-policy" className="hover:text-cream">
                        Privacy Policy
                    </Link>
                    <Link href="/terms-of-service" className="hover:text-cream">
                        Terms of Service
                    </Link>
                </div>
            </div>
        </div>
    </footer>
);

export default Footer;
