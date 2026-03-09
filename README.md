# StudyExe

A ruthless focus enforcement app for people with ADHD and chronic procrastination. StudyExe is a kernel-level app blocker and productivity tool that forces you to study — no escape, no mercy.

## Features

- **Nuclear App Blocker** — Blocks apps at kernel level. Task Manager won't save you.
- **Eye-Tracking Focus** — Tracks your eyes to ensure you're actually paying attention.
- **Pomodoro on Steroids** — Customizable focus sessions with enforced breaks.
- **Scheduled Lockdowns** — Pre-schedule study sessions so your past self forces your future self to work.
- **Goal Tracking** — Set daily/weekly/monthly goals or face consequences.
- **Anti-Cheat System** — Detects bypass attempts and adds penalty time.

## Tech Stack

- **Next.js 14** with TypeScript
- **Supabase** — Auth & PostgreSQL database
- **Stripe** — Subscription payments with localized pricing
- **Tailwind CSS** — Styling
- **Radix UI** — Headless components
- **Vercel** — Hosting

## Getting Started

```bash
pnpm install
cp .env.local.example .env.local
pnpm dev
```

Configure your `.env.local` with Supabase and Stripe credentials. See `.env.example` for additional environment variables.

## License

See [LICENSE](./LICENSE) for details.
