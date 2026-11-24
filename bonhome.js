/* bonhome.js (v744): ボンのおへや ホーム(みんなの おへや)・きょう・おせわ・おもいで・ぷにごっこ
   ・既存の きろく(bm-diary / bm-rel / bm-relh / bm-mem / bm-puni など)を そのまま よむ。あたらしい データは bm-puni の tc(さわった かず)だけ。
   ・ふれあいは 独立(#id:f)。おへや(#id)は お世話・観察。ぷには ひょえボンの「ぷにごっこ」(ぷには うごかない・しゃべらない。声は ひょえボンが つける) */
(function(){
var BS=window.BonShare;if(!BS||!BS.R)return;
var R=BS.R,E={},V="home",pend=null,booted=false,NOFX=false;
try{NOFX=matchMedia("(prefers-reduced-motion: reduce)").matches}catch(e){}
function $(i){return document.getElementById(i)}
function pk(a){return a[Math.floor(Math.random()*a.length)]}
function byId(id){for(var i=0;i<R.length;i++)if(R[i].id===id)return R[i];return null}
function mk(t,c,h){var e=document.createElement(t);if(c)e.className=c;if(h!=null)e.innerHTML=h;return e}
function esc(s){return String(s).replace(/[&<>"]/g,function(c){return{"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]})}
function fix(s){try{return BonReno.fix(s)}catch(e){return s}}
function z(n){return n<10?"0"+n:""+n}
function J(k,d){try{var v=JSON.parse(localStorage.getItem(k));return v==null?d:v}catch(e){return d}}
function isBaby(){try{return BonBaby.saved()}catch(e){return false}}
function awayOf(id){try{return BonReno.away(id)}catch(e){return false}}
function mina(id){try{return BonMina.now(id,BS.tod4())}catch(e){return null}}
function hour(){return new Date().getHours()}
var VIEWS=[["home","🏠","ホーム"],["today","📅","きょう"],["care","🍙","おせわ"],["memo","📖","おもいで"]];

/* ---------- CSS ---------- */
var CSS=[
".ohtabs{grid-template-columns:none!important;grid-auto-flow:column;grid-auto-columns:1fr}",
".ohtab[hidden],.ohpn[data-hmx]{display:none!important}",
"#hmNav{position:fixed;left:0;right:0;bottom:0;z-index:50;display:flex;justify-content:center;gap:6px;padding:6px 10px calc(6px + env(safe-area-inset-bottom));background:var(--bg,#F1E4CC);border-top:2.5px solid var(--ink,#2E241C)}",
"#hmNav button{flex:1;max-width:110px;min-height:48px;font:inherit;font-size:13px;font-weight:700;border:2.5px solid var(--ink,#2E241C);border-radius:12px;background:var(--card,#FFF8EA);color:var(--ink,#2E241C);cursor:pointer;display:flex;flex-direction:column;align-items:center;justify-content:center;line-height:1.2;-webkit-tap-highlight-color:transparent}",
"#hmNav button .i2{font-size:19px}",
"#hmNav button[aria-selected=true]{background:var(--ochre-soft,#F6D98B);box-shadow:inset 0 -3px 0 rgba(46,36,28,.25)}",
"body:has(#ohRoom:not([hidden])) #hmNav{display:none}",
"body:has(#hmNav:not([hidden])){padding-bottom:84px}",
".hmv{max-width:440px;margin:0 auto}.hmv h2{font-size:22px;margin:6px 0 8px}.hmv h3{font-size:17px;margin:14px 0 6px}",
".hmbox{max-width:440px;margin:0 auto 14px}.hmbox h3{margin:0 0 6px;font-size:18px}",
".hmst{position:relative;width:100%;aspect-ratio:10/9;border:2.5px solid var(--ink,#2E241C);border-radius:16px;overflow:hidden;background:linear-gradient(#FFF3D6 0 56%,#E4C493 56%);box-shadow:3px 3px 0 rgba(46,36,28,.18);touch-action:manipulation}",
".hmst .win{position:absolute;left:6%;top:6%;width:22%;aspect-ratio:1.1;border:3px solid #2E241C;border-radius:8px;background:linear-gradient(#BFE3F5,#E8F6FF);overflow:hidden}",
".hmst .win::after{content:'';position:absolute;left:50%;top:0;bottom:0;width:3px;background:#2E241C}",
".hmst.t-evening .win{background:linear-gradient(#F6B98A,#FBD9B5)}.hmst.t-night .win{background:linear-gradient(#1F2B55,#3A4A86)}",
".hmst .dec{position:absolute;font-size:clamp(20px,7vw,34px);line-height:1;pointer-events:none;filter:drop-shadow(1px 1px 0 rgba(46,36,28,.25))}",
".hmst .dim{position:absolute;inset:0;pointer-events:none;background:rgba(20,24,60,0);transition:background 1s}",
".hmst.t-evening .dim{background:rgba(240,140,60,.12)}.hmst.t-night .dim{background:rgba(18,24,70,.42)}",
".hmb{position:absolute;width:21%;transform:translate(-50%,-100%);transition:left 2.8s ease-in-out,top 2.8s ease-in-out;cursor:pointer;background:none;border:0;padding:0;font:inherit;color:var(--ink,#2E241C);-webkit-tap-highlight-color:transparent}",
".hmb img{display:block;width:100%;height:auto;transform-origin:50% 100%;animation:hmbob 3.6s ease-in-out infinite}",
".hmb .nm{display:block;text-align:center;font-size:11px;font-weight:700;margin-top:-3px;text-shadow:0 0 3px #fff,0 0 3px #fff}",
".hmb .bd{position:absolute;left:50%;top:-6px;transform:translateX(-50%);font-size:16px;line-height:1.25;background:#fff;border:2px solid #2E241C;border-radius:999px;padding:0 5px;white-space:nowrap}",
".hmb.away{opacity:.3}.hmb.sleepy img{filter:brightness(.82)}",
"@keyframes hmbob{0%,100%{transform:translateY(0)}50%{transform:translateY(-3px)}}",
"@keyframes hmhop{0%,100%{transform:translateY(0)}40%{transform:translateY(-9px)}}",
"@keyframes hmslow{0%,100%{transform:rotate(0)}50%{transform:rotate(2deg)}}",
".hmb.hop img{animation:hmhop 1.4s ease-in-out infinite}.hmb.slow img{animation:hmslow 5.5s ease-in-out infinite}",
"@media (prefers-reduced-motion:reduce){.hmb img{animation:none!important}.hmb{transition:none}}",
".hmlog{margin:8px 0 0;padding:8px 12px;border:2px solid var(--ink,#2E241C);border-radius:12px;background:var(--card,#FFF8EA);font-size:14px;line-height:1.7;min-height:5.4em}",
".hmlog div{opacity:.62}.hmlog div:last-child{opacity:1}",
".hmhint{font-size:12px;color:var(--mute,#6b5a49);margin:6px 2px 0}",
".hmc{border:2.5px solid var(--c,#2E241C);border-radius:14px;background:var(--card,#FFF8EA);padding:10px 12px;margin:0 0 10px}",
".hmc .row{display:flex;gap:10px;align-items:center}.hmc img.th{width:64px;height:64px;border-radius:12px;object-fit:cover;flex:none;background:var(--bg,#F1E4CC)}",
".hmc b{font-size:17px}.hmc .sm{font-size:13px;color:var(--mute,#6b5a49)}",
".hmc .acts{display:flex;gap:6px;margin-top:8px;flex-wrap:wrap}.hmc .acts button,.hmgo{font:inherit;font-size:14px;font-weight:700;min-height:44px;padding:4px 12px;border:2px solid var(--ink,#2E241C);border-radius:10px;background:var(--ochre-soft,#F6D98B);color:var(--ink,#2E241C);cursor:pointer;flex:1;text-align:center;text-decoration:none;display:inline-flex;align-items:center;justify-content:center}",
".hmc .acts button.g{background:var(--card,#FFF8EA)}",
".hmev{list-style:none;margin:0;padding:0}.hmev li{padding:8px 4px;border-bottom:1.5px dashed rgba(46,36,28,.25);font-size:14px;line-height:1.6}.hmev li time{font-size:12px;color:var(--mute,#6b5a49);margin-right:6px}",
".hmev li b{font-size:13px;margin-right:4px}",
".hmchips{display:flex;flex-wrap:wrap;gap:6px;margin:6px 0 10px}.hmchips button{font:inherit;font-size:13px;font-weight:700;min-height:40px;padding:2px 10px;border:2px solid var(--ink,#2E241C);border-radius:999px;background:var(--card,#FFF8EA);color:var(--ink,#2E241C);cursor:pointer}.hmchips button[aria-pressed=true]{background:var(--ochre-soft,#F6D98B)}",
".hmlk{display:flex;gap:8px;flex-wrap:wrap;margin:10px 0}",
/* ぷにごっこ */
".hpw{display:flex;flex-direction:column;align-items:center;gap:6px;padding:4px 0}.hpw svg{width:min(62%,190px);height:auto;display:block}",
".hpw .bars{display:grid;grid-template-columns:repeat(3,1fr);gap:6px;width:100%}.hpw .bar{font-size:12px;text-align:center}.hpw .bar i{display:block;height:9px;border:2px solid #2E241C;border-radius:6px;background:#fff;overflow:hidden;margin-top:2px}.hpw .bar b{display:block;height:100%;background:#7FB8E8}",
".hpw .sy{margin:0;min-height:1.8em;font-size:16px;text-align:center}.hpw .st{margin:0;font-size:15px;font-weight:700}",
"@keyframes hpb{0%,100%{transform:translateY(0)}40%{transform:translateY(-8px)}}.hpw .bounce{animation:hpb .5s ease-out}"
].join("\n");

/* ---------- みんなの おへや(ホーム) ---------- */
var SP={oko:[14,52,.86],niko:[37,52,.86],hyoe:[61,52,.86],mogu:[85,52,.86],nemu:[19,90,1],tere:[50,92,1],niji:[81,90,1]};
var WH={oko:"",niko:"hop",hyoe:"",mogu:"",nemu:"slow",tere:"",niji:""};
var pos={},logL=[],lastTalk=0,lastDiary=0,stT=null,tkT=null,wdT=null,lgT=null;
function clamp(v,a,b){return Math.max(a,Math.min(b,v))}
function setPos(id,x,y){pos[id]={x:x,y:y};var b=$("hmb-"+id);if(!b)return;b.style.left=x+"%";b.style.top=y+"%";b.style.zIndex=Math.round(y)}
function buildStage(){
 var sel=$("ohSel");if(!sel||$("hmBox"))return;
 var box=mk("div","hmbox");box.id="hmBox";
 box.innerHTML='<h3>みんなの おへや</h3><div class="hmst" id="hmSt" role="group" aria-label="7人の ボンが くらしている おへや"><div class="win" aria-hidden="true"></div><span class="dec" style="left:36%;top:6%" aria-hidden="true">🖼️</span><span class="dec" style="right:6%;top:5%" aria-hidden="true">🕰️</span><span class="dec" style="left:34%;top:60%" aria-hidden="true">🪴</span></div><div class="hmlog" id="hmLog" aria-live="polite"></div><p class="hmhint">ボンを タップすると、その ボンの おへやに いけるよ。みんな じぶんの ペースで すごしているよ。</p>';
 sel.insertBefore(box,sel.firstChild);
 var st=$("hmSt");
 R.forEach(function(r){
  var b=mk("button","hmb "+(WH[r.id]||""));b.type="button";b.id="hmb-"+r.id;b.setAttribute("data-id",r.id);
  b.innerHTML='<img src="oh_sit_'+r.id+'.webp" alt="" width="302" height="440" draggable="false" style="animation-duration:'+(3.2+Math.random()*1.6).toFixed(1)+'s;animation-delay:-'+(Math.random()*3).toFixed(1)+'s"><span class="nm">'+r.nm.replace("ボン","")+'</span><span class="bd" aria-hidden="true"></span>';
  b.style.width=(21*SP[r.id][2])+"%";
  b.addEventListener("click",function(){b.style.transform="translate(-50%,-100%) scale(1.08)";setTimeout(function(){b.style.transform=""},180);if(E.go)E.go(r.id,"r")});
  st.appendChild(b);setPos(r.id,SP[r.id][0],SP[r.id][1]);
 });
 st.appendChild(mk("div","dim"));
 st.querySelector(".dim").setAttribute("aria-hidden","true");
 stageTick();
}
function todCls(){var t=BS.tod4();var s=$("hmSt");if(!s)return;["morning","day","evening","night"].forEach(function(x){s.classList.remove("t-"+x)});s.classList.add("t-"+t)}
function stageTick(){
 todCls();var night=BS.tod4()==="night";
 R.forEach(function(r){
  var b=$("hmb-"+r.id);if(!b)return;var m=mina(r.id),a=awayOf(r.id),bd=b.querySelector(".bd"),ic=m?m.ico:"";
  if(r.id==="hyoe"&&isBaby())ic="🍼";
  if(a)ic="🚶";
  bd.textContent=ic;bd.style.display=ic?"":"none";
  b.classList.toggle("away",!!a);
  b.classList.toggle("sleepy",night&&(r.id==="nemu"||hour()>=23||hour()<5));
  var ar=[];if(m)ar.push(m.text);b.setAttribute("aria-label",r.nm+"の おへやへ"+(a?"（おでかけ中）":m?"（"+m.text+"）":""));
 });
}
function addLog(t){if(!t)return;t=fix(t);if(logL.length&&logL[logL.length-1]===t)return;logL.push(t);if(logL.length>3)logL.shift();var l=$("hmLog");if(!l)return;l.innerHTML=logL.map(function(x){return"<div>"+esc(x)+"</div>"}).join("")}
function ambient(){
 var ids=R.filter(function(r){return !awayOf(r.id)}).map(function(r){return r.id}),id=pk(ids),r=byId(id);if(!r)return;
 if(id==="hyoe"&&isBaby()){addLog("🍼 ひょえボンは あまえんぼうの ひ。だっこが ほしそうに こっちを みている");return}
 var m=mina(id);if(m)addLog(m.ico+" "+r.nm+"は "+m.text);
}
function wander(){
 if(NOFX)return;
 R.forEach(function(r){var id=r.id;if(awayOf(id)||Math.random()>.35)return;if(id==="nemu"&&(hour()>=22||hour()<7)&&Math.random()<.7)return;var h=SP[id];setPos(id,clamp(h[0]+(Math.random()*12-6),11,89),clamp(h[1]+(Math.random()*6-3),46,94))})
}
function talk(){
 var vis=V==="home"&&!document.hidden&&$("ohSel")&&!$("ohSel").hidden;if(!vis)return;
 var ids=R.filter(function(r){return !awayOf(r.id)&&!(r.id==="hyoe"&&isBaby())}).map(function(r){return r.id});
 if(ids.length<2)return;
 var g=pk(ids),h=pk(ids.filter(function(i){return i!==g})),p=null;try{p=BonExtra.pair(g,h)}catch(e){}
 if(!p)return;
 var G=byId(g),H=byId(h),ph=pos[h]||{x:SP[h][0],y:SP[h][1]},gx=clamp(ph.x+(ph.x>50?-12:12),11,89);
 lastTalk=Date.now();
 if(!NOFX)setPos(g,gx,clamp(ph.y+2,46,94));
 var bg=$("hmb-"+g),bh=$("hmb-"+h);
 setTimeout(function(){addLog(G.nm+"が "+H.nm+"の ところへ あそびに いった");if(bg)bg.querySelector(".bd").textContent="💬";if(bh)bh.querySelector(".bd").textContent="💬"},NOFX?0:2500);
 setTimeout(function(){addLog(G.nm+"「"+p.g+"」")},NOFX?100:3000);
 setTimeout(function(){addLog(H.nm+"「"+p.h+"」");
  try{BonExtra.rel(g,h,G.nm+"と "+H.nm+"が おしゃべりした")}catch(e){}
  if(Date.now()-lastDiary>8*60000){lastDiary=Date.now();try{BonDiary.add(g,H.nm+"の ところへ あそびに いって、おしゃべりした",H.nm);BonDiary.add(h,G.nm+"が あそびに きて、おしゃべりした",G.nm)}catch(e){}}
 },NOFX?200:5400);
 setTimeout(function(){setPos(g,SP[g][0],SP[g][1]);stageTick()},NOFX?400:10500);
}
function loop(){
 clearTimeout(tkT);tkT=setTimeout(function(){talk();loop()},14000+Math.random()*14000)
}
function startStage(){
 stopStage();stageTick();if(!logL.length){ambient();ambient()}
 stT=setInterval(function(){if(!document.hidden&&V==="home")stageTick()},6000);
 wdT=setInterval(function(){if(!document.hidden&&V==="home"&&Date.now()-lastTalk>12000)wander()},17000);
 lgT=setInterval(function(){if(!document.hidden&&V==="home"&&Date.now()-lastTalk>16000)ambient()},21000);
 loop();
}
function stopStage(){clearInterval(stT);clearInterval(wdT);clearInterval(lgT);clearTimeout(tkT)}

/* ---------- きょう ---------- */
var BORD=["niji","oko","niko","hyoe","mogu","nemu","tere"];
function todayBon(){
 var d=new Date(),osh=null;try{osh=localStorage.getItem("bm-oshi")}catch(e){}if(osh&&byId(osh))return osh;
 var wk=Math.floor((Math.floor(new Date(d.getFullYear(),d.getMonth(),d.getDate()).getTime()/864e5)+3)/7),seed=wk*2654435761>>>0;
 function rnd(){seed=(seed*1664525+1013904223)>>>0;return seed/4294967296}
 var ord=[0,1,2,3,4,5,6];for(var q=6;q>0;q--){var w=Math.floor(rnd()*(q+1)),t=ord[q];ord[q]=ord[w];ord[w]=t}
 return BORD[ord[(d.getDay()+6)%7]]}
function moodOf(id){try{var d=new Date(),sl=BonDay.slot(d.getHours()),seed=Math.floor(new Date(d.getFullYear(),d.getMonth(),d.getDate()).getTime()/864e5);return BonDay.mood(id,sl,seed)}catch(e){return""}}
function dayStart(){var d=new Date();return new Date(d.getFullYear(),d.getMonth(),d.getDate()).getTime()}
function allDiary(n,since){var o=[];R.forEach(function(r){try{BonDiary.list(r.id,150).forEach(function(x){if(!since||x.t>=since)o.push({id:r.id,nm:r.nm,t:x.t,x:x.x})})}catch(e){}});o.sort(function(a,b){return b.t-a.t});return o.slice(0,n)}
function fmtT(t){var d=new Date(t);return(d.getMonth()+1)+"/"+d.getDate()+" "+z(d.getHours())+":"+z(d.getMinutes())}
function evHtml(l,withDate){if(!l.length)return'<p class="hmhint">まだ なにも きろくが ないよ。ボンたちの ようすが、すこしずつ ここに たまっていくよ。</p>';
 return'<ul class="hmev">'+l.map(function(e){var r=byId(e.id),t=new Date(e.t);return'<li style="border-left:4px solid '+(r?r.c:"#999")+';padding-left:8px"><time>'+(withDate?fmtT(e.t):z(t.getHours())+":"+z(t.getMinutes()))+'</time><b>'+esc(e.nm)+'</b>'+esc(fix(e.x))+'</li>'}).join("")+'</ul>'}
function renderToday(){
 var w=$("hmV-today");if(!w)return;var id=todayBon(),r=byId(id),m=mina(id),mo=moodOf(id),tg=null;try{tg=BS.todayGesture(id)}catch(e){}
 var h='<h2>きょうの ボン</h2><div class="hmc" style="--c:'+r.c+'"><div class="row"><img class="th" src="oh_card_'+id+'.webp" alt="" width="64" height="64"><div><b>'+r.nm+'</b><div class="sm">'+(mo?"いまの きぶん：「"+esc(mo)+"」":"")+'</div><div class="sm">'+(awayOf(id)?"🚶 ほかの ボンの おへやに おでかけ中":m?m.ico+" "+esc(m.text):"")+'</div></div></div>';
 if(tg)h+='<p style="margin:8px 0 0;font-size:14px;line-height:1.7">きょうの しぐさ'+(tg.rare?"（めずらしい！）":"")+'：'+esc(r.nm)+'が '+esc(tg.act)+'。「'+esc(fix(tg.text))+'」</p>';
 h+='<div class="acts"><button type="button" data-go="'+id+'">おへやに いく</button><button type="button" class="g" data-gof="'+id+'">ふれあう</button></div></div>';
 h+='<h3>きょうの できごと</h3>'+evHtml(allDiary(25,dayStart()),false);
 h+='<p class="hmhint">ボンたちの にっきから あつめているよ。もっと むかしの ことは「おもいで」で 見られるよ。</p>';
 w.innerHTML=h;bindGo(w)}

/* ---------- おせわ ---------- */
function puniData(){var d=J("bm-puni",null);return d}
function renderCare(){
 var w=$("hmV-care");if(!w)return;
 var h='<h2>おせわ</h2><p class="hmhint" style="margin-top:-4px">ごはん・おやつ・のみものは、ボンの おへやで あげられるよ。</p>';
 R.forEach(function(r){var m=mina(r.id),mo=moodOf(r.id),a=awayOf(r.id);
  h+='<div class="hmc" style="--c:'+r.c+'"><div class="row"><img class="th" src="oh_card_'+r.id+'.webp" alt="" width="64" height="64" loading="lazy"><div><b>'+r.nm+'</b><div class="sm">'+(mo?"きぶん：「"+esc(mo)+"」":"")+(r.id==="hyoe"&&isBaby()?"　🍼":"")+'</div><div class="sm">'+(a?"🚶 おでかけ中":m?m.ico+" "+esc(m.text):"")+'</div></div></div><div class="acts"><button type="button" data-gop="gohan:'+r.id+'">ごはん・おやつ</button><button type="button" class="g" data-go="'+r.id+'">おへや</button><button type="button" class="g" data-gof="'+r.id+'">ふれあい</button></div></div>'});
 var pd=puniData(),g=pd&&pd.g||0;
 h+='<div class="hmc" style="--c:#3F7BE0"><div class="row"><img class="th" src="puni_body.webp" alt="" width="64" height="63" style="object-fit:contain" loading="lazy"><div><b>ぷにごっこ</b><div class="sm">ひょえボンの おへやで あそべるよ</div><div class="sm">おせわした かず：'+g+'</div></div></div><div class="acts"><button type="button" data-gop="puni:hyoe">ぷにの おせわ</button><button type="button" class="g" data-gofp="hyoe">ぷにと ふれあう</button></div></div>';
 h+='<div class="hmlk"><a class="hmgo" href="talk.html">ボンと おしゃべり →</a></div>';
 w.innerHTML=h;bindGo(w)}

/* ---------- おもいで ---------- */
var memF="all";
function renderMemo(){
 var w=$("hmV-memo");if(!w)return;
 var chips='<button type="button" data-f="all" aria-pressed="'+(memF==="all")+'">みんな</button>'+R.map(function(r){return'<button type="button" data-f="'+r.id+'" aria-pressed="'+(memF===r.id)+'">'+r.nm.replace("ボン","")+'</button>'}).join("");
 var l=memF==="all"?allDiary(60,0):(function(){var r=byId(memF),o=[];try{BonDiary.list(memF,150).forEach(function(x){o.push({id:memF,nm:r.nm,t:x.t,x:x.x})})}catch(e){}return o})();
 w.innerHTML='<h2>おもいで</h2><div class="hmchips" role="group" aria-label="だれの にっき？">'+chips+'</div>'+evHtml(l.slice(0,60),true)+'<div class="hmlk"><a class="hmgo" href="talk.html#nikki">ボンの にっき（よみもの）</a><a class="hmgo" href="mine.html#memory">ボンとの 思い出</a></div><p class="hmhint">アルバムは じゅんびちゅう。いまは にっきが「おもいで」に なるよ。きろくは この端末の ブラウザの中だけに 保存されるよ。</p><details class="bmfold" style="margin-top:12px"><summary>なでなでの きろくを けす</summary><p class="hmhint" style="margin:6px 0">ボンごとの なかよし度(なでなでの かいすう)を ぜんぶ 0に もどすよ。にっきや ぷには きえないよ。</p><button type="button" class="hmgo" id="hmNadeRs">きろくを けす</button><p class="hmhint" id="hmNadeMsg" role="status"></p></details>';
 var nr=$("hmNadeRs"),nt=0;if(nr)nr.addEventListener("click",function(){if(!nt){nr.textContent="ほんとうに けす？（もういちど おす）";nt=setTimeout(function(){nt=0;nr.textContent="きろくを けす"},4000);return}clearTimeout(nt);nt=0;try{localStorage.setItem("bm-nade","{}")}catch(e){}nr.textContent="きろくを けす";$("hmNadeMsg").textContent="なでなでの きろくを もどしたよ。"});
 w.querySelectorAll(".hmchips button").forEach(function(b){b.addEventListener("click",function(){memF=b.getAttribute("data-f");renderMemo()})})}

function bindGo(w){
 w.querySelectorAll("[data-go]").forEach(function(b){b.addEventListener("click",function(){E.go&&E.go(b.getAttribute("data-go"),"r")})});
 w.querySelectorAll("[data-gof]").forEach(function(b){b.addEventListener("click",function(){E.go&&E.go(b.getAttribute("data-gof"),"f")})});
 w.querySelectorAll("[data-gop]").forEach(function(b){b.addEventListener("click",function(){var a=b.getAttribute("data-gop").split(":");pend=a[0];E.go&&E.go(a[1],"r")})});
 w.querySelectorAll("[data-gofp]").forEach(function(b){b.addEventListener("click",function(){pend="puni";E.go&&E.go(b.getAttribute("data-gofp"),"f")})})}

/* ---------- 画面の きりかえ ---------- */
function showView(k,quiet){
 if(!$("hmNav"))return;V=k;
 var sel=$("ohSel");
 VIEWS.forEach(function(v){var s=$("hmV-"+v[0]);if(s)s.hidden=v[0]!==k||v[0]==="home";var b=$("hmN-"+v[0]);if(b)b.setAttribute("aria-selected",v[0]===k?"true":"false")});
 if(sel)sel.hidden=k!=="home";
 if(k==="today")renderToday();else if(k==="care")renderCare();else if(k==="memo")renderMemo();
 if(k==="home")startStage();else stopStage();
 if(!quiet){try{history.replaceState(null,"",k==="home"?location.pathname+location.search:"#v-"+k)}catch(e){}window.scrollTo(0,0)}}
function buildNav(){
 if($("hmNav"))return;
 var nav=mk("nav");nav.id="hmNav";nav.setAttribute("aria-label","おへやの メニュー");
 VIEWS.forEach(function(v){var b=mk("button","",'<span class="i2" aria-hidden="true">'+v[1]+'</span><span>'+v[2]+'</span>');b.type="button";b.id="hmN-"+v[0];b.setAttribute("aria-selected","false");b.addEventListener("click",function(){showView(v[0])});nav.appendChild(b)});
 document.body.appendChild(nav);
 var anchor=$("ohSel");
 ["today","care","memo"].forEach(function(k){var s=mk("section","hmv");s.id="hmV-"+k;s.hidden=true;anchor.parentNode.insertBefore(s,anchor.nextSibling)})}

/* ---------- ぷにごっこ(ひょえボンの おへや) ---------- */
var PST=[["ちびぷに",0,.78],["ぷに",15,.92],["おおきぷに",50,1.05],["ふわぷに",120,1.15]];
var RATE={h:100/(14*36e5),f:100/(18*36e5),s:100/(22*36e5)};
var pd=null,psleep=0,pmode="r",pSayT=0,rsT=0;
function cl(x){return Math.max(0,Math.min(100,x))}
function pload(){var d={h:70,f:70,s:70,g:0,t:Date.now(),zz:0};var v=J("bm-puni",null);if(v&&typeof v==="object")d=v;if(typeof d.tc!=="number")d.tc=0;var dt=Math.max(0,Date.now()-(d.t||Date.now()));d.h=cl(d.h-dt*RATE.h);d.f=cl(d.f-dt*RATE.f);d.s=cl(d.s-dt*RATE.s);pd=d}
function psv(){pd.t=Date.now();try{localStorage.setItem("bm-puni",JSON.stringify(pd))}catch(e){}}
function pst(){var s=0;PST.forEach(function(x,i){if(pd.g>=x[1])s=i});return s}
function pface(m){var mo='<path d="M-9 28L9 28L0 14Z" fill="#E07A8A" stroke="#2E241C" stroke-width="3" stroke-linejoin="round"/>',e;
 if(m==="sleep")e='<path d="M-30 0q8 7 16 0M14 0q8 7 16 0" fill="none" stroke="#2E241C" stroke-width="4" stroke-linecap="round"/>';
 else if(m==="sad")e='<circle cx="-22" cy="2" r="8" fill="none" stroke="#2E241C" stroke-width="4"/><circle cx="22" cy="2" r="8" fill="none" stroke="#2E241C" stroke-width="4"/><path d="M36 -14q4 8 0 12q-4-4 0-12z" fill="#8EC5E8"/>';
 else e='<circle cx="-22" cy="0" r="9" fill="none" stroke="#2E241C" stroke-width="4"/><circle cx="22" cy="0" r="9" fill="none" stroke="#2E241C" stroke-width="4"/>';
 return e+mo+'<circle cx="-40" cy="14" r="7" fill="#F5A3B0" opacity=".5"/><circle cx="40" cy="14" r="7" fill="#F5A3B0" opacity=".5"/>'}
function pacc(s){var a="";if(s>=2)a+='<path d="M-6-60l-18-14 6 20zM6-60l18-14-6 20z" fill="#E07A8A" stroke="#2E241C" stroke-width="3" stroke-linejoin="round"/><circle cx="0" cy="-60" r="5" fill="#E07A8A" stroke="#2E241C" stroke-width="3"/>';
 if(s>=3)a+='<g transform="translate(40 -44)"><circle r="4" fill="#E0A21F"/><g fill="#fff" stroke="#2E241C" stroke-width="2"><circle cx="0" cy="-8" r="5"/><circle cx="8" cy="-2" r="5"/><circle cx="5" cy="7" r="5"/><circle cx="-5" cy="7" r="5"/><circle cx="-8" cy="-2" r="5"/></g><circle r="4" fill="#E0A21F"/></g>';return a}
function pdraw(){
 var w=$("hpFig");if(!w)return;var s=pst(),low=Math.min(pd.h,pd.f,pd.s)<25;
 w.setAttribute("transform","translate(110 "+(150-20*PST[s][2])+") scale("+PST[s][2]+")");
 $("hpAcc").innerHTML="";$("hpFace").innerHTML="";
 if($("hpH")){$("hpH").style.width=pd.h+"%";$("hpF").style.width=pd.f+"%";$("hpS").style.width=pd.s+"%"}
 var nx=PST[s+1];$("hpStage").textContent=PST[s][0]+(pmode==="r"?(nx?"（あと"+(nx[1]-pd.g)+"かいで おおきくなるよ）":"（いちばん おおきいよ）"):"　さわった かず："+pd.tc);
 if(!psleep&&!$("hpSay").dataset.k)$("hpSay").textContent=low&&pmode==="r"?"ぷに…":"ぷに！"}
function pbounce(){var b=$("hpBody");if(!b)return;b.classList.remove("bounce");void b.getBoundingClientRect();b.classList.add("bounce")}
function psay(t){var s=$("hpSay");s.dataset.k="1";s.textContent=t;clearTimeout(pSayT);pSayT=setTimeout(function(){s.dataset.k="";pdraw()},4000)}
function hyoeSay(t){if(E.say&&E.cur&&E.cur()&&E.cur().id==="hyoe")E.say(t)}
function pgrow(was){if(was<80){var o=pst();pd.g++;if(pst()>o)$("hpMsg").textContent="ぷにが「"+PST[pst()][0]+"」に おおきくなったよ！"}}
var CARE={
 h:{p:["ぷにゅ！ もぐもぐ","ぷに〜♪ おいしい！","ぷにっ！"],y:["ぷにの ごはん、できたよ。ボンも、おままごと、すき","はい、ぷに。…もぐもぐ、って、して？"]},
 f:{p:["ぷにぷに！ たのしい！","ぷにゅ〜♪ もっと！","ぷに！ ぴょん！"],y:["ぷに、いっしょに あそぼ。ボンが ぴょんって する","ぷに、たのしい？ ボンも、たのしい"]},
 sl:{y:["ぷに、ねんね。ボンも、そばに いるね","おやすみ、ぷに…。そっと、して あげる"]}};
/* ふれあい: ぷには ねんどで、ひと晩で かわいて かたまっている(つぶれない)。うごくのも しゃべるのも ひょえボン。 */
var TCH=[
 {a:"nade",lb:"なでなで",p:["ぷにゅ〜♪","ぷに〜"],y:["つるつる…ぷに、きもちいい？","なでなで…ボンの て、あったかい？"]},
 {a:"tsun",lb:"つんつん",p:["ぷに！","ぷにっ"],y:["つんつん…ぷに、かたい。でも、かわいい","ぷに、つんつん。ボンの ゆびで、こんこん"]},
 {a:"hoppe",lb:"ほおずり",p:["ぷにゅ〜","ぷに…"],y:["ほっぺ、ぴと…ひんやり、してる","ぷにと ほっぺ、ぴと。ボン、うれしい"]},
 {a:"gyu",lb:"ぎゅっ",p:["ぷにゅ〜！","ぷに〜♪"],y:["ぎゅ…つぶれない。ぷに、じょうぶ だね","ぎゅー。ぷに、ボンの うで、ちょうどいい"]},
 {a:"nose",lb:"てに のせる",p:["ぷに！","ぷにゅ"],y:["てのひらに、ちょこん。ぷに、かるいね","のせるよ。ぷに、おちない？ …だいじょうぶ"]},
 {a:"taka",lb:"たかい たかい",p:["ぷにゅ〜！","ぷに〜〜！"],y:["たかい たかーい。ぷに、とんだ つもり？","ぷに、おそらだよ。ボン、おっきく なったみたい"]}];
var BHY={h:["ボン！（ぷにに あーん って してる）","ボン〜♡ ぷに、おいちい？"],f:["ボン！ボン！（ぷにを ぱたぱた）","ボン〜♡（ぷにと きゃっきゃっ）"],s:["ボン……（ぷにを ぽんぽん。うとうと…）","ボン〜……ぷに、ねんね…"]};
var TCHB=["ぷに…ボン、ぎゅってしたい…","ぷに、ボンと いっしょ…ね…","ぷに…ぷに…。ボン、さみしく ない…"];
function ensurePuni(){
 var tabs=document.querySelector(".ohtabs"),panel=document.querySelector(".ohpanel");if(!tabs||!panel||$("hpTab"))return;
 var t=mk("button","ohtab","ぷにごっこ");t.type="button";t.id="hpTab";t.setAttribute("role","tab");t.setAttribute("data-t","puni");t.setAttribute("aria-selected","false");t.hidden=true;
 var koryu=tabs.querySelector('[data-t="koryu"]');tabs.insertBefore(t,koryu?koryu.nextSibling:null);
 t.addEventListener("click",function(){if(window.OhTabs)OhTabs.sel("puni",true)});
 var p=mk("div","ohpn");p.setAttribute("data-t","puni");p.setAttribute("role","tabpanel");p.setAttribute("aria-label","ぷにごっこ");p.hidden=true;p.id="hpPanel";
 p.innerHTML='<div class="hpw"><svg viewBox="0 0 220 220" role="img" aria-label="ぷに"><g id="hpBody"><g id="hpFig" transform="translate(110 130)"><ellipse cx="0" cy="62" rx="52" ry="8" fill="#000" opacity=".12"/><image href="puni_body.webp" x="-62" y="-64" width="124" height="122" preserveAspectRatio="xMidYMid meet"/><g id="hpAcc"></g><g id="hpFace"></g></g></g></svg><p class="st" id="hpStage"></p><p class="sy" id="hpSay" aria-live="polite"></p><p class="small" style="margin:0;text-align:center">ぷには ねんどの ましゅこっと。ひょえボンの「ぷにごっこ」だよ。</p><p style="margin:0;text-align:center"><a href="novel_puni.html" style="font-weight:700">ぷにの いちにち（おはなし）を よむ →</a></p><div id="hpBox" style="width:100%"></div><p class="small" id="hpMsg" role="status" style="margin:0"></p></div>';
 var note=panel.querySelector(".ohpnote");panel.insertBefore(p,note);
}
function hpBuild(m){
 pmode=m;pload();var b=$("hpBox");if(!b)return;
 if(m==="r"){
  b.innerHTML='<div class="bars"><div class="bar">ごはん<i><b id="hpH"></b></i></div><div class="bar">あそぶ<i><b id="hpF"></b></i></div><div class="bar">ねんね<i><b id="hpS"></b></i></div></div><div class="ohbtns" style="margin-top:8px"><button type="button" class="ohbtn" id="hpAH">ごはん</button><button type="button" class="ohbtn" id="hpAF">あそぶ</button><button type="button" class="ohbtn" id="hpAS">ねんね</button></div><div style="margin-top:8px;text-align:center"><button type="button" class="ohbtn ghost" id="hpRs" style="font-size:13px;min-height:40px">さいしょから</button></div>';
  $("hpAH").onclick=function(){if(psleep)return;$("hpMsg").textContent="";var w=pd.h;pd.h=cl(pd.h+30);pgrow(w);psv();pbounce();psay(w>=95?"ぷに…もう おなか いっぱい":pk(CARE.h.p));hyoeSay(isBaby()?pk(BHY.h):pk(CARE.h.y));pdraw()};
  $("hpAF").onclick=function(){if(psleep)return;$("hpMsg").textContent="";var w=pd.f;pd.f=cl(pd.f+30);pd.h=cl(pd.h-5);pd.s=cl(pd.s-5);pgrow(w);psv();pbounce();psay(pk(CARE.f.p));hyoeSay(isBaby()?pk(BHY.f):pk(CARE.f.y));pdraw()};
  $("hpAS").onclick=function(){if(psleep)return;$("hpMsg").textContent="";var w=pd.s;psleep=1;$("hpBody").style.opacity=".85";$("hpSay").dataset.k="1";$("hpSay").textContent="ぷに…zzz";hyoeSay(isBaby()?pk(BHY.s):pk(CARE.sl.y));pdraw();
   setTimeout(function(){psleep=0;$("hpBody").style.opacity="";pd.s=cl(pd.s+40);pgrow(w);psv();$("hpSay").dataset.k="";psay("ぷにゅ〜…おはよう！");pdraw()},3000)};
  $("hpRs").onclick=function(){var bt=$("hpRs");if(!rsT){bt.textContent="ほんとうに さいしょから？（もういちど おす）";rsT=setTimeout(function(){rsT=0;if($("hpRs"))$("hpRs").textContent="さいしょから"},4000);return}
   clearTimeout(rsT);rsT=0;pd={h:70,f:70,s:70,g:0,t:Date.now(),zz:0,tc:0};psv();bt.textContent="さいしょから";$("hpMsg").textContent="ぷにが また うまれたよ！";pdraw()};
 }else{
  b.innerHTML='<div class="ohbtns ohg" style="margin-top:6px">'+TCH.map(function(x){return'<button type="button" class="ohbtn" data-a="'+x.a+'">'+x.lb+'</button>'}).join("")+'</div>';
  b.querySelectorAll("button").forEach(function(bt){bt.onclick=function(){var x=TCH.filter(function(q){return q.a===bt.getAttribute("data-a")})[0];if(!x)return;
   pd.tc=(pd.tc||0)+1;psv();pbounce();psay(pk(x.p));var y=isBaby()?pk(TCHB):pk(x.y);hyoeSay(y);if(E.fx)E.fx(["♡"],2,20);pdraw()}})
 }
 $("hpMsg").textContent="";pdraw()}

/* ---------- ふれあい/おへやの タブ ---------- */
function tabs(id,mode){
 ensurePuni();
 var T=window.OhTabs;if(!T)return;
 var hy=id==="hyoe",want=null;
 T.tabs().forEach(function(t){var n=t.getAttribute("data-t"),show;
  if(n==="fure")show=mode==="f";else if(n==="puni")show=hy;else show=mode==="r";
  t.hidden=!show});
 var pt=$("hpTab");if(pt)pt.textContent=mode==="f"?"ぷにと":"ぷにごっこ";
 if(hy)hpBuild(mode);
 var d=mode==="f"?"fure":"sugo";
 if(pend){var pp=pend;pend=null;if(pp==="gohan"&&mode==="r")d="gohan";else if(pp==="puni"&&hy)d="puni"}
 else if(!booted&&/[?&]tab=puni/.test(location.search)&&hy)d="puni";
 booted=true;T.sel(d,false)}

/* ---------- 公開 ---------- */
function afterHome(){if(!$("hmNav"))return;var m=location.hash.match(/^#v-(today|care|memo)$/),k=m?m[1]:(V!=="home"&&!location.hash?V:"home");if(location.hash&&!m)k="home";showView(k,true)}
window.BonHome={
 init:function(o){E=o||{};var st=mk("style");st.textContent=CSS;document.head.appendChild(st);buildNav();buildStage();
  var m=location.hash.match(/^#v-(today|care|memo)$/);var sel=$("ohSel");if(sel&&!sel.hidden||m)showView(m?m[1]:"home",true);
  document.addEventListener("visibilitychange",function(){if(!document.hidden&&V==="home")stageTick()});
  window.addEventListener("hashchange",function(){var mm=location.hash.match(/^#v-(today|care|memo)$/);if(mm&&$("ohRoom")&&$("ohRoom").hidden)showView(mm[1],true)})},
 onShow:function(id,mode){stopStage();var n=$("hmNav");if(n)n.hidden=true;VIEWS.forEach(function(v){var s=$("hmV-"+v[0]);if(s)s.hidden=true});tabs(id,mode)},
 afterHome:function(){var n=$("hmNav");if(n)n.hidden=false;afterHome()}
};
})();
