"use client";
import { ThemeProvider } from "@/components/theme-provider";
import { AuthProvider } from "@/contexts/AuthContext";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { ReactNode } from "react";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <AntdRegistry>
      <AuthProvider>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </AuthProvider>
    </AntdRegistry>
  );
}