export default {
  async fetch(request, env, ctx) {
    // 跨域响应头配置
    const corsHeaders = {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "*",
      "Access-Control-Allow-Headers": "*",
      "Content-Security-Policy": "frame-ancestors *",
    };

    // 预检请求（OPTIONS）直接返回跨域头
    if (request.method === "OPTIONS") {
      return new Response(null, { headers: corsHeaders });
    }

    const url = new URL(request.url);
    const host = request.headers.get("host") || "";

    // 根路径重定向到 GitHub 仓库
    if (url.pathname === "/") {
      return Response.redirect("https://github.com/echs-top/proxy", 302);
    }

    try {
      let response;
      const WORKER_DOMAIN = "mihomo.echs.workers.dev";

      // ================= 核心：防死循环双流回源判定 =================
      if (host.includes(WORKER_DOMAIN)) {
        // 【第二次进入】如果是亲儿子域名进来的内部请求，直接放行去静态存储桶拿文件
        response = await env.ASSETS.fetch(request);
      } else {
        // 【第一次进入】如果是从 SaaS 外部域名进来的，强行套上亲儿子域名的“干净帽子”发起内部二次 fetch
        const targetUrl = `https://${WORKER_DOMAIN}${url.pathname}${url.search}`;
        const modifiedRequest = new Request(targetUrl, {
          method: request.method,
          headers: request.headers,
          body: request.method !== "GET" && request.method !== "HEAD" ? request.body : undefined
        });
        // 发起请求，它会重新进入上面的 if 分支
        response = await fetch(modifiedRequest);
      }
      // ============================================================

      // 处理 404 错误
      if (response.status === 404) {
        return new Response("File not found", { status: 404 });
      }

      // 基于拿到的原始响应创建新的 Response 对象，以便修改 Header
      const newResponse = new Response(response.body, response);
      
      // 注入跨域头
      Object.keys(corsHeaders).forEach(key => {
        newResponse.headers.set(key, corsHeaders[key]);
      });

      // ================= 像素级复制 Vercel 的强制编码规范化 =================
      let contentType = newResponse.headers.get("Content-Type") || "";
      let pathname = url.pathname.toLowerCase();

      // 1. 检查 JavaScript 脚本
      if (/javascript/i.test(contentType) || pathname.endsWith(".js")) {
        newResponse.headers.set("Content-Type", "application/javascript; charset=utf-8");
      } 
      // 2. 检查 JSON 配置
      else if (/json/i.test(contentType) || pathname.endsWith(".json")) {
        newResponse.headers.set("Content-Type", "application/json; charset=utf-8");
      } 
      // 3. 检查 YAML / YML 配置文件
      else if (/yaml/i.test(contentType) || pathname.endsWith(".yaml") || pathname.endsWith(".yml")) {
        newResponse.headers.set("Content-Type", "text/yaml; charset=utf-8");
      }
      // 4. 检查 HTML 页面
      else if (/html/i.test(contentType) || pathname.endsWith(".html") || pathname.endsWith(".htm")) {
        newResponse.headers.set("Content-Type", "text/html; charset=utf-8");
      } 
      // 5. 检查 纯文本文件及 .list 规则集
      else if (/text/i.test(contentType) || pathname.endsWith(".txt") || pathname.endsWith(".list")) {
        newResponse.headers.set("Content-Type", "text/plain; charset=utf-8");
      }
      // ====================================================================

      return newResponse;

    } catch (e) {
      // 异常边界处理
      return new Response("Internal Server Error", { status: 500 });
    }
  }
};
