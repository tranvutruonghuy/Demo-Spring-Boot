"use client";

import React, { Suspense } from "react";
import { Layout, Menu, Spin } from "antd";
import type { MenuProps } from "antd";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  VideoCameraOutlined,
  DashboardOutlined,
} from "@ant-design/icons";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";

const { Header, Sider, Content } = Layout;

type DashboardLayoutProps = {
  children: React.ReactNode;
};

const items: MenuProps["items"] = [
  {
    key: "/",
    icon: <DashboardOutlined />,
    label: <Link href="/">Dashboard</Link>,
  },
  {
    key: "/configure",
    icon: <VideoCameraOutlined />,
    label: <Link href="/configure">Configure</Link>,
  },
];

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const [collapsed, setCollapsed] = React.useState(false);
  const pathname = usePathname();

  const selectedKeys = React.useMemo<MenuProps["selectedKeys"]>(() => {
    if (pathname?.startsWith("/configure")) return ["/configure"];
    return ["/"];
  }, [pathname]);

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        style={{
          background: "#174168",
          position: "fixed",
          left: 0,
          top: 0,
          bottom: 0,
          zIndex: 1000,
          overflow: "auto",
          height: "100vh",
        }}
      >
        <div
          style={{
            height: 32,
            margin: 16,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {collapsed ? (
            <Image
              src="/EIU_Logo_Square.png"
              alt="EIU Logo"
              width={32}
              height={32}
              priority
            />
          ) : (
            <Image
              src="/EIU_Logo.png"
              alt="EIU Logo"
              width={120}
              height={32}
              priority
            />
          )}
        </div>
        <Suspense fallback={<Spin />}>
          <Menu
            theme="dark"
            mode="inline"
            selectedKeys={selectedKeys}
            items={items}
            style={{ background: "#174168" }}
          />
        </Suspense>
      </Sider>

      <Layout
        style={{
          marginLeft: collapsed ? 80 : 200,
          transition: "margin-left 0.2s",
        }}
      >
        <Header
          style={{
            padding: 0,
            background: "#fff",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            position: "fixed",
            top: 0,
            right: 0,
            left: collapsed ? 80 : 200,
            zIndex: 999,
            transition: "left 0.2s",
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            {React.createElement(
              collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
              {
                className: "trigger",
                style: { padding: "0 24px", fontSize: 20, cursor: "pointer" },
                onClick: () => setCollapsed(!collapsed),
              }
            )}
            <span style={{ fontWeight: "bold", fontSize: 18 }}>
              {" "}
              Dashboard{" "}
            </span>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 24,
              paddingRight: 24,
            }}
          >
            {/* <ThemeToggle /> */}
            {/* <AvatarDropdown /> */}
            {/* <AntdServerClock
              apiUrl="https://localhost:5026/api/Time/now"
              timeZone="Asia/Ho_Chi_Minh"
              hour12={false}
              showSeconds
            /> */}
          </div>
        </Header>

        <Content
          style={{
            margin: "88px 16px 24px 16px",
            padding: 24,
            background: "#fff",
            minHeight: 280,
            transition: "margin-left 0.2s",
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  );
}
