/* 戦略のメガリス: オフライン用 Service Worker */
const VER='tact-v2';
const CORE=['./','index.html','manifest-oko.webmanifest'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(VER).then(c=>c.addAll(CORE)).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==VER).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
async function rangeResp(req,res){
  const h=req.headers.get('range');if(!h||!res||res.status!==200)return res;
  const m=/bytes=(\d*)-(\d*)/.exec(h);if(!m)return res;
  const buf=await res.clone().arrayBuffer();const size=buf.byteLength;
  let s=m[1]?+m[1]:0,e=m[2]?+m[2]:size-1;if(e>=size)e=size-1;
  return new Response(buf.slice(s,e+1),{status:206,statusText:'Partial Content',headers:{'Content-Type':res.headers.get('Content-Type')||'audio/mpeg','Content-Range':`bytes ${s}-${e}/${size}`,'Content-Length':String(e-s+1)}});
}
self.addEventListener('fetch',e=>{
  const req=e.request;if(req.method!=='GET')return;
  const u=new URL(req.url);if(u.origin!==location.origin)return;
  const isDoc=req.mode==='navigate'||u.pathname.endsWith('/index.html')||u.pathname.endsWith('/');
  e.respondWith((async()=>{
    const cache=await caches.open(VER);
    if(isDoc){ /* ページはネット優先(更新が届く)、だめならキャッシュ */
      try{const r=await fetch(req);if(r&&r.ok)cache.put(req,r.clone());return r}catch(_){return (await cache.match(req,{ignoreSearch:true}))||(await cache.match('index.html'))}
    }
    const hit=await cache.match(req.url,{ignoreSearch:true});
    if(hit)return rangeResp(req,hit);
    try{
      const r=await fetch(req.headers.get('range')?new Request(req.url):req);
      if(r&&r.ok&&r.status===200)cache.put(req.url,r.clone());
      return rangeResp(req,r);
    }catch(_){return new Response('',{status:504})}
  })());
});
