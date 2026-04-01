"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  Mail,
  MessageSquare,
  FileText,
  LogOut,
} from "lucide-react";

const NAV = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { label: "Demo Leads", href: "/admin/leads", icon: Users },
  { label: "Drip Campaigns", href: "/admin/campaigns", icon: Mail },
  { label: "Contact Leads", href: "/admin/contacts", icon: MessageSquare },
  { label: "Blog Posts", href: "/admin/blog", icon: FileText },
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
        <Link href="/admin" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-white text-xs font-bold">
            iO
          </div>
          <div>
            <div className="text-sm font-bold">iOLab</div>
            <div className="text-[10px] text-gray-500">Admin Dashboard</div>
          </div>
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
