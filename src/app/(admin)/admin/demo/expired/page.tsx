import { Clock, ArrowRight, Phone, Mail } from "lucide-react";

export default function DemoExpiredPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-950">
      <div className="text-center max-w-md mx-4">
        <div className="w-16 h-16 rounded-2xl bg-amber-500/10 flex items-center justify-center mx-auto mb-6">
          <Clock className="h-8 w-8 text-amber-400" />
        </div>
        <h1 className="text-2xl font-bold text-white font-display mb-3">
          Demo Link Expired
        </h1>
        <p className="text-gray-400 text-sm mb-8">
          This demo link has expired after 24 hours. If you&apos;d like a new
          demo or want to discuss building a custom platform for your business,
          we&apos;d love to chat.
        </p>
        <a
          href="https://iolab.co/contact"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-white font-semibold text-sm hover:bg-primary/90 mb-6"
        >
          Book a Free Consultation <ArrowRight className="h-4 w-4" />
        </a>
        <div className="flex flex-col items-center gap-2 text-sm text-gray-500">
          <a href="tel:+16092001127" className="flex items-center gap-1.5 hover:text-white">
            <Phone className="h-3.5 w-3.5" /> (609) 200-1127
          </a>
          <a href="mailto:hello@iolab.co" className="flex items-center gap-1.5 hover:text-white">
            <Mail className="h-3.5 w-3.5" /> hello@iolab.co
          </a>
        </div>
      </div>
    </div>
  );
}
