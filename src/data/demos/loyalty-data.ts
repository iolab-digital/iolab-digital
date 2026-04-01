export type Tier = {
  name: string;
  minPoints: number;
  color: string;
  perks: string[];
};

export type Reward = {
  id: number;
  name: string;
  cost: number;
  category: string;
};

export type Transaction = {
  id: number;
  type: "earned" | "redeemed";
  description: string;
  points: number;
  date: string;
};

export type Referral = {
  name: string;
  date: string;
  bonus: number;
  status: "joined" | "pending";
};

export const TIERS: Tier[] = [
  { name: "Bronze", minPoints: 0, color: "#CD7F32", perks: ["5% off every visit", "Birthday reward"] },
  { name: "Silver", minPoints: 500, color: "#C0C0C0", perks: ["10% off every visit", "Birthday reward", "Free monthly upgrade"] },
  { name: "Gold", minPoints: 1500, color: "#FFD700", perks: ["15% off every visit", "Birthday reward", "Free monthly upgrade", "VIP events access"] },
  { name: "Platinum", minPoints: 3000, color: "#E5E4E2", perks: ["20% off every visit", "Birthday reward", "Free weekly upgrade", "VIP events", "Priority booking"] },
];

export const MEMBER = {
  name: "Sarah Johnson",
  email: "sarah@example.com",
  points: 1820,
  tier: "Gold",
  tierColor: "#FFD700",
  memberSince: "March 2024",
  totalSpent: 4250,
  visits: 47,
  nextTier: "Platinum",
  nextTierPoints: 3000,
  birthdayReward: { available: true, expiresIn: "12 days" },
};

export const REWARDS: Reward[] = [
  { id: 1, name: "Free Coffee/Drink", cost: 100, category: "Drinks" },
  { id: 2, name: "10% Off Next Visit", cost: 200, category: "Discounts" },
  { id: 3, name: "Free Appetizer/Add-on", cost: 300, category: "Food" },
  { id: 4, name: "25% Off Any Service", cost: 500, category: "Discounts" },
  { id: 5, name: "Free Premium Service", cost: 800, category: "Services" },
  { id: 6, name: "VIP Experience", cost: 1500, category: "Experiences" },
  { id: 7, name: "Free Gift Card ($25)", cost: 1000, category: "Gifts" },
  { id: 8, name: "Exclusive Member Merch", cost: 600, category: "Gifts" },
];

export const TRANSACTIONS: Transaction[] = [
  { id: 1, type: "earned", description: "Visit — Standard Service", points: 50, date: "Today" },
  { id: 2, type: "redeemed", description: "Free Coffee/Drink", points: -100, date: "Yesterday" },
  { id: 3, type: "earned", description: "Visit — Premium Service", points: 100, date: "3 days ago" },
  { id: 4, type: "earned", description: "Referral bonus (Mike T.)", points: 200, date: "1 week ago" },
  { id: 5, type: "earned", description: "Visit — Standard Service", points: 50, date: "1 week ago" },
  { id: 6, type: "redeemed", description: "10% Off Next Visit", points: -200, date: "2 weeks ago" },
  { id: 7, type: "earned", description: "Visit — Standard Service", points: 50, date: "2 weeks ago" },
  { id: 8, type: "earned", description: "Double points promotion", points: 100, date: "3 weeks ago" },
  { id: 9, type: "earned", description: "Visit — Premium Service", points: 100, date: "3 weeks ago" },
  { id: 10, type: "earned", description: "Referral bonus (Lisa C.)", points: 200, date: "1 month ago" },
];

export const REFERRALS: Referral[] = [
  { name: "Mike Torres", date: "1 week ago", bonus: 200, status: "joined" },
  { name: "Lisa Chen", date: "1 month ago", bonus: 200, status: "joined" },
  { name: "James Wilson", date: "3 days ago", bonus: 200, status: "pending" },
];
