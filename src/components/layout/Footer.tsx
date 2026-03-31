"use client";

import { useTranslation } from "react-i18next";

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer
      className="border-t py-6"
      style={{ borderColor: "rgba(255,255,255,0.08)" }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="font-mono text-xs uppercase tracking-widest" style={{ color: "var(--gray-mid)" }}>
          {t("footer.copyright", { year: new Date().getFullYear() })}
        </p>
        <p className="font-mono text-xs" style={{ color: "var(--gray-mid)" }}>
          Built with intentionality<span style={{ color: "var(--rust)" }}>.</span>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
