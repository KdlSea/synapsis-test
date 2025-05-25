import type { Metadata } from "next";
import { Sora } from "next/font/google";
import "./globals.css";
import "antd/dist/reset.css";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import "@ant-design/v5-patch-for-react-19";
import { App as AntdApp } from "antd";

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "BloX App",
  description: "BloX App Dashboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${sora.className} antialiased`}
      >
        <AntdRegistry>
          <AntdApp>{children}</AntdApp>
        </AntdRegistry>
      </body>
    </html>
  );
}
