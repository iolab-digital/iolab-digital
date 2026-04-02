"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  Mail,
  MessageSquare,
  FileText,
  MessageCircle,
  Settings,
  LogOut,
} from "lucide-react";

const NAV = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { label: "Demo Leads", href: "/admin/leads", icon: Users },
  { label: "Drip Campaigns", href: "/admin/campaigns", icon: Mail },
  { label: "Contact Leads", href: "/admin/contacts", icon: MessageSquare },
  { label: "Blog Posts", href: "/admin/blog", icon: FileText },
  { label: "Chat Sessions", href: "/admin/chats", icon: MessageCircle },
  { label: "Settings", href: "/admin/settings", icon: Settings },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  async function handleLogout() {
    await fetch("/api/admin/auth", { method: "DELETE" });
    router.push("/admin/login");
  }

  return (
    <aside className="w-56 bg-gray-950 text-white flex flex-col shrink-0 min-h-screen">
      <div className="p-4 border-b border-gray-800">
        <Link href="/admin" className="flex items-center gap-3">
          <Image
            src="https://iolab.nyc3.cdn.digitaloceanspaces.com/images/logo/iolab-logo-latest-white.png"
            alt="iOLab Digital"
            width={100}
            height={32}
            className="h-7 w-auto"
          />
          <span className="text-[9px] font-semibold uppercase tracking-[0.15em] text-gray-500 border-l border-gray-700 pl-3">
            Admin
          </span>
        </Link>
      </div>

      <nav className="flex-1 p-3 space-y-1">
        {NAV.map((item) => {
          const isActive =
            item.href === "/admin"
              ? pathname === "/admin"
              : pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                isActive
                  ? "bg-primary text-white"
                  : "text-gray-400 hover:text-white hover:bg-gray-800"
              }`}
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="p-3 border-t border-gray-800">
        <button
          onClick={handleLogout}
          className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-400 hover:text-white hover:bg-gray-800 w-full transition-colors"
        >
          <LogOut className="h-4 w-4" /> Sign Out
        </button>
        <Link
          href="/"
          className="block text-center text-[10px] text-gray-600 mt-2 hover:text-gray-400"
        >
          ← Back to Website
        </Link>
      </div>
    </aside>
  );
}
