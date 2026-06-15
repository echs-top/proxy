export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    // 1. 强制使用 HTTPS：如果是 HTTP 请求，直接 301 重定向到 HTTPS
    if (url.protocol === "http:") {
      url.protocol = "https:";
      return Response.redirect(url.toString(), 301);
    }

    // 2. 根目录跳转到 GitHub
    if (url.pathname === "/") {
      return Response.redirect("https://github.com/echs-top/proxy", 302);
    }

    // 3. 处理 CORS OPTIONS 预检请求
    if (request.method === "OPTIONS") {
      return new Response(null, {
        status: 204,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "*",
          "Access-Control-Allow-Headers": "*",
          "Access-Control-Max-Age": "86400",
        },
      });
    }

    try {
      // 4. 获取静态资源
      const response = await env.ASSETS.fetch(request);

      // 如果资源不存在（404）
      if (response.status === 404) {
        return new Response("File not found", { 
          status: 404,
          headers: { "Content-Type": "text/plain; charset=utf-8" }
        });
      }

      // 5. 克隆并重写 Headers，注入 CORS、HSTS 和安全防护响应头
      const newHeaders = new Headers(response.headers);
      newHeaders.set("Access-Control-Allow-Origin", "*");
      newHeaders.set("Access-Control-Allow-Methods", "*");
      newHeaders.set("Access-Control-Allow-Headers", "*");
      newHeaders.set("Content-Security-Policy", "frame-ancestors *");
      newHeaders.set("Strict-Transport-Security", "max-age=31536000; includeSubDomains; preload");

      return new Response(response.body, {
        status: response.status,
        statusText: response.statusText,
        headers: newHeaders,
      });

    } catch (e) {
      // 错误处理
      return new Response("Internal Server Error", { 
        status: 500,
        headers: { "Content-Type": "text/plain; charset=utf-8" }
      });
    }
  }
};
