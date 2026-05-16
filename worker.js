export default {
  async fetch(request, env, ctx) {
    // 跨域
    const corsHeaders = {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "*",
      "Access-Control-Allow-Headers": "*",
    };

    // OPTIONS预检请求
    if (request.method === "OPTIONS") {
      return new Response(null, { headers: corsHeaders });
    }

    try {
      // 2. 从全局绑定的静态资源中获取文件
      const response = await env.ASSETS.fetch(request);

      // 文件不存在返回404
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
