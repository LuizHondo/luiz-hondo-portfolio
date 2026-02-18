import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Send, Instagram, Linkedin } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import ScrollReveal from "../common/ScrollReveal";

type FormData = {
  name: string;
  email: string;
  message: string;
};

const Contact = () => {
  const { toast } = useToast();
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);

  const schema = z.object({
    name: z.string().min(2, t("contact.validation.nameMin")),
    email: z.string().email(t("contact.validation.emailInvalid")),
    message: z.string().min(10, t("contact.validation.messageMin")),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    try {
      const response = await fetch("https://submit-form.com/N6xs1nHHV", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to send message");
      }

      toast({
        title: t("contact.toast.successTitle"),
        description: t("contact.toast.successDescription"),
      });
      reset();
    } catch {
      toast({
        title: t("contact.toast.errorTitle"),
        description: t("contact.toast.errorDescription"),
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="pt-20 sm:pt-16 pb-6 bg-muted/40">
      <div className="container max-w-3xl">
        <ScrollReveal>
          <div className="flex items-center justify-between mb-2">
            <div>
              <h2 className="text-heading-sm sm:text-heading text-foreground mb-1">
                {t("contact.heading")}
              </h2>
              <div className="h-1 w-12 rounded-full bg-primary" />
            </div>
            <ScrollReveal delay={0.2}>
              <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4">
                <a
                  href="https://www.instagram.com/luizpaulohondo"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-7 w-7 sm:h-10 sm:w-10 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:text-foreground hover:border-foreground"
                  aria-label="Instagram"
                >
                  <Instagram className="h-3.5 w-3.5 sm:h-5 sm:w-5" />
                </a>
                <a
                  href="https://www.linkedin.com/in/luizhondo"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-7 w-7 sm:h-10 sm:w-10 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:text-foreground hover:border-foreground"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="h-3.5 w-3.5 sm:h-5 sm:w-5" />
                </a>
              </div>
            </ScrollReveal>
          </div>
          <p className="text-body-sm sm:text-body text-muted-foreground mb-3 sm:mb-4 text-justify leading-tight sm:leading-relaxed">
            {t("contact.description")}
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-3 sm:space-y-2"
            action="https://submit-form.com/N6xs1nHHV"
          >
            <div>
              <Label htmlFor="name">{t("contact.nameLabel")}</Label>
              <Input
                name="name"
                id="name"
                placeholder={t("contact.namePlaceholder")}
                {...register("name")}
                className="mt-1.5"
              />
              {errors.name && (
                <p className="text-caption text-destructive mt-1">
                  {errors.name.message}
                </p>
              )}
            </div>
            <div>
              <Label htmlFor="email">{t("contact.emailLabel")}</Label>
              <Input
                name="email"
                id="email"
                type="email"
                placeholder={t("contact.emailPlaceholder")}
                {...register("email")}
                className="mt-1.5"
              />
              {errors.email && (
                <p className="text-caption text-destructive mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>
            <div>
              <Label htmlFor="message">{t("contact.messageLabel")}</Label>
              <Textarea
                id="message"
                placeholder={t("contact.messagePlaceholder")}
                rows={4}
                {...register("message")}
                className="mt-1.5"
              />
              {errors.message && (
                <p className="text-caption text-destructive mt-1">
                  {errors.message.message}
                </p>
              )}
            </div>
            <Button
              type="submit"
              size="lg"
              className="gap-2"
              disabled={loading}
            >
              <Send className="h-4 w-4" />
              {loading ? t("contact.submitting") : t("contact.submit")}
            </Button>
          </form>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default Contact;
