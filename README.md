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

### Phase 2: Database & Backend (Completed ✅)

- [x] Firebase Project & Firestore Instance setup.
- [x] Data Modeling for `users`, `products`, and `orders`.
- [x] Security Rules configuration.
- [x] Firestore Access Helpers & Data Fetching Layer.

### Phase 3: Product System (In Progress 📍)

- [ ] Product variants system (size, color) and stock management.
- [ ] Dynamic routing: `/products` and `/products/[slug]`.

### Phase 4: UI Development

- [ ] Mega Menu, Product Cards, and Responsive Gallery.
- [ ] Skeleton Loaders and Lucide icons integration.

### Phase 5: Authentication Engine

- [ ] Auth.js custom credentials flow with bcrypt.

### Phase 6: Transactional Emails

- [ ] Order confirmation and password reset via Resend & React Email.

### Phase 7: Advanced Security

- [ ] 2FA Implementation (QR Code generation and OTP validation).

### Phase 8: Cart System

- [ ] Global state management and cart persistence.

### Phase 9 & 10: Checkout & Orders

- [ ] Stripe UI integration and Webhook validation for order processing.

### Phase 11 to 14: Final Polish & Deploy

- [ ] User Dashboard, Performance Optimization, Error Boundaries, and Production Deploy.

---

## 🔧 Local Setup

This project uses **pnpm** for package management to ensure fast, deterministic, and disk-efficient installations.

1. **Clone the repository:**
   ```bash
   git clone https://github.com/estebancasas9817/gymshark.git
   cd gymshark
   ```
2. **Install Dependencies:**
   ```bash
   pnpm i
   ```
3. **Run the development server**
   ```bash
   pnpm dev
   ```
