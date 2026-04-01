import { db } from "@/db";
import { contacts } from "@/db/schema";
import { desc } from "drizzle-orm";
import { Mail, Phone, Building2, Calendar, MessageSquare } from "lucide-react";

export const dynamic = "force-dynamic";

async function getContacts() {
  return db
    .select()
    .from(contacts)
    .orderBy(desc(contacts.createdAt))
    .limit(100);
}

const STATUS_STYLES: Record<string, string> = {
  new: "bg-blue-100 text-blue-700",
  contacted: "bg-amber-100 text-amber-700",
  qualified: "bg-purple-100 text-purple-700",
  won: "bg-green-100 text-green-700",
  lost: "bg-gray-100 text-gray-500",
};

export default async function AdminContactsPage() {
  const contactList = await getContacts();

  return (
    <div className="p-6 max-w-6xl">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Contact Form Submissions</h1>
        <span className="text-sm text-gray-500">{contactList.length} total</span>
      </div>

      <div className="rounded-xl bg-white border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left p-3 text-xs font-medium text-gray-500">Name</th>
                <th className="text-left p-3 text-xs font-medium text-gray-500">Contact</th>
                <th className="text-left p-3 text-xs font-medium text-gray-500">Company</th>
                <th className="text-left p-3 text-xs font-medium text-gray-500">Service</th>
                <th className="text-left p-3 text-xs font-medium text-gray-500">Status</th>
                <th className="text-left p-3 text-xs font-medium text-gray-500">Date</th>
                <th className="text-left p-3 text-xs font-medium text-gray-500">Message</th>
              </tr>
            </thead>
            <tbody>
              {contactList.map((contact) => (
                <tr key={contact.id} className="border-t border-gray-100 hover:bg-gray-50">
                  <td className="p-3 font-medium">{contact.name}</td>
                  <td className="p-3">
                    <div className="space-y-0.5">
                      <div className="text-[11px] flex items-center gap-1 text-gray-500">
                        <Mail className="h-3 w-3" />
                        <a href={`mailto:${contact.email}`} className="hover:text-primary">{contact.email}</a>
                      </div>
                      {contact.phone && (
                        <div className="text-[11px] flex items-center gap-1 text-gray-500">
                          <Phone className="h-3 w-3" /> {contact.phone}
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="p-3">
                    {contact.company ? (
                      <span className="text-xs flex items-center gap-1 text-gray-500">
                        <Building2 className="h-3 w-3" /> {contact.company}
                      </span>
                    ) : (
                      <span className="text-gray-300 text-xs">—</span>
                    )}
                  </td>
                  <td className="p-3">
                    {contact.serviceInterest ? (
                      <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-primary/10 text-primary">
                        {contact.serviceInterest}
                      </span>
                    ) : (
                      <span className="text-gray-300 text-xs">—</span>
                    )}
                  </td>
                  <td className="p-3">
                    <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${STATUS_STYLES[contact.status] || STATUS_STYLES.new}`}>
                      {contact.status}
                    </span>
                  </td>
                  <td className="p-3 text-xs text-gray-400">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {contact.createdAt.toLocaleDateString()}
                    </div>
                  </td>
                  <td className="p-3">
                    <div className="max-w-xs truncate text-xs text-gray-500 flex items-center gap-1">
                      <MessageSquare className="h-3 w-3 shrink-0" />
                      {contact.message}
                    </div>
                  </td>
                </tr>
              ))}
              {contactList.length === 0 && (
                <tr>
                  <td colSpan={7} className="p-12 text-center text-gray-400">
                    No contact submissions yet.
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
