const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  var proxyUrl =
    process.env.REACT_APP_ENVIRONMENT === "E2E"
      ? "http://backend:5220"
      : "http://localhost:5201";

  app.use(
    "/api",
    createProxyMiddleware({
      target: proxyUrl,
      changeOrigin: true,
    })
  );
};
