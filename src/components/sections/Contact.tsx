"use client";

import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useTranslation } from "react-i18next";
import { useToast } from "@/hooks/use-toast";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type FormData = { name: string; email: string; message: string };

const CONTACT_BLOCKS = [
  {
    type: "Email",
    value: "luiz.hondo@hotmail.com",
    href: "mailto:luiz.hondo@hotmail.com",
  },
  {
    type: "GitHub",
    value: "LuizHondo",
    href: "https://github.com/LuizHondo",
  },
  {
    type: "LinkedIn",
    value: "luizhondo",
    href: "https://www.linkedin.com/in/luizhondo",
  },
];

const Contact = () => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const schema = z.object({
    name: z.string().min(2, t("contact.validation.nameMin")),
    email: z.string().email(t("contact.validation.emailInvalid")),
    message: z.string().min(10, t("contact.validation.messageMin")),
  });

  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    try {
      const res = await fetch("https://submit-form.com/N6xs1nHHV", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error();
      toast({ title: t("contact.toast.successTitle"), description: t("contact.toast.successDescription") });
      reset();
    } catch {
      toast({ title: t("contact.toast.errorTitle"), description: t("contact.toast.errorDescription"), variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      const els = [headingRef.current, descRef.current, buttonsRef.current, gridRef.current, formRef.current].filter(Boolean);
      els.forEach((el, i) => {
        gsap.from(el!, {
          opacity: 0,
          y: 30,
          duration: 0.7,
          delay: i * 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        });
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="py-24 lg:py-32 text-center"
      style={{ position: "relative", zIndex: 1 }}
    >
      <div className="max-w-4xl mx-auto px-6 lg:px-12">
        {/* Section tag */}
        <span
          className="font-mono text-sm uppercase tracking-widest block mb-8"
          style={{ color: "var(--rust)" }}
        >
          {t("contact.tag", "// 03 — Contato")}
        </span>

        {/* Heading */}
        <div ref={headingRef} className="mb-6">
          <h2
            className="font-display font-bold"
            style={{ fontSize: "clamp(32px, 5vw, 72px)", letterSpacing: "-0.03em", lineHeight: 1.1 }}
          >
            {t("contact.ctaHeading", "Tem um projeto")}
          </h2>
          <h2
            className="font-display font-bold"
            style={{
              fontSize: "clamp(32px, 5vw, 72px)",
              letterSpacing: "-0.03em",
              lineHeight: 1.1,
              color: "var(--gray-mid)",
            }}
          >
            {t("contact.ctaHeadingMuted", "em mente?")}
          </h2>
        </div>

        {/* Description */}
        <p
          ref={descRef}
          className="font-body text-base mb-10 mx-auto max-w-lg"
          style={{ color: "var(--concrete)" }}
        >
          {t("contact.description")}
        </p>

        {/* CTA buttons */}
        <div
          ref={buttonsRef}
          className="flex flex-wrap items-center justify-center gap-4 mb-14"
        >
          <a
            href="mailto:luiz.hondo@hotmail.com"
            className="font-mono text-sm uppercase tracking-widest px-7 py-3 transition-all duration-200 inline-block"
            style={{ backgroundColor: "var(--rust)", color: "var(--white)", border: "1px solid var(--rust)" }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.backgroundColor = "transparent";
              (e.currentTarget as HTMLAnchorElement).style.color = "var(--rust)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.backgroundColor = "var(--rust)";
              (e.currentTarget as HTMLAnchorElement).style.color = "var(--white)";
            }}
          >
            {t("contact.emailBtn", "Enviar email")}
          </a>
          <a
            href="https://github.com/LuizHondo"
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-sm uppercase tracking-widest px-7 py-3 transition-all duration-200 inline-block"
            style={{ backgroundColor: "transparent", color: "var(--concrete)", border: "1px solid rgba(255,255,255,0.15)" }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.color = "var(--white)";
              (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(255,255,255,0.4)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.color = "var(--concrete)";
              (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(255,255,255,0.15)";
            }}
          >
            GitHub →
          </a>
        </div>

        {/* Contact block grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 sm:grid-cols-3 mb-16"
          style={{ border: "1px solid rgba(255,255,255,0.07)" }}
        >
          {CONTACT_BLOCKS.map(({ type, value, href }) => (
            <a
              key={type}
              href={href}
              target={type !== "Email" ? "_blank" : undefined}
              rel={type !== "Email" ? "noopener noreferrer" : undefined}
              className="flex flex-col items-center justify-center py-8 px-6 transition-colors duration-200 text-center"
              style={{
                borderRight: "1px solid rgba(255,255,255,0.07)",
                backgroundColor: "var(--gray-dark)",
              }}
              onMouseEnter={(e) => {
                const val = e.currentTarget.querySelector("[data-contact-value]") as HTMLElement;
                if (val) val.style.color = "var(--rust)";
              }}
              onMouseLeave={(e) => {
                const val = e.currentTarget.querySelector("[data-contact-value]") as HTMLElement;
                if (val) val.style.color = "var(--white)";
              }}
            >
              <span
                className="font-mono text-xs uppercase tracking-widest block mb-2"
                style={{ color: "var(--gray-mid)" }}
              >
                {type}
              </span>
              <span
                data-contact-value
                className="font-display font-bold text-lg transition-colors duration-200"
                style={{ color: "var(--white)" }}
              >
                {value}
              </span>
            </a>
          ))}
        </div>
      </div>

      {/* Contact form */}
      <div className="max-w-2xl mx-auto px-6 lg:px-12 text-left">
        <h3
          className="font-display font-bold text-xl mb-6"
          style={{ color: "var(--white)" }}
        >
          {t("contact.heading")}
        </h3>
        <form
          ref={formRef}
          onSubmit={handleSubmit(onSubmit)}
          action="https://submit-form.com/N6xs1nHHV"
          className="space-y-4"
        >
          <div>
            <label className="font-mono text-xs uppercase tracking-widest block mb-2" style={{ color: "var(--gray-mid)" }}>
              {t("contact.nameLabel")}
            </label>
            <input
              {...register("name")}
              name="name"
              placeholder={t("contact.namePlaceholder")}
              className="w-full px-4 py-3 font-body text-sm transition-colors duration-200 outline-none focus:ring-0"
              style={{
                backgroundColor: "var(--gray-dark)",
                border: "1px solid rgba(255,255,255,0.08)",
                color: "var(--white)",
              }}
              onFocus={(e) => (e.currentTarget.style.borderColor = "var(--rust)")}
              onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)")}
            />
            {errors.name && <p className="font-mono text-xs mt-1" style={{ color: "var(--rust)" }}>{errors.name.message}</p>}
          </div>
          <div>
            <label className="font-mono text-xs uppercase tracking-widest block mb-2" style={{ color: "var(--gray-mid)" }}>
              {t("contact.emailLabel")}
            </label>
            <input
              {...register("email")}
              name="email"
              type="email"
              placeholder={t("contact.emailPlaceholder")}
              className="w-full px-4 py-3 font-body text-sm transition-colors duration-200 outline-none focus:ring-0"
              style={{
                backgroundColor: "var(--gray-dark)",
                border: "1px solid rgba(255,255,255,0.08)",
                color: "var(--white)",
              }}
              onFocus={(e) => (e.currentTarget.style.borderColor = "var(--rust)")}
              onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)")}
            />
            {errors.email && <p className="font-mono text-xs mt-1" style={{ color: "var(--rust)" }}>{errors.email.message}</p>}
          </div>
          <div>
            <label className="font-mono text-xs uppercase tracking-widest block mb-2" style={{ color: "var(--gray-mid)" }}>
              {t("contact.messageLabel")}
            </label>
            <textarea
              {...register("message")}
              placeholder={t("contact.messagePlaceholder")}
              rows={5}
              className="w-full px-4 py-3 font-body text-sm transition-colors duration-200 outline-none focus:ring-0 resize-none"
              style={{
                backgroundColor: "var(--gray-dark)",
                border: "1px solid rgba(255,255,255,0.08)",
                color: "var(--white)",
              }}
              onFocus={(e) => (e.currentTarget.style.borderColor = "var(--rust)")}
              onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)")}
            />
            {errors.message && <p className="font-mono text-xs mt-1" style={{ color: "var(--rust)" }}>{errors.message.message}</p>}
          </div>
          <button
            type="submit"
            disabled={loading}
            className="font-mono text-sm uppercase tracking-widest px-8 py-3 transition-all duration-200 disabled:opacity-50"
            style={{ backgroundColor: "var(--rust)", color: "var(--white)", border: "1px solid var(--rust)" }}
            onMouseEnter={(e) => {
              if (!loading) {
                (e.currentTarget as HTMLButtonElement).style.backgroundColor = "transparent";
                (e.currentTarget as HTMLButtonElement).style.color = "var(--rust)";
              }
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.backgroundColor = "var(--rust)";
              (e.currentTarget as HTMLButtonElement).style.color = "var(--white)";
            }}
          >
            {loading ? t("contact.submitting") : t("contact.submit")}
          </button>
        </form>
      </div>
    </section>
  );
};

export default Contact;
