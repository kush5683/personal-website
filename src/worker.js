export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    // Redirect root to React app path so the URL updates
    if (url.pathname === "/" || url.pathname === "/index.html") {
      const to = new URL("/react/", url.origin);
      return Response.redirect(to.toString(), 301);
    }

    // Try to serve the requested asset first
    let response = await env.ASSETS.fetch(request);
    if (response.status !== 404) return response;

    // Fallbacks for SPA-style routes and clean URLs
    // If the path looks like the React app, serve its index.html
    const isReactApp = url.pathname.startsWith("/react");
    const spaPath = isReactApp ? "/react/index.html" : "/index.html";
    const spaRequest = new Request(new URL(spaPath, url.origin), request);
    response = await env.ASSETS.fetch(spaRequest);
    if (response.status !== 404) return response;

    // Still 404 — return the original response
    return response;
  },
};
