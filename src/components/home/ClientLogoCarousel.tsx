import Image from "next/image";

const CLIENT_LOGOS = [
  { name: "Allenberry Resort", src: "/images/clients/allenberry.png" },
  { name: "Mudhen Brewing", src: "/images/clients/mudhen.png" },
  { name: "Homeland Industrial", src: "/images/clients/homeland.png" },
  { name: "The Hen Houses", src: "/images/clients/henhouses.png" },
  { name: "Poppi's", src: "/images/clients/poppis.png" },
  { name: "Villa Buena Onda", src: "/images/clients/vbo.png" },
  { name: "Sand Hills Casino", src: "/images/clients/sandhills.png" },
  { name: "South Beach Casino", src: "/images/clients/southbeach.png" },
  { name: "Hammont", src: "/images/clients/hammont.png" },
  { name: "Tappd", src: "/images/clients/tappd.png" },
];

export function ClientLogoCarousel() {
  return (
    <section className="py-12 bg-white border-y border-gray-100 overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-6">
        <p className="text-center text-sm font-medium uppercase tracking-wider text-gray-400">
          Trusted by businesses across industries
        </p>
      </div>

      <div className="relative">
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-white to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-white to-transparent z-10" />

        {/* Scrolling row */}
        <div className="flex animate-logo-scroll gap-16 w-max">
          {[...CLIENT_LOGOS, ...CLIENT_LOGOS].map((logo, i) => (
            <div
              key={`${logo.name}-${i}`}
              className="flex items-center justify-center h-12 w-36 shrink-0 opacity-80 hover:opacity-100 transition-all duration-300"
            >
              <Image
                src={logo.src}
                alt={logo.name}
                width={128}
                height={48}
                className="object-contain h-full w-auto"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
