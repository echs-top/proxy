export default {
  async fetch(request, env, ctx) {
    // 跨域
    const corsHeaders = {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "*",
      "Access-Control-Allow-Headers": "*",
      "Content-Security-Policy": "frame-ancestors *",
    };

    // 预检
    if (request.method === "OPTIONS") {
      return new Response(null, { headers: corsHeaders });
    }

    const url = new URL(request.url);

    // 重定向
    if (url.pathname === "/") {
      return Response.redirect("https://github.com/echs-top/proxy", 302);
    }

    try {
      // 获取文件
      const response = await env.ASSETS.fetch(request);

      // 404
      if (response.status === 404) {
        return new Response("File not found", { status: 404 });
      }

      // 重写Response
      const newResponse = new Response(response.body, response);
      
      // 设置跨域头
      Object.keys(corsHeaders).forEach(key => {
        newResponse.headers.set(key, corsHeaders[key]);
      });

      // ================= 新增：修复乱码问题 =================
      // 获取原始的 Content-Type
      let contentType = newResponse.headers.get("Content-Type");
      if (contentType && !contentType.toLowerCase().includes("charset")) {
        // 如果是 JS、JSON、HTML 或纯文本，且没有指定 charset，则强制加上 utf-8
        if (/(javascript|json|text|html)/i.test(contentType)) {
          newResponse.headers.set("Content-Type", `${contentType}; charset=utf-8`);
        }
      }
      // ====================================================

      return newResponse;

    } catch (e) {
      // 错误处理
      return new Response("Internal Server Error", { status: 500 });
    }
  }
};
