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
    if (response.status !== 404) {
      // Ensure HTML isn't cached so new builds propagate quickly
      const res = new Response(response.body, response);
      const ct = res.headers.get('content-type') || '';
      if (ct.includes('text/html')) {
        res.headers.set('Cache-Control', 'no-cache, no-store, must-revalidate');
        res.headers.set('Pragma', 'no-cache');
        res.headers.set('Expires', '0');
      }
      return res;
    }

    // Still 404 — return the original response
    return response;
  },
};
