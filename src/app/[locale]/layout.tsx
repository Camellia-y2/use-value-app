import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import StoreProvider from "@/store/StoreProvider";
import AppLayout from "@/components/AppLayout";
import React, { ReactNode } from "react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "用值",
  description: "最大化你的资产价值",
};

export default async function RootLayout({
  children,
  params: { locale }
}: Readonly<{
  children: ReactNode;
  params: { locale: string };
}>) {
  const messages = await getMessages(); // 获取语言包

  return (
    <html lang={locale}>
      <body className={inter.className}>
        <NextIntlClientProvider messages={messages}> {/* 提供语言包 */}
          <StoreProvider>
            <AppLayout>
              {children}
            </AppLayout>
          </StoreProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

