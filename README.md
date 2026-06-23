# Harish Portfolio Redesign

A premium portfolio rebuild using **Next.js + TypeScript + Tailwind + shadcn-style components**.

## Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Notes

- `components/ui/` is the default shadcn component path used here.
- `app/globals.css` holds the Tailwind base styles and theme variables.
- `components/ui/flow-field-background.tsx` provides the full-screen flow-field canvas background.
- The hero uses the provided Spline scene wrapper in `components/ui/splite.tsx`.
- If the Spline scene does not load, confirm browser internet access and the dependency install.

## Shadcn structure

This project is organized to match the usual shadcn pattern:

- `components/ui/`
- `lib/utils.ts`
- `app/globals.css`

That means new shadcn components can be added cleanly with the CLI later.
