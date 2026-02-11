import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Send, Instagram, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import ScrollReveal from "./ScrollReveal";

const schema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type FormData = z.infer<typeof schema>;

const Contact = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    try {
      // TODO: wire to Supabase Edge Function + Resend
      console.log("Contact form submitted:", data);
      toast({
        title: "Message sent!",
        description: "Thanks for reaching out. I'll get back to you soon.",
      });
      reset();
    } catch {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="contact"
      className="pt-20 sm:pt-28 min-h-screen bg-muted/40 snap-center"
    >
      <div className="container max-w-3xl">
        <ScrollReveal>
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-heading text-foreground mb-4 sm:mb-2">
                Resolva seus problemas já!
              </h2>
              <div className="h-1 w-12 rounded-full bg-primary mb-3" />
            </div>
            <ScrollReveal delay={0.2}>
              <div className=" flex items-center gap-4">
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:text-foreground hover:border-foreground"
                  aria-label="Instagram"
                >
                  <Instagram className="h-5 w-5" />
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:text-foreground hover:border-foreground"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="h-5 w-5" />
                </a>
              </div>
            </ScrollReveal>
          </div>
          <p className="text-body text-muted-foreground mb-8 sm:mb-4 text-justify">
            Me ajude a te ajudar! Tem algum problema ou tarefa e precisa
            encontrar uma solução? Uma aplicação? Um sistema? Um site só seu com
            a sua cara? Me mande uma mensagem sem compromisso e vamos trabalhar
            juntos nisso.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-5 sm:space-y-2"
          >
            <div>
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                placeholder="Seu nome"
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
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Seu melhor email"
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
              <Label htmlFor="message">Message</Label>
              <Textarea
                id="message"
                placeholder="Eu estou com a idéia de fazer um..."
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
              {loading ? "Enviar..." : ""}
            </Button>
          </form>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default Contact;
