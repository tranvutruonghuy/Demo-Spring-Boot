"use client";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import DashboardLayout from "../components/DashboardLayout";


export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProtectedRoute>
      <DashboardLayout>{children}</DashboardLayout>
    </ProtectedRoute>
  );
}
