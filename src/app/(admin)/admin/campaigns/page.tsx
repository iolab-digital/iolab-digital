import { db } from "@/db";
import { demoDripEmails, demoLeads } from "@/db/schema";
import { sql, eq, isNull, and } from "drizzle-orm";
import { getDemoContext } from "@/lib/demo-context";
import { generateDripCampaigns } from "@/lib/demo-mock-data";
import { Mail, CheckCircle2, Clock, XCircle, Send } from "lucide-react";
import { generateDripEmail } from "@/lib/drip-emails";

export const dynamic = "force-dynamic";

async function getCampaignStats() {
  const emailStats = await db
    .select({
      emailNumber: demoDripEmails.emailNumber,
      total: sql<number>`count(*)`,
      sent: sql<number>`count(${demoDripEmails.sentAt})`,
      pending: sql<number>`sum(case when ${demoDripEmails.sentAt} is null and ${demoDripEmails.stopped} = false then 1 else 0 end)`,
      stopped: sql<number>`sum(case when ${demoDripEmails.stopped} = true then 1 else 0 end)`,
    })
    .from(demoDripEmails)
    .groupBy(demoDripEmails.emailNumber)
    .orderBy(demoDripEmails.emailNumber);

  const [activeCampaigns] = await db
    .select({ count: sql<number>`count(DISTINCT ${demoDripEmails.leadId})` })
    .from(demoDripEmails)
    .where(and(isNull(demoDripEmails.sentAt), eq(demoDripEmails.stopped, false)));

  const [completedCampaigns] = await db
    .select({ count: sql<number>`count(DISTINCT ${demoDripEmails.leadId})` })
    .from(demoDripEmails)
    .where(and(eq(demoDripEmails.emailNumber, 7), sql`${demoDripEmails.sentAt} IS NOT NULL`));

  return { emailStats, activeCampaigns: activeCampaigns.count, completedCampaigns: completedCampaigns.count };
}

// Generate sample preview data
const SAMPLE_LEAD = {
  email: "prospect@example.com",
  name: "John",
  businessName: "Acme Plumbing",
  demoType: "crm",
  industry: "plumbing",
};

const EMAIL_LABELS = [
  "Welcome & Demo Recap",
  "SaaS Cost Comparison",
  "Industry Success Story",
  "Hidden Features Reveal",
  "AI Competitive Advantage",
  "Personal Check-in",
  "Final Estimate & CTA",
];

const EMAIL_DELAYS = ["Immediate", "Day 2", "Day 4", "Day 7", "Day 9", "Day 12", "Day 14"];

export default async function AdminCampaignsPage() {
  const demo = await getDemoContext();
  const { emailStats, activeCampaigns, completedCampaigns } = demo.isDemo
    ? generateDripCampaigns(demo.industry!)
    : await getCampaignStats();

  return (
    <div className="p-3 md:p-6 max-w-6xl">
      <h1 className="text-xl md:text-2xl font-bold mb-6">Email Drip Campaigns</h1>

      {/* Overview stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4 mb-8">
        <div className="rounded-xl bg-white border border-gray-200 p-4 flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center">
            <Send className="h-5 w-5 text-blue-600" />
          </div>
          <div>
            <div className="text-2xl font-bold">{activeCampaigns}</div>
            <div className="text-xs text-gray-500">Active Campaigns</div>
          </div>
        </div>
        <div className="rounded-xl bg-white border border-gray-200 p-4 flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-green-50 flex items-center justify-center">
            <CheckCircle2 className="h-5 w-5 text-green-600" />
          </div>
          <div>
            <div className="text-2xl font-bold">{completedCampaigns}</div>
            <div className="text-xs text-gray-500">Completed</div>
          </div>
        </div>
        <div className="rounded-xl bg-white border border-gray-200 p-4 flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-purple-50 flex items-center justify-center">
            <Mail className="h-5 w-5 text-purple-600" />
          </div>
          <div>
            <div className="text-2xl font-bold">7</div>
            <div className="text-xs text-gray-500">Emails in Sequence</div>
          </div>
        </div>
      </div>

      {/* Email sequence breakdown */}
      <div className="rounded-xl bg-white border border-gray-200 mb-8">
        <div className="p-4 border-b border-gray-200">
          <h2 className="font-bold">7-Email Sequence Performance</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left p-3 text-xs font-medium text-gray-500">#</th>
                <th className="text-left p-3 text-xs font-medium text-gray-500">Email</th>
                <th className="text-left p-3 text-xs font-medium text-gray-500">Timing</th>
                <th className="text-center p-3 text-xs font-medium text-gray-500">Sent</th>
                <th className="text-center p-3 text-xs font-medium text-gray-500">Pending</th>
                <th className="text-center p-3 text-xs font-medium text-gray-500">Stopped</th>
              </tr>
            </thead>
            <tbody>
              {[1, 2, 3, 4, 5, 6, 7].map((num) => {
                const stat = emailStats.find((s) => s.emailNumber === num);
                return (
                  <tr key={num} className="border-t border-gray-100">
                    <td className="p-3">
                      <span className="w-6 h-6 rounded-full bg-primary/10 text-primary text-xs font-bold flex items-center justify-center">
                        {num}
                      </span>
                    </td>
                    <td className="p-3 font-medium text-xs">{EMAIL_LABELS[num - 1]}</td>
                    <td className="p-3 text-xs text-gray-500">{EMAIL_DELAYS[num - 1]}</td>
                    <td className="p-3 text-center">
                      <span className="text-xs font-medium text-green-600">{stat?.sent || 0}</span>
                    </td>
                    <td className="p-3 text-center">
                      <span className="text-xs font-medium text-blue-600">{stat?.pending || 0}</span>
                    </td>
                    <td className="p-3 text-center">
                      <span className="text-xs font-medium text-red-500">{stat?.stopped || 0}</span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Email previews */}
      <div className="rounded-xl bg-white border border-gray-200">
        <div className="p-4 border-b border-gray-200">
          <h2 className="font-bold">Email Previews</h2>
          <p className="text-xs text-gray-500 mt-1">Preview of each email with sample data (Acme Plumbing, CRM demo)</p>
        </div>
        <div className="p-4 space-y-4">
          {[1, 2, 3, 4, 5, 6, 7].map((num) => {
            const preview = generateDripEmail(SAMPLE_LEAD, num);
            return (
              <details key={num} className="rounded-lg border border-gray-200 overflow-hidden">
                <summary className="p-3 bg-gray-50 cursor-pointer hover:bg-gray-100 flex items-center gap-3 text-sm font-medium">
                  <span className="w-6 h-6 rounded-full bg-primary/10 text-primary text-xs font-bold flex items-center justify-center shrink-0">
                    {num}
                  </span>
                  <span className="flex-1">{preview.subject}</span>
                  <span className="text-xs text-gray-400">{EMAIL_DELAYS[num - 1]}</span>
                </summary>
                <div className="p-4 border-t border-gray-200 bg-white">
                  <div className="text-xs text-gray-500 mb-2">
                    <strong>From:</strong> {preview.from}<br />
                    <strong>Subject:</strong> {preview.subject}
                  </div>
                  <div
                    className="border border-gray-200 rounded-lg p-4 text-sm"
                    dangerouslySetInnerHTML={{ __html: preview.html }}
                  />
                </div>
              </details>
            );
          })}
        </div>
      </div>
    </div>
  );
}
