# SalonBook

## Project Name and Description

**SalonBook** is a full-stack salon appointment booking platform. Customers can browse active salon services, book available appointment slots, manage appointments, and pay for confirmed appointments through Stripe Checkout. Administrators can manage services, appointments, customers, dashboard statistics, and payment transactions.

The project contains two applications:

- **Client:** Next.js application for the customer and admin interfaces.
- **Server:** Express and MongoDB API for services, appointments, users, transactions, and authorization.

## Important Features

- Customer-only public registration with Better Auth.
- Email/password and Google sign-in options.
- Role-based dashboards for **admin** and **customer** users.
- Protected routes and token-protected backend APIs.
- Public service browsing with search, category, duration, price, and sorting filters.
- Protected service details pages and appointment booking.
- Available time-slot loading and booked-slot disabling.
- Customer appointment history, cancellation, and payment access for confirmed appointments.
- Admin service creation, editing, activation/deactivation, and deletion.
- Admin appointment approval and cancellation management.
- Admin user blocking and unblocking.
- Stripe Checkout integration and transaction history.
- ImgBB image upload support for services and profile images.
- Admin and customer dashboard statistics.

## Technology Stack

### Client

- Next.js 16
- React 19
- Tailwind CSS 4
- Better Auth
- Stripe
- Lucide React
- MongoDB adapter for Better Auth

### Server

- Node.js
- Express 5
- MongoDB Node.js Driver
- Stripe
- CORS
- dotenv

## Installation Instructions

Clone both repositories:

```bash
git clone https://github.com/amena-hira/salonbook-client.git
git clone https://github.com/amena-hira/salonbook-server.git
```

Install dependencies in each project:

```bash
cd salonbook-client
npm install
```

```bash
cd salonbook-server
npm install
```

## How to Run the Project Locally

### 1. Start the server

In the server project:

```bash
cd salonbook-server
npm run dev
```

The server runs on `http://localhost:8000` by default.

### 2. Start the client

In a separate terminal, in the client project:

```bash
cd salonbook-client
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Create environment files

Create a `.env` file in both the client and server projects. Use your own values; do not commit secret values to Git.

## Required Environment Variables

### Client: `salonbook-client/.env`

```env
BACKEND_URL=
BETTER_AUTH_SECRET=
BETTER_AUTH_URL=
MONGODB_URI=
BETTER_AUTH_GOOGLE_CLIENT_ID=
BETTER_AUTH_GOOGLE_CLIENT_SECRET=
IMGBB_API_KEY=
STRIPE_PUBLISHABLE_KEY=
STRIPE_SECRET_KEY=
```

### Server: `salonbook-server/.env`

```env
MONGODB_URI=
STRIPE_SECRET_KEY=
PORT=
```

`PORT` is optional because the server defaults to `8000`.

## Live Website Link

https://salonbook-client-tau.vercel.app/

## Repository Links

- **Client Repository:** https://github.com/amena-hira/salonbook-client
- **Server Repository:** https://github.com/amena-hira/salonbook-server
