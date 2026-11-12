/* 博物館っぽさ: 展示ラベル / 順路 / 館内マップ / 入館券 / 館内アナウンス / 展示室スタンプ(記録はこの端末のブラウザだけ) */
(function(){
if(window.__bmMuseum)return;window.__bmMuseum=1;
var f=(location.pathname.split("/").pop()||"index.html").replace(/\.html$/,"")||"index";
var ROOMS=[
{id:"hall",s:"r-hall",n:"入口ホール",ico:"hall",d:"博物館の入口。展示ではなく、案内のみの場所だよ。はじめての人は、ここから。",p:["index"]},
{id:"r1",s:"r-1",n:"第1展示室　ボンたちの部屋",ico:"rainbow",d:"ボンたちに会える部屋。",p:["zukan","bon","talk","shindan"]},
{id:"r2",s:"r-2",n:"第2展示室　ものがたりの部屋",ico:"book",d:"ボンたちのおはなしと、ボン界のきまり。",p:["novels","novel","novel6","novel5","novel1b","novel2","novel4","novel7","world"]},
{id:"r3",s:"r-3",n:"第3展示室　あそびの部屋",ico:"game",d:"ゲームやミニゲームで あそべる部屋。",p:["games","mini"]},
{id:"r4",s:"r-4",n:"第4展示室　絵と音の部屋",ico:"palette",d:"イラスト・音楽・壁紙・カレンダー。",p:["gallery","music","wallpaper","calendar"]},
{id:"r5",s:"r-5",n:"資料室　さくしゃボンのすきなもの",ico:"shelf",d:"戦国・エスニック・雑学など、さくしゃボンの「すき」の資料。",p:["creators","sukimono","sukimono_ethnic","sukimono_kenko","sukimono_sengoku","sukimono_zatsu"]}
];
/* 順路(主要な展示) */
var ROUTE=[
["creators","つくった ひと(BON CREATIONS・さくしゃボン)","展示案内","この博物館を つくっている BON CREATIONS と、さくしゃボンの紹介。"],
["zukan","ボンたちの ずかん","図鑑","7人のボンを、ひとりずつ紹介している展示。"],
["talk","ボンたちと おしゃべり","体験展示","ボンたちと、ことばでお話しできる体験コーナー。"],
["shindan","ボン診断","体験展示","あなたに近いボンを占う、ちいさな体験コーナー。"],
["novels","ボンの しょうせつ","文学","ひょえボンの「はじめて」と、番外編の物語を所蔵。"],
["world","ボン界の せかいかん","資料","ボンたちの暮らす世界の、きまりと設定の資料。"],
["games","ボンちゃんの ゲーム","遊戯","ゲームと、診断・スタンプ帳・おみくじなどの あそびの展示。"],
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
function I(n){return window.bmIco?bmIco(n):""}
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
st.textContent=".bm-plaque .pl-ag{margin:8px 0 2px}.bm-plaque .agb{min-height:44px;padding:0 14px;border:2px solid #7A2434;border-radius:999px;background:#FFF8EA;color:#7A2434;font:700 14px/1 sans-serif;cursor:pointer}.bm-plaque .agt{display:block;margin-top:6px;font-size:14px;line-height:1.7}.bm-plaque{margin:10px 0 14px;padding:10px 14px 9px;border:2px solid #B07A3C;outline:1px solid #B07A3C;outline-offset:3px;border-radius:4px;background:linear-gradient(180deg,#F5E8C8,#E8D4A4);color:#2E241C;line-height:1.7;box-shadow:inset 0 0 0 2px rgba(255,248,234,.7)}"
+".bm-plaque .pl-top{display:flex;flex-wrap:wrap;gap:4px 12px;align-items:baseline;font-size:12px;letter-spacing:.08em;color:#5B4C3E}"
+".bm-plaque .pl-no{font-weight:700;color:#7A2434;font-size:13px}"
+".bm-plaque .pl-t{margin:2px 0 0;font-size:16px;font-weight:700}"
+".bm-plaque .pl-d{margin:2px 0 0;font-size:14px}"
+".bm-plaque details{margin-top:6px;font-size:14px}"
+".bm-plaque summary{cursor:pointer;min-height:32px;display:inline-flex;align-items:center;color:#7A2434;font-weight:700}"
+".bm-fp{margin:8px 0 2px;padding:10px;border:3px double #B07A3C;border-radius:8px;background:repeating-linear-gradient(0deg,rgba(176,122,60,.06) 0 1px,transparent 1px 22px),#FBF2DC;position:relative}"
+".bm-fp .fp-t{margin:0 0 8px;text-align:center;font-size:12px;letter-spacing:.2em;color:#5B4C3E;font-weight:700}"
+".bm-fp .fp-g{display:grid;gap:12px;position:relative}"
+".bm-fp .fp-g:before{content:'';position:absolute;left:50%;top:0;bottom:0;border-left:3px dashed rgba(122,36,52,.35);z-index:0}"
+".bm-fp .rm{position:relative;z-index:1;padding:8px 10px;border:2px solid #8A5A24;border-radius:6px;background:#FFF8EA;box-shadow:2px 2px 0 rgba(138,90,36,.25)}"
+".bm-fp .rm.now{border-color:#7A2434;background:#FFF0F0;box-shadow:0 0 0 3px rgba(122,36,52,.25)}"
+".bm-fp .rm h4{margin:0;font-size:15px;line-height:1.5;color:#2E241C}"
+".bm-fp .rm .st{display:inline-block;margin-left:6px;padding:0 8px;border-radius:999px;font-size:11px;font-weight:700;background:#E6EBC8;color:#55602A;vertical-align:1px}"
+".bm-fp .rm .st.no{background:#EEE6D8;color:#7a6a58}.bm-fp .rm .st.here{background:#7A2434;color:#fff}"
+".bm-fp .rm p{margin:2px 0 4px;font-size:13px;color:#5B4C3E}"
+".bm-fp .rm ul{list-style:none;margin:0;padding:0;display:grid;gap:3px}"
+".bm-fp .rm li{font-size:13px;line-height:1.55;padding:3px 0;border-top:1px dotted rgba(176,122,60,.6)}"
+".bm-fp .rm li b{font-size:11px;color:#7A2434;margin-right:4px}"
+".bm-fp .rm li a{color:#2E241C;font-weight:700}.bm-fp .rm li span{color:#5B4C3E}"
+".bm-fp .rm li.cur a{color:#7A2434;text-decoration:none}"
+".bm-fp .fp-z{margin:10px 0 0;font-size:12px;color:#5B4C3E;text-align:center}"
+"@media(min-width:620px){.bm-fp .fp-g{grid-template-columns:1fr 1fr}.bm-fp .fp-g .wide{grid-column:1/3}}"
+".bm-plaque{position:relative}.bm-plaque:before,.bm-plaque:after{content:'';position:absolute;top:50%;width:7px;height:7px;margin-top:-4px;border-radius:50%;background:radial-gradient(circle at 30% 30%,#fff3c8,#8A5A24)}.bm-plaque:before{left:-1px}.bm-plaque:after{right:-1px}"
+".bm-plaque .pl-h{margin:6px 0 0;font-size:12px;letter-spacing:.12em;color:#7A2434;font-weight:700}"
+".bm-plaque .pl-do{margin:2px 0 0;padding-left:1.2em;font-size:14px;line-height:1.7}"
+".bm-fr{border:5px solid #B07A3C;outline:1px solid #7A5A2C;outline-offset:2px;background:#FFF8EA;padding:3px;box-shadow:inset 0 0 0 1px rgba(122,90,44,.5),2px 3px 6px rgba(60,40,20,.25);box-sizing:border-box}"
+".bm-ex{margin:16px 0}.bm-ex .eh{display:block;margin:0 0 8px;font-weight:700;font-size:15px;letter-spacing:.2em;color:#5B4C3E;text-align:center;border-top:3px double #B07A3C;border-bottom:3px double #B07A3C;padding:6px 0}"
+".bm-ex .gr{display:grid;gap:8px;grid-template-columns:1fr}@media(min-width:620px){.bm-ex .gr{grid-template-columns:1fr 1fr}}"
+".bm-ex a.cd{display:block;padding:8px 10px;border:2px solid #8A5A24;border-radius:4px;background:linear-gradient(180deg,#FFF8EA,#F3E5C4);color:#2E241C;text-decoration:none;box-shadow:2px 2px 0 rgba(138,90,36,.25);line-height:1.6}"
+".bm-ex .cd .n{display:block;font-size:11px;letter-spacing:.1em;color:#7A2434;font-weight:700}.bm-ex .cd .t{display:block;font-size:16px;font-weight:700}.bm-ex .cd .d{display:block;font-size:13px;color:#5B4C3E}"
+".bm-toc{margin:0 0 14px;padding:10px 12px;border:2px solid #B07A3C;border-radius:8px;background:#FFF8EA;font-size:14px;line-height:1.8}.bm-toc b{display:block;font-size:12px;letter-spacing:.2em;color:#7A2434}.bm-toc ol{list-style:none;margin:2px 0 0;padding:0}.bm-toc a{display:block;padding:3px 0;min-height:24px;color:#2E241C;font-weight:700}"
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
+".bm-ann-in{flex-wrap:wrap!important}.bm-ann.bm-ann-in .al{flex:1 0 100%!important}.bm-ann.bm-ann-in .at{flex:1 1 10em!important;min-width:0}"
+".bm-ann-in{margin:10px 0 0!important;padding:8px 0 0!important;border:0!important;border-top:2px dashed #55602A!important;border-radius:0!important;background:none!important}"
+".bm-al{margin:0 0 4px;font-size:12px;font-weight:700;letter-spacing:.08em;color:#55602A}.bm-al small{font-weight:400}.bm-next{margin-top:6px;font:inherit;font-size:13px;min-height:36px;padding:0 12px;border:2px solid #55602A;border-radius:999px;background:#fff;color:#2E241C;cursor:pointer}"
+".bm-ann{margin:10px 0;padding:8px 12px;border:2px solid #55602A;border-radius:8px;background:#FFF8EA;font-size:14px;line-height:1.7;display:flex;gap:8px;align-items:flex-start}"
+".bm-ann .al{flex:none;font-weight:700;color:#55602A;font-size:12px;letter-spacing:.08em;padding-top:2px}"
+".bm-ann .at{flex:1;min-height:3.4em}"
+".bm-ann button{flex:none;font:inherit;font-size:13px;min-height:36px;padding:0 10px;border:2px solid #55602A;border-radius:999px;background:#fff;color:#2E241C;cursor:pointer}";
document.head.appendChild(st);
/* マップ(details) */
function mapHtml(){
var h='<div class="bm-fp"><p class="fp-t">― 館 内 マ ッ プ ―</p><div class="fp-g">';
ROOMS.forEach(function(r){var top=r.p[0],href=(r.id==="hall")?"index.html":(top+".html"),here=(room&&room.id===r.id);
var st=here?'<span class="st here">いま ここ</span>':(visited(r)?'<span class="st">✓ 見学済</span>':'<span class="st no">未見学</span>');
var ex=[];ROUTE.forEach(function(x,i){if(r.p.indexOf(x[0])>=0)ex.push('<li'+(x[0]===f?' class="cur"':'')+'><b>No.'+("00"+(i+1)).slice(-3)+'</b><a href="'+x[0]+'.html">'+esc(x[1])+'</a><br><span>'+esc(x[3])+'</span></li>')});
h+='<section class="rm'+(here?' now':'')+((r.id==="hall"||r.id==="r5")?' wide':'')+'"><h4>'+r.ico+' <a href="'+href+'" style="color:inherit">'+esc(r.n)+'</a>'+st+'</h4><p>'+esc(r.d)+'</p><ul>'+ex.join('')+'</ul></section>'});
h+='<section class="rm wide"><h4>'+I('ticket')+' 受付・案内所</h4><ul><li><a href="stamp.html">スタンプ帳</a><br><span>見学した展示室のしるしが集まるよ。</span></li><li><a href="search.html">館内さくいん</a><br><span>ことばで、見たい展示を探せるよ。</span></li></ul></section>';
h+='</div><p class="fp-z">点線は順路。上から順に歩くと、ぜんぶ見られるよ。</p></div>';return h}
/* 展示ラベル */
var DO={creators:["BON CREATIONSが どんな名前かを知る","さくしゃボンと、「ボンちゃん」の名前の由来を読む"],index:["お知らせを見る","展示一覧から行きたい部屋を選ぶ"],
zukan:["7人のボンの性格や好きなものを知る","気になるボンを選んで、くわしいページへ行く"],
bon:["このボンの設定・好きなもの・口ぐせを読む","ほかのボンと見くらべる"],
talk:["ボンを選んで、ことばを送ると返事がもらえる","名前を入れると、そのボン流の呼び方で話しかけてくれる"],
shindan:["いくつかの質問に答える","いまのあなたに近いボンがわかる"],
novels:["ひょえボンのおはなしを順番に読む(第1話から)","番外編「ちいさな日々」も読める"],
world:["ボンたちの世界のきまりを知る","ボンの赤ちゃんや、すんでいる場所の設定を読む"],
games:["ブラウザで ゲームをあそぶ","スマホでもパソコンでも あそべる"],
mini:["ボンをタッチして遊ぶ","すきま時間に ちょっとだけ遊べる"],
gallery:["ボンたちのイラストや写真を見る","気に入った絵を探す"],
music:["ボンたちの曲を聴く","曲ごとの紹介やひとこと解説を読む"],
wallpaper:["スマホ・パソコン用の壁紙をもらう","アイコン画像を選ぶ"],
calendar:["その月のボンの絵つきカレンダーを見る","月ごとの絵を見くらべる"],
sukimono:["さくしゃボンの「すき」を4つの資料から選ぶ","戦国・エスニック・療法・雑学の資料室へ"],
stamp:["見学した展示室のスタンプを見る","全部集めてみる"],
search:["ことばを入れて、見たい展示を探す","スペースで区切ると、ぜんぶ含むものだけ出る"]};
DO.novel=DO.novel6=DO.novel5=DO.novel1b=DO.novel2=DO.novel4=DO.novel7=["ひょえボンのおはなしを、章ごとに読む","前後の話へは、ページの下の順路から行ける"];
DO.sukimono_ethnic=DO.sukimono_kenko=DO.sukimono_sengoku=DO.sukimono_zatsu=["さくしゃボンの「すき」の資料を読む","にじボンの解説つき"];
var info=null,ri=routeIdx(f);
if(ri>=0)info=ROUTE[ri];else if(EXTRA[f])info=[f,EXTRA[f][0],EXTRA[f][1],EXTRA[f][2]];
function exNo(){
if(ri>=0)return "No."+("00"+(ri+1)).slice(-3);
var par={bon:"zukan",novel:"novels",novel6:"novels",novel5:"novels",novel1b:"novels",novel2:"novels",novel4:"novels",novel7:"novels",sukimono_ethnic:"sukimono",sukimono_kenko:"sukimono",sukimono_sengoku:"sukimono",sukimono_zatsu:"sukimono"}[f];
if(par){var pi=routeIdx(par);if(pi>=0){var order={novel:1,novel6:2,novel5:3,novel1b:4,novel2:5,novel4:6,novel7:7,sukimono_sengoku:1,sukimono_ethnic:2,sukimono_zatsu:3,sukimono_kenko:4,bon:1}[f];return "No."+("00"+(pi+1)).slice(-3)+"-"+order}}
return ""}
var AG={creators:"この博物館をつくった者たちの案内である。まずは、ここから見るがよい。",
zukan:"七人のボンが、ひとりずつ並んでいる。気になる者から見てゆくがよい。我輩も、もちろん載っておるぞ。",
talk:"ボンたちと言葉を交わせる体験の展示である。遠慮はいらぬ、話しかけてみたまえ。",
shindan:"あなたに近いボンを占う展示である。結果は、ぜひ誰かに話してみるがよい。",
novels:"ボンたちの物語を、順に所蔵しておる。最初から読むのも、気になる話から読むのも、自由である。",
world:"ボンたちの暮らす世界の決まりを集めた資料である。じっくり読むがよい。",
games:"遊びの展示室である。手を動かして、存分に楽しみたまえ。",
mini:"手軽に遊べる小さなゲームである。短い時間でも、気軽にどうぞ。",
gallery:"絵と写真を並べた展示である。気に入った一枚を見つけたら、じっくり眺めるがよい。",
music:"ボンたちの曲を聴ける展示である。ゆっくり耳を傾けたまえ。",
wallpaper:"壁紙とアイコンの展示である。お気に入りは、持ち帰って使うがよい。",
calendar:"月ごとの絵つき暦である。今月の一枚を、ぜひ見てゆきたまえ。",
sukimono:"さくしゃボンの好きなものを集めた資料室である。気の向くまま、ゆるりと見るがよい。",
index:"ようこそ、ボンの博物館へ。我輩はにじボン、館内アナウンス担当である。ゆっくり見てゆくがよい。"};
function plaque(){
if(!info&&f!=="stamp"&&f!=="search")return null;
if(!info)info=[f,EXTRA[f][0],EXTRA[f][1],EXTRA[f][2]];
var a=document.createElement("aside");a.className="bm-plaque";a.setAttribute("aria-label","展示ラベル");
var no=exNo(),rn=room?room.n:"受付・案内所";
a.innerHTML='<div class="pl-top">'+(no?'<span class="pl-no">展示 '+no+'</span>':'')+'<span>'+esc(rn)+'</span><span>分類：'+esc(info[2])+'</span></div><p class="pl-t">'+esc(info[1])+'</p><p class="pl-d">'+esc(info[3])+'</p>'+(DO[f]?'<p class="pl-h">ここで できること</p><ul class="pl-do"><li>'+DO[f].map(esc).join('</li><li>')+'</li></ul>':'')+(AG[f]?'<p class="pl-ag"><button type="button" class="agb">'+I("phones")+' にじボンの 音声ガイド</button><span class="agt" role="status"></span></p>':'')+'<details><summary>'+I("map")+' 館内マップ・順路を見る</summary>'+mapHtml()+'</details>';
if(AG[f]){var ab=a.querySelector(".agb"),at=a.querySelector(".agt"),sy=window.speechSynthesis;
ab.addEventListener("click",function(){at.textContent="にじボン：「"+AG[f]+"」";if(sy&&window.SpeechSynthesisUtterance){try{if(sy.speaking){sy.cancel();return}var u=new SpeechSynthesisUtterance(AG[f]);u.lang="ja-JP";u.rate=.95;u.pitch=.8;sy.speak(u)}catch(e){}}})}
return a}
var hd=document.querySelector("main > header");
if(hd&&f!=="index"){var pq=plaque();if(pq)hd.parentNode.insertBefore(pq,hd.nextSibling)}
/* 順路 */
if(ri>=0){
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
tk.innerHTML='<div class="tk-h"><span>ADMISSION TICKET</span><span>入館券</span></div><p class="tk-n">BON MUSEUM　ボンちゃんの小さな博物館</p><p>入館日：'+today+'　／　はじめての入館日：'+first+'</p><p>入館：'+vc+'日目　／　見学した展示室：<span id="bmTkN">'+nVisited()+'</span> / '+ROOMS.length+'</p><p class="tk-s">この入館券は、この端末のブラウザの中だけにある、記念のチケットだよ。展示室を見てまわると、スタンプが押されます。</p><details open style="margin-top:6px"><summary style="cursor:pointer;min-height:32px;display:inline-flex;align-items:center;color:#7A2434;font-weight:700">'+I("map")+' 館内マップ・順路を見る</summary>'+mapHtml()+'</details>';
var tdn=document.getElementById("today");if(tdn)tdn.parentNode.insertBefore(tk,tdn.nextSibling);else hd.parentNode.insertBefore(tk,hd.nextSibling);
var M=[];var h=now.getHours();
M.push("館内アナウンスは、アルバイトの我輩、にじボンが務めよう。順路に従うも、心の向くままに歩くも、見学者の自由である。");
M=M.concat(["展示室は、入口ホール、ボンたちの部屋、ものがたりの部屋、あそびの部屋、絵と音の部屋、そして資料室。迷ったときは、館内マップを開きたまえ。","受付の「スタンプ帳」には、見学の足跡が記されている。押したのは我輩ではない。ひとりでに押されるのだ。","館内ではお静かに。ボンたちは驚くと「ボン!?」と鳴く。その声は、実に心臓に悪い。","食事の時刻には、「ボーン！」という声が聞こえることがある。案ずるな、それは幸福の音である。","展示室の札には、展示番号と簡潔な解説が記されている。言葉は短くとも、そこには作者の想いがあるのだ。","おこボンの前では、順番を守りたまえ。待たされることを、彼女は何より嫌う。","もぐボンの近くには、おにぎりの香りが漂う。つまみ食いは、ほどほどにしておくのが賢明だ。","落とし物は、受付の我輩まで届けたまえ。柿が落ちていた場合も、遠慮は要らぬ。","順路の果てには、スタンプ帳が待っている。すべての展示室を巡った者には、我輩から一言、贈ろうではないか。"]);
var g=document.getElementById("tdGreet");
if(g){var gb=g.parentNode;var lab=document.createElement("p");lab.className="bm-al";lab.innerHTML=I("mega")+" 館内アナウンス　<small>担当：にじボン</small>";gb.insertBefore(lab,g);
var bt=document.createElement("button");bt.type="button";bt.id="bmAn";bt.className="bm-next";bt.textContent="つぎのアナウンス";bt.setAttribute("aria-label","次のアナウンス");gb.appendChild(bt);
var ai=0,tm=0,first=(g.textContent||"").trim();if(first)M.unshift(first);
function show(){g.textContent=M[ai%M.length];ai++}
function auto(){clearInterval(tm);if(window.matchMedia&&matchMedia("(prefers-reduced-motion: reduce)").matches)return;tm=setInterval(function(){if(!document.hidden)show()},12000)}
ai=1;auto();bt.addEventListener("click",function(){show();auto()})}
var el=document.createElement("section");el.className="bm-ex";el.setAttribute("aria-label","展示一覧");
var eh='<p class="eh">展 示 一 覧</p><div class="gr">';ROUTE.forEach(function(x,i){eh+='<a class="cd" href="'+x[0]+'.html"><span class="n">No.'+("00"+(i+1)).slice(-3)+'　'+esc(x[2])+'</span><span class="t">'+esc(x[1])+'</span><span class="d">'+esc(x[3])+'</span></a>'});
el.innerHTML=eh+'</div>';tk.parentNode.insertBefore(el,tk.nextSibling);
}
/* 全展示室を見た: 一度だけ館長のひとこと */
function allDone(){if(!S||nVisited()<ROOMS.length||ls("bm-allrooms"))return;ls("bm-allrooms","1");
var d=document.createElement("div");d.setAttribute("role","status");d.textContent="にじボン：「すべての展示室を巡ったか。見事である。我輩、いたく感じ入った。よくぞ参られた」";d.style.cssText="position:fixed;left:50%;bottom:max(24px,env(safe-area-inset-bottom));transform:translateX(-50%);z-index:9998;max-width:88vw;padding:12px 18px;border:2px solid #2E241C;border-radius:16px;background:#FFF8EA;color:#2E241C;font:700 15px/1.6 sans-serif;box-shadow:0 3px 0 rgba(46,36,28,.35)";
document.body.appendChild(d);setTimeout(function(){d.remove()},6000)}
setTimeout(allDone,1500);


/* 目次(長いページだけ) */
if(/^(world|sukimono_ethnic|wallpaper)$/.test(f)){
var hs=[].slice.call(document.querySelectorAll("main h2[id]")).filter(function(h){var s=h.querySelector(".t");return s&&s.textContent.indexOf("あんない")<0});
if(hs.length>=3){var tc=document.createElement("nav");tc.className="bm-toc";tc.setAttribute("aria-label","このページの目次");
tc.innerHTML='<b>もくじ</b><ol>'+hs.map(function(h,i){return '<li><a href="#'+h.id+'">'+(i+1)+'. '+esc(h.querySelector(".t").textContent.trim())+'</a></li>'}).join('')+'</ol>';
var pqe=document.querySelector(".bm-plaque")||hd;if(pqe)pqe.parentNode.insertBefore(tc,pqe.nextSibling)}}
/* 額縁: 大きめの絵に額縁をつける */
function frame(){var im=document.querySelectorAll("main img");for(var i=0;i<im.length;i++){var m=im[i];if(m.closest("header,nav,button,a.cd,.bm-ticket,.bm-ann,.bm-fp")||m.classList.contains("bm-fr"))continue;if(m.complete&&m.naturalWidth>=240&&m.clientWidth>=160)m.classList.add("bm-fr")}}
window.addEventListener("load",function(){frame();setTimeout(frame,800)});
})();
