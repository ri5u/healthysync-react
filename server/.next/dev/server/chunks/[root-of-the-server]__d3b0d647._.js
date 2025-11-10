module.exports = [
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[project]/Desktop/HealthSync-React/server/app/api/[...path]/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// Proxy handler: forwards any incoming /api/* request to the configured API target.
// Configure target with environment variable `API_TARGET`, e.g. http://localhost:3000
__turbopack_context__.s([
    "DELETE",
    ()=>DELETE,
    "GET",
    ()=>GET,
    "OPTIONS",
    ()=>OPTIONS,
    "PATCH",
    ()=>PATCH,
    "POST",
    ()=>POST,
    "PUT",
    ()=>PUT
]);
const API_TARGET = process.env.API_TARGET || process.env.NEXT_PUBLIC_API_TARGET || 'http://localhost:3000';
async function forward(req) {
    try {
        const url = new URL(req.url);
        // Keep the same path and search when forwarding
        const forwardUrl = `${API_TARGET}${url.pathname}${url.search}`;
        // Clone headers and remove host
        const outHeaders = new Headers();
        req.headers.forEach((v, k)=>{
            if (k.toLowerCase() === 'host') return;
            outHeaders.set(k, v);
        });
        // Prepare body: avoid passing the raw stream (which requires `duplex`).
        let body = undefined;
        if (![
            'GET',
            'HEAD'
        ].includes(req.method)) {
            try {
                body = await req.arrayBuffer();
            } catch (e) {
                // fall back to undefined if body can't be read
                body = undefined;
            }
        }
        // Forward the request
        const res = await fetch(forwardUrl, {
            method: req.method,
            headers: outHeaders,
            body
        });
        // Build headers for response, but strip hop-by-hop headers
        const responseHeaders = new Headers();
        res.headers.forEach((v, k)=>{
            const lk = k.toLowerCase();
            if ([
                'connection',
                'keep-alive',
                'transfer-encoding',
                'upgrade'
            ].includes(lk)) return;
            responseHeaders.set(k, v);
        });
        const respBody = await res.arrayBuffer();
        return new Response(respBody, {
            status: res.status,
            headers: responseHeaders
        });
    } catch (err) {
        // eslint-disable-next-line no-console
        console.error('proxy error', err);
        return new Response(JSON.stringify({
            error: 'proxy failed'
        }), {
            status: 502,
            headers: {
                'content-type': 'application/json'
            }
        });
    }
}
const GET = forward;
const POST = forward;
const PUT = forward;
const PATCH = forward;
const DELETE = forward;
const OPTIONS = forward;
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__d3b0d647._.js.map