import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500"],
  style: ["normal", "italic"]
});

export const metadata: Metadata = {
  title: {
    template: "%s | Marketplace App",
    default: "Marketplace App"
  },
  description: "Buy and Sell Marketplace",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${roboto.className} bg-neutral-900 max-w-screen-sm mx-auto text-white pb-96`}>
        {children}
      </body>
    </html>
  );
}
