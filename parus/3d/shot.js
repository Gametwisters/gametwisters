const puppeteer=require('puppeteer-core');const http=require('http');const fs=require('fs');const path=require('path');
const srv=http.createServer((q,r)=>{const p=path.join(__dirname,decodeURIComponent(q.url.split('?')[0]));if(!fs.existsSync(p)){r.writeHead(404);return r.end();}
 const t={'.html':'text/html','.js':'text/javascript','.woff2':'font/woff2'}[path.extname(p)]||'application/octet-stream';r.writeHead(200,{'Content-Type':t});fs.createReadStream(p).pipe(r);}).listen(8765,async()=>{
 const b=await puppeteer.launch({executablePath:'/opt/pw-browsers/chromium-1194/chrome-linux/chrome',args:['--no-sandbox','--use-angle=swiftshader','--enable-unsafe-swiftshader','--ignore-gpu-blocklist']});
 const pg=await b.newPage();pg.on('console',m=>console.log('C:',m.text()));pg.on('pageerror',e=>console.log('E:',e.message));
 const [w,h,dial,out]=process.argv.slice(2);
 await pg.setViewport({width:+w,height:+h});await pg.goto(`http://localhost:8765/index.html?w=${w}&h=${h}&dial=${dial}`);
 await pg.waitForFunction('window.__done',{timeout:240000});await pg.screenshot({path:out});await b.close();srv.close();});
