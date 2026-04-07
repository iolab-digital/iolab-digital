import { headers } from "next/headers";

export async function getDemoContext(): Promise<{
  isDemo: boolean;
  industry: string | null;
  prospectName: string | null;
}> {
  try {
    const h = await headers();
    const demoMode = h.get("x-demo-mode");
    const prospectName = h.get("x-demo-prospect");

    if (demoMode) {
      return { isDemo: true, industry: demoMode, prospectName: prospectName || null };
    }
  } catch {
    // Not in a server component context
  }

  return { isDemo: false, industry: null, prospectName: null };
}
