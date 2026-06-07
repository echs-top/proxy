export default {
  async fetch(request, env, ctx) {
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

      return newResponse;

    } catch (e) {
      // 错误处理
      return new Response("Internal Server Error", { status: 500 });
    }
  }
};
