# GoRyzer Company Website

A responsive, editorial-style website for GoRyzer, built with React, TypeScript, Vite, and CSS.

## Run locally

```bash
npm install
npm run dev
```

Open the local URL printed by Vite (usually http://localhost:5173).

## Production build

```bash
npm run build
npm run preview
```

## Before publishing

- The contact form sends submissions to `goryzercorporation@gmail.com` through FormSubmit's AJAX service without opening the visitor's email app. FormSubmit handles the submitted contact details and retains submissions for 30 days. Confirm the recipient address using the activation email sent after the first form submission.
- Replace the clearly labeled illustrative portfolio concepts with real work when it is available.
- Review the company description and service list to ensure they accurately represent GoRyzer.

## Design

- Palette: warm paper, charcoal ink, and restrained forest green.
- Typography: DM Sans and Playfair Display, with system fallbacks.
- Layout: one-page site with responsive navigation to services, work, about, process, and contact.
