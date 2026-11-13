/* 小説の読みやすさ: 文字の大きさ・行間(この端末だけに保存) */
(function(){
var K="bm-read",o={fs:1,lh:1};try{var v=JSON.parse(localStorage.getItem(K));if(v)o=v}catch(e){}
var FS=[["小",16],["中",18],["大",21]],LH=[["せまい",1.8],["ふつう",2],["ひろい",2.4]];
var st=document.createElement("style");document.head.appendChild(st);
function apply(){st.textContent='p[style*="line-height:2"]{font-size:'+FS[o.fs][1]+'px!important;line-height:'+LH[o.lh][1]+'!important}'}
apply();
var nav=document.querySelector('nav[aria-label="もくじ"]');if(!nav)return;
var bar=document.createElement("div");bar.className="sheet plain";bar.style.cssText="margin-top:10px";
bar.innerHTML='<h3 style="margin:0 0 6px">よみやすさ</h3><div id="rdF" style="display:flex;flex-wrap:wrap;gap:6px;align-items:center;margin-bottom:6px"><span style="font-size:14px">もじ</span></div><div id="rdL" style="display:flex;flex-wrap:wrap;gap:6px;align-items:center"><span style="font-size:14px">ぎょうかん</span></div>';
nav.parentNode.insertBefore(bar,nav.nextSibling);
function mk(box,list,key){list.forEach(function(x,i){var b=document.createElement("button");b.type="button";b.textContent=x[0];b.setAttribute("aria-pressed",o[key]===i?"true":"false");
function sty(){var on=o[key]===i;b.style.cssText="font:inherit;font-size:15px;min-height:40px;padding:4px 14px;border-radius:999px;border:2px solid #5E7A1E;font-weight:700;cursor:pointer;background:"+(on?"#5E7A1E":"transparent")+";color:"+(on?"#fff":"#5E7A1E")}
sty();b.addEventListener("click",function(){o[key]=i;try{localStorage.setItem(K,JSON.stringify(o))}catch(e){}apply();[].forEach.call(box.querySelectorAll("button"),function(c,j){c.setAttribute("aria-pressed",j===i?"true":"false");var on=j===i;c.style.background=on?"#5E7A1E":"transparent";c.style.color=on?"#fff":"#5E7A1E"})});box.appendChild(b)})}
mk(document.getElementById("rdF"),FS,"fs");mk(document.getElementById("rdL"),LH,"lh");
})();

/* しおり(読みかけの章を自動で覚える)・はいけい色 (この端末だけに保存) */
(function(){
function ready(f){if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",f);else f()}
ready(function(){
var L=document.getElementById("rdL");if(!L)return;var bar=L.parentNode;
var BK="bm-bg",MK="bm-mark:"+location.pathname.replace(/^.*\//,"");
var BG=[["ふつう",""],["しろ","w"],["よる","d"]],CSS={w:":root{--bg:#fff;--card:#fff}body{background-image:none!important}",d:":root{--bg:#1E1A16;--card:#2A241E;--ink:#F3E8D2;--mute:#D5C6AC;--khaki:#B7C46A;--leaf:#A9BE63;--ochre-soft:#4A3D2A;--teal:#B7C46A;--magenta:#E7A0B0;--vermilion:#B4485C}body{background-image:none!important;color:#F3E8D2}"};
var bg="";try{bg=localStorage.getItem(BK)||""}catch(e){}
var st=document.createElement("style");document.head.appendChild(st);function ap(){st.textContent=CSS[bg]||""}ap();
function btn(t,on,fn){var b=document.createElement("button");b.type="button";b.textContent=t;b.setAttribute("aria-pressed",on?"true":"false");b.onclick=fn;b.style.cssText="font:inherit;font-size:15px;min-height:40px;padding:4px 14px;border-radius:999px;border:2px solid #5E7A1E;font-weight:700;cursor:pointer;background:"+(on?"#5E7A1E":"transparent")+";color:"+(on?"#fff":"#5E7A1E");return b}
function row(lbl){var d=document.createElement("div");d.style.cssText="display:flex;flex-wrap:wrap;gap:6px;align-items:center;margin-top:6px";var s=document.createElement("span");s.style.fontSize="14px";s.textContent=lbl;d.appendChild(s);bar.appendChild(d);return d}
var rb=row("はいけい");function drawB(){[].slice.call(rb.querySelectorAll("button")).forEach(function(b){b.remove()});BG.forEach(function(x){rb.appendChild(btn(x[0],bg===x[1],function(){bg=x[1];try{localStorage.setItem(BK,bg)}catch(e){}if(window.bmBg)bmBg(bg);ap();drawB()}))})}drawB();
var heads=[].slice.call(document.querySelectorAll("main h2[id]")).filter(function(h){return h.querySelector(".t")&&/^n\d+$/.test(h.id)});
if(heads.length<2)return;
var rm=row("しおり");var cur=null,saved=null;try{saved=JSON.parse(localStorage.getItem(MK))}catch(e){}
function title(h){return h.querySelector(".t").textContent.trim()}
function drawM(){[].slice.call(rm.querySelectorAll("button")).forEach(function(b){b.remove()});
if(saved&&document.getElementById(saved.id)){rm.appendChild(btn("つづきから よむ："+saved.t,false,function(){var h=document.getElementById(saved.id);if(h)h.scrollIntoView({block:"start"})}));rm.appendChild(btn("しおりを けす",false,function(){saved=null;try{localStorage.removeItem(MK)}catch(e){}drawM()}))}
else{var s=document.createElement("button");s.type="button";s.disabled=true;s.textContent="よみすすめると、ここで つづきから よめるよ";s.style.cssText="font:inherit;font-size:14px;background:none;border:0;color:inherit;opacity:.75;padding:0";rm.appendChild(s)}}
drawM();
var tm=null;function track(){var y=window.innerHeight*0.3,c=null;heads.forEach(function(h){if(h.getBoundingClientRect().top<y)c=h});if(!c||c===cur)return;cur=c;clearTimeout(tm);tm=setTimeout(function(){saved={id:c.id,t:title(c)};try{localStorage.setItem(MK,JSON.stringify(saved))}catch(e){}},1500)}
window.addEventListener("scroll",track,{passive:true});
});
})();

/* よむ時間の目安 */
(function(){
function ready(f){if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",f);else f()}
ready(function(){var L=document.getElementById("rdL");if(!L)return;var bar=L.parentNode;
var n=0;[].forEach.call(document.querySelectorAll("main article.sheet.plain"),function(a){n+=a.textContent.replace(/\s+/g,"").length});
if(n<300)return;var m=Math.max(1,Math.round(n/500));if(m>=10)m=Math.round(m/5)*5;
var d=document.createElement("div");d.style.cssText="margin-top:6px;font-size:14px";d.textContent="よむ時間の目安：約"+m+"分（"+n.toLocaleString()+"字）";bar.appendChild(d)})
})();
