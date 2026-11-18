/* BON MUSEUM plus (v491)
   つづきから / 博物館ガイドツアー / マイ来館カード / 記録のバックアップ・復元
   記録はこの端末のブラウザ(localStorage)だけに保存。外部サーバーは使わない。 */
(function(){
var ICO={"book": "<g fill=\"none\" stroke=\"currentColor\" stroke-width=\"2.6\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M24 12C19 8 11 8 5 10v27c6-2 14-2 19 2 5-4 13-4 19-2V10c-6-2-14-2-19 2zM24 12v27\"/></g>", "game": "<g fill=\"none\" stroke=\"currentColor\" stroke-width=\"2.6\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M9 17c-4 0-7 14-5 20 2 4 7 2 9-3l3-5h16l3 5c2 5 7 7 9 3 2-6-1-20-5-20z\"/><path d=\"M14 22v7M10.5 25.5h7\"/><circle cx=\"32\" cy=\"24\" r=\"1.6\"/><circle cx=\"37\" cy=\"28\" r=\"1.6\"/></g>", "note": "<g fill=\"none\" stroke=\"currentColor\" stroke-width=\"2.6\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M19 36V11l20-4v25\"/><circle cx=\"14\" cy=\"37\" r=\"5\"/><circle cx=\"34\" cy=\"33\" r=\"5\"/></g>", "dice": "<g fill=\"none\" stroke=\"currentColor\" stroke-width=\"2.6\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M9 9h30v30H9z\"/><circle cx=\"17\" cy=\"17\" r=\"2\"/><circle cx=\"31\" cy=\"17\" r=\"2\"/><circle cx=\"24\" cy=\"24\" r=\"2\"/><circle cx=\"17\" cy=\"31\" r=\"2\"/><circle cx=\"31\" cy=\"31\" r=\"2\"/></g>", "phone": "<g fill=\"none\" stroke=\"currentColor\" stroke-width=\"2.6\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M14 5h20c1 0 2 1 2 2v34c0 1-1 2-2 2H14c-1 0-2-1-2-2V7c0-1 1-2 2-2z\"/><path d=\"M21 38h6\"/><path d=\"M24 14v12m-5-5l5 5 5-5\"/></g>", "sprout": "<g fill=\"none\" stroke=\"currentColor\" stroke-width=\"2.6\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M24 42V24\"/><path d=\"M24 26C14 26 8 20 8 11c10 0 16 5 16 15z\"/><path d=\"M24 22c0-8 5-13 15-13 0 9-6 14-15 13z\"/></g>", "eye": "<g fill=\"none\" stroke=\"currentColor\" stroke-width=\"2.6\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M4 24c6-10 14-14 20-14s14 4 20 14c-6 10-14 14-20 14S10 34 4 24z\"/><circle cx=\"24\" cy=\"24\" r=\"6\"/></g>", "map": "<g fill=\"none\" stroke=\"currentColor\" stroke-width=\"2.6\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M5 12l13-5 14 5 11-4v28l-11 4-14-5-13 5z\"/><path d=\"M18 7v29M32 12v29\"/></g>", "party": "<g fill=\"none\" stroke=\"currentColor\" stroke-width=\"2.6\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M8 41l7-23 16 16z\"/><path d=\"M27 9V4M37 17l4-3M41 28h5M20 7l-2-4\"/></g>", "key": "<g fill=\"none\" stroke=\"currentColor\" stroke-width=\"2.6\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><circle cx=\"15\" cy=\"24\" r=\"8\"/><path d=\"M23 24h21M38 24v7M32 24v5\"/></g>", "card": "<g fill=\"none\" stroke=\"currentColor\" stroke-width=\"2.6\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M11 6h26v36H11z\"/><path d=\"M24 14l2.5 7h7l-5.5 4 2 7-6-4-6 4 2-7-5.5-4h7z\"/></g>"};function ic(n,px){return '<svg width="'+(px||20)+'" height="'+(px||20)+'" viewBox="0 0 48 48" aria-hidden="true" style="vertical-align:-.2em;margin-right:.2em;flex:none">'+(ICO[n]||"")+'</svg>'}

"use strict";
if(window.bmPlus)return;
var P=(location.pathname.split("/").pop()||"index.html"),F=P.replace(/\.html$/,"");
function J(k,d){try{var v=JSON.parse(localStorage.getItem(k));return v==null?d:v}catch(e){return d}}
function S(k,v){try{localStorage.setItem(k,JSON.stringify(v));return true}catch(e){return false}}
function esc(t){var d=document.createElement("div");d.textContent=String(t==null?"":t);return d.innerHTML}
function ready(f){if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",f);else f()}
function title(){return (document.title||"").split("｜")[0].trim()}
function pad(n){return (n<10?"0":"")+n}
window.bmPlus={};

/* ---------- 1. さいきんの きろく(つづきから用) ---------- */
var SKIP={index:1,mine:1,stamp:1,badge:1,fav:1,search:1,tour:1,card:1,"404":1};
if(!SKIP[F]){
  var rp=J("bm-rc-pages",[]);if(!Array.isArray(rp))rp=[];
  rp=rp.filter(function(x){return x&&x.u!==P});
  rp.unshift({u:P,t:title(),ts:Date.now()});
  S("bm-rc-pages",rp.slice(0,6));
}
if(/^novel/.test(F)&&F!=="novels"&&F!=="novel_order"){
  var recN=function(){var m=J("bm-mark:"+P,null);S("bm-rc-novel",{p:P,n:title(),id:(m&&m.id)||"",t:(m&&m.t)||"",ts:Date.now()})};
  setTimeout(recN,2500);
  window.addEventListener("pagehide",recN);
  document.addEventListener("visibilitychange",function(){if(document.hidden)recN()});
}
document.addEventListener("click",function(e){
  var a=e.target.closest&&e.target.closest("a[href]");if(!a)return;
  var h=a.getAttribute("href")||"";
  var ext=/^https?:\/\/bon-creations\.github\.io\/(?!museum)/.test(h);
  if(!ext&&!/^(nadenade|punicare|shiritori)\.html/.test(h))return;
  var art=a.closest("article"),hh=art&&art.querySelector("h3");
  S("bm-rc-game",{t:((hh?hh.textContent:a.textContent)||"").replace(/\s+/g," ").trim().slice(0,40),u:h,ts:Date.now()});
},true);
document.addEventListener("play",function(e){
  var a=e.target;if(!a||a.id==="bm-bgm-audio"||!a.src||/bgm\.mp3/.test(a.src))return;
  var box=a.closest&&a.closest("article,li,section"),h=box&&box.querySelector("h3"),idEl=a.closest&&a.closest("[id]"),id=(idEl&&/^t\d+$/.test(idEl.id))?idEl.id:"";
  S("bm-rc-music",{t:(h?h.textContent:"").replace(/\s+/g," ").trim().slice(0,40),u:"music.html"+(id?"#"+id:""),ts:Date.now()});
},true);

function clearRecent(){["bm-rc-pages","bm-rc-novel","bm-rc-game","bm-rc-music"].forEach(function(k){try{localStorage.removeItem(k)}catch(e){}})}

/* ---------- トップ: つづきから ---------- */
function renderResume(){
  var box=document.getElementById("bmresume");if(!box)return;
  var rows=[],n=J("bm-rc-novel",null),g=J("bm-rc-game",null),m=J("bm-rc-music",null),pg=J("bm-rc-pages",[]);
  if(n&&n.p)rows.push(["読みかけの小説",n.n+(n.t?"　"+n.t:""),n.p+(n.id?"#"+n.id:""),"つづきから よむ","book"]);
  if(g&&g.u)rows.push(["さいきん あそんだゲーム",g.t||"ゲーム",g.u,"また あそぶ","game"]);
  if(m&&m.u)rows.push(["さいごに きいた曲",m.t||"ミュージック",m.u,"きく","note"]);
  (Array.isArray(pg)?pg:[]).slice(0,3).forEach(function(x){if(x&&x.u)rows.push(["さいきん 見たページ",x.t||x.u,x.u,"ひらく","eye"])});
  var h='';
  if(rows.length){
    rows.forEach(function(r){var ex=/^https?:/.test(r[2]);h+='<a class="rc-row" href="'+esc(r[2])+'"'+(ex?' target="_blank" rel="noopener"':'')+'><span class="rc-k">'+ic(r[4])+esc(r[0])+'</span><span class="rc-t">'+esc(r[1])+'</span><span class="rc-g">'+esc(r[3])+' →</span></a>'});
    h+='<p class="rc-note">ゲームは、この博物館から ひらいた「さいきん あそんだ」だけ 出るよ(ゲームの セーブは、それぞれの ゲームの中に あるよ)。</p><button type="button" class="rc-del" id="rcDel">れきしを けす</button>';
  }else{
    h+='<p class="rc-note">まだ れきしが ないよ。まずは ここから どうぞ。</p>';
    [["novel.html","book","小説 第1話","ひょえボンの はじめての おうち"],["zukan.html","book","ずかん","ボンたちのずかん"],["games.html","game","ゲーム","ボンちゃんの ゲーム"]].forEach(function(r){h+='<a class="rc-row" href="'+r[0]+'"><span class="rc-k">'+ic(r[1])+r[2]+'</span><span class="rc-t">'+r[3]+'</span><span class="rc-g">ひらく →</span></a>'});
  }
  box.innerHTML=h;
  var d=document.getElementById("rcDel");
  if(d)d.addEventListener("click",function(){if(confirm("つづきから の れきしを ぜんぶ けすよ。スタンプ・バッジ・しおりは のこるよ。いい?")){clearRecent();renderResume()}});
}

/* ---------- 2. 博物館ガイドツアー ---------- */
var TOURS=[
 {id:"first",name:"はじめてのボンツアー",ico:"sprout",desc:"ボンたちに はじめて あう人の コース。ずかん・おしゃべり・診断・ゲームを じゅんばんに めぐるよ。",stops:[
  ["zukan.html","ボンたちのずかん","7人の ボンの プロフィールが 見られるよ。"],
  ["talk.html","ボンたちと おしゃべり","ボンに ひとこと かけると、へんじを くれるよ。"],
  ["shindan.html","ボン診断","8つの 質問で、あなたに にた ボンが わかるよ。"],
  ["games.html","ボンちゃんの ゲーム","ボンたちの ゲームが ぜんぶ ならんでいるよ。"]]},
 {id:"hyoe",name:"ひょえボンの成長ツアー",ico:"book",desc:"赤ちゃんの ひょえボンが 大きくなるまで。小説を、おはなしの じかんの ながれの じゅんばんに めぐるよ。",stops:[
  ["novel.html","第1話 はじめての おうち","星の夜に 生まれた ボンが、名前を もらうまで。"],
  ["novel5.html","第2話 はじめての おふろ","赤ちゃんのころの、にぎやかな おはなし。"],
  ["novel6.html","第3話 はじめての ほんのう","名前を もらって、1〜2週間ごろ。"],
  ["novel8.html","第4話 はじめての ならわし","秋の はじめ、ボン界の ならわしを おぼえるよ。"],
  ["novel9.html","第5話 せいちょう の しるし","できることが ふえていく おはなし。"],
  ["novel1b.html","第6話 はじめての おはよう","ことばを おぼえて、「にこちゃん」と 呼ぶまで。"],
  ["novel2.html","第7話 はじめての お赤飯","お赤飯の日。ちびボン期に 入るよ。"],
  ["novel4.html","第8話 はじめての ひとりでできた","ちびボンが、ひとりで おにぎりを にぎるよ。"],
  ["novel10.html","第9話 ひょえボンと みのボン","みのボンと ともだちに なる おはなし。"],
  ["novel11.html","第10話 はじめての ようちえん","ようちえんへ はじめて いく日。"],
  ["novel12.html","第11話 わらいごえの ばんぐみ","ボメリコの ばんぐみに ハマる おはなし。"],
  ["novel13.html","第12話 たこやき パーティ","みのちゃんを 呼んでの たこパ。"],
  ["novel14.html","第13話 まるまる夜","冬の はじめの さむい夜、7人で おだんごに なるよ。"],
  ["novel15.html","第14話 はじめての しんりょうじょ","ほっぺが ぽかぽかの 日、しろボンに あいにいくよ。"]]},
 {id:"game",name:"ゲームツアー",ico:"game",desc:"みじかい時間で あそべる ゲームと あそびの めぐり。ブラウザで すぐ あそべるよ。",stops:[
  ["nadenade.html","ボンを なでなで","ボンを タップして なでると、なかよし度が あがるよ。"],
  ["shiritori.html","ボンと しりとり","ボンと しりとりで あそぼう。"],
  ["punicare.html","ぷにの いちにち","ぷにを ごはん・あそぶ・ねんねで そだてるよ。"],
  ["shindan.html#quiz","ボンクイズ","ずかんや ひょえボンの お話から、10もんの 4択クイズ。"],
  ["games.html","ボンちゃんの ゲーム","ぜんぶの ゲームは ここから。"]]},
 {id:"music",name:"音楽ツアー",ico:"note",desc:"ボンたちの 曲を、じゅんばんに きいていくよ。ミュージックの 曲を 7つ めぐるよ。",stops:[
  ["music.html#t3","コギけつ食パン","BON ORIGINAL(ボンの オリジナル曲)。"],
  ["music.html#t4","魔法の言葉","BON ORIGINAL(ボンの オリジナル曲)。"],
  ["music.html#t9","ボンちゃんマーチ","BON ORIGINAL(ボンの オリジナル曲)。"],
  ["music.html#t5","新緑の旅路、鋼の遺志","BON ARRANGE(アレンジ曲)。"],
  ["music.html#t1","虹彩漫談","BON CHARACTER(キャラクターの曲)。"],
  ["music.html#t2","UTOPIA SPIN!!!","BON GAME MUSIC(ゲームの曲)。"],
  ["music.html#t10","紅彩烈火(こうさいれっか)","BON CHARACTER(キャラクターの曲)。"]]},
 {id:"world",name:"ボン界探検ツアー",ico:"map",desc:"ボン界の せかいかん・えちず・年表・きまりを めぐるよ。",stops:[
  ["world.html","ボン界の せかいかん","ボン界の 社会や きまりの 資料。"],
  ["world.html#map","ボン界の えちず","梵京と いろどり町を、タップで たんけん。"],
  ["world.html#wnen","ボン界の 年表","ボン界の できごとの ながれ。"],
  ["world.html#aisatsu","せかいの ノート","15の くにの ボンの あいさつ帳。"],
  ["events.html","きせつ ごよみ","お正月・七夕・ハロウィンなど、きせつの イベント。"],
  ["job.html","ボンの おしごと","ボンたちの バイトや ふだんの くらし。"],
  ["jisho.html","Bonpedia（ボンペディア）","ボンの ことばの じてん。"]]}
];
window.bmPlus.tours=TOURS;
function tourState(){return J("bm-tour",null)}
function stampsOf(id){var a=J("bm-tours",{});return (a&&a[id])||{}}
function stampCount(t){var s=stampsOf(t.id),n=0;t.stops.forEach(function(x){if(s[x[0]])n++});return n}
function curIdx(t){
  var h=location.hash,best=-1;
  t.stops.forEach(function(s,i){var sp=s[0].split("#");if(sp[0]!==P)return;if(sp[1]){if("#"+sp[1]===h)best=i}else if(best<0)best=i});
  return best;
}
function findTour(id){for(var i=0;i<TOURS.length;i++)if(TOURS[i].id===id)return TOURS[i];return null}
function addStamp(t,key){
  var a=J("bm-tours",{});if(!a||typeof a!=="object"||Array.isArray(a))a={};
  var s=a[t.id]||{};if(s[key])return false;
  s[key]=Date.now();a[t.id]=s;S("bm-tours",a);return true;
}
var tourBarTop=null,tourBarBot=null;
function renderTourBar(){
  var st=tourState();if(!st||!st.id)return;var t=findTour(st.id);if(!t)return;
  var main=document.querySelector("main");if(!main)return;
  var i=curIdx(t),newly=false;
  if(i>=0)newly=addStamp(t,t.stops[i][0]);
  var n=stampCount(t),tot=t.stops.length,done=n>=tot;
  var h='<div class="tb-h"><b>'+ic(t.ico,22)+esc(t.name)+'</b><span>スタンプ '+n+' / '+tot+'</span></div>';
  h+='<div class="tb-p" role="progressbar" aria-valuemin="0" aria-valuemax="'+tot+'" aria-valuenow="'+n+'"><i style="width:'+Math.round(n/tot*100)+'%"></i></div>';
  if(i>=0)h+='<p class="tb-c">いま：'+(i+1)+'こめ「'+esc(t.stops[i][1])+'」'+(newly?'　<b class="tb-new">✓ スタンプ ゲット！</b>':'')+'</p>';
  else h+='<p class="tb-c">ツアーの とちゅうだよ。つぎの 展示へ もどれるよ。</p>';
  if(done)h+='<p class="tb-done">'+ic("party",22)+'ツアー たっせい！ ぜんぶの 展示を めぐったよ。</p>';
  var pv=i>0?t.stops[i-1]:null,nx=i>=0&&i<tot-1?t.stops[i+1]:(i<0?t.stops[Math.min(tot-1,firstUnstamped(t))]:null);
  h+='<div class="tb-b">';
  h+=pv?'<a class="tb-a" href="'+esc(pv[0])+'">← 前の展示へ</a>':'<span class="tb-a off">← 前の展示へ</span>';
  h+=nx?'<a class="tb-a" href="'+esc(nx[0])+'">'+(i<0?'ツアーに もどる →':'次の展示へ →')+'</a>':'<a class="tb-a" href="tour.html">ツアー いちらんへ</a>';
  h+='<button type="button" class="tb-x" data-tbend="1">ツアーを終了する</button></div>';
  function mk(cls){var d=document.createElement("section");d.className="bm-tourbar "+cls;d.setAttribute("aria-label","ガイドツアー");d.innerHTML=h;return d}
  var hd=main.querySelector("header"),ft=main.querySelector("footer");
  if(tourBarTop&&tourBarTop.parentNode)tourBarTop.remove();if(tourBarBot&&tourBarBot.parentNode)tourBarBot.remove();
  tourBarTop=mk("tb-top");if(hd&&hd.parentNode)hd.parentNode.insertBefore(tourBarTop,hd.nextSibling);else main.insertBefore(tourBarTop,main.firstChild);
  tourBarBot=mk("tb-bot");if(ft&&ft.parentNode)ft.parentNode.insertBefore(tourBarBot,ft);else main.appendChild(tourBarBot);
}
function firstUnstamped(t){var s=stampsOf(t.id);for(var i=0;i<t.stops.length;i++)if(!s[t.stops[i][0]])return i;return 0}
document.addEventListener("click",function(e){
  var b=e.target.closest&&e.target.closest("[data-tbend]");if(!b)return;
  if(confirm("ツアーを おわるよ。もらった スタンプは のこるよ。いい?")){try{localStorage.removeItem("bm-tour")}catch(x){}
    [].forEach.call(document.querySelectorAll(".bm-tourbar"),function(d){d.remove()});tourBarTop=tourBarBot=null;if(F==="tour")renderTourPage()}
});
window.addEventListener("hashchange",function(){if(tourState())renderTourBar()});

function renderTourPage(){
  var box=document.getElementById("bmtours");if(!box)return;
  var cur=tourState(),h='';
  TOURS.forEach(function(t){
    var n=stampCount(t),tot=t.stops.length,done=n>=tot,active=cur&&cur.id===t.id;
    h+='<article class="sheet plain tr-card" style="margin-top:14px"><h3>'+ic(t.ico,24)+esc(t.name)+(done?' <span class="tr-ok">✓ たっせい</span>':'')+'</h3><p>'+esc(t.desc)+'</p>';
    h+='<div class="tb-p"><i style="width:'+Math.round(n/tot*100)+'%"></i></div><p class="small" style="margin:4px 0 8px">スタンプ '+n+' / '+tot+'　(全'+tot+'か所)</p>';
    h+='<details class="tr-d"><summary>めぐる 展示を 見る</summary><ol>';
    var s=stampsOf(t.id);
    t.stops.forEach(function(x){h+='<li>'+(s[x[0]]?'✓ ':'')+'<b>'+esc(x[1])+'</b><br><small>'+esc(x[2])+'</small></li>'});
    h+='</ol></details><button type="button" class="go tr-go" data-tid="'+t.id+'">'+(active?'つづきから めぐる':(n?'もういちど はじめる':'このツアーを はじめる'))+'</button>';
    if(active)h+=' <button type="button" class="tr-end" data-tbend="1">ツアーを終了する</button>';
    h+='</article>';
  });
  box.innerHTML=h;
  [].forEach.call(box.querySelectorAll(".tr-go"),function(b){b.addEventListener("click",function(){
    var t=findTour(b.getAttribute("data-tid"));if(!t)return;S("bm-tour",{id:t.id,ts:Date.now()});
    location.href=t.stops[firstUnstamped(t)][0];
  })});
}

/* ---------- 3. マイ来館カード ---------- */
var BONS=[["oko","おこボン"],["niko","にこボン"],["hyoe","ひょえボン"],["mogu","もぐボン"],["nemu","ねむボン"],["tere","てれボン"],["niji","にじボン"]];
var NAMERE=/^[ぁ-ゖァ-ヶー]{1,5}$/;
var BGS=[
 {id:"olive",n:"おりーぶ",a:"#F6EBCB",b:"#C9D08A",c:"#55602A",ink:"#2E241C",dot:"rgba(85,96,42,.16)"},
 {id:"sakura",n:"さくら",a:"#FFF0F3",b:"#F7BFCC",c:"#B4485C",ink:"#3A2228",dot:"rgba(180,72,92,.15)"},
 {id:"sora",n:"そら",a:"#EAF6FF",b:"#A9D4F2",c:"#2F6E9E",ink:"#1F2F3D",dot:"rgba(47,110,158,.15)"},
 {id:"yuyake",n:"ゆうやけ",a:"#FFF4DD",b:"#F6B979",c:"#A8552A",ink:"#3A2616",dot:"rgba(168,85,42,.16)"}
];
function badgeCount(){
  var vc=parseInt(localStorage.getItem("bm-vc"),10)||0,sp=J("bm-stamps",{}),sc=Array.isArray(sp)?sp.length:Object.keys(sp||{}).length,nd=J("bm-nade",{})||{},pn=J("bm-puni",null),fv=J("bm-fav",[]),qz=J("bm-quiz",{})||{};
  var nn=0,mx=0,ok2=0;["oko","niko","hyoe","mogu","nemu","tere","niji"].forEach(function(k){var n=nd[k]||0;nn+=n;if(n>mx)mx=n;if(n>=10)ok2++});
  var mk=0;try{for(var i=0;i<localStorage.length;i++){if(String(localStorage.key(i)).indexOf("bm-mark:")===0)mk++}}catch(e){}
  var pg=pn?pn.g||0:0,k400=false;try{k400=!!localStorage.getItem("bm-k400")}catch(e){}
  var L=[vc>=1,vc>=3,vc>=7,vc>=30,sc>=10,sc>=25,nn>=1,nn>=50,mx>=25,mx>=100,ok2>=7,!!pn,pg>=50,pg>=120,(qz.plays||0)>=1,(qz.best||0)>=7,(qz.best||0)>=10,k400,(fv&&fv.length>=1),mk>=1],n=0;try{if(window.BM_K500&&BM_K500.on)L.push(!!localStorage.getItem("bm-k500"))}catch(e){}
  L.forEach(function(x){if(x)n++});return [n,L.length];
}
function stampTotal(){return (window.bmStamp&&bmStamp.list)?[bmStamp.count(),bmStamp.list.length]:[0,0]}
function savedName(){
  var k=["bontalk_name","bm-letter-name","bm-myname"];
  try{for(var i=0;i<k.length;i++){var v=localStorage.getItem(k[i]);if(v&&NAMERE.test(v))return v}}catch(e){}return "";
}
function firstDay(){var f=null;try{f=localStorage.getItem("bm-first")}catch(e){}return(f&&/^\d{4}\.\d{2}\.\d{2}$/.test(f))?f:""}
function renderCardPage(){
  var box=document.getElementById("bmcard");if(!box)return;
  var st=J("bm-card",{})||{};if(typeof st!=="object")st={};
  var name=(typeof st.name==="string"&&NAMERE.test(st.name))?st.name:savedName();
  var bg=0;BGS.forEach(function(b,i){if(b.id===st.bg)bg=i});
  var oshi="";try{oshi=localStorage.getItem("bm-oshi")||""}catch(e){}
  var have=false;BONS.forEach(function(b){if(b[0]===oshi)have=true});if(!have)oshi="";
  box.innerHTML='<div class="cd-ctl"><label for="cdName">おなまえ（ひらがな・カタカナ 5もじまで）</label><input id="cdName" maxlength="5" autocomplete="off" value="'+esc(name)+'" placeholder="なまえ"><p class="small" id="cdMsg" role="status"></p>'+
   '<div class="cd-lbl">カードの デザイン</div><div class="cd-bgs" id="cdBgs"></div>'+
   '<div class="cd-lbl">すきな ボン</div><div class="cd-bgs" id="cdBon"></div>'+
   '<p class="small">スタンプ・バッジ・来館記念日は、この端末の きろくから じどうで 入るよ。</p></div>'+
   '<canvas id="cdCv" width="1080" height="1350" role="img" aria-label="マイ来館カード"></canvas>'+
   '<div class="cd-act"><button type="button" class="go" id="cdSave">がぞうで ほぞんする</button></div><p class="small" id="cdSaveMsg" role="status"></p>';
  var cv=document.getElementById("cdCv"),ctx=cv.getContext("2d"),imgs={},need=[];
  BONS.forEach(function(b){need.push(b[0])});
  var loaded=0;
  need.forEach(function(k){var im=new Image();im.onload=im.onerror=function(){loaded++;if(loaded>=need.length)draw()};im.src="icon_round_"+k+".png";imgs[k]=im});
  function rr(x,y,w,h,r){ctx.beginPath();ctx.moveTo(x+r,y);ctx.arcTo(x+w,y,x+w,y+h,r);ctx.arcTo(x+w,y+h,x,y+h,r);ctx.arcTo(x,y+h,x,y,r);ctx.arcTo(x,y,x+w,y,r);ctx.closePath()}
  function fit(t,maxW,size,wt){var s=size;ctx.font=wt+" "+s+"px 'Hiragino Maru Gothic ProN','Hiragino Sans','Noto Sans JP',sans-serif";while(ctx.measureText(t).width>maxW&&s>28){s-=4;ctx.font=wt+" "+s+"px 'Hiragino Maru Gothic ProN','Hiragino Sans','Noto Sans JP',sans-serif"}return s}
  function img(k,x,y,sz){var im=imgs[k];if(im&&im.complete&&im.naturalWidth){ctx.save();ctx.beginPath();ctx.arc(x+sz/2,y+sz/2,sz/2,0,Math.PI*2);ctx.closePath();ctx.clip();ctx.drawImage(im,x,y,sz,sz);ctx.restore();ctx.lineWidth=6;ctx.strokeStyle="rgba(46,36,28,.55)";ctx.beginPath();ctx.arc(x+sz/2,y+sz/2,sz/2,0,Math.PI*2);ctx.stroke()}}
  function draw(){
    var d=BGS[bg],W=1080,H=1350;
    var g=ctx.createLinearGradient(0,0,0,H);g.addColorStop(0,d.a);g.addColorStop(1,d.b);ctx.fillStyle=g;ctx.fillRect(0,0,W,H);
    ctx.fillStyle=d.dot;for(var y=40;y<H;y+=90){for(var x=((y/90)%2?40:85);x<W;x+=90){ctx.beginPath();ctx.arc(x,y,16,0,Math.PI*2);ctx.fill()}}
    ctx.lineWidth=10;ctx.strokeStyle=d.c;rr(36,36,W-72,H-72,40);ctx.stroke();ctx.lineWidth=3;ctx.strokeStyle=d.ink;rr(58,58,W-116,H-116,30);ctx.stroke();
    ctx.fillStyle=d.c;rr(90,92,W-180,130,24);ctx.fill();
    ctx.fillStyle="#fff";ctx.textAlign="center";fit("BON MUSEUM 来館カード",W-240,64,"700");ctx.fillText("BON MUSEUM 来館カード",W/2,176);
    ctx.fillStyle=d.ink;fit("ボンちゃんの小さな博物館",W-240,40,"700");ctx.fillText("ボンちゃんの小さな博物館",W/2,282);
    /* ボンの飾り */
    var row=BONS,sz=110,gap=24,tw=row.length*sz+(row.length-1)*gap,sx=(W-tw)/2;
    row.forEach(function(b,i){img(b[0],sx+i*(sz+gap),320,sz)});
    /* 名前 */
    ctx.fillStyle="rgba(255,255,255,.78)";rr(110,470,W-220,200,28);ctx.fill();
    ctx.fillStyle=d.c;ctx.font="700 34px sans-serif";ctx.textAlign="left";ctx.fillText("おなまえ",150,524);
    var nm=name||"（おなまえ みとうろく）";ctx.fillStyle=d.ink;ctx.textAlign="center";fit(nm+(name?" さん":""),W-340,92,"700");ctx.fillText(nm+(name?" さん":""),W/2,628);
    /* 好きなボン */
    ctx.fillStyle="rgba(255,255,255,.78)";rr(110,700,W-220,250,28);ctx.fill();
    ctx.fillStyle=d.c;ctx.font="700 34px sans-serif";ctx.textAlign="left";ctx.fillText("すきな ボン",150,754);
    var bn="まだ きまってないよ";BONS.forEach(function(b){if(b[0]===oshi)bn=b[1]});
    if(oshi){img(oshi,150,780,150);ctx.fillStyle=d.ink;ctx.textAlign="left";fit(bn,W-420,70,"700");ctx.fillText(bn,330,878)}
    else{ctx.fillStyle=d.ink;ctx.textAlign="center";fit(bn,W-340,60,"700");ctx.fillText(bn,W/2,868)}
    /* スタンプ・バッジ・記念日 */
    var sT=stampTotal(),bT=badgeCount(),fd=firstDay();
    function box3(x,w,lbl,val){ctx.fillStyle="rgba(255,255,255,.78)";rr(x,980,w,200,28);ctx.fill();ctx.fillStyle=d.c;ctx.font="700 30px sans-serif";ctx.textAlign="center";ctx.fillText(lbl,x+w/2,1028);ctx.fillStyle=d.ink;fit(val,w-30,64,"700");ctx.fillText(val,x+w/2,1120)}
    var bw=(W-220-2*24)/3;
    box3(110,bw,"スタンプ",sT[1]?sT[0]+" / "+sT[1]:String(sT[0]));
    box3(110+bw+24,bw,"バッジ",bT[0]+" / "+bT[1]);
    box3(110+2*(bw+24),bw,"来館記念日",fd||"−");
    ctx.fillStyle=d.ink;ctx.textAlign="center";ctx.font="700 30px sans-serif";ctx.fillText("bon-creations.github.io/museum",W/2,1262);
  }
  function save(){st={name:name,bg:BGS[bg].id};S("bm-card",st)}
  var inEl=document.getElementById("cdName"),msg=document.getElementById("cdMsg");
  inEl.addEventListener("input",function(){var v=inEl.value.trim();if(v===""){name="";msg.textContent="";save();draw();return}
    if(!NAMERE.test(v)){msg.textContent="ひらがな・カタカナ(5もじまで)で 入れてね";return}msg.textContent="";name=v;save();draw()});
  var bb=document.getElementById("cdBgs");
  BGS.forEach(function(d,i){var b=document.createElement("button");b.type="button";b.className="cd-b";b.textContent=d.n;b.setAttribute("aria-pressed",i===bg?"true":"false");b.style.borderColor=d.c;
    b.addEventListener("click",function(){bg=i;save();draw();[].forEach.call(bb.children,function(c,j){c.setAttribute("aria-pressed",j===i?"true":"false")})});bb.appendChild(b)});
  var bo=document.getElementById("cdBon");
  BONS.forEach(function(x){var b=document.createElement("button");b.type="button";b.className="cd-b";b.textContent=x[1];b.setAttribute("aria-pressed",x[0]===oshi?"true":"false");
    b.addEventListener("click",function(){oshi=x[0];[].forEach.call(bo.children,function(c,j){c.setAttribute("aria-pressed",BONS[j][0]===oshi?"true":"false")});draw()});bo.appendChild(b)});
  document.getElementById("cdSave").addEventListener("click",function(){
    var m=document.getElementById("cdSaveMsg");
    try{cv.toBlob(function(bl){if(!bl){m.textContent="ほぞんに しっぱいしたよ。がぞうを 長おしして ほぞんしてね。";return}
      var u=URL.createObjectURL(bl),a=document.createElement("a");a.href=u;a.download="BON-MUSEUM-card.png";document.body.appendChild(a);a.click();a.remove();setTimeout(function(){URL.revokeObjectURL(u)},4000);
      m.textContent="ほぞんしたよ！ 保存できない時は、カードを 長おしして がぞうを ほぞんしてね。"},"image/png")}
    catch(e){m.textContent="ほぞんに しっぱいしたよ。カードを 長おしして ほぞんしてね。"}
  });
}

/* ---------- 4. きろくの バックアップ・復元 ---------- */
var BK_PRE=/^(bm-|bm:|bontalk_|bon-|bon_)/;
var BK_SKIP=/^(bm-a2hs|bm-lastvisit|bm-prevvisit|bm-last|bm-last-prev)$/;
function bkOk(k){return BK_PRE.test(k)&&!BK_SKIP.test(k)}
function bkCollect(){var o={};try{for(var i=0;i<localStorage.length;i++){var k=localStorage.key(i);if(bkOk(k)){var v=localStorage.getItem(k);if(typeof v==="string")o[k]=v}}}catch(e){}return o}
function bkFile(){var d=new Date();return "BON-MUSEUM-backup-"+d.getFullYear()+pad(d.getMonth()+1)+pad(d.getDate())+".json"}
function bkDownload(msgEl){
  var d=bkCollect(),n=Object.keys(d).length;
  var pack={app:"BON MUSEUM",format:1,savedAt:new Date().toISOString(),count:n,data:d};
  try{
    var bl=new Blob([JSON.stringify(pack,null,1)],{type:"application/json"}),u=URL.createObjectURL(bl),a=document.createElement("a");
    a.href=u;a.download=bkFile();document.body.appendChild(a);a.click();a.remove();setTimeout(function(){URL.revokeObjectURL(u)},4000);
    if(msgEl)msgEl.textContent="バックアップしたよ！ ("+n+"こ の きろく)　ファイル名: "+bkFile();
  }catch(e){if(msgEl)msgEl.textContent="バックアップに しっぱいしたよ。もういちど ためしてね。"}
}
function bkValidate(txt){
  if(txt.length>1500000)return{err:"ファイルが 大きすぎるよ。BON MUSEUMの バックアップじゃ ないみたい。"};
  var p;try{p=JSON.parse(txt)}catch(e){return{err:"ファイルを よみこめなかったよ。こわれて いるか、ちがう ファイルだよ。"}}
  if(!p||typeof p!=="object"||p.app!=="BON MUSEUM"||p.format!==1||!p.data||typeof p.data!=="object"||Array.isArray(p.data))return{err:"BON MUSEUMの バックアップファイルじゃ ないみたい。"};
  var ks=Object.keys(p.data);if(!ks.length)return{err:"きろくが 入っていない ファイルだよ。"};if(ks.length>600)return{err:"きろくの かずが おおすぎるよ。ふくげんしないよ。"};
  for(var i=0;i<ks.length;i++){var k=ks[i];if(!bkOk(k)||typeof p.data[k]!=="string"||p.data[k].length>400000)return{err:"へんな きろくが まざっているよ。あんぜんの ため ふくげんしないよ。"}}
  return{ok:true,data:p.data,at:p.savedAt,n:ks.length};
}
function renderBackup(){
  var main=document.querySelector("main");if(!main||document.getElementById("bmbk"))return;
  var sec=document.createElement("section");sec.id="bmbk";sec.setAttribute("aria-labelledby","bkh");
  sec.innerHTML='<h2 id="bkh"><svg class="i fl" width="24" height="24" aria-hidden="true"><use href="#leaf"/></svg><span class="t">きろくの バックアップ・ふくげん</span></h2>'+
   '<div class="gl-lead"><p>スタンプ・バッジ・お気に入り・しおり・ツアーの きろくを、ファイルに 書きだして、べつの 端末に うつせるよ。きろくは この ブラウザの中だけに あるので、機種変更の 前に バックアップしておくと あんしんだよ。</p></div>'+
   '<article class="sheet plain" style="margin-top:14px"><h3>きろくを バックアップする</h3><p>ファイル名に「BON-MUSEUM」と 日付が 入るよ。</p><button type="button" class="go" id="bkOut">きろくを バックアップする</button><p class="small" id="bkMsg" role="status"></p></article>'+
   '<article class="sheet plain" style="margin-top:14px"><h3>バックアップから ふくげんする</h3><p><b>ふくげんすると、いまの きろくが ファイルの 内容で 上書きされるよ。</b>ふくげんの 前に、いまの きろくを バックアップしておくのを おすすめするよ。</p><input type="file" id="bkFile" accept="application/json,.json" aria-label="バックアップファイルを えらぶ"><div id="bkPrev" role="status" style="margin-top:10px"></div></article>';
  var host=document.getElementById("hubp-kaeru");
  if(host)host.appendChild(sec);else main.appendChild(sec);
  document.getElementById("bkOut").addEventListener("click",function(){bkDownload(document.getElementById("bkMsg"))});
  var pv=document.getElementById("bkPrev");
  document.getElementById("bkFile").addEventListener("change",function(e){
    var f=e.target.files&&e.target.files[0];pv.innerHTML="";if(!f)return;
    if(f.size>1500000){pv.innerHTML='<p class="bk-bad">ファイルが 大きすぎるよ。ふくげんしないよ。</p>';return}
    var r=new FileReader();
    r.onerror=function(){pv.innerHTML='<p class="bk-bad">ファイルを よみこめなかったよ。</p>'};
    r.onload=function(){
      var v=bkValidate(String(r.result||""));
      if(!v.ok){pv.innerHTML='<p class="bk-bad">⚠ '+esc(v.err)+'</p>';return}
      var when="";try{when=new Date(v.at).toLocaleString("ja-JP")}catch(x){}
      pv.innerHTML='<p class="bk-good">このファイルは ふくげん できるよ。(きろく '+v.n+'こ'+(when?'・バックアップ日時 '+esc(when):'')+')</p><button type="button" class="go" id="bkGo">この きろくで 上書きして ふくげんする</button><p class="small">その前に <button type="button" class="bk-link" id="bkPre">いまの きろくを バックアップ</button> しておくと あんしん。</p>';
      document.getElementById("bkPre").addEventListener("click",function(){bkDownload(document.getElementById("bkMsg"))});
      document.getElementById("bkGo").addEventListener("click",function(){
        if(!confirm("いまの きろくが 上書きされるよ。もとには もどせないよ。ふくげんする?"))return;
        var ok=0,ng=0;Object.keys(v.data).forEach(function(k){try{localStorage.setItem(k,v.data[k]);ok++}catch(x){ng++}});
        if(ng)pv.innerHTML='<p class="bk-bad">⚠ 一部が ふくげんできなかったよ(ok '+ok+' / ng '+ng+')。端末の 空きを 確認してね。</p>';
        else pv.innerHTML='<p class="bk-good">✓ ふくげん できたよ！('+ok+'こ)　ページを 読みこみなおすと 反映されるよ。</p><button type="button" class="go" onclick="location.reload()">読みこみなおす</button>';
      });
    };
    r.readAsText(f);
  });
}

/* ---------- スタイル ---------- */
var css=document.createElement("style");
css.textContent=
".bm-tourbar{background:var(--card,#FFF8EA);border:3px solid #B4485C;border-radius:12px;padding:10px 14px;margin:12px 0;line-height:1.6;box-shadow:3px 3px 0 rgba(122,36,52,.25)}"+
".bm-tourbar .tb-h{display:flex;flex-wrap:wrap;justify-content:space-between;gap:6px;font-size:16px}"+
".tb-p{height:12px;border-radius:999px;background:rgba(0,0,0,.12);overflow:hidden;margin:6px 0}.tb-p i{display:block;height:100%;background:#B4485C}"+
".tb-c{margin:4px 0;font-size:15px}.tb-new{color:#B4485C}.tb-done{margin:6px 0;font-weight:700}"+
".tb-b{display:flex;flex-wrap:wrap;gap:8px;margin-top:8px}.tb-a,.tb-x,.tr-end{display:inline-flex;align-items:center;justify-content:center;min-height:44px;padding:4px 14px;border-radius:999px;border:2px solid #B4485C;background:transparent;color:inherit;font:inherit;font-size:15px;font-weight:700;text-decoration:none;cursor:pointer}.tb-a.off{opacity:.4}"+
".tr-ok{font-size:13px;background:#5E7A1E;color:#fff;border-radius:999px;padding:1px 10px}.tr-d summary{cursor:pointer;min-height:44px;display:flex;align-items:center}.tr-d ol{padding-left:1.4em;line-height:1.7}.tr-go{margin-top:6px}"+
".rc-row{display:flex;align-items:center;gap:10px;text-decoration:none;color:var(--ink);background:var(--card);border:2px solid var(--khaki);border-radius:10px;padding:8px 12px;min-height:52px;margin:0 0 8px;line-height:1.4}.rc-k{flex:none;font-size:13px;color:var(--mute)}.rc-t{font-weight:700;flex:1;min-width:0}.rc-g{flex:none;font-size:14px;font-weight:700;color:var(--vermilion)}.rc-note{font-size:13px;color:var(--mute);margin:6px 0}.rc-del{font:inherit;font-size:14px;min-height:44px;padding:4px 14px;border-radius:999px;border:2px solid var(--khaki);background:transparent;color:inherit;cursor:pointer}"+
"#bmcard canvas{width:100%;max-width:480px;height:auto;display:block;margin:12px auto;border:2px solid #2E241C;border-radius:10px}.cd-ctl input{font:inherit;font-size:18px;min-height:48px;padding:0 12px;border:2.5px solid var(--khaki);border-radius:10px;background:var(--card);color:var(--ink);width:10em;max-width:100%}.cd-lbl{margin:10px 0 4px;font-weight:700}.cd-bgs{display:flex;flex-wrap:wrap;gap:6px}.cd-b{font:inherit;font-size:15px;min-height:44px;padding:4px 14px;border-radius:999px;border:2px solid #5E7A1E;background:transparent;color:inherit;cursor:pointer}.cd-b[aria-pressed=true]{background:#5E7A1E;color:#fff}.cd-act{text-align:center}"+
".bk-good{color:#3f5a12;font-weight:700}.bk-bad{color:#B4485C;font-weight:700}.bk-link{font:inherit;text-decoration:underline;background:none;border:0;color:inherit;cursor:pointer;padding:6px 2px;min-height:44px}#bmbk input[type=file]{font:inherit;max-width:100%}";
document.head.appendChild(css);

ready(function(){
  if(F==="index")renderResume();
  if(F==="tour")renderTourPage();
  if(F==="card")renderCardPage();
  if(F==="mine")renderBackup();
  if(F!=="tour"&&F!=="index")renderTourBar();
  if(F==="index")renderTourBar();
});
window.bmPlus.clearRecent=clearRecent;
window.bmPlus.backup=bkCollect;
})();
