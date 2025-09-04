export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    // Try to serve the requested asset first
    let response = await env.ASSETS.fetch(request);
    if (response.status !== 404) return response;

    // SPA fallback: serve the React index for any unknown path
    // This keeps the URL clean (no /react in the address bar)
    const spaRequest = new Request(new URL("/react/index.html", url.origin), request);
    response = await env.ASSETS.fetch(spaRequest);
    if (response.status !== 404) return response;

    // Still 404 — return the original response
    return response;
  },
};
