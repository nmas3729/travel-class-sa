"use client";

import { useEffect, useRef, useState } from "react";

const NAV_LINKS = [
  ["Home", "/"],
  ["Holidays", "/holidays"],
  ["Flights", "/flights"],
  ["Accommodation", "/accommodation"],
  ["Transport", "/transport"],
  ["Corporate", "/corporate"],
  ["Group Travel", "/group-travel"],
  ["Experiences", "/experiences"],
  ["About", "/about"],
];

export default function MobileMenu() {
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement | null>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    if (open) document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  useEffect(() => {
    if (open) {
      // move focus into panel
      panelRef.current?.focus();
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      triggerRef.current?.focus();
    }
  }, [open]);

  return (
    <div className="md:hidden">
      <button
        ref={triggerRef}
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        onClick={() => setOpen((s) => !s)}
        className="inline-flex items-center justify-center h-10 w-10 rounded-md bg-black text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-tc-red"
      >
        <span className="sr-only">Toggle menu</span>
        {open ? (
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
          </svg>
        )}
      </button>

      {/* Overlay */}
      <div
        aria-hidden={!open}
        className={`fixed inset-0 z-40 transition-opacity duration-300 ${open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
      >
        <div
          ref={panelRef}
          tabIndex={-1}
          role="dialog"
          aria-modal={open}
          className={`fixed inset-0 bg-black/70 backdrop-blur-sm transition-transform duration-300 ${
            open ? "translate-y-0" : "-translate-y-2"
          } flex items-start justify-center`}
          onClick={() => setOpen(false)}
        >
          <nav
            aria-label="Mobile"
            className={`mt-20 w-[90%] max-w-sm bg-white rounded-xl p-6 shadow-lg tc-card transform transition-transform duration-300 ${open ? "scale-100" : "scale-95"}`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex flex-col gap-4">
              {NAV_LINKS.map(([label, href]) => (
                <a
                  key={label}
                  href={href}
                  onClick={() => setOpen(false)}
                  className="block px-3 py-3 rounded-md text-lg font-medium text-tc-grey-dark hover:text-tc-red focus:outline-none focus:ring-2 focus:ring-tc-red"
                >
                  {label}
                </a>
              ))}

              <div className="mt-4 flex flex-col gap-3">
                <a
                  href="/request-quote"
                  onClick={() => setOpen(false)}
                  className="inline-flex items-center justify-center w-full px-4 py-3 text-white bg-tc-red rounded-md font-semibold hover:bg-tc-red-dark focus:outline-none focus:ring-2 focus:ring-tc-red"
                >
                  REQUEST A QUOTE
                </a>
                <a
                  href="/contact"
                  onClick={() => setOpen(false)}
                  className="inline-flex items-center justify-center w-full px-4 py-3 border border-solid border-tc-grey-light rounded-md text-tc-grey-dark font-medium hover:bg-tc-grey-light focus:outline-none focus:ring-2 focus:ring-tc-red"
                >
                  CHAT TO A CONSULTANT
                </a>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </div>
  );
}
