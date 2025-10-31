"use client";

import { Spin } from "antd";
import { usePathname } from "next/navigation";

export default function ClientLoading() {
  const pathname = usePathname();

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: 12,
      }}
    >
      <Spin
        size="large"
        // tip={`Đang tải ${pathname === "/" ? "Dashboard" : pathname} ...`}
      />
    </div>
  );
}
