require('newrelic');
const express = require('express');
const path = require('path');
const { createProxyMiddleware } = require('http-proxy-middleware');


const app = express();
const PORT = 3000;

app.use(express.static(path.join(__dirname, '../public')));

app.use('/productImages', createProxyMiddleware({
  target: 'http://3.21.166.216/images-service/client/dist/bundle-images-service.js',
  changeOrigin: true,
  //just says to change it to be nothing for designation below
  pathRewrite: {
    '^/productImages': ''
  }
}));

app.get('/:id', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});


app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});