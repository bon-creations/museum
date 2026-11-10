/* 見やすさ設定: 文字の大きさ・動きをへらす。設定はこの端末だけに保存 */
(function(){
var K="bm-a11y",o={};try{o=JSON.parse(localStorage.getItem(K))||{}}catch(e){}
function sv(){try{localStorage.setItem(K,JSON.stringify(o))}catch(e){}}
var st=document.createElement("style");st.id="bma11y";document.head.appendChild(st);
function ap(){var z=o.z||1;st.textContent=(z!==1?"html{font-size:"+(z*100)+"% !important}body{zoom:"+z+"}":"")+(o.m?"*,*::before,*::after{animation-duration:.001s !important;animation-iteration-count:1 !important;transition-duration:.001s !important;scroll-behavior:auto !important}":"")}
ap();
function ui(){var f=document.querySelector("footer");if(!f||document.getElementById("bma11yui"))return;var d=document.createElement("div");d.id="bma11yui";d.style.cssText="margin:14px auto;max-width:90%;padding:10px 14px;border:2px dashed #5E7A1E;border-radius:14px;background:#fff8e8;color:#2E241C;font-size:14px;line-height:1.8;text-align:center";
function mk(t,fn,on){var b=document.createElement("button");b.type="button";b.textContent=t;b.setAttribute("aria-pressed",on?"true":"false");b.style.cssText="font:inherit;font-size:14px;min-height:40px;padding:0 14px;margin:2px;border-radius:999px;border:2px solid #5E7A1E;background:"+(on?"#5E7A1E":"#fff")+";color:"+(on?"#fff":"#5E7A1E")+";font-weight:700;cursor:pointer";b.onclick=fn;return b}
function draw(){d.textContent="";var l=document.createElement("div");l.textContent="見やすさ";l.style.fontWeight="700";d.appendChild(l);var z=o.z||1;[["文字 ふつう",1],["文字 大",1.15],["文字 とても大",1.3]].forEach(function(x){d.appendChild(mk(x[0],function(){o.z=x[1];sv();ap();draw()},z===x[1]))});d.appendChild(document.createElement("br"));d.appendChild(mk(o.m?"動きをへらす: オン":"動きをへらす: オフ",function(){o.m=!o.m;sv();ap();draw()},!!o.m))}
draw();f.parentNode.insertBefore(d,f)}
if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",ui);else ui();
})();
