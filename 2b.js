

 const http = require('http');
 const fs = require('fs');
 const ejs = require('ejs');
 const path = require('path');

 http.createServer((req, res) => {
  const url = req.url;
  console.log('client request url =', url);

  
  let filePath = '';     
  let staticPath = '';   

  
  switch (url) {
    case '/':
      filePath = '/index.ejs';
      break;

    case '/calculator':
      filePath = '/index2.ejs';
      break;

    default:
      
      if (/\.(css|js|png|jpg|gif|svg|ico)$/.test(url)) {
        staticPath = url;        
      } else {
        
        filePath = '/index3.ejs';
      }
      break;
  }

  
  const extname =
    staticPath === ''
      ? path.extname(filePath)
      : path.extname(staticPath);

 
  const contentTypes = {
    '.html': 'text/html; charset=utf-8',
    '.ejs': 'text/html; charset=utf-8',
    '.js': 'text/javascript; charset=utf-8',
    '.css': 'text/css; charset=utf-8',
    '.png': 'image/png',
    '.jpg': 'image/jpg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.ico': 'image/x-icon'
  };
  const contentType = contentTypes[extname] || 'text/plain; charset=utf-8';

  
  if (extname === '.ejs') {
    fs.readFile('.' + filePath, 'utf8', (err, template) => {
       if (err) {
         res.writeHead(500, { 'Content-Type': 'text/html; charset=utf-8' });
         res.end('錯誤：無法讀取模板文件 - ' + err.message);
        return;
      }
 
       const html = ejs.render(template);
       res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
      res.end(html);
    });

  
  } else {
    const realPath = '.' + staticPath;
    fs.readFile(realPath, (err, content) => {
      if (err) {
        
        fs.readFile('./index3.ejs', 'utf8', (err404, tpl404) => {
          if (err404) {
            res.writeHead(500, { 'Content-Type': 'text/html; charset=utf-8' });
            res.end('錯誤：無法載入 404 頁面 - ' + err404.message);
            return;
          }
          const html404 = ejs.render(tpl404);
          res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
          res.end(html404);
        });
       } else {
         res.writeHead(200, { 'Content-Type': contentType });
        res.end(content);
      }
    });
  }
 
}).listen(3000, () => {
  console.log('伺服器已啟動！http://localhost:3000');
  console.log('  /            → index.ejs');
  console.log('  /calculator  → index2.ejs');
  console.log('  其他         → index3.ejs (404)');
});
