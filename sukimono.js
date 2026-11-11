/* すきなもの: ランダム・今日のすきなもの */
(function(){
var page=(location.pathname.split("/").pop()||"index.html").split("?")[0];
function load(cb){if(window.BM_INDEX)return cb(window.BM_INDEX);var s=document.createElement("script");s.src="search_index.js";s.onload=function(){cb(window.BM_INDEX||[])};s.onerror=function(){cb([])};document.head.appendChild(s)}
function cards(ix){return ix.filter(function(e){return/^sukimono_/.test(e.p)&&e.a})}
function ttl(e){var h=e.h.split(" › ");return h[h.length-1]}
function esc(s){return String(s).replace(/[&<>"]/g,function(c){return{"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]})}
function css(t){var s=document.createElement("style");s.textContent=t;document.head.appendChild(s)}
function sec(id,icon,title,body){var s=document.createElement("section");s.setAttribute("aria-labelledby",id);s.innerHTML='<h2 id="'+id+'"><svg class="i fl" width="24" height="24" aria-hidden="true"><use href="#'+icon+'"/></svg><span class="t">'+title+'</span></h2>'+body;return s}
if(page==="sukimono.html"){load(function(ix){var cs=cards(ix);if(!cs.length)return;var h0=document.getElementById("h0");if(!h0)return;h0=h0.parentNode;
var r=sec("skr","star","ランダムで 1枚",'<article class="sheet plain" style="margin-top:14px"><p>どのカードが出るかは、おたのしみ！</p><p class="sk-link"><button type="button" id="skrb" style="font:inherit;color:var(--vermilion);background:none;border:2px solid var(--vermilion);border-radius:999px;min-height:44px;padding:0 18px;cursor:pointer">ひらいてみる →</button></p></article>');
h0.parentNode.insertBefore(r,h0);
document.getElementById("skrb").onclick=function(){var e=cs[Math.floor(Math.random()*cs.length)];location.href=e.p+"#"+e.a};
})}
if(page==="index.html"||page===""){var t=document.getElementById("today");if(t)load(function(ix){var cs=cards(ix);if(!cs.length)return;var d=new Date(),n=Math.floor(new Date(d.getFullYear(),d.getMonth(),d.getDate()).getTime()/864e5);var SE=[[1,20,2,3,["f6"]],[1,20,2,20,["e12"]],[2,10,3,10,["e15"]],[2,20,3,3,["k18"]],[3,5,3,25,["e13"]],[3,25,4,15,["f16"]],[4,25,5,5,["k19"]],[6,1,7,10,["f35"]],[7,10,8,10,["f40"]],[8,1,8,16,["e3"]],[10,15,10,31,["e14","f25"]],[11,1,2,15,["k17","r4","k6","e9"]],[12,20,12,31,["f32"]]],md=(d.getMonth()+1)*100+d.getDate(),ids=[];
SE.forEach(function(w){var a=w[0]*100+w[1],b=w[2]*100+w[3],on=a<=b?(md>=a&&md<=b):(md>=a||md<=b);if(on)ids=ids.concat(w[4])});
var pool=cs.filter(function(c){return c.p&&ids.indexOf(c.a)>=0}),sea=pool.length>0;if(!sea)pool=cs;
var e=pool[(n*7919)%pool.length],x=(e.x||"").split(" ")[0];if(x.length>90)x=x.slice(0,88)+"…";
var s=sec("sd3","star","今日の すきなもの",'<div class="sheet plain">'+(sea?'<p><span class="tag on">いまの 季節</span></p>':'')+'<p><b>'+esc(ttl(e))+"</b></p><p>"+esc(x)+'</p><p class="sk-link"><a href="'+e.p+"#"+e.a+'">くわしく見る →</a>　<a href="sukimono.html">すきなもの へ</a></p></div>');t.parentNode.insertBefore(s,t.nextSibling)})}
})();
