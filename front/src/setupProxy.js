const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  // needed because of https://github.com/facebook/create-react-app/issues/6031
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://localhost:5000',
      changeOrigin: true,
    })
  );
};
