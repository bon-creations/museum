/* サイト共通BGM(BON MEMORIA／ボンの テーマ曲を ⚙ から えらべる)。初期はオフ。再生状態と位置はlocalStorageで引き継ぐ */
(function(){
if(!window.bmStamp){var ss=document.createElement("script");ss.src="stamp.js";document.head.appendChild(ss)}
try{if(localStorage.getItem("bm-nobgm")==="1")return}catch(e){}
if(window.bmBgm)return;
window.bmSet=window.bmSet||{items:[],add:function(f,o){this.items.push({f:f,o:o||9});this.items.sort(function(a,b){return a.o-b.o});if(this.draw)this.draw()}};

var TR={memoria:{t:"BON MEMORIA",f:"bgm.mp3",n:"BON MEMORIA"},oko:{t:"紅彩烈火",f:"theme_oko.mp3",n:"おこ"},niko:{t:"陽彩爛漫",f:"theme_niko.mp3",n:"にこ"},hyoe:{t:"儚彩小夜",f:"theme_hyoe.mp3",n:"ひょえ"},niji:{t:"虹彩漫談",f:"world_prism_v2.mp3",n:"にじ"}};
var K="bm-bgm",a=new Audio();a.loop=true;a.preload="none";a.volume=(typeof ld().v==="number")?ld().v:.6;
function ld(){try{return JSON.parse(localStorage.getItem(K))||{}}catch(e){return{}}}
var st=ld();
function favs(){var x=[];try{x=JSON.parse(localStorage.getItem("bm-oshis")||"[]")||[]}catch(e){}return x.filter(function(k){return TR[k]&&k!=="memoria"})}
var syncPick=(function(){var f=favs();return f.length?f[Math.floor(Math.random()*f.length)]:"memoria"})();
function curKey(){var k=st.src||"memoria";if(k==="sync")return syncPick;return TR[k]?k:"memoria"}
var cur=curKey();a.src=TR[cur].f;
function sv(){try{localStorage.setItem(K,JSON.stringify(st))}catch(e){}}
var css=document.createElement("style");
css.textContent=".bmbgm{position:fixed;left:max(12px,env(safe-area-inset-left,0px));bottom:max(12px,env(safe-area-inset-bottom,0px));z-index:9998;font:700 13px/1 -apple-system,'Zen Maru Gothic','Hiragino Sans',sans-serif;padding:10px 14px;border-radius:999px;border:2px solid rgba(255,255,255,.85);background:rgba(40,30,70,.82);color:#fff;cursor:pointer;box-shadow:0 2px 8px rgba(0,0,0,.3);-webkit-tap-highlight-color:transparent}.bmbgm.on{background:linear-gradient(90deg,#e0506a,#e8a23a,#4ea86a,#2f64c8,#8a4fc8)}.bmbg{position:fixed;left:max(12px,env(safe-area-inset-left,0px));bottom:calc(max(12px,env(safe-area-inset-bottom,0px)) + 46px);z-index:9998;font:700 11px/1 -apple-system,'Zen Maru Gothic',sans-serif;padding:6px 10px;border-radius:999px;border:1.5px solid rgba(255,255,255,.85);background:rgba(40,30,70,.82);color:#fff;cursor:pointer;display:none}.bmbg.show{display:block}.bmvol{position:fixed;left:max(12px,env(safe-area-inset-left,0px));bottom:calc(max(12px,env(safe-area-inset-bottom,0px)) + 82px);z-index:9998;display:none;align-items:center;gap:6px;padding:6px 10px;border-radius:999px;border:1.5px solid rgba(255,255,255,.85);background:rgba(40,30,70,.82);color:#fff;font:700 11px/1 -apple-system,sans-serif}.bmvol.show{display:flex}.bmvol input{width:90px;accent-color:#e8a23a;margin:0}.bmbgm .n{display:inline-block}.bmbgm.on .n{animation:bmn 1s ease-in-out infinite alternate}@keyframes bmn{to{transform:translateY(-3px) rotate(12deg)}}@media(prefers-reduced-motion:reduce){.bmbgm.on .n{animation:none}}";
document.head.appendChild(css);
var b=document.createElement("button");b.type="button";b.className="bmbgm";
function ui(){var on=!a.paused;b.className="sb";b.setAttribute("aria-pressed",on?"true":"false");b.innerHTML='<span class="n">♪</span> '+TR[cur].t+' '+(on?"停止":"を流す");b.setAttribute("aria-label",on?"BGMを止める":"BGM「"+TR[cur].t+"」を流す")}
function go(){yl=false;st.on=true;try{window.bmStamp&&bmStamp.add("bgm")}catch(e){}sv();var p=a.play();if(p&&p.then)p.then(ui,ui);ui()}
function stop(){yl=false;st.on=false;sv();a.pause();ui()}
b.addEventListener("click",function(){a.paused?go():stop()});
ui();
var g=document.createElement("button");g.type="button";g.className="sb";
var v=document.createElement("label");v.className="vol";v.innerHTML='音量<input type="range" min="0" max="100" step="1" aria-label="BGMの音量">';
var vi=v.querySelector("input");vi.value=Math.round((st.v==null?.6:st.v)*100);a.volume=vi.value/100;
vi.addEventListener("input",function(){a.volume=vi.value/100;st.v=a.volume;sv()});
var held=false;
function gu(){var o=st.bg!==false;g.textContent="裏でも流す: "+(o?"する":"しない");g.setAttribute("aria-label","アプリやタブを離れたときもBGMを流す設定。いまは"+(o?"流す":"止める"));g.setAttribute("aria-pressed",o?"true":"false")}
g.addEventListener("click",function(){st.bg=(st.bg===false);sv();gu()});
document.addEventListener("visibilitychange",function(){
if(document.hidden){if(st.bg===false&&!a.paused){held=true;a.pause()}}
else if(held){held=false;a.play().catch(function(){});}
gu()});
a.addEventListener("play",gu);a.addEventListener("pause",gu);gu();
var last=0;
a.addEventListener("timeupdate",function(){var n=Date.now();if(n-last>1500){last=n;st.t=a.currentTime;sv()}});
window.addEventListener("pagehide",function(){if(!a.paused){st.t=a.currentTime;sv()}});
a.addEventListener("play",ui);a.addEventListener("pause",ui);
/* 動画・音楽プレーヤーが鳴るときはBGMを止める */
var yl=false;
document.addEventListener("play",function(e){if(e.target!==a&&!a.paused){yl=true;st.on=false;sv();a.pause();ui()}},true);
/* 曲や動画が最後まで終わったら、BGMに戻る(自分で止めたときは戻らない) */
document.addEventListener("ended",function(e){if(e.target!==a&&yl){yl=false;go()}},true);
/* ページを開いたときは鳴らさない(流すのは「BON MEMORIAを流す」を押したときだけ) */
if(st.on){st.on=false;sv()}
window.bmBgm={play:go,stop:stop,on:function(){return !a.paused}};
function pickSrc(x){st.src=x;sv();var nk=curKey();if(nk===cur){ui();return}var was=!a.paused;a.pause();cur=nk;a.src=TR[cur].f;try{a.load()}catch(e){}ui();if(was)go()}
bmSet.add(function(d){var l=document.createElement("div");l.className="lb";l.textContent="BGM";d.appendChild(l);
var w=document.createElement("div");w.style.cssText="display:flex;flex-wrap:wrap;gap:6px;margin:4px 0";
[["memoria","BON MEMORIA"],["oko","おこ"],["niko","にこ"],["hyoe","ひょえ"],["niji","にじ"],["sync","好きなボンと 同期"]].forEach(function(p){var c=document.createElement("button");c.type="button";c.className="sb";c.textContent=p[1];var on=(st.src||"memoria")===p[0];c.setAttribute("aria-pressed",on?"true":"false");c.addEventListener("click",function(){pickSrc(p[0]);[].forEach.call(w.children,function(x,i){x.setAttribute("aria-pressed",x===c?"true":"false")})});w.appendChild(c)});
d.appendChild(w);var h=document.createElement("div");h.style.cssText="font-size:12px;opacity:.8";h.textContent="「好きなボンと 同期」は、好きなボンの テーマ曲を 流すよ(いくつか えらんでいたら ひらくたびに ランダム。曲が まだ ない ボンだけの ときは BON MEMORIA)。";d.appendChild(h);
d.appendChild(b);d.appendChild(v);d.appendChild(g)},1);
})();
