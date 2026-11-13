/* ページ内もくじ: 見出し(h2)が4つ以上ある長いページの先頭に、ジャンプ用のもくじを出す */
(function(){
function go(){
var m=document.querySelector("main");if(!m||document.getElementById("bmToc"))return;
var hs=[].filter.call(m.querySelectorAll("h2[id]"),function(h){return h.offsetParent!==null||true});
if(hs.length<4)return;
var d=document.createElement("details");d.id="bmToc";d.className="sheet plain";d.style.cssText="margin:12px 0";
var s=document.createElement("summary");s.textContent="このページの もくじ";s.style.cssText="cursor:pointer;font-weight:700;min-height:44px;display:flex;align-items:center";d.appendChild(s);
var ul=document.createElement("ul");ul.style.cssText="margin:6px 0 0;padding-left:1.2em;line-height:2";
hs.forEach(function(h){var t=h.querySelector(".t"),x=(t||h).textContent.trim();if(!x)return;var li=document.createElement("li"),a=document.createElement("a");a.href="#"+h.id;a.textContent=x;li.appendChild(a);ul.appendChild(li)});
d.appendChild(ul);
var hd=m.querySelector("header");if(hd&&hd.parentNode===m)m.insertBefore(d,hd.nextSibling);else m.insertBefore(d,m.firstChild);
}
if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",go);else go();
})();
