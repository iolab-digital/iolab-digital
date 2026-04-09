import { TopBar } from "@/components/layout/TopBar";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ExitIntentPopup } from "@/components/shared/ExitIntentPopup";
import { StickyCTA } from "@/components/shared/StickyCTA";


export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[100] focus:px-4 focus:py-2 focus:rounded-lg focus:bg-primary focus:text-white focus:text-sm focus:font-medium focus:shadow-lg"
      >
        Skip to content
      </a>
      <TopBar />
      <Navbar />
      <main id="main" className="flex-1">{children}</main>
      <Footer />
      <ExitIntentPopup />
      <StickyCTA />

    </>
  );
}
