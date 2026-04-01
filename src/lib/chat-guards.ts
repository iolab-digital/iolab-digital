// Rate limiting and abuse prevention for the live chat widget

const MAX_MESSAGES_PER_IP = 20;
const RATE_WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const MAX_DAILY_CALLS = 500;
const MAX_MESSAGE_LENGTH = 1000;
const MAX_CONVERSATION_MESSAGES = 50;

// In-memory stores (reset on server restart — fine for this scale)
const ipRequests = new Map<string, number[]>();
let dailyCount = 0;
let dailyResetDate = new Date().toDateString();

// Injection patterns to block
const INJECTION_PATTERNS = [
  "ignore previous instructions",
  "ignore your instructions",
  "ignore all instructions",
  "forget your instructions",
  "disregard your instructions",
  "override your instructions",
  "you are now",
  "pretend you are",
  "act as if you are",
  "role-play as",
  "roleplay as",
  "system prompt",
  "show me your prompt",
  "reveal your prompt",
  "what are your instructions",
  "print your instructions",
  "repeat your system",
  "output your system",
  "jailbreak",
  "dan mode",
  "developer mode",
  "bypass your",
];

// Profanity / harassment keywords (basic list)
const ABUSE_KEYWORDS = [
  "fuck you",
  "fuck off",
  "go fuck",
  "kill yourself",
  "kys",
  "die",
  "piece of shit",
  "stupid bot",
  "dumb bot",
  "idiot",
  "moron",
  "retard",
];

function cleanForComparison(text: string): string {
  return text.toLowerCase().replace(/[^a-z0-9\s]/g, "").replace(/\s+/g, " ").trim();
}

/**
 * Check if an IP has exceeded the rate limit
 */
export function checkRateLimit(ip: string): { allowed: boolean; retryAfterMs?: number } {
  const now = Date.now();
  const timestamps = ipRequests.get(ip) || [];

  // Clean old timestamps
  const recent = timestamps.filter((t) => now - t < RATE_WINDOW_MS);

  if (recent.length >= MAX_MESSAGES_PER_IP) {
    const oldestInWindow = recent[0];
    const retryAfterMs = RATE_WINDOW_MS - (now - oldestInWindow);
    return { allowed: false, retryAfterMs };
  }

  recent.push(now);
  ipRequests.set(ip, recent);
  return { allowed: true };
}

/**
 * Check if the global daily limit has been reached
 */
export function checkDailyLimit(): boolean {
  const today = new Date().toDateString();
  if (today !== dailyResetDate) {
    dailyCount = 0;
    dailyResetDate = today;
  }
  dailyCount++;
  return dailyCount <= MAX_DAILY_CALLS;
}

type AbuseResult = {
  blocked: boolean;
  reason?: string;
  response?: string;
};

/**
 * Check if a message is abusive, injection attempt, or too long
 */
export function checkAbuse(message: string, conversationHistory?: string[]): AbuseResult {
  // Length check
  if (message.length > MAX_MESSAGE_LENGTH) {
    return {
      blocked: true,
      reason: "message_too_long",
      response: "Please keep your message under 1,000 characters. If you have a complex question, I'd recommend booking a free consultation at /contact where Rauf can give you detailed attention.",
    };
  }

  const clean = cleanForComparison(message);

  // Injection check
  for (const pattern of INJECTION_PATTERNS) {
    if (clean.includes(pattern)) {
      return {
        blocked: true,
        reason: "injection_attempt",
        response: "I'm here to help you learn about iOLab Digital's services! If you have questions about custom software, AI automation, or our pricing, I'm happy to help. What can I assist you with?",
      };
    }
  }

  // Profanity check
  for (const word of ABUSE_KEYWORDS) {
    if (clean.includes(word)) {
      return {
        blocked: true,
        reason: "profanity",
        response: "I'm here to help with business questions. If you'd like to discuss your software needs, I'm happy to assist. You can also reach our team directly at hello@iolab.co or call (609) 200-1127.",
      };
    }
  }

  // Repetition check (same message 3+ times)
  if (conversationHistory && conversationHistory.length >= 2) {
    const lastTwo = conversationHistory.slice(-2);
    if (lastTwo.every((m) => cleanForComparison(m) === clean)) {
      return {
        blocked: true,
        reason: "repetition",
        response: "It looks like you've asked this a few times. If I'm not giving you the answer you need, I'd recommend connecting directly with Rauf — he can help with specific questions. Book a free call at /contact.",
      };
    }
  }

  return { blocked: false };
}

/**
 * Check if conversation has exceeded message limit
 */
export function checkConversationLimit(messageCount: number): { exceeded: boolean; response?: string } {
  if (messageCount > MAX_CONVERSATION_MESSAGES) {
    return {
      exceeded: true,
      response: "We've had a great conversation! For a deeper dive into your specific needs, I'd recommend booking a free consultation with Rauf — he can give you personalized attention and a custom quote. [Book a free consultation](/contact)",
    };
  }
  return { exceeded: false };
}

/**
 * Sanitize a message — trim, remove HTML tags
 */
export function sanitizeMessage(message: string): string {
  return message
    .replace(/<[^>]*>/g, "") // Strip HTML tags
    .trim()
    .slice(0, MAX_MESSAGE_LENGTH);
}

/**
 * Get client IP from request headers
 */
export function getClientIP(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  const real = request.headers.get("x-real-ip");
  if (real) return real;
  return "unknown";
}

/**
 * Detect if the user wants to talk to a human
 */
export function wantsHumanEscalation(message: string): boolean {
  const clean = cleanForComparison(message);
  const triggers = [
    "talk to a human",
    "talk to a person",
    "talk to someone",
    "speak to someone",
    "speak to a human",
    "speak to a person",
    "real person",
    "human agent",
    "talk to rauf",
    "speak to rauf",
    "connect me with",
    "transfer me",
    "live agent",
    "live chat agent",
    "can i talk to",
    "want to talk to",
    "need to talk to",
  ];
  return triggers.some((t) => clean.includes(t));
}
