import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "DogID - AI-Powered Dog Breed Identification",
  description: "Find out your dog's breed instantly with our AI-powered identification tool.",
  keywords: "dog breed, dog identification, AI, pet, dog breed finder, dog breed classifier",
  authors: [{ name: "DogID Team" }],
  openGraph: {
    title: "DogID - AI-Powered Dog Breed Identification",
    description: "Find out your dog's breed instantly with our AI-powered identification tool.",
    url: "https://dogid.netlify.app",
    siteName: "DogID",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "DogID - AI-Powered Dog Breed Identification",
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}
