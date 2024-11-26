import type { Metadata } from "next";
import localFont from "next/font/local";
import "../css/globals.css"
import Header from "../components/header"
import Footer from "@/components/footer";

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
  title: "Pill Finder",
  icons : "/images/icon/pill-icon.png",
  description: "",
};

const KAKAO_MAP_API_KEY = process.env.KAKAO_MAP_API_KEY

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script src={`https://dapi.kakao.com/v2/maps/sdk.js?appkey=${KAKAO_MAP_API_KEY}&autoload=false&libraries=services,clusterer,drawing`}>
        </script>
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
      <Header/>
          {children}
      <Footer/>
      </body>
    </html>
  );
}
