import { NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export async function POST(request: Request) {
  try {
    const { url } = await request.json();

    if (!url) {
      return NextResponse.json({ error: "URL is required" }, { status: 400 });
    }

    // Normalize URL
    let fetchUrl = url.trim();
    if (!fetchUrl.startsWith("http")) {
      fetchUrl = `https://${fetchUrl}`;
    }

    // Fetch the website HTML
    let html: string;
    try {
      const response = await fetch(fetchUrl, {
        headers: {
          "User-Agent":
            "Mozilla/5.0 (compatible; iOLabBrandBot/1.0; +https://iolab.co)",
        },
        signal: AbortSignal.timeout(10000),
      });
      html = await response.text();
      // Truncate to avoid token limits — head section + first chunk of body is enough
      html = html.substring(0, 15000);
    } catch {
      // If we can't fetch, return sensible defaults
      return NextResponse.json({
        businessName: extractDomainName(fetchUrl),
        primaryColor: "#2563eb",
        accentColor: "#f59e0b",
        logoUrl: null,
        fontStyle: "sans-serif",
        industry: "business",
      });
    }

    // Ask Claude to extract brand identity
    const message = await anthropic.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 500,
      messages: [
        {
          role: "user",
          content: `Analyze this website HTML and extract the brand identity. Return ONLY valid JSON with these fields:
{
  "businessName": "The business name",
  "primaryColor": "#hex color (the main brand color from the site)",
  "accentColor": "#hex color (secondary/accent color)",
  "logoUrl": "absolute URL to the logo image, or null if not found",
  "fontStyle": "sans-serif" or "serif" or "rounded",
  "industry": "one word describing their industry (e.g. plumbing, dental, restaurant, legal, realestate, construction)"
}

Important: For logoUrl, make sure it's an absolute URL (starts with http). If you find a relative path like /logo.png, prepend the site's domain. If no clear logo, return null.

Website HTML (truncated):
${html}`,
        },
      ],
    });

    // Extract JSON from Claude's response
    const responseText =
      message.content[0].type === "text" ? message.content[0].text : "";
    const jsonMatch = responseText.match(/\{[\s\S]*\}/);

    if (!jsonMatch) {
      return NextResponse.json({
        businessName: extractDomainName(fetchUrl),
        primaryColor: "#2563eb",
        accentColor: "#f59e0b",
        logoUrl: null,
        fontStyle: "sans-serif",
        industry: "business",
      });
    }

    const brandData = JSON.parse(jsonMatch[0]);

    return NextResponse.json(brandData);
  } catch (error) {
    console.error("Brand extraction error:", error);
    return NextResponse.json(
      { error: "Failed to extract brand" },
      { status: 500 }
    );
  }
}

function extractDomainName(url: string): string {
  try {
    const hostname = new URL(url).hostname;
    // Remove www. and .com/.net/etc, capitalize
    const name = hostname
      .replace(/^www\./, "")
      .replace(/\.(com|net|org|co|io|biz)$/, "");
    return name.charAt(0).toUpperCase() + name.slice(1);
  } catch {
    return "Your Business";
  }
}
