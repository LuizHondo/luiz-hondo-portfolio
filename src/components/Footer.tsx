import { Instagram, Linkedin, Mail } from "lucide-react";

const Footer = () => (
  <footer className="border-t border-border py-10">
    <div className="container flex flex-col items-center gap-4 text-center sm:flex-row sm:justify-between sm:text-left">
      <p className="text-body-sm text-muted-foreground">
        © {new Date().getFullYear()} Luiz Hondo. All rights reserved.
      </p>
      <div className="flex items-center gap-3">
        <a href="mailto:hello@luizhondo.dev" aria-label="Email" className="text-muted-foreground hover:text-foreground transition-colors">
          <Mail className="h-5 w-5" />
        </a>
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-muted-foreground hover:text-foreground transition-colors">
          <Instagram className="h-5 w-5" />
        </a>
        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-muted-foreground hover:text-foreground transition-colors">
          <Linkedin className="h-5 w-5" />
        </a>
      </div>
    </div>
  </footer>
);

export default Footer;
