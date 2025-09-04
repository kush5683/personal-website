// src/worker.js
var worker_default = {
  async fetch(request, env) {
    const url = new URL(request.url);
    let response = await env.ASSETS.fetch(request);
    if (response.status !== 404) return response;
    const isReactApp = url.pathname === "/" || url.pathname.startsWith("/react");
    const spaPath = isReactApp ? "/react/index.html" : "/index.html";
    const spaRequest = new Request(new URL(spaPath, url.origin), request);
    response = await env.ASSETS.fetch(spaRequest);
    if (response.status !== 404) return response;
    return response;
  }
};
export {
  worker_default as default
};
//# sourceMappingURL=worker.js.map
