export type SaaSTool = {
  id: string;
  name: string;
  category: string;
  defaultMonthlyCost: number;
  defaultSeats: number;
  perSeat: boolean; // true = cost multiplied by seats
  customReplacement: string; // what iOLab builds instead
  customBuildCost: number; // one-time build cost estimate
};

export const SAAS_TOOLS: SaaSTool[] = [
  // CRM
  { id: "salesforce", name: "Salesforce", category: "CRM", defaultMonthlyCost: 75, defaultSeats: 5, perSeat: true, customReplacement: "Custom CRM", customBuildCost: 30000 },
  { id: "hubspot", name: "HubSpot", category: "CRM", defaultMonthlyCost: 45, defaultSeats: 5, perSeat: true, customReplacement: "Custom CRM", customBuildCost: 28000 },
  { id: "zoho", name: "Zoho CRM", category: "CRM", defaultMonthlyCost: 35, defaultSeats: 5, perSeat: true, customReplacement: "Custom CRM", customBuildCost: 25000 },
  { id: "pipedrive", name: "Pipedrive", category: "CRM", defaultMonthlyCost: 50, defaultSeats: 5, perSeat: true, customReplacement: "Custom CRM", customBuildCost: 25000 },

  // Project Management
  { id: "monday", name: "Monday.com", category: "Project Management", defaultMonthlyCost: 12, defaultSeats: 10, perSeat: true, customReplacement: "Custom Project Manager", customBuildCost: 22000 },
  { id: "asana", name: "Asana", category: "Project Management", defaultMonthlyCost: 11, defaultSeats: 10, perSeat: true, customReplacement: "Custom Project Manager", customBuildCost: 20000 },
  { id: "clickup", name: "ClickUp", category: "Project Management", defaultMonthlyCost: 7, defaultSeats: 10, perSeat: true, customReplacement: "Custom Project Manager", customBuildCost: 20000 },

  // Customer Support
  { id: "zendesk", name: "Zendesk", category: "Customer Support", defaultMonthlyCost: 55, defaultSeats: 5, perSeat: true, customReplacement: "Custom Support System", customBuildCost: 18000 },
  { id: "intercom", name: "Intercom", category: "Customer Support", defaultMonthlyCost: 74, defaultSeats: 5, perSeat: true, customReplacement: "Custom Support + AI Chat", customBuildCost: 22000 },
  { id: "freshdesk", name: "Freshdesk", category: "Customer Support", defaultMonthlyCost: 35, defaultSeats: 5, perSeat: true, customReplacement: "Custom Support System", customBuildCost: 16000 },

  // Email Marketing
  { id: "mailchimp", name: "Mailchimp", category: "Email Marketing", defaultMonthlyCost: 150, defaultSeats: 1, perSeat: false, customReplacement: "Custom Email System", customBuildCost: 15000 },
  { id: "klaviyo", name: "Klaviyo", category: "Email Marketing", defaultMonthlyCost: 200, defaultSeats: 1, perSeat: false, customReplacement: "Custom Email System", customBuildCost: 15000 },
  { id: "activecampaign", name: "ActiveCampaign", category: "Email Marketing", defaultMonthlyCost: 120, defaultSeats: 1, perSeat: false, customReplacement: "Custom Email System", customBuildCost: 14000 },

  // Scheduling
  { id: "calendly", name: "Calendly", category: "Scheduling", defaultMonthlyCost: 12, defaultSeats: 5, perSeat: true, customReplacement: "Custom Booking System", customBuildCost: 12000 },
  { id: "acuity", name: "Acuity Scheduling", category: "Scheduling", defaultMonthlyCost: 20, defaultSeats: 1, perSeat: false, customReplacement: "Custom Booking System", customBuildCost: 12000 },

  // Accounting/Invoicing
  { id: "quickbooks", name: "QuickBooks", category: "Accounting", defaultMonthlyCost: 80, defaultSeats: 1, perSeat: false, customReplacement: "Custom Invoicing", customBuildCost: 15000 },
  { id: "xero", name: "Xero", category: "Accounting", defaultMonthlyCost: 55, defaultSeats: 1, perSeat: false, customReplacement: "Custom Invoicing", customBuildCost: 14000 },

  // Field Service
  { id: "servicetitan", name: "ServiceTitan", category: "Field Service", defaultMonthlyCost: 400, defaultSeats: 1, perSeat: false, customReplacement: "Custom Field Service Platform", customBuildCost: 40000 },
  { id: "jobber", name: "Jobber", category: "Field Service", defaultMonthlyCost: 150, defaultSeats: 1, perSeat: false, customReplacement: "Custom Field Service Platform", customBuildCost: 30000 },
  { id: "housecallpro", name: "Housecall Pro", category: "Field Service", defaultMonthlyCost: 130, defaultSeats: 1, perSeat: false, customReplacement: "Custom Field Service Platform", customBuildCost: 28000 },

  // Communication
  { id: "slack", name: "Slack", category: "Communication", defaultMonthlyCost: 13, defaultSeats: 10, perSeat: true, customReplacement: "Built-in Team Messaging", customBuildCost: 8000 },
  { id: "twilio", name: "Twilio", category: "Communication", defaultMonthlyCost: 100, defaultSeats: 1, perSeat: false, customReplacement: "Integrated SMS/Voice", customBuildCost: 10000 },

  // Analytics
  { id: "databox", name: "Databox", category: "Analytics", defaultMonthlyCost: 100, defaultSeats: 1, perSeat: false, customReplacement: "Custom Analytics Dashboard", customBuildCost: 12000 },

  // Social Media
  { id: "hootsuite", name: "Hootsuite", category: "Social Media", defaultMonthlyCost: 99, defaultSeats: 1, perSeat: false, customReplacement: "Integrated Social Tools", customBuildCost: 10000 },
  { id: "sproutsocial", name: "Sprout Social", category: "Social Media", defaultMonthlyCost: 249, defaultSeats: 1, perSeat: false, customReplacement: "Integrated Social Tools", customBuildCost: 12000 },
];

export const ANNUAL_PRICE_INCREASE = 0.10; // 10% per year
export const CUSTOM_MONTHLY_HOSTING = 300; // base monthly hosting/support
export const CUSTOM_DISCOUNT_MULTIPLE_TOOLS = 0.15; // 15% discount when replacing 3+ tools
