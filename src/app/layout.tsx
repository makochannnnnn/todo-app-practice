import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
//Todoプロバイダーをインポートしなきゃいけない
import { TodoProvider } from "@/contexts/TodoContext";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ToDoアプリ",
  description: "チームタスク管理アプリ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <header className="mb-8 bg-black">
            <h1 className="text-4xl text-center">TODO管理</h1>
            <p className="text-center">
                メンバーのタスクを管理し効率的にプロジェクトを遂行する
            </p>
        </header>
        <TodoProvider>
          {children}
        </TodoProvider>
      </body>
    </html>
  );
}
