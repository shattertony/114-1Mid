
const http = require('http');

const server = http.createServer((req, res) => {
  const url = req.url;
  console.log('client request url =', url);

  let output = '';

  switch (url) {
    case '/':
      // 對應題目說的「index.html 輸出部分的字樣」
      output = 'index.html 輸出的部分';
      break;
    case '/calculator':
      // 對應題目說的「index2.html 輸出的部分」
      output = 'index2.html 輸出的部分';
      break;
    default:
      // 其他路徑 → error
      output = 'error.html 輸出的部分';
      break;
  }

  res.setHeader('Content-Type', 'text/plain; charset=utf-8');
  res.end(output);
});

server.listen(8888, () => {
  console.log('2a.js 伺服器啟動：http://127.0.0.1:8888');
});
