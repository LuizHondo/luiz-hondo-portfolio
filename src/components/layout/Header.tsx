import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import ThemeToggle from "../common/ThemeToggle";

interface Breadcrumb {
  label: string;
  href: string;
}

interface HeaderProps {
  variant?: "home" | "utility";
  breadcrumbs?: Breadcrumb[];
}

const Header = ({ variant = "home", breadcrumbs = [] }: HeaderProps) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { t } = useTranslation();

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
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-background/80 backdrop-blur-md shadow-[0_4px_24px_0_rgba(0,0,0,0.1)]">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-4">
          <Link to="/" className="text-heading-sm font-bold text-foreground">
            Hondo<span className="text-primary">.</span>
          </Link>
          {breadcrumbs.map((crumb, i) => (
            <div key={crumb.href} className="flex items-center gap-4">
              <span className="text-muted-foreground">/</span>
              {i < breadcrumbs.length - 1 ? (
                <Link
                  to={crumb.href}
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
                  className="text-body-sm text-nowrap text-muted-foreground transition-colors hover:text-foreground"
                >
                  {l.label}
                </a>
              ) : (
                <Link
                  key={l.href}
                  to={l.href}
                  className="text-body-sm text-nowrap text-muted-foreground transition-colors hover:text-foreground"
                >
                  {l.label}
                </Link>
              ),
            )}
          </nav>
        )}

        <div className="hidden items-center gap-3 lg:flex">
          <ThemeToggle />
          <Button asChild>
            <a href={ctaHref}>{t("header.cta")}</a>
          </Button>
        </div>

        {/* Mobile toggle */}
        <div className="flex items-center gap-2 lg:hidden">
          <ThemeToggle />
          <Button
            variant="ghost"
            size="icon"
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
        <nav className="border-t border-border bg-background px-6 pb-6 pt-4 lg:hidden">
          <div className="flex flex-col gap-4">
            {links.map((l) =>
              l.href.startsWith("#") ? (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setMobileOpen(false)}
                  className="text-body text-muted-foreground transition-colors hover:text-foreground"
                >
                  {l.label}
                </a>
              ) : (
                <Link
                  key={l.href}
                  to={l.href}
                  onClick={() => setMobileOpen(false)}
                  className="text-body text-muted-foreground transition-colors hover:text-foreground"
                >
                  {l.label}
                </Link>
              ),
            )}
            <Button asChild className="mt-2 w-full">
              <a href={ctaHref} onClick={() => setMobileOpen(false)}>
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
