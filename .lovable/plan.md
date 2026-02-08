

# Luiz Hondo — Developer Portfolio

A modern, neo-minimalist portfolio website for front-end developer Luiz Hondo, built with React, Tailwind CSS, and TypeScript.

---

## Design System

### Color Palette
- **Light mode:** Soft off-white background (#F6F7F8), clean white surfaces, teal accent (#2B7A78), warm gold secondary (#F2C57C), dark text for contrast
- **Dark mode:** Deep navy background, subtle surface cards, lighter teal/gold accents, light text — all WCAG AA compliant
- **Light/Dark mode toggle** in the header

### Typography & Spacing
- **Inter** for body text, slightly bolder/expressive weight for headlines
- Responsive type scale from H1 down to small text
- Consistent 8/16/24px spacing rhythm with generous whitespace throughout

---

## Pages & Sections (Single-Page Layout)

### 1. Fixed Header & Navigation
- Logo/name on the left, nav links (About, Skills, Projects, Contact) in the center/right
- Prominent **"Hire Me"** CTA button
- Hamburger menu on mobile
- Light/dark mode toggle

### 2. Hero Section
- Bold headline introducing Luiz as a front-end developer
- Short tagline/subheading
- CTA buttons: "View Projects" and "Contact Me"
- Subtle animated entrance (fade + slide)

### 3. About Section
- Short professional bio with optional photo placeholder
- Experience timeline (vertical, animated on scroll)
- **"Download CV"** button

### 4. Skills Section
- Categorized skill grid:
  - **Front-end:** React, React Native, Expo
  - **Languages:** JavaScript, TypeScript
  - **Styling:** CSS, Tailwind CSS
  - **Tools:** Git, Figma
  - **Practices:** Testing, best practices
- Skill badges with icons, organized in clean card groups

### 5. Projects Section
- Modern project cards with:
  - Thumbnail/image placeholder
  - Title + one-line summary
  - Tech stack badges
  - GitHub link icon
  - **"View Case Study"** button → opens a **drawer/modal**
- Case study modal template: Problem → Solution → Process → Stack → Screenshots → GitHub link
- Subtle hover elevation effect on cards

### 6. Contact Section
- Simple validated form: Name, Email, Message (with Zod validation + visual error states)
- **Working email delivery** via Supabase Edge Function + Resend
- Social links: Instagram & LinkedIn icons

### 7. Footer
- Email link, social icons (Instagram, LinkedIn)
- Copyright notice

---

## Interactions & Polish
- Smooth scroll navigation between sections
- Reveal-on-scroll animations (subtle fade-in)
- Hover effects on cards, buttons, and links
- Focus-visible states for accessibility
- Mobile-first responsive design (mobile, tablet, desktop)

---

## Backend (Lovable Cloud + Supabase)
- **Edge Function** to handle contact form submissions using **Resend** for email delivery
- Secure API key storage via Supabase secrets
- *Note: We'll need to set up Resend and provide an API key for the contact form to work*

