import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

export const metadata = {
  title: "SalonBook | Salon Appointment Booking",
  description: "Book your favorite salon services online.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${playfair.variable} antialiased`}
    >
      <body className="flex min-h-screen flex-col">
        <div className="flex flex-1 flex-col">{children}</div>
      </body>
    </html>
  );
}
