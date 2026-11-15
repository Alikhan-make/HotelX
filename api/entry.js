import worker from "../vercel/worker.generated.js";

// This deployment exposes fixture data only. No identity, DB or secrets from Sites.
export default {
  async fetch(request) {
    const url = new URL(request.url);
    const path = url.searchParams.get("__hotelx_path") || url.pathname;
    url.searchParams.delete("__hotelx_path");
    url.pathname = path.startsWith("/") ? path : "/";
    const headers = new Headers(request.headers);
    for (const key of [...headers.keys()]) {
      if (key.startsWith("oai-") || key.startsWith("x-hotelx-preview") || key === "authorization" || key === "cookie") headers.delete(key);
    }
    headers.set("oai-authenticated-user-id", "public-demo-visitor");
    headers.set("oai-authenticated-user-email", "demo@hotelx.invalid");
    headers.set("oai-authenticated-user-full-name", encodeURIComponent("Демо HotelX"));
    headers.set("oai-authenticated-user-full-name-encoding", "percent-encoded-utf-8");
    const allowedPosts = ["/api/guest/assistant", "/api/guest/ai-search", "/api/guest/compare", "/api/hotels/aspan-city/assistant"];
    if (url.pathname.startsWith("/api/admin/") || url.pathname.startsWith("/api/verifications") || url.pathname === "/api/applications" || (!["GET", "HEAD"].includes(request.method) && !(request.method === "POST" && allowedPosts.includes(url.pathname)))) {
      return Response.json({ error: "DEMO_READ_ONLY", message: "Это открытая демоверсия. Бронирования, цены, документы и настройки не сохраняются." }, { status: 403, headers: { "cache-control": "no-store" } });
    }
    if (url.pathname.startsWith("/admin") || /\/signin-with-chatgpt|\/signout-with-chatgpt|^\/callback$/.test(url.pathname)) return Response.redirect(new URL("/app/explore", url), 302);
    const body = !["GET", "HEAD"].includes(request.method) ? await request.arrayBuffer() : undefined;
    const response = await worker.fetch(new Request(url, { method: request.method, headers, body }), {
      HOTELX_REAL_CATALOG: "1", HOTELX_LOCAL_PREVIEW: "1", HOTELX_PLATFORM_OWNER_EMAIL: "demo@hotelx.invalid"
    });
    if (url.pathname === "/api/me" && response.ok) {
      const me = await response.json();
      me.contexts = me.contexts.filter((context) => context.id !== "platform");
      me.publicDemo = true;
      me.privatePrototype = false;
      return Response.json(me, { headers: { "cache-control": "no-store" } });
    }
    return response;
  }
};
