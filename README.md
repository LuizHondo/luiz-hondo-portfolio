# Luiz Hondo Portfolio

Professional portfolio website built with React + TypeScript, featuring bilingual content (`pt-BR` and `en`), animated sections, project case studies, and utility tools.

## Website Info

- Main sections: Hero, About, Projects, Utilities, Contact
- Utility page: Vertical Video Converter (`/utilities/video-converter`)
- Languages: Portuguese (Brazil) and English with automatic browser detection
- Contact channels: form submission, Instagram, and LinkedIn

## Tech Stack

- React 18 + TypeScript + Vite
- Tailwind CSS + shadcn/ui + Radix UI
- React Router DOM
- i18next + react-i18next
- Framer Motion
- FFmpeg.wasm (client-side video conversion)
- React Hook Form + Zod
- Vitest + Testing Library

## Getting Started

Requirements:

- Node.js 18+
- npm

Install and run locally:

```sh
npm install
npm run dev
```

Build and preview production:

```sh
npm run build
npm run preview
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Create production build
- `npm run build:dev` - Build in development mode
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run test` - Run tests once
- `npm run test:watch` - Run tests in watch mode

## Deployment

This project includes `vercel.json` headers for cross-origin isolation needed by FFmpeg.wasm.
