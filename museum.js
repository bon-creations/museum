/* 博物館っぽさ: 展示ラベル / 順路 / 館内マップ / 入館券 / 館内アナウンス / 展示室スタンプ(記録はこの端末のブラウザだけ) */
(function(){
if(window.__bmMuseum)return;window.__bmMuseum=1;
var f=(location.pathname.split("/").pop()||"index.html").replace(/\.html$/,"")||"index";
var ROOMS=[
{id:"hall",s:"r-hall",n:"入口ホール",ico:"🏛",d:"博物館の入口。はじめての人は、ここから。",p:["index"]},
{id:"r1",s:"r-1",n:"第1展示室　ボンたちの部屋",ico:"🌈",d:"ボンたちに会える部屋。",p:["zukan","bon","talk","shindan"]},
{id:"r2",s:"r-2",n:"第2展示室　ものがたりの部屋",ico:"📖",d:"ボンたちのおはなしと、ボン界のきまり。",p:["novels","novel","novel6","novel5","novel1b","novel2","novel4","novel7","world"]},
{id:"r3",s:"r-3",n:"第3展示室　あそびの部屋",ico:"🎮",d:"ゲームやミニゲームで あそべる部屋。",p:["games","mini"]},
{id:"r4",s:"r-4",n:"第4展示室　絵と音の部屋",ico:"🎨",d:"イラスト・音楽・壁紙・カレンダー。",p:["gallery","music","wallpaper","calendar"]},
{id:"r5",s:"r-5",n:"資料室　さくしゃボンのすきなもの",ico:"📚",d:"戦国・エスニック・雑学など、さくしゃボンの「すき」の資料。",p:["sukimono","sukimono_ethnic","sukimono_kenko","sukimono_sengoku","sukimono_zatsu"]}
];
/* 順路(主要な展示) */
var ROUTE=[
["index","博物館のトップ(入口ホール)","展示案内","ここが入口。お知らせと、いろいろな展示への案内があるよ。"],
["zukan","ボンたちの ずかん","図鑑","7人のボンを、ひとりずつ紹介している展示。"],
["talk","ボンたちと おしゃべり","体験展示","ボンたちと、ことばでお話しできる体験コーナー。"],
["shindan","ボン診断","体験展示","あなたに近いボンを占う、ちいさな体験コーナー。"],
["novels","ボンの しょうせつ","文学","ひょえボンの「はじめて」と、番外編の物語を所蔵。"],
["world","ボン界の せかいかん","資料","ボンたちの暮らす世界の、きまりと設定の資料。"],
["games","ボンちゃんの ゲーム","遊戯","ブラウザで あそべるゲームの展示。"],
["mini","ボンたたき","遊戯","手軽に あそべる、ちいさなゲーム。"],
["gallery","ボンちゃんギャラリー","絵画・写真","イラストや写真を、ならべたギャラリー。"],
["music","ボンちゃんミュージック","音楽","ボンたちの曲を、聴ける展示。"],
["wallpaper","壁紙・アイコン","図案","スマホやパソコンで使える、壁紙とアイコン。"],
["calendar","ボンカレンダー","暦","その月の絵つきカレンダー。"],
["sukimono","さくしゃボンの すきなもの","資料","戦国・エスニック・雑学など、すきなものの資料室。"]
];
var EXTRA={bon:["ボンの ページ","図鑑(個別)","ボンひとりを、くわしく紹介する展示。"],stamp:["スタンプ帳","受付","来館のしるしを集めた、スタンプ帳。"],search:["館内さくいん","案内所","博物館の中を探せる、さくいん。"],
novel:["はじめての おうち","文学(第1話)","星の夜に生まれたボンが、名前をもらうまで。"],novel6:["はじめての ころころ","文学(第2話)","名前をもらう前の、赤ちゃんのころ。"],novel5:["はじめての おふろ","文学(第3話)","赤ちゃんのボンが、はじめて おふろに入る。"],novel1b:["はじめての おはよう","文学(第4話)","ことばを覚えて、「にこちゃん」と呼ぶまで。"],novel2:["はじめての お赤飯","文学(第5話)","ちびボン期の、お祝いのおはなし。"],novel4:["はじめての ひとりでできた","文学(第6話)","ちびボンが、ひとりでごはんを作る。"],novel7:["ちいさな日々","文学(番外編)","赤ちゃんのころの、ボンたちとの日常。"],
sukimono_ethnic:["エスニック","資料","世界のくらしと食の資料。"],sukimono_kenko:["マッサージ・鍼灸・民間療法","資料","からだとつきあう知恵の資料。"],sukimono_sengoku:["戦国時代","資料","戦国時代の食とくらしの資料。"],sukimono_zatsu:["ふだんの雑学","資料","身のまわりの雑学の資料。"]};
function roomOf(p){for(var i=0;i<ROOMS.length;i++)if(ROOMS[i].p.indexOf(p)>=0)return ROOMS[i];return null}
function routeIdx(p){for(var i=0;i<ROUTE.length;i++)if(ROUTE[i][0]===p)return i;return -1}
function esc(s){return String(s).replace(/[&<>"]/g,function(c){return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]})}
function ls(k,v){try{if(v===undefined)return localStorage.getItem(k);localStorage.setItem(k,v)}catch(e){return null}}
var S=window.bmStamp,room=roomOf(f);
/* 展示室のスタンプ */
if(room&&S&&S.add){try{S.add(room.s)}catch(e){}}
function visited(r){return !!(S&&S.has&&S.has(r.s))}
function nVisited(){var n=0;ROOMS.forEach(function(r){if(visited(r))n++});return n}
/* スタイル */
var st=document.createElement("style");
st.textContent=".bm-plaque{margin:10px 0 14px;padding:10px 14px 9px;border:2px solid #B07A3C;outline:1px solid #B07A3C;outline-offset:3px;border-radius:4px;background:linear-gradient(180deg,#F5E8C8,#E8D4A4);color:#2E241C;line-height:1.7;box-shadow:inset 0 0 0 2px rgba(255,248,234,.7)}"
+".bm-plaque .pl-top{display:flex;flex-wrap:wrap;gap:4px 12px;align-items:baseline;font-size:12px;letter-spacing:.08em;color:#5B4C3E}"
+".bm-plaque .pl-no{font-weight:700;color:#7A2434;font-size:13px}"
+".bm-plaque .pl-t{margin:2px 0 0;font-size:16px;font-weight:700}"
+".bm-plaque .pl-d{margin:2px 0 0;font-size:14px}"
+".bm-plaque details{margin-top:6px;font-size:14px}"
+".bm-plaque summary{cursor:pointer;min-height:32px;display:inline-flex;align-items:center;color:#7A2434;font-weight:700}"
+".bm-map{list-style:none;margin:6px 0 0;padding:0;display:grid;gap:6px}"
+".bm-map li{padding:6px 8px;border:1px solid rgba(176,122,60,.6);border-radius:6px;background:rgba(255,248,234,.75)}"
+".bm-map a{color:#2E241C;font-weight:700}"
+".bm-map .mk{display:inline-block;min-width:3.4em;font-size:12px;font-weight:700;color:#66752F}"
+".bm-map .mk.no{color:#8a7a68}"
+".bm-route{margin:18px 0 8px;padding:10px 12px;border-top:3px double #B07A3C;border-bottom:3px double #B07A3C;display:flex;flex-wrap:wrap;gap:8px 14px;justify-content:space-between;font-size:15px;line-height:1.6}"
+".bm-route b{display:block;font-size:12px;letter-spacing:.1em;color:#5B4C3E}"
+".bm-route a{color:#2E241C;font-weight:700}"
+".bm-ticket{margin:12px 0;padding:12px 14px;border:2px dashed #7A2434;border-radius:10px;background:#FFF8EA;position:relative}"
+".bm-ticket:before,.bm-ticket:after{content:'';position:absolute;top:50%;width:14px;height:14px;margin-top:-7px;border-radius:50%;background:var(--bg,#F1E4CC);border:2px dashed #7A2434}"
+".bm-ticket:before{left:-9px}.bm-ticket:after{right:-9px}"
+".bm-ticket .tk-h{display:flex;justify-content:space-between;gap:8px;align-items:baseline;font-size:12px;letter-spacing:.14em;color:#7A2434;font-weight:700}"
+".bm-ticket .tk-n{margin:2px 0;font-size:18px;font-weight:700}"
+".bm-ticket p{margin:2px 0;font-size:14px}"
+".bm-ticket .tk-s{font-size:13px;color:#5B4C3E}"
+".bm-ann{margin:10px 0;padding:8px 12px;border:2px solid #55602A;border-radius:8px;background:#FFF8EA;font-size:14px;line-height:1.7;display:flex;gap:8px;align-items:flex-start}"
+".bm-ann .al{flex:none;font-weight:700;color:#55602A;font-size:12px;letter-spacing:.08em;padding-top:2px}"
+".bm-ann .at{flex:1;min-height:3.4em}"
+".bm-ann button{flex:none;font:inherit;font-size:13px;min-height:36px;padding:0 10px;border:2px solid #55602A;border-radius:999px;background:#fff;color:#2E241C;cursor:pointer}";
document.head.appendChild(st);
/* マップ(details) */
function mapHtml(){
var h='<ul class="bm-map">';
ROOMS.forEach(function(r){var top=r.p[0],href=(r.id==="hall")?"index.html":(top+".html");
h+='<li><span class="mk'+(visited(r)?'':' no')+'">'+(visited(r)?'✓ 見学済':'未見学')+'</span> <a href="'+href+'">'+r.ico+' '+esc(r.n)+'</a><br><small>'+esc(r.d)+'</small></li>'});
h+='<li><span class="mk no">受付</span> <a href="stamp.html">🎫 スタンプ帳(受付)</a> ・ <a href="search.html">🔎 館内さくいん</a></li></ul>';return h}
/* 展示ラベル */
var info=null,ri=routeIdx(f);
if(ri>=0)info=ROUTE[ri];else if(EXTRA[f])info=[f,EXTRA[f][0],EXTRA[f][1],EXTRA[f][2]];
function exNo(){
if(ri>=0)return "No."+("00"+(ri+1)).slice(-3);
var par={bon:"zukan",novel:"novels",novel6:"novels",novel5:"novels",novel1b:"novels",novel2:"novels",novel4:"novels",novel7:"novels",sukimono_ethnic:"sukimono",sukimono_kenko:"sukimono",sukimono_sengoku:"sukimono",sukimono_zatsu:"sukimono"}[f];
if(par){var pi=routeIdx(par);if(pi>=0){var order={novel:1,novel6:2,novel5:3,novel1b:4,novel2:5,novel4:6,novel7:7,sukimono_sengoku:1,sukimono_ethnic:2,sukimono_zatsu:3,sukimono_kenko:4,bon:1}[f];return "No."+("00"+(pi+1)).slice(-3)+"-"+order}}
return ""}
function plaque(){
if(!info&&f!=="stamp"&&f!=="search")return null;
if(!info)info=[f,EXTRA[f][0],EXTRA[f][1],EXTRA[f][2]];
var a=document.createElement("aside");a.className="bm-plaque";a.setAttribute("aria-label","展示ラベル");
var no=exNo(),rn=room?room.n:"受付・案内所";
a.innerHTML='<div class="pl-top">'+(no?'<span class="pl-no">展示 '+no+'</span>':'')+'<span>'+esc(rn)+'</span><span>分類：'+esc(info[2])+'</span></div><p class="pl-t">'+esc(info[1])+'</p><p class="pl-d">'+esc(info[3])+'</p><details><summary>🗺 館内マップ・順路を見る</summary>'+mapHtml()+'</details>';
return a}
var hd=document.querySelector("main > header");
if(hd&&f!=="index"){var pq=plaque();if(pq)hd.parentNode.insertBefore(pq,hd.nextSibling)}
/* 順路 */
if(ri>=0&&f!=="index"||ri===0){
var ft=document.querySelector("main > footer")||document.querySelector("footer");
if(ft){var nv=document.createElement("nav");nv.className="bm-route";nv.setAttribute("aria-label","順路");
var pv=ri>0?ROUTE[ri-1]:null,nx=ri<ROUTE.length-1?ROUTE[ri+1]:null;
nv.innerHTML='<div>'+(pv?'<b>← 前の展示</b><a href="'+pv[0]+'.html">'+esc(pv[1])+'</a>':'')+'</div><div style="text-align:right">'+(nx?'<b>次の展示 →</b><a href="'+nx[0]+'.html">'+esc(nx[1])+'</a>':'<b>順路のおわり</b><a href="stamp.html">スタンプ帳を見る</a>')+'</div>';
ft.parentNode.insertBefore(nv,ft)}}
/* トップ: 入館券・館内アナウンス */
function pad(n){return (n<10?"0":"")+n}
if(f==="index"&&hd){
var now=new Date(),today=now.getFullYear()+"."+pad(now.getMonth()+1)+"."+pad(now.getDate());
var first=ls("bm-first");if(!first){first=today;ls("bm-first",first)}
var vc=+ls("bm-vc")||1;
var tk=document.createElement("section");tk.className="bm-ticket";tk.setAttribute("aria-label","入館券");
tk.innerHTML='<div class="tk-h"><span>ADMISSION TICKET</span><span>入館券</span></div><p class="tk-n">BON MUSEUM　ボンちゃんの小さな博物館</p><p>入館日：'+today+'　／　はじめての入館日：'+first+'</p><p>入館：'+vc+'日目　／　見学した展示室：<span id="bmTkN">'+nVisited()+'</span> / '+ROOMS.length+'</p><p class="tk-s">この入館券は、この端末のブラウザの中だけにある、記念のチケットだよ。展示室を見てまわると、スタンプが押されます。</p><details style="margin-top:6px"><summary style="cursor:pointer;min-height:32px;display:inline-flex;align-items:center;color:#7A2434;font-weight:700">🗺 館内マップ・順路を見る</summary>'+mapHtml()+'</details>';
hd.parentNode.insertBefore(tk,hd.nextSibling);
var M=[];var h=now.getHours();
if(h>=5&&h<11)M.push("おはようございます。ただいま、開館しております。ゆっくり、ご見学ください。");
else if(h>=22||h<5)M.push("ただいまは、夜の静かな時間です。ねむボンの横を通るときは、そっとお進みください。");
else M.push("ご来館、ありがとうございます。展示室は、順路どおりでも、気になる所からでも、ご自由にどうぞ。");
M=M.concat(["展示室は、入口ホールのほか、ボンたちの部屋・ものがたりの部屋・あそびの部屋・絵と音の部屋・資料室がございます。","受付の「スタンプ帳」では、見学のしるしを、ごらんいただけます。","館内では、ボンたちを驚かせないよう、静かにお進みください。びっくりすると「ボン!?」と鳴いてしまいます。","ごはんの時間には、「ボーン！」という声が聞こえることがございます。ご安心ください。","展示室のラベルには、展示番号と、ひとことの解説が書いてあります。ぜひ、ごらんください。","おこボンの前では、順番をお守りください。待たされるのが、苦手でございます。","もぐボンの近くでは、おにぎりの香りがすることがございます。つまみ食いは、おやめください。","お忘れ物のないように、お気をつけください。柿が落ちていた場合は、にじボンまで。","順路のおわりには、「スタンプ帳」がございます。ぜんぶの展示室を見ると、いいことがあるかもしれません。"]);
var an=document.createElement("div");an.className="bm-ann";
an.innerHTML='<span class="al">📢 館内アナウンス</span><span class="at" id="bmAt"></span><button type="button" id="bmAn" aria-label="次のアナウンス">つぎ</button>';
tk.parentNode.insertBefore(an,tk.nextSibling);
var at=document.getElementById("bmAt"),ai=0,tm=0;
function show(){at.textContent=M[ai%M.length];ai++}
show();
function auto(){clearInterval(tm);if(window.matchMedia&&matchMedia("(prefers-reduced-motion: reduce)").matches)return;tm=setInterval(function(){if(!document.hidden)show()},9000)}
auto();document.getElementById("bmAn").addEventListener("click",function(){show();auto()});
}
/* 全展示室を見た: 一度だけ館長のひとこと */
function allDone(){if(!S||nVisited()<ROOMS.length||ls("bm-allrooms"))return;ls("bm-allrooms","1");
var d=document.createElement("div");d.setAttribute("role","status");d.textContent="にじボン：「全部の展示室を見学したのだな！ 見事なのだ！ 我輩、感動したぞ！」";d.style.cssText="position:fixed;left:50%;bottom:max(24px,env(safe-area-inset-bottom));transform:translateX(-50%);z-index:9998;max-width:88vw;padding:12px 18px;border:2px solid #2E241C;border-radius:16px;background:#FFF8EA;color:#2E241C;font:700 15px/1.6 sans-serif;box-shadow:0 3px 0 rgba(46,36,28,.35)";
document.body.appendChild(d);setTimeout(function(){d.remove()},6000)}
setTimeout(allDone,1500);
})();
