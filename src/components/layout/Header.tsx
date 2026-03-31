"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";

interface Breadcrumb {
  label: string;
  href: string;
}

interface HeaderProps {
  variant?: "home" | "utility";
  breadcrumbs?: Breadcrumb[];
}

const handleHashClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
  const target = document.querySelector(href);
  if (target) {
    e.preventDefault();
    target.scrollIntoView({ behavior: "smooth" });
  }
};

const Header = ({ variant = "home", breadcrumbs = [] }: HeaderProps) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { t } = useTranslation();
  const headerRef = useRef<HTMLElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  const closeMobile = useCallback(() => setMobileOpen(false), []);

  useEffect(() => {
    if (!mobileOpen) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeMobile();
        toggleRef.current?.focus();
      }
    };

    const handleClickOutside = (e: MouseEvent) => {
      if (headerRef.current && !headerRef.current.contains(e.target as Node)) {
        closeMobile();
      }
    };

    document.addEventListener("keydown", handleEscape);
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [mobileOpen, closeMobile]);

  const homeLinks = [
    { label: t("nav.about"), href: "#about" },
    { label: t("nav.projects"), href: "#projects" },
    { label: t("nav.utilities"), href: "/utilities" },
    { label: t("nav.contact"), href: "#contact" },
  ];

  const utilityLinks = [
    { label: t("header.videoConverter"), href: "/utilities/video-converter" },
  ];

  const links = variant === "home" ? homeLinks : utilityLinks;
  const ctaHref = variant === "home" ? "#contact" : "/#contact";

  return (
    <header ref={headerRef} className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-background/80 backdrop-blur-md shadow-[0_4px_24px_0_rgba(0,0,0,0.1)]">
      <div className="max-w-7xl mx-auto w-full flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-4">
          <Link href="/" className="text-heading-sm font-bold text-foreground">
            Hondo<span className="text-primary">.</span>
          </Link>
          {breadcrumbs.map((crumb, i) => (
            <div key={crumb.href} className="flex items-center gap-4">
              <span className="text-muted-foreground">/</span>
              {i < breadcrumbs.length - 1 ? (
                <Link
                  href={crumb.href}
                  className="text-heading-sm font-semibold text-muted-foreground transition-colors hover:text-foreground"
                >
                  {crumb.label}
                </Link>
              ) : (
                <span className="text-heading-sm font-semibold text-foreground">
                  {crumb.label}
                </span>
              )}
            </div>
          ))}
        </div>

        {/* Desktop nav — only for home variant */}
        {variant === "home" && (
          <nav className="hidden items-center mx-2 gap-8 lg:flex">
            {links.map((l) =>
              l.href.startsWith("#") ? (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={(e) => handleHashClick(e, l.href)}
                  className="text-body-sm text-nowrap text-muted-foreground transition-colors hover:text-foreground"
                >
                  {l.label}
                </a>
              ) : (
                <Link
                  key={l.href}
                  href={l.href}
                  className="text-body-sm text-nowrap text-muted-foreground transition-colors hover:text-foreground"
                >
                  {l.label}
                </Link>
              ),
            )}
          </nav>
        )}

        <div className="hidden items-center gap-3 lg:flex">
          <Button asChild>
            <a href={ctaHref} onClick={(e) => ctaHref.startsWith("#") && handleHashClick(e, ctaHref)}>{t("header.cta")}</a>
          </Button>
        </div>

        {/* Mobile toggle */}
        <div className="flex items-center gap-2 lg:hidden">
          <Button
            ref={toggleRef}
            variant="ghost"
            size="icon"
            className="min-w-[44px] min-h-[44px]"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <nav className="border-t border-border bg-background px-4 sm:px-6 lg:px-8 pb-6 pt-4 lg:hidden">
          <div className="flex flex-col gap-1">
            {links.map((l) =>
              l.href.startsWith("#") ? (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={(e) => {
                    handleHashClick(e, l.href);
                    setMobileOpen(false);
                  }}
                  className="text-body text-muted-foreground transition-colors hover:text-foreground min-h-[44px] flex items-center"
                >
                  {l.label}
                </a>
              ) : (
                <Link
                  key={l.href}
                  href={l.href}
                  onClick={() => setMobileOpen(false)}
                  className="text-body text-muted-foreground transition-colors hover:text-foreground min-h-[44px] flex items-center"
                >
                  {l.label}
                </Link>
              ),
            )}
            <Button asChild className="mt-2 w-full">
              <a href={ctaHref} onClick={(e) => {
                if (ctaHref.startsWith("#")) handleHashClick(e, ctaHref);
                setMobileOpen(false);
              }}>
                {t("header.cta")}
              </a>
            </Button>
          </div>
        </nav>
      )}
    </header>
  );
};

export default Header;