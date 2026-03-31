import { Phone, Mail, MapPin } from "lucide-react";
import { SITE } from "@/lib/constants";

export function TopBar() {
  return (
    <div className="bg-dark text-white text-sm py-2">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <a
            href={`tel:${SITE.phone}`}
            className="flex items-center gap-1.5 hover:text-primary transition-colors"
          >
            <Phone className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">{SITE.phone}</span>
          </a>
          <a
            href={`mailto:${SITE.email}`}
            className="flex items-center gap-1.5 hover:text-primary transition-colors"
          >
            <Mail className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">{SITE.email}</span>
          </a>
          <span className="hidden md:flex items-center gap-1.5 text-gray-400">
            <MapPin className="h-3.5 w-3.5" />
            {SITE.address}
          </span>
        </div>
        <div className="flex items-center gap-4">
          {Object.entries(SITE.social).map(([name, url]) => (
            <a
              key={name}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors capitalize"
            >
              {name === "instagram" ? "IG" : name === "linkedin" ? "LI" : "YT"}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
