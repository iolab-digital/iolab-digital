"use client";

import Image from "next/image";
import type { BrandTheme } from "./DemoGate";

type DemoShellProps = {
  title: string;
  brand?: BrandTheme | null;
  children: React.ReactNode;
};

export function DemoShell({ title, brand, children }: DemoShellProps) {
  const displayTitle = brand ? `${brand.businessName} — ${title}` : title;
  const faviconUrl = brand?.logoUrl;

  return (
    <div className="rounded-2xl border border-gray-200 bg-white shadow-xl shadow-black/5 overflow-hidden">
      {/* Title bar */}
      <div className="flex items-center gap-3 px-4 py-3 bg-gray-50 border-b border-gray-200">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-400" />
          <div className="w-3 h-3 rounded-full bg-yellow-400" />
          <div className="w-3 h-3 rounded-full bg-green-400" />
        </div>
        <div className="flex-1 flex items-center justify-center gap-2">
          {faviconUrl && (
            <Image
              src={faviconUrl}
              alt=""
              width={16}
              height={16}
              className="rounded-sm object-contain"
              unoptimized
            />
          )}
          <span className="text-xs text-gray-500 font-medium truncate max-w-xs">
            {displayTitle}
          </span>
        </div>
        <div className="w-[54px]" /> {/* Spacer to center title */}
      </div>

      {/* Demo content */}
      <div className="min-h-[500px] max-h-[700px] overflow-y-auto">
        {children}
      </div>
    </div>
  );
}
