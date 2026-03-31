"use client";

import { useEffect, useRef } from "react";

function markdownToHtml(md: string): string {
  let html = md;

  // Headers
  html = html.replace(/^### (.+)$/gm, '<h3 class="text-xl font-bold font-display mt-8 mb-3">$1</h3>');
  html = html.replace(/^## (.+)$/gm, '<h2 class="text-2xl font-bold font-display mt-10 mb-4">$1</h2>');

  // Bold and italic
  html = html.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
  html = html.replace(/\*(.+?)\*/g, "<em>$1</em>");

  // Links
  html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-primary underline hover:text-primary/80">$1</a>');

  // Unordered lists
  html = html.replace(
    /(?:^- .+\n?)+/gm,
    (match) => {
      const items = match
        .trim()
        .split("\n")
        .map((line) => `<li class="ml-6 list-disc text-gray-600">${line.replace(/^- /, "")}</li>`)
        .join("\n");
      return `<ul class="space-y-2 my-4">${items}</ul>`;
    }
  );

  // Ordered lists
  html = html.replace(
    /(?:^\d+\. .+\n?)+/gm,
    (match) => {
      const items = match
        .trim()
        .split("\n")
        .map((line) => `<li class="ml-6 list-decimal text-gray-600">${line.replace(/^\d+\. /, "")}</li>`)
        .join("\n");
      return `<ol class="space-y-2 my-4">${items}</ol>`;
    }
  );

  // Blockquotes
  html = html.replace(
    /(?:^> .+\n?)+/gm,
    (match) => {
      const text = match.replace(/^> /gm, "").trim();
      return `<blockquote class="border-l-4 border-primary pl-4 py-2 my-6 text-gray-700 italic">${text}</blockquote>`;
    }
  );

  // Horizontal rules
  html = html.replace(/^---$/gm, '<hr class="my-8 border-gray-200" />');

  // Paragraphs — wrap lines that aren't already wrapped in HTML tags
  html = html
    .split("\n\n")
    .map((block) => {
      const trimmed = block.trim();
      if (!trimmed) return "";
      if (trimmed.startsWith("<")) return trimmed;
      return `<p class="text-gray-600 leading-relaxed mb-4">${trimmed.replace(/\n/g, " ")}</p>`;
    })
    .join("\n");

  return html;
}

export function BlogContent({ content }: { content: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current) {
      ref.current.innerHTML = markdownToHtml(content);
    }
  }, [content]);

  return <div ref={ref} className="blog-content" />;
}
