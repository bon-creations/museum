/* ボンの テーマ曲: 小説・せかいかん・さくしゃのページ用。ボンを えらんで 流す。初期はオフ。
   好きなボン(bm-oshis)の うち 曲がある子から ランダムに 最初の1曲を えらんでおく */
(function(){
if(window.bmNiji)return;
window.bmSet=window.bmSet||{items:[],add:function(f,o){this.items.push({f:f,o:o||9});this.items.sort(function(a,b){return a.o-b.o});if(this.draw)this.draw()}};
var S={
oko:{n:"おこボン",t:"紅彩烈火",g:"オーケストラ・ミリタリーマーチ",f:"theme_oko.mp3"},
niko:{n:"にこボン",t:"陽彩爛漫",g:"ヨーロッパ風ポルカ",f:"theme_niko.mp3"},
hyoe:{n:"ひょえボン",t:"儚彩小夜",g:"幻想的なオーケストラ・ファンタジー",f:"theme_hyoe.mp3"},
mogu:{n:"もぐボン",t:"豊彩饗宴",g:"ケルト・フォーク／フォークダンス",f:"theme_mogu.mp3"},
nemu:{n:"ねむボン",t:"夢彩揺籠",g:"ドリームアンビエント／オルゴール・ファンタジー",f:"theme_nemu.mp3"},
tere:{n:"てれボン",t:"桃彩詩篇",g:"フレンチ・ミュゼット／パリ風アコースティック",f:"theme_tere.mp3"},
niji:{n:"にじボン",t:"虹彩漫談",g:"文豪風の、語るような一曲",f:"world_prism_v2.mp3"}};
var ORD=["oko","niko","hyoe","mogu","nemu","tere","niji"];
var K="bm-niji";
function ld(){try{return JSON.parse(localStorage.getItem(K))||{}}catch(e){return{}}}
var st=ld();if(!st.ts)st.ts={};function sv(){try{localStorage.setItem(K,JSON.stringify(st))}catch(e){}}
function favs(){var a=[];try{a=JSON.parse(localStorage.getItem("bm-oshis")||"[]")||[]}catch(e){}return a.filter(function(k){return S[k]&&S[k].f})}
var cur=(function(){var a=favs();return a.length?a[Math.floor(Math.random()*a.length)]:"niji"})();
var a=document.createElement("audio");a.src=S[cur].f;a.loop=true;a.preload="none";a.hidden=true;
a.volume=(typeof st.v==="number")?st.v:.6;
function add(){document.body&&document.body.appendChild(a)}
if(document.body)add();else document.addEventListener("DOMContentLoaded",add);
var subs=[];function fire(){subs.forEach(function(f){try{f()}catch(e){}})}
function other(){try{if(window.bmBgm&&bmBgm.on())bmBgm.stop()}catch(e){}}
function savePos(){if(a.currentTime>0){st.ts[cur]=a.currentTime;sv()}}
function go(){other();var t=st.ts[cur];if(t&&!isNaN(t)){try{a.currentTime=t}catch(e){}}var p=a.play();if(p&&p.then)p.then(fire,fire);fire()}
function stop(){a.pause();fire()}
function pick(k){if(!S[k]||!S[k].f||k===cur)return;var was=!a.paused;savePos();a.pause();cur=k;a.src=S[k].f;try{a.load()}catch(e){}if(was)go();else fire()}
/* ボンを えらぶボタン(カードと⚙で共通) */
function chips(box){var w=document.createElement("div");w.style.cssText="display:flex;flex-wrap:wrap;gap:6px;margin:4px 0";
ORD.forEach(function(k){var s=S[k],b=document.createElement("button");b.type="button";b.className="sb nj-chip";b.setAttribute("data-k",k);
b.textContent=s.n.replace("ボン","")+(s.f?"":"(じゅんび中)");
if(!s.f){b.disabled=true;b.setAttribute("aria-disabled","true")}
b.addEventListener("click",function(){pick(k)});w.appendChild(b)});box.appendChild(w);
function r(){[].forEach.call(w.children,function(b){var k=b.getAttribute("data-k");var on=k===cur;b.setAttribute("aria-pressed",on?"true":"false");if(b.disabled){b.style.opacity=".5"}})}
subs.push(r);r()}
var v=document.createElement("label");v.className="vol";v.innerHTML='音量<input type="range" min="0" max="100" step="1" aria-label="テーマ曲の音量">';
var vi=v.querySelector("input");vi.value=Math.round(a.volume*100);
vi.addEventListener("input",function(){a.volume=vi.value/100;st.v=a.volume;sv()});
var last=0;a.addEventListener("timeupdate",function(){var n=Date.now();if(n-last>1500){last=n;savePos()}});
window.addEventListener("pagehide",function(){if(!a.paused)savePos()});
a.addEventListener("play",fire);a.addEventListener("pause",fire);
/* BON MEMORIAが鳴りはじめたら、こちらは止める */
setInterval(function(){try{if(!a.paused&&window.bmBgm&&bmBgm.on())stop()}catch(e){}},500);
/* ページの上にも、目立つカードを出す(トップページでは出さない) */
function card(){
if(window.bmNijiNoCard||document.getElementById("bmNijiCard"))return;
var h=document.querySelector("header");if(!h)return;
var st2=document.createElement("style");
st2.textContent="#bmNijiCard{max-width:880px;margin:12px auto;padding:10px 14px;border:3px solid transparent;border-radius:16px;background:linear-gradient(#FFF8EA,#FFF8EA) padding-box,linear-gradient(90deg,#e0506a,#e8a23a,#4ea86a,#2f64c8,#8a4fc8) border-box;color:#2E241C;font-family:inherit}#bmNijiCard .row{display:flex;align-items:center;gap:12px;flex-wrap:wrap}#bmNijiCard .tx{flex:1;min-width:180px;font-size:14px;line-height:1.5}#bmNijiCard .tx b{display:block;font-size:15px}#bmNijiCard button{min-height:44px;padding:0 16px;border-radius:999px;border:2px solid #2E241C;background:#fff;color:#2E241C;font:700 14px/1 sans-serif;cursor:pointer;box-shadow:0 2px 0 rgba(46,36,28,.25)}#bmNijiCard button.nj-chip{min-height:40px;padding:0 12px;font-size:13px}#bmNijiCard button[aria-pressed=true]{background:#2E241C;color:#fff}#bmNijiCard.on .play{background:linear-gradient(90deg,#f6b8c4,#f6dca8,#b8e0c4,#b4cdf0,#d4bcf0);color:#2E241C}#bmNijiCard button:disabled{cursor:default}#bmNijiCard .n{display:inline-block}";
document.head.appendChild(st2);
var c=document.createElement("div");c.id="bmNijiCard";c.setAttribute("role","group");c.setAttribute("aria-label","ボンの テーマ曲");
var row=document.createElement("div");row.className="row";
var t=document.createElement("div");t.className="tx";
var cb=document.createElement("button");cb.type="button";cb.className="play";
function cu(){var on=!a.paused,s=S[cur];c.className=on?"on":"";
t.innerHTML=on?"<b>♪ "+s.n+"の テーマ曲「"+s.t+"」が 流れているよ</b>"+s.g+"。とめるときは、右のボタンを おしてね。":"<b>♪ ボンの テーマ曲を 流せるよ</b>いまは「"+s.n+"」の「"+s.t+"」("+s.g+")。下で ほかの ボンも えらべるよ。(はじめは オフだよ)";
cb.innerHTML='<span class="n">♪</span> '+(on?"とめる":"流す");cb.setAttribute("aria-pressed",on?"true":"false")}
cb.addEventListener("click",function(){a.paused?go():stop()});
subs.push(cu);cu();
row.appendChild(t);row.appendChild(cb);c.appendChild(row);chips(c);
h.parentNode.insertBefore(c,h.nextSibling)}
if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",card);else card();
window.bmNiji={play:go,stop:stop,on:function(){return !a.paused},pick:pick};
if(!window.bmNijiNoPanel)bmSet.add(function(d){var l=document.createElement("div");l.className="lb";l.textContent="ボンの テーマ曲";d.appendChild(l);
var pb=document.createElement("button");pb.type="button";pb.className="sb";
function pu(){var on=!a.paused;pb.setAttribute("aria-pressed",on?"true":"false");pb.innerHTML='<span class="n">♪</span> '+S[cur].t+" "+(on?"停止":"を流す")}
pb.addEventListener("click",function(){a.paused?go():stop()});subs.push(pu);pu();
chips(d);d.appendChild(pb);d.appendChild(v)},2);
})();
