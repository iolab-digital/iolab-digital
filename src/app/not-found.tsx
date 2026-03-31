import Link from "next/link";
import { TopBar } from "@/components/layout/TopBar";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export default function NotFound() {
  return (
    <>
      <TopBar />
      <Navbar />
      <main className="flex-1 flex items-center justify-center py-24">
        <div className="text-center">
          <h1 className="text-8xl font-bold font-display text-primary mb-4">
            404
          </h1>
          <h2 className="text-2xl font-semibold mb-4">Page Not Found</h2>
          <p className="text-gray-500 mb-8 max-w-md mx-auto">
            Looks like this page took a detour. Let&apos;s get you back on
            track.
          </p>
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-lg bg-primary text-white font-semibold px-8 py-3 hover:bg-primary-dark transition-colors"
          >
            Back to Home
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
