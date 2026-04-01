export type ChatOption = {
  label: string;
  userMessage: string;
  botResponse: string;
  aiProcess: string[];
  followUps?: ChatOption[];
};

export const INITIAL_BOT_MESSAGE =
  "Hi! 👋 I'm the AI assistant for this business. I can help you book appointments, answer questions, or connect you with our team. What can I help you with?";

export const CHAT_OPTIONS: ChatOption[] = [
  {
    label: "📅 Book an appointment",
    userMessage: "I'd like to book an appointment",
    botResponse:
      "I'd be happy to help you book an appointment! We have openings this week on Tuesday at 10am, Wednesday at 2pm, and Thursday at 11am. Which works best for you?",
    aiProcess: [
      "Intent detected: appointment_booking",
      "Checking calendar API for available slots...",
      "Found 3 available slots this week",
      "Generating response with options",
    ],
    followUps: [
      {
        label: "Tuesday at 10am",
        userMessage: "Tuesday at 10am works for me",
        botResponse:
          "Great! I've reserved Tuesday at 10am for you. Can I get your name and phone number to confirm the booking? You'll receive a text confirmation and a reminder 24 hours before.",
        aiProcess: [
          "Intent: confirm_slot",
          "Reserving slot: Tuesday 10:00 AM",
          "Requesting contact info for confirmation",
          "Preparing SMS confirmation template",
        ],
      },
      {
        label: "Do you have weekend hours?",
        userMessage: "Do you have any weekend availability?",
        botResponse:
          "We're open Saturdays from 9am to 3pm! This Saturday we have openings at 9am, 11am, and 1pm. Would any of those work for you?",
        aiProcess: [
          "Intent: weekend_availability",
          "Checking Saturday schedule...",
          "Found 3 Saturday slots",
          "Business hours: Sat 9am-3pm",
        ],
      },
    ],
  },
  {
    label: "💰 What are your prices?",
    userMessage: "What are your prices?",
    botResponse:
      "Our pricing depends on the service you need. Here's a quick overview:\n\n• Basic Service: $75-$125\n• Standard Package: $150-$250\n• Premium Package: $300-$500\n\nWould you like more details on a specific service, or would you prefer a custom quote?",
    aiProcess: [
      "Intent detected: pricing_inquiry",
      "Loading pricing data from CRM...",
      "No specific service mentioned — showing overview",
      "Adding upsell prompt for custom quote",
    ],
    followUps: [
      {
        label: "I need a custom quote",
        userMessage: "Can I get a custom quote?",
        botResponse:
          "Absolutely! To give you an accurate quote, I'll need a few details. Could you tell me:\n\n1. What service are you interested in?\n2. Any specific requirements or preferences?\n3. What's your timeline?\n\nOr if you prefer, I can connect you directly with our team for a free consultation. Would you like me to schedule that?",
        aiProcess: [
          "Intent: custom_quote_request",
          "Switching to lead capture flow",
          "Preparing qualification questions",
          "Flagging as high-intent lead in CRM",
        ],
      },
    ],
  },
  {
    label: "🕐 What are your hours?",
    userMessage: "What are your hours?",
    botResponse:
      "We're open:\n\n• Monday-Friday: 8am - 6pm\n• Saturday: 9am - 3pm\n• Sunday: Closed\n\nIs there anything else I can help you with?",
    aiProcess: [
      "Intent detected: business_hours",
      "Loading hours from business profile",
      "Simple FAQ response — no CRM lookup needed",
    ],
  },
  {
    label: "🆘 I have an emergency",
    userMessage: "I have an emergency situation",
    botResponse:
      "I understand this is urgent. Let me connect you with our emergency line right away. Our on-call team member can be reached at (555) 999-0000 and typically responds within 5 minutes.\n\nWould you also like me to create an emergency ticket so our team has the details ready when they call you back?",
    aiProcess: [
      "Intent detected: EMERGENCY",
      "⚠️ Priority escalation triggered",
      "Routing to on-call team member",
      "Bypassing standard queue — immediate response",
      "Creating emergency ticket in CRM",
    ],
  },
];
