# SECURITY.md

## Overview

For this project, I used custom Helmet.js and CORS settings instead of relying only on the default middleware behavior. I wanted the API to be safer, but at the same time I tried to keep the configuration practical for a small API project that mainly returns JSON responses.

---

## Helmet.js Configuration

### Configuration Applied

```typescript
import helmet, { HelmetOptions } from "helmet";
import { env } from "./env";

export const getHelmetConfiguration = (): HelmetOptions => {
    const isProduction = env.nodeEnvironment === "production";

    return {
        contentSecurityPolicy: false,
        crossOriginEmbedderPolicy: false,
        frameguard: { action: "deny" },
        hidePoweredBy: true,
        noSniff: true,
        referrerPolicy: { policy: "no-referrer" },
        hsts: isProduction
            ? {
                  maxAge: 31536000,
                  includeSubDomains: true,
                  preload: true,
              }
            : false,
    };
};

export const helmetMiddleware = helmet(getHelmetConfiguration());
```

### Justification

1. **contentSecurityPolicy: false**  
   I disabled Content Security Policy because this project is mainly an API and not a full browser-rendered front-end. In this case, I thought it made more sense to focus on headers that are more directly useful for an API.

2. **crossOriginEmbedderPolicy: false**  
   I disabled this option because the API does not need browser cross-origin isolation features. Keeping it off made the configuration simpler and easier to explain.

3. **frameguard: { action: "deny" }**  
   I enabled this so the API sends the `X-Frame-Options` header with the value `DENY`. This helps protect against clickjacking by preventing the application from being loaded inside a frame.

4. **hidePoweredBy: true**  
   I enabled this to remove the `X-Powered-By` header. Even though this is a small change, it still helps reduce unnecessary information disclosure about the server.

5. **noSniff: true**  
   I enabled this so the API sends `X-Content-Type-Options: nosniff`. I chose this because it helps prevent browsers from guessing content types incorrectly.

6. **referrerPolicy: { policy: "no-referrer" }**  
   I used this setting to stop the browser from sending referrer information to other sites. I thought this was a good privacy-focused setting for the project.

7. **hsts enabled only in production**  
   I enabled HSTS only in production because it is most useful when the application is running with HTTPS. In local development, the project usually runs on HTTP, so enabling it there would not be very practical.

### Sources

1. Helmet.js Official Documentation  
   https://helmetjs.github.io/

2. MDN Web Docs — X-Content-Type-Options  
   https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/X-Content-Type-Options

3. MDN Web Docs — X-Frame-Options  
   https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/X-Frame-Options

4. MDN Web Docs — Strict-Transport-Security  
   https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Strict-Transport-Security

5. OWASP HTTP Security Response Headers Cheat Sheet  
   https://cheatsheetseries.owasp.org/cheatsheets/HTTP_Headers_Cheat_Sheet.html

---

## CORS Configuration

### Configuration Applied

```typescript
import { CorsOptions } from "cors";
import { env } from "./env";

export const getCorsOptions = (): CorsOptions => {
    const isDevelopment = env.nodeEnvironment === "development";

    if (isDevelopment) {
        return {
            origin: true,
            credentials: false,
            methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
            allowedHeaders: ["Content-Type", "Authorization"],
            optionsSuccessStatus: 204,
        };
    }

    return {
        origin: env.corsAllowedOrigins,
        credentials: false,
        methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
        allowedHeaders: ["Content-Type", "Authorization"],
        optionsSuccessStatus: 204,
    };
};
```

### Justification

1. **origin: env.corsAllowedOrigins**  
   In production, I restricted access to only the origins listed in the environment variables. I chose this because allowing every origin would be less secure.

2. **origin: true in development**  
   During development, I allowed the incoming origin to make local testing easier. This helped when switching between different local tools and testing environments.

3. **credentials: false**  
   I kept credentials disabled because this API does not currently use browser cookies or cross-origin session handling. This made the setup simpler and easier to control.

4. **methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"]**  
   I listed the methods explicitly so the configuration is more controlled. I also included `OPTIONS` because browser preflight requests need it.

5. **allowedHeaders: ["Content-Type", "Authorization"]**  
   I allowed only the headers that are commonly needed for this API. I thought this was better than leaving the configuration too open.

6. **optionsSuccessStatus: 204**  
   I used `204` for successful preflight requests because it is a clean success response without a body.

### Sources

1. Express CORS Middleware Documentation  
   https://expressjs.com/en/resources/middleware/cors.html

2. MDN Web Docs — CORS  
   https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS

3. OWASP HTTP Security Response Headers Cheat Sheet  
   https://cheatsheetseries.owasp.org/cheatsheets/HTTP_Headers_Cheat_Sheet.html

---

## Summary

Overall, I chose Helmet and CORS settings that fit the project as an API instead of just using default settings without explanation. My goal was to keep the API safer while still making local development and testing manageable.