import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import Providers from "./providers";
import "@/index.css";

export const metadata: Metadata = {
  title: "Luiz Hondo",
  description: "Portfolio Website",
  authors: [{ name: "Luiz Hondo" }],
  openGraph: {
    title: "Luiz Hondo",
    description: "Luiz Hondo web portfolio",
    type: "website",
    locale: "pt_BR",
    images: [
      "https://cdn.discordapp.com/attachments/1398168651005427914/1470965885626748928/image.png?ex=698d373c&is=698be5bc&hm=808c913752176f12d255e85131715a16ee524581e0138271c10f50fc3036b9fb&.png",
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@LuizHondo",
    title: "Luiz Hondo",
    description: "Luiz Hondo web portfolio",
    images: [
      "https://cdn.discordapp.com/attachments/1398168651005427914/1470965885626748928/image.png?ex=698d373c&is=698be5bc&hm=808c913752176f12d255e85131715a16ee524581e0138271c10f50fc3036b9fb&.png",
    ],
  },
  other: {
    "theme-color": "#0b0f14",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <head>
        <meta
          name="facebook-domain-verification"
          content="8owvcjyae1lafzca1uss3l2pwlns4y"
        />
        <link rel="icon" href="/favicon.ico" type="image/x-icon" />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,200..800&family=Manrope:wght@200..800&family=JetBrains+Mono:ital,wght@0,100..800;1,100..800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <Providers>{children}</Providers>
        <Analytics />
      </body>
    </html>
  );
}
