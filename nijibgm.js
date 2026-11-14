/* 虹彩漫談(にじボンのテーマ曲): 小説・せかいかん・さくしゃのページ用。初期はオフ */
(function(){
if(window.bmNiji)return;
window.bmSet=window.bmSet||{items:[],add:function(f,o){this.items.push({f:f,o:o||9});this.items.sort(function(a,b){return a.o-b.o});if(this.draw)this.draw()}};
var K="bm-niji";
function ld(){try{return JSON.parse(localStorage.getItem(K))||{}}catch(e){return{}}}
var st=ld();function sv(){try{localStorage.setItem(K,JSON.stringify(st))}catch(e){}}
var a=document.createElement("audio");a.src="world_prism_v2.mp3";a.loop=true;a.preload="none";a.hidden=true;
a.volume=(typeof st.v==="number")?st.v:.6;
function add(){document.body&&document.body.appendChild(a)}
if(document.body)add();else document.addEventListener("DOMContentLoaded",add);
var b=document.createElement("button");b.type="button";b.className="sb";
function ui(){var on=!a.paused;b.setAttribute("aria-pressed",on?"true":"false");b.innerHTML='<span class="n">♪</span> 虹彩漫談 '+(on?"停止":"を流す");b.setAttribute("aria-label",on?"虹彩漫談を止める":"にじボンのテーマ曲「虹彩漫談」を流す")}
function other(){try{if(window.bmBgm&&bmBgm.on())bmBgm.stop()}catch(e){}}
function go(){other();if(st.t&&!isNaN(st.t)){try{a.currentTime=st.t}catch(e){}}var p=a.play();if(p&&p.then)p.then(ui,ui);ui()}
function stop(){a.pause();ui()}
b.addEventListener("click",function(){a.paused?go():stop()});
var v=document.createElement("label");v.className="vol";v.innerHTML='音量<input type="range" min="0" max="100" step="1" aria-label="虹彩漫談の音量">';
var vi=v.querySelector("input");vi.value=Math.round(a.volume*100);
vi.addEventListener("input",function(){a.volume=vi.value/100;st.v=a.volume;sv()});
var last=0;a.addEventListener("timeupdate",function(){var n=Date.now();if(n-last>1500){last=n;st.t=a.currentTime;sv()}});
window.addEventListener("pagehide",function(){if(!a.paused){st.t=a.currentTime;sv()}});
a.addEventListener("play",ui);a.addEventListener("pause",ui);
/* BON MEMORIAが鳴りはじめたら、こちらは止める */
setInterval(function(){try{if(!a.paused&&window.bmBgm&&bmBgm.on())stop()}catch(e){}},500);
ui();
/* ページの上にも、目立つカードを出す(トップページでは出さない) */
function card(){
if(window.bmNijiNoCard||document.getElementById("bmNijiCard"))return;
var h=document.querySelector("header");if(!h)return;
var st2=document.createElement("style");
st2.textContent="#bmNijiCard{max-width:880px;margin:12px auto;padding:10px 14px;border:3px solid transparent;border-radius:16px;background:linear-gradient(#FFF8EA,#FFF8EA) padding-box,linear-gradient(90deg,#e0506a,#e8a23a,#4ea86a,#2f64c8,#8a4fc8) border-box;color:#2E241C;display:flex;align-items:center;gap:12px;flex-wrap:wrap;font-family:inherit}#bmNijiCard .tx{flex:1;min-width:180px;font-size:14px;line-height:1.5}#bmNijiCard .tx b{display:block;font-size:15px}#bmNijiCard button{min-height:44px;padding:0 18px;border-radius:999px;border:2px solid #2E241C;background:#fff;color:#2E241C;font:700 14px/1 sans-serif;cursor:pointer;box-shadow:0 2px 0 rgba(46,36,28,.25)}#bmNijiCard.on button{background:linear-gradient(90deg,#f6b8c4,#f6dca8,#b8e0c4,#b4cdf0,#d4bcf0)}#bmNijiCard .n{display:inline-block}#bmNijiCard.on .n{animation:bmnj 1s ease-in-out infinite alternate}@keyframes bmnj{to{transform:translateY(-3px) rotate(12deg)}}@media(prefers-reduced-motion:reduce){#bmNijiCard.on .n{animation:none}}";
document.head.appendChild(st2);
var c=document.createElement("div");c.id="bmNijiCard";c.setAttribute("role","group");c.setAttribute("aria-label","虹彩漫談");
var t=document.createElement("div");t.className="tx";
var cb=document.createElement("button");cb.type="button";
function cu(){var on=!a.paused;c.className=on?"on":"";t.innerHTML=on?"<b>♪ 虹彩漫談が 流れているよ</b>にじボンの テーマ曲。とめるときは、右のボタンを おしてね。":"<b>♪ にじボンの テーマ曲「虹彩漫談」</b>おはなしを よみながら、きいてみてね。(はじめは オフだよ)";cb.innerHTML='<span class="n">♪</span> '+(on?"とめる":"流す");cb.setAttribute("aria-pressed",on?"true":"false")}
cb.addEventListener("click",function(){a.paused?go():stop()});
a.addEventListener("play",cu);a.addEventListener("pause",cu);cu();
c.appendChild(t);c.appendChild(cb);h.parentNode.insertBefore(c,h.nextSibling)}
if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",card);else card();
window.bmNiji={play:go,stop:stop,on:function(){return !a.paused}};
if(!window.bmNijiNoPanel)bmSet.add(function(d){var l=document.createElement("div");l.className="lb";l.textContent="虹彩漫談(にじボンのテーマ曲)";d.appendChild(l);d.appendChild(b);d.appendChild(v)},2);
})();
