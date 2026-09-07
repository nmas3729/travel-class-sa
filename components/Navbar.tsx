import Link from "next/link";
import MobileMenu from "./MobileMenu";

const NAV_LINKS: Array<[string, string]> = [
  ["HOME", "/"],
  ["HOLIDAYS", "/holidays"],
  ["FLIGHTS", "/flights"],
  ["ACCOMMODATION", "/accommodation"],
  ["TRANSPORT", "/transport"],
  ["CORPORATE", "/corporate"],
  ["GROUP TRAVEL", "/group-travel"],
  ["EXPERIENCES", "/experiences"],
  ["ABOUT", "/about"],
];

export default function Navbar() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-tc-black text-tc-white border-b border-black/[.12]">
      <div className="mx-auto max-w-7xl px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Link href="/" className="inline-flex items-center gap-3" aria-label="Travel Class SA">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-tc-red flex items-center justify-center shadow-sm">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                    <path d="M3 12h18" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M3 6h18" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.6" />
                  </svg>
                </div>
                <div className="flex flex-col leading-none">
                  <span className="text-sm font-semibold">TRAVEL CLASS SA</span>
                  <span className="text-xs text-tc-grey-muted">YOUR JOURNEY. OUR EXPERTISE.</span>
                </div>
              </div>
            </Link>
            <nav className="hidden md:flex items-center gap-6 ml-6" aria-label="Primary">
              {NAV_LINKS.map(([label, href]) => (
                <Link
                  key={label}
                  href={href}
                  className="text-sm font-medium text-tc-white/90 hover:text-tc-red focus:outline-none focus:ring-2 focus:ring-tc-red rounded"
                >
                  {label}
                </Link>
              ))}
            </nav>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-4">
              <Link
                href="/request-quote"
                className="inline-flex items-center px-5 py-2 rounded-full bg-tc-red text-white font-semibold hover:bg-tc-red-dark focus:outline-none focus:ring-2 focus:ring-tc-red"
              >
                REQUEST A QUOTE
              </Link>
            </div>

            <MobileMenu />
          </div>
        </div>
      </div>
    </header>
  );
}
