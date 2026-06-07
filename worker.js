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

    // 根路径重定向到 GitHub 仓库
    if (url.pathname === "/") {
      return Response.redirect("https://github.com/echs-top/proxy", 302);
    }

    try {
      // 从 Pages/Assets 静态资产中获取原始文件
      const response = await env.ASSETS.fetch(request);

      // 处理 404 错误
      if (response.status === 404) {
        return new Response("File not found", { status: 404 });
      }

      // 基于原始响应创建新的 Response 对象，以便修改 Header
      const newResponse = new Response(response.body, response);
      
      // 注入跨域头
      Object.keys(corsHeaders).forEach(key => {
        newResponse.headers.set(key, corsHeaders[key]);
      });

      // ================= 终极完全体：像素级复制 Vercel 的强制编码规范化 =================
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
      // 3. 检查 YAML / YML 配置文件 (新增)
      else if (/yaml/i.test(contentType) || pathname.endsWith(".yaml") || pathname.endsWith(".yml")) {
        newResponse.headers.set("Content-Type", "text/yaml; charset=utf-8");
      }
      // 4. 检查 HTML 页面
      else if (/html/i.test(contentType) || pathname.endsWith(".html") || pathname.endsWith(".htm")) {
        newResponse.headers.set("Content-Type", "text/html; charset=utf-8");
      } 
      // 5. 检查 纯文本文件及 .list 规则集 (新增 .list 支持)
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
