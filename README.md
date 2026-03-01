# ArSiJa | Portfolio

A modern, high-performance portfolio website built with **Nuxt 4**, **Vue 3**, and **Tailwind CSS**.

## 🚀 Overview

This repository contains the source code for my personal portfolio, featuring:
- **Responsive Design**: Optimized for all devices using Tailwind CSS.
- **Dynamic Content**: Powered by `@nuxt/content` and external CMS integrations.
- **Performance**: High-speed loading and smooth transitions using Nuxt 4.
- **Analytics & Tracking**: Integrated with PostHog, Google Analytics (GTag), and Microsoft Clarity.
- **Code Stats**: Real-time coding activity via WakaTime integration.
- **Interactive Elements**: Custom cursor, smooth scroll, and 3D elements (Three.js).

## 🛠 Tech Stack

- **Framework**: [Nuxt 4](https://nuxt.com/)
- **Frontend**: [Vue 3](https://vuejs.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) / [Nuxt UI](https://ui.nuxt.com/)
- **Testing**: [Vitest](https://vitest.dev/) (Unit/Nuxt) & [Playwright](https://playwright.dev/) (E2E)
- **Data & CMS**: Nuxt Content, ButterCMS, SQLite, Postgres
- **Visualization**: ECharts, Three.js
- **Monitoring**: Prometheus, GTag, PostHog, Clarity

## 📂 Project Structure

```text
├── app/                # Vue application (components, pages, layouts, assets)
│   ├── components/     # Reusable UI components
│   ├── pages/          # File-based routing
│   ├── layouts/        # Page layouts
│   └── assets/         # Global styles and static assets
├── content/            # Markdown files for Nuxt Content
├── public/             # Static files (images, robots.txt, etc.)
├── server/             # API routes and server-side logic
├── test/               # Unit and integration tests
├── tests/              # E2E tests (Playwright)
├── nuxt.config.ts      # Nuxt configuration
├── package.json        # Dependencies and scripts
└── tsconfig.json       # TypeScript configuration
```

## ⚙️ Setup & Installation

### Requirements
- [Node.js](https://nodejs.org/) (Latest LTS recommended)
- [npm](https://www.npmjs.com/)

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/ArSiJa8/nuxt-portfolio.
   cd nuxt-portfolio
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the root directory and add required environment variables (see below).

## 🚀 Development & Scripts

| Script | Description |
| :--- | :--- |
| `npm run dev` | Starts the development server at `http://localhost:3000` |
| `npm run build` | Builds the application for production |
| `npm run generate` | Generates a static version of the site |
| `npm run preview` | Previews the production build locally |
| `npm run test` | Runs all tests using Vitest |
| `npm run test:e2e` | Runs E2E tests using Playwright |

## 🔑 Environment Variables

The following environment variables are required for full functionality:

| Variable | Description |
| :--- | :--- |
| `NGROK_AUTHTOKEN` | Auth token for Ngrok (local tunneling) |
| `WAKATIME_KEY` | API key for WakaTime stats |
| `VITE_TURNSTILE_SITE_KEY` | Cloudflare Turnstile site key for forms |
| `TODO: ADD_OTHERS` | *Add any other required keys here* |

## 🧪 Testing

- **Unit/Component Testing**: Run `npm run test:unit` or `npm run test:nuxt`.
- **E2E Testing**: Run `npm run test:e2e`. For UI mode, use `npm run test:e2e:ui`.

## 📦 Deployment

The project can be deployed to any platform supporting Nuxt (Vercel, Netlify, Cloudflare Pages, etc.).
For static hosting:
```bash
npm run generate
```

## 📄 License

TODO: Specify the license (e.g., MIT, Apache 2.0).

---
*Created with ❤️ by ArSiJa*
