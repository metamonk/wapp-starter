**# Project Overview**

You are building a Solana wallet transaction tracking application designed to provide users with a comprehensive view of financial activities across a curated set of cryptocurrency wallets. The platform enables administrators to manage a watchlist of wallets and allows authenticated users to monitor and analyze transaction feeds.

You will be using NextJS 15, shadcn, tailwind, and lucide icons.

**# Core Functionality**
- The feed is a sorted list that contains all trades specific Solana wallets have.
- Users assigned the `admin` role can navigate to a separate page and add wallets to keep track of.

- Authentication and Authorization
-- Role-based access control using @Privy for authentication
-- `admin` users can manage wallet tracking
-- Standard users can view transaction feeds

- Wallet Transaction Feed
-- Aggregate transactions from specified Solana wallets
-- Sortable and filterable transaction list
-- Real-time or periodic transaction updates
--- Transaction details:
  * Amount
  * Timestamp
  * Source/destination wallets
  * Transaction type

- Admin Wallet Management
-- Dedicated page for wallet tracking
-- Solana wallet address validation
-- Persistent wallet list storage
-- Wallet categorization

- Performance and Scalability
-- Efficient Solana blockchain data fetching
-- Transaction feed caching
-- Pagination
-- Responsive design

**# Doc**

🔹 Frontend Layer
- React/Next.js application
- User authentication with @Privy
- Wallet connection (Phantom/Solflare)

🔹 Backend Services
- Typescript/Node.js microservices
- Authentication middleware using @Privy
- Rate limiting
- Transaction indexing
- tRPC for routes and functions

🔹 Data Ingestion Pipeline
- Solana RPC websocket connections
- Real-time transaction streaming
- Block parsing mechanisms
- Event-driven architecture

🔹 Data Storage
- PostgreSQL for user/wallet metadata using Prisma ORM
- TimescaleDB for time-series transaction data
- Redis for caching/performance

🔹 Blockchain Data Handlers
- Transaction type classification
- Token transfer tracking
- Balance calculation
- Historical portfolio reconstruction

🔹 Monitoring & Scaling
- Prometheus metrics
- Elastic scaling
- Redundant RPC providers
- Error/performance logging

Key Integration Points:
- Alchemy for primary RPC
- Background workers for async processing
- WebSocket real-time updates
- Secure key management

**# Current File Structure**
`src/lib/auth/index.ts`: This file can serve as the entry point for your authentication logic, exporting necessary functions and utilities.
`src/lib/auth/privy.ts`: This file can handle interactions with the Privy SDK, such as verifying tokens and managing user sessions.
`src/lib/auth/utils.ts`: This file can contain utility functions related to authentication, such as token extraction and validation.

**# Additional Requirements**
1. Project Setup
	- All new components should go in `/src/components` at the root (not in the `/src/app` folder) and be named like `ExampleComponent.tsx` unless otherwise specified
	- All new pages go in `/src/app`
	- Use the Next.js App router
	- All data fetching should be done in a server component and pass the data down as props
	- Client components (useState, hooks, etc) require that `use client` is set at the top of the file

2. Server-side API Calls
	- All interactions with external APIs (e.g. Youtube, Twitter/X, Reddit, OpenAI) should be performed server-side
	- Create dedicated API routes in the `/src/app/api` directory for each external API interaction
	- Client-side components should fetch data through these API routes, not directly from external APIs

3. Environment Variables
	- Store all sensitive information (API keys, credentials) in environment variables
	- Use a `.env.local` files for local development and ensure it's listed in `.gitignore`
	- For production, set environment variables in the deployment platform (e.g. Vercel)
	- Access environment variables only in server-side code or API routes

4. Error Handling and Logging
	- Implement comprehensive error handling in both client-side components and server-side API routes
	- Log errors on the server-side for debugging purposes
	- Display user-friendly error messages on the client-side

5. Type Safety
	- Use Typescript interfaces for all data structures, especially API responses
	- Avoid using `any` type; instead, define proper types for all variables and function parameters

6. API Client Initializations
	- Initialize API clients (e.g. Snoowrap for Reddit, OpenAi) in server-side code only
	- Implement checks to ensure API clients are properly initialized before use

7. Data Fetching in Components
	- User React hooks (e.g. `useEffect`) for data fetching in client-side components
	- Implement loading states and error handling for all data fetching operations

8. Next.js Configuration
	- Utilize `next.config.mjs` for environment-specific configurations
	- Use the `env` property in `next.config.mjs` to make environment variables available to the application

9. CORS and API Routes
	- Use Next.js API routes to avoid CORS issues when interacting with external APIs
	- Implement proper request validation in API routes

10. Component Structure
	- Separate concerns between client and server components
	- Use server components for initial data fetching and pass data as props to client components

11. Security
	- Never expose API keys
	- Use @Privy for secure authentication and key management



## Auth Overview

This document provides an overview of the authentication flow and related logic in the project. It covers token management, centralized authentication logic, middleware for route protection, and error handling.

## Authentication Flow

### 1. Token Management

- **Storage**: The authentication token is stored in cookies after a successful login. This allows the server to authenticate requests without requiring the user to log in again.
- **Usage**: The token is retrieved from cookies and used to authenticate requests on the server side.

### 2. Centralized Authentication Logic

- **Function**: The `authenticateRequest` function in `src/lib/auth/privy.ts` handles token verification and user authentication.
- **Privy Data Retrieval**: The `getValuesFromCookies` function in `src/lib/auth/utils.ts` retrieves the token from cookies, ensuring a single point of access for token management.

### 3. Middleware for Route Protection

- **File**: `src/middleware.ts`
- **Functionality**: The middleware checks for authentication on protected routes. If a user is not authenticated, they are redirected to the login page.
- **Configuration**: The middleware is configured to protect all routes except for the home page and login page.

### 4. Error Handling

- **Graceful Handling**: Errors related to missing or invalid tokens are handled gracefully. The system logs errors for debugging purposes and redirects unauthenticated users to the login page.
- **Logging**: Errors are logged to the console. Consider using a logging service like Sentry for better error tracking in production.

## tRPC Context

- **File**: `src/lib/trpc/context.ts`
- **User Context**: The user information is included in the tRPC context, allowing procedures to access the authenticated user's data.

## Role-Based Access Control (RBAC)

- **Future Consideration**: If the application requires different levels of access, consider implementing RBAC. This can be done by extending the `authenticateRequest` function to include role checks.

## Testing and Validation

- **Testing**: Ensure thorough testing of the authentication flow, including edge cases like token expiration and invalid tokens.
- **Validation**: Validate that all protected routes correctly redirect unauthenticated users.

## Additional Notes

- **Documentation**: Keep this document updated as the authentication logic evolves.
- **Code Comments**: Ensure that code comments are clear and provide context for complex logic.