"use client";
import Logo from "@/components/ui/Logo";
import {
  ExternalLink,
  LayoutDashboard,
  LogOut,
  Menu,
  Package,
  Settings,
  ShoppingCart,
  X,
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const navItems = [
  { label: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
  { label: "Products", href: "/admin/products", icon: Package },
  { label: "Orders", href: "/admin/orders", icon: ShoppingCart },
  { label: "Settings", href: "/admin/settings", icon: Settings },
];

function Sidebar({
  mobile = false,
  pathname,
  setSidebarOpen,
  logout,
}: {
  mobile?: boolean;
  pathname: string;
  setSidebarOpen: (open: boolean) => void;
  logout: () => void;
}) {
  return (
    <div
      className={`flex flex-col h-full ${mobile ? "" : ""}`}
      style={{ background: "var(--text-dark)" }}>
      {/* Logo */}
      <div
        className='px-5 py-5 border-b'
        style={{ borderColor: "rgba(255,255,255,0.08)" }}>
        <div className='flex items-center justify-between'>
          <Logo dark href='/admin/dashboard' />
          {mobile && (
            <button onClick={() => setSidebarOpen(false)}>
              <X size={18} style={{ color: "rgba(255,255,255,0.5)" }} />
            </button>
          )}
        </div>
        <div
          className='mt-3 px-2 py-1 rounded-lg inline-block'
          style={{
            background: "rgba(160,120,69,0.2)",
            border: "1px solid rgba(160,120,69,0.3)",
          }}>
          <span
            style={{
              fontFamily: "var(--font-body)",
              fontSize: 10,
              color: "var(--gold-light)",
              letterSpacing: "1px",
              textTransform: "uppercase",
            }}>
            Admin Panel
          </span>
        </div>
      </div>

      {/* Nav */}
      <nav className='flex-1 p-3 flex flex-col gap-1'>
        <div
          style={{
            fontFamily: "var(--font-body)",
            fontSize: 9,
            letterSpacing: "1.5px",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.3)",
            padding: "8px 10px 4px",
          }}>
          Navigation
        </div>
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setSidebarOpen(false)}
              className='flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all'
              style={{
                textDecoration: "none",
                background: isActive ? "var(--gold)" : "transparent",
                color: isActive ? "white" : "rgba(255,255,255,0.6)",
                fontFamily: "var(--font-body)",
                fontSize: 13,
                fontWeight: isActive ? 500 : 400,
              }}>
              <Icon size={16} />
              {item.label}
            </Link>
          );
        })}
        <div
          className='mt-4'
          style={{
            borderTop: "1px solid rgba(255,255,255,0.08)",
            paddingTop: 12,
          }}>
          <Link
            href='/'
            target='_blank'
            className='flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all'
            style={{
              textDecoration: "none",
              color: "rgba(255,255,255,0.4)",
              fontFamily: "var(--font-body)",
              fontSize: 12,
            }}>
            <ExternalLink size={14} /> View Store
          </Link>
        </div>
      </nav>

      {/* User & logout */}
      <div
        className='p-4 border-t'
        style={{ borderColor: "rgba(255,255,255,0.08)" }}>
        <div className='flex items-center gap-3 mb-3'>
          <div
            className='w-8 h-8 rounded-full flex items-center justify-center text-[13px] font-bold'
            style={{
              background: "var(--gold)",
              color: "white",
              fontFamily: "var(--font-body)",
            }}>
            A
          </div>
          <div>
            <div
              style={{
                fontFamily: "var(--font-body)",
                fontSize: 12,
                fontWeight: 500,
                color: "rgba(255,255,255,0.85)",
              }}>
              Administrator
            </div>
            <div
              style={{
                fontFamily: "var(--font-body)",
                fontSize: 10,
                color: "rgba(255,255,255,0.35)",
              }}>
              admin@meherva.com
            </div>
          </div>
        </div>
        <button
          onClick={logout}
          className='w-full flex items-center gap-2 px-3 py-2 rounded-lg text-[12px] transition-all hover:bg-red-500/10'
          style={{
            fontFamily: "var(--font-body)",
            color: "rgba(255,255,255,0.4)",
            border: "1px solid rgba(255,255,255,0.08)",
          }}>
          <LogOut size={13} /> Logout
        </button>
      </div>
    </div>
  );
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [authed, setAuthed] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const isLoginRoute = pathname === "/login";

  useEffect(() => {
    const isAuthed = Boolean(sessionStorage.getItem("meherva_admin"));

    if (isAuthed) {
      setAuthed(true);
      if (isLoginRoute) {
        router.replace("/dashboard");
      }
    } else if (!isLoginRoute) {
      router.replace("/login");
    }
  }, [router, pathname, isLoginRoute]);

  const logout = () => {
    sessionStorage.removeItem("meherva_admin");
    router.push("/login");
  };

  if (!authed && !isLoginRoute) return null;

  return (
    <div
      className='flex h-screen overflow-hidden'
      style={{ background: "var(--cream)" }}>
      {/* Desktop sidebar */}
      <div
        className='hidden md:flex flex-col'
        style={{ width: 220, flexShrink: 0 }}>
        <Sidebar
          pathname={pathname}
          setSidebarOpen={setSidebarOpen}
          logout={logout}
        />
      </div>

      {/* Mobile sidebar */}
      {sidebarOpen && (
        <div className='fixed inset-0 z-50 flex md:hidden'>
          <div
            className='absolute inset-0 bg-black/50'
            onClick={() => setSidebarOpen(false)}
          />
          <div className='relative z-10 h-full' style={{ width: 220 }}>
            <Sidebar
              mobile
              pathname={pathname}
              setSidebarOpen={setSidebarOpen}
              logout={logout}
            />
          </div>
        </div>
      )}

      {/* Main content */}
      <div className='flex-1 flex flex-col overflow-hidden'>
        {/* Top bar */}
        <header
          className='flex items-center justify-between px-6 py-4 border-b'
          style={{
            background: "var(--white)",
            borderColor: "var(--beige)",
            flexShrink: 0,
          }}>
          <div className='flex items-center gap-3'>
            <button className='md:hidden' onClick={() => setSidebarOpen(true)}>
              <Menu size={20} style={{ color: "var(--text-mid)" }} />
            </button>
            <div>
              <h1
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: 22,
                  fontWeight: 400,
                  color: "var(--text-dark)",
                }}>
                {navItems.find((n) => n.href === pathname)?.label || "Admin"}
              </h1>
            </div>
          </div>
          <div className='flex items-center gap-3'>
            <div
              className='hidden md:block'
              style={{
                fontFamily: "var(--font-body)",
                fontSize: 12,
                color: "var(--text-light)",
              }}>
              {new Date().toLocaleDateString("en-IN", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </div>
          </div>
        </header>

        {/* Page content */}
        <div className='flex-1 overflow-y-auto p-6'>{children}</div>
      </div>
    </div>
  );
}
