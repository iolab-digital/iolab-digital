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
      <TopBar />
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
      <ExitIntentPopup />
      <StickyCTA />
    </>
  );
}
