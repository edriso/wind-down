# Wind Down

A **frontend-only** reverse-alarm that gently walks you into sleep, dimming the
screen as it goes. Set a wind-down time; when it comes, a short sequence of
calming steps eases you to bed. Pairs nicely with a morning wake-up app. No
backend, no accounts, works offline.

## The flow

`home → waiting → ritual`

- **Home** — pick a wind-down time, then "start now" or "wait until" it.
- **Waiting** — a breathing orb and a live countdown to bedtime.
- **Ritual** — six calm steps (screens to bed, lower the lights, water, loosen
  shoulders, three breaths, goodnight). The screen **progressively dims** (a
  brightness filter) from the second step on.

## Tech

React 19 + TypeScript (strict), Vite, Tailwind v4, Zustand, Zod-validated
localStorage, PWA. Tested with Vitest + Testing Library and Playwright.

## Commands

```bash
pnpm install
pnpm dev
pnpm build
pnpm lint
pnpm test
pnpm test:e2e
```

## Notes

- The time-until-bedtime maths (`lib/bedtime.ts`) is pure and handles the wrap
  past midnight; it's unit-tested.
- Entrances animate transform only and keep `opacity: 1`. Reduced motion is
  honored (the orb settles, no dim transition).

## License

MIT.
