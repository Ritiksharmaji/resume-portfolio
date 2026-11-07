import type { Metadata, Viewport } from "next";
import { Playfair_Display, Montserrat, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
  style: ["normal", "italic"],
});
const montserrat = Montserrat({ variable: "--font-montserrat", subsets: ["latin"], weight: ["300", "400", "500", "600", "700"] });
const jetbrains = JetBrains_Mono({ variable: "--font-jetbrains", subsets: ["latin"], weight: ["400", "500"] });

export const metadata: Metadata = {
  title: "Ritik Sharma — Full-stack Engineer",
  description:
    "Full-stack engineer shipping Spring Boot & Express APIs, Next.js web apps and React Native mobile apps — 7 products, 5 live in production.",
  openGraph: {
    title: "Ritik Sharma — Full-stack Engineer",
    description: "Schema to screen: APIs, web and mobile, built and deployed end to end.",
    type: "website",
  },
};

export const viewport: Viewport = { themeColor: "#030407" };

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${playfair.variable} ${montserrat.variable} ${jetbrains.variable}`}>
      <body>{children}</body>
    </html>
  );
}
