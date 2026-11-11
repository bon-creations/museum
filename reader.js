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
