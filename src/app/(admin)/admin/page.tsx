import { db } from "@/db";
import { demoLeads, demoDripEmails, contacts } from "@/db/schema";
import { sql, eq, gte, desc } from "drizzle-orm";
import { getDemoContext } from "@/lib/demo-context";
import { generateDashboardStats } from "@/lib/demo-mock-data";
import {
  Users,
  Mail,
  MessageSquare,
  TrendingUp,
  FileText,
} from "lucide-react";
import Link from "next/link";
import { getAllPostsIncludingDrafts, getDraftPosts } from "@/lib/blog";

export const dynamic = "force-dynamic";

async function getStats() {
  const now = new Date();
  const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
  const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

  const [totalLeads] = await db
    .select({ count: sql<number>`count(*)` })
    .from(demoLeads);

  const [weekLeads] = await db
    .select({ count: sql<number>`count(*)` })
    .from(demoLeads)
    .where(gte(demoLeads.createdAt, weekAgo));

  const [monthLeads] = await db
    .select({ count: sql<number>`count(*)` })
    .from(demoLeads)
    .where(gte(demoLeads.createdAt, monthAgo));

  const [leadsWithEmail] = await db
    .select({ count: sql<number>`count(*)` })
    .from(demoLeads)
    .where(sql`${demoLeads.email} IS NOT NULL AND ${demoLeads.email} != ''`);

  const [activeDrips] = await db
    .select({ count: sql<number>`count(DISTINCT ${demoDripEmails.leadId})` })
    .from(demoDripEmails)
    .where(
      sql`${demoDripEmails.sentAt} IS NULL AND ${demoDripEmails.stopped} = false`
    );

  const [totalContacts] = await db
    .select({ count: sql<number>`count(*)` })
    .from(contacts);

  const recentLeads = await db
    .select()
    .from(demoLeads)
    .orderBy(desc(demoLeads.createdAt))
    .limit(10);

  return {
    totalLeads: totalLeads.count,
    weekLeads: weekLeads.count,
    monthLeads: monthLeads.count,
    leadsWithEmail: leadsWithEmail.count,
    activeDrips: activeDrips.count,
    totalContacts: totalContacts.count,
    recentLeads,
  };
}

export default async function AdminDashboardPage() {
  const demo = await getDemoContext();
  const stats = demo.isDemo ? generateDashboardStats(demo.industry!) : await getStats();
  const now = new Date();
  const greeting = now.getHours() < 12 ? "Good morning" : now.getHours() < 18 ? "Good afternoon" : "Good evening";
  const displayName = demo.isDemo ? (demo.prospectName || "there") : "Rauf";

  // Blog stats
  const allBlogPosts = demo.isDemo ? [] : getAllPostsIncludingDrafts();
  const blogDrafts = demo.isDemo ? [] : getDraftPosts();
  const blogPublished = allBlogPosts.length - blogDrafts.length;

  const statCards = [
    { label: "Demo Leads (All Time)", value: stats.totalLeads, icon: Users, color: "text-blue-600 bg-blue-50" },
    { label: "Leads This Week", value: stats.weekLeads, icon: TrendingUp, color: "text-green-600 bg-green-50" },
    { label: "Active Drip Campaigns", value: stats.activeDrips, icon: Mail, color: "text-purple-600 bg-purple-50" },
    { label: "Contact Form Leads", value: stats.totalContacts, icon: MessageSquare, color: "text-orange-600 bg-orange-50" },
    { label: "Blog Posts Published", value: blogPublished, icon: FileText, color: "text-cyan-600 bg-cyan-50" },
    ...(blogDrafts.length > 0 ? [{ label: "Blog Drafts Pending", value: blogDrafts.length, icon: FileText, color: "text-amber-600 bg-amber-50" }] : []),
  ];

  return (
    <div className="p-3 md:p-6 max-w-6xl">
      <div className="mb-6">
        <h1 className="text-xl md:text-2xl font-bold font-display">{greeting}, {displayName}</h1>
        <p className="text-sm text-gray-500">Here&apos;s what&apos;s happening with iOLab Digital today.</p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 mb-8">
        {statCards.map((stat) => (
          <div
            key={stat.label}
            className="rounded-xl bg-white border border-gray-200 p-4"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${stat.color}`}>
                <stat.icon className="h-5 w-5" />
              </div>
              <span className="text-2xl font-bold">{stat.value}</span>
            </div>
            <span className="text-xs text-gray-500">{stat.label}</span>
          </div>
        ))}
      </div>


      {/* Quick links */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4 mb-8">
        <Link href="/admin/leads" className="rounded-xl bg-white border border-gray-200 p-4 hover:border-primary/30 hover:shadow-lg transition-all text-center">
          <Users className="h-6 w-6 mx-auto mb-2 text-blue-500" />
          <span className="text-sm font-medium">View All Demo Leads</span>
        </Link>
        <Link href="/admin/campaigns" className="rounded-xl bg-white border border-gray-200 p-4 hover:border-primary/30 hover:shadow-lg transition-all text-center">
          <Mail className="h-6 w-6 mx-auto mb-2 text-purple-500" />
          <span className="text-sm font-medium">Email Campaigns</span>
        </Link>
        <Link href="/admin/contacts" className="rounded-xl bg-white border border-gray-200 p-4 hover:border-primary/30 hover:shadow-lg transition-all text-center">
          <MessageSquare className="h-6 w-6 mx-auto mb-2 text-orange-500" />
          <span className="text-sm font-medium">Contact Submissions</span>
        </Link>
      </div>

      {/* Recent leads */}
      <div className="rounded-xl bg-white border border-gray-200">
        <div className="p-4 border-b border-gray-200 flex items-center justify-between">
          <h2 className="font-bold">Recent Demo Leads</h2>
          <Link href="/admin/leads" className="text-sm text-primary hover:underline">
            View all →
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left p-3 text-xs font-medium text-gray-500">Business</th>
                <th className="text-left p-3 text-xs font-medium text-gray-500">Demo</th>
                <th className="text-left p-3 text-xs font-medium text-gray-500">Email</th>
                <th className="text-left p-3 text-xs font-medium text-gray-500">Industry</th>
                <th className="text-left p-3 text-xs font-medium text-gray-500">Date</th>
              </tr>
            </thead>
            <tbody>
              {stats.recentLeads.map((lead) => (
                <tr key={lead.id} className="border-t border-gray-100 hover:bg-gray-50">
                  <td className="p-3">
                    <div className="font-medium">{lead.brandData?.businessName || lead.websiteUrl}</div>
                    <div className="text-xs text-gray-400">{lead.websiteUrl}</div>
                  </td>
                  <td className="p-3">
                    <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-primary/10 text-primary">
                      {lead.demoType}
                    </span>
                  </td>
                  <td className="p-3 text-gray-500">{lead.email || "—"}</td>
                  <td className="p-3 text-gray-500">{lead.brandData?.industry || "—"}</td>
                  <td className="p-3 text-gray-400 text-xs">
                    {lead.createdAt.toLocaleDateString()}
                  </td>
                </tr>
              ))}
              {stats.recentLeads.length === 0 && (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-gray-400">
                    No demo leads yet. They&apos;ll appear here when someone uses a demo.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
