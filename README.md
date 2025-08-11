This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.



| Folder/File   | Purpose                                                |
| ------------- | ------------------------------------------------------ |
| `app/`        | Main routing & server components (App Router)          |
| `components/` | Reusable UI like `Button`, `Input`, `Card`             |
| `lib/`        | Logic modules: API clients, Firebase, validation, etc. |
| `hooks/`      | Custom React hooks like `useAuth`, `useForm`           |
| `context/`    | Global context providers like `AuthProvider`           |
| `public/`     | Static assets: images, fonts                           |
| `.env.local`  | API keys, base URLs, etc. (never commit this)          |
| `globals.css` | Tailwind or global style definitions                   |


| Folder          | Use Case                                   |
| --------------- | ------------------------------------------ |
| `middleware.ts` | Route protection, JWT middleware           |
| `store/`        | Zustand, Redux, or Jotai store             |
| `services/`     | Backend API integration (axios calls etc.) |
| `schemas/`      | Zod or Yup validation schemas              |
| `types/`        | TypeScript types & interfaces              |
| `constants/`    | Static values: roles, routes, config       |

