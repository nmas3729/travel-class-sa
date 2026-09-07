import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section id="home-hero" aria-labelledby="hero-heading" className="bg-tc-black text-white w-full">
      <div className="mx-auto max-w-7xl px-6 py-24 sm:py-28 lg:py-32">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-center">
          {/* Left column: editorial copy */}
          <div className="md:col-span-6 lg:col-span-5">
            <div className="max-w-lg">
              <div className="mb-3 text-xs text-tc-grey-muted uppercase tracking-wider">TRAVEL MANAGEMENT COMPANY</div>

              <h1 id="hero-heading" className="font-extrabold leading-tight tracking-tight text-4xl sm:text-5xl md:text-6xl lg:text-7xl">
                <span className="block mb-3">YOUR JOURNEY.</span>
                <span className="block text-tc-red">OUR EXPERTISE.</span>
              </h1>

              <p className="mt-6 text-sm font-semibold text-tc-grey-muted">WE PLAN. YOU TRAVEL. STRESS-FREE.</p>

              <p className="mt-6 text-base text-tc-grey-muted/90 max-w-prose">
                From flights and accommodation to transfers, group travel, corporate travel and unforgettable
                experiences, Travel Class SA brings your journey together through one trusted travel partner.
              </p>

              <div className="mt-8 flex flex-col sm:flex-row sm:items-center gap-3">
                <Link
                  href="/request-quote"
                  className="inline-flex items-center justify-center px-8 py-3 bg-tc-red text-white rounded-full text-sm font-semibold shadow-[0_8px_30px_rgba(215,25,45,0.15)] hover:bg-tc-red-dark focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-tc-red motion-safe:transition-colors"
                >
                  REQUEST A QUOTE
                </Link>

                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center px-6 py-3 border border-white/20 rounded-full text-white text-sm font-medium hover:bg-white/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-tc-red"
                >
                  SPEAK TO A CONSULTANT
                </Link>
              </div>

              <div className="mt-8 text-sm text-tc-grey-muted">Flights • Holidays • Accommodation • Transport • Corporate • Groups</div>
            </div>
          </div>

          {/* Right column: image with refined accent and editorial overflow */}
          <div className="md:col-span-6 lg:col-span-7">
            <div className="relative flex items-center justify-end">
              {/* Subtle editorial red accent - visible on large screens only */}
              <div className="hidden lg:block absolute -right-28 -top-10 w-[480px] h-[520px] rounded-[40%] bg-gradient-to-br from-tc-red to-tc-red-dark opacity-20 blur-2xl pointer-events-none" aria-hidden />

              <div className="relative w-full max-w-4xl lg:ml-12">
                <div className="overflow-visible rounded-lg shadow-[0_30px_90px_rgba(0,0,0,0.65)]">
                  <Image
                    src="/images/hero-placeholder.svg"
                    alt="Cinematic placeholder representing premium travel experiences"
                    width={1300}
                    height={820}
                    sizes="(max-width: 640px) 90vw, (max-width: 1024px) 50vw, 900px"
                    className="w-full h-auto object-cover block rounded-md"
                    priority
                  />

                  {/* Intentional asymmetric curve overlay */}
                  <svg
                    viewBox="0 0 900 160"
                    className="absolute -left-10 bottom-0 w-[60%] h-28 md:h-36 lg:h-44"
                    preserveAspectRatio="none"
                    aria-hidden
                  >
                    <path d="M0,80 C220,0 680,160 900,80 L900,160 L0,160 Z" fill="#D7192D" opacity="0.12" />
                    <path d="M0,88 C220,8 680,168 900,88 L900,160 L0,160 Z" fill="#D7192D" opacity="0.06" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
