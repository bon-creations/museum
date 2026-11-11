/* いろ(ダークモード) と オフライン対応。設定はこの端末だけに保存 */
(function(){
var K="bm-theme",root=document.documentElement,mode="auto";
try{mode=localStorage.getItem(K)||"auto"}catch(e){}
var mq=window.matchMedia?matchMedia("(prefers-color-scheme: dark)"):null;
var st=document.createElement("style");st.id="bmtheme";
st.textContent='html[data-bm-theme="dark"]{--bg:#1E1A13;--card:#2A251B;--ink:#F3E8D2;--mute:#CBBBA0;--ochre-soft:#3A3322;--khaki:#B3C070;--leaf:#9BAD52;--teal:#B3C070;--ochre:#D9A862;--vermilion:#CF5F77;--magenta:#E07C95;color-scheme:dark}'+
'html[data-bm-theme="dark"] body{background-image:none}'+
'html[data-bm-theme="dark"] #bma11yui,html[data-bm-theme="dark"] #bmthemeui{background:#2A251B!important;color:#F3E8D2!important;border-color:#B3C070!important}'+
'html[data-bm-theme="dark"] #bma11yui button,html[data-bm-theme="dark"] #bmthemeui button{background:#1E1A13!important;color:#B3C070!important;border-color:#B3C070!important}'+
'html[data-bm-theme="dark"] #bma11yui button[aria-pressed="true"],html[data-bm-theme="dark"] #bmthemeui button[aria-pressed="true"]{background:#B3C070!important;color:#1E1A13!important}'+
'html[data-bm-theme="dark"] img{filter:brightness(.92)}';
(document.head||root).appendChild(st);
function dark(){return mode==="dark"||(mode==="auto"&&mq&&mq.matches)}
function ap(){if(dark())root.setAttribute("data-bm-theme","dark");else root.removeAttribute("data-bm-theme");
var m=document.querySelector('meta[name="theme-color"]');if(m)m.setAttribute("content",dark()?"#1E1A13":"#55602A")}
ap();if(mq&&mq.addEventListener)mq.addEventListener("change",ap);
function ui(){var f=document.querySelector("footer");if(!f||document.getElementById("bmthemeui"))return;
var d=document.createElement("div");d.id="bmthemeui";d.style.cssText="margin:14px auto;max-width:90%;padding:10px 14px;border:2px dashed #5E7A1E;border-radius:14px;background:#fff8e8;color:#2E241C;font-size:14px;line-height:1.8;text-align:center";
function draw(){d.textContent="";var l=document.createElement("div");l.textContent="いろ(あかるさ)";d.appendChild(l);
[["auto","じどう"],["light","ライト"],["dark","ダーク"]].forEach(function(p){var on=mode===p[0];var b=document.createElement("button");b.type="button";b.textContent=p[1];b.setAttribute("aria-pressed",on?"true":"false");
b.style.cssText="font:inherit;font-size:14px;min-height:40px;padding:0 14px;margin:2px;border-radius:999px;border:2px solid #5E7A1E;background:"+(on?"#5E7A1E":"#fff")+";color:"+(on?"#fff":"#5E7A1E")+";font-weight:700;cursor:pointer";
b.onclick=function(){mode=p[0];try{localStorage.setItem(K,mode)}catch(e){}ap();draw()};d.appendChild(b)})}
draw();f.parentNode.insertBefore(d,f)}
if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",function(){setTimeout(ui,0)});else setTimeout(ui,0);
/* オフライン: 見たページを端末に覚えておく */
try{if("serviceWorker" in navigator&&(location.protocol==="https:"||location.hostname==="localhost"))window.addEventListener("load",function(){navigator.serviceWorker.register("sw.js").catch(function(){})})}catch(e){}
})();

/* 全ページの上部に「リンクをコピー」。今のページの アドレスを コピーする */
(function(){
function init(){
if(document.getElementById("bmcopylink"))return;
var row=document.createElement("div");row.id="bmcopylink";
row.style.cssText="display:flex;justify-content:flex-end;align-items:center;gap:8px;padding:6px max(12px,env(safe-area-inset-right)) 0 12px;font-family:inherit";
var b=document.createElement("button");b.type="button";b.textContent="🔗 リンクをコピー";
b.setAttribute("aria-label","このページのリンクをコピー");
b.style.cssText="min-height:44px;padding:0 14px;border-radius:999px;border:2px solid var(--ink,#2E241C);background:var(--card,#FFF8EA);color:var(--ink,#2E241C);font:700 14px/1 sans-serif;cursor:pointer;box-shadow:0 2px 0 rgba(46,36,28,.25)";
var msg=document.createElement("span");msg.setAttribute("role","status");msg.style.cssText="font-size:13px;color:var(--ink,#2E241C)";
function url(){var u=location.href.replace(/([?&])btn=1(&|$)/,function(m,a,c){return c?a:""}).replace(/[?&]$/,"");return u}
function done(ok){msg.textContent=ok?"コピーしたよ！":"コピーできなかったよ";b.textContent=ok?"✔ コピーしたよ":"🔗 リンクをコピー";setTimeout(function(){msg.textContent="";b.textContent="🔗 リンクをコピー"},2200)}
function fallback(t){try{var ta=document.createElement("textarea");ta.value=t;ta.setAttribute("readonly","");ta.style.cssText="position:fixed;left:-9999px;top:0;opacity:0";document.body.appendChild(ta);ta.select();ta.setSelectionRange(0,t.length);var ok=document.execCommand("copy");document.body.removeChild(ta);done(ok)}catch(e){done(false)}}
b.addEventListener("click",function(){var t=url();if(navigator.clipboard&&navigator.clipboard.writeText){navigator.clipboard.writeText(t).then(function(){done(true)},function(){fallback(t)})}else fallback(t)});
row.appendChild(msg);row.appendChild(b);
document.body.insertBefore(row,document.body.firstChild);
}
if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",init);else init();
})();
