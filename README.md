# Gymshark Clone | Fullstack Modern Architecture

This project is a high-performance implementation of a production-grade e-commerce platform, designed to replicate the **Gymshark** experience. The primary goal is to master advanced engineering patterns, rendering optimization, and scalable system design using the most modern 2026 stack.

## 🚀 Technical Vision

Unlike a superficial clone, this project focuses on server-side robustness, advanced security (2FA), and deep integration with payment engines and NoSQL databases.

### Core Stack

- **Framework:** [Next.js 15 (App Router)](https://nextjs.org/).
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/).
- **Database:** [Firebase Firestore](https://firebase.google.com/docs/firestore).
- **Auth:** [Auth.js](https://authjs.dev/) + bcrypt (Custom Credentials Provider).
- **Payments:** [Stripe SDK](https://stripe.com/) for checkout flows and webhooks.
- **Communication:** [Resend](https://resend.com/) + [React Email](https://react.email/) for transactional emails.
- **Testing:** [Vitest](https://vitest.dev/) for unit & integration tests, [Playwright](https://playwright.dev/) for end-to-end (E2E) testing.
- **CI/CD Automation:** GitHub Actions for automated linting, type-checking, test execution, and PR validation.

---

## 🏗️ Engineering Architecture

The project follows a modular structure designed for maintainability and Separation of Concerns:

- **Server-First:** Leveraging React Server Components (RSC) to enhance SEO and Performance, reserving Client Components only for critical interactivity.
- **Frontend Ops:** Focused on scalable infrastructure and automated workflows.
- **Security:** Implementation of bcrypt hashing and Two-Factor Authentication (2FA) via TOTP (`otplib` + `qrcode`).

---

## 🗺️ Project Roadmap

### Phase 1: Professional Setup (Completed ✅)

- [x] Next.js 15 & TypeScript initialization.
- [x] Tailwind CSS v4 Engine-first configuration.
- [x] Custom Import Aliases (`@/*`).
- [x] ESLint / Prettier professional configuration.
- [x] Folder Architecture design.
- [x] Internationalization (i18n) Routing.
- [x] Base Layout & Root Providers.
- [x] Custom Font Optimization (Montserrat & Roboto).
- [x] Global Style Variables (`@theme inline`).
- [x] Core Component Library (Button, Container, etc.).

### Phase 2: Continuous Integration & GitHub Actions (Completed ✅)

- [x] Automated CI Pipeline workflow setup (`.github/workflows/ci.yml`).
- [x] Automated Linting (`pnpm lint`) and TypeScript verification (`pnpm tsc --noEmit`).
- [x] Automated Vitest suite execution on Pull Requests.
- [x] Build check validation & GitHub Branch Protection Rules integration.

### Phase 3: Database & Backend (Completed ✅)

- [x] Firebase Project & Firestore Instance setup.
- [x] Data Modeling for `users`, `products`, and `orders`.
- [x] Security Rules configuration.
- [x] Firestore Access Helpers & Data Fetching Layer.

### Phase 4: Product System (Completed ✅)

- [x] Product variants system (size, color) and stock management.
- [x] Dynamic routing: `/products` and `/products/[slug]`.

### Phase 5: UI Development (Completed ✅)

- [x] Mega Menu, Product Cards, and Responsive Gallery.
- [x] Skeleton Loaders and Lucide icons integration.

### Phase 6: Authentication Engine (Completed ✅)

- [x] Auth.js custom credentials flow with bcrypt.

### Phase 7: Transactional Emails (Completed ✅)

- [x] Order confirmation and password reset via Resend & React Email.

### Phase 8: Cart System & Wishlist System (Completed ✅)

- [x] Global state management and cart persistence.
- [x] Global state management and wishlist persistence.

### Phase 9 & 10: Checkout & Orders (Completed ✅)

- [x] Stripe UI integration and Webhook validation for order processing.

### Phase 11: Unit & Integration tests (Completed ✅)

- [x] Vitest config
- [x] Unit and integration tests (server actions, custom hooks, contexts, components)

### Phase 12: E2E tests (Completed ✅)

- [x] Playwright config
- [x] E2E tests

### Phase 13 to 14: Final Polish & Deploy (Completed ✅)

- [x] Performance Optimization, Error Boundaries, and Production Deploy.

---

## 🔧 Local Setup

This project uses **pnpm** for package management to ensure fast, deterministic, and disk-efficient installations.

1. **Clone the repository:**

   ```bash
   git clone [https://github.com/estebancasas9817/gymshark.git](https://github.com/estebancasas9817/gymshark.git)
   cd gymshark

   ```

1. **Clone the repository:**
   ```bash
   git clone https://github.com/estebancasas9817/gymshark.git
   cd gymshark
   ```
1. **Install Dependencies:**
   ```bash
   pnpm i
   ```
1. **Run the development server**
   ```bash
   pnpm run dev
   ```
