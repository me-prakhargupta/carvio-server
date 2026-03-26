# Carvio Server

> Backend service for Carvio — a pipeline-driven system for job aggregation, filtering, and personalized alerts..

**Main Project:** https://github.com/me-prakhargupta/carvio  
**Frontend Repo:** https://github.com/me-prakhargupta/carvio-client

---

## Table of Contents

- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Backend Design Principles](#backend-design-principles)
- [Architecture](#architecture)
- [Getting Started](#getting-started)
  - [Clone the repository](#1-clone-the-repository)
  - [Install dependencies](#2-install-dependencies)
  - [Setup environment variables](#3-setup-environment-variables)
  - [Run the server](#4-run-the-server)
- [Authentication](#authentication)
- [Future Improvements](#future-improvements)
- [Key Takeaway](#key-takeaway)
- [Author](#author)
- [Note](#note)

---

## Overview

This is the **server-side application** of Carvio, responsible for automating job aggregation, processing data, and serving relevant opportunities.

The backend is designed as a **pipeline-based system**, where jobs are continuously scraped, normalized, stored, and filtered to reduce noise and improve relevance.

---

## Tech Stack

- **Node.js**
- **Express.js**
- **TypeScript**
- **MongoDB (Mongoose)**
- **JWT** (Authentication / Token handling)
- **node-cron** (Scheduled scraping)
- **Axios & Cheerio** (Data ingestion / scraping)
- **Zod** (Validation)
- **dotenv**, **CORS**, **Cookie Parser**

---

## Backend Design Principles

- **Pipeline-first architecture** — Designed as a data flow system: `ingestion → processing → storage → filtering`
- **Automation over manual effort** — Uses scheduled jobs to continuously fetch and update opportunities
- **Signal over noise** — Focuses on filtering relevant jobs instead of storing everything
- **Data normalization & consistency** — Standardizes skills, timestamps, and job structure for accurate processing
- **Idempotent & repeatable jobs** — Ensures safe re-execution with deduplication
- **Modular structure** — Organized into domains (jobs, users, scraper, matcher) for scalability

---

## Architecture

```
Client (Next.js)
       ↓
REST API (Express.js)
       ↓
Cron-Based Scraper (node-cron)
       ↓
Processing Layer (Normalize + Deduplicate)
       ↓
Database (MongoDB)
       ↓
Filtering & Matching Engine
```

- Continuous background ingestion using cron jobs
- Backend handles full data lifecycle
- API serves only filtered and relevant opportunities

---


## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/me-prakhargupta/carvio-server.git
cd carvio-server
```

### 2. Install dependencies

```bash
npm install
```

### 3. Setup environment variables

Create a `.env` file in the root directory:

```env
PORT=8000
MONGO_URI=your_mongodb_connection_string

SYSTEM_USER_EMAIL=your_system_email
SYSTEM_USER_PASS=your_email_password

ACCESS_TOKEN_SECRET=your_access_token_secret
ACCESS_TOKEN_EXPIRY=your_access_token_expiry

REFRESH_TOKEN_SECRET=your_refresh_token_secret
REFRESH_TOKEN_EXPIRY=your_refresh_token_expiry

NODE_ENV=development

CLIENT_URI=your_frontend_url

RESEND_API_KEY=your_resend_api_key
```

### Notes:

- `MONGO_URI`: MongoDB connection string
- `SYSTEM_USER_EMAIL` & `SYSTEM_USER_PASS`: Used for email delivery (fallback via Nodemailer)
- `ACCESS_TOKEN_*` & `REFRESH_TOKEN_*`: JWT configuration
- `CLIENT_URI`: Frontend URL for CORS
- `RESEND_API_KEY`: Primary email service (Resend)

> If Resend is unavailable or rate-limited, the system falls back to **Nodemailer using system email credentials**.


### 4. Run the server

```bash
npm run dev
```

Server runs on:

```
http://localhost:8000
```

---

## Authentication

- Uses **JWT-based authentication** (access & refresh tokens)
- Tokens are stored in **HTTP-only cookies** for secure session handling
- Implements **OTP-based email verification** during signup
- Email verification is handled via **Resend**, with fallback to **Nodemailer**
- Stateless request handling for scalability


---

## Future Improvements

- Queue-based processing (BullMQ) for scalability
- Advanced matching algorithm (scoring-based)
- Real-time alerts and notifications
- Logging and monitoring (Winston / Morgan)
- Enhanced validation and error handling

---

## Key Takeaway

This backend is built as a **data pipeline system**, not just an API.

It prioritizes:

- **Automation** over manual effort
- **Relevance** over volume
- **Scalability** through modular design

---

## Author

**Prakhar Gupta**  
Full-Stack Developer (Next.js, Node.js, TypeScript)  
Focused on building backend-driven, production-grade web applications.

---

## Note

This repository contains only the backend service of Carvio and is designed to work with the [client application](https://github.com/me-prakhargupta/carvio-client). For the complete system architecture, see the [main Carvio project](https://github.com/me-prakhargupta/carvio).
