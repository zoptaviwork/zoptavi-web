# Zoptavi — Premium E-Commerce Platform

Zoptavi is a state-of-the-art, premium e-commerce engine designed for high performance, seamless cross-platform syncing, and rich visual aesthetics. It features a modern Web client, a native Mobile client, and a shared backend layer.

---

## 🛠 Tech Stack

| Layer | Technology | Details |
| :--- | :--- | :--- |
| **Website** | React + Vite + TypeScript | High-performance SPA frontend |
| **Mobile App** | React Native + Expo | Native mobile experience compiled via Expo EAS |
| **Styling** | Tailwind CSS v4 | CSS-first styling framework with custom visual tokens |
| **Backend** | Supabase | Postgres Database, Go-based Auth, Edge Functions, & Storage CDN |
| **Deployment** | Vercel (Web) + Expo EAS (App) | Automated CI/CD workflows |

---

## 📂 Repository Structure

```
Zoptavi E-commerce/
├── supabase/       # Shared database schemas, seeds, and migrations
├── web/            # React & Vite website
└── app/            # React Native Expo mobile application
```

---

## 🚀 Getting Started

### Prerequisites

Make sure you have Node.js (v18+) and npm/yarn installed.

### 🌐 Setting Up the Web Client

1. Navigate to the `web` folder:
   ```bash
   cd web
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
4. Build for production:
   ```bash
   npm run build
   ```

### 📱 Setting Up the Mobile Client

1. Navigate to the `app` folder:
   ```bash
   cd app
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the Expo development server:
   ```bash
   npx expo start
   ```

### 🗄 Setting Up the Backend (Supabase)

To configure the local database schema, make sure you have the Supabase CLI installed, then:
```bash
supabase start
supabase db reset
```
Refer to the `supabase/` folder config details for schema definition.

---

## 🚀 Production Deployment

- **Web Client**: Deployed automatically to **Vercel** on every git push to the main branch.
- **Mobile Client**: Distributed as OTA updates and native builds via **Expo EAS**.
