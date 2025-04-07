/**
 * Open Wegram Bot - Netlify Entry Point
 * A two-way private messaging Telegram bot
 *
 * GitHub Repository: https://github.com/wozulong/open-wegram-bot
 */

import {handleRequest} from "../../src/core.js";

export default async (req) => {
    const request = new Request(req.url, {
        method: req.method,
        headers: new Headers(req.headers),
        body: req.method !== "GET" && req.method !== "HEAD" ? await req.text() : null
    });

    const config = {
        prefix: Netlify.env.get("NETLIFY_PREFIX") || "public",
        secretToken: Netlify.env.get("SECRET_TOKEN") || ""
    };

    const response = await handleRequest(request, config);

    const body = await response.text();

    return new Response(body, {
        status: response.status,
        headers: {
            "Content-Type": response.headers.get("Content-Type") || "text/plain",
        },
    });
};