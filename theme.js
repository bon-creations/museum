window.bmIco=window.bmIco||function(n){var P={"link":"M10 14c-1.5-1.6-1.2-3.6.2-5l3-3c1.4-1.4 3.6-1.4 4.8 0 1.3 1.3 1.2 3.4-.1 4.7l-1.4 1.4M14 10c1.5 1.6 1.2 3.6-.2 5l-3 3c-1.4 1.4-3.6 1.4-4.8 0-1.3-1.3-1.2-3.4.1-4.7l1.4-1.4","gear":"M12 9a3 3 0 1 0 .1 0zM12 3v2.5M12 18.5V21M3 12h2.5M18.5 12H21M5.6 5.7l1.8 1.8M16.6 16.6l1.8 1.8M18.4 5.6l-1.8 1.8M7.4 16.6l-1.8 1.8","run":"M15.5 4.6a1.6 1.6 0 1 0 .1 0zM13 8.5l-3 2.5 2.5 2.5-1 5M10 11l-3.5.5M13 8.5l3 3 3 .5M12.5 13.5l3 2.5.5 3.5","hall":"M3 10l9-6 9 6M5 10v8M9.5 10v8M14.5 10v8M19 10v8M3 20h18","rainbow":"M3.5 18a8.5 8.5 0 0 1 17 0M7 18a5 5 0 0 1 10 0M10.3 18a1.7 1.7 0 0 1 3.4 0","book":"M12 6c-2-1.5-5-2-8-1.5v13c3-.5 6 0 8 1.5 2-1.5 5-2 8-1.5v-13c-3-.5-6 0-8 1.5zM12 6v13","game":"M6 8h12c2 0 3 2 3.2 5l.5 4c.1 1.5-1.5 2.2-2.6 1l-2.4-2.8H7.3L4.9 18c-1.1 1.2-2.7.5-2.6-1l.5-4C3 10 4 8 6 8zM8 11v3M6.5 12.5h3M15.5 11.5h.1M17.5 13.5h.1","palette":"M12 3.5c-5 0-8.5 3.4-8.5 7.8 0 4.100 3.300 6.200 6 5.700 2-.4 2.200 1.500 1.200 2.700-.7 1 .4 1.800 1.600 1.800 4.600 0 8.200-3.300 8.200-8 0-5-3.600-10-8.500-10zM7.500 11h.1M10 7.500h.1M14.500 7.500h.1M17 11h.1","shelf":"M4.5 5h4v15h-4zM9.5 8h4v12h-4zM14.5 6.5l3.800-1.200 3 14.500-3.800 1z","ticket":"M3.5 8.500h17v2.500a1.500 1.500 0 0 0 0 3v2.500h-17V14a1.500 1.500 0 0 0 0-3zM14 8.500v8","phones":"M4 15v-3a8 8 0 0 1 16 0v3M4 14h3v6H5a1 1 0 0 1-1-1zM20 14h-3v6h2a1 1 0 0 0 1-1z","mega":"M4 10v4l3 .5 9 4.500V5l-9 4.500zM7 14.500l1 5h2.500l-1-4.500M19 9.500v5","map":"M3.500 6l5.500-2 6 2 5.500-2v14l-5.500 2-6-2-5.500 2zM9 4v14M15 6v14","check":"M4.500 12.500l5 5 10-11","search":"M10.500 4a6.500 6.500 0 1 0 .1 0zM15.500 15.500L20 20"};return P[n]?'<svg class="bmi" viewBox="0 0 24 24" width="1.15em" height="1.15em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" style="vertical-align:-.22em"><path d="'+P[n]+'"/></svg>':""};
/* いろ(ダークモード) と オフライン対応。設定はこの端末だけに保存 */
window.bmSet=window.bmSet||{items:[],add:function(f,o){this.items.push({f:f,o:o||9});this.items.sort(function(a,b){return a.o-b.o});if(this.draw)this.draw()}};
(function(){
var K="bm-theme",root=document.documentElement,mode="auto";
try{mode=localStorage.getItem(K)||"auto";var ol=localStorage.getItem("bm-oyasumi");if(ol==="on"||ol==="night"){mode=ol==="on"?"oya":"night";localStorage.setItem(K,mode)}if(ol)localStorage.removeItem("bm-oyasumi")}catch(e){}
var mq=window.matchMedia?matchMedia("(prefers-color-scheme: dark)"):null;
var st=document.createElement("style");st.id="bmtheme";
st.textContent='button[data-bmsb]{display:none!important}'+'#bmcopylink button,#bmcopylink a{white-space:nowrap}@media(max-width:430px){#bmcopylink{gap:6px!important}#bmcopylink button:not(#bmgear){padding:0 10px!important;font-size:13px!important}}'+'html[data-bm-theme="dark"]{--bg:#1E1A13;--card:#2A251B;--ink:#F3E8D2;--mute:#CBBBA0;--ochre-soft:#3A3322;--khaki:#B3C070;--leaf:#9BAD52;--teal:#B3C070;--ochre:#D9A862;--vermilion:#CF5F77;--magenta:#E07C95;color-scheme:dark}'+
'html[data-bm-theme="dark"] body{background-image:none}'+'html[data-bm-oyasumi]{--bg:#14110C;--card:#1F1B14;--mute:#B5A68C}'+'html[data-bm-oyasumi] img{filter:brightness(.82)}'+
'html[data-bm-theme="dark"] #bma11yui,html[data-bm-theme="dark"] #bmthemeui{background:#2A251B!important;color:#F3E8D2!important;border-color:#B3C070!important}'+
'html[data-bm-theme="dark"] #bma11yui button,html[data-bm-theme="dark"] #bmthemeui button{background:#1E1A13!important;color:#B3C070!important;border-color:#B3C070!important}'+
'html[data-bm-theme="dark"] #bma11yui button[aria-pressed="true"],html[data-bm-theme="dark"] #bmthemeui button[aria-pressed="true"]{background:#B3C070!important;color:#1E1A13!important}'+
'html[data-bm-theme="dark"] img{filter:brightness(.92)}'+
'html[data-bm-theme="dark"] .tdbubble,html[data-bm-theme="dark"] .bm-ann,html[data-bm-theme="dark"] .bm-ticket,html[data-bm-theme="dark"] .bm-toc{background:#2A251B!important;color:#F3E8D2!important}'+
'html[data-bm-theme="dark"] #bmcopylink{background:linear-gradient(180deg,#1E1A13 78%,rgba(30,26,19,0))!important}';
(document.head||root).appendChild(st);
function night(){var h=new Date().getHours();return h>=21||h<5}
function oyaOn(){return mode==="oya"||(mode==="night"&&night())}
function dark(){return oyaOn()||mode==="dark"||(mode==="auto"&&mq&&mq.matches)}
function ap(){if(oyaOn())root.setAttribute("data-bm-oyasumi","1");else root.removeAttribute("data-bm-oyasumi");
if(dark())root.setAttribute("data-bm-theme","dark");else root.removeAttribute("data-bm-theme");
var m=document.querySelector('meta[name="theme-color"]');if(m)m.setAttribute("content",dark()?"#1E1A13":"#55602A")}
ap();if(mq&&mq.addEventListener)mq.addEventListener("change",ap);
function ui(){bmSet.add(function(d){
function draw(){d.textContent="";var l=document.createElement("div");l.textContent="いろ(あかるさ)";l.className="lb";d.appendChild(l);
[["auto","じどう"],["light","ライト"],["dark","ダーク"],["oya","おやすみ"],["night","よるだけ おやすみ"]].forEach(function(p){var on=mode===p[0];var b=document.createElement("button");b.type="button";b.className="sb";b.textContent=p[1];b.setAttribute("aria-pressed",on?"true":"false");
b.onclick=function(){mode=p[0];try{localStorage.setItem(K,mode)}catch(e){}ap();draw();if(oyaOn())toast("おやすみなさい。ゆっくり やすんでね。")};d.appendChild(b)});
var h=document.createElement("div");h.style.cssText="font-size:12px;opacity:.8";h.textContent="「おやすみ」は いちばん くらい 画面。「よるだけ おやすみ」は、夜9時〜朝5時に じどうで おやすみに なるよ。";d.appendChild(h)}
draw()},3)}
function toast(t){var o=document.getElementById("bmoya");if(o)o.remove();o=document.createElement("div");o.id="bmoya";o.setAttribute("role","status");o.textContent=t;
o.style.cssText="position:fixed;left:50%;bottom:max(24px,env(safe-area-inset-bottom));transform:translateX(-50%);max-width:88vw;z-index:10001;padding:10px 18px;border-radius:999px;border:2px solid var(--ink,#2E241C);background:var(--card,#FFF8EA);color:var(--ink,#2E241C);font:700 15px/1.6 sans-serif;box-shadow:0 4px 14px rgba(0,0,0,.35);text-align:center";
document.body.appendChild(o);setTimeout(function(){if(o.parentNode)o.remove()},4200)}
if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",function(){setTimeout(ui,0)});else setTimeout(ui,0);
/* オフライン: 見たページを端末に覚えておく */
try{if("serviceWorker" in navigator&&(location.protocol==="https:"||location.hostname==="localhost"))window.addEventListener("load",function(){navigator.serviceWorker.register("sw.js").catch(function(){})})}catch(e){}
})();

/* 全ページの上部に「リンクをコピー」。今のページの アドレスを コピーする */
(function(){
function init(){
if(document.getElementById("bmcopylink"))return;
var row=document.createElement("div");row.id="bmcopylink";
row.style.cssText="display:flex;justify-content:flex-end;align-items:center;gap:8px;padding:max(6px,env(safe-area-inset-top)) max(12px,env(safe-area-inset-right)) 6px 12px;font-family:inherit;position:fixed;top:0;left:0;right:0;box-sizing:border-box;z-index:9990;background:linear-gradient(180deg,var(--bg,#F1E4CC) 78%,rgba(241,228,204,0))";
var b=document.createElement("button");b.type="button";b.innerHTML=bmIco("link")+" リンクをコピー";
b.setAttribute("aria-label","このページのリンクをコピー");
b.style.cssText="min-height:44px;padding:0 14px;border-radius:999px;border:2px solid var(--ink,#2E241C);background:var(--card,#FFF8EA);color:var(--ink,#2E241C);font:700 14px/1 sans-serif;cursor:pointer;box-shadow:0 2px 0 rgba(46,36,28,.25)";
var msg=document.createElement("span");msg.setAttribute("role","status");msg.style.cssText="font-size:13px;color:var(--ink,#2E241C)";
function url(){var u=location.href.replace(/([?&])btn=1(&|$)/,function(m,a,c){return c?a:""}).replace(/[?&]$/,"");return u}
function done(ok){msg.textContent=ok?"コピーしたよ！":"コピーできなかったよ";b.innerHTML=ok?bmIco("check")+" コピーしたよ":bmIco("link")+" リンクをコピー";setTimeout(function(){msg.textContent="";b.innerHTML=bmIco("link")+" リンクをコピー"},2200)}
function fallback(t){try{var ta=document.createElement("textarea");ta.value=t;ta.setAttribute("readonly","");ta.style.cssText="position:fixed;left:-9999px;top:0;opacity:0";document.body.appendChild(ta);ta.select();ta.setSelectionRange(0,t.length);var ok=document.execCommand("copy");document.body.removeChild(ta);done(ok)}catch(e){done(false)}}
b.addEventListener("click",function(){var t=url();if(navigator.clipboard&&navigator.clipboard.writeText){navigator.clipboard.writeText(t).then(function(){done(true)},function(){fallback(t)})}else fallback(t)});
var gb=document.createElement("button");gb.type="button";gb.id="bmgear";gb.innerHTML=bmIco("gear");gb.setAttribute("aria-label","せってい(BGM・見やすさ・いろ)");gb.setAttribute("aria-expanded","false");
gb.style.cssText="min-width:44px;min-height:44px;padding:0;border-radius:50%;border:2px solid var(--ink,#2E241C);background:var(--card,#FFF8EA);color:var(--ink,#2E241C);font:700 22px/1 sans-serif;cursor:pointer;box-shadow:0 2px 0 rgba(46,36,28,.25)";
var pn=document.createElement("div");pn.id="bmsetpanel";pn.hidden=true;pn.setAttribute("role","dialog");pn.setAttribute("aria-label","せってい");
var ps=document.createElement("style");ps.textContent="#bmsetpanel{position:fixed;top:56px;right:max(12px,env(safe-area-inset-right));width:min(92vw,340px);max-height:calc(100vh - 72px);overflow:auto;z-index:10000;padding:10px 14px 12px;border:2px solid var(--ink,#2E241C);border-radius:14px;background:var(--card,#FFF8EA);color:var(--ink,#2E241C);box-shadow:0 6px 18px rgba(0,0,0,.3);font:14px/1.8 sans-serif}#bmsetpanel[hidden]{display:none}#bmsetpanel .hd2{display:flex;justify-content:space-between;align-items:center;font-weight:700;font-size:16px}#bmsetpanel .x{min-width:44px;min-height:44px;border:0;background:none;color:inherit;font-size:20px;cursor:pointer}#bmsetpanel .sec{padding:8px 0;border-top:1.5px dashed var(--khaki,#5E7A1E)}#bmsetpanel .lb{font-weight:700;margin-bottom:2px}#bmsetpanel button.sb{font:inherit;font-size:14px;min-height:40px;padding:0 14px;margin:2px;border-radius:999px;border:2px solid var(--khaki,#5E7A1E);background:var(--card,#fff);color:var(--khaki,#5E7A1E);font-weight:700;cursor:pointer}#bmsetpanel button.sb[aria-pressed=true]{background:var(--khaki,#5E7A1E);color:var(--card,#fff)}#bmsetpanel .vol{display:flex;align-items:center;gap:8px;margin:4px 2px}#bmsetpanel .vol input{flex:1;min-width:0;accent-color:#e8a23a}";document.head.appendChild(ps);
var ph=document.createElement("div");ph.className="hd2";ph.innerHTML="<span>"+bmIco("gear")+" せってい</span>";var px=document.createElement("button");px.type="button";px.className="x";px.textContent="✕";px.setAttribute("aria-label","とじる");ph.appendChild(px);pn.appendChild(ph);
var pb=document.createElement("div");pn.appendChild(pb);
bmSet.draw=function(){pb.textContent="";bmSet.items.forEach(function(it){var s=document.createElement("div");s.className="sec";pb.appendChild(s);try{it.f(s)}catch(e){}})};bmSet.draw();
function tg(on){pn.hidden=!on;gb.setAttribute("aria-expanded",on?"true":"false")}
gb.addEventListener("click",function(e){e.stopPropagation();tg(pn.hidden)});px.addEventListener("click",function(){tg(false);gb.focus()});
document.addEventListener("pointerdown",function(e){if(!pn.hidden&&!pn.contains(e.target)&&e.target!==gb&&!(e.target.closest&&e.target.closest("[data-bmsb]")))tg(false)});
document.addEventListener("keydown",function(e){if(e.key==="Escape"&&!pn.hidden){tg(false);gb.focus()}});
document.body.appendChild(pn);
var sl=document.createElement("a");sl.href="search.html";sl.setAttribute("aria-label","さがす");sl.innerHTML=bmIco("search");sl.style.cssText="min-width:44px;min-height:44px;padding:0;border-radius:50%;border:2px solid var(--ink,#2E241C);background:var(--card,#FFF8EA);color:var(--ink,#2E241C);font:700 22px/1 sans-serif;cursor:pointer;box-shadow:0 2px 0 rgba(46,36,28,.25);display:inline-flex;align-items:center;justify-content:center;text-decoration:none";
row.appendChild(msg);row.appendChild(b);if(!/search\.html$/.test(location.pathname))row.appendChild(sl);row.appendChild(gb);
document.body.insertBefore(row,document.body.firstChild);var spc=document.createElement("div");spc.setAttribute("aria-hidden","true");row.parentNode.insertBefore(spc,row.nextSibling);
function place(){var lb=document.querySelector("[data-bmsb]"),bar=lb&&lb.parentNode,h=bar&&bar!==row?bar.offsetHeight:0;row.style.top=h+"px";spc.style.height=row.offsetHeight+"px"}
place();[200,600,1500].forEach(function(t){setTimeout(place,t)});window.addEventListener("resize",place);
}
if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",init);else init();
})();

/* ボンたちの かくれんぼ: ページの どこかに ちいさな ボンが かくれている日がある */
(function(){
var K="bm-kakure",OFF="bm-kakure-off";
var N={oko:"おこボン",niko:"にこボン",hyoe:"ひょえボン",mogu:"もぐボン",nemu:"ねむボン",tere:"てれボン",niji:"にじボン"},ID=Object.keys(N);
var off=false;try{off=localStorage.getItem(OFF)==="1"}catch(e){}
function load(){try{return JSON.parse(localStorage.getItem(K)||"{}")}catch(e){return {}}}
function save(o){try{localStorage.setItem(K,JSON.stringify(o))}catch(e){}}
function hash(t){var h=2166136261;for(var i=0;i<t.length;i++){h^=t.charCodeAt(i);h=Math.imul(h,16777619)}return h>>>0}
function ymd(){var d=new Date();return d.getFullYear()+"-"+(d.getMonth()+1)+"-"+d.getDate()}
function ui(){bmSet.add(function(d){
function draw(){d.textContent="";var l=document.createElement("div");l.textContent="ボンたちの かくれんぼ";l.className="lb";d.appendChild(l);
var n=document.createElement("div");n.style.cssText="font-size:13px;opacity:.85";var o=load();n.textContent="ページの どこかに、ちいさな ボンが かくれている日が あるよ。いままでに みつけた かず："+(o.total||0);d.appendChild(n);
[[false,"する"],[true,"しない"]].forEach(function(p){var b=document.createElement("button");b.type="button";b.className="sb";b.textContent=p[1];b.setAttribute("aria-pressed",off===p[0]?"true":"false");
b.onclick=function(){off=p[0];try{localStorage.setItem(OFF,off?"1":"0")}catch(e){}draw();if(off){var h=document.getElementById("bmkk");if(h)h.remove()}else place()};d.appendChild(b)})}
draw()},5)}
function toast(t){var o=document.getElementById("bmoya");if(o)o.remove();o=document.createElement("div");o.id="bmoya";o.setAttribute("role","status");o.textContent=t;
o.style.cssText="position:fixed;left:50%;bottom:max(24px,env(safe-area-inset-bottom));transform:translateX(-50%);max-width:88vw;z-index:10001;padding:10px 18px;border-radius:999px;border:2px solid var(--ink,#2E241C);background:var(--card,#FFF8EA);color:var(--ink,#2E241C);font:700 15px/1.6 sans-serif;box-shadow:0 4px 14px rgba(0,0,0,.35);text-align:center";
document.body.appendChild(o);setTimeout(function(){if(o.parentNode)o.remove()},4200)}
function place(){
if(off||document.getElementById("bmkk"))return;
var path=location.pathname.replace(/^.*\//,"")||"index.html";
if(/^(search|games|mini|talk|punicare|nadenade|shiritori)/.test(path))return;
var day=ymd(),seed=hash(day+"|"+path);
if(seed%3!==0)return;
var o=load();if(o.day!==day){o.day=day;o.found={}}
if(o.found[path])return;
var host=document.querySelector("main")||document.body;
var els=[].slice.call(host.querySelectorAll("p,li,dd")).filter(function(e){return e.textContent.trim().length>20&&!e.closest("details:not([open]),summary,button,a,#bmcopylink,.news")});
if(els.length<3)return;
var who=ID[(seed>>>3)%ID.length],tgt=els[(seed>>>7)%els.length];
var b=document.createElement("button");b.id="bmkk";b.type="button";b.setAttribute("aria-label","ちいさな ボンが かくれているよ。みつけた！");
b.style.cssText="display:inline-block;vertical-align:middle;margin:0 4px;padding:0;border:0;background:none;cursor:pointer;opacity:.9;min-width:32px;min-height:32px";
var im=document.createElement("img");im.src="icon_round_"+who+".png";im.alt="";im.width=24;im.height=24;im.style.cssText="width:24px;height:24px;border-radius:50%;pointer-events:none";b.appendChild(im);
b.onclick=function(){var q=load();if(q.day!==day){q.day=day;q.found={}}q.found[path]=1;q.total=(q.total||0)+1;save(q);b.remove();toast("みーつけた！ "+N[who]+"が かくれていたよ。(ぜんぶで "+q.total+" かい)")};
tgt.appendChild(b)}
function init(){ui();place()}
if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",function(){setTimeout(init,0)});else setTimeout(init,0);
})();
