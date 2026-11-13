/* 見やすさ設定: 文字の大きさ・動きをへらす。設定はこの端末だけに保存 */
window.bmSet=window.bmSet||{items:[],add:function(f,o){this.items.push({f:f,o:o||9});this.items.sort(function(a,b){return a.o-b.o});if(this.draw)this.draw()}};
(function(){
var K="bm-a11y",o={};try{o=JSON.parse(localStorage.getItem(K))||{}}catch(e){}
function sv(){try{localStorage.setItem(K,JSON.stringify(o))}catch(e){}}
var st=document.createElement("style");st.id="bma11y";document.head.appendChild(st);
var DK=":root{--bg:#1E1A16;--card:#2A241E;--ink:#F3E8D2;--mute:#D5C6AC;--khaki:#B7C46A;--leaf:#A9BE63;--ochre-soft:#4A3D2A;--teal:#B7C46A;--magenta:#E7A0B0;--vermilion:#B4485C}body{background-image:none!important;color:#F3E8D2}",CW=":root{--bg:#fff;--card:#fff}body{background-image:none!important}",bgv="";try{bgv=localStorage.getItem("bm-bg")||""}catch(e){}
window.bmBg=function(v){if(v!==undefined){bgv=v;try{localStorage.setItem("bm-bg",v)}catch(e){}ap()}return bgv};
function ap(){var z=o.z||1;st.textContent=((z!==1?"html{font-size:"+(z*100)+"% !important}body{zoom:"+z+"}":"")+(o.m?"*,*::before,*::after{animation-duration:.001s !important;animation-iteration-count:1 !important;transition-duration:.001s !important;scroll-behavior:auto !important}":""))+(bgv==="w"?CW:"")}
ap();
function ui(){bmSet.add(function(d){
function mk(t,fn,on){var b=document.createElement("button");b.type="button";b.className="sb";b.textContent=t;b.setAttribute("aria-pressed",on?"true":"false");b.onclick=fn;return b}
function draw(){d.textContent="";var l=document.createElement("div");l.textContent="見やすさ";l.className="lb";d.appendChild(l);var z=o.z||1;[["文字 ふつう",1],["文字 大",1.15],["文字 とても大",1.3]].forEach(function(x){d.appendChild(mk(x[0],function(){o.z=x[1];sv();ap();draw()},z===x[1]))});d.appendChild(document.createElement("br"));d.appendChild(mk(o.m?"動きをへらす: オン":"動きをへらす: オフ",function(){o.m=!o.m;sv();ap();draw()},!!o.m));d.appendChild(document.createElement("br"));var fa=document.createElement("a");fa.href="fav.html";fa.textContent="♡ お気に入りを見る";fa.className="sb";fa.style.display="inline-block";fa.style.textDecoration="none";d.appendChild(fa)}
draw()},2)}
if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",ui);else ui();
})();

/* ページ上へボタン・ギャラリーのスワイプ */
(function(){
function ready(f){if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",f);else f()}
ready(function(){
/* ページ上へ */
var t=document.createElement("button");t.type="button";t.textContent="↑";t.setAttribute("aria-label","ページの いちばん上へ");
t.style.cssText="position:fixed;right:max(12px,env(safe-area-inset-right));bottom:max(68px,calc(56px + env(safe-area-inset-bottom)));z-index:9998;width:44px;height:44px;border-radius:50%;border:2px solid #2E241C;background:#FFF8EA;color:#2E241C;font:700 20px/1 sans-serif;box-shadow:0 2px 0 rgba(46,36,28,.35);opacity:.92;cursor:pointer;display:none";
t.onclick=function(){var r=false;try{r=matchMedia("(prefers-reduced-motion: reduce)").matches}catch(e){}window.scrollTo({top:0,behavior:r?"auto":"smooth"})};
document.body.appendChild(t);
function sc(){t.style.display=(window.pageYOffset||document.documentElement.scrollTop)>700?"block":"none"}
window.addEventListener("scroll",sc,{passive:true});sc();
/* ギャラリーのスワイプ */
var lb=document.getElementById("lb");
if(lb&&document.getElementById("lb-next")){var x0=null;lb.addEventListener("touchstart",function(e){x0=e.touches.length===1?e.touches[0].clientX:null},{passive:true});lb.addEventListener("touchend",function(e){if(x0===null)return;var dx=e.changedTouches[0].clientX-x0;x0=null;if(Math.abs(dx)>50)document.getElementById(dx<0?"lb-next":"lb-prev").click()},{passive:true})}
});
})();

/* Xシェアに #BONCREATIONS を付ける */
(function(){
function f(){[].forEach.call(document.querySelectorAll('a[href^="https://twitter.com/intent/tweet"]'),function(a){if(a.href.indexOf("hashtags=")<0)a.href+="&hashtags=BONCREATIONS"})}
if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",f);else f();
})();


/* お気に入り(♡) ゲーム・小説のカードに付ける。この端末だけに保存 */
(function(){
var FK="bm-fav";function gl(){try{return JSON.parse(localStorage.getItem(FK))||[]}catch(e){return[]}}
function sl(l){try{localStorage.setItem(FK,JSON.stringify(l))}catch(e){}}
window.bmFav={get:gl,set:sl};
function ready(f){if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",f);else f()}
ready(function(){
var p=location.pathname.replace(/^.*\//,"");if(p!=="games.html"&&p!=="novels.html")return;
[].forEach.call(document.querySelectorAll("article.sheet"),function(a){var h=a.querySelector("h3");if(!h)return;
var u,t=h.cloneNode(true);[].forEach.call(t.querySelectorAll("rt"),function(r){r.remove()});
t=t.textContent.replace(/\s+/g," ").trim();
if(p==="games.html"){if(!h.id)return;u="games.html#"+h.id}else{var l=h.querySelector("a");if(!l)return;u=l.getAttribute("href")}
var b=document.createElement("button");b.type="button";b.style.cssText="font:inherit;font-size:15px;min-height:36px;padding:2px 14px;border-radius:999px;border:2px solid #B4485C;background:transparent;color:#B4485C;font-weight:700;cursor:pointer;margin:6px 0 0";
function dr(){var on=gl().some(function(x){return x.u===u});b.textContent=on?"♥ お気に入り中":"♡ お気に入り";b.setAttribute("aria-pressed",on?"true":"false");b.style.background=on?"#B4485C":"transparent";b.style.color=on?"#fff":"#B4485C"}
b.onclick=function(){var l=gl(),i=-1;l.forEach(function(x,k){if(x.u===u)i=k});if(i>=0)l.splice(i,1);else l.push({u:u,t:t,k:p==="games.html"?"g":"n"});sl(l);dr()};dr();
h.insertAdjacentElement("afterend",b)})
})
})();
