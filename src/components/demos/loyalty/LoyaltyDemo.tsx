"use client";

import { useState } from "react";
import {
  Star,
  Gift,
  Trophy,
  UserPlus,
  Cake,
  ArrowUp,
  Check,
  Sparkles,
} from "lucide-react";
import {
  MEMBER,
  TIERS,
  REWARDS,
  TRANSACTIONS,
  REFERRALS,
} from "@/data/demos/loyalty-data";
import type { BrandTheme } from "@/components/demos/shared/DemoGate";

type Tab = "rewards" | "history" | "referrals";

export function LoyaltyDemo({ brand }: { brand?: BrandTheme | null }) {
  const [points, setPoints] = useState(MEMBER.points);
  const [activeTab, setActiveTab] = useState<Tab>("rewards");
  const [redeemedIds, setRedeemedIds] = useState<Set<number>>(new Set());
  const [showRedeemAnimation, setShowRedeemAnimation] = useState(false);

  const primary = brand?.primaryColor || "#7B2FF7";
  const bizName = brand?.businessName || "Your Business";

  const tierProgress = ((points - 1500) / (MEMBER.nextTierPoints - 1500)) * 100;

  function handleRedeem(reward: (typeof REWARDS)[0]) {
    if (points < reward.cost || redeemedIds.has(reward.id)) return;
    setPoints((p) => p - reward.cost);
    setRedeemedIds((prev) => new Set([...prev, reward.id]));
    setShowRedeemAnimation(true);
    setTimeout(() => setShowRedeemAnimation(false), 2000);
  }

  return (
    <div className="h-[600px] overflow-y-auto bg-gray-50 text-sm">
      {/* Member header */}
      <div className="text-white p-6" style={{ background: `linear-gradient(135deg, ${primary}, ${primary}dd)` }}>
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="text-xs opacity-70">{bizName} Rewards</div>
            <h2 className="text-lg font-bold">{MEMBER.name}</h2>
            <div className="text-xs opacity-70">Member since {MEMBER.memberSince}</div>
          </div>
          <div className="text-right">
            <div className="flex items-center gap-1.5 mb-1">
              <Trophy className="h-4 w-4" style={{ color: MEMBER.tierColor }} />
              <span className="font-bold" style={{ color: MEMBER.tierColor }}>{MEMBER.tier}</span>
            </div>
            <div className="text-2xl font-bold">{points.toLocaleString()}</div>
            <div className="text-[10px] opacity-70">points</div>
          </div>
        </div>

        {/* Tier progress */}
        <div className="bg-white/10 rounded-lg p-3">
          <div className="flex justify-between text-[10px] mb-1.5 opacity-80">
            <span>{MEMBER.tier} ({points} pts)</span>
            <span>{MEMBER.nextTier} ({MEMBER.nextTierPoints} pts)</span>
          </div>
          <div className="w-full bg-white/20 rounded-full h-2">
            <div className="h-2 rounded-full bg-white transition-all duration-500" style={{ width: `${Math.min(100, Math.max(0, tierProgress))}%` }} />
          </div>
          <div className="text-[10px] opacity-70 mt-1.5 flex items-center gap-1">
            <ArrowUp className="h-3 w-3" /> {MEMBER.nextTierPoints - points} points to {MEMBER.nextTier}
          </div>
        </div>

        {/* Quick stats */}
        <div className="grid grid-cols-3 gap-3 mt-4">
          <div className="bg-white/10 rounded-lg p-2 text-center">
            <div className="text-lg font-bold">{MEMBER.visits}</div>
            <div className="text-[10px] opacity-70">Visits</div>
          </div>
          <div className="bg-white/10 rounded-lg p-2 text-center">
            <div className="text-lg font-bold">${(MEMBER.totalSpent / 1000).toFixed(1)}K</div>
            <div className="text-[10px] opacity-70">Total Spent</div>
          </div>
          <div className="bg-white/10 rounded-lg p-2 text-center">
            <div className="text-lg font-bold">{REFERRALS.filter((r) => r.status === "joined").length}</div>
            <div className="text-[10px] opacity-70">Referrals</div>
          </div>
        </div>

        {/* Birthday reward */}
        {MEMBER.birthdayReward.available && (
          <div className="mt-3 bg-white/10 rounded-lg p-2.5 flex items-center gap-2">
            <Cake className="h-4 w-4 text-amber-300" />
            <span className="text-xs">Birthday reward available! Expires in {MEMBER.birthdayReward.expiresIn}</span>
          </div>
        )}
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-200 bg-white">
        {[
          { id: "rewards" as Tab, label: "Rewards", icon: Gift },
          { id: "history" as Tab, label: "History", icon: Star },
          { id: "referrals" as Tab, label: "Referrals", icon: UserPlus },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 flex items-center justify-center gap-1.5 py-3 text-xs font-medium transition-colors ${activeTab === tab.id ? "border-b-2 text-gray-900" : "text-gray-500"}`}
            style={activeTab === tab.id ? { borderColor: primary } : undefined}
          >
            <tab.icon className="h-3.5 w-3.5" /> {tab.label}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div className="p-4">
        {activeTab === "rewards" && (
          <div className="grid grid-cols-2 gap-3">
            {REWARDS.map((reward) => {
              const canAfford = points >= reward.cost;
              const isRedeemed = redeemedIds.has(reward.id);
              return (
                <div key={reward.id} className={`rounded-xl border p-3 transition-all ${isRedeemed ? "bg-green-50 border-green-200" : canAfford ? "bg-white border-gray-200 hover:border-primary/30" : "bg-gray-50 border-gray-200 opacity-60"}`}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-gray-100 text-gray-500">{reward.category}</span>
                    <span className="text-xs font-bold" style={{ color: primary }}>{reward.cost} pts</span>
                  </div>
                  <h4 className="font-medium text-xs mb-2">{reward.name}</h4>
                  <button
                    onClick={() => handleRedeem(reward)}
                    disabled={!canAfford || isRedeemed}
                    className={`w-full py-1.5 rounded-lg text-[11px] font-medium transition-colors ${isRedeemed ? "bg-green-100 text-green-700" : canAfford ? "text-white" : "bg-gray-200 text-gray-400 cursor-not-allowed"}`}
                    style={canAfford && !isRedeemed ? { background: primary } : undefined}
                  >
                    {isRedeemed ? (
                      <span className="flex items-center justify-center gap-1"><Check className="h-3 w-3" /> Redeemed!</span>
                    ) : canAfford ? "Redeem" : "Not enough points"}
                  </button>
                </div>
              );
            })}
          </div>
        )}

        {activeTab === "history" && (
          <div className="space-y-2">
            {TRANSACTIONS.map((tx) => (
              <div key={tx.id} className="flex items-center justify-between rounded-lg bg-white border border-gray-200 p-3">
                <div>
                  <div className="text-xs font-medium">{tx.description}</div>
                  <div className="text-[10px] text-gray-400">{tx.date}</div>
                </div>
                <span className={`text-sm font-bold ${tx.type === "earned" ? "text-green-600" : "text-red-500"}`}>
                  {tx.type === "earned" ? "+" : ""}{tx.points}
                </span>
              </div>
            ))}
          </div>
        )}

        {activeTab === "referrals" && (
          <div>
            <div className="rounded-xl border-2 border-dashed p-4 text-center mb-4" style={{ borderColor: primary }}>
              <UserPlus className="h-6 w-6 mx-auto mb-2" style={{ color: primary }} />
              <div className="text-xs font-bold mb-1">Refer a Friend, Earn 200 Points</div>
              <div className="text-[10px] text-gray-500">Share your unique link and earn bonus points when they sign up</div>
            </div>
            <h4 className="font-bold text-xs text-gray-500 uppercase tracking-wider mb-2">Your Referrals</h4>
            <div className="space-y-2">
              {REFERRALS.map((ref, i) => (
                <div key={i} className="flex items-center justify-between rounded-lg bg-white border border-gray-200 p-3">
                  <div>
                    <div className="text-xs font-medium">{ref.name}</div>
                    <div className="text-[10px] text-gray-400">{ref.date}</div>
                  </div>
                  <div className="text-right">
                    <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${ref.status === "joined" ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-700"}`}>
                      {ref.status}
                    </span>
                    {ref.status === "joined" && (
                      <div className="text-[10px] text-green-600 mt-0.5">+{ref.bonus} pts</div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Redeem animation */}
      {showRedeemAnimation && (
        <div className="fixed bottom-6 right-6 z-50 rounded-xl bg-green-50 border border-green-200 p-3 shadow-lg flex items-center gap-2 text-xs text-green-700">
          <Sparkles className="h-4 w-4" /> Reward redeemed! Check your email for details.
        </div>
      )}
    </div>
  );
}
