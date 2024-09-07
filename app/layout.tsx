import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Providers } from './providers'

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Prathmesh Sayal's Portfolio",
  description: "Professional portfolio website of Prathmesh Sayal, showcasing projects and skills in web development.",
  robots: "index, follow",
  viewport: "width=device-width, initial-scale=1",
  authors: [{ name: "Prathmesh Sayal" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://portfolio-pratz1337.vercel.app/",
    title: "Prathmesh Sayal's Portfolio",
    description: "Professional portfolio website of Prathmesh Sayal, showcasing projects and skills in web development.",
    images: [
      {
        url: "https://github.com/Pratz1337/portfolio-pratz1337/blob/main/public/images/IMG_5029.webp",
        width: 1200,
        height: 630,
        alt: "Prathmesh Sayal Portfolio",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="google-site-verification" content="YOUR_GOOGLE_VERIFICATION_CODE" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
