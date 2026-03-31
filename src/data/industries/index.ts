import type { IndustryPageData } from "@/lib/industry-data";

import { data as restaurants } from "./restaurants";
import { data as contractors } from "./contractors";
import { data as dental } from "./dental";
import { data as homeServices } from "./home-services";
import { data as pestControl } from "./pest-control";
import { data as landscaping } from "./landscaping";
import { data as hvacPlumbing } from "./hvac-plumbing";
import { data as autoShops } from "./auto-shops";
import { data as salons } from "./salons";
import { data as lawFirms } from "./law-firms";
import { data as florists } from "./florists";
import { data as realEstate } from "./real-estate";

const INDUSTRY_MAP: Record<string, IndustryPageData> = {
  restaurants,
  contractors,
  dental,
  "home-services": homeServices,
  "pest-control": pestControl,
  landscaping,
  "hvac-plumbing": hvacPlumbing,
  "auto-shops": autoShops,
  salons,
  "law-firms": lawFirms,
  florists,
  "real-estate": realEstate,
};

export const ALL_INDUSTRY_SLUGS = Object.keys(INDUSTRY_MAP);

export function getIndustryData(slug: string): IndustryPageData | undefined {
  return INDUSTRY_MAP[slug];
}
