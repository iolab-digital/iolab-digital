import { db } from "@/db";
import { demoLeads, demoDripEmails } from "@/db/schema";
import { desc, eq, sql } from "drizzle-orm";
import { getDemoContext } from "@/lib/demo-context";
import { generateDemoLeads } from "@/lib/demo-mock-data";
import { Globe, Mail, Building2, Tag } from "lucide-react";

export const dynamic = "force-dynamic";

async function getLeads() {
  const leads = await db
    .select()
    .from(demoLeads)
    .orderBy(desc(demoLeads.createdAt))
    .limit(100);

  // Get drip status for each lead
  const leadsWithDrip = await Promise.all(
    leads.map(async (lead) => {
      const [dripStatus] = await db
        .select({
          total: sql<number>`count(*)`,
          sent: sql<number>`count(${demoDripEmails.sentAt})`,
          stopped: sql<number>`sum(case when ${demoDripEmails.stopped} = true then 1 else 0 end)`,
        })
        .from(demoDripEmails)
        .where(eq(demoDripEmails.leadId, lead.id));

      return {
        ...lead,
        drip: {
          total: dripStatus?.total || 0,
          sent: dripStatus?.sent || 0,
          stopped: (dripStatus?.stopped || 0) > 0,
        },
      };
    })
  );

  return leadsWithDrip;
}

export default async function AdminLeadsPage() {
  const demo = await getDemoContext();
  const leads = demo.isDemo ? generateDemoLeads(demo.industry!) : await getLeads();

  return (
    <div className="p-3 md:p-6 max-w-6xl">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl md:text-2xl font-bold">Demo Leads</h1>
        <span className="text-sm text-gray-500">{leads.length} total</span>
      </div>

      {/* Mobile card view */}
      <div className="md:hidden space-y-3">
        {leads.map((lead) => (
          <div key={lead.id} className="rounded-xl bg-white border border-gray-200 p-4 space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {lead.brandData?.primaryColor && (
                  <div className="w-3 h-3 rounded-full shrink-0" style={{ background: lead.brandData.primaryColor }} />
                )}
                <span className="font-medium text-sm">{lead.brandData?.businessName || "Unknown"}</span>
              </div>
              <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-primary/10 text-primary">{lead.demoType}</span>
            </div>
            <div className="text-xs text-gray-400 flex items-center gap-1">
              <Globe className="h-3 w-3" />
              <a href={lead.websiteUrl.startsWith("http") ? lead.websiteUrl : `https://${lead.websiteUrl}`} target="_blank" rel="noopener noreferrer" className="hover:text-primary truncate">{lead.websiteUrl}</a>
            </div>
            <div className="flex items-center justify-between text-xs">
              <div>
                {lead.email ? (
                  <span className="text-gray-600 flex items-center gap-1"><Mail className="h-3 w-3" /> {lead.email}</span>
                ) : (
                  <span className="text-gray-300">No email</span>
                )}
              </div>
              <div className="text-gray-400">{lead.createdAt.toLocaleDateString()}</div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-500 flex items-center gap-1"><Tag className="h-3 w-3" />{lead.brandData?.industry || "—"}</span>
              {lead.drip.total > 0 ? (
                <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${lead.drip.stopped ? "bg-red-100 text-red-600" : lead.drip.sent >= 7 ? "bg-green-100 text-green-600" : "bg-blue-100 text-blue-600"}`}>
                  {lead.drip.stopped ? "Stopped" : lead.drip.sent >= 7 ? "Complete" : "Active"} ({lead.drip.sent}/{lead.drip.total})
                </span>
              ) : (
                <span className="text-[10px] text-gray-300">No drip</span>
              )}
            </div>
          </div>
        ))}
        {leads.length === 0 && (
          <div className="rounded-xl bg-white border border-gray-200 p-12 text-center text-gray-400">No demo leads yet.</div>
        )}
      </div>

      {/* Desktop table view */}
      <div className="hidden md:block rounded-xl bg-white border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left p-3 text-xs font-medium text-gray-500">Business</th>
                <th className="text-left p-3 text-xs font-medium text-gray-500">Contact</th>
                <th className="text-left p-3 text-xs font-medium text-gray-500">Demo</th>
                <th className="text-left p-3 text-xs font-medium text-gray-500">Industry</th>
                <th className="text-left p-3 text-xs font-medium text-gray-500">Drip Status</th>
                <th className="text-left p-3 text-xs font-medium text-gray-500">Date</th>
              </tr>
            </thead>
            <tbody>
              {leads.map((lead) => (
                <tr key={lead.id} className="border-t border-gray-100 hover:bg-gray-50">
                  <td className="p-3">
                    <div className="flex items-center gap-2">
                      {lead.brandData?.primaryColor && (
                        <div className="w-3 h-3 rounded-full shrink-0" style={{ background: lead.brandData.primaryColor }} />
                      )}
                      <div>
                        <div className="font-medium flex items-center gap-1.5">
                          <Building2 className="h-3.5 w-3.5 text-gray-400" />
                          {lead.brandData?.businessName || "Unknown"}
                        </div>
                        <div className="text-[11px] text-gray-400 flex items-center gap-1">
                          <Globe className="h-3 w-3" />
                          <a href={lead.websiteUrl.startsWith("http") ? lead.websiteUrl : `https://${lead.websiteUrl}`} target="_blank" rel="noopener noreferrer" className="hover:text-primary">{lead.websiteUrl}</a>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="p-3">
                    {lead.email ? (
                      <div>
                        <div className="text-xs">{lead.name || "—"}</div>
                        <div className="text-[11px] text-gray-400 flex items-center gap-1"><Mail className="h-3 w-3" /> {lead.email}</div>
                      </div>
                    ) : (
                      <span className="text-gray-300 text-xs">No email</span>
                    )}
                  </td>
                  <td className="p-3">
                    <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-primary/10 text-primary">{lead.demoType}</span>
                  </td>
                  <td className="p-3">
                    <span className="text-xs text-gray-500 flex items-center gap-1"><Tag className="h-3 w-3" />{lead.brandData?.industry || "—"}</span>
                  </td>
                  <td className="p-3">
                    {lead.drip.total > 0 ? (
                      <div>
                        <div className="flex items-center gap-1">
                          {lead.drip.stopped ? (
                            <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-red-100 text-red-600">Stopped</span>
                          ) : lead.drip.sent >= 7 ? (
                            <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-green-100 text-green-600">Complete</span>
                          ) : (
                            <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-blue-100 text-blue-600">Active</span>
                          )}
                        </div>
                        <div className="text-[10px] text-gray-400 mt-0.5">{lead.drip.sent}/{lead.drip.total} sent</div>
                      </div>
                    ) : (
                      <span className="text-[10px] text-gray-300">No drip</span>
                    )}
                  </td>
                  <td className="p-3 text-xs text-gray-400">
                    {lead.createdAt.toLocaleDateString()}<br />
                    {lead.createdAt.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                  </td>
                </tr>
              ))}
              {leads.length === 0 && (
                <tr>
                  <td colSpan={6} className="p-12 text-center text-gray-400">No demo leads yet.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
