# Security Configuration

This document describes the security measures implemented in this API, specifically the Helmet and CORS configurations.

---

## Helmet

Helmet is an Express middleware that sets HTTP response headers to protect the application from common web vulnerabilities.

**Configuration file:** `src/config/helmetOptions.ts`

### Applied Headers

| Option | Value | Purpose |
|---|---|---|
| `contentSecurityPolicy` | `false` | Disabled — Swagger UI requires inline scripts and styles that would be blocked by a strict CSP |
| `crossOriginEmbedderPolicy` | `false` | Disabled — required to allow Swagger UI assets to load correctly |
| `frameguard` | `action: "deny"` | Sets `X-Frame-Options: DENY` — prevents the app from being embedded in an iframe, blocking clickjacking attacks |
| `hidePoweredBy` | `true` | Removes the `X-Powered-By: Express` header — avoids exposing the framework to potential attackers |
| `noSniff` | `true` | Sets `X-Content-Type-Options: nosniff` — prevents browsers from MIME-sniffing responses away from the declared content type |
| `referrerPolicy` | `policy: "no-referrer"` | Sets `Referrer-Policy: no-referrer` — prevents the browser from sending the `Referer` header, reducing information leakage |
| `hsts` | `maxAge: 31536000, includeSubDomains, preload` (production only) | Sets `Strict-Transport-Security` — forces HTTPS for 1 year including subdomains; disabled in development to allow plain HTTP |

### Why Helmet

HTTP security headers are a first-line defence against a wide range of attacks including clickjacking, MIME-type confusion, and protocol downgrade attacks. Helmet automates the correct configuration of these headers so they are applied consistently on every response without manual header management.

### Sources

- Helmet.js official documentation: https://helmetjs.github.io/
- OWASP Secure Headers Project: https://owasp.org/www-project-secure-headers/

---

## CORS

CORS (Cross-Origin Resource Sharing) controls which external origins are permitted to make requests to the API.

**Configuration file:** `src/config/corsOptions.ts`

### Configuration by Environment

#### Development (`NODE_ENV=development`)

| Option | Value |
|---|---|
| `origin` | `true` (all origins allowed) |
| `credentials` | `false` |
| `methods` | `GET, POST, PUT, PATCH, DELETE, OPTIONS` |
| `allowedHeaders` | `Content-Type, Authorization` |
| `optionsSuccessStatus` | `204` |

All origins are permitted in development to enable easy local testing with tools like Swagger UI, Postman, and browser-based clients without needing to whitelist individual addresses.

#### Production (`NODE_ENV=production`)

| Option | Value |
|---|---|
| `origin` | `CORS_ALLOWED_ORIGINS` env variable (comma-separated list) |
| `credentials` | `false` |
| `methods` | `GET, POST, PUT, PATCH, DELETE, OPTIONS` |
| `allowedHeaders` | `Content-Type, Authorization` |
| `optionsSuccessStatus` | `204` |

In production the allowed origins are explicitly restricted to the list defined in the `CORS_ALLOWED_ORIGINS` environment variable. Any request from an unlisted origin is rejected by the browser before it reaches the server.

### Why CORS

Without a CORS policy, browsers would block cross-origin requests by default, but malicious pages could still exploit server-side state via forms and redirects. Explicitly configuring CORS ensures that only trusted origins can call the API using credentials or custom headers, reducing the risk of cross-site request forgery and data exfiltration.

### Sources

- MDN Web Docs — Cross-Origin Resource Sharing (CORS): https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS
- OWASP CORS Security Cheat Sheet: https://cheatsheetseries.owasp.org/cheatsheets/Cross-Site_Request_Forgery_Prevention_Cheat_Sheet.html
