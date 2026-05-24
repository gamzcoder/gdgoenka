import type { Metadata } from "next";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-heading",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "GD Goenka Healthcare Academy Ramnagar | Healthcare Courses Uttarakhand",
  description:
    "Premier healthcare education in Ramnagar, Uttarakhand. B.Sc MLT, Radiology, OT Technology, Nursing courses with 99% placement. 30+ years of excellence.",
  keywords: [
    "GD Goenka Healthcare Ramnagar",
    "healthcare courses Uttarakhand",
    "MLT course Ramnagar",
    "nursing college Ramnagar",
  ],
  openGraph: {
    title: "GD Goenka Healthcare Academy — Ramnagar",
    description: "30+ years of healthcare education excellence. 99% placement rate. 500+ hospital partners.",
    images: ["/og-image.jpg"],
    url: "https://gdgoenkahealthcare.com/ramnagar",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${dmSans.variable} ${cormorant.variable}`}>
      <body>{children}</body>
    </html>
  );
}
