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
      <body className={`${roboto.className} max-w-screen-sm mx-auto pb-96 bg-neutral-900 text-white`}>
        {children}
      </body>
    </html>
  );
}
