import { Roboto } from "next/font/google";
import "./globals.css";
const roboto = Roboto({ subsets: ["vietnamese"], weight: ["100", "300"] });
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";

import AppProvider from "./AppProvider";
import { cookies } from "next/headers";
export const metadata = {
  title: "Tran Ngoc Tu",
  description: "Nextjs by Tran Ngoc Tu",
};

// eslint-disable-next-line react/prop-types
export default function RootLayout({ children }) {
  const cookieStore = cookies();
  const sessionToken = cookieStore.get("sessionToken");
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={roboto.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Toaster />
          <AppProvider inititalSessionToken={sessionToken}>
            {children}
          </AppProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
