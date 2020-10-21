const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const path = require('path');

const app = express();
const PORT = 3000;

app.use('/products/:id', express.static(path.join(__dirname, '../public')));

app.use('/api/product/quotes', createProxyMiddleware({
  target: 'http://localhost:3002',
  changeOrigin: true,
}));

app.use('/api/reviews', createProxyMiddleware({
  target: 'http://localhost:3001',
  changeOrigin: true,
}));

app.use('/api/productImages', createProxyMiddleware({
  target: 'http://localhost:3003',
  changeOrigin: true,
}));

app.use('/', createProxyMiddleware({
  target: 'http://localhost:3004',
  changeOrigin: true,
}));

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
