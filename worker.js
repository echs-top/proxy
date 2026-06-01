export default {
  async fetch(request, env, ctx) {
    // 跨域
    const corsHeaders = {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "*",
      "Access-Control-Allow-Headers": "*",
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

      return newResponse;

    } catch (e) {
      // 错误处理
      return new Response("Internal Server Error", { status: 500 });
    }
  }
};
